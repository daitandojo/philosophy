import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { VisitorModel } from '@/lib/models/visitor';

export async function GET() {
  let totalVisitors = 0;
  let todayVisitors = 0;
  let totalVisits = 0;

  try {
    await connectDB();
    totalVisitors = await VisitorModel.countDocuments({});
    totalVisits = await VisitorModel.aggregate([
      { $group: { _id: null, total: { $sum: '$visitCount' } } },
    ]).then(r => r[0]?.total || 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    todayVisitors = await VisitorModel.countDocuments({ lastSeen: { $gte: today } });
  } catch {
    // Database unavailable — return zeros
  }

  return NextResponse.json({ totalVisitors, todayVisitors, totalVisits });
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
      || request.headers.get('x-real-ip')
      || 'unknown';

    const userAgent = request.headers.get('user-agent') || '';
    const path = request.nextUrl.searchParams.get('path') || '/';

    await connectDB();

    const existing = await VisitorModel.findOne({ ip });

    if (existing) {
      existing.lastSeen = new Date();
      existing.visitCount += 1;
      if (path && !existing.path?.includes(path)) {
        existing.path = existing.path ? `${existing.path},${path}` : path;
      }
      await existing.save();
    } else {
      await VisitorModel.create({
        ip,
        userAgent: userAgent.slice(0, 200),
        path,
        firstSeen: new Date(),
        lastSeen: new Date(),
        visitCount: 1,
      });
    }

    return NextResponse.json({ tracked: true });
  } catch {
    return NextResponse.json({ tracked: false });
  }
}
