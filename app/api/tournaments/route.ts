import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Tournament from '@/lib/models/Tournament';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const category = searchParams.get('category');
    
    let query: any = {};
    
    if (status) {
      query.status = status;
    }
    
    if (category) {
      query.category = category;
    }
    
    // Fetch tournaments with optional filtering
    const tournaments = await Tournament.find(query)
      .sort({ startDate: -1, createdAt: -1 })
      .limit(50);
    
    return NextResponse.json(tournaments);
  } catch (error) {
    console.error('Error fetching tournaments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tournaments' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    const { name, description, startDate, endDate, maxParticipants, category, prize, rules } = body;
    
    // Validate required fields
    if (!name || !description || !startDate || !endDate || !maxParticipants || !category || !prize) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Create new tournament
    const newTournament = new Tournament({
      name,
      description,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      maxParticipants,
      category,
      prize,
      rules: rules || [],
      currentParticipants: 0,
      status: 'upcoming'
    });
    
    await newTournament.save();
    
    return NextResponse.json(newTournament, { status: 201 });
  } catch (error) {
    console.error('Error creating tournament:', error);
    return NextResponse.json(
      { error: 'Failed to create tournament' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    const { tournamentId, botId, action } = body;
    
    if (!tournamentId || !botId || !action) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    const tournament = await Tournament.findById(tournamentId);
    if (!tournament) {
      return NextResponse.json(
        { error: 'Tournament not found' },
        { status: 404 }
      );
    }
    
    if (action === 'join') {
      if (tournament.currentParticipants >= tournament.maxParticipants) {
        return NextResponse.json(
          { error: 'Tournament is full' },
          { status: 400 }
        );
      }
      
      if (tournament.participants.includes(botId)) {
        return NextResponse.json(
          { error: 'Bot already joined this tournament' },
          { status: 400 }
        );
      }
      
      tournament.participants.push(botId);
      tournament.currentParticipants += 1;
      
      if (tournament.status === 'upcoming' && tournament.currentParticipants > 0) {
        tournament.status = 'active';
      }
      
      await tournament.save();
      
      return NextResponse.json(tournament);
    }
    
    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error updating tournament:', error);
    return NextResponse.json(
      { error: 'Failed to update tournament' },
      { status: 500 }
    );
  }
}
