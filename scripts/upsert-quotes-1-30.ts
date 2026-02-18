import mongoose from 'mongoose';

const quotes = [
  { author: 'Rumi', farsi: 'از لحظه‌ای که اولین داستان عشق را شنیدم، به دنبال تو گشتم', english: 'The minute I heard my first love story, I started looking for you.' },
  { author: 'Rumi', farsi: 'تو روح روح جهانی، و نام تو عشق است', english: 'You are the soul of the soul of the universe, and your name is Love.' },
  { author: 'Hafez', farsi: 'حتی بعد از همه این سال‌ها، خورشید هرگز به زمین نمی‌گوید تو مرا بدهکار هستی. ببین با عشقی مثل این چه می‌شود. تمام آسمان را روشن می‌کند', english: "Even after all this time, the sun never says to the earth, 'You owe me.' Look what happens with a love like that. It lights the whole sky." },
  { author: 'Rumi', farsi: 'دهانم را بستم و با تو به صد زبان خاموش سخن گفتم', english: 'I closed my mouth and spoke to you in a hundred silent ways.' },
  { author: 'Rumi', farsi: 'عشق بر پایه‌ای استوار نیست. اقیانوسی بی‌پایان است، بی‌آغاز و بی‌پایان', english: 'Love rests on no foundation. It is an endless ocean, with no beginning or end.' },
  { author: 'Rumi', farsi: 'احمقانه عاشق باش، چون عشق تنها چیزی است که هست', english: 'Be foolishly in love, because love is all there is.' },
  { author: 'Rumi', farsi: 'بیا دوباره عاشق شویم و گرد طلا بر تمام جهان بپاشیم', english: 'Let us fall in love again and scatter gold dust all over the world.' },
  { author: 'Rumi', farsi: 'تو قطره‌ای در اقیانوس نیستی. تو تمام اقیانوس در یک قطره‌ای', english: 'You are not a drop in the ocean. You are the entire ocean in a drop.' },
  { author: 'Rumi', farsi: 'مرده بودم، زنده شدم. گریان بودم، خندان شدم. قدرت عشق به من درآمد، و من چون شیر تند شدم، آنگاه چون ستاره شام نرم', english: 'I was dead, then alive. Weeping, then laughing. The power of love came into me, and I became fierce like a lion, then tender like the evening star.' },
  { author: 'Rumi', farsi: 'کار تو جستن عشق نیست، تنها جستن و یافتن همه موانعی است که در درون خود علیه آن ساخته‌ای', english: 'Your task is not to seek for love, but merely to seek and find all the barriers within yourself that you have built against it.' },
  { author: 'Rumi', farsi: 'غمگینibus. هر چه از دست می‌دهی، به شکلی دیگر بازمی‌گردد', english: "Don't grieve. Anything you lose comes round in another form." },
  { author: 'Saadi', farsi: 'صبر داشته باش. همه چیز پیش از آنکه آسان شود، دشوار است', english: 'Have patience. All things are difficult before they become easy.' },
  { author: 'Rumi', farsi: 'زخم، جایی است که نور وارد تو می‌شود', english: 'The wound is the place where the light enters you.' },
  { author: 'Rumi', farsi: 'مانند درخت باش و بگذار برگ‌های مرده بریزند', english: 'Be like a tree and let the dead leaves drop.' },
  { author: 'Imam Ghazali', farsi: 'دانش بدون عمل دیوانگی است، و عمل بدون دانش غرور', english: 'Knowledge without action is insanity, and action without knowledge is vanity.' },
  { author: 'Saadi', farsi: 'فضیلت در ذهن است، نه در ظاهر', english: 'Virtue is in the mind, not in the appearance.' },
  { author: 'Saadi', farsi: 'مرد دانا در میان نادانان، چون دختر زیبا در میان مردان نابینا است', english: 'A wise man among the ignorant is as a beautiful girl in the company of blind men.' },
  { author: 'Rumi', farsi: 'سعی نکن در برابر تغییراتی که راهشان را به سوی تو می‌یابند مقاومت کنی. در عوض، بگذار زندگی از درون تو زندگی کند', english: 'Try not to resist the changes that come your way. Instead, let life live through you.' },
  { author: 'Saadi', farsi: 'بخشش ستودنی است، اما بر زخم ظالم مرهم مگذار', english: 'Forgiveness is commendable, but apply not ointment to the wound of an oppressor.' },
  { author: 'Rumi', farsi: 'جهان بیرون از تو نیست. در درون خود بنگر؛ هر چه می‌خواهی، از پیش هستی', english: 'The universe is not outside of you. Look inside yourself; everything you want, you already are.' },
  { author: 'Rumi', farsi: 'با زندگی به کوتاهی نفسی نیمه‌کشیده، چیزی جز عشق نکار', english: "With life as short as a half-taken breath, don't plant anything but love." },
  { author: 'Omar Khayyam', farsi: 'بیدار شو، زندگی در حال گذر است', english: 'Wake up, life is slipping away.' },
  { author: 'Omar Khayyam', farsi: 'در این لحظه خوش باش. این لحظه زندگی توست', english: 'Be happy for this moment. This moment is your life.' },
  { author: 'Rumi', farsi: 'ای دل بیدار شو، که جهان می‌گذرد، و این عمر گران‌بها بی‌بها می‌گذرد', english: 'Awake, O heart, for the world is passing by, And this precious life is slipping away for free.' },
  { author: 'Hafez', farsi: 'زندگی چیزی به تو نمی‌دهد که پس نگیرد', english: 'Life will give you nothing that it will not take back.' },
  { author: 'Omar Khayyam', farsi: 'آه، بیشترین بهره را از آنچه هنوز می‌توانیم بگذرانیم ببر، پیش از آنکه ما نیز به خاک فرو شویم', english: "Ah, make the most of what we yet may spend, Before we too into the dust descend." },
  { author: 'Rumi', farsi: 'همه چیز برای وقتش منتظر است. حتی گل پیش از وقتش شکوفا نمی‌شود. حتی خورشید پیش از وقتش طلوع نمی‌کند. صبر کن، آنکه متعلق به توست در وقتش به تو خواهد رسید', english: 'Everything waits for its time. Even a rose doesn\'t bloom before its time. Even the sun doesn\'t rise before its time. Wait, one who belongs to you will come to you in its time.' },
  { author: 'Rumi', farsi: 'دنبال آنچه فرار می‌کند نرو. آنچه برای تو مقدر است در وقت خود خواهد آمد', english: "Stop chasing what is running away. What is meant for you will come in its own time" },
  { author: 'Rumi', farsi: 'تنها زیبایی پایدار، زیبایی دل است', english: 'The only lasting beauty is the beauty of the heart.' },
  { author: 'Rumi', farsi: 'صبر فقط منتظر ماندن نیست. اعتماد به سفر است', english: 'Patience is not about waiting. It\'s about trusting the journey.' }
];

const authorMap: Record<string, string> = {
  'Rumi': 'rumi', 'Hafez': 'hafez', 'Saadi': 'saadi', 'Imam Ghazali': 'al-ghazali', 'Omar Khayyam': 'unknown'
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
        sourceWork: 'Love & Longing',
        philosopher: authorMap[q.author] || 'unknown',
        themes: [],
        wisdomScore: 8,
        complexity: 5,
        tags: ['poetry', 'persian-wisdom'],
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
