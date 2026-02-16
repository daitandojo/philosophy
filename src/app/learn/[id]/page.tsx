'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  Stack,
  LinearProgress,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Alert,
  Breadcrumbs,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SchoolIcon from '@mui/icons-material/School';
import TimerIcon from '@mui/icons-material/Timer';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import QuizIcon from '@mui/icons-material/Quiz';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface Lesson {
  _id: string;
  title: string;
  content: string;
  verseIds: string[];
  quiz?: QuizQuestion[];
}

interface LearningPath {
  _id: string;
  title: string;
  subtitle?: string;
  description: string;
  philosopher?: string;
  era: string;
  lessons: Lesson[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number;
}

const learningPaths: LearningPath[] = [
  {
    _id: 'ancient-iranian',
    subtitle: 'Part I: The Dawn of Wisdom',
    title: 'Ancient Iranian Philosophy',
    description: 'Explore the origins of Persian philosophical thought, from Zoroastrian cosmology to the Achaemenid ethical empire.',
    philosopher: 'Zarathustra',
    era: 'ancient',
    lessons: [
      { 
        _id: '1', 
        title: 'The World of Zarathustra', 
        content: `The Iranian plateau in the second millennium BCE gave birth to a distinct way of seeing the world. Unlike the capricious nature-gods of the Bronze Age, this was a vision that moved toward a universe that was intelligible, ethical, and demanding.\n\nThe light of this land is unforgivingly clear. The nights are abyssal. In this landscape, the distinction between light and darkness is not a metaphor—it is a survival instinct.\n\nBefore the Greeks codified logic, the Iranians codified *conscience*.`, 
        verseIds: [],
        quiz: [
          { id: 'q1', question: 'When did Zoroastrian philosophy originate?', options: ['500 BCE', '1500-1000 BCE', '300 CE', '100 BCE'], correctAnswer: 1 },
          { id: 'q2', question: 'What was unique about early Iranian philosophy?', options: ['Focus on logic', 'Ethical monotheism', 'Atheism', 'Materialism'], correctAnswer: 1 },
        ]
      },
      { 
        _id: '2', 
        title: 'Ahura Mazda and the Cosmic Order', 
        content: `Zarathustra saw into the fire of the hearth and discovered something revolutionary: the universe is defined by a choice.\n\n**Ahura Mazda** (The Wise Lord) represents the supreme deity of Zoroastrianism—a God who is not just powerful, but fundamentally *Good*.\n\n**Asha** (Truth/Order) vs. **Druj** (The Lie/Chaos)—this cosmic battle forms the foundation of Zoroastrian ethics.`, 
        verseIds: [],
        quiz: [
          { id: 'q1', question: 'What does Ahura Mazda mean?', options: ['The Warrior', 'The Wise Lord', 'The Creator', 'The Sun'], correctAnswer: 1 },
          { id: 'q2', question: 'What is Asha?', options: ['A prophet', 'Truth and Order', 'A holy book', 'A temple'], correctAnswer: 1 },
        ]
      },
      { 
        _id: '3', 
        title: 'The Gathas as Metaphysics', 
        content: `The Gathas are difficult, archaic, and deeply personal. They do not read like commandments; they read like the questions of a man interrogating the cosmos.\n\n*"This I ask Thee, tell me truly, Lord…"*\n\nIn these verses, we find the birth of ethical monotheism—a universe governed by a supreme wisdom, where righteousness and truth lead to spiritual victory (Pirozesh).`, 
        verseIds: [],
        quiz: [
          { id: 'q1', question: 'What are the Gathas?', options: ['Temples', 'Hymns by Zarathustra', 'Kings of Persia', 'Holy books'], correctAnswer: 1 },
        ]
      },
      { 
        _id: '4', 
        title: 'Cyrus the Great: Power as Stewardship', 
        content: `In the 6th century BCE, Cyrus the Great took the metaphysical vision of Zarathustra and attempted to build a state upon it.\n\nWhen Cyrus entered Babylon in 539 BCE, he did not burn temples—he restored them. His famous Cylinder is called the first declaration of human rights, but philosophically, it was an act of *Asha*.\n\nA just king brings order by allowing each people to flourish in their own way.`, 
        verseIds: [],
        quiz: [
          { id: 'q1', question: 'What is the Cyrus Cylinder famous for?', options: ['Being gold', 'First declaration of human rights', 'Military victories', 'Religious conquest'], correctAnswer: 1 },
        ]
      },
      { 
        _id: '5', 
        title: 'Darius and the Moral Empire', 
        content: `Carved into the cliffs of Mount Behistun, Darius I left an inscription that sums up the Achaemenid political philosophy:\n\n*"May Ahura Mazda protect this country from enemy armies, from famine, and from the Lie."*\n\nThe Achaemenid Empire required a philosophy big enough to hold Babylonians, Egyptians, Greeks, and Jews under one roof—and ethics was that foundation.`, 
        verseIds: [],
        quiz: [
          { id: 'q1', question: 'Where is the Behistun inscription located?', options: ['Persepolis', 'Mount Behistun', 'Babylon', 'Susa'], correctAnswer: 1 },
        ]
      },
    ],
    difficulty: 'beginner',
    estimatedTime: 60,
  },
  {
    _id: 'islamic-golden-age',
    subtitle: 'Part II: Revelation and Reason',
    title: 'The Islamic Golden Age',
    description: 'Discover how Persian scholars translated, preserved, and advanced Greek philosophy while creating new schools of thought.',
    philosopher: 'Al-Farabi',
    era: 'classical',
    lessons: [
      { 
        _id: '1', 
        title: 'The Translation Movement', 
        content: `When the flame of knowledge flickered in Baghdad, Persian scholars became the torchbearers of civilization. The Translation Movement (750-900 CE) preserved Greek philosophy while creating new synthesis.\n\nPersian intellectuals didn't just translate—they *created*.`, 
        verseIds: [],
        quiz: [
          { id: 'q1', question: 'Where did the Translation Movement take place?', options: ['Cairo', 'Baghdad', 'Damascus', 'Tehran'], correctAnswer: 1 },
        ]
      },
      { 
        _id: '2', 
        title: 'Al-Farabi: The Second Teacher', 
        content: `Abu Nasr al-Farabi (872-950 CE) was called the "Second Teacher" (after Aristotle). His works on logic, music, and political philosophy shaped the Islamic world.\n\n**The Virtuous City**: Farabi envisioned an ideal society led by philosophers-prophets who unite reason and revelation.`, 
        verseIds: [],
        quiz: [
          { id: 'q1', question: 'What was Al-Farabi known as?', options: ['The First Teacher', 'The Second Teacher', 'The Last Teacher', 'The Greatest Teacher'], correctAnswer: 1 },
        ]
      },
      { 
        _id: '3', 
        title: 'Ibn Sina (Avicenna): The Healing of the Soul', 
        content: `Ibn Sina's (980-1037 CE) *Kitab al-Shifa* (The Book of Healing) covered logic, physics, mathematics, and metaphysics.\n\n**The Floating Man**: His thought experiment about a man created in mid-air, with no sensory input, proves the soul exists independent of the body.`, 
        verseIds: [],
        quiz: [
          { id: 'q1', question: 'What is Ibn Sina known for in the Book of Healing?', options: ['Medicine', 'All branches of knowledge', 'Poetry', 'History'], correctAnswer: 1 },
          { id: 'q2', question: 'What is "The Floating Man" argument about?', options: ['The soul existing independently', 'Flying', 'God existence', 'Free will'], correctAnswer: 0 },
        ]
      },
      { 
        _id: '4', 
        title: 'Al-Ghazali: The Reviver', 
        content: `Al-Ghazali (1058-1111 CE) nearly destroyed philosophy with *The Incoherence of the Philosophers*—then revived it by synthesizing Sufi mysticism with Islamic law.\n\nHis *Ihya Ulum al-Din* (Revival of Religious Sciences) remains one of the most influential works in Islamic history.`, 
        verseIds: [],
        quiz: [
          { id: 'q1', question: 'What book did Al-Ghazali write to critique philosophers?', options: ['The Quran', 'The Incoherence of the Philosophers', 'The Revival', 'The Sciences'], correctAnswer: 1 },
        ]
      },
    ],
    difficulty: 'intermediate',
    estimatedTime: 90,
  },
  {
    _id: 'illuminationist',
    subtitle: 'Part III: Illumination and Ecstasy',
    title: 'The Illuminationist School',
    description: 'Enter the mystical dimension of Persian philosophy with Suhrawardi\'s wisdom of illumination.',
    philosopher: 'Suhrawardi',
    era: 'medieval',
    lessons: [
      { 
        _id: '1', 
        title: 'Suhrawardi and the Light Theory', 
        content: `Shihab al-Din Suhrawardi (1154-1191 CE) founded the *Hikmat al-Ishraq* (Philosophy of Illumination).\n\nUnlike Aristotle's causal chains, Suhrawardi proposed that reality is a hierarchy of lights—from the Supreme Light (God) down to material darkness.`, 
        verseIds: [],
        quiz: [
          { id: 'q1', question: 'What is Suhrawardi\'s philosophy called?', options: ['Peripatetic', 'Illumination (Ishraq)', 'Mysticism', 'Rationalism'], correctAnswer: 1 },
        ]
      },
      { 
        _id: '2', 
        title: 'The Realm of Light', 
        content: `The cosmos consists of:\n\n- **The Supreme Light** (Nur al-Anwar) - God\n- **Celestial Lights** - Angels/Intellects\n- **Terrestrial Lights** - Souls\n- **Darkness** - Absence of light\n\nKnowledge comes not from logic alone, but from *direct illumination*.`, 
        verseIds: [],
        quiz: [
          { id: 'q1', question: 'According to Suhrawardi, what is the source of knowledge?', options: ['Logic alone', 'Direct illumination', 'Reading books', 'Authority'], correctAnswer: 1 },
        ]
      },
      { 
        _id: '3', 
        title: 'Active Intelligence', 
        content: `Suhrawardi revived the ancient Egyptian and Persian concept of *imaginal worlds*—realms that exist between the material and the spiritual.\n\nThe soul can travel to these realms through spiritual practices.`, 
        verseIds: [],
        quiz: [
          { id: 'q1', question: 'What are "imaginal worlds"?', options: ['Dreams', 'Realms between material and spiritual', 'Physical places', 'Books'], correctAnswer: 1 },
        ]
      },
    ],
    difficulty: 'advanced',
    estimatedTime: 60,
  },
  {
    _id: 'rumi-mysticism',
    subtitle: 'Part III: Illumination and Ecstasy',
    title: 'Rumi: The Poet of Divine Love',
    description: 'Journey through Rumi\'s mystical poetry and the spiritual path of the whirling dervishes.',
    philosopher: 'Rumi',
    era: 'golden-age',
    lessons: [
      { 
        _id: '1', 
        title: 'Life of Rumi', 
        content: `Jalal al-Din Muhammad Rumi (1207-1273) was born in Balkh (modern Afghanistan), fled the Mongol invasion, and settled in Konya, Turkey.\n\nAt age 37, he met Shams-e Tabrizi—and everything changed. From a jurist to a mystic, Rumi's transformation defines the Sufi path.`, 
        verseIds: [],
        quiz: [
          { id: 'q1', question: 'Where was Rumi born?', options: ['Konya', 'Balkh', 'Shiraz', 'Tehran'], correctAnswer: 1 },
          { id: 'q2', question: 'Who transformed Rumi into a mystic?', options: ['Shams-e Tabrizi', 'Sadi', 'Hafez', 'Attar'], correctAnswer: 0 },
        ]
      },
      { 
        _id: '2', 
        title: 'The Masnavi: The Soul\'s Journey', 
        content: `The *Masnavi* is 25,000 verses of spiritual poetry—the "Koran in Persian."\n\nIts themes: love, loss, transformation, and union with the Divine.\n\n*"The wound is the place where the Light enters you."*`, 
        verseIds: [],
        quiz: [
          { id: 'q1', question: 'How many verses is the Masnavi?', options: ['10,000', '25,000', '50,000', '5,000'], correctAnswer: 1 },
        ]
      },
      { 
        _id: '3', 
        title: 'The Spiritual Path', 
        content: `The Sufi path has stations:\n\n- **Tariqah** (Path) - Following a guide\n- **Hal** (State) - Spiritual states given by God\n- **Maqam** (Station) - Achieved through effort\n\nThe goal: annihilation (*fana*) in God and subsistence (*baqa*) through God.`, 
        verseIds: [],
        quiz: [
          { id: 'q1', question: 'What is the goal of the Sufi path?', options: ['Wealth', 'Annihilation in God', 'Political power', 'Fame'], correctAnswer: 1 },
        ]
      },
      { 
        _id: '4', 
        title: 'Love as the Fundamental Force', 
        content: `Rumi's radical teaching: *All loves is a sign of the Soul's longing for the Divine.*\n\n*"Your task is not to seek for love, but merely to seek and find all the barriers within yourself that you have built against it."*`, 
        verseIds: [],
        quiz: [
          { id: 'q1', question: 'According to Rumi, what is love?', options: ['Emotion', 'A barrier', 'The fundamental force of reality', 'A weakness'], correctAnswer: 2 },
        ]
      },
    ],
    difficulty: 'beginner',
    estimatedTime: 75,
  },
  {
    _id: 'ibn-arabi',
    subtitle: 'Part III: Illumination and Ecstasy',
    title: 'Ibn Arabi: The Great Master',
    description: 'Explore the philosophy of the Unity of Being (Wahdat al-Wujud) with the greatest Sufi metaphysician.',
    philosopher: 'Ibn Arabi',
    era: 'medieval',
    lessons: [
      { 
        _id: '1', 
        title: 'The Concept of Unity', 
        content: `Ibn Arabi (1165-1240) developed *Wahdat al-Wujud* (Unity of Being)—the most sophisticated mystical philosophy in Islam.\n\nAll existence is one; the infinite forms we see are manifestations of the Divine.`, 
        verseIds: [],
        quiz: [
          { id: 'q1', question: 'What is Wahdat al-Wujud?', options: ['Islamic law', 'Unity of Being', 'Religious rituals', 'Political theory'], correctAnswer: 1 },
        ]
      },
      { 
        _id: '2', 
        title: 'The Perfect Human', 
        content: `The *Insan al-Kamil* (Perfect Human) is the microcosm who reflects all of God's names and attributes.\n\nThrough the Perfect Human, God knows and loves creation.`, 
        verseIds: [],
        quiz: [
          { id: 'q1', question: 'What is the Perfect Human (Insan al-Kamil)?', options: ['A prophet', 'The microcosm reflecting God\'s names', 'A king', 'An angel'], correctAnswer: 1 },
        ]
      },
      { 
        _id: '3', 
        title: 'The Divine Names', 
        content: `God's names are the qualities through which He relates to creation:\n\n- Mercy, Justice, Beauty, Power\n\nThe universe exists so God may know Himself through these names.`, 
        verseIds: [],
        quiz: [
          { id: 'q1', question: 'Why does the universe exist according to Ibn Arabi?', options: ['By accident', 'For God to know Himself', 'For human happiness', 'No reason'], correctAnswer: 1 },
        ]
      },
    ],
    difficulty: 'advanced',
    estimatedTime: 60,
  },
  {
    _id: 'mulla-sadra',
    subtitle: 'Part IV: The Great Synthesis',
    title: 'Mulla Sadra: Transcendent Theosophy',
    description: 'The final synthesis of Iranian philosophy that transformed Islamic metaphysics.',
    philosopher: 'Mulla Sadra',
    era: 'safavid',
    lessons: [
      { 
        _id: '1', 
        title: 'The Transcendent Philosophy', 
        content: `Sadr al-Din Shirazi (1571-1640) synthesized:\n\n- Peripatetic philosophy (Aristotle)\n- Illuminationism (Suhrawardi)\n- Sufi mysticism\n\n*Al-Hikmat al-Muta'aliyah* (Transcendent Philosophy) was the result.`, 
        verseIds: [],
        quiz: [
          { id: 'q1', question: 'What did Mulla Sadra synthesize?', options: ['Only Greek philosophy', 'Peripatetic, Illuminationist, and Sufi', 'Only Islamic law', 'Only Western philosophy'], correctAnswer: 1 },
        ]
      },
      { 
        _id: '2', 
        title: 'The Journey of the Soul', 
        content: `The soul progresses through *barzakh* (the barrier) after death—gradually moving toward the Divine until complete unity is achieved.\n\nThis is not extinction but *transformation*.`, 
        verseIds: [],
        quiz: [
          { id: 'q1', question: 'What is Barzakh?', options: ['A type of food', 'The barrier between soul and God', 'A city', 'A book'], correctAnswer: 1 },
        ]
      },
      { 
        _id: '3', 
        title: 'Actualization and Existence', 
        content: `Sadra's key insight: **Existence precedes essence**.\n\nThings exist first, then have properties—not the reverse. This "primacy of existence" differs from Western philosophy's "primacy of essence."`, 
        verseIds: [],
        quiz: [
          { id: 'q1', question: 'What is Sadra\'s key insight?', options: ['Essence precedes existence', 'Existence precedes essence', 'They are equal', 'Neither exists'], correctAnswer: 1 },
        ]
      },
    ],
    difficulty: 'advanced',
    estimatedTime: 75,
  },
  {
    _id: 'saadi-wisdom',
    subtitle: 'Part V: Poetry and Ethics',
    title: 'Saadi: The Master of Moral Wisdom',
    description: 'Learn from Saadi\'s practical philosophy of ethics, friendship, and human dignity.',
    philosopher: 'Saadi',
    era: 'golden-age',
    lessons: [
      { 
        _id: '1', 
        title: 'The Gulistan: Garden of Roses', 
        content: `Saadi Shirazi (1210-1291) wrote the *Gulistan* (Rose Garden) and *Bustan* (Orchard)—masterpieces of practical wisdom.\n\n*"Speak a word that benefits, for you shall give an account of words."*`, 
        verseIds: [],
        quiz: [
          { id: 'q1', question: 'What did Saadi write?', options: ['The Gulistan and Bustan', 'Only poetry', 'Only religious texts', 'Philosophy treatises'], correctAnswer: 0 },
        ]
      },
      { 
        _id: '2', 
        title: 'Practical Ethics', 
        content: `Saadi's virtues:\n\n- **Patience** (Sabr)\n- **Gratitude** (Shukr)\n- **Kindness** (Neku)\n- **Sincerity** (Khulus)\n\nThese are not abstract but applied to daily life.`, 
        verseIds: [],
        quiz: [
          { id: 'q1', question: 'Which is NOT one of Saadi\'s virtues?', options: ['Patience', 'Gratitude', 'Wealth', 'Kindness'], correctAnswer: 2 },
        ]
      },
      { 
        _id: '3', 
        title: 'Human Dignity', 
        content: `Saadi's most famous lines:\n\n*"Beni Adam, az a'za-ye yek pirmanand"* — *Human beings are members of a whole, in creation of one essence and soul.*\n\nThis vision of human brotherhood preceded the Enlightenment by 600 years.`, 
        verseIds: [],
        quiz: [
          { id: 'q1', question: 'What is Saadi\'s famous message about humanity?', options: ['Humans are divided', 'Humans are members of one whole', 'Humans should conquer nature', 'Humans are alone'], correctAnswer: 1 },
        ]
      },
    ],
    difficulty: 'beginner',
    estimatedTime: 45,
  },
  {
    _id: 'hafez-mysticism',
    subtitle: 'Part V: Poetry and Ethics',
    title: 'Hafez: The Tongue of the Unseen',
    description: 'Unlock the mystical meanings in Hafez\'s ghazals and the secrets of the Divan.',
    philosopher: 'Hafez',
    era: 'golden-age',
    lessons: [
      { 
        _id: '1', 
        title: 'The Divan of Hafez', 
        content: `Shams al-Din Hafez (1315-1390) composed the *Divan*—500+ ghazals of extraordinary beauty and hidden meaning.\n\nHis poetry works on two levels: literal (love lyrics) and mystical (divine truth).`, 
        verseIds: [],
        quiz: [
          { id: 'q1', question: 'How many ghazals are in Hafez\'s Divan?', options: ['100', '500+', '50', '1000'], correctAnswer: 1 },
        ]
      },
      { 
        _id: '2', 
        title: 'The Wine of Divine Love', 
        content: `The "wine" in Hafez is not alcohol—it's the wine of divine love that intoxicates the soul.\n\nThe "tavern" is the place of spiritual surrender.\n\nThe "cupbearer" is the spiritual guide who pours the wine of wisdom.`, 
        verseIds: [],
        quiz: [
          { id: 'q1', question: 'What does "wine" represent in Hafez\'s poetry?', options: ['Alcohol', 'Divine love', 'Money', 'Power'], correctAnswer: 1 },
        ]
      },
      { 
        _id: '3', 
        title: 'Fate and Free Will', 
        content: `Hafez is famous for *Falsafi* (random verse-opening)—using the Divan for divination.\n\nBut his deeper teaching: we shape our destiny through spiritual choice, even as cosmic order (Asha) governs the universe.`, 
        verseIds: [],
        quiz: [
          { id: 'q1', question: 'What is Falsafi?', options: ['A dance', 'Using Hafez for divination', 'A type of poetry', 'A religious ritual'], correctAnswer: 1 },
        ]
      },
      { 
        _id: '4', 
        title: 'The Art of Interpretation', 
        content: `Reading Hafez requires understanding:\n\n- **zahir** (outer meaning) - literal\n- **batin** (inner meaning) - mystical\n\nThe master knows both.`, 
        verseIds: [],
        quiz: [
          { id: 'q1', question: 'What is Batin?', options: ['The outer meaning', 'The inner meaning', 'The beginning', 'The end'], correctAnswer: 1 },
        ]
      },
    ],
    difficulty: 'intermediate',
    estimatedTime: 60,
  },
  {
    _id: 'ferdowsi-epic',
    subtitle: 'Part V: Poetry and Ethics',
    title: 'Ferdowsi: The Epic of Iran',
    description: 'Journey through the Shahnameh, the epic that preserved Persian identity and wisdom.',
    philosopher: 'Ferdowsi',
    era: 'golden-age',
    lessons: [
      { 
        _id: '1', 
        title: 'The Shahnameh', 
        content: `Abu al-Qasim Ferdowsi (940-1020) spent 30 years writing the *Shahnameh* (King's Book)—50,000 couplets covering 2,500 years of Persian history.\n\nIt preserved the Persian language after the Arab conquest.`, 
        verseIds: [],
        quiz: [
          { id: 'q1', question: 'How long did Ferdowsi take to write the Shahnameh?', options: ['10 years', '20 years', '30 years', '40 years'], correctAnswer: 2 },
        ]
      },
      { 
        _id: '2', 
        title: 'Kings and Heroes', 
        content: `The Shahnameh's kings symbolize different aspects of just rule:\n\n- **Jamshid** - Wisdom\n- **Zal** - Courage\n- **Rostam** - Heroic virtue\n\nThe hero's journey is the path to wisdom.`, 
        verseIds: [],
        quiz: [
          { id: 'q1', question: 'Who symbolizes wisdom in the Shahnameh?', options: ['Rostam', 'Zal', 'Jamshid', 'Darius'], correctAnswer: 2 },
        ]
      },
      { 
        _id: '3', 
        title: 'Tragedy and Fate', 
        content: `Tragic heroes like Siavash and Sohrab teach that fate and personal virtue interact in mysterious ways.\n\nThe Persians understood that cosmic order (*Asha*) and human choice together shape destiny.`, 
        verseIds: [],
        quiz: [
          { id: 'q1', question: 'What do the tragic heroes of Shahnameh teach?', options: ['Fate is fixed', 'Fate and virtue interact', 'There is no fate', 'Only choice matters'], correctAnswer: 1 },
        ]
      },
    ],
    difficulty: 'beginner',
    estimatedTime: 50,
  },
  {
    _id: 'modern-philosophy',
    subtitle: 'Part VI: Modern Voices',
    title: 'Modern Persian Philosophy',
    description: 'Explore how Iranian philosophers engaged with modernity while preserving their heritage.',
    philosopher: 'Ali Shariati',
    era: 'modern',
    lessons: [
      { 
        _id: '1', 
        title: 'Ali Shariati: Islam and Modernity', 
        content: `Ali Shariati (1933-1977) reinterpreted Islam for the modern age:\n\n- Islam as *consciousness*\n- *Adalat* (Justice) as central\n- The return to authentic Islam, not Westernization`, 
        verseIds: [],
        quiz: [
          { id: 'q1', question: 'What did Shariati emphasize in Islam?', options: ['Justice', 'Wealth', 'Power', 'Tradition only'], correctAnswer: 0 },
        ]
      },
      { 
        _id: '2', 
        title: 'Ahmad Fardid: Westoxication', 
        content: `Ahmad Fardid (1912-1994) coined *Gharbzadegi* (Westoxication)—the harmful effects of Western materialism on Iranian culture.\n\nHe urged Iranians to preserve their philosophical heritage while engaging modernity.`, 
        verseIds: [],
        quiz: [
          { id: 'q1', question: 'What is Gharbzadegi?', options: ['Westernization', 'Westoxication', 'Modernization', 'Secularization'], correctAnswer: 1 },
        ]
      },
      { 
        _id: '3', 
        title: 'Abdolkarim Soroush', 
        content: `Soroush (1945-) developed *Contraction and Expansion of Religious Knowledge*—the theory that religious understanding evolves while revelation remains constant.\n\nThis opened doors for reformist Islam.`, 
        verseIds: [],
        quiz: [
          { id: 'q1', question: 'What is Soroush\'s theory?', options: ['Religious knowledge is fixed', 'Religious understanding evolves', 'Religion should be abandoned', 'Only law matters'], correctAnswer: 1 },
        ]
      },
    ],
    difficulty: 'advanced',
    estimatedTime: 90,
  },
];

export default function LearningPathPage() {
  const params = useParams();
  const pathId = params.id as string;
  
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [currentLesson, setCurrentLesson] = useState(0);
  
  const path = learningPaths.find(p => p._id === pathId);
  
  const getStoredScore = (lessonId: string) => {
    if (typeof window === 'undefined') return 0;
    const stored = localStorage.getItem(`quiz-${pathId}-${lessonId}`);
    return stored ? JSON.parse(stored) : null;
  };

  const saveScore = (lessonId: string, correct: number, total: number) => {
    localStorage.setItem(`quiz-${pathId}-${lessonId}`, JSON.stringify({ correct, total }));
  };

  const isLessonPassed = (lessonId: string) => {
    const stored = getStoredScore(lessonId);
    return stored && stored.correct >= stored.total * 0.7;
  };

  const calculateTotalProgress = () => {
    if (!path) return 0;
    let passed = 0;
    path.lessons.forEach(l => {
      if (isLessonPassed(l._id)) passed++;
    });
    return (passed / path.lessons.length) * 100;
  };

  const handleStartQuiz = () => {
    setShowQuiz(true);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizCompleted(false);
  };

  const handleAnswer = () => {
    const lesson = path?.lessons[currentLesson];
    if (!lesson?.quiz) return;
    
    const isCorrect = selectedAnswer === lesson.quiz[currentQuestion].correctAnswer;
    if (isCorrect) setScore(score + 1);
    
    setShowResult(true);
  };

  const handleNextQuestion = () => {
    const lesson = path?.lessons[currentLesson];
    if (!lesson?.quiz) return;
    
    if (currentQuestion < lesson.quiz.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      const finalScore = score + (selectedAnswer === lesson.quiz[currentQuestion].correctAnswer ? 1 : 0);
      saveScore(lesson._id, finalScore, lesson.quiz.length);
      setQuizCompleted(true);
    }
  };

  const handleFinishQuiz = () => {
    setShowQuiz(false);
    setQuizCompleted(false);
    if (currentLesson < (path?.lessons.length || 0) - 1) {
      setCurrentLesson(currentLesson + 1);
    }
  };

  if (!path) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ mb: 2 }}>Learning Path Not Found</Typography>
        <Button component={Link} href="/learn" startIcon={<ArrowBackIcon />}>
          Back to Learning Paths
        </Button>
      </Container>
    );
  }

  const lesson = path.lessons[currentLesson];
  const hasQuiz = lesson.quiz && lesson.quiz.length > 0;
  const passedLesson = isLessonPassed(lesson._id);
  const progress = calculateTotalProgress();

  if (showQuiz && hasQuiz) {
    const quiz = lesson.quiz!;
    const isCorrect = selectedAnswer === quiz[currentQuestion].correctAnswer;
    const percentage = Math.round((score / quiz.length) * 100);
    const passed = percentage >= 70;

    if (quizCompleted) {
      const finalPercentage = Math.round((score / quiz.length) * 100);
      const passedQuiz = finalPercentage >= 70;

      return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 8 }}>
          <Container maxWidth="md">
            <Card sx={{ textAlign: 'center', p: 4 }}>
              <EmojiEventsIcon sx={{ fontSize: 80, color: passedQuiz ? 'primary.main' : 'warning.main', mb: 2 }} />
              <Typography variant="h4" sx={{ mb: 2 }}>
                {passedQuiz ? 'Congratulations!' : 'Keep Learning!'}
              </Typography>
              <Typography variant="h2" sx={{ mb: 2, color: passedQuiz ? 'success.main' : 'warning.main' }}>
                {finalPercentage}%
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                You got {score} out of {quiz.length} questions correct.
              </Typography>
              <Alert severity={passedQuiz ? 'success' : 'info'} sx={{ mb: 3, maxWidth: 400, mx: 'auto' }}>
                {passedQuiz 
                  ? 'You passed! This lesson is now marked as complete.'
                  : 'You need 70% to pass. Review the lesson and try again!'}
              </Alert>
              <Button variant="contained" onClick={handleFinishQuiz}>
                {currentLesson < path.lessons.length - 1 ? 'Continue to Next Lesson' : 'Finish Learning Path'}
              </Button>
            </Card>
          </Container>
        </Box>
      );
    }

    return (
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 8 }}>
        <Container maxWidth="md">
          <Box sx={{ mb: 3 }}>
            <Typography variant="overline" color="primary">
              Quiz: {lesson.title}
            </Typography>
            <LinearProgress 
              variant="determinate" 
              value={((currentQuestion + 1) / quiz.length) * 100} 
              sx={{ mt: 1, height: 8, borderRadius: 4 }} 
            />
            <Typography variant="caption" color="text.secondary">
              Question {currentQuestion + 1} of {quiz.length}
            </Typography>
          </Box>

          <Card sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3 }}>
              {quiz[currentQuestion].question}
            </Typography>

            <FormControl component="fieldset" fullWidth>
              <RadioGroup
                value={selectedAnswer}
                onChange={(e) => setSelectedAnswer(Number(e.target.value))}
              >
                {quiz[currentQuestion].options.map((option, idx) => (
                  <FormControlLabel
                    key={idx}
                    value={idx}
                    control={<Radio />}
                    label={option}
                    disabled={showResult}
                    sx={{
                      mb: 1,
                      p: 1,
                      borderRadius: 1,
                      bgcolor: showResult 
                        ? idx === quiz[currentQuestion].correctAnswer 
                          ? 'success.light' 
                          : selectedAnswer === idx 
                            ? 'error.light' 
                            : 'transparent'
                        : selectedAnswer === idx ? 'primary.light' : 'transparent',
                    }}
                  />
                ))}
              </RadioGroup>
            </FormControl>

            {showResult && (
              <Alert 
                severity={isCorrect ? 'success' : 'error'} 
                sx={{ mt: 2 }}
              >
                {isCorrect ? 'Correct!' : `Incorrect. The answer is: ${quiz[currentQuestion].options[quiz[currentQuestion].correctAnswer]}`}
              </Alert>
            )}

            <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              {!showResult ? (
                <Button 
                  variant="contained" 
                  onClick={handleAnswer}
                  disabled={selectedAnswer === null}
                >
                  Submit Answer
                </Button>
              ) : (
                <Button variant="contained" onClick={handleNextQuestion}>
                  {currentQuestion < quiz.length - 1 ? 'Next Question' : 'See Results'}
                </Button>
              )}
            </Box>
          </Card>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 4 }}>
        <Container maxWidth="lg">
          <Breadcrumbs sx={{ color: 'rgba(255,255,255,0.7)', mb: 2 }}>
            <Link href="/learn" style={{ color: 'rgba(255,255,255,0.7)' }}>Learning</Link>
            <Typography color="white">{path.title}</Typography>
          </Breadcrumbs>
          {path.subtitle && (
            <Typography variant="overline" sx={{ color: 'rgba(201, 169, 98, 0.9)' }}>
              {path.subtitle}
            </Typography>
          )}
          <Typography variant="h3" sx={{ fontWeight: 300, mb: 1 }}>
            {path.title}
          </Typography>
          <Stack direction="row" spacing={2}>
            <Chip icon={<TimerIcon />} label={`${path.estimatedTime} min`} size="small" sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }} />
            <Chip label={path.difficulty} size="small" color="warning" />
          </Stack>
        </Container>
      </Box>

      <Box sx={{ bgcolor: 'rgba(46, 74, 61, 0.05)', py: 2 }}>
        <Container maxWidth="lg">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Box sx={{ flex: 1 }}>
              <LinearProgress variant="determinate" value={progress} sx={{ height: 8, borderRadius: 4 }} />
            </Box>
            <Typography variant="body2" color="text.secondary">
              {Math.round(progress)}% Complete
            </Typography>
          </Stack>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Lessons</Typography>
            <Stack spacing={1}>
              {path.lessons.map((l, idx) => (
                <Card 
                  key={l._id}
                  sx={{ 
                    cursor: 'pointer',
                    bgcolor: currentLesson === idx ? 'primary.main' : 'background.paper',
                    color: currentLesson === idx ? 'white' : 'text.primary',
                  }}
                  onClick={() => setCurrentLesson(idx)}
                >
                  <CardContent sx={{ py: 1.5, '&:last-child': { pb: 1.5 } }}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      {isLessonPassed(l._id) ? (
                        <CheckCircleIcon fontSize="small" color="success" />
                      ) : (
                        <Chip label={idx + 1} size="small" sx={{ width: 24, height: 24, fontSize: '0.7rem' }} />
                      )}
                      <Typography variant="body2">{l.title}</Typography>
                    </Stack>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 8 }}>
            <Typography variant="overline" color="primary">
              Lesson {currentLesson + 1} of {path.lessons.length}
            </Typography>
            <Typography variant="h4" sx={{ mb: 3 }}>
              {lesson.title}
            </Typography>
            
            <Typography 
              variant="body1" 
              sx={{ 
                lineHeight: 1.9, 
                whiteSpace: 'pre-wrap',
                mb: 4,
                p: 3,
                bgcolor: 'rgba(46, 74, 61, 0.05)',
                borderRadius: 2,
              }}
            >
              {lesson.content}
            </Typography>

            <Stack direction="row" spacing={2}>
              {hasQuiz ? (
                <>
                  {passedLesson ? (
                    <Button variant="outlined" startIcon={<CheckCircleIcon />} disabled>
                      Lesson Passed
                    </Button>
                  ) : (
                    <Button 
                      variant="contained" 
                      startIcon={<QuizIcon />}
                      onClick={handleStartQuiz}
                    >
                      Take Quiz
                    </Button>
                  )}
                </>
              ) : (
                <Button 
                  variant="contained"
                  onClick={() => {
                    if (currentLesson < path.lessons.length - 1) {
                      setCurrentLesson(currentLesson + 1);
                    }
                  }}
                >
                  {currentLesson < path.lessons.length - 1 ? 'Next Lesson' : 'Complete'}
                </Button>
              )}
              
              {currentLesson > 0 && (
                <Button variant="outlined" onClick={() => setCurrentLesson(currentLesson - 1)}>
                  Previous
                </Button>
              )}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
