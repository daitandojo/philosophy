import { Philosopher, Work } from '@/types';

export const philosophers: Philosopher[] = [
  // Tier 1 - Core Mystics
  {
    id: 'rumi',
    name: { persian: 'مولانا', english: 'Rumi', alternative: ['Jalal ad-Din Muhammad Balkhi'], latin: 'Rumi' },
    life: { birth: 1207, death: 1273, birthPlace: 'Balkh (modern Afghanistan)', deathPlace: 'Konya, Turkey', era: 'golden-age' },
    school: ['Sufi Mysticism', 'Poetry'],
    description: 'The mystical poet of divine love whose poetry has touched souls for centuries. His Masnavi is considered one of the greatest works of mystical poetry.',
    quoteCount: 450,
    influence: 100,
    verified: true,
    influences: ['sanai', 'attar', 'ibn-arabi', 'shams-tabrizi'],
    influenced: ['hafez', 'jami', 'iqbal'],
  },
  {
    id: 'hafez',
    name: { persian: 'حافظ', english: 'Hafez', alternative: ['Khwajeh Shams al-Din Muhammad Hafez-e Shirazi'], latin: 'Hafez' },
    life: { birth: 1315, death: 1390, birthPlace: 'Shiraz, Iran', deathPlace: 'Shiraz, Iran', era: 'golden-age' },
    school: ['Sufi Mysticism', 'Lyric Poetry'],
    description: 'The immortal Persian poet whose Divan contains some of the most beautiful ghazals ever written. Known as "The Interpreter" for his profound mystical insights.',
    quoteCount: 380,
    influence: 95,
    verified: true,
    influences: ['rumi', 'saadi', 'attar'],
    influenced: ['jami', 'iqbal'],
  },
  {
    id: 'saadi',
    name: { persian: 'سعدی', english: 'Saadi Shirazi', alternative: ['Saadi Moshir al-Din'], latin: 'Saadi' },
    life: { birth: 1210, death: 1291, birthPlace: 'Shiraz, Iran', deathPlace: 'Shiraz, Iran', era: 'golden-age' },
    school: ['Sufi Wisdom', 'Moral Philosophy'],
    description: 'The wise master of practical virtue. His Gulistan and Bustan are treasured for their ethical guidance and beautiful storytelling.',
    quoteCount: 320,
    influence: 90,
    verified: true,
    influences: ['attar', 'sanai'],
    influenced: ['hafez', 'jami'],
  },
  {
    id: 'attar',
    name: { persian: 'عطار', english: 'Attar of Nishapur', alternative: ['Abu Hamid ibn Ahmad ibn Ali al-Nishtapuri'], latin: 'Attar' },
    life: { birth: 1145, death: 1221, birthPlace: 'Nishapur, Iran', deathPlace: 'Nishapur, Iran', era: 'classical' },
    school: ['Sufi Mysticism', 'Poetry'],
    description: 'The visionary mystic whose "Conference of the Birds" is a masterpiece of allegorical poetry exploring the soul\'s journey to God.',
    quoteCount: 180,
    influence: 85,
    verified: true,
    influences: ['sanai', 'hallaj', 'bayazid'],
    influenced: ['rumi', 'jami'],
  },
  {
    id: 'sanai',
    name: { persian: 'سنایی', english: 'Sanai', alternative: ['Abu al-Majd Majdud ibn Adam Sanai'], latin: 'Sanai' },
    life: { birth: 1080, death: 1131, birthPlace: 'Ghazni, Afghanistan', deathPlace: 'Ghazni, Afghanistan', era: 'classical' },
    school: ['Sufi Poetry', 'Mystical Philosophy'],
    description: 'The pioneering Sufi poet who first used romantic imagery to express spiritual themes. His "Walled Garden of Truth" influenced Rumi.',
    quoteCount: 120,
    influence: 80,
    verified: true,
    influences: ['ghazali'],
    influenced: ['attar', 'rumi'],
  },
  {
    id: 'jami',
    name: { persian: 'جامی', english: 'Jami', alternative: ['Nur al-Din Abd al-Rahman Jami'], latin: 'Jami' },
    life: { birth: 1414, death: 1492, birthPlace: 'Jam, Iran', deathPlace: 'Herat, Afghanistan', era: 'golden-age' },
    school: ['Sufi Poetry', 'Romantic Epic'],
    description: 'The last great master of classical Persian Sufi poetry, whose "Yusuf and Zulaikha" is a pinnacle of mystical romance.',
    quoteCount: 95,
    influence: 78,
    verified: true,
    influences: ['rumi', 'hafez', 'attar', 'nizami'],
    influenced: [],
  },
  {
    id: 'nizami',
    name: { persian: 'نظامی', english: 'Nizami Ganjavi', alternative: ['Nizami Ganjavi'], latin: 'Nizami' },
    life: { birth: 1141, death: 1209, birthPlace: 'Ganja, Azerbaijan', deathPlace: 'Ganja, Azerbaijan', era: 'classical' },
    school: ['Romantic Epic', 'Poetry'],
    description: 'The master of the Khamsa (Five Poems), whose romantic epics combined love stories with spiritual wisdom.',
    quoteCount: 85,
    influence: 75,
    verified: true,
  },
  {
    id: 'ferdowsi',
    name: { persian: 'فردوسی', english: 'Ferdowsi', alternative: ['Abu al-Qasim Ferdowsi Tusi'], latin: 'Ferdowsi' },
    life: { birth: 940, death: 1020, birthPlace: 'Tus, Iran', deathPlace: 'Tus, Iran', era: 'classical' },
    school: ['Epic Poetry', 'Persian Literature'],
    description: 'The immortal poet who preserved Persian language and culture through his Shahnameh, the Book of Kings.',
    quoteCount: 200,
    influence: 98,
    verified: true,
  },
  // Tier 2 - Islamic Philosophers & Theologians
  {
    id: 'ibn-sina',
    name: { persian: 'ابن سینا', english: 'Ibn Sina (Avicenna)', alternative: ['Abu Ali Sina'], latin: 'Avicenna' },
    life: { birth: 980, death: 1037, birthPlace: 'Bukhara, Uzbekistan', deathPlace: 'Hamadan, Iran', era: 'classical' },
    school: ['Islamic Philosophy', 'Peripatetic', 'Medicine'],
    description: 'The greatest philosopher and physician of the Islamic Golden Age. His "Canon of Medicine" was the medical textbook in Europe for 600 years.',
    quoteCount: 150,
    influence: 100,
    verified: true,
  },
  {
    id: 'al-farabi',
    name: { persian: 'فرابی', english: 'Al-Farabi', alternative: ['Abu Nasr al-Farabi'], latin: 'Al-Farabi' },
    life: { birth: 872, death: 950, birthPlace: 'Farab, Kazakhstan', deathPlace: 'Damascus, Syria', era: 'classical' },
    school: ['Peripatetic', 'Political Philosophy'],
    description: 'Known as "The Second Teacher" after Aristotle. He was a pioneering political philosopher and musician.',
    quoteCount: 80,
    influence: 85,
    verified: true,
  },
  {
    id: 'al-ghazali',
    name: { persian: 'غزالی', english: 'Al-Ghazali', alternative: ['Abu Hamid Muhammad ibn Muhammad al-Ghazali'], latin: 'Al-Ghazali' },
    life: { birth: 1058, death: 1111, birthPlace: 'Tus, Iran', deathPlace: 'Tus, Iran', era: 'classical' },
    school: ['Theology', 'Sufi Mysticism', 'Philosophy'],
    description: 'The reviver of religious thought who reconciled Sufi mysticism with orthodox Islam. His "Incoherence of the Philosophers" shaped Islamic intellectual history.',
    quoteCount: 140,
    influence: 98,
    verified: true,
  },
  {
    id: 'suhrawardi',
    name: { persian: 'سهروردی', english: 'Suhrawardi', alternative: ['Shahab al-Din Yahya ibn Amr ibn Mahdi Suhrawardi'], latin: 'Suhrawardi' },
    life: { birth: 1154, death: 1191, birthPlace: 'Suhraward, Iran', deathPlace: 'Aleppo, Syria', era: 'classical' },
    school: ['Illuminationist', 'Philosophy'],
    description: 'The founder of the Philosophy of Illumination (Ishraq). His mystical philosophy influenced Mulla Sadra.',
    quoteCount: 75,
    influence: 80,
    verified: true,
  },
  {
    id: 'mulla-sadra',
    name: { persian: 'ملاصدرا', english: 'Mulla Sadra', alternative: ['Sadr al-Din Shirazi'], latin: 'Mulla Sadra' },
    life: { birth: 1571, death: 1640, birthPlace: 'Shiraz, Iran', deathPlace: 'Shiraz, Iran', era: 'modern' },
    school: ['Transcendent Theosophy', 'Illuminationist'],
    description: 'The revolutionary philosopher who founded the "Transcendent Theosophy" school, synthesizing philosophy, theology, and Sufi mysticism.',
    quoteCount: 90,
    influence: 92,
    verified: true,
  },
  {
    id: 'nasir-tusi',
    name: { persian: 'نصیر الدین طوسی', english: 'Nasir al-Din al-Tusi', alternative: ['Nasir al-Din Muhammad ibn Muhammad al-Tusi'], latin: 'Al-Tusi' },
    life: { birth: 1201, death: 1274, birthPlace: 'Tus, Iran', deathPlace: 'Kadhimain, Iraq', era: 'classical' },
    school: ['Philosophy', 'Astronomy', 'Ethics'],
    description: 'A polymath who made significant contributions to astronomy, mathematics, and philosophy. Founder of the Maragheh observatory.',
    quoteCount: 65,
    influence: 75,
    verified: true,
  },
  {
    id: 'ibn-rushd',
    name: { persian: 'ابن رشد', english: 'Ibn Rushd (Averroes)', alternative: ['Abu al-Walid Muhammad ibn Rushd'], latin: 'Averroes' },
    life: { birth: 1126, death: 1198, birthPlace: 'Córdoba, Spain', deathPlace: 'Marrakesh, Morocco', era: 'classical' },
    school: ['Peripatetic', 'Philosophy'],
    description: 'The great Andalusian philosopher who defended Aristotelian philosophy against Al-Ghazali\'s criticisms.',
    quoteCount: 60,
    influence: 85,
    verified: true,
  },
  {
    id: 'al-kindi',
    name: { persian: 'کندی', english: 'Al-Kindi', alternative: ['Abu Yusuf Ya\'qub ibn Ishaq al-Kindi'], latin: 'Al-Kindi' },
    life: { birth: 801, death: 873, birthPlace: 'Kufa, Iraq', deathPlace: 'Baghdad, Iraq', era: 'classical' },
    school: ['Peripatetic', 'Philosophy'],
    description: 'The "First Philosopher" of the Islamic world. He introduced Greek philosophy to the Arab world.',
    quoteCount: 50,
    influence: 78,
    verified: true,
  },
  // Tier 3 - Sufi Masters & Mystics
  {
    id: 'ibn-arabi',
    name: { persian: 'ابن عربی', english: 'Ibn Arabi', alternative: ['Muhyiddin Ibn Arabi'], latin: 'Ibn Arabi' },
    life: { birth: 1165, death: 1240, birthPlace: 'Murcia, Spain', deathPlace: 'Damascus, Syria', era: 'classical' },
    school: ['Sufi Mysticism', 'Theosophy'],
    description: 'The "Greatest Master" whose philosophical system of Wahdat al-Wujud (Unity of Being) profoundly influenced Sufi thought worldwide.',
    quoteCount: 110,
    influence: 95,
    verified: true,
  },
  {
    id: 'bayazid-bastami',
    name: { persian: 'بایزید بسطامی', english: 'Bayazid Bastami', alternative: ['Abu Yazid Tayfur ibn Isa al-Bistami'], latin: 'Bayazid' },
    life: { birth: 804, death: 874, birthPlace: 'Bastam, Iran', deathPlace: 'Bastam, Iran', era: 'ancient' },
    school: ['Sufi Mysticism', 'Ecstatic Sufism'],
    description: 'An early Sufi master known for his ecstatic utterances (shathhiyat). He pioneered the concept of fana (annihilation in God).',
    quoteCount: 45,
    influence: 88,
    verified: true,
  },
  {
    id: 'hallaj',
    name: { persian: 'حلّاج', english: 'Hallaj', alternative: ['Husayn ibn Mansur al-Hallaj'], latin: 'Al-Hallaj' },
    life: { birth: 858, death: 922, birthPlace: 'Bayda, Iran', deathPlace: 'Baghdad, Iraq', era: 'ancient' },
    school: ['Sufi Mysticism', 'Ecstatic Sufism'],
    description: 'The controversial Sufi mystic famous for his proclamation "Ana\'l-Haqq" (I am the Truth). He was martyred for his beliefs.',
    quoteCount: 55,
    influence: 90,
    verified: true,
  },
  {
    id: 'junayd-baghdadi',
    name: { persian: 'جنید بغدادی', english: 'Junayd of Baghdad', alternative: ['Abu al-Qasim al-Junayd al-Baghdadi'], latin: 'Junayd' },
    life: { birth: 830, death: 910, birthPlace: 'Baghdad, Iraq', deathPlace: 'Baghdad, Iraq', era: 'ancient' },
    school: ['Sufi Mysticism', 'Sober Sufism'],
    description: 'The "Sultan of the Friends of God" who advocated for "sober" Sufism over ecstatic practices. A key figure in Baghdad\'s Sufi tradition.',
    quoteCount: 40,
    influence: 85,
    verified: true,
  },
  {
    id: 'abdul-qadir-gilani',
    name: { persian: 'عبدالقادر گیلانی', english: 'Abdul-Qadir Gilani', alternative: ['Abd al-Qadir al-Jilani'], latin: 'Abdul-Qadir' },
    life: { birth: 1078, death: 1166, birthPlace: 'Gilan, Iran', deathPlace: 'Baghdad, Iraq', era: 'ancient' },
    school: ['Sufi Order', 'Islamic Jurisprudence'],
    description: 'The founder of the Qadiriyya Sufi order. Known for his piety, miracles, and influential sermons.',
    quoteCount: 50,
    influence: 82,
    verified: true,
  },
  {
    id: 'najm-kubra',
    name: { persian: 'نجم الدین کبری', english: 'Najm al-Din Kubra', alternative: ['Najm al-Din al-Kubra'], latin: 'Najm al-Din' },
    life: { birth: 1145, death: 1221, birthPlace: 'Khorasan, Iran', deathPlace: 'Kashan, Iran', era: 'ancient' },
    school: ['Sufi Mysticism', 'Kubrawiyya'],
    description: 'A great Sufi master who founded the Kubrawiyya order. Known for his visionary experiences and spiritual states.',
    quoteCount: 35,
    influence: 75,
    verified: true,
  },
  // Tier 4 - Modern & Contemporary
  {
    id: 'seyyed-hossein-nasr',
    name: { persian: 'سید حسین نصیر', english: 'Seyyed Hossein Nasr', alternative: ['Hossein Nasr'], latin: 'Nasr' },
    life: { birth: 1933, death: null, birthPlace: 'Tehran, Iran', deathPlace: 'Present', era: 'modern' },
    school: ['Islamic Philosophy', 'Traditionalist School'],
    description: 'One of the world\'s leading scholars of Islamic philosophy, traditionalism, and comparative religion. A prominent voice for Islamic intellectual tradition.',
    quoteCount: 120,
    influence: 88,
    verified: true,
  },
  {
    id: 'allama-tabatabai',
    name: { persian: 'علامه طباطبایی', english: 'Allama Tabatabai', alternative: ['Mohammad Hussein Tabatabai'], latin: 'Tabatabai' },
    life: { birth: 1892, death: 1981, birthPlace: 'Najaf, Iraq', deathPlace: 'Qom, Iran', era: 'modern' },
    school: ['Shi\'a Philosophy', 'Tafsir'],
    description: 'A prominent Shi\'a philosopher and Quranic exegete. His "Tafsir al-Mizan" is a monumental work of Quranic interpretation.',
    quoteCount: 65,
    influence: 90,
    verified: true,
  },
  {
    id: 'morteza-motahhari',
    name: { persian: 'مرتضی مطهری', english: 'Morteza Motahhari', alternative: ['Mortaza Motahhari'], latin: 'Motahhari' },
    life: { birth: 1920, death: 1979, birthPlace: 'Tehran, Iran', deathPlace: 'Tehran, Iran', era: 'modern' },
    school: ['Islamic Philosophy', 'Jurisprudence'],
    description: 'A leading Islamic philosopher and theorist. One of the key founders of the Islamic Republic of Iran.',
    quoteCount: 80,
    influence: 82,
    verified: true,
  },
  {
    id: 'abdolkarim-soroush',
    name: { persian: 'عبدالکریم سروش', english: 'Abdolkarim Soroush', alternative: ['Abdulkarim Soroush'], latin: 'Soroush' },
    life: { birth: 1945, death: null, birthPlace: 'Tehran, Iran', deathPlace: 'Present', era: 'modern' },
    school: ['Islamic Reformism', 'Philosophy'],
    description: 'A leading contemporary Iranian philosopher and religious thinker known for his theory of "religious intellectualism."',
    quoteCount: 75,
    influence: 80,
    verified: true,
  },
  {
    id: 'Dariush-shayegan',
    name: { persian: 'داریوش شایگان', english: 'Dariush Shayegan', alternative: ['Dariush Shayegan'], latin: 'Shayegan' },
    life: { birth: 1935, death: 2018, birthPlace: 'Tehran, Iran', deathPlace: 'Paris, France', era: 'modern' },
    school: ['Comparative Philosophy', 'Cultural Studies'],
    description: 'A prominent Iranian philosopher known for his work on comparative philosophy and cultural dialogue.',
    quoteCount: 50,
    influence: 72,
    verified: true,
  },
  // Tier 5 - Ancient Persian (Pre-Islamic)
  {
    id: 'zoroaster',
    name: { persian: 'زرتشت', english: 'Zoroaster', alternative: ['Zarathustra'], latin: 'Zoroaster' },
    life: { birth: -1000, death: -500, birthPlace: 'Ancient Persia (Iran)', deathPlace: 'Ancient Persia', era: 'ancient' },
    school: ['Zoroastrianism', 'Ancient Wisdom'],
    description: 'The ancient prophet whose teachings form the basis of Zoroastrianism, one of the world\'s oldest monotheistic religions.',
    quoteCount: 30,
    influence: 95,
    verified: true,
  },
  {
    id: 'mazdak',
    name: { persian: 'مزدک', english: 'Mazdak', alternative: ['Mazdak the Prophet'], latin: 'Mazdak' },
    life: { birth: 470, death: 528, birthPlace: 'Persia', deathPlace: 'Ctesiphon, Iraq', era: 'ancient' },
    school: ['Proto-Socialism', 'Zoroastrianism'],
    description: 'A Persian proto-socialist philosopher and Zoroastrian prophet who advocated for communal property and egalitarianism.',
    quoteCount: 20,
    influence: 60,
    verified: true,
  },
  {
    id: 'mani',
    name: { persian: 'مانی', english: 'Mani', alternative: ['Mani the Prophet'], latin: 'Mani' },
    life: { birth: 216, death: 276, birthPlace: 'Babylon, Iraq', deathPlace: 'Gundeshapur, Iran', era: 'ancient' },
    school: ['Manichaeism'],
    description: 'The founder of Manichaeism, a major religion that spread between the 3rd and 7th centuries. Known as "The Apostle of Light."',
    quoteCount: 25,
    influence: 70,
    verified: true,
  },
];

