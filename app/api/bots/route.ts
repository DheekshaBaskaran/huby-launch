import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Bot from '@/lib/models/Bot';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    const { name, prompt, personality, category, weirdness, description, creator } = body;
    
    // Validate required fields
    if (!name || !prompt || !category || !weirdness || !description || !creator) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Create new bot
    const newBot = new Bot({
      name,
      prompt,
      personality: personality || '',
      category,
      weirdness,
      description,
      creator,
      responses: [],
      isExample: false,
      isActive: true
    });
    
    await newBot.save();
    
    return NextResponse.json(newBot, { status: 201 });
  } catch (error) {
    console.error('Error creating bot:', error);
    return NextResponse.json(
      { error: 'Failed to create bot' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const category = searchParams.get('category');
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';
    
    const query: any = { isActive: true };
    if (category) {
      query.category = category;
    }
    
    const sort: any = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
    
    const bots = await Bot.find(query)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit);
    
    const total = await Bot.countDocuments(query);
    
    return NextResponse.json({
      bots,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching bots:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bots' },
      { status: 500 }
    );
  }
}
