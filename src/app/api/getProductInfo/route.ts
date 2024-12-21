import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json(); // Parse JSON từ client
    const { name, email } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 },
      );
    }

    // Thực hiện logic xử lý, ví dụ: lưu vào database
    console.log('Received:', { name, email });

    return NextResponse.json(
      { message: 'Data saved successfully', data: { name, email } },
      { status: 200 },
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