export const works: Work[] = [
  // Rumi
  {
    id: 'masnavi',
    philosopherId: 'rumi',
    title: { persian: ' مثنوی معنوی', english: 'Masnavi (Spiritual Couplets)', originalScript: 'Mathnawi' },
    type: 'poetry',
    year: 1256,
    description: 'The spiritual masterpiece of Rumi, consisting of six books and over 25,000 verses. It is considered one of the greatest works of mystical poetry.',
    significance: 'The Masnavi is the pinnacle of Persian Sufi literature and has been called "the Quran in the Persian language."',
    structure: { books: 6, verses: 25637 },
    quoteCount: 200,
  },
  {
    id: 'divan-e-shams',
    philosopherId: 'rumi',
    title: { persian: 'دیوان شمس', english: 'Divan-e Shams', originalScript: 'Dīvān-e Šams' },
    type: 'poetry',
    year: 1240,
    description: 'A collection of ghazals written in honor of Rumi\'s spiritual companion Shams Tabrizi. Contains over 3,000 ghazals.',
    significance: 'Contains some of the most beautiful mystical poetry ever written, expressing the depth of divine love.',
    structure: { verses: 3000 },
    quoteCount: 150,
  },
  {
    id: 'fihi-ma-fihi',
    philosopherId: 'rumi',
    title: { persian: 'فیه مافیه', english: 'Fihi Ma Fihi', originalScript: 'Fīhī mā fīhī' },
    type: 'prose',
    year: 1252,
    description: 'Discourses and talks given by Rumi, recorded by his students.',
    significance: 'Provides direct access to Rumi\'s teachings and spiritual insights in prose form.',
    structure: { chapters: 71 },
    quoteCount: 50,
  },
  // Hafez
  {
    id: 'divan-e-hafez',
    philosopherId: 'hafez',
    title: { persian: 'دیوان حافظ', english: 'Divan-e Hafez', originalScript: 'Dīvān-e Ḥāfeẓ' },
    type: 'poetry',
    year: 1370,
    description: 'The complete collection of Hafez\'s ghazals, approximately 500 poems.',
    significance: 'A treasure of Persian literature, used for divination (fal-e Hafez) and spiritual guidance.',
    structure: { verses: 500 },
    quoteCount: 180,
  },
  // Saadi
  {
    id: 'gulistan',
    philosopherId: 'saadi',
    title: { persian: 'گلستان', english: 'Gulistan (Rose Garden)', originalScript: 'Gulistān' },
    type: 'prose',
    year: 1258,
    description: 'A collection of stories and poems in prose, covering ethics, governance, and love.',
    significance: 'A masterpiece of Persian prose, treasured for its wisdom and literary beauty.',
    structure: { chapters: 8 },
    quoteCount: 100,
  },
  {
    id: 'bustan',
    philosopherId: 'saadi',
    title: { persian: 'بوستان', english: 'Bustan (Orchard)', originalScript: 'Būstān' },
    type: 'poetry',
    year: 1257,
    description: 'A collection of ten poems on moral and mystical themes.',
    significance: 'A poetic masterpiece emphasizing virtue, piety, and divine love.',
    structure: { chapters: 10 },
    quoteCount: 80,
  },
  // Attar
  {
    id: 'conference-of-birds',
    philosopherId: 'attar',
    title: { persian: 'پرندگان عطار', english: 'Conference of the Birds', originalScript: 'Mantiq al-Tayr' },
    type: 'poetry',
    year: 1177,
    description: 'An allegorical poem about the soul\'s journey to God, told through the story of birds seeking the Simurgh.',
    significance: 'A masterpiece of Sufi allegory, exploring the path of spiritual transformation.',
    structure: { verses: 450 },
    quoteCount: 75,
  },
  // Ferdowsi
  {
    id: 'shahnameh',
    philosopherId: 'ferdowsi',
    title: { persian: 'شاهنامه', english: 'Shahnameh (Book of Kings)', originalScript: 'Šāhnāma' },
    type: 'poetry',
    year: 1010,
    description: 'The epic poem of Persian history, from the creation to the fall of the Sassanid Empire. Over 50,000 couplets.',
    significance: 'Preserved Persian language and culture after the Islamic conquest. The national epic of Iran.',
    structure: { verses: 50000 },
    quoteCount: 120,
  },
  // Ibn Sina
  {
    id: 'canon-medicine',
    philosopherId: 'ibn-sina',
    title: { persian: 'القانون في الطب', english: 'Canon of Medicine', originalScript: 'Al-Qanun fi al-Tibb' },
    type: 'treatise',
    year: 1025,
    description: 'A medical encyclopedia that was the standard medical text in Europe and the Islamic world for 600 years.',
    significance: 'One of the most influential books in the history of medicine.',
    structure: { books: 5 },
    quoteCount: 40,
  },
  {
    id: 'book-of-healing',
    philosopherId: 'ibn-sina',
    title: { persian: 'کتاب الشفاء', english: 'The Book of Healing', originalScript: 'Kitab al-Shifa' },
    type: 'treatise',
    year: 1020,
    description: 'A philosophical encyclopedia covering logic, physics, biology, and metaphysics.',
    significance: 'A major work of Islamic philosophy, synthesizing Aristotelian and Neoplatonic thought.',
    structure: { books: 4 },
    quoteCount: 35,
  },
  // Al-Ghazali
  {
    id: 'ihya-ulum-din',
    philosopherId: 'al-ghazali',
    title: { persian: 'إحياء علوم الدين', english: 'Revival of Religious Sciences', originalScript: 'Ihya Ulum al-Din' },
    type: 'treatise',
    year: 1100,
    description: 'A comprehensive work on Islamic jurisprudence, theology, and Sufi mysticism.',
    significance: 'A foundational text that revitalized Islamic intellectual and spiritual life.',
    structure: { books: 4 },
    quoteCount: 60,
  },
  {
    id: 'incoherence-philosophers',
    philosopherId: 'al-ghazali',
    title: { persian: 'تهافت الفلاسفة', english: 'The Incoherence of the Philosophers', originalScript: 'Tahafut al-Falasifa' },
    type: 'treatise',
    year: 1095,
    description: 'A critique of the philosophers (especially Ibn Sina and Al-Farabi) on theological grounds.',
    significance: 'Sparked major philosophical debates in the Islamic world.',
    quoteCount: 35,
  },
  // Ibn Arabi
  {
    id: 'fusus-hikam',
    philosopherId: 'ibn-arabi',
    title: { persian: 'فصوص الحکم', english: 'Bezels of Wisdom', originalScript: 'Fusus al-Hikam' },
    type: 'treatise',
    year: 1229,
    description: 'A collection of 27 chapters on the wisdom of the prophets.',
    significance: 'A key text of Sufi metaphysics, explaining the doctrine of Unity of Being.',
    structure: { chapters: 27 },
    quoteCount: 50,
  },
  {
    id: 'meccan-revelations',
    philosopherId: 'ibn-arabi',
    title: { persian: 'الفتوحات المكية', english: 'Meccan Revelations', originalScript: 'Al-Futuhat al-Makkiyya' },
    type: 'treatise',
    year: 1238,
    description: 'A massive mystical treatise of over 560 chapters covering Sufi metaphysics and spiritual practices.',
    significance: 'Ibn Arabi\'s magnum opus, a comprehensive work of mystical philosophy.',
    structure: { chapters: 560 },
    quoteCount: 40,
  },
];

