import mongoose from 'mongoose';

const quotes = [
  { author: 'Rumi', farsi: 'تو با بال به دنیا آمده‌ای، چرا ترجیح می‌دهی در زندگی بخزی؟', english: 'You were born with wings, why prefer to crawl through life?' },
  { author: 'Rumi', farsi: 'روح گوش‌های خود را داده است تا چیزهایی را بشنود که عقل نمی‌فهمد', english: 'The soul has been given its own ears to hear things the mind does not understand.' },
  { author: 'Rumi', farsi: 'بگذار خود را به سکوت به سوی آن کشش عجیب آنچه واقعاً دوست داری، کشیده شوی', english: 'Let yourself be silently drawn by the strange pull of what you really love.' },
  { author: 'Rumi', farsi: 'روحم از جای دیگری است، مطمئنم، و قصد دارم به آنجا بازگردم', english: 'My soul is from elsewhere, I\'m sure of that, and I intend to end up there.' },
  { author: 'Rumi', farsi: 'نه تنم است نه جان، که من خود معشوقم. دوگانگی را کنار گذاشتم، دو جهان را یکی دیدم', english: 'Tis neither body nor soul, for I myself am the Beloved. I have cast aside duality, I have seen the two worlds as one.' },
  { author: 'Rumi', farsi: 'صدایی هست که با کلمات سخن نمی‌گوید. گوش بده', english: 'There is a voice that doesn\'t use words. Listen.' },
  { author: 'Hafez', farsi: 'کاش می‌توانستم به تو نشان دهم، وقتی تنها یا در تاریکی هستی، نور شگفت‌انگیز وجود خودت را!', english: 'I wish I could show you, when you are lonely or in darkness, the astonishing light of your own being!' },
  { author: 'Rumi', farsi: 'سکوت کن، تا روح الهی سخن بگوید', english: 'Be silent, so that divine spirit may speak.' },
  { author: 'Rumi', farsi: 'سفر روح، بازگشت به عشق بی‌پایان است', english: 'The soul\'s journey is a return to endless love.' },
  { author: 'Hafez', farsi: 'من این مو نیستم، من این پوست نیستم، من روحی هستم که در درون زندگی می‌کند', english: 'I am not this hair, I am not this skin, I am the soul that lives within.' },
  { author: 'Attar', farsi: 'روحی که از قفس رفت، اکنون راهنما شده است', english: 'The soul that left the cage has now become the guide.' },
  { author: 'Rumi', farsi: 'وقتی روح در آن چمن دراز می‌کشد، جهان برای سخن گفتن بیش از حد پر است', english: 'When the soul lies down in that grass, the world is too full to talk about.' },
  { author: 'Rumi', farsi: 'وقتی آنچه فکر می‌کنی هستی را رها کنی، آنچه واقعاً هستی می‌شوی: روحی وسیع و بی‌کران', english: 'When you let go of who you think you are, you become who you really are: a soul, vast and unbound.' },
  { author: 'Saadi', farsi: 'اگر روحت بیدار باشد، تمام جهان کتابی از حکمت است', english: 'If your soul is awake, the whole world is a book of wisdom.' },
  { author: 'Rumi', farsi: 'چرا در زندان می‌مانی وقتی در آنقدر باز است؟', english: 'Why do you stay in prison when the door is so wide open?' },
  { author: 'Rumi', farsi: 'دوگانگی را کنار گذاشتم. دو جهان را یکی دیدم', english: 'I have put duality away. I have seen the two worlds as one.' },
  { author: 'Rumi', farsi: 'سکوت زبان خداست، بقیه ترجمه ناقص است', english: 'Silence is the language of God, all else is poor translation.' },
  { author: 'Hafez', farsi: 'من بنده عشقم - هر کجا مرا ببرد، می‌روم', english: 'I am the slave of love—wherever it carries me, I follow.' },
  { author: 'Hafez', farsi: 'هر برگ در باغ به سوی هنرمند الهی اشاره می‌کند', english: 'Every leaf in the garden points to the divine artist.' },
  { author: 'Saadi', farsi: 'هر نفس زندگی را طولانی می‌کند و هر بازدم روح را شادمان؛ بنابراین هر نفس نعمتی است و شکرگزاری واجب', english: 'Every breath prolongs life and every expiration gladdens the soul; therefore, every breath confers a blessing, and gratitude should be given.' },
  { author: 'Rumi', farsi: 'هر دو چشم را ببند تا با چشم دیگر ببینی', english: 'Close both eyes to see with the other eye.' },
  { author: 'Rumi', farsi: 'وقتی خود را رها کنی، به خود واقعی‌ات بازمی‌گردی', english: 'When you let go of yourself, you return to your real self.' },
  { author: 'Rumi', farsi: 'سکوت کن، تا آنکه سخن گفتن را به تو آموخت سخن بگوید', english: 'Be silent, so that the Lord who gave you speech may speak.' },
  { author: 'Rumi', farsi: 'لحظه‌ای که مشکلاتت را بپذیری، در باز می‌شود', english: 'The moment you accept what troubles you\'ve been given, the door will open.' },
  { author: 'Hafez', farsi: 'در خانه دل، شمع خدا روشن است - چرا به درهای جهان می‌کوبی؟', english: 'In the house of the heart, the candle of God is lit – Why go knocking at the doors of the world?' },
  { author: 'Rumi', farsi: 'آب را جستجو نکن، تشنه شو - تا آب تو را بیابد', english: 'Don\'t seek the water, become thirsty—so that the water may find you.' },
  { author: 'Omar Khayyam', farsi: 'پرسیدم: هدف دعا چیست؟ گفت: یادآوری به روح آنچه از پیش می‌داند', english: 'I asked: \'What is the purpose of prayer? He said: \'To remind your soul what it already knows.\'' },
  { author: 'Saadi', farsi: 'نیت خود را پیش از کلماتت پاک کن - آن آغاز واقعی دعاست', english: 'Purify your intention before your words – That is the true beginning of prayer.' },
  { author: 'Saadi', farsi: 'فکر نکن دعای بلندت شنیده می‌شود، وقتی دلت از خدا دور است', english: 'Do not think your loud prayer is heard, when your heart is far from God.' },
  { author: 'Rumi', farsi: 'دعایی هست که از کلمات ساخته نشده - از دل برمی‌خیزد، در شعله‌های شوق', english: 'There\'s a prayer that is not made of words – It rises from the heart, in flames of longing.' }
];

const authorMap: Record<string, string> = {
  'Rumi': 'rumi', 'Hafez': 'hafez', 'Saadi': 'saadi', 'Attar': 'attar', 'Omar Khayyam': 'unknown'
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
        sourceWork: 'Self & Soul',
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
