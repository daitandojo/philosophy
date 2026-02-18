import mongoose from 'mongoose';

const quotes = [
  {
    author: "Unknown",
    original_farsi: "آنقدر برو که می‌بینی، وقتی رسیدی، دورتر را خواهی دید",
    quote_english: "Go as far as you can see, and when you get there you'll see further.",
    level_of_wisdom: "High",
    themes: ["perseverance", "vision", "ambition", "progress"]
  },
  {
    author: "Saadi Shirazi",
    original_farsi: "گریه کردم چون کفش نداشتم، تا مردی را دیدم که پا نداشت",
    quote_english: "I wept because I had no shoes, until I saw a man who had no feet.",
    level_of_wisdom: "High",
    themes: ["gratitude", "perspective", "contentment", "empathy"]
  },
  {
    author: "Unknown",
    original_farsi: "هر آنچه بکاری، همان را درو می‌کنی",
    quote_english: "Whatever you sow, you reap.",
    level_of_wisdom: "High",
    themes: ["karma", "consequences", "responsibility", "justice"]
  },
  {
    author: "Unknown",
    original_farsi: "آدم طمعکار همیشه فقیر است",
    quote_english: "A greedy man is always poor.",
    level_of_wisdom: "Medium",
    themes: ["greed", "poverty", "contentment", "wealth"]
  },
  {
    author: "Unknown",
    original_farsi: "تیر از زخم بیرون می‌آید، اما سخن بد برای همیشه در دل می‌ماند",
    quote_english: "An arrow can be pulled out of a wound, but a hurtful word stays forever in heart.",
    level_of_wisdom: "High",
    themes: ["words", "wounds", "forgiveness", "communication"]
  },
  {
    author: "Unknown",
    original_farsi: "چنانکه بهترین شراب تلخ‌ترین سرکه را می‌سازد، عاشق راستین بدترین دشمن می‌شود",
    quote_english: "As the best wine makes the sharpest vinegar, the truest lover may turn into the worst enemy.",
    level_of_wisdom: "High",
    themes: ["love", "hate", "transformation", "relationships"]
  },
  {
    author: "Unknown",
    original_farsi: "شجاعت بدون پیش‌بینی مانند اسب کور است",
    quote_english: "Bravery without foresight is like a blind horse.",
    level_of_wisdom: "High",
    themes: ["courage", "wisdom", "planning", "recklessness"]
  },
  {
    author: "Unknown",
    original_farsi: "رشوه هر دو طرف را خوشحال می‌کند",
    quote_english: "Bribery makes both parties happy.",
    level_of_wisdom: "Low",
    themes: ["corruption", "ethics", "cynicism", "morality"]
  },
  {
    author: "Unknown",
    original_farsi: "درختی که به تو سایه می‌دهد، مبر",
    quote_english: "Do not cut down the tree that gives you shade.",
    level_of_wisdom: "High",
    themes: ["gratitude", "loyalty", "protection", "ingratitude"]
  },
  {
    author: "Unknown",
    original_farsi: "هر کس به مرگ می‌رود و در دستانش تنها آنچه را بخشیده است، با خود می‌برد",
    quote_english: "Every man goes down to his death bearing in his hands only that which he has given away.",
    level_of_wisdom: "High",
    themes: ["charity", "death", "legacy", "generosity"]
  },
  {
    author: "Unknown",
    original_farsi: "مگس به آسانی در عسل می‌افتد، مشکلش بیرون آمدن است",
    quote_english: "Flies will easily fly into the honey -- their problem is how to get out.",
    level_of_wisdom: "Medium",
    themes: ["temptation", "consequences", "greed", "traps"]
  },
  {
    author: "Unknown",
    original_farsi: "خداوند به اندازه وسعت دل ما می‌بخشد",
    quote_english: "God gives to us according to the measure of our hearts.",
    level_of_wisdom: "High",
    themes: ["generosity", "spirituality", "abundance", "compassion"]
  },
  {
    author: "Unknown",
    original_farsi: "وقتی بخت با کسی بسازد، ژله هم دندانش را می‌شکند",
    quote_english: "If fortune turns against you, even jelly breaks your tooth.",
    level_of_wisdom: "Medium",
    themes: ["fortune", "adversity", "resilience", "luck"]
  },
  {
    author: "Unknown",
    original_farsi: "ادب را از بی‌ادبان بیاموز",
    quote_english: "Learn good manners from those who don't have them.",
    level_of_wisdom: "High",
    themes: ["manners", "learning", "wisdom", "example"]
  },
  {
    author: "Unknown",
    original_farsi: "دری را باز مکن که نتوانی ببندی",
    quote_english: "Never open a door that you can't lock again.",
    level_of_wisdom: "High",
    themes: ["caution", "commitment", "consequences", "boundaries"]
  },
  {
    author: "Unknown",
    original_farsi: "شاخه‌ای که میوه بیشتری دارد، فروتنانه به زمین خم می‌شود",
    quote_english: "The branch that bears the most fruit bends itself thankfully towards the ground.",
    level_of_wisdom: "High",
    themes: ["humility", "gratitude", "success", "wisdom"]
  },
  {
    author: "Attar of Nishapur",
    original_farsi: "این نیز بگذرد",
    quote_english: "This too, shall pass.",
    level_of_wisdom: "High",
    themes: ["impermanence", "patience", "hope", "endurance"]
  },
  {
    author: "Unknown",
    original_farsi: "همه را نمی‌توان از خود راضی نگه داشت",
    quote_english: "You can't please everyone.",
    level_of_wisdom: "Medium",
    themes: ["acceptance", "boundaries", "authenticity", "wisdom"]
  },
  {
    author: "Unknown",
    original_farsi: "آنچه می‌خوری فاسد می‌شود، آنچه می‌بخشی گل سرخ می‌شود",
    quote_english: "Whatever you eat will rot, whatever you give will blossom into a rose.",
    level_of_wisdom: "High",
    themes: ["generosity", "impermanence", "charity", "legacy"]
  },
  {
    author: "Unknown",
    original_farsi: "سخنانی که برای دهانت بزرگ است، به کار مبر",
    quote_english: "Do not use words that are too big for your mouth.",
    level_of_wisdom: "Medium",
    themes: ["humility", "speech", "honesty", "authenticity"]
  },
  {
    author: "Unknown",
    original_farsi: "برای مورچه، چند قطره شبنم سیل است",
    quote_english: "To the ant, a few drops of dew are a flood.",
    level_of_wisdom: "Medium",
    themes: ["perspective", "relativity", "scale", "humility"]
  },
  {
    author: "Unknown",
    original_farsi: "تیر از کمان رفته هرگز باز نمی‌گردد",
    quote_english: "The arrow that has left the bow never returns.",
    level_of_wisdom: "High",
    themes: ["irreversibility", "consequences", "time", "regret"]
  },
  {
    author: "Unknown",
    original_farsi: "تحسین واقعی از دشمن می‌آید",
    quote_english: "It is a real compliment that comes from an enemy.",
    level_of_wisdom: "High",
    themes: ["truth", "enemies", "validation", "honesty"]
  },
  {
    author: "Unknown",
    original_farsi: "اگر مرهم برای زخمت نداری، دست کم نمک نپاش",
    quote_english: "If you can give me no ointment for my wound, can you help me by not rubbing salt in?",
    level_of_wisdom: "High",
    themes: ["compassion", "kindness", "suffering", "mercy"]
  },
  {
    author: "Unknown",
    original_farsi: "هر قدر سقف خانه بزرگتر باشد، برف بیشتری روی آن جمع می‌شود",
    quote_english: "The larger a man's roof, the more snow it collects.",
    level_of_wisdom: "High",
    themes: ["responsibility", "wealth", "burden", "leadership"]
  },
  {
    author: "Unknown",
    original_farsi: "آنکه دلش با عشق بیدار است، هرگز نمی‌میرد",
    quote_english: "He whose heart is aroused by love will never die.",
    level_of_wisdom: "High",
    themes: ["love", "immortality", "spirituality", "legacy"]
  },
  {
    author: "Unknown",
    original_farsi: "آنکه در حال غرق شدن است، از باران نمی‌ترسد",
    quote_english: "The drowning man is not troubled by rain.",
    level_of_wisdom: "Medium",
    themes: ["perspective", "adversity", "acceptance", "resilience"]
  },
  {
    author: "Unknown",
    original_farsi: "کسی که یک دشمن دارد، او را همه جا می‌بیند",
    quote_english: "He, who has only one enemy, meets him everywhere.",
    level_of_wisdom: "High",
    themes: ["paranoia", "enemies", "perception", "fear"]
  },
  {
    author: "Unknown",
    original_farsi: "دزد تا گرفتار نشود، پادشاه است",
    quote_english: "A thief is a king till he's caught.",
    level_of_wisdom: "Medium",
    themes: ["deception", "justice", "hubris", "consequences"]
  },
  {
    author: "Unknown",
    original_farsi: "زمین میزبانی است که مهمانانش را می‌کشد",
    quote_english: "The earth is a host who kills his guests.",
    level_of_wisdom: "High",
    themes: ["mortality", "impermanence", "nature", "existentialism"]
  },
  {
    author: "Unknown",
    original_farsi: "چیدمان خانه نشان‌دهنده صاحب آن است",
    quote_english: "The way a house is decorated will tell much about its owner.",
    level_of_wisdom: "Medium",
    themes: ["character", "appearance", "identity", "values"]
  },
  {
    author: "Unknown",
    original_farsi: "از کسانی بترس که از خدا نمی‌ترسند",
    quote_english: "Fear those who do not fear God.",
    level_of_wisdom: "High",
    themes: ["morality", "fear", "ethics", "spirituality"]
  },
  {
    author: "Unknown",
    original_farsi: "گناه در پنهان از لذت در آشکار خوشایندتر است",
    quote_english: "To sin in secret is more pleasant than having pleasure in the open.",
    level_of_wisdom: "Low",
    themes: ["hypocrisy", "secrecy", "morality", "deception"]
  },
  {
    author: "Unknown",
    original_farsi: "ضرورت شیر را به روباه تبدیل می‌کند",
    quote_english: "Necessity changes a lion into a fox.",
    level_of_wisdom: "High",
    themes: ["adaptation", "survival", "intelligence", "necessity"]
  },
  {
    author: "Unknown",
    original_farsi: "بلوغ از خرد می‌آید، نه از گذشت سال‌ها",
    quote_english: "Maturity comes from wisdom not in the passing of years.",
    level_of_wisdom: "High",
    themes: ["wisdom", "maturity", "age", "experience"]
  },
  {
    author: "Unknown",
    original_farsi: "شیر که پیر شود، بازیچه شغال‌ها می‌شود",
    quote_english: "When a lion is old, he becomes the play thing of jackals.",
    level_of_wisdom: "Medium",
    themes: ["aging", "power", "vulnerability", "respect"]
  },
  {
    author: "Unknown",
    original_farsi: "گلی که پرتاب می‌کنی، بر سر خودت می‌ریزد",
    quote_english: "The mud that you throw will fall on your own head.",
    level_of_wisdom: "High",
    themes: ["karma", "consequences", "reputation", "integrity"]
  },
  {
    author: "Unknown",
    original_farsi: "سوزن لباس می‌دوزد، اما خود برهنه است",
    quote_english: "The needle makes clothes but stays naked.",
    level_of_wisdom: "High",
    themes: ["service", "sacrifice", "irony", "giving"]
  },
  {
    author: "Unknown",
    original_farsi: "شک کلید دانش است",
    quote_english: "Doubt is the key to knowledge.",
    level_of_wisdom: "High",
    themes: ["knowledge", "skepticism", "learning", "wisdom"]
  },
  {
    author: "Unknown",
    original_farsi: "در این دنیا بخشنده‌ها پول ندارند و صاحبان پول بخشنده نیستند",
    quote_english: "In this world generous people have no money and those with money are not generous.",
    level_of_wisdom: "Medium",
    themes: ["wealth", "generosity", "paradox", "society"]
  },
  {
    author: "Unknown",
    original_farsi: "فردا را کی دیده است؟",
    quote_english: "Who has ever seen tomorrow?",
    level_of_wisdom: "High",
    themes: ["uncertainty", "present", "existentialism", "time"]
  },
  {
    author: "Unknown",
    original_farsi: "هر کس فکر می‌کند تف خودش شیرین است",
    quote_english: "Everyone thinks his own spit tastes good.",
    level_of_wisdom: "Medium",
    themes: ["bias", "subjectivity", "pride", "perspective"]
  },
  {
    author: "Unknown",
    original_farsi: "سنگ به شیشه بزند، شیشه می‌شکند. شیشه به سنگ بزند، شیشه می‌شکند",
    quote_english: "When a stone hits glass, the glass breaks. When glass hits a stone, the glass breaks.",
    level_of_wisdom: "High",
    themes: ["vulnerability", "conflict", "wisdom", "self-preservation"]
  },
  {
    author: "Unknown",
    original_farsi: "توبه گرگ مرده است",
    quote_english: "A wolf's repentance died a long time ago.",
    level_of_wisdom: "Medium",
    themes: ["nature", "change", "skepticism", "character"]
  },
  {
    author: "Unknown",
    original_farsi: "پدر را روزی قدر می‌دانی که خود پدر شوی",
    quote_english: "You only appreciate your father the day you become a father yourself.",
    level_of_wisdom: "High",
    themes: ["parenthood", "gratitude", "experience", "empathy"]
  },
  {
    author: "Unknown",
    original_farsi: "مهمان با ده برکت می‌آید، یکی می‌خورد و نه تایی می‌ماند",
    quote_english: "A visitor comes with ten blessings, eats one, and leaves nine.",
    level_of_wisdom: "High",
    themes: ["hospitality", "blessings", "generosity", "abundance"]
  },
  {
    author: "Unknown",
    original_farsi: "سگ در خانه خودش شیر است",
    quote_english: "The dog is a lion in his own house.",
    level_of_wisdom: "Medium",
    themes: ["confidence", "territory", "home", "courage"]
  },
  {
    author: "Unknown",
    original_farsi: "یک پوند دانش ده پوند عقل می‌خواهد تا به کار آید",
    quote_english: "One pound of learning requires ten pounds of common sense to apply it.",
    level_of_wisdom: "High",
    themes: ["knowledge", "wisdom", "application", "practicality"]
  },
  {
    author: "Unknown",
    original_farsi: "چهار چیز است که هر کس بیش از آنچه می‌داند دارد: گناه، بدهی، سال و دشمن",
    quote_english: "There are four things every person has more of than they know; sins, debt, years, and foes.",
    level_of_wisdom: "High",
    themes: ["self-awareness", "honesty", "accountability", "wisdom"]
  },
  {
    author: "Unknown",
    original_farsi: "حق شادی از مرگ دشمنم را ندارم وقتی خودم زندگی جاودان ندارم",
    quote_english: "I have no right to rejoice at the death of my enemy when I do not have eternal life myself.",
    level_of_wisdom: "High",
    themes: ["humility", "mortality", "forgiveness", "compassion"]
  },
  {
    author: "Unknown",
    original_farsi: "معمایی که حل شده آسان به نظر می‌رسد",
    quote_english: "Solved riddles look easy.",
    level_of_wisdom: "Medium",
    themes: ["hindsight", "wisdom", "perspective", "knowledge"]
  },
  {
    author: "Unknown",
    original_farsi: "بهانه احمق از اشتباهش بزرگتر است",
    quote_english: "The fool's excuse is bigger than the mistake he made.",
    level_of_wisdom: "Medium",
    themes: ["accountability", "wisdom", "honesty", "foolishness"]
  },
  {
    author: "Unknown",
    original_farsi: "عالمی که به کار نبرد، مانند زنبوری است که عسل ندهد",
    quote_english: "The wise man that does not put his knowledge into practice is like a bee that gives no honey.",
    level_of_wisdom: "High",
    themes: ["action", "knowledge", "wisdom", "application"]
  },
  {
    author: "Unknown",
    original_farsi: "پایت را برابر گلیمت دراز کن",
    quote_english: "Stretch your foot to the length of your blanket.",
    level_of_wisdom: "High",
    themes: ["moderation", "contentment", "prudence", "limits"]
  }
];

