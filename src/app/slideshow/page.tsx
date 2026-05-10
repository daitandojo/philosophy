'use client'
import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import { Box, Typography, IconButton } from '@mui/material'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import PauseIcon from '@mui/icons-material/Pause'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import VolumeOffIcon from '@mui/icons-material/VolumeOff'
import { HeroPattern, FloatingMotif } from '@/components/SVGDecorations'

const slideshowImages = [
  '/images/garden-of-wisdom.png',
  '/images/path-of-sufism.png',
  '/images/divine-love-quotes.png',
  '/images/wisdom-for-hard-times.png',
  '/images/light-and-darkness.png',
  '/images/persian-poetry-masterpieces.png',
  '/images/quote-river-joy.png',
  '/images/quote-seek-seeking.png',
  '/images/quote-wound-light.png',
  '/images/hero-main.png',
  '/images/explore-hero.png',
]

interface Quote {
  id: number
  persian: string
  english: string
  source: string
}

const quotes: Quote[] = [
  // Rumi (5)
  { id: 1, persian: 'بشنو این نی چون شکایت می‌کند / از جدایی‌ها حکایت می‌کند', english: 'Listen to the reed, how it tells a tale of separations / It complains of the pain of longing.', source: 'Rumi' },
  { id: 2, persian: 'عشق، آن دریای بی‌کران است که هیچ ساحلی ندارد', english: 'Love is that endless sea with no shore', source: 'Rumi' },
  { id: 3, persian: 'حقیقت را در آینه قلب خود ببین', english: 'See the truth in the mirror of your heart', source: 'Rumi' },
  { id: 4, persian: 'ای صوفی، ببخشای و ببخش، که رحم تو بر غیر خود نیز گسترده شده است', english: 'O Sufi, forgive and pardon, for your mercy extends beyond yourself', source: 'Rumi' },
  { id: 5, persian: 'تو خود آن چیزی که می‌جویی', english: 'You are yourself what you seek', source: 'Rumi' },
  // Hafez (4)
  { id: 6, persian: 'هر که را به یقین رسیده‌ست، بی‌نیاز از کس شده‌ست', english: 'Whoever has reached certainty has become independent of everyone', source: 'Hafez' },
  { id: 7, persian: 'دلا دیدی که آن دلبر چه کرد آخر / ز رخ پرده برانداخت و ساغر بر کف اندر بست', english: 'O heart, see what the beloved finally did / Unveiled her face and took the cup in hand', source: 'Hafez' },
  { id: 8, persian: 'دوش دیدم که ملایک در میخانه زدند / گل آدم بسرشتند و به پیمانه زدند', english: 'Last night I saw angels knocking at the tavern door / They kneaded Adam\'s clay and poured it into the cup', source: 'Hafez' },
  { id: 9, persian: 'غم و شادی به هم بسته‌ست، ای دل / چو شادی می‌طلبی غم هم بخر', english: 'Sorrow and joy are bound together, O heart / If you seek joy, buy sorrow too', source: 'Hafez' },
  // Saadi (4)
  { id: 10, persian: 'دانش بی‌عمل، درختی است بی‌برگ', english: 'Knowledge without action is a tree without leaves', source: 'Saadi' },
  { id: 11, persian: 'صبر تلخ است، لیکن ثمراتش شیرین است', english: 'Patience is bitter, but its fruits are sweet', source: 'Saadi' },
  { id: 12, persian: 'بنی آدم اعضای یکدیگرند / که در آفرینش ز یک گوهرند', english: 'Human beings are members of a whole / In creation of one essence and soul', source: 'Saadi' },
  { id: 13, persian: 'چو عضوی به درد آورد روزگار / دگر عضوها را نماند قرار', english: 'When one member is afflicted with pain / The other members cannot remain at rest', source: 'Saadi' },
  // Attar (3)
  { id: 14, persian: 'از گلزار عالم، هیچ نگذر که بی‌حاصل نگذری', english: 'Pass not through any garden of the world without harvest', source: 'Attar' },
  { id: 15, persian: 'هفت وادی عشق را طی کن تا به سیمرغ برسی', english: 'Traverse the seven valleys of love to reach the Simurgh', source: 'Attar' },
  { id: 16, persian: 'هر که در راه حق قدم نهاد / از خودی خود به کلی برون آمد', english: 'Whoever steps on the path of truth / Came completely out of their selfhood', source: 'Attar' },
  // Sanai (2)
  { id: 17, persian: 'در طلب حق، جان را فدا کن که جان بخشایی می‌یابی', english: "In seeking the Truth, sacrifice your soul, for you shall find the soul's salvation", source: 'Sanai' },
  { id: 18, persian: 'از خود برون آ تا درون یابی / در عشق فنا شو تا بقا یابی', english: 'Come out of yourself to find within / Die in love to find eternal life', source: 'Sanai' },
  // Jami (2)
  { id: 19, persian: 'هر که را عشق باشد، همه چیز را در همه چیز ببیند', english: 'He who has love sees everything in everything', source: 'Jami' },
  { id: 20, persian: 'عشق حقیقی پرده از رخ بر گرفت / هر دو جهان را در خود مستغرق یافت', english: 'True love unveiled its face / Found both worlds drowned in itself', source: 'Jami' },
  // Nizami (2)
  { id: 21, persian: 'از این گفتار پرده بردار که راز جاودانگی در آن نهفته است', english: 'Unveil this speech, for the secret of eternity lies within it', source: 'Nizami' },
  { id: 22, persian: 'گر همه عالم به تو روی آرد / از تو مپندار که حق برگردد', english: 'Even if the whole world turns to you / Do not think the Truth will turn from you', source: 'Nizami' },
  // Ferdowsi (3)
  { id: 23, persian: 'توانا بود هر که دانا بود / ز دانش دل پیر برنا بود', english: 'Powerful is one who is knowledgeable / Through knowledge the old heart grows young', source: 'Ferdowsi' },
  { id: 24, persian: 'به جهان خرم از آنم که جهان خرم از اوست / عاشقم بر همه عالم که همه عالم از اوست', english: 'I am happy in this world because the world is happy from Him / I love all the world because all the world is from Him', source: 'Ferdowsi' },
  { id: 25, persian: 'بسی رنج بردم در این سال سی / عجم زنده کردم بدین پارسی', english: 'I suffered greatly in these thirty years / I revived Persia with this Persian tongue', source: 'Ferdowsi' },
  // Ibn Sina (3)
  { id: 26, persian: 'معرفت به نفس، مقدمه معرفت به خداست', english: 'Knowledge of the self is the prelude to knowledge of God', source: 'Ibn Sina' },
  { id: 27, persian: 'عقل فعال، دهنده صورت‌هاست به ماده', english: 'The Active Intellect gives forms to matter', source: 'Ibn Sina' },
  { id: 28, persian: 'نفس ناطقه، جوهری است غیر مادی', english: 'The rational soul is a non-material substance', source: 'Ibn Sina' },
  // Al-Farabi (2)
  { id: 29, persian: 'مدینه فاضله، شهری است که در آن هر کس به کمال خود رسد', english: 'The virtuous city is one where each person reaches their perfection', source: 'Al-Farabi' },
  { id: 30, persian: 'خوشبختی غایت قصوای انسان است و جز با تعقل حاصل نمی‌شود', english: 'Happiness is humanity\'s ultimate end, attained only through reason', source: 'Al-Farabi' },
  // Al-Ghazali (3)
  { id: 31, persian: 'هر روزی که در آن ذکر حق تعالی نباشد، روز بی‌برکت است', english: 'Every day without remembrance of God is a day without blessing', source: 'Al-Ghazali' },
  { id: 32, persian: 'شک، پلی است به سوی یقین', english: 'Doubt is a bridge to certainty', source: 'Al-Ghazali' },
  { id: 33, persian: 'کسی که خود را نشناخت، خدای خود را نشناخت', english: 'Who does not know themselves does not know their God', source: 'Al-Ghazali' },
  // Suhrawardi (2)
  { id: 34, persian: 'نور حقیقتی است که خود را آشکار می‌کند و دیگر اشیا را آشکار می‌سازد', english: 'Light is a reality that reveals itself and makes other things manifest', source: 'Suhrawardi' },
  { id: 35, persian: 'هر ذره از جهان، آیینه‌ای است که نور حق در آن تجلی می‌کند', english: 'Every particle of the world is a mirror in which the light of Truth manifests', source: 'Suhrawardi' },
  // Mulla Sadra (3)
  { id: 36, persian: 'زندگی آن است که بین مرگ و دروازه‌های جاودانگی باشد', english: 'Life is that which stands between death and the gates of eternity', source: 'Mulla Sadra' },
  { id: 37, persian: 'وجود حقیقتی است که همیشه در حال حرکت و اشتداد است', english: 'Existence is a reality that is always in motion and intensification', source: 'Mulla Sadra' },
  { id: 38, persian: 'نفس در حرکت جوهری خود از ماده به معنا سفر می‌کند', english: 'The soul journeys in its substantial motion from matter to meaning', source: 'Mulla Sadra' },
  // Nasir al-Din Tusi (2)
  { id: 39, persian: 'انسان نقطه وسط است میان حیوان و فرشته', english: 'Man stands between animal and angel', source: 'Nasir al-Din al-Tusi' },
  { id: 40, persian: 'جهان همچون کتابی است که هر که خواندن داند، از آن بهره گیرد', english: 'The world is like a book from which anyone who knows how to read may benefit', source: 'Nasir al-Din al-Tusi' },
  // Ibn Rushd (2)
  { id: 41, persian: 'حقیقت با حقیقت تضاد ندارد، بلکه موافق و شاهد آن است', english: 'Truth does not contradict truth; rather, it agrees and bears witness to it', source: 'Ibn Rushd' },
  { id: 42, persian: 'فلسفه، دوست حقیقت است و دین نیز حقیقت را می‌جوید', english: 'Philosophy is the friend of truth, and religion also seeks truth', source: 'Ibn Rushd' },
  // Al-Kindi (2)
  { id: 43, persian: 'علم نوری است که خدا در قلب هر که بخواهد قرار می‌دهد', english: 'Knowledge is a light that God places in the heart of whom He wills', source: 'Al-Kindi' },
  { id: 44, persian: 'نباید از پذیرش حق شرم کنیم، هر چند از مخالفان ما آمده باشد', english: 'We should not be ashamed to accept truth, even if it comes from our opponents', source: 'Al-Kindi' },
  // Ibn Arabi (3)
  { id: 45, persian: 'عارف کسی است که در هر دو جهان، بی‌مکان شده‌ست', english: 'The mystic is one who has become placeless in both worlds', source: 'Ibn Arabi' },
  { id: 46, persian: 'قلب مؤمن، عرش الرحمن است', english: 'The heart of the believer is the throne of the All-Merciful', source: 'Ibn Arabi' },
  { id: 47, persian: 'وجود یکی است و کثرت در مظاهر است', english: 'Existence is one, and multiplicity is in the manifestations', source: 'Ibn Arabi' },
  // Bayazid Bastami (2)
  { id: 48, persian: 'سالک باید از خود برهد تا به حق رسد', english: 'The seeker must escape from self to reach the Truth', source: 'Bayazid Bastami' },
  { id: 49, persian: 'من آن کسم که در دریا درونم / ز خود رفتم چو ماهی در عیانم', english: 'I am one who is within the sea / I left myself like a fish in manifest waters', source: 'Bayazid Bastami' },
  // Hallaj (2)
  { id: 50, persian: 'مرگ ما را نمی‌ترساند، زیرا ما دوستان مرگیم', english: 'Death does not frighten us, for we are friends of death', source: 'Hallaj' },
  { id: 51, persian: 'انا الحق / من حقم', english: 'I am the Truth', source: 'Hallaj' },
  // Junayd Baghdadi (2)
  { id: 52, persian: 'صوفی، زنده به وقت است', english: 'The Sufi is the child of the moment', source: 'Junayd of Baghdad' },
  { id: 53, persian: 'توحید، برداشتن حدوث از قدم است', english: 'Tawhid is the removal of temporality from eternity', source: 'Junayd of Baghdad' },
  // Abdul-Qadir Gilani (2)
  { id: 54, persian: 'هر که خدا را شناخت، از غیر او برید', english: 'Whoever knows God cuts off from other than Him', source: 'Abdul-Qadir Gilani' },
  { id: 55, persian: 'دل جایگاه خداست، آن را از غیر پاک کن', english: 'The heart is the place of God, purify it from other than Him', source: 'Abdul-Qadir Gilani' },
  // Najm Kubra (2)
  { id: 56, persian: 'نور معرفت در دل سالک می‌تابد و او را به اصل خود می‌رساند', english: 'The light of knowledge shines in the seeker\'s heart and leads them to their origin', source: 'Najm al-Din Kubra' },
  { id: 57, persian: 'رنگ‌های روحانی نشانه مقامات سلوک است', english: 'Spiritual colors are signs of the stations of the journey', source: 'Najm al-Din Kubra' },
  // Seyyed Hossein Nasr (2)
  { id: 58, persian: 'حکمت جاودان، گوهری است که در همه سنت‌های اصیل یافت می‌شود', english: 'Sophia perennis is a jewel found in all authentic traditions', source: 'Seyyed Hossein Nasr' },
  { id: 59, persian: 'علم مقدس، دانشی است که انسان را به خدا نزدیک می‌کند', english: 'Sacred science is knowledge that brings humanity closer to God', source: 'Seyyed Hossein Nasr' },
  // Allama Tabatabai (2)
  { id: 60, persian: 'قرآن، کتاب هدایت است، نه کتاب علم', english: 'The Quran is a book of guidance, not a book of science', source: 'Allama Tabatabai' },
  { id: 61, persian: 'اعتبار علم، به کشف واقعیت است نه به ساخت ذهن', english: 'The validity of knowledge lies in discovering reality, not mental construction', source: 'Allama Tabatabai' },
  // Morteza Motahhari (2)
  { id: 62, persian: 'انقلاب اسلامی، نتیجه بازگشت به هویت اسلامی بود', english: 'The Islamic Revolution was the result of a return to Islamic identity', source: 'Morteza Motahhari' },
  { id: 63, persian: 'عدالت، اساس همه فضایل است', english: 'Justice is the foundation of all virtues', source: 'Morteza Motahhari' },
  // Abdolkarim Soroush (2)
  { id: 64, persian: 'دین، معرفتی است بشری در سایه وحی', english: 'Religion is human knowledge in the shadow of revelation', source: 'Abdolkarim Soroush' },
  { id: 65, persian: 'قبض و بسط تئوریک شریعت، نظریه‌ای درباره تکامل معرفت دینی است', english: 'The theoretical contraction and expansion of Sharia is a theory about the evolution of religious knowledge', source: 'Abdolkarim Soroush' },
  // Dariush Shayegan (2)
  { id: 66, persian: 'ما در عصر گفتگوی تمدن‌ها زندگی می‌کنیم', english: 'We live in the age of dialogue among civilizations', source: 'Dariush Shayegan' },
  { id: 67, persian: 'هویت، نه یک ذات ثابت، بلکه یک ساختار سیال است', english: 'Identity is not a fixed essence but a fluid structure', source: 'Dariush Shayegan' },
  // Zoroaster (3)
  { id: 68, persian: 'پندار نیک، گفتار نیک، کردار نیک', english: 'Good thoughts, good words, good deeds', source: 'Zoroaster' },
  { id: 69, persian: 'اشا، راستی و نظم کیهانی است که جهان بر آن استوار است', english: 'Asha is truth and cosmic order upon which the world is founded', source: 'Zoroaster' },
  { id: 70, persian: 'انسان در انتخاب میان خیر و شر آزاد است', english: 'Humanity is free to choose between good and evil', source: 'Zoroaster' },
  // Mazdak (2)
  { id: 71, persian: 'مال و ثروت باید در میان همه تقسیم شود', english: 'Wealth and property should be divided among all', source: 'Mazdak' },
  { id: 72, persian: 'عدالت اجتماعی، اساس صلح و آرامش است', english: 'Social justice is the foundation of peace and tranquility', source: 'Mazdak' },
  // Mani (2)
  { id: 73, persian: 'نور و ظلمت، دو اصل ازلی و ابدی هستند', english: 'Light and darkness are two primordial and eternal principles', source: 'Mani' },
  { id: 74, persian: 'روح انسان زندانی تن است و باید از آن رهایی یابد', english: 'The human soul is a prisoner of the body and must be liberated from it', source: 'Mani' },
  // Classical wisdom (5)
  { id: 75, persian: 'آن کس که خود را بشناسد، پروردگارش را شناخته‌است', english: 'He who knows himself has known his Lord', source: 'Sufi saying' },
  { id: 76, persian: 'بهشت زیر قدم‌های مادران است', english: 'Paradise lies beneath the feet of mothers', source: 'Prophet Muhammad' },
  { id: 77, persian: 'ادب، سرمایه‌ای است که با هیچ ثروتی برابر نیست', english: 'Etiquette is a capital that no wealth can equal', source: 'Persian proverb' },
  { id: 78, persian: 'این نیز بگذرد', english: 'This too shall pass', source: 'Persian wisdom' },
  { id: 79, persian: 'صبر کلید گشایش است', english: 'Patience is the key to relief', source: 'Persian proverb' },
  // Additional Rumi depth
  { id: 80, persian: 'قضای حق به جانان در قفاست / که هر که راست بیند جان، جانان را', english: 'The decree of truth follows the beloved / Whoever sees the soul truly, sees the Beloved', source: 'Rumi' },
]

