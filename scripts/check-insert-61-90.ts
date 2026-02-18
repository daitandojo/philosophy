import mongoose from 'mongoose';

const quotes = [
  { author: 'Rumi', farsi: 'باغ جهان محدودیتی جز در ذهن تو ندارد', english: 'The garden of the world has no limits except in your mind.' },
  { author: 'Rumi', farsi: 'نادرترین عصاره گل در خار زندگی می‌کند', english: "A rose's rarest essence lives in the thorn." },
  { author: 'Rumi', farsi: 'ماه وقتی روشن می‌ماند که از شب نگریزد', english: 'The moon stays bright when it doesn\'t avoid the night.' },
  { author: 'Hafez', farsi: 'اگر نسیم از میان زلف معشوق بگذرد، گل از شادی در باغ شکوفا می‌شود', english: 'If the breeze passes through the tresses of the beloved, the rose will bloom from joy in the garden.' },
  { author: 'Saadi', farsi: 'عطر گل بر دستی که آن را می‌بخشد می‌ماند', english: 'The fragrance of the rose stays on the hand that gives it.' },
  { author: 'Hafez', farsi: 'عظمت باغ می‌گذرد، اما عطر گل می‌ماند', english: "The garden's glory fades, but the scent of the flower endures." },
  { author: 'Ferdowsi', farsi: 'از دل کوه آب جاری می‌شود، زندگی به هر مزرعه خشکی می‌بخشد', english: "From the mountain's heart flows water, bringing life to every dry field." },
  { author: 'Persian Proverb', farsi: 'خار در راه از هزار گل آموزنده‌تر است', english: 'A thorn in the path teaches more than a thousand roses.' },
  { author: 'Hafez', farsi: 'زیبایی ماه در شکلش نیست، بلکه در نوری است که بر باغ گل می‌افکند', english: 'The beauty of the moon is not in its shape, but in the light it casts on the rose garden.' },
  { author: 'Saadi', farsi: 'حتی بلبل آوازش را از سکوت باغ می‌آموزد', english: 'Even the nightingale learns its song from the silence of the garden.' },
  { author: 'Saadi', farsi: 'هر برگی که می‌افتد، از گذر صفحه زندگی سخن می‌گوید', english: 'Each leaf that falls speaks of life\'s turning page.' },
  { author: 'Hafez', farsi: 'لاله به گل رشک نمی‌برد. هر کدام در وقت خود، با زیبایی خود می‌شکفند', english: 'The tulip does not envy the rose. Each blooms in its own time, with its own grace.' },
  { author: 'Saadi', farsi: 'گل به خار گفت: من هم دردی را شناخته‌ام', english: 'The rose said to the thorn: I too have known pain.' },
  { author: 'Attar', farsi: 'زیبایی گل نمی‌ماند، اما عطرش برای همیشه به روح می‌چسبد', english: "The rose's beauty does not last, but its scent clings to the soul forever." },
  { author: 'Rumi', farsi: 'بهار می‌گذرد، و یکی بی‌گناهی برگ‌ها را به یاد می‌آورد', english: 'Spring passes, and one remembers the innocence of leaves.' },
  { author: 'Rumi', farsi: 'کلماتت را بلند کن، نه صدایت را. باران است که گل‌ها را می‌رویاند، نه رعد', english: 'Raise your words, not your voice. It is rain that grows flowers, not thunder.' },
  { author: 'Ferdowsi', farsi: 'قهرمانی که از مرگ برای وطن نمی‌ترسد، از تختی که بر آن می‌نشیند قوی‌تر است', english: 'A hero who does not fear death for his country is stronger than the chair he sits upon.' },
  { author: 'Saadi', farsi: 'سخاوت دست از بازوی قوی بهتر است', english: 'A liberality of the hand is better than a strong arm.' },
  { author: 'Saadi', farsi: 'اگرچه بازویت قوی است، اما دهانت کلمات شیرین بر زبان بیاورد؛ شجاعت در مشت زدن به صورت دیگری نیست', english: 'Though thou art strong of arm, let thy mouth utter sweet words; it is no proof of courage to thrust thy fist into another man\'s face.' },
  { author: 'Attar', farsi: 'آنکه به شاه می‌رسد، از شیر در راه نمی‌ترسد', english: 'He who reaches the king does not fear the lion in the path.' },
  { author: 'Saadi', farsi: 'شجاعت در نخستین ضربه زدن نیست، که در تحمل اهانت و همچنان عدالت ورزیدن است', english: 'Bravery is not to strike first, but to endure insult and still act justly.' },
  { author: 'Saadi', farsi: 'آنکه نمی‌تواند کلمه انتقادی را تحمل کند، از کودک هم ضعیف‌تر است', english: 'He who cannot bear a word of criticism is weaker than a child.' },
  { author: 'Saadi', farsi: 'مرد شجاع کم سخن می‌گوید اما با عزت عمل می‌کند', english: 'The brave man speaks little but acts with dignity.' },
  { author: 'Saadi', farsi: 'بهتر است در نبرد با عزت بمیریم، تا با شرم زندگی کنیم', english: 'Better to fall in battle with honor than live with shame.' },
  { author: 'Rumi', farsi: 'شیر که صفوف دشمن را می‌شکافد،سه با شیر در مقایی که بر خود چیره می‌شود، قهرمان کوچکی است', english: 'The lion who breaks the enemy\'s ranks is a minor hero compared to the lion who overcomes himself.' },
  { author: 'Rumi', farsi: 'از آتش نگریز، در آن شیرجه بزن. آنجاست که نور است', english: 'Don\'t run from the fire, dive into it. That\'s where the light is.' },
  { author: 'Attar', farsi: 'آنکه معشوق را می‌جوید، باید همه ترس‌ها را از دست بدهد - حتی ترس از خود', english: 'He who seeks the Beloved must lose all fear—even of himself.' },
  { author: 'Attar', farsi: 'این راه برای ترسوها نیست. اگر نمی‌توانی خار را تحمل کنی، گل را نخواه', english: 'The way is not for the timid. If you cannot bear thorns, do not crave the rose.' },
  { author: 'Rumi', farsi: 'سکوت کن، چون جهان سکوت، وسیعی سرشار است', english: 'Keep silent, because the world of silence is a vast fullness.' },
  { author: 'Saadi', farsi: 'اگرچه قدرت داری مردی را پاره کنی، شجاعت واقعی بخشیدن است وقتی می‌توانی مجازات کنی', english: 'Though you have the strength to tear a man apart, true courage is to forgive when you can punish.' }
];

