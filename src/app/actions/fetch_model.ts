'use server';

export async function fetchModel(content: string): Promise<string | null> {
  try {
    const baseUrl = '127.0.0.1:8000/sentiment/cassandra';
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: content }),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch product reviews on page ${currentPage}`);
    }
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.log(err);
    return null;
  }
}