const SLIDE_DURATION = 8000

type TransitionType =
  | 'fade'
  | 'slideLeft'
  | 'slideRight'
  | 'slideUp'
  | 'slideDown'
  | 'zoom'

interface SlideDecoration {
  type: 'star' | 'tinyStar' | 'comet' | 'floatingDust'
  position: { x: string; y: string }
  delay?: number
}

interface SlideConfig {
  imagePosition: { x: string; y: string }
  imageSize: number
  textArea: 'left' | 'right'
  textAlign: 'left' | 'right'
  transition: TransitionType
  decorations: SlideDecoration[]
}

const slideConfigs: SlideConfig[] = [
  {
    imagePosition: { x: '16%', y: '50%' },
    imageSize: 35,
    textArea: 'right',
    textAlign: 'right',
    transition: 'fade',
    decorations: [
      { type: 'star', position: { x: '78%', y: '22%' }, delay: 0 },
      { type: 'tinyStar', position: { x: '85%', y: '45%' }, delay: 1 },
      { type: 'tinyStar', position: { x: '72%', y: '68%' }, delay: 2 },
      { type: 'star', position: { x: '90%', y: '75%' }, delay: 3 },
      { type: 'comet', position: { x: '55%', y: '35%' }, delay: 0 },
    ],
  },
  {
    imagePosition: { x: '84%', y: '50%' },
    imageSize: 35,
    textArea: 'left',
    textAlign: 'left',
    transition: 'slideLeft',
    decorations: [
      { type: 'tinyStar', position: { x: '22%', y: '28%' }, delay: 0 },
      { type: 'star', position: { x: '35%', y: '55%' }, delay: 1 },
      { type: 'tinyStar', position: { x: '15%', y: '72%' }, delay: 2 },
      { type: 'comet', position: { x: '45%', y: '65%' }, delay: 2 },
      { type: 'star', position: { x: '28%', y: '82%' }, delay: 3 },
    ],
  },
  {
    imagePosition: { x: '20%', y: '32%' },
    imageSize: 38,
    textArea: 'right',
    textAlign: 'right',
    transition: 'slideUp',
    decorations: [
      { type: 'star', position: { x: '75%', y: '55%' }, delay: 0 },
      { type: 'tinyStar', position: { x: '82%', y: '35%' }, delay: 1 },
      { type: 'tinyStar', position: { x: '68%', y: '72%' }, delay: 2 },
      { type: 'star', position: { x: '88%', y: '65%' }, delay: 3 },
      { type: 'comet', position: { x: '60%', y: '45%' }, delay: 1 },
    ],
  },
  {
    imagePosition: { x: '80%', y: '68%' },
    imageSize: 32,
    textArea: 'left',
    textAlign: 'left',
    transition: 'slideRight',
    decorations: [
      { type: 'tinyStar', position: { x: '28%', y: '32%' }, delay: 0 },
      { type: 'star', position: { x: '42%', y: '55%' }, delay: 1 },
      { type: 'tinyStar', position: { x: '18%', y: '75%' }, delay: 2 },
      { type: 'comet', position: { x: '35%', y: '45%' }, delay: 0 },
      { type: 'star', position: { x: '52%', y: '78%' }, delay: 3 },
    ],
  },
  {
    imagePosition: { x: '20%', y: '58%' },
    imageSize: 36,
    textArea: 'right',
    textAlign: 'right',
    transition: 'zoom',
    decorations: [
      { type: 'star', position: { x: '68%', y: '32%' }, delay: 0 },
      { type: 'tinyStar', position: { x: '78%', y: '52%' }, delay: 1 },
      { type: 'tinyStar', position: { x: '62%', y: '72%' }, delay: 2 },
      { type: 'star', position: { x: '85%', y: '68%' }, delay: 3 },
      { type: 'comet', position: { x: '55%', y: '25%' }, delay: 2 },
    ],
  },
  {
    imagePosition: { x: '76%', y: '30%' },
    imageSize: 34,
    textArea: 'left',
    textAlign: 'left',
    transition: 'slideDown',
    decorations: [
      { type: 'tinyStar', position: { x: '32%', y: '65%' }, delay: 0 },
      { type: 'star', position: { x: '48%', y: '42%' }, delay: 1 },
      { type: 'tinyStar', position: { x: '22%', y: '78%' }, delay: 2 },
      { type: 'comet', position: { x: '38%', y: '55%' }, delay: 1 },
      { type: 'star', position: { x: '55%', y: '82%' }, delay: 3 },
    ],
  },
  {
    imagePosition: { x: '14%', y: '50%' },
    imageSize: 34,
    textArea: 'right',
    textAlign: 'right',
    transition: 'slideRight',
    decorations: [
      { type: 'star', position: { x: '65%', y: '45%' }, delay: 0 },
      { type: 'tinyStar', position: { x: '78%', y: '28%' }, delay: 1 },
      { type: 'tinyStar', position: { x: '55%', y: '68%' }, delay: 2 },
      { type: 'star', position: { x: '85%', y: '58%' }, delay: 3 },
      { type: 'comet', position: { x: '48%', y: '32%' }, delay: 0 },
    ],
  },
  {
    imagePosition: { x: '86%', y: '50%' },
    imageSize: 34,
    textArea: 'left',
    textAlign: 'left',
    transition: 'slideLeft',
    decorations: [
      { type: 'tinyStar', position: { x: '28%', y: '38%' }, delay: 0 },
      { type: 'star', position: { x: '42%', y: '62%' }, delay: 1 },
      { type: 'tinyStar', position: { x: '18%', y: '55%' }, delay: 2 },
      { type: 'comet', position: { x: '35%', y: '45%' }, delay: 2 },
      { type: 'star', position: { x: '52%', y: '78%' }, delay: 3 },
    ],
  },
  {
    imagePosition: { x: '18%', y: '70%' },
    imageSize: 30,
    textArea: 'right',
    textAlign: 'right',
    transition: 'fade',
    decorations: [
      { type: 'star', position: { x: '72%', y: '28%' }, delay: 0 },
      { type: 'tinyStar', position: { x: '82%', y: '48%' }, delay: 1 },
      { type: 'tinyStar', position: { x: '65%', y: '62%' }, delay: 2 },
      { type: 'star', position: { x: '90%', y: '55%' }, delay: 3 },
      { type: 'comet', position: { x: '55%', y: '72%' }, delay: 1 },
    ],
  },
  {
    imagePosition: { x: '82%', y: '32%' },
    imageSize: 30,
    textArea: 'left',
    textAlign: 'left',
    transition: 'fade',
    decorations: [
      { type: 'tinyStar', position: { x: '32%', y: '72%' }, delay: 0 },
      { type: 'star', position: { x: '45%', y: '52%' }, delay: 1 },
      { type: 'tinyStar', position: { x: '22%', y: '38%' }, delay: 2 },
      { type: 'comet', position: { x: '38%', y: '65%' }, delay: 0 },
      { type: 'star', position: { x: '55%', y: '82%' }, delay: 3 },
    ],
  },
]

