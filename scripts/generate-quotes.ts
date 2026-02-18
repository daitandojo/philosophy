const API_URL = process.env.API_URL || 'http://localhost:3000';
const VERSES_API = `${API_URL}/api/verses/generate`;

// Optional: limit to specific philosophers via command line args
const limitedPhilosophers = process.argv.slice(2);

const philosophers = [
  { id: 'rumi', target: 150 },
  { id: 'hafez', target: 150 },
  { id: 'saadi', target: 100 },
  { id: 'attar', target: 80 },
  { id: 'sanai', target: 70 },
  { id: 'jami', target: 60 },
  { id: 'nizami', target: 50 },
  { id: 'ferdowsi', target: 60 },
  { id: 'ibn-sina', target: 50 },
  { id: 'al-farabi', target: 40 },
  { id: 'al-ghazali', target: 50 },
  { id: 'suhrawardi', target: 40 },
  { id: 'mulla-sadra', target: 50 },
  { id: 'nasir-tusi', target: 30 },
  { id: 'ibn-rushd', target: 30 },
  { id: 'al-kindi', target: 25 },
  { id: 'ibn-arabi', target: 50 },
  { id: 'bayazid-bastami', target: 25 },
  { id: 'hallaj', target: 30 },
  { id: 'junayd-baghdadi', target: 20 },
  { id: 'abdul-qadir-gilani', target: 25 },
  { id: 'najm-kubra', target: 20 },
  { id: 'seyyed-hossein-nasr', target: 50 },
  { id: 'allama-tabatabai', target: 30 },
  { id: 'morteza-motahhari', target: 40 },
  { id: 'abdolkarim-soroush', target: 30 },
  { id: 'dariush-shayegan', target: 25 },
  { id: 'zoroaster', target: 20 },
  { id: 'mazdak', target: 15 },
  { id: 'mani', target: 20 },
].filter(p => limitedPhilosophers.length === 0 || limitedPhilosophers.includes(p.id));

async function generateVerses(philosopherId: string, count: number, force = false): Promise<any> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 120000); // 2 minute timeout

  try {
    const response = await fetch(VERSES_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ philosopherId, count, force }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`HTTP ${response.status}: ${error}`);
    }

    return await response.json();
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

async function getVerseCounts(): Promise<Record<string, number>> {
  try {
    const response = await fetch(VERSES_API);
    if (!response.ok) return {};
    const data = await response.json();
    return data.byPhilosopher || {};
  } catch {
    return {};
  }
}

async function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function generateForPhilosopher(
  philosopher: { id: string; target: number },
  existingCounts: Record<string, number>
): Promise<{ success: boolean; versesCreated: number; duplicatesSkipped: number }> {
  const { id, target } = philosopher;
  const existing = existingCounts[id] || 0;
  
  if (existing >= target) {
    console.log(`  ✓ ${id}: already has ${existing} verses (target: ${target})`);
    return { success: true, versesCreated: 0, duplicatesSkipped: 0 };
  }

  const needed = target - existing;
  let totalCreated = 0;
  let totalSkipped = 0;
  let batchSize = Math.min(needed, 10); // Use smaller batches
  let remaining = needed;
  let attempts = 0;
  const maxAttempts = 10;

  while (remaining > 0 && attempts < maxAttempts) {
    try {
      console.log(`  Generating ${batchSize} verses for ${id}...`);
      const result = await generateVerses(id, batchSize, true);
      
      totalCreated += result.versesCreated || 0;
      totalSkipped += result.duplicatesSkipped || 0;
      remaining -= (result.versesCreated || 0);
      
      console.log(`    Created: ${result.versesCreated}, Skipped duplicates: ${result.duplicatesSkipped}, Total now: ${result.totalVerses}`);
      
      if (result.versesCreated === 0 && result.duplicatesSkipped > 0) {
        console.log(`    Too many duplicates, waiting...`);
        await delay(5000);
        attempts++;
      } else {
        attempts = 0;
      }
      
      await delay(3000); // Longer delay between batches
    } catch (error) {
      console.error(`    Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      attempts++;
      await delay(10000); // Longer delay on error
    }
  }

  const success = totalCreated > 0 || existing >= target;
  console.log(`  ${success ? '✓' : '✗'} ${id}: ${totalCreated} created, ${totalSkipped} duplicates skipped, final count: ~${existing + totalCreated}`);
  
  return { success, versesCreated: totalCreated, duplicatesSkipped: totalSkipped };
}

async function main() {
  console.log('=== Hikmatia Quote Generator ===\n');
  console.log('Getting current verse counts...');
  const existingCounts = await getVerseCounts();
  console.log('Current counts:', JSON.stringify(existingCounts, null, 2));
  console.log(`Total verses in database: ${Object.values(existingCounts).reduce((a, b) => a + b, 0)}\n`);

  let totalCreated = 0;
  let totalSkipped = 0;
  let successful = 0;
  let failed = 0;

  for (const philosopher of philosophers) {
    console.log(`\nProcessing ${philosopher.id} (target: ${philosopher.target})...`);
    const result = await generateForPhilosopher(philosopher, existingCounts);
    
    totalCreated += result.versesCreated;
    totalSkipped += result.duplicatesSkipped;
    
    if (result.success) {
      successful++;
    } else {
      failed++;
    }
    
    await delay(5000);
  }

  console.log('\n=== Summary ===');
  console.log(`Philosophers processed: ${philosophers.length}`);
  console.log(`Successful: ${successful}, Failed: ${failed}`);
  console.log(`Total verses created: ${totalCreated}`);
  console.log(`Total duplicates skipped: ${totalSkipped}`);

  const finalCounts = await getVerseCounts();
  console.log('\nFinal counts:', JSON.stringify(finalCounts, null, 2));
  console.log(`Total verses in database: ${Object.values(finalCounts).reduce((a, b) => a + b, 0)}`);
}

main().catch(console.error);
