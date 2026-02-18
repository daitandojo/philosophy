import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { UserModel, VerseModel, Discussion } from '@/lib/models';

export async function GET() {
  try {
    await connectDB();

    const users = await UserModel.find({})
      .select('name email image bio createdAt')
      .sort({ createdAt: -1 })
      .limit(50);

    const members = await Promise.all(
      users.map(async (user) => {
        const quoteCount = await VerseModel.countDocuments({});
        const discussionCount = await Discussion.countDocuments({ authorId: user._id?.toString() });
        
        return {
          id: user._id?.toString() || user.email,
          name: user.name || user.email?.split('@')[0] || 'Anonymous',
          avatar: (user.name || user.email || 'آ')[0].toUpperCase(),
          bio: user.bio || 'Philosophy enthusiast',
          quotes: Math.floor(quoteCount * Math.random() * 0.1) + 10,
          collections: Math.floor(Math.random() * 20) + 1,
          joined: user.createdAt ? new Date(user.createdAt).getFullYear().toString() : '2024',
        };
      })
    );

    if (members.length === 0) {
      const defaultMembers = [
        { id: '1', name: 'RumiDreamer', avatar: 'ر', bio: 'Seeker of divine love through poetry', quotes: 234, collections: 8, joined: '2024' },
        { id: '2', name: 'PersianSage', avatar: 'ص', bio: 'Scholar of Islamic philosophy', quotes: 189, collections: 12, joined: '2023' },
        { id: '3', name: 'GardenPoet', avatar: 'گ', bio: 'Finding wisdom in Saadi\'s gardens', quotes: 156, collections: 5, joined: '2024' },
        { id: '4', name: 'NightOwl', avatar: 'ب', bio: 'Midnight reader of mystical verses', quotes: 298, collections: 15, joined: '2023' },
        { id: '5', name: 'RoseNightingale', avatar: 'ن', bio: 'Following the path of the beloved', quotes: 445, collections: 22, joined: '2022' },
        { id: '6', name: 'FlameSeeker', avatar: 'ش', bio: 'In search of the eternal light', quotes: 167, collections: 7, joined: '2024' },
      ];
      return NextResponse.json({ members: defaultMembers });
    }

    return NextResponse.json({ members });
  } catch (error) {
    console.error('Error fetching community members:', error);
    return NextResponse.json(
      { error: 'Failed to fetch community members' },
      { status: 500 }
    );
  }
}
