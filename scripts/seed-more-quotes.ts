import mongoose from 'mongoose';

const quotes = [
  {
    author: "Rumi",
    original_farsi: "از لحظه‌ای که اولین داستان عشق را شنیدم، به دنبال تو گشتم",
    quote_english: "The minute I heard my first love story, I started looking for you.",
    level_of_wisdom: "High",
    themes: ["love", "destiny", "searching", "soulmate"],
    category: "Love & Longing"
  },
  {
    author: "Rumi",
    original_farsi: "تو روح روح جهانی، و نام تو عشق است",
    quote_english: "You are the soul of the soul of the universe, and your name is Love.",
    level_of_wisdom: "High",
    themes: ["love", "divine", "universe", "spirituality"],
    category: "Love & Longing"
  },
  {
    author: "Hafez",
    original_farsi: "حتی بعد از همه این سال‌ها، خورشید هرگز به زمین نمی‌گوید تو مرا بدهکار هستی. ببین با عشق چه می‌شود. تمام آسمان را روشن می‌کند",
    quote_english: "Even after all this time, the sun never says to the earth, 'You owe me.' Look what happens with a love like that. It lights the whole sky.",
    level_of_wisdom: "High",
    themes: ["love", "generosity", "gratitude", "selflessness"],
    category: "Love & Longing"
  },
  {
    author: "Rumi",
    original_farsi: "دهانم را بستم و با تو به صد زبان خاموش سخن گفتم",
    quote_english: "I closed my mouth and spoke to you in a hundred silent ways.",
    level_of_wisdom: "High",
    themes: ["love", "silence", "communication", "soul"],
    category: "Love & Longing"
  },
  {
    author: "Rumi",
    original_farsi: "عشق بر پایه‌ای استوار نیست. اقیانوسی بی‌پایان است، بی‌آغاز و بی‌پایان",
    quote_english: "Love rests on no foundation. It is an endless ocean, with no beginning or end.",
    level_of_wisdom: "High",
    themes: ["love", "infinity", "mystery", "depth"],
    category: "Love & Longing"
  },
  {
    author: "Rumi",
    original_farsi: "احمقانه عاشق باش، چون عشق تنها چیزی است که هست",
    quote_english: "Be foolishly in love, because love is all there is.",
    level_of_wisdom: "High",
    themes: ["love", "abandon", "passion", "devotion"],
    category: "Love & Longing"
  },
  {
    author: "Rumi",
    original_farsi: "بیا دوباره عاشق شویم و گرد طلا بر تمام جهان بپاشیم",
    quote_english: "Let us fall in love again and scatter gold dust all over the world.",
    level_of_wisdom: "High",
    themes: ["love", "joy", "generosity", "transformation"],
    category: "Love & Longing"
  },
  {
    author: "Rumi",
    original_farsi: "تو قطره‌ای در اقیانوس نیستی. تو تمام اقیانوس در یک قطره‌ای",
    quote_english: "You are not a drop in the ocean. You are the entire ocean in a drop.",
    level_of_wisdom: "High",
    themes: ["self", "universe", "infinity", "potential"],
    category: "Love & Longing"
  },
  {
    author: "Rumi",
    original_farsi: "مرده بودم، زنده شدم. گریان بودم، خندان شدم. قدرت عشق به من درآمد، و من چون شیر تند شدم، آنگاه چون ستاره شام نرم",
    quote_english: "I was dead, then alive. Weeping, then laughing. The power of love came into me, and I became fierce like a lion, then tender like the evening star.",
    level_of_wisdom: "High",
    themes: ["transformation", "love", "duality", "rebirth"],
    category: "Love & Longing"
  },
  {
    author: "Rumi",
    original_farsi: "کار تو جستن عشق نیست، تنها جستن و یافتن همه موانعی است که در درون خود علیه آن ساخته‌ای",
    quote_english: "Your task is not to seek for love, but merely to seek and find all the barriers within yourself that you have built against it.",
    level_of_wisdom: "High",
    themes: ["love", "self-awareness", "healing", "growth"],
    category: "Love & Longing"
  },
  {
    author: "Rumi",
    original_farsi: "غمگین مباش. هر چه از دست می‌دهی، به شکلی دیگر بازمی‌گردد",
    quote_english: "Don't grieve. Anything you lose comes round in another form.",
    level_of_wisdom: "High",
    themes: ["loss", "transformation", "hope", "acceptance"],
    category: "Wisdom & Life"
  },
  {
    author: "Saadi",
    original_farsi: "صبر داشته باش. همه چیز پیش از آنکه آسان شود، دشوار است",
    quote_english: "Have patience. All things are difficult before they become easy.",
    level_of_wisdom: "High",
    themes: ["patience", "perseverance", "growth", "wisdom"],
    category: "Wisdom & Life"
  },
  {
    author: "Rumi",
    original_farsi: "زخم، جایی است که نور وارد تو می‌شود",
    quote_english: "The wound is the place where the light enters you.",
    level_of_wisdom: "High",
    themes: ["suffering", "healing", "growth", "transformation"],
    category: "Wisdom & Life"
  },
  {
    author: "Rumi",
    original_farsi: "مانند درخت باش و بگذار برگ‌های مرده بیفتند",
    quote_english: "Be like a tree and let the dead leaves drop.",
    level_of_wisdom: "High",
    themes: ["letting go", "change", "nature", "renewal"],
    category: "Wisdom & Life"
  },
  {
    author: "Imam Ghazali",
    original_farsi: "دانش بدون عمل دیوانگی است، و عمل بدون دانش غرور",
    quote_english: "Knowledge without action is insanity, and action without knowledge is vanity.",
    level_of_wisdom: "High",
    themes: ["knowledge", "action", "wisdom", "balance"],
    category: "Wisdom & Life"
  },
  {
    author: "Saadi",
    original_farsi: "فضیلت در ذهن است، نه در ظاهر",
    quote_english: "Virtue is in the mind, not in the appearance.",
    level_of_wisdom: "High",
    themes: ["virtue", "character", "authenticity", "wisdom"],
    category: "Wisdom & Life"
  },
  {
    author: "Saadi",
    original_farsi: "مرد دانا در میان نادانان، چون دختر زیبا در میان مردان نابینا است",
    quote_english: "A wise man among the ignorant is as a beautiful girl in the company of blind men.",
    level_of_wisdom: "Medium",
    themes: ["wisdom", "ignorance", "isolation", "value"],
    category: "Wisdom & Life"
  },
  {
    author: "Rumi",
    original_farsi: "سعی نکن در برابر تغییراتی که راهشان به سوی تو می‌آیند مقاومت کنی. در عوض، بگذار زندگی از درون تو زندگی کند",
    quote_english: "Try not to resist the changes that come your way. Instead, let life live through you.",
    level_of_wisdom: "High",
    themes: ["change", "acceptance", "flow", "presence"],
    category: "Wisdom & Life"
  },
  {
    author: "Saadi",
    original_farsi: "بخشش ستودنی است، اما بر زخم ظالم مرهم مگذار",
    quote_english: "Forgiveness is commendable, but apply not ointment to the wound of an oppressor.",
    level_of_wisdom: "High",
    themes: ["forgiveness", "justice", "boundaries", "wisdom"],
    category: "Wisdom & Life"
  },
  {
    author: "Rumi",
    original_farsi: "جهان بیرون از تو نیست. در درون خود بنگر؛ هر چه می‌خواهی، از پیش هستی",
    quote_english: "The universe is not outside of you. Look inside yourself; everything you want, you already are.",
    level_of_wisdom: "High",
    themes: ["self", "universe", "abundance", "inner peace"],
    category: "Wisdom & Life"
  },
  {
    author: "Rumi",
    original_farsi: "با زندگی به کوتاهی نفسی نیمه‌کشیده، چیزی جز عشق نکار",
    quote_english: "With life as short as a half-taken breath, don't plant anything but love.",
    level_of_wisdom: "High",
    themes: ["mortality", "love", "priority", "urgency"],
    category: "Time, Fate & Mortality"
  },
  {
    author: "Omar Khayyam",
    original_farsi: "بیدار شو، زندگی در حال گذر است",
    quote_english: "Wake up, life is slipping away.",
    level_of_wisdom: "High",
    themes: ["awareness", "mortality", "urgency", "presence"],
    category: "Time, Fate & Mortality"
  },
  {
    author: "Omar Khayyam",
    original_farsi: "در این لحظه خوش باش. این لحظه زندگی توست",
    quote_english: "Be happy for this moment. This moment is your life.",
    level_of_wisdom: "High",
    themes: ["presence", "joy", "mindfulness", "life"],
    category: "Time, Fate & Mortality"
  },
  {
    author: "Rumi",
    original_farsi: "ای دل بیدار شو، که جهان می‌گذرد، و این عمر گران‌بها می‌گذرد",
    quote_english: "Awake, O heart, for the world is passing by, And this precious life is slipping away for free.",
    level_of_wisdom: "High",
    themes: ["awareness", "mortality", "urgency", "transience"],
    category: "Time, Fate & Mortality"
  },
  {
    author: "Hafez",
    original_farsi: "زندگی چیزی به تو نمی‌دهد که پس نگیرد",
    quote_english: "Life will give you nothing that it will not take back.",
    level_of_wisdom: "High",
    themes: ["impermanence", "detachment", "wisdom", "acceptance"],
    category: "Time, Fate & Mortality"
  },
  {
    author: "Omar Khayyam",
    original_farsi: "آه، بیشترین بهره را از آنچه هنوز می‌توانیم بگذرانیم ببر، پیش از آنکه ما نیز به خاک فرو شویم",
    quote_english: "Ah, make the most of what we yet may spend, Before we too into the dust descend.",
    level_of_wisdom: "High",
    themes: ["carpe diem", "mortality", "urgency", "life"],
    category: "Time, Fate & Mortality"
  },
  {
    author: "Rumi",
    original_farsi: "همه چیز برای وقتش منتظر است. حتی گل پیش از وقتش شکوفا نمی‌شود. حتی خورشید پیش از وقتش طلوع نمی‌کند. صبر کن، آنکه متعلق به توست در وقتش به تو خواهد رسید",
    quote_english: "Everything waits for its time. Even a rose doesn't bloom before its time. Even the sun doesn't rise before its time. Wait, one who belongs to you will come to you in its time.",
    level_of_wisdom: "High",
    themes: ["patience", "timing", "destiny", "trust"],
    category: "Time, Fate & Mortality"
  },
  {
    author: "Rumi",
    original_farsi: "دنبال آنچه فرار می‌کند نرو. آنچه برای تو مقدر است در وقت خود خواهد آمد",
    quote_english: "Stop chasing what is running away. What is meant for you will come in its own time",
    level_of_wisdom: "High",
    themes: ["surrender", "destiny", "patience", "trust"],
    category: "Time, Fate & Mortality"
  },
  {
    author: "Rumi",
    original_farsi: "تنها زیبایی پایدار، زیبایی دل است",
    quote_english: "The only lasting beauty is the beauty of the heart.",
    level_of_wisdom: "High",
    themes: ["beauty", "character", "timelessness", "inner worth"],
    category: "Time, Fate & Mortality"
  },
  {
    author: "Rumi",
    original_farsi: "صبر فقط منتظر ماندن نیست. اعتماد به سفر است",
    quote_english: "Patience is not about waiting. It's about trusting the journey.",
    level_of_wisdom: "High",
    themes: ["patience", "trust", "journey", "faith"],
    category: "Time, Fate & Mortality"
  }
];

