import { NextResponse } from 'next/server';
import { philosophers, getPhilosopherById, getWorksByPhilosopher, getAllSchools, getAllEras } from '@/lib/philosophers';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const era = searchParams.get('era');
  const school = searchParams.get('school');
  const search = searchParams.get('search');
  const limit = parseInt(searchParams.get('limit') || '50');
  const offset = parseInt(searchParams.get('offset') || '0');

  let filteredPhilosophers = [...philosophers];

  if (era) {
    filteredPhilosophers = filteredPhilosophers.filter(p => p.life.era === era);
  }

  if (school) {
    filteredPhilosophers = filteredPhilosophers.filter(p => 
      p.school.some(s => s.toLowerCase().includes(school.toLowerCase()))
    );
  }

  if (search) {
    const searchLower = search.toLowerCase();
    filteredPhilosophers = filteredPhilosophers.filter(p =>
      p.name.english.toLowerCase().includes(searchLower) ||
      p.name.persian.includes(search) ||
      p.description.toLowerCase().includes(searchLower)
    );
  }

  const total = filteredPhilosophers.length;
  const paginatedPhilosophers = filteredPhilosophers.slice(offset, offset + limit);

  return NextResponse.json({
    philosophers: paginatedPhilosophers,
    total,
    limit,
    offset,
    eras: getAllEras(),
    schools: getAllSchools(),
  });
}
