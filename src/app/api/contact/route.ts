import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validate incoming data
    if (!name || !email || !message) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Since no API keys are used, we mock the backend processing to preserve the beautiful frontend UI animations
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log('✅ [Contact Form] Received mock submission from:', email);

    return NextResponse.json(
      { message: 'Message logged successfully!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