const authorMap: Record<string, string> = {
  'Rumi': 'rumi',
  'Hafez': 'hafez',
  'Saadi': 'saadi',
  'Imam Ghazali': 'al-ghazali',
  'Omar Khayyam': 'unknown',
};

function getWisdomScore(level: string): number {
  switch (level) {
    case 'High': return 9;
    case 'Medium': return 6;
    case 'Low': return 3;
    default: return 5;
  }
}

const verses = quotes.map((q) => ({
  persianText: q.original_farsi,
  transliteration: q.original_farsi,
  englishTranslation: q.quote_english,
  summary: `${q.category}: ${q.quote_english}`,
  sourceWork: q.category,
  philosopher: authorMap[q.author] || 'unknown',
  themes: q.themes,
  wisdomScore: getWisdomScore(q.level_of_wisdom),
  complexity: Math.min(10, Math.max(1, 5 + (q.themes.length > 4 ? 2 : 0))),
  tags: ['poetry', 'persian-wisdom', ...q.themes],
  versions: [],
}));

async function seedMoreQuotes() {
  const mongoUri = process.env.MONGO_URI || 'mongodb+srv://haelpers:Atlas15@haelpers-m0.lz3bcwm.mongodb.net/haelpers?retryWrites=true&w=1';
  
  await mongoose.connect(mongoUri);
  
  const db = mongoose.connection.db;
  if (!db) throw new Error('No database connection');
  
  const collection = db.collection('verses');
  
  const insertResult = await collection.insertMany(verses);
  console.log(`Inserted ${insertResult.insertedCount} new quotes`);
  
  await mongoose.disconnect();
  console.log('Done!');
}

seedMoreQuotes().catch(console.error);
