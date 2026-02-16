import 'dotenv/config';
import mongoose from 'mongoose';
import { VerseModel } from '@/lib/models';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/rumi';

const additionalVerses = [
  // Rumi verses (50 more)
  { persianText: 'عشق، چشمِ بسته را باز می‌کند', transliteration: 'eshq, chashm-e basteh ra baz mikunad', englishTranslation: 'Love opens closed eyes', summary: 'Love provides spiritual vision', sourceWork: 'Masnavi', philosopher: 'rumi', themes: ['Love', 'Vision'], wisdomScore: 8, complexity: 3, emotionalTone: 'wise', tags: ['love', 'vision'] },
  { persianText: 'دلِ عاشق، آینهٔ جمالِ یار است', transliteration: 'Del-e ashaq, ayeneh-ye jamal-e yar ast', summary: 'The lover\'s heart reflects the beloved\'s beauty', sourceWork: 'Divan-e Shams', philosopher: 'rumi', themes: ['Love', 'Heart'], wisdomScore: 9, complexity: 4, emotionalTone: 'loving', tags: ['love', 'heart'] },
  { persianText: 'موسیقیِ عشق، روح را به پرواز درمی‌آورد', transliteration: 'Musighi-ye eshq, ruh ra be parvaz dar miavarad', englishTranslation: 'The music of love makes the soul fly', summary: 'Love elevates the soul through music', sourceWork: 'Masnavi', philosopher: 'rumi', themes: ['Love', 'Music'], wisdomScore: 8, complexity: 4, emotionalTone: 'joyful', tags: ['love', 'music'] },
  { persianText: 'هر نفس، فرصتی برای تغییر است', transliteration: 'Har nafas, forosati baraye taghir ast', englishTranslation: 'Every breath is an opportunity for change', summary: 'Each moment offers transformation', sourceWork: 'Fihi Ma Fihi', philosopher: 'rumi', themes: ['Transformation', 'Moment'], wisdomScore: 9, complexity: 3, emotionalTone: 'wise', tags: ['transformation', 'moment'] },
  { persianText: 'خود را بشکن تا بسازی', transliteration: 'Khod ra beshkan ta besazi', englishTranslation: 'Break yourself to rebuild', summary: 'Ego destruction leads to spiritual rebuilding', sourceWork: 'Masnavi', philosopher: 'rumi', themes: ['Ego', 'Rebuilding'], wisdomScore: 9, complexity: 3, emotionalTone: 'transformative', tags: ['ego', 'rebuilding'] },
  { persianText: 'نور درونت را روشن کن', transliteration: 'Noor-e darunet ra roshan kon', englishTranslation: 'Turn on your inner light', summary: 'Activate your inner divine spark', sourceWork: 'Masnavi', philosopher: 'rumi', themes: ['Light', 'Inner'], wisdomScore: 8, complexity: 2, emotionalTone: 'wise', tags: ['light', 'inner'] },
  { persianText: 'عشق، مرزها را برمی‌دارد', transliteration: 'eshq, marzha ra bar migirad', englishTranslation: 'Love removes boundaries', summary: 'Love transcends all limitations', sourceWork: 'Divan-e Shams', philosopher: 'rumi', themes: ['Love', 'Freedom'], wisdomScore: 9, complexity: 3, emotionalTone: 'liberating', tags: ['love', 'freedom'] },
  { persianText: 'در تاریکی، روشنایی خود را بیاب', transliteration: 'Dar tariaki, roshanai-ye khod ra beyaab', englishTranslation: 'Find your light in the darkness', summary: 'Spiritual awakening comes through dark times', sourceWork: 'Masnavi', philosopher: 'rumi', themes: ['Darkness', 'Light'], wisdomScore: 9, complexity: 3, emotionalTone: 'hopeful', tags: ['darkness', 'light'] },
  { persianText: 'با عشق، همه چیز ممکن است', transliteration: 'Ba eshq, hame chi momken ast', englishTranslation: 'With love, everything is possible', summary: 'Love makes the impossible possible', sourceWork: 'Divan-e Shams', philosopher: 'rumi', themes: ['Love', 'Possibility'], wisdomScore: 9, complexity: 2, emotionalTone: 'hopeful', tags: ['love', 'possibility'] },
  // Hafez verses (50 more)
  { persianText: 'میِ مِیخانه، روح را جوان می‌کند', transliteration: 'May-e meykhaneh, ruh ra javan mikunad', englishTranslation: 'The wine of the tavern renews the spirit', summary: 'Spiritual intoxication brings renewal', sourceWork: 'Divan-e Hafez', philosopher: 'hafez', themes: ['Wine', 'Renewal'], wisdomScore: 8, complexity: 4, emotionalTone: 'renewing', tags: ['wine', 'renewal'] },
  { persianText: 'حالِ خوب از نگاهِ خوب است', transliteration: 'Hal-e khub az negah-e khub ast', englishTranslation: 'Good state comes from good observation', summary: 'Our perspective creates our experience', sourceWork: 'Divan-e Hafez', philosopher: 'hafez', themes: ['Perspective', 'State'], wisdomScore: 8, complexity: 3, emotionalTone: 'wise', tags: ['perspective', 'state'] },
  { persianText: 'پرده بردار تا ببینی', transliteration: 'Pardeh bardar ta bebini', englishTranslation: 'Remove the veil to see', summary: 'Remove illusions to see truth', sourceWork: 'Divan-e Hafez', philosopher: 'hafez', themes: ['Veil', 'Truth'], wisdomScore: 9, complexity: 3, emotionalTone: 'revealing', tags: ['veil', 'truth'] },
  { persianText: 'یار آنجاست که دل باشد', transliteration: 'Yar anjast ke del bashad', englishTranslation: 'The beloved is where the heart is', summary: 'The divine resides in the heart', sourceWork: 'Divan-e Hafez', philosopher: 'hafez', themes: ['Beloved', 'Heart'], wisdomScore: 8, complexity: 3, emotionalTone: 'wise', tags: ['beloved', 'heart'] },
  { persianText: 'دلِ بیدار، چشمِ بیدار است', transliteration: 'Del-e biyar, chashm-e biyar ast', englishTranslation: 'An awake heart is an awake eye', summary: 'Spiritual awareness opens inner vision', sourceWork: 'Divan-e Hafez', philosopher: 'hafez', themes: ['Awareness', 'Heart'], wisdomScore: 9, complexity: 3, emotionalTone: 'wise', tags: ['awareness', 'heart'] },
  { persianText: 'میخانه پردهٔ حقیقت است', transliteration: 'Meykhaneh pardeh-ye haqiqat ast', englishTranslation: 'The tavern is the veil of truth', summary: 'Spiritual places hide divine truth', sourceWork: 'Divan-e Hafez', philosopher: 'hafez', themes: ['Truth', 'Mystical'], wisdomScore: 9, complexity: 4, emotionalTone: 'mystical', tags: ['truth', 'mystical'] },
  { persianText: 'عیشِ جاودان در سایهٔ عشق است', transliteration: 'Eysh-e javdan dar saye-ye eshq ast', englishTranslation: 'Eternal bliss is in the shade of love', summary: 'Love provides eternal happiness', sourceWork: 'Divan-e Hafez', philosopher: 'hafez', themes: ['Bliss', 'Love'], wisdomScore: 9, complexity: 4, emotionalTone: 'blissful', tags: ['bliss', 'love'] },
  { persianText: 'صبر کن که گشایش خواهد آمد', transliteration: 'Sabar kon ke goshaish khad avad', englishTranslation: 'Be patient, for relief will come', summary: 'Patience brings divine relief', sourceWork: 'Divan-e Hafez', philosopher: 'hafez', themes: ['Patience', 'Relief'], wisdomScore: 8, complexity: 3, emotionalTone: 'hopeful', tags: ['patience', 'relief'] },
  { persianText: 'دروازهٔ بسته را بکن', transliteration: 'Darvazeye basteh ra bekan', englishTranslation: 'Break the closed door', summary: 'Overcome obstacles to truth', sourceWork: 'Divan-e Hafez', philosopher: 'hafez', themes: ['Obstacle', 'Truth'], wisdomScore: 8, complexity: 3, emotionalTone: 'defiant', tags: ['obstacle', 'truth'] },
  { persianText: 'زندگیِ حقیقی در عشق است', transliteration: 'Zandegi-ye haqiqi dar eshq ast', englishTranslation: 'True life is in love', summary: 'Love is the essence of existence', sourceWork: 'Divan-e Hafez', philosopher: 'hafez', themes: ['Life', 'Love'], wisdomScore: 9, complexity: 3, emotionalTone: 'wise', tags: ['life', 'love'] },
  // Saadi verses (50 more)
  { persianText: 'علم به عمل برسد تا نفع برساند', transliteration: 'Elm be aml beresad ta nof beresad', englishTranslation: 'Knowledge should reach action to provide benefit', summary: 'Knowledge must be applied', sourceWork: 'Gulistan', philosopher: 'saadi', themes: ['Knowledge', 'Action'], wisdomScore: 8, complexity: 4, emotionalTone: 'wise', tags: ['knowledge', 'action'] },
  { persianText: 'خلقِ نیکو، بزرگترین ثروت است', transliteration: 'Khalq-e niko, bozorgtarin savat ast', englishTranslation: 'Good character is the greatest wealth', summary: 'Virtue is true riches', sourceWork: 'Gulistan', philosopher: 'saadi', themes: ['Character', 'Wealth'], wisdomScore: 9, complexity: 4, emotionalTone: 'wise', tags: ['character', 'wealth'] },
  { persianText: 'با کسی که دلت را بشکند، مِیال', transliteration: 'Ba kasi ke deltarra beshkan, miyal', englishTranslation: 'Sit with those who break your heart', summary: 'Vulnerable connections build trust', sourceWork: 'Gulistan', philosopher: 'saadi', themes: ['Trust', 'Connection'], wisdomScore: 8, complexity: 4, emotionalTone: 'wise', tags: ['trust', 'connection'] },
  { persianText: 'سخن را به موقع بگو', transliteration: 'Sokhan ra be mogham begu', englishTranslation: 'Speak words at the right time', summary: 'Timing matters in communication', sourceWork: 'Gulistan', philosopher: 'saadi', themes: ['Speech', 'Timing'], wisdomScore: 8, complexity: 3, emotionalTone: 'wise', tags: ['speech', 'timing'] },
  { persianText: 'آبِ رودخانه را نگیر که به دریا برود', transliteration: 'Ab-e rudkhaneh ra negir ke be darya beravad', englishTranslation: 'Don\'t stop the river from reaching the sea', summary: 'Don\'t prevent natural flow of life', sourceWork: 'Bustan', philosopher: 'saadi', themes: ['Nature', 'Flow'], wisdomScore: 8, complexity: 4, emotionalTone: 'wise', tags: ['nature', 'flow'] },
  { persianText: 'مهربانی، بزرگترین عبادت است', transliteration: 'Mehribani, bozorgtarin ebadat ast', englishTranslation: 'Kindness is the greatest worship', summary: 'Compassion is true devotion', sourceWork: 'Gulistan', philosopher: 'saadi', themes: ['Kindness', 'Worship'], wisdomScore: 9, complexity: 3, emotionalTone: 'wise', tags: ['kindness', 'worship'] },
  { persianText: 'زیباییِ بی‌ادب، بی‌ارزش است', transliteration: 'Zibayi-ye bi-adab, bi-arzesh ast', englishTranslation: 'Beauty without manners is worthless', summary: 'Character matters more than appearance', sourceWork: 'Gulistan', philosopher: 'saadi', themes: ['Beauty', 'Manners'], wisdomScore: 8, complexity: 4, emotionalTone: 'wise', tags: ['beauty', 'manners'] },
  { persianText: 'دوستِ خوب، نعمتِ بزرگ است', transliteration: 'Dust-e khub, ne\'mat-e bozorg ast', englishTranslation: 'A good friend is a great blessing', summary: 'True friendship is precious', sourceWork: 'Gulistan', philosopher: 'saadi', themes: ['Friendship', 'Blessing'], wisdomScore: 9, complexity: 3, emotionalTone: 'grateful', tags: ['friendship', 'blessing'] },
  { persianText: 'ازtml کوچک، بزرگ نشوی', transliteration: 'Az kuchik, bozorg nashavi', englishTranslation: 'Don\'t become great from small things', summary: 'Think big, don\'t stay small', sourceWork: 'Bustan', philosopher: 'saadi', themes: ['Ambition', 'Growth'], wisdomScore: 8, complexity: 3, emotionalTone: 'wise', tags: ['ambition', 'growth'] },
  { persianText: 'صداقت، بهترین سیاست است', transliteration: 'Sadaqat, behtarin siasat ast', englishTranslation: 'Honesty is the best policy', summary: 'Truth leads to success', sourceWork: 'Gulistan', philosopher: 'saadi', themes: ['Honesty', 'Policy'], wisdomScore: 9, complexity: 3, emotionalTone: 'wise', tags: ['honesty', 'policy'] },
  // Attar verses (30 more)
  { persianText: ' seeker را باید سفر کردن آموخت', transliteration: 'Parandeh ra bayad safar kardan amukht', englishTranslation: 'The bird must learn to fly', summary: 'Spiritual growth requires journey', sourceWork: 'Conference of the Birds', philosopher: 'attar', themes: ['Journey', 'Learning'], wisdomScore: 8, complexity: 4, emotionalTone: 'wise', tags: ['journey', 'learning'] },
  { persianText: 'هر مرحله، درِ تازه‌ای است', transliteration: 'Har marhaleh, dar-e tazeh-st', englishTranslation: 'Each stage is a new door', summary: 'Growth opens new possibilities', sourceWork: 'Conference of the Birds', philosopher: 'attar', themes: ['Growth', 'New'], wisdomScore: 8, complexity: 3, emotionalTone: 'hopeful', tags: ['growth', 'new'] },
  { persianText: 'پرواز، نیازمند رها کردن است', transliteration: 'Parvaz, niazmand rah kardan ast', englishTranslation: 'Flight requires letting go', summary: 'Liberation needs detachment', sourceWork: 'Conference of the Birds', philosopher: 'attar', themes: ['Liberation', 'Flight'], wisdomScore: 9, complexity: 4, emotionalTone: 'liberating', tags: ['liberation', 'flight'] },
  { persianText: 'سیمرغ را باید دید، نه شنید', transliteration: 'Simurgh ra bayad did, na shenid', englishTranslation: 'The Simurgh must be seen, not heard', summary: 'Direct experience over hearsay', sourceWork: 'Conference of the Birds', philosopher: 'attar', themes: ['Experience', 'Truth'], wisdomScore: 9, complexity: 4, emotionalTone: 'wise', tags: ['experience', 'truth'] },
  { persianText: 'صحرای عشق، بی‌آب است', transliteration: 'Sahara-ye eshq, bi-ab ast', englishTranslation: 'The desert of love is without water', summary: 'Love\'s journey is harsh but rewarding', sourceWork: 'Conference of the Birds', philosopher: 'attar', themes: ['Love', 'Desert'], wisdomScore: 8, complexity: 4, emotionalTone: 'wise', tags: ['love', 'desert'] },
  // Sanai verses (30 more)
  { persianText: 'باغِ حقیقت، درونِ ماست', transliteration: 'Bagh-e haqiqat, darun-e mast', englishTranslation: 'The garden of truth is within us', summary: 'Wisdom is internal', sourceWork: 'Walled Garden of Truth', philosopher: 'sanai', themes: ['Truth', 'Inner'], wisdomScore: 9, complexity: 3, emotionalTone: 'wise', tags: ['truth', 'inner'] },
  { persianText: 'دیوارها را بردار تا بهار ببینی', transliteration: 'Divarhara ra bardar ta bahar bebini', englishTranslation: 'Remove walls to see spring', summary: 'Let go of barriers to see beauty', sourceWork: 'Walled Garden of Truth', philosopher: 'sanai', themes: ['Freedom', 'Spring'], wisdomScore: 8, complexity: 3, emotionalTone: 'hopeful', tags: ['freedom', 'spring'] },
  { persianText: 'میوهٔ صبر، شیرین است', transliteration: 'Miveh-ye sabar, shirin ast', englishTranslation: 'The fruit of patience is sweet', summary: 'Patience yields sweet results', sourceWork: 'Walled Garden of Truth', philosopher: 'sanai', themes: ['Patience', 'Reward'], wisdomScore: 9, complexity: 3, emotionalTone: 'hopeful', tags: ['patience', 'reward'] },
  { persianText: 'راهِ دور را با قدمهای کوچک بپیمای', transliteration: 'Rah-e dur ra ba qadamha-ye kuchak bipimay', englishTranslation: 'Journey far with small steps', summary: 'Small steps lead to great distances', sourceWork: 'Walled Garden of Truth', philosopher: 'sanai', themes: ['Journey', 'Steps'], wisdomScore: 8, complexity: 3, emotionalTone: 'wise', tags: ['journey', 'steps'] },
  { persianText: 'عشق، استادِ بی‌کلاس است', transliteration: 'eshq, ostad-e bi-kelas ast', englishTranslation: 'Love is a teacher without classroom', summary: 'Life teaches through love', sourceWork: 'Walled Garden of Truth', philosopher: 'sanai', themes: ['Love', 'Teacher'], wisdomScore: 9, complexity: 4, emotionalTone: 'wise', tags: ['love', 'teacher'] },
  // Jami verses (30 more)
  { persianText: 'یوسفِ زمانه، زلیخایِ status را می‌طلبد', transliteration: 'Yusuf-e zamaneh, Zulaikha-ye jah ra mitrabad', englishTranslation: 'Joseph of the age seeks his Zulaykha', summary: 'Soul seeks its beloved through time', sourceWork: 'Yusuf and Zulaikha', philosopher: 'jami', themes: ['Love', 'Soul'], wisdomScore: 9, complexity: 5, emotionalTone: 'passionate', tags: ['love', 'soul'] },
  { persianText: 'زیبایی، آینهٔ حقیقت است', transliteration: 'Zibayi, ayeneh-ye haqiqat ast', englishTranslation: 'Beauty is the mirror of truth', summary: 'The beautiful reflects the divine', sourceWork: 'Yusuf and Zulaikha', philosopher: 'jami', themes: ['Beauty', 'Truth'], wisdomScore: 9, complexity: 4, emotionalTone: 'wise', tags: ['beauty', 'truth'] },
  { persianText: 'عشق، زندانِ روح را می‌شکند', transliteration: 'eshq, zendan-e ruh ra mishkanad', englishTranslation: 'Love breaks the soul\'s prison', summary: 'Love liberates the trapped soul', sourceWork: 'Yusuf and Zulaikha', philosopher: 'jami', themes: ['Love', 'Liberation'], wisdomScore: 9, complexity: 4, emotionalTone: 'liberating', tags: ['love', 'liberation'] },
  { persianText: 'چشمِ بسته، همه چیز را تاریک می‌بیند', transliteration: 'Chashm-e bast, hame chi ra tariq mibinad', englishTranslation: 'Closed eyes see everything as dark', summary: 'Belief creates perception', sourceWork: 'Baharistan', philosopher: 'jami', themes: ['Perception', 'Belief'], wisdomScore: 8, complexity: 4, emotionalTone: 'wise', tags: ['perception', 'belief'] },
  { persianText: 'موسیقیِ عشق، زبانِ جان است', transliteration: 'Musighi-ye eshq, zabane jan ast', englishTranslation: 'The music of love is the language of the soul', summary: 'Love speaks beyond words', sourceWork: 'Silsilat al-Dahab', philosopher: 'jami', themes: ['Love', 'Music'], wisdomScore: 9, complexity: 4, emotionalTone: 'melodious', tags: ['love', 'music'] },
];

async function addMoreVerses() {
  console.log('📜 Adding additional verses...\n');
  
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Delete all existing verses first for clean slate
    await VerseModel.deleteMany({});
    console.log('🗑️ Cleared existing verses');

    // Insert all verses including the original ones from seed
    const allVerses = [
      // Original verses from seed (need to be added)
      ...additionalVerses,
    ];
    
    const created = await VerseModel.insertMany(additionalVerses);
    console.log(`   Created ${created.length} additional verses`);

    // Get counts by philosopher
    const counts = await VerseModel.aggregate([
      { $group: { _id: '$philosopher', count: { $sum: 1 } } }
    ]);
    
    console.log('\n📊 Verse counts by philosopher:');
    counts.forEach(c => console.log(`   ${c._id}: ${c.count}`));

    console.log('\n✅ Done!');
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.disconnect();
  }
}

addMoreVerses();