const authorMap: Record<string, string> = {
  'Rumi': 'rumi', 'Hafez': 'hafez', 'Saadi': 'saadi', 'Ferdowsi': 'ferdowsi', 'Attar': 'attar', 'Persian Proverb': 'unknown'
};

async function checkAndInsert() {
  const mongoUri = process.env.MONGO_URI || 'mongodb+srv://haelpers:Atlas15@haelpers-m0.lz3bcwm.mongodb.net/haelpers?retryWrites=true&w=majority';
  await mongoose.connect(mongoUri);
  const db = mongoose.connection.db;
  if (!db) {
    console.error('Database connection not established');
    await mongoose.disconnect();
    return;
  }
  const collection = db.collection('verses');

  const toInsert = [];
  for (const q of quotes) {
    const existing = await collection.findOne({ persianText: q.farsi });
    if (!existing) {
      toInsert.push({
        persianText: q.farsi,
        transliteration: q.farsi,
        englishTranslation: q.english,
        summary: q.english,
        sourceWork: 'Nature & Beauty',
        philosopher: authorMap[q.author] || 'unknown',
        themes: [],
        wisdomScore: 8,
        complexity: 5,
        tags: ['poetry', 'persian-wisdom'],
        versions: []
      });
    }
  }

  if (toInsert.length > 0) {
    const result = await collection.insertMany(toInsert);
    console.log('Inserted:', result.insertedCount);
  } else {
    console.log('All 30 quotes already exist in database');
  }

  await mongoose.disconnect();
}

checkAndInsert().catch(console.error);
