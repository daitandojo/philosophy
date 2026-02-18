import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';

export async function GET() {
  try {
    const db = mongoose.connection.db;
    if (!db) {
      return NextResponse.json({ error: 'Database not connected' }, { status: 500 });
    }

    const collections = await db.listCollections().toArray();
    
    const backup: Record<string, unknown[]> = {};

    for (const collection of collections) {
      const docs = await db.collection(collection.name).find({}).limit(1000).toArray();
      backup[collection.name] = docs.map(doc => ({
        ...doc,
        _id: doc._id?.toString(),
      }));
    }

    return NextResponse.json({
      backup,
      timestamp: new Date().toISOString(),
      collections: collections.map(c => c.name),
    });
  } catch (error) {
    console.error('Backup error:', error);
    return NextResponse.json({ error: 'Backup failed' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, collectionName, data } = body;

    if (action !== 'restore') {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    const db = mongoose.connection.db;
    if (!db) {
      return NextResponse.json({ error: 'Database not connected' }, { status: 500 });
    }

    if (!collectionName || !Array.isArray(data)) {
      return NextResponse.json({ error: 'Collection name and data required' }, { status: 400 });
    }

    const collection = db.collection(collectionName);
    
    await collection.deleteMany({});
    
    if (data.length > 0) {
      const docsWithIds = data.map((doc: Record<string, unknown>) => {
        if (doc._id && typeof doc._id === 'string') {
          return { ...doc, _id: new mongoose.Types.ObjectId(doc._id) };
        }
        return doc;
      });
      
      await collection.insertMany(docsWithIds);
    }

    return NextResponse.json({
      success: true,
      restored: data.length,
      collection: collectionName,
    });
  } catch (error) {
    console.error('Restore error:', error);
    return NextResponse.json({ error: 'Restore failed' }, { status: 500 });
  }
}