function getTransitionStyles(
  transition: TransitionType,
  isOut: boolean
): React.CSSProperties {
  const duration = 1500
  switch (transition) {
    case 'fade':
      return { opacity: isOut ? 0 : 1, transition: `opacity ${duration}ms ease-in-out` }
    case 'slideLeft':
      return {
        opacity: isOut ? 0 : 1,
        transform: isOut ? 'translateX(120px)' : 'translateX(0)',
        transition: `all ${duration}ms ease-in-out`,
      }
    case 'slideRight':
      return {
        opacity: isOut ? 0 : 1,
        transform: isOut ? 'translateX(-120px)' : 'translateX(0)',
        transition: `all ${duration}ms ease-in-out`,
      }
    case 'slideUp':
      return {
        opacity: isOut ? 0 : 1,
        transform: isOut ? 'translateY(80px)' : 'translateY(0)',
        transition: `all ${duration}ms ease-in-out`,
      }
    case 'slideDown':
      return {
        opacity: isOut ? 0 : 1,
        transform: isOut ? 'translateY(-80px)' : 'translateY(0)',
        transition: `all ${duration}ms ease-in-out`,
      }
    case 'zoom':
      return {
        opacity: isOut ? 0 : 1,
        transform: isOut ? 'scale(0.88)' : 'scale(1)',
        transition: `all ${duration}ms ease-in-out`,
      }
    default:
      return { opacity: isOut ? 0 : 1 }
  }
}

