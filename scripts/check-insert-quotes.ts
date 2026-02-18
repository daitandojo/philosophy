import mongoose from 'mongoose';

const quotes = [
  { author: 'Saadi', farsi: 'بنی‌آدم اعضای یکدیگرند، که در آفرینش ز یک گوهرند', english: 'Human beings are members of a whole, in creation of one essence and soul.' },
  { author: 'Saadi', farsi: 'دوست آینه شخص است', english: 'A friend is the mirror of a person.' },
  { author: 'Rumi', farsi: 'برو! برو! ما می‌رویم و می‌آییم، ای روح، از این جهان جدایی به وصال، همراه به همراه', english: 'Go on! Go on! We are going, and we are coming, O soul, from this world of separation to union, a companion to the companion.' },
  { author: 'Saadi', farsi: 'مرد بی‌دوست مانند دست چپ بدون دست راست است', english: 'A friendless man is like the left hand without the right.' },
  { author: 'Bayazid Bastami', farsi: 'همنشینی با نیکان بهتر از خلوت است، و خلوت بهتر از همنشینی با بدان', english: 'Companionship of the good is better than solitude, and solitude is better than companionship of the bad.' },
  { author: 'Saadi', farsi: 'همراه نیک برای شب‌گردان چراغی است', english: 'A good companion is better than a lamp for those who walk by night.' },
  { author: 'Saadi', farsi: 'سخاوت دل‌های نجیب را پیر نمی‌کند', english: 'Generosity does not age the noble-hearted.' },
  { author: 'Saadi', farsi: 'سخاوت از ثروت نیست، از شخصیت است', english: 'Generosity is not of wealth, but of character.' },
  { author: 'Rumi', farsi: 'با بدان نشین، که همنشینی بد، هر چند پاکی، تو را آلوده می‌کند', english: 'Do not sit with the wicked, for bad company, though you are pure, can taint you.' },
  { author: 'Rumi', farsi: 'با کسانی دوست نشو که تو را از خودت فراموش کنند', english: "Don't make friends with those who make you forget yourself." },
  { author: 'Rumi', farsi: 'من بنده عشقم، و آنان که به عشق بسته شده‌اند', english: 'I am the slave of love, and of those who are bound by love.' },
  { author: 'Saadi', farsi: 'سخاوتمند باش، که بخشیدن به تو می‌آید. هیچ‌کس از بخشیدن کمتر نشده یا مرده است', english: 'Be generous, for helping (others) suits you. No one ever dies or becomes less by giving.' },
  { author: 'Saadi', farsi: 'اگر نسبت به رنج دیگران بی‌تفاوتی، لیاقت نام انسان را نداری', english: 'If you are indifferent to the suffering of others, you are unworthy of the name human.' },
  { author: 'Saadi', farsi: 'خائن نمی‌تواند انتظار وفاداری داشته باشد', english: 'A traitor cannot expect loyalty.' },
  { author: 'Saadi', farsi: 'مرد نیک مانند چشمه است: هم به گل و هم به خار آب می‌دهد', english: 'A good man resembles a spring: he gives water to both rose and thorn.' },
  { author: 'Saadi', farsi: 'به مردم نیکی کن، اگرچه در دریا فرو رود؛ که خدا آن را پاداش می‌دهد، هر چند در پنهان باشد', english: 'Do good unto the people, though it may fall into the sea; for God will recompense it, even if it is done in secret.' },
  { author: 'Saadi', farsi: 'کمی مهربانی از دنیایی از بی‌تفاوتی بهتر است', english: 'A little kindness is better than a world of indifference.' },
  { author: 'Rumi', farsi: 'هر کاری می‌کنی، به خودت می‌کنی - چه خوب چه بد', english: 'Whatever you do, you do to yourself – be it good or bad.' },
  { author: 'Saadi', farsi: 'فرزندان آدم اعضای یکدیگرند', english: 'The children of Adam are limbs of one body.' },
  { author: 'Saadi', farsi: 'دوست در سختی شناخته می‌شود؛ دشمن در سقوطت آشکار می‌شود', english: 'A friend is known in hardship; an enemy reveals himself in your downfall.' },
  { author: 'Saadi', farsi: 'درختی بکار که نیاز مردم را برطرف کند، نه آنکه تنها سایه‌اش بر تو بیافتد', english: "Plant a tree that will satisfy the people's needs, not one whose shade falls only on yourself." },
  { author: 'Rumi', farsi: 'مانند خورشید در بخشش و مهربانی باش', english: 'Be like the sun in generosity and kindness.' },
  { author: 'Saadi', farsi: 'نیکی هرگز هدر نمی‌رود، حتی اگر در پنهان یا برای ناشایست باشد', english: 'Goodness is never wasted, even if done in secret or for the unworthy.' },
  { author: 'Saadi', farsi: 'مرد را به لباسش نجیب نشمار. نجابت در شخصیت است، نه در جامه', english: "Do not think a man noble because of his dress. A man's nobility is in his character, not in his robe." },
  { author: 'Ferdowsi', farsi: 'عزت در طلا یا نسب نیه در خرد، شجاعست، بلکت و فضیلت است', english: 'Honor is not in gold or lineage, but in wisdom, courage, and virtue.' },
  { author: 'Saadi', farsi: 'آنکه نه دانش دارد نه فضیلت، مانند درخت بی‌ثمر است؛ تنها فضا می‌گیرد', english: 'He who has neither knowledge nor virtue is like a barren tree; he only takes up space.' },
  { author: 'Rumi', farsi: 'درد مرد را از جهان حواس‌پرتی‌ها بیرون می‌کشد. او را بیدار می‌کند', english: 'Pain pulls a man out of the world of distractions. It awakens him.' },
  { author: 'Ferdowsi', farsi: 'کسی از ثمره نیکی محروم نمی‌ماند؛ نیکوکار از هر سوی پاداش می‌گیرد', english: 'No one is deprived of the fruit of goodness; The doer of good receives reward from every direction.' },
  { author: 'Rumi', farsi: 'قلم آنچه را باید نوشت و گذشت. چرا بر آنچه نمی‌توانست باشد شکایت کنی؟', english: 'The Pen has written what it must and moved on. Why complain about what could not have been?' },
  { author: 'Ferdowsi', farsi: 'سرنوشت همه چیز را مغلوب می‌کند، پسرم. نه قدرت و نه مهارت می‌تواند آن را دفع کند', english: 'Destiny overcomes all, my son. Neither strength nor skill can repel it.' },
  { author: 'Ferdowsi', farsi: 'آنچه سرنوشت است رخ خواهد داد، حتی اگر در قلعه‌ای از برنز پنهان شوی', english: 'What is fated will come to pass, even if you hide in a fortress of brass.' },
  { author: 'Ferdowsi', farsi: 'وقت شب تاریک شود، نوری ظاهر خواهد شد؛ از ماه، از خورشید، یا از ستاره‌ای درخشان', english: 'When the night grows dark, a light will appear; From the moon, the sun, or a shining star.' },
  { author: 'Saadi', farsi: 'سرنوشت ممکن است دری را ببندد، اما تلاش پنجره‌ای می‌یابد', english: 'Fate may close a door, but effort finds a window.' },
  { author: 'Saadi', farsi: 'اگرچه سرنوشت می‌بخشد، تلاش است که تحویل می‌دهد. مروارید در اعماق است - تنها غواص آن را می‌یابد', english: 'Though fate bestows, it is effort that delivers. The pearl lies deep—only the diver finds it.' },
  { author: 'Hafez', farsi: 'چون خدا می‌دهد، خوب و بد خواهد گذشت. غمگین悲惨، که این نیز بگذرد', english: 'Since it is God who gives, good and bad shall pass. Grieve not, for this too shall pass.' }
];

const authorMap: Record<string, string> = {
  'Rumi': 'rumi', 'Hafez': 'hafez', 'Saadi': 'saadi', 'Ferdowsi': 'ferdowsi', 'Bayazid Bastami': 'bastami'
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
        sourceWork: 'Friendship & Humanity',
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
    console.log('All 35 quotes already exist in database');
  }

  await mongoose.disconnect();
}

checkAndInsert().catch(console.error);
