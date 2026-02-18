import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { ConversationModel } from '@/lib/models/conversation';
import { getPhilosopherConfig } from '@/lib/philosopher-prompts';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const format = searchParams.get('format') || 'markdown';
    const userId = searchParams.get('userId');

    await connectDB();

    const conversation = await ConversationModel.findById(id).lean() as {
      _id: { toString(): string };
      title: string;
      philosopherId: string;
      userId?: string;
      messages?: { role: string; content: string; timestamp?: Date }[];
      createdAt?: Date;
      updatedAt?: Date;
    } | null;

    if (!conversation) {
      return NextResponse.json({ error: 'Conversation not found' }, { status: 404 });
    }

    if (conversation.userId && conversation.userId !== userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const philosopherConfig = getPhilosopherConfig(conversation.philosopherId);
    const philosopherName = philosopherConfig?.name || conversation.philosopherId;

    if (format === 'markdown') {
      const markdown = generateMarkdown(conversation, philosopherName);
      
      return new NextResponse(markdown, {
        headers: {
          'Content-Type': 'text/markdown',
          'Content-Disposition': `attachment; filename="conversation-${id}.md"`,
        },
      });
    }

    if (format === 'json') {
      return NextResponse.json({
        conversation: {
          _id: conversation._id.toString(),
          title: conversation.title,
          philosopher: philosopherName,
          messages: conversation.messages,
          createdAt: conversation.createdAt,
          updatedAt: conversation.updatedAt,
        },
      });
    }

    return NextResponse.json({ error: 'Unsupported format' }, { status: 400 });
  } catch (error) {
    console.error('Export error:', error);
    return NextResponse.json({ error: 'Failed to export conversation' }, { status: 500 });
  }
}

function generateMarkdown(
  conversation: {
    title: string;
    messages?: { role: string; content: string; timestamp?: Date }[];
    createdAt?: Date;
  },
  philosopherName: string
): string {
  const lines: string[] = [];

  lines.push(`# ${conversation.title}`);
  lines.push('');
  lines.push(`*Conversation with ${philosopherName}*`);
  lines.push('');
  lines.push(`**Date:** ${conversation.createdAt?.toLocaleDateString() || 'Unknown'}`);
  lines.push('');
  lines.push('---');
  lines.push('');

  conversation.messages?.forEach((msg) => {
    const role = msg.role === 'user' ? '**You**' : `***${philosopherName}***`;
    const timestamp = msg.timestamp ? new Date(msg.timestamp).toLocaleString() : '';
    
    lines.push(`### ${role}`);
    if (timestamp) {
      lines.push(`*${timestamp}*`);
    }
    lines.push('');
    lines.push(msg.content);
    lines.push('');
    lines.push('---');
    lines.push('');
  });

  lines.push('');
  lines.push('*Exported from Hikmatia - Persian Philosophy & Wisdom*');

  return lines.join('\n');
}