function SlideDecoration({ type, position, delay = 0 }: SlideDecoration) {
  const baseStyle: React.CSSProperties = {
    position: 'absolute',
    left: position.x,
    top: position.y,
    transform: 'translate(-50%, -50%)',
    pointerEvents: 'none',
  }

  switch (type) {
    case 'star':
      return (
        <Box
          sx={{
            ...baseStyle,
            animation: `starGlow 6s ease-in-out infinite`,
            animationDelay: `${delay * 1.5}s`,
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="3" fill="#c9a962" opacity={0.25} />
            <circle cx="12" cy="12" r="6" fill="#c9a962" opacity={0.12} />
            <circle cx="12" cy="12" r="10" fill="#c9a962" opacity={0.06} />
          </svg>
        </Box>
      )
    case 'tinyStar':
      return (
        <Box
          sx={{
            ...baseStyle,
            animation: `starGlow 5s ease-in-out infinite`,
            animationDelay: `${delay * 1.2}s`,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14">
            <circle cx="7" cy="7" r="2" fill="#c9a962" opacity={0.2} />
            <circle cx="7" cy="7" r="5" fill="#c9a962" opacity={0.08} />
          </svg>
        </Box>
      )
    case 'comet':
      return (
        <Box
          sx={{
            ...baseStyle,
            animation: `softComet 12s linear infinite`,
            animationDelay: `${delay * 2}s`,
          }}
        >
          <svg width="60" height="8" viewBox="0 0 60 8">
            <defs>
              <linearGradient id="softComet" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#c9a962" stopOpacity="0" />
                <stop offset="100%" stopColor="#c9a962" stopOpacity={0.15} />
              </linearGradient>
            </defs>
            <ellipse cx="30" cy="4" rx="28" ry="3" fill="url(#softComet)" />
            <circle cx="55" cy="4" r="1.5" fill="#c9a962" opacity={0.3} />
          </svg>
        </Box>
      )
    case 'floatingDust':
      return (
        <Box
          sx={{
            ...baseStyle,
            animation: `floatingDust 15s ease-in-out infinite`,
            animationDelay: `${delay * 3}s`,
          }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20">
            <circle cx="10" cy="10" r="1" fill="#c9a962" opacity={0.1} />
            <circle cx="4" cy="6" r="0.8" fill="#c9a962" opacity={0.08} />
            <circle cx="16" cy="14" r="0.6" fill="#c9a962" opacity={0.06} />
          </svg>
        </Box>
      )
    default:
      return null
  }
}

function SlideshowContent() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => {
      clearTimeout(timer)
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  const currentQuote = quotes[currentIndex % quotes.length]
  const currentConfig = slideConfigs[currentIndex % slideConfigs.length]
  const currentImage = slideshowImages[currentIndex % slideshowImages.length]

  const speakQuote = useCallback(
    async (text: string) => {
      if (isMuted || !isLoaded) return

      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }

      try {
        const response = await fetch('/api/tts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text, voiceType: 'persian' }),
        })

        if (response.ok) {
          const audioBlob = await response.blob()
          const audioUrl = URL.createObjectURL(audioBlob)
          const audio = new Audio(audioUrl)
          audioRef.current = audio
          try {
            await audio.play()
          } catch {
            console.log('Autoplay blocked - user interaction required')
            audioRef.current = null
            URL.revokeObjectURL(audioUrl)
            return
          }
          audio.onended = () => {
            audioRef.current = null
            URL.revokeObjectURL(audioUrl)
          }
        }
      } catch (error) {
        console.error('TTS error:', error)
      }
    },
    [isMuted, isLoaded]
  )

  const nextSlide = useCallback(() => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1)
      setIsTransitioning(false)
    }, 1500)
  }, [isTransitioning])

  useEffect(() => {
    if (!isPlaying || !currentQuote || !isLoaded) return
    const speakTimeout = setTimeout(() => speakQuote(currentQuote.persian), 2000)
    const slideTimer = setTimeout(() => nextSlide(), SLIDE_DURATION)
    return () => {
      clearTimeout(speakTimeout)
      clearTimeout(slideTimer)
    }
  }, [currentIndex, isPlaying, currentQuote, nextSlide, speakQuote, isLoaded])

  useEffect(() => {
    if (!isPlaying) {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [isPlaying])

  if (!isLoaded) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          bgcolor: '#050f0a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          sx={{
            color: '#8a7348',
            fontFamily: '"Vazir", serif',
            fontSize: '1.2rem',
            letterSpacing: '0.2em',
          }}
        >
          Loading...
        </Typography>
      </Box>
    )
  }

  const transitionStyles = getTransitionStyles(currentConfig.transition, isTransitioning)

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#050f0a',
        color: '#f5f5f5',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <style jsx global>{`
        @keyframes starGlow {
          0%,
          100% {
            opacity: 0.4;
            transform: translate(-50%, -50%) scale(0.9);
          }
          50% {
            opacity: 0.8;
            transform: translate(-50%, -50%) scale(1.1);
          }
        }
        @keyframes softComet {
          0% {
            transform: translate(-50%, -50%) translateX(-20px);
            opacity: 0;
          }
          15% {
            opacity: 0.6;
          }
          85% {
            opacity: 0.6;
          }
          100% {
            transform: translate(-50%, -50%) translateX(20px);
            opacity: 0;
          }
        }
        @keyframes floatingDust {
          0%,
          100% {
            transform: translate(-50%, -50%) translateY(0);
            opacity: 0.3;
          }
          50% {
            transform: translate(-50%, -50%) translateY(-8px);
            opacity: 0.5;
          }
        }
      `}</style>

      {/* Hero */}
      <Box
        sx={{ position: 'relative', minHeight: { xs: 100, md: 140 }, overflow: 'hidden' }}
      >
        <Box sx={{ position: 'absolute', inset: 0 }}>
          <Image
            src="/images/hero-main.png"
            alt="Slideshow"
            fill
            style={{ objectFit: 'cover', opacity: 0.35 }}
            priority
          />
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(180deg, rgba(5, 15, 10, 0.92) 0%, rgba(5, 15, 10, 0.7) 60%, rgba(5, 15, 10, 0.5) 100%)',
            }}
          />
        </Box>
        <HeroPattern color="#8a7348" opacity={0.03} />
        <FloatingMotif
          variant="celestial"
          color="#8a7348"
          size={30}
          top="20%"
          left="10%"
          opacity={0.04}
        />
      </Box>

      {/* Main Stage */}
      <Box
        sx={{
          position: 'relative',
          minHeight: { xs: '100vh', md: 'calc(100vh - 140px)' },
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'flex-start', md: 'center' },
          justifyContent: 'flex-start',
          px: { xs: 2, md: 14 },
          pt: { xs: 2, md: 3 },
          pb: { xs: 10, md: 8 },
        }}
      >
        <Box sx={{ position: 'absolute', inset: 0, opacity: { xs: 0.15, md: 0.4 } }}>
          <HeroPattern color="#8a7348" opacity={0.04} />
        </Box>
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          <FloatingMotif
            variant="celestial"
            color="#8a7348"
            size={100}
            top="5%"
            left="2%"
            opacity={0.04}
          />
        </Box>
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          <FloatingMotif
            variant="waves"
            color="#8a7348"
            size={80}
            bottom="10%"
            right="5%"
            opacity={0.03}
          />
        </Box>

        {currentConfig.decorations.map((decor, idx) => (
          <Box
            key={`${currentIndex}-${idx}`}
            sx={{ display: { xs: 'none', md: 'block' } }}
          >
            <SlideDecoration {...decor} />
          </Box>
        ))}

        <Box
          sx={{
            width: '100%',
            maxWidth: 1800,
            mx: 'auto',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* Mobile: stacked layout - image first, then quote */}
          <Box
            sx={{
              display: { xs: 'flex', md: 'none' },
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
              width: '100%',
              mt: 2,
              pb: 4,
            }}
          >
            <Box
              sx={{
                width: '90%',
                maxWidth: 360,
                height: 200,
                borderRadius: 1,
                overflow: 'hidden',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)',
                flexShrink: 0,
                position: 'relative', // ← add this
              }}
            >
              <Image
                src={currentImage}
                alt="Wisdom"
                fill
                style={{ objectFit: 'cover' }}
                priority
              />
            </Box>
            <Box
              sx={{
                width: '95%',
                textAlign: 'center',
                border: '1px solid rgba(201, 169, 98, 0.25)',
                borderRadius: 2,
                p: 3,
                background: 'rgba(5, 15, 10, 0.4)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <Typography
                sx={{
                  fontFamily: '"Vazir", "Noto Naskh Arabic", serif',
                  fontSize: '1.4rem',
                  lineHeight: 2.2,
                  color: '#c9a962',
                  mb: 2.5,
                  textShadow: '0 3px 20px rgba(0, 0, 0, 0.5)',
                  direction: 'rtl',
                  fontWeight: 300,
                }}
              >
                {currentQuote.persian}
              </Typography>
              <Typography
                sx={{
                  fontFamily: '"Vazir", serif',
                  fontSize: '1rem',
                  lineHeight: 1.8,
                  color: '#c9a962',
                  opacity: 0.8,
                  mb: 2,
                  textShadow: '0 2px 15px rgba(0, 0, 0, 0.5)',
                }}
              >
                {currentQuote.english}
              </Typography>
              <Typography
                sx={{
                  fontFamily: '"Vazir", serif',
                  fontSize: '0.75rem',
                  color: 'rgba(201, 169, 98, 0.35)',
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                }}
              >
                — {currentQuote.source}
              </Typography>
            </Box>
          </Box>

          {/* Desktop: side-by-side layout */}
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              width: '100%',
              ...transitionStyles,
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                left: currentConfig.imagePosition.x,
                top: currentConfig.imagePosition.y,
                transform: 'translate(-50%, -50%)',
                width: `${currentConfig.imageSize}%`,
                maxWidth: 540,
                height: 380,
                borderRadius: 1,
                overflow: 'hidden',
                boxShadow:
                  '0 35px 80px rgba(0, 0, 0, 0.6), 0 0 60px rgba(201, 169, 98, 0.06)',
              }}
            >
              <Image
                src={currentImage}
                alt="Wisdom"
                fill
                style={{ objectFit: 'cover' }}
                priority
              />
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(145deg, rgba(5, 15, 10, 0.15) 0%, transparent 60%)',
                }}
              />
            </Box>

            <Box
              sx={{
                position: 'relative',
                width: '48%',
                ml: currentConfig.textArea === 'right' ? 'auto' : 0,
                mr: currentConfig.textArea === 'left' ? 'auto' : 0,
                pr: currentConfig.textArea === 'left' ? 14 : 0,
                pl: currentConfig.textArea === 'right' ? 14 : 0,
                textAlign: currentConfig.textAlign,
                border: '1px solid rgba(201, 169, 98, 0.25)',
                borderRadius: 2,
                p: 4,
                background: 'rgba(5, 15, 10, 0.4)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <Typography
                sx={{
                  fontFamily: '"Vazir", "Noto Naskh Arabic", serif',
                  fontSize: { md: '2.4rem', lg: '3rem' },
                  lineHeight: 2.4,
                  color: '#c9a962',
                  mb: 5,
                  textShadow: '0 3px 20px rgba(0, 0, 0, 0.5)',
                  direction: 'rtl',
                  fontWeight: 300,
                }}
              >
                {currentQuote.persian}
              </Typography>

              <Typography
                sx={{
                  fontFamily: '"Vazir", serif',
                  fontSize: { md: '1.5rem', lg: '1.8rem' },
                  lineHeight: 2,
                  color: '#c9a962',
                  opacity: 0.8,
                  mb: 3,
                  textShadow: '0 2px 15px rgba(0, 0, 0, 0.5)',
                }}
              >
                {currentQuote.english}
              </Typography>

              <Typography
                sx={{
                  fontFamily: '"Vazir", serif',
                  fontSize: '0.9rem',
                  color: 'rgba(201, 169, 98, 0.35)',
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                }}
              >
                — {currentQuote.source}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            position: 'absolute',
            bottom: 6,
            left: '50%',
            transform: 'translateX(-50%)',
            display: { xs: 'none', md: 'flex' },
            gap: 0.75,
          }}
        >
          {quotes.slice(0, Math.min(quotes.length, 30)).map((_: Quote, idx: number) => (
            <Box
              key={idx}
              sx={{
                width: idx === currentIndex % quotes.length ? 28 : 6,
                height: 2,
                borderRadius: 1,
                bgcolor:
                  idx === currentIndex % quotes.length ? '#c9a962' : 'rgba(201, 169, 98, 0.15)',
                transition: 'all 0.5s ease',
              }}
            />
          ))}
        </Box>

        <Box
          sx={{
            position: 'absolute',
            bottom: 5,
            right: { xs: 3, md: 8 },
            display: { xs: 'none', md: 'flex' },
            gap: 1,
          }}
        >
          <IconButton
            onClick={() => setIsPlaying(!isPlaying)}
            sx={{
              color: '#8a7348',
              bgcolor: 'rgba(201, 169, 98, 0.06)',
              border: '1px solid rgba(201, 169, 98, 0.12)',
              '&:hover': { bgcolor: 'rgba(201, 169, 98, 0.12)' },
            }}
          >
            {isPlaying ? (
              <PauseIcon sx={{ fontSize: { xs: 18, md: 22 } }} />
            ) : (
              <PlayArrowIcon sx={{ fontSize: { xs: 18, md: 22 } }} />
            )}
          </IconButton>
          <IconButton
            onClick={() => setIsMuted(!isMuted)}
            sx={{
              color: '#8a7348',
              bgcolor: 'rgba(201, 169, 98, 0.06)',
              border: '1px solid rgba(201, 169, 98, 0.12)',
              '&:hover': { bgcolor: 'rgba(201, 169, 98, 0.12)' },
            }}
          >
            {isMuted ? (
              <VolumeOffIcon sx={{ fontSize: { xs: 18, md: 22 } }} />
            ) : (
              <VolumeUpIcon sx={{ fontSize: { xs: 18, md: 22 } }} />
            )}
          </IconButton>
        </Box>

        <Box
          sx={{
            position: 'absolute',
            top: 5,
            right: { xs: 3, md: 8 },
            display: { xs: 'none', md: 'block' },
          }}
        >
          <Typography
            sx={{
              color: 'rgba(201, 169, 98, 0.25)',
              fontSize: { xs: '0.65rem', md: '0.75rem' },
              letterSpacing: '0.15em',
            }}
          >
            {currentIndex + 1}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default function SlideshowPage() {
  return <SlideshowContent />
}
