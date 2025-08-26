import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import MetaPrompt from '@/lib/models/MetaPrompt';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    // Fetch all active meta prompts
    const metaPrompts = await MetaPrompt.find({ isActive: true })
      .sort({ usageCount: -1, createdAt: -1 })
      .limit(20);
    
    return NextResponse.json(metaPrompts);
  } catch (error) {
    console.error('Error fetching meta prompts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch meta prompts' },
      { status: 500 }
    );
  }
}
