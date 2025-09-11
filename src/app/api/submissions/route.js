import { NextResponse } from 'next/server';
import { saveSubmission } from '../../utils/db';

export async function POST(request) {
  try {
    const formData = await request.json();
    
    // Save to MongoDB
    const result = await saveSubmission(formData);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Form submitted successfully',
      data: { id: result.insertedId, ...formData }
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to submit form',
      error: error.message 
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    // Import the function here to avoid issues with top-level await
    const { getAllSubmissions } = await import('../../utils/db');
    
    const submissions = await getAllSubmissions();
    
    return NextResponse.json({ 
      success: true, 
      data: submissions 
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to fetch submissions',
      error: error.message 
    }, { status: 500 });
  }
}