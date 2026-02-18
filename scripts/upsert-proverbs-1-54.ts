import mongoose from 'mongoose';

const quotes = [
  { author: 'Unknown', farsi: 'آنقدر برو که می‌بینی، وقتی رسیدی، دورتر را خواهی دید', english: 'Go as far as you can see, and when you get there you\'ll see further.' },
  { author: 'Saadi', farsi: 'گریه کردم چون کفش نداشتم، تا مردی را دیدم که پا نداشت', english: 'I wept because I had no shoes, until I saw a man who had no feet.' },
  { author: 'Unknown', farsi: 'هر آنچه بکاری، همان را درو می‌کنی', english: 'Whatever you sow, you reap.' },
  { author: 'Unknown', farsi: 'آدم طمعکار همیشه فقیر است', english: 'A greedy man is always poor.' },
  { author: 'Unknown', farsi: 'تیر از زخم بیرون می‌آید، اما سخن بد برای همیشه در دل می‌ماند', english: 'An arrow can be pulled out of a wound, but a hurtful word stays forever in heart.' },
  { author: 'Unknown', farsi: 'چنانکه بهترین شراب تلخ‌ترین سرکه را می‌سازد، عاشق راستین بدترین دشمن می‌شود', english: 'As the best wine makes the sharpest vinegar, the truest lover may turn into the worst enemy.' },
  { author: 'Unknown', farsi: 'شجاعت بدون پیش‌بینی مانند اسب کور است', english: 'Bravery without foresight is like a blind horse.' },
  { author: 'Unknown', farsi: 'رشوه هر دو طرف را خوشحال می‌کند', english: 'Bribery makes both parties happy.' },
  { author: 'Unknown', farsi: 'درختی که به تو سایه می‌دهد، مبر', english: 'Do not cut down the tree that gives you shade.' },
  { author: 'Unknown', farsi: 'هر کس به مرگ می‌رود و در دستانش تنها آنچه را بخشیده است، با خود می‌برد', english: 'Every man goes down to his death bearing in his hands only that which he has given away.' },
  { author: 'Unknown', farsi: 'مگس به آسانی در عسل می‌افتد، مشکلش بیرون آمدن است', english: 'Flies will easily fly into the honey -- their problem is how to get out.' },
  { author: 'Unknown', farsi: 'خداوند به اندازهٔ وسعت دل ما می‌بخشد', english: 'God gives to us according to the measure of our hearts.' },
  { author: 'Unknown', farsi: 'وقتی بخت با کسى بسازد، ژله هم دندانش را می‌شکند', english: 'If fortune turns against you, even jelly breaks your tooth.' },
  { author: 'Unknown', farsi: 'ادب را از بی‌ادبان بیاموز', english: 'Learn good manners from those who don\'t have them.' },
  { author: 'Unknown', farsi: 'دری را باز مکن که نتوانی ببندی', english: 'Never open a door that you can\'t lock again.' },
  { author: 'Unknown', farsi: 'شاخه‌ای که میوه بیشتری دارد، فروتنانه به زمین خم می‌شود', english: 'The branch that bears the most fruit bends itself thankfully towards the ground.' },
  { author: 'Attar', farsi: 'این نیز بگذرد', english: 'This too, shall pass.' },
  { author: 'Unknown', farsi: 'همه را نمی‌توان از خود راضی نگه داشت', english: 'You can\'t please everyone.' },
  { author: 'Unknown', farsi: 'آنچه می‌خوری فاسد می‌شود، آنچه می‌بخشی گل سرخ می‌شود', english: 'Whatever you eat will rot, whatever you give will blossom into a rose.' },
  { author: 'Unknown', farsi: 'سخنانی که برای دهانت بزرگ است، به کار مبر', english: 'Do not use words that are too big for your mouth.' },
  { author: 'Unknown', farsi: 'برای مورچه، چند قطره شبنم سیل است', english: 'To the ant, a few drops of dew are a flood.' },
  { author: 'Unknown', farsi: 'تیر از کمان رفته هرگز باز نمی‌گردد', english: 'The arrow that has left the bow never returns.' },
  { author: 'Unknown', farsi: 'تحسین واقعی از دشمن می‌آید', english: 'It is a real compliment that comes from an enemy.' },
  { author: 'Unknown', farsi: 'اگر مرهم برای زخمم نداری، دست کم نمک نپاش', english: 'If you can give me no ointment for my wound, can you help me by not rubbing salt in?' },
  { author: 'Unknown', farsi: 'هر قدر سقف خانه بزرگتر باشد، برف بیشتری روی آن جمع می‌شود', english: 'The larger a man\'s roof, the more snow it collects.' },
  { author: 'Unknown', farsi: 'آنکه دلش با عشق بیدار است، هرگز نمی‌میرد', english: 'He whose heart is aroused by love will never die.' },
  { author: 'Unknown', farsi: 'آنکه در حال غرق شدن است، از باران نمی‌ترسد', english: 'The drowning man is not troubled by rain.' },
  { author: 'Unknown', farsi: 'کسی که یک دشمن دارد، او را همه جا می‌بیند', english: 'He, who has only one enemy, meets him everywhere.' },
  { author: 'Unknown', farsi: 'دزد تا گرفتار نشود، پادشاه است', english: 'A thief is a king till he\'s caught.' },
  { author: 'Unknown', farsi: 'زمین میزبانی است که مهمانانش را می‌کشد', english: 'The earth is a host who kills his guests.' },
  { author: 'Unknown', farsi: 'چیدمان خانه نشان‌دهنده صاحب آن است', english: 'The way a house is decorated will tell much about its owner.' },
  { author: 'Unknown', farsi: 'از کسانی بترس که از خدا نمی‌ترسند', english: 'Fear those who do not fear God.' },
  { author: 'Unknown', farsi: 'گناه در پنهان از لذت در آشکار خوشایندتر است', english: 'To sin in secret is more pleasant than having pleasure in the open.' },
  { author: 'Unknown', farsi: 'ضرورت شیر را به روباه تبدیل می‌کند', english: 'Necessity changes a lion into a fox.' },
  { author: 'Unknown', farsi: 'بلوغ از خرد می‌آید، نه از گذشت سال‌ها', english: 'Maturity comes from wisdom not in the passing of years.' },
  { author: 'Unknown', farsi: 'شیر که پیر شود، بازیچه شغال‌ها می‌شود', english: 'When a lion is old, he becomes the play thing of jackals.' },
  { author: 'Unknown', farsi: 'گلی که پرتاب می‌کنی، بر سر خودت می‌ریزد', english: 'The mud that you throw will fall on your own head.' },
  { author: 'Unknown', farsi: 'سوزن لباس می‌دوزد، اما خود برهنه است', english: 'The needle makes clothes but stays naked.' },
  { author: 'Unknown', farsi: 'شک کلید دانش است', english: 'Doubt is the key to knowledge.' },
  { author: 'Unknown', farsi: 'در این دنیا بخشنده‌ها پول ندارند و صاحبان پول بخشنده نیستند', english: 'In this world generous people have no money and those with money are not generous.' },
  { author: 'Unknown', farsi: 'فردا را کی دیده است؟', english: 'Who has ever seen tomorrow?' },
  { author: 'Unknown', farsi: 'هر کس فکر می‌کند تف خودش شیرین است', english: 'Everyone thinks his own spit tastes good.' },
  { author: 'Unknown', farsi: 'سنگ به شیشه بزند، شیشه می‌شکند. شیشه به سنگ بزند، شیشه می‌شکند', english: 'When a stone hits glass, the glass breaks. When glass hits a stone, the glass breaks.' },
  { author: 'Unknown', farsi: 'توبه گرگ مرده است', english: 'A wolf\'s repentance died a long time ago.' },
  { author: 'Unknown', farsi: 'پدر را روزی قدر می‌دانی که خود پدر شوی', english: 'You only appreciate your father the day you become a father yourself.' },
  { author: 'Unknown', farsi: 'مهمان با ده برکت می‌آید، یکی می‌خورد و نه تایی می‌ماند', english: 'A visitor comes with ten blessings, eats one, and leaves nine.' },
  { author: 'Unknown', farsi: 'سگ در خانه خودش شیر است', english: 'The dog is a lion in his own house.' },
  { author: 'Unknown', farsi: 'یک پوند دانش ده پوند عقل می‌خواهد تا به کار آید', english: 'One pound of learning requires ten pounds of common sense to apply it.' },
  { author: 'Unknown', farsi: 'چهار چیز است که هر کس بیش از آنچه می‌داند دارد: گناه، بدهی، سال و دشمن', english: 'There are four things every person has more of than they know; sins, debt, years, and foes.' },
  { author: 'Unknown', farsi: 'حق شادی از مرگ دشمنم را ندارم وقتی خودم زندگی جاودان ندارم', english: 'I have no right to rejoice at the death of my enemy when I do not have eternal life myself.' },
  { author: 'Unknown', farsi: 'معمایی که حل شده آسان به نظر می‌رسد', english: 'Solved riddles look easy.' },
  { author: 'Unknown', farsi: 'بهانه احمق از اشتباهش بزرگتر است', english: 'The fool\'s excuse is bigger than the mistake he made.' },
  { author: 'Unknown', farsi: 'عالم عالمتی که به کار نبرد، مانند زنبوری است که عسل ندهد', english: 'The wise man that does not put his knowledge into practice is like a bee that gives no honey.' },
  { author: 'Unknown', farsi: 'پایت را برابر گلیمت دراز کن', english: 'Stretch your foot to the length of your blanket.' }
];

