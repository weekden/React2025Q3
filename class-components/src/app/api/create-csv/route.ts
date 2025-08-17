import { NextResponse } from 'next/server';
import type { Character } from '@/types/api';

export async function POST(reqest: Request): Promise<NextResponse> {
  const selector: Character[] = await reqest.json();

  const header: (keyof Character)[] = [
    'id',
    'name',
    'gender',
    'race',
    'description',
    'appearances',
  ];

  const rowsArr = selector.map((item) =>
    header.map((head) => item[head]).join(',')
  );

  const csvText = [header.join(','), ...rowsArr].join('\n');

  return new NextResponse(csvText);
}
