import { NextRequest, NextResponse } from 'next/server';

interface Notification {
  id: string;
  userId: string;
  type: 'like' | 'comment' | 'follow' | 'achievement' | 'system';
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
  link?: string;
}

const notifications: Map<string, Notification[]> = new Map();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, type, title, message, link } = body;

    if (!userId || !type || !title) {
      return NextResponse.json({ error: 'userId, type, and title are required' }, { status: 400 });
    }

    const notification: Notification = {
      id: `notif_${Date.now()}`,
      userId,
      type,
      title,
      message: message || '',
      read: false,
      createdAt: new Date(),
      link,
    };

    if (!notifications.has(userId)) {
      notifications.set(userId, []);
    }
    notifications.get(userId)!.push(notification);

    return NextResponse.json({ 
      message: 'Notification sent',
      notification 
    });
  } catch (error) {
    console.error('Notification error:', error);
    return NextResponse.json({ error: 'Failed to send notification' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const unreadOnly = searchParams.get('unreadOnly') === 'true';

    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 });
    }

    const userNotifications = notifications.get(userId) || [];
    
    let filtered = userNotifications;
    if (unreadOnly) {
      filtered = userNotifications.filter(n => !n.read);
    }

    const unreadCount = userNotifications.filter(n => !n.read).length;

    return NextResponse.json({ 
      notifications: filtered.reverse(),
      unreadCount,
      total: userNotifications.length,
    });
  } catch (error) {
    console.error('Notification fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch notifications' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, notificationIds, action } = body;

    if (!userId || !action) {
      return NextResponse.json({ error: 'userId and action are required' }, { status: 400 });
    }

    const userNotifications = notifications.get(userId) || [];

    if (action === 'markRead' && notificationIds) {
      userNotifications.forEach(n => {
        if (notificationIds.includes(n.id)) {
          n.read = true;
        }
      });
    } else if (action === 'markAllRead') {
      userNotifications.forEach(n => n.read = true);
    } else if (action === 'delete' && notificationIds) {
      const filtered = userNotifications.filter(n => !notificationIds.includes(n.id));
      notifications.set(userId, filtered);
    }

    notifications.set(userId, userNotifications);

    return NextResponse.json({ 
      message: 'Notifications updated',
      unreadCount: userNotifications.filter(n => !n.read).length,
    });
  } catch (error) {
    console.error('Notification update error:', error);
    return NextResponse.json({ error: 'Failed to update notifications' }, { status: 500 });
  }
}
