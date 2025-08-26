import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Bot from '@/lib/models/Bot';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    // Fetch all example bots
    const examples = await Bot.find({ isExample: true, isActive: true })
      .sort({ weirdness: -1, views: -1 })
      .limit(20);
    
    return NextResponse.json(examples);
  } catch (error) {
    console.error('Error fetching examples:', error);
    return NextResponse.json(
      { error: 'Failed to fetch examples' },
      { status: 500 }
    );
  }
}