export const eraColors: Record<string, 'primary' | 'secondary' | 'success' | 'warning' | 'info'> = {
  ancient: 'info',
  classical: 'secondary',
  'golden-age': 'primary',
  modern: 'warning',
};

export const eraLabels: Record<string, string> = {
  ancient: 'Ancient (Pre-Islamic)',
  classical: 'Classical (8th-13th c.)',
  'golden-age': 'Golden Age (13th-16th c.)',
  modern: 'Modern (16th-21st c.)',
};

export function getPhilosopherById(id: string): Philosopher | undefined {
  return philosophers.find(p => p.id === id);
}

export function getWorksByPhilosopher(philosopherId: string): Work[] {
  return works.filter(w => w.philosopherId === philosopherId);
}

export function getPhilosophersByEra(era: string): Philosopher[] {
  return philosophers.filter(p => p.life.era === era);
}

export function getPhilosophersBySchool(school: string): Philosopher[] {
  return philosophers.filter(p => p.school.includes(school));
}

export function getAllSchools(): string[] {
  const schools = new Set<string>();
  philosophers.forEach(p => p.school.forEach(s => schools.add(s)));
  return Array.from(schools).sort();
}

export function getAllEras(): string[] {
  return ['ancient', 'classical', 'golden-age', 'modern'];
}

export function getTotalQuoteCount(): number {
  return philosophers.reduce((sum, p) => sum + p.quoteCount, 0);
}

export function getTierOnePhilosophers(): Philosopher[] {
  const tierOneIds = ['rumi', 'hafez', 'saadi', 'attar', 'sanai', 'jami', 'nizami', 'ferdowsi'];
  return philosophers.filter(p => tierOneIds.includes(p.id));
}

export function getTopPhilosophers(limit: number = 10): Philosopher[] {
  return [...philosophers].sort((a, b) => b.influence - a.influence).slice(0, limit);
}
