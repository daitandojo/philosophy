import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { NotificationModel } from '@/lib/models/notification';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '20');
    const unreadOnly = searchParams.get('unreadOnly') === 'true';

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    await connectDB();

    const conditions: Record<string, unknown> = { recipientId: userId };
    if (unreadOnly) {
      conditions.isRead = false;
    }

    const notifications = await NotificationModel.find(conditions)
      .sort({ createdAt: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .lean();

    const total = await NotificationModel.countDocuments(conditions);
    const unreadCount = await NotificationModel.countDocuments({ recipientId: userId, isRead: false });

    return NextResponse.json({
      notifications: notifications.map(n => ({
        _id: n._id.toString(),
        senderId: n.senderId,
        type: n.type,
        title: n.title,
        message: n.message,
        link: n.link,
        isRead: n.isRead,
        createdAt: n.createdAt,
      })),
      total,
      unreadCount,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    });
  } catch (error) {
    console.error('Notifications GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch notifications' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { recipientId, senderId, type, title, message, link } = body;

    if (!recipientId || !type || !title) {
      return NextResponse.json({ error: 'Recipient ID, type, and title are required' }, { status: 400 });
    }

    await connectDB();

    const notification = await NotificationModel.create({
      recipientId,
      senderId,
      type,
      title,
      message: message || '',
      link,
    });

    return NextResponse.json({
      notification: {
        _id: notification._id.toString(),
        type: notification.type,
        title: notification.title,
        message: notification.message,
        isRead: notification.isRead,
        createdAt: notification.createdAt,
      },
    });
  } catch (error) {
    console.error('Notifications POST error:', error);
    return NextResponse.json({ error: 'Failed to create notification' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { notificationId, userId, markAllRead } = body;

    await connectDB();

    if (markAllRead && userId) {
      await NotificationModel.updateMany(
        { recipientId: userId, isRead: false },
        { $set: { isRead: true } }
      );
      return NextResponse.json({ success: true });
    }

    if (notificationId) {
      await NotificationModel.findByIdAndUpdate(notificationId, { isRead: true });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  } catch (error) {
    console.error('Notifications PUT error:', error);
    return NextResponse.json({ error: 'Failed to update notifications' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const notificationId = searchParams.get('id');

    if (!notificationId) {
      return NextResponse.json({ error: 'Notification ID is required' }, { status: 400 });
    }

    await connectDB();

    await NotificationModel.findByIdAndDelete(notificationId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Notifications DELETE error:', error);
    return NextResponse.json({ error: 'Failed to delete notification' }, { status: 500 });
  }
}
