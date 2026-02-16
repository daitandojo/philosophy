import { NextRequest, NextResponse } from 'next/server';
import { philosophers } from '@/lib/philosophers';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface DailyWisdom {
  philosopher: {
    id: string;
    name: string;
    persianName: string;
  };
  quote: {
    persian: string;
    transliteration: string;
    english: string;
    source: string;
  };
  context: string;
  reflectionQuestion: string;
  date: string;
}

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const today = new Date().toISOString().split('T')[0];
  
  const philosopherIndex = Math.floor(
    (new Date(today).getTime() / (1000 * 60 * 60 * 24)) % philosophers.length
  );
  const philosopher = philosophers[philosopherIndex];

  const wisdomQuotes = [
    {
      persian: 'بیا تا برایت ببینیم آنچه را که دل تو آرزوی آن است',
      transliteration: 'Bia ta barayat bibinin anja ke del tu arzu-ye an ast',
      english: 'Come, let us see for you what your heart desires',
      source: 'Masnavi',
    },
    {
      persian: 'ای陌生人، تو خود را بشناس، خود را، آنجا که عشق آغاز می‌شود، تو را صدا می‌زنند',
      transliteration: 'Ey gharib, to khod ra beshnas, khod ra, anja ke eshghe aghaz mishavad, to ra seda mizanand',
      english: 'O stranger, know yourself. Where love begins, there you will be called',
      source: 'Masnavi',
    },
    {
      persian: 'در طلبِ وصالِ یار، هر دم بکش جان را، که این نفس، تمامِ هستیِ من است',
      transliteration: 'Dar talab-e visal-e yar, har dam bokash jan ra, ke in nafas, tamam-e hasti-e man ast',
      english: 'In longing for the beloved, sacrifice your soul each moment',
      source: 'Divan-e Shams',
    },
  ];

  const quoteIndex = Math.floor(
    (new Date(today).getTime() / (1000 * 60 * 60 * 24)) % wisdomQuotes.length
  );
  const quote = wisdomQuotes[quoteIndex];

  const contextOptions = [
    'Today\'s wisdom speaks to the journey of the soul toward divine love. Consider what longing means in your own life.',
    'This verse reminds us that the search for truth begins within ourselves. Take a moment to reflect on your inner journey.',
    'The path to wisdom often comes through embracing both joy and sorrow. How will you embrace both today?',
  ];

  const reflectionQuestions = [
    'What is your heart truly longing for today?',
    'Where in your life might you begin a new journey of self-discovery?',
    'How can you bring more love into your interactions today?',
  ];

  const dailyWisdom: DailyWisdom = {
    philosopher: {
      id: philosopher.id,
      name: philosopher.name.english,
      persianName: philosopher.name.persian,
    },
    quote,
    context: contextOptions[quoteIndex % contextOptions.length],
    reflectionQuestion: reflectionQuestions[quoteIndex % reflectionQuestions.length],
    date: today,
  };

  return NextResponse.json(dailyWisdom);
}