const authorMap: Record<string, string> = {
  'Saadi Shirazi': 'saadi',
  'Attar of Nishapur': 'attar',
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
  summary: `Persian proverb: ${q.quote_english}`,
  sourceWork: 'Traditional Persian Proverbs',
  philosopher: authorMap[q.author] || 'unknown',
  themes: q.themes,
  wisdomScore: getWisdomScore(q.level_of_wisdom),
  complexity: Math.min(10, Math.max(1, 5 + (q.themes.length > 4 ? 2 : 0))),
  tags: ['proverb', 'persian-wisdom', ...q.themes],
  versions: [],
}));

async function seedProverbs() {
  const mongoUri = process.env.MONGO_URI || 'mongodb+srv://haelpers:Atlas15@haelpers-m0.lz3bcwm.mongodb.net/haelpers?retryWrites=true&w=1';
  
  await mongoose.connect(mongoUri);
  
  const db = mongoose.connection.db;
  if (!db) throw new Error('No database connection');
  
  const collection = db.collection('verses');
  
  // Delete existing proverbs (those with sourceWork = 'Traditional Persian Proverbs')
  const deleteResult = await collection.deleteMany({ sourceWork: 'Traditional Persian Proverbs' });
  console.log(`Deleted ${deleteResult.deletedCount} existing proverbs`);
  
  // Insert new proverbs
  const insertResult = await collection.insertMany(verses);
  console.log(`Inserted ${insertResult.insertedCount} new proverbs`);
  
  await mongoose.disconnect();
  console.log('Done!');
}

seedProverbs().catch(console.error);