const authorMap: Record<string, string> = {
  'Saadi': 'saadi',
  'Attar': 'attar',
  'Unknown': 'unknown'
};

async function checkAndUpsert() {
  const mongoUri = process.env.MONGO_URI || 'mongodb+srv://haelpers:Atlas15@haelpers-m0.lz3bcwm.mongodb.net/haelpers?retryWrites=true&w=majority';
  await mongoose.connect(mongoUri);
  const db = mongoose.connection.db;
  if (!db) throw new Error('No database connection');
  const collection = db.collection('verses');

  let inserted = 0;
  let updated = 0;

  for (const q of quotes) {
    const existing = await collection.findOne({ persianText: q.farsi });
    if (!existing) {
      await collection.insertOne({
        persianText: q.farsi,
        transliteration: q.farsi,
        englishTranslation: q.english,
        summary: q.english,
        sourceWork: 'Persian Proverbs',
        philosopher: authorMap[q.author] || 'unknown',
        themes: [],
        wisdomScore: 8,
        complexity: 5,
        tags: ['proverbs', 'persian-wisdom'],
        versions: []
      });
      inserted++;
    } else if (!existing.englishTranslation || existing.englishTranslation !== q.english) {
      await collection.updateOne(
        { _id: existing._id },
        { $set: { englishTranslation: q.english } }
      );
      updated++;
    }
  }

  console.log(`Inserted: ${inserted}, Updated: ${updated}`);
  await mongoose.disconnect();
}

checkAndUpsert().catch(console.error);
