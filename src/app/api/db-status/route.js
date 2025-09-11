import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../utils/db';

export async function GET() {
  try {
    const { isConnected } = await connectToDatabase();
    
    return NextResponse.json({ 
      connected: isConnected
    });
  } catch (error) {
    console.error('Database status check error:', error);
    return NextResponse.json({ 
      connected: false,
      error: error.message 
    }, { status: 500 });
  }
}