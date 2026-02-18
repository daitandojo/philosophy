import mongoose from 'mongoose';

const quotes = [
  {
    author: "Saadi",
    original_farsi: "بنی‌آدم اعضای یکدیگرند، که در آفرینش ز یک گوهرند",
    quote_english: "Human beings are members of a whole, in creation of one essence and soul.",
    level_of_wisdom: "High",
    themes: ["unity", "humanity", "compassion", "equality"],
    category: "Friendship & Companionship"
  },
  {
    author: "Saadi",
    original_farsi: "دوست آینه شخص است",
    quote_english: "A friend is the mirror of a person.",
    level_of_wisdom: "High",
    themes: ["friendship", "reflection", "truth", "self-awareness"],
    category: "Friendship & Companionship"
  },
  {
    author: "Rumi",
    original_farsi: "برو! برو! ما می‌رویم و می‌آییم، ای روح، از این جهان جدایی به وصال، همراه به همراه",
    quote_english: "Go on! Go on! We are going, and we are coming, O soul, from this world of separation to union, a companion to the companion.",
    level_of_wisdom: "High",
    themes: ["journey", "union", "soul", "friendship"],
    category: "Friendship & Companionship"
  },
  {
    author: "Saadi",
    original_farsi: "مرد بی‌دوست مانند دست چپ بدون دست راست است",
    quote_english: "A friendless man is like the left hand without the right.",
    level_of_wisdom: "Medium",
    themes: ["friendship", "companionship", "wholeness", "need"],
    category: "Friendship & Companionship"
  },
  {
    author: "Bayazid Bastami",
    original_farsi: "همنشینی با نیکان بهتر از خلوت است، و خلوت بهتر از همنشینی با بدان",
    quote_english: "Companionship of the good is better than solitude, and solitude is better than companionship of the bad.",
    level_of_wisdom: "High",
    themes: ["companionship", "wisdom", "discernment", "character"],
    category: "Friendship & Companionship"
  },
  {
    author: "Saadi",
    original_farsi: "همراه نیک برای شب‌گردان چراغی است",
    quote_english: "A good companion is better than a lamp for those who walk by night.",
    level_of_wisdom: "High",
    themes: ["guidance", "friendship", "wisdom", "light"],
    category: "Friendship & Companionship"
  },
  {
    author: "Saadi",
    original_farsi: "سخاوت دل‌های نجیب را پیر نمی‌کند",
    quote_english: "Generosity does not age the noble-hearted.",
    level_of_wisdom: "High",
    themes: ["generosity", "nobility", "timelessness", "character"],
    category: "Compassion & Unity"
  },
  {
    author: "Saadi",
    original_farsi: "سخاوت از ثروت نیست، از شخصیت است",
    quote_english: "Generosity is not of wealth, but of character.",
    level_of_wisdom: "High",
    themes: ["generosity", "character", "authenticity", "wealth"],
    category: "Compassion & Unity"
  },
  {
    author: "Rumi",
    original_farsi: "با بدان نشین، که همنشینی بد، هر چند پاکی، تو را آلوده می‌کند",
    quote_english: "Do not sit with the wicked, for bad company, though you are pure, can taint you.",
    level_of_wisdom: "Medium",
    themes: ["influence", "character", "discernment", "purity"],
    category: "Compassion & Unity"
  },
  {
    author: "Rumi",
    original_farsi: "با کسانی دوست نشو که تو را از خودت فراموش کنند",
    quote_english: "Don't make friends with those who make you forget yourself.",
    level_of_wisdom: "High",
    themes: ["authenticity", "friendship", "self", "boundaries"],
    category: "Friendship & Companionship"
  },
  {
    author: "Rumi",
    original_farsi: "من بنده عشقم، و آنان که به عشق بسته شده‌اند",
    quote_english: "I am the slave of love, and of those who are bound by love.",
    level_of_wisdom: "High",
    themes: ["love", "unity", "devotion", "connection"],
    category: "Compassion & Unity"
  },
  {
    author: "Saadi",
    original_farsi: "سخاوتمند باش، که بخشیدن به تو می‌آید. هیچ‌کس از بخشیدن کمتر نشده یا مرده است",
    quote_english: "Be generous, for helping (others) suits you. No one ever dies or becomes less by giving.",
    level_of_wisdom: "High",
    themes: ["generosity", "abundance", "kindness", "wisdom"],
    category: "Compassion & Unity"
  },
  {
    author: "Saadi",
    original_farsi: "اگر نسبت به رنج دیگران بی‌تفاوتی، لیاقت نام انسان را نداری",
    quote_english: "If you are indifferent to the suffering of others, you are unworthy of the name human.",
    level_of_wisdom: "High",
    themes: ["compassion", "empathy", "humanity", "ethics"],
    category: "Compassion & Unity"
  },
  {
    author: "Saadi",
    original_farsi: "خائن نمی‌تواند انتظار وفاداری داشته باشد",
    quote_english: "A traitor cannot expect loyalty.",
    level_of_wisdom: "Medium",
    themes: ["loyalty", "betrayal", "justice", "consequences"],
    category: "Character & Integrity"
  },
  {
    author: "Saadi",
    original_farsi: "مرد نیک مانند چشمه است: هم به گل و هم به خار آب می‌دهد",
    quote_english: "A good man resembles a spring: he gives water to both rose and thorn.",
    level_of_wisdom: "High",
    themes: ["kindness", "generosity", "impartiality", "character"],
    category: "Compassion & Unity"
  },
  {
    author: "Saadi",
    original_farsi: "به مردم نیکی کن، اگرچه در دریا فرو رود؛ که خدا آن را پاداش می‌دهد، هر چند در پنهان باشد",
    quote_english: "Do good unto the people, though it may fall into the sea; for God will recompense it, even if it is done in secret.",
    level_of_wisdom: "High",
    themes: ["kindness", "generosity", "faith", "justice"],
    category: "Compassion & Unity"
  },
  {
    author: "Saadi",
    original_farsi: "کمی مهربانی از دنیایی از بی‌تفاوتی بهتر است",
    quote_english: "A little kindness is better than a world of indifference.",
    level_of_wisdom: "High",
    themes: ["kindness", "impact", "compassion", "action"],
    category: "Compassion & Unity"
  },
  {
    author: "Rumi",
    original_farsi: "هر کاری می‌کنی، به خودت می‌کنی - چه خوب چه بد",
    quote_english: "Whatever you do, you do to yourself – be it good or bad.",
    level_of_wisdom: "High",
    themes: ["karma", "responsibility", "unity", "consequences"],
    category: "Character & Integrity"
  },
  {
    author: "Saadi",
    original_farsi: "فرزندان آدم اعضای یکدیگرند",
    quote_english: "The children of Adam are limbs of one body.",
    level_of_wisdom: "High",
    themes: ["unity", "humanity", "compassion", "interconnectedness"],
    category: "Compassion & Unity"
  },
  {
    author: "Saadi",
    original_farsi: "دوست در سختی شناخته می‌شود؛ دشمن در سقوطت آشکار می‌شود",
    quote_english: "A friend is known in hardship; an enemy reveals himself in your downfall.",
    level_of_wisdom: "High",
    themes: ["friendship", "adversity", "truth", "character"],
    category: "Friendship & Companionship"
  },
  {
    author: "Saadi",
    original_farsi: "درختی بکار که نیاز مردم را برطرف کند، نه آنکه تنها سایه‌اش بر تو بیافتد",
    quote_english: "Plant a tree that will satisfy the people's needs, not one whose shade falls only on yourself.",
    level_of_wisdom: "High",
    themes: ["legacy", "service", "generosity", "community"],
    category: "Legacy & Destiny"
  },
  {
    author: "Rumi",
    original_farsi: "مانند خورشید در بخشش و مهربانی باش",
    quote_english: "Be like the sun in generosity and kindness.",
    level_of_wisdom: "High",
    themes: ["generosity", "kindness", "light", "inspiration"],
    category: "Compassion & Unity"
  },
  {
    author: "Saadi",
    original_farsi: "نیکی هرگز هدر نمی‌رود، حتی اگر در پنهان یا برای ناشایست باشد",
    quote_english: "Goodness is never wasted, even if done in secret or for the unworthy.",
    level_of_wisdom: "High",
    themes: ["goodness", "integrity", "faith", "justice"],
    category: "Character & Integrity"
  },
  {
    author: "Saadi",
    original_farsi: "مرد را به لباسش نجیب نشمار. نجابت در شخصیت است، نه در جامه",
    quote_english: "Do not think a man noble because of his dress. A man's nobility is in his character, not in his robe.",
    level_of_wisdom: "High",
    themes: ["character", "authenticity", "values", "appearance"],
    category: "Character & Integrity"
  },
  {
    author: "Ferdowsi",
    original_farsi: "عزت در طلا یا نسب نیست، بلکه در خرد، شجاعت و فضیلت است",
    quote_english: "Honor is not in gold or lineage, but in wisdom, courage, and virtue.",
    level_of_wisdom: "High",
    themes: ["honor", "virtue", "character", "true worth"],
    category: "Character & Integrity"
  },
  {
    author: "Saadi",
    original_farsi: "آنکه نه دانش دارد نه فضیلت، مانند درخت بی‌ثمر است؛ تنها فضا می‌گیرد",
    quote_english: "He who has neither knowledge nor virtue is like a barren tree; he only takes up space.",
    level_of_wisdom: "Medium",
    themes: ["purpose", "virtue", "knowledge", "contribution"],
    category: "Character & Integrity"
  },
  {
    author: "Rumi",
    original_farsi: "درد مرد را از جهان حواس‌پرتی‌ها بیرون می‌کشد. او را بیدار می‌کند",
    quote_english: "Pain pulls a man out of the world of distractions. It awakens him.",
    level_of_wisdom: "High",
    themes: ["suffering", "awakening", "growth", "transformation"],
    category: "Legacy & Destiny"
  },
  {
    author: "Ferdowsi",
    original_farsi: "کسی از ثمره نیکی محروم نمی‌ماند؛ نیکوکار از هر سوی پاداش می‌گیرد",
    quote_english: "No one is deprived of the fruit of goodness; The doer of good receives reward from every direction.",
    level_of_wisdom: "High",
    themes: ["justice", "goodness", "reward", "faith"],
    category: "Character & Integrity"
  },
  {
    author: "Rumi",
    original_farsi: "قلم آنچه را باید نوشت و گذشت. چرا بر آنچه نمی‌توانست باشد شکایت کنی؟",
    quote_english: "The Pen has written what it must and moved on. Why complain about what could not have been?",
    level_of_wisdom: "High",
    themes: ["destiny", "acceptance", "surrender", "time"],
    category: "Legacy & Destiny"
  },
  {
    author: "Ferdowsi",
    original_farsi: "سرنوشت همه چیز را مغلوب می‌کند، پسرم. نه قدرت و نه مهارت می‌تواند آن را دفع کند",
    quote_english: "Destiny overcomes all, my son. Neither strength nor skill can repel it.",
    level_of_wisdom: "High",
    themes: ["destiny", "fate", "surrender", "wisdom"],
    category: "Legacy & Destiny"
  },
  {
    author: "Ferdowsi",
    original_farsi: "آنچه سرنوشت است رخ خواهد داد، حتی اگر در قلعه‌ای از برنز پنهان شوی",
    quote_english: "What is fated will come to pass, even if you hide in a fortress of brass.",
    level_of_wisdom: "High",
    themes: ["fate", "inevitability", "acceptance", "destiny"],
    category: "Legacy & Destiny"
  },
  {
    author: "Ferdowsi",
    original_farsi: "وقت شب تاریک شود، نوری ظاهر خواهد شد؛ از ماه، از خورشید، یا از ستاره‌ای درخشان",
    quote_english: "When the night grows dark, a light will appear; From the moon, the sun, or a shining star.",
    level_of_wisdom: "High",
    themes: ["hope", "darkness", "light", "perseverance"],
    category: "Legacy & Destiny"
  },
  {
    author: "Saadi",
    original_farsi: "سرنوشت ممکن است دری را ببندد، اما تلاش پنجره‌ای می‌یابد",
    quote_english: "Fate may close a door, but effort finds a window.",
    level_of_wisdom: "High",
    themes: ["perseverance", "opportunity", "resilience", "action"],
    category: "Legacy & Destiny"
  },
  {
    author: "Saadi",
    original_farsi: "اگرچه سرنوشت می‌بخشد، تلاش است که تحویل می‌دهد. مروارید در اعماق است - تنها غواص آن را می‌یابد",
    quote_english: "Though fate bestows, it is effort that delivers. The pearl lies deep—only the diver finds it.",
    level_of_wisdom: "High",
    themes: ["effort", "destiny", "perseverance", "reward"],
    category: "Legacy & Destiny"
  },
  {
    author: "Hafez",
    original_farsi: "چون خدا می‌دهد، خوب و بد خواهد گذشت. غمگین悲惨، که این نیز بگذرد",
    quote_english: "Since it is God who gives, good and bad shall pass. Grieve not, for this too shall pass.",
    level_of_wisdom: "High",
    themes: ["impermanence", "faith", "acceptance", "comfort"],
    category: "Legacy & Destiny"
  }
];

const authorMap: Record<string, string> = {
  'Rumi': 'rumi',
  'Hafez': 'hafez',
  'Saadi': 'saadi',
  'Attar': 'attar',
  'Ferdowsi': 'ferdowsi',
  'Bayazid Bastami': 'bastami',
  'Imam Ghazali': 'al-ghazali',
  'Omar Khayyam': 'unknown',
  'Unknown': 'unknown',
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

async function seedFinalQuotes() {
  const mongoUri = process.env.MONGO_URI || 'mongodb+srv://haelpers:Atlas15@haelpers-m0.lz3bcwm.mongodb.net/haelpers?retryWrites=true&w=majority';
  
  await mongoose.connect(mongoUri);
  
  const db = mongoose.connection.db;
  if (!db) throw new Error('No database connection');
  
  const collection = db.collection('verses');
  
  const insertResult = await collection.insertMany(verses);
  console.log(`Inserted ${insertResult.insertedCount} new quotes`);
  
  await mongoose.disconnect();
  console.log('Done!');
}

seedFinalQuotes().catch(console.error);
