import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import LeaderboardEntry from '@/lib/models/LeaderboardEntry';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const limit = parseInt(searchParams.get('limit') || '50');
    const sortBy = searchParams.get('sortBy') || 'points';
    const sortOrder = searchParams.get('sortOrder') || 'desc';
    
    let query: any = {};
    
    if (category) {
      query.category = category;
    }
    
    // Determine sort order
    const sortDirection = sortOrder === 'asc' ? 1 : -1;
    const sortOptions: any = {};
    sortOptions[sortBy] = sortDirection;
    
    // Fetch leaderboard entries with optional filtering and sorting
    const leaderboard = await LeaderboardEntry.find(query)
      .sort(sortOptions)
      .limit(limit);
    
    return NextResponse.json(leaderboard);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return NextResponse.json(
      { error: 'Failed to fetch leaderboard' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    const { botId, botName, creator, category, points, wins, losses, draws } = body;
    
    // Validate required fields
    if (!botId || !botName || !creator || !category) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Calculate total matches and win rate
    const totalMatches = (wins || 0) + (losses || 0) + (draws || 0);
    const winRate = totalMatches > 0 ? ((wins || 0) / totalMatches) * 100 : 0;
    
    // Create new leaderboard entry
    const newEntry = new LeaderboardEntry({
      botId,
      botName,
      creator,
      category,
      points: points || 0,
      wins: wins || 0,
      losses: losses || 0,
      draws: draws || 0,
      totalMatches,
      winRate: Math.round(winRate * 10) / 10, // Round to 1 decimal place
      lastMatch: new Date()
    });
    
    await newEntry.save();
    
    return NextResponse.json(newEntry, { status: 201 });
  } catch (error) {
    console.error('Error creating leaderboard entry:', error);
    return NextResponse.json(
      { error: 'Failed to create leaderboard entry' },
      { status: 500 }
    );
  }
}
