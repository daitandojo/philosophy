export interface BookSection {
  id: string;
  title: string;
  subtitle?: string;
  content: string;
  quotes: {
    text: string;
    transliteration: string;
    translation: string;
  }[];
  imagePrompt: string;
}

export const bookContent: BookSection[] = [
  {
    id: 'part1',
    title: 'Part I',
    subtitle: 'The Dawn of Wisdom: Ancient Iranian Thought',
    content: `The story of Persian philosophy begins not with a book, but with a geography.

Imagine the high Iranian plateau in the second millennium BCE: a vast, arid stretch of earth suspended between the Zagros mountains and the Central Asian steppes. The light here is unforgivingly clear. The nights are abyssal. In this landscape, the distinction between light and darkness is not a metaphor—it is a survival instinct.

It was here that a distinct way of seeing the world was born. It was a vision that moved away from the capricious nature-gods of the Bronze Age and toward a universe that was intelligible, ethical, and demanding. Before the Greeks codified logic, the Iranians codified *conscience*.`,
    quotes: [
      {
        text: 'اَهُورَ مَزداَ',
        transliteration: 'Ahura Mazda',
        translation: 'The Wise Lord - Supreme deity of Zoroastrianism'
      },
      {
        text: 'رَشَدَ - پَروَزَش',
        transliteration: 'Rashad - Pirozesh',
        translation: 'Righteousness - Victory'
      }
    ],
    imagePrompt: 'Ancient Persian fire temple at dawn, Zoroastrian priests tending sacred flame, bronze age Iranian plateau, mystical golden light, traditional Persian art, lapis lazuli and gold colors, serene spiritual atmosphere'
  },
  {
    id: 'part1-zarathustra',
    title: 'The Sacred Fire',
    subtitle: 'Cosmology in the Teachings of Zarathustra',
    content: `Sometime between 1500 and 1000 BCE—the dates are lost to the dust of history—a priest named Zarathustra (Zoroaster) began to compose hymns that would alter the trajectory of human thought forever.

He was a radical. At a time when religion meant ritual slaughter and bargaining with warlike deities, Zarathustra looked into the fire of the hearth and saw something else: a universe defined by a choice.

**The Gathas: Poetry as Metaphysics**

Zarathustra's hymns, the *Gathas*, are difficult, archaic, and deeply personal. They do not read like commandments; they read like the questions of a man interrogating the cosmos. *"This I ask Thee, tell me truly, Lord…"*

In these verses, we find the birth of a revolutionary idea: the universe is not a playground for chaotic spirits. It is a structured moral order governed by a supreme wisdom, *Ahura Mazda* (The Wise Lord). This was the dawn of ethical monotheism, but with a uniquely Persian twist: God is not just powerful; God is *Good*.`,
    quotes: [
      {
        text: 'اِین را از تو می‌پرسم، راستی بگو، ای سرور...',
        transliteration: 'In ra az to miporsam, rasti begoy, ey sarvar...',
        translation: '"This I ask Thee, tell me truly, Lord..." - From the Gathas'
      },
      {
        text: 'اَشَ - دروغ',
        transliteration: 'Asha - Drug',
        translation: 'Truth/Order vs. The Lie/Chaos'
      }
    ],
    imagePrompt: 'Zoroastrian priest chanting Gathas, ancient manuscript illumination, mystical fire light, traditional Persian religious art, golden and deep blue palette, contemplative atmosphere'
  },
  {
    id: 'part1-achaemenid',
    title: 'Empire and Ethics',
    subtitle: 'Philosophy in the Achaemenid Age',
    content: `Ideas remain abstract until they build walls and write laws. In the 6th century BCE, the Achaemenid dynasty—led by Cyrus the Great—took the metaphysical vision of Zarathustra and attempted to build a state upon it.

This was the first "World Empire." It required a philosophy big enough to hold Babylonians, Egyptians, Greeks, and Jews under one roof.

**Cyrus the Great: Power as Stewardship**

History is littered with conquerors who ruled by terror. Cyrus introduced a startling innovation: ruling by *righteousness*.

When Cyrus entered Babylon in 539 BCE, he did not burn the temples of the local gods; he restored them. His famous "Cylinder" is often called the first declaration of human rights, but philosophically, it was an act of *Asha*. Cyrus believed that to impose his own culture violently would be an act of *Druj* (disorder). A just king brings order by allowing each people to flourish in their own way, under the umbrella of Imperial protection.

**The Moral Vision of Darius I**

If Cyrus was the visionary, Darius I was the architect. Carved into the cliffs of Mount Behistun, high above the road, Darius left an inscription that sums up the Achaemenid political philosophy.

He does not brag about his wealth. He prays:
*"May Ahura Mazda protect this country from enemy armies, from famine, and from the Lie."*`,
    quotes: [
      {
        text: 'خشایار شاه می‌گوید: این کشور را از لشکر دشمن، از خشکسالی و از دروغ保护 کند.',
        transliteration: 'Khashayar shah migoyad: in keshvar az lashkar-e dushman, az khoshk-sali va az dorough protected konad.',
        translation: '"May Ahura Mazda protect this country from enemy armies, from famine, and from the Lie." - Darius I'
      },
      {
        text: 'منم کوروش شاه، شاه شاهان',
        transliteration: 'Manam Kurosh shah, shah-e shahan',
        translation: 'I am Cyrus the Great, King of Kings'
      }
    ],
    imagePrompt: 'Cyrus the Great decree cylinder, ancient Persian royal inscription, Mount Behistun relief, Achaemenid empire aesthetics, gold and earth tones, majestic imperial art'
  },
  {
    id: 'part1-hellenistic',
    title: 'Hellenistic Crossroads',
    subtitle: 'The Collision of West and East',
    content: `In 330 BCE, Alexander the Great burned Persepolis. The Achaemenid political structure collapsed. But philosophy is harder to kill than kings.

For the next several centuries (under the Seleucids and Parthians), Persia became a crucible. The rationalism of Aristotle met the mysticism of the Magi.

**The Greek-Iranian Synthesis**

We often think of Greece and Persia as enemies. In reality, they became lovers. Greek philosophers who traveled East found themselves fascinated by the Persian obsession with time, the stars, and the cycles of history.

Conversely, Iranian thought began to adopt the language of Greek logic to explain their ancient rituals. We see the rise of figures like *Mithra*—originally a covenant-deity—evolving into a solar figure of mediation, bridging the gap between the unknowable God and the human realm. This idea of a "Mediator" (Logos) would ripple heavily into later Christian and Islamic thought.

**The Survival of the "Khvarenah" (Divine Glory)**

Despite the Greek occupation, the Persians held onto a concept that would define their philosophy for the next two thousand years: *Khvarenah*.

This is the "Light of Glory." It is a luminous charisma that descends upon legitimate kings and sages. It is not just a political right; it is a mystical substance. If a king lies or acts unjustly, the Glory flies away (often represented as a bird).`,
    quotes: [
      {
        text: 'خورنه',
        transliteration: 'Khvarenah',
        translation: 'Divine Glory - The luminous charisma of legitimate authority'
      },
      {
        text: 'میترا',
        transliteration: 'Mithra',
        translation: 'The covenant deity who evolved into a solar mediator'
      }
    ],
    imagePrompt: 'Mithra slaying the bull, ancient Persian symbolism, celestial mediation, blend of Greek and Persian artistic traditions, mystical night sky, golden light rays'
  },
  {
    id: 'part2',
    title: 'Part II',
    subtitle: 'Revelation and Reason: The Classical Islamic Synthesis',
    content: `When the Arab armies swept across the Sassanian Empire in the 7th century, many assumed the old Persian fire was extinguished. But civilizations do not die so easily; they hibernate, they transform, and they re-emerge in the language of the conqueror.

The coming of Islam did not silence the Persian mind; it gave it a new, universal vocabulary. For the next four centuries, the intellectual history of the Islamic world would be dominated by men who wrote in Arabic but thought in Persian. They faced a terrifying and beautiful problem: **How do you reconcile the absolute commands of God (Revelation) with the absolute logic of Aristotle (Reason)?**

The result was *Falsafa*—a philosophical tradition that was neither purely Greek nor purely religious, but a daring attempt to map the mind of God using human tools.`,
    quotes: [
      {
        text: 'فلسفه',
        transliteration: 'Falsafa',
        translation: 'Philosophy - The Islamic philosophical tradition'
      },
      {
        text: 'حکمت',
        transliteration: 'Hikmat',
        translation: 'Wisdom - Traditional Persian philosophical concept'
      }
    ],
    imagePrompt: 'Medieval Islamic library, scholars translating manuscripts, Baghdad House of Wisdom, Persian and Arabic manuscripts, golden age of Islamic scholarship, warm amber and blue tones'
  },
  {
    id: 'part2-translation',
    title: 'The Translation Movement',
    subtitle: 'The Great Project',
    content: `To understand this era, you must first understand the sheer scale of the appetite for knowledge in the Abbasid Caliphate (750–1258 CE). The Caliphs, governing a massive empire from Baghdad, realized that swords could win territory, but only wisdom could hold it.

Guided largely by powerful Persian families like the Barmakids, the Caliphs launched the **Translation Movement**. It was a state-sponsored intellectual vacuum cleaner. They sent emissaries to Byzantium and India with bags of gold, buying every manuscript they could find: medicine, astronomy, logic, geometry.

In the legendary *Bayt al-Hikma* (House of Wisdom), scholars—Christian, Muslim, and Jew, working side by side—translated the entire corpus of Greek thought into Arabic. Suddenly, Aristotle was speaking the language of the Quran.

For the Persian thinkers involved, this was a homecoming. They recognized in Greek logic a rigor that complemented their own ancient traditions of cosmic order. They did not see "foreign" science; they saw a lost heritage of human reason.`,
    quotes: [
      {
        text: 'بیت الحکمه',
        transliteration: 'Bayt al-Hikma',
        translation: 'The House of Wisdom - Legendary Abbasid library and translation center'
      },
      {
        text: 'برمکیان',
        transliteration: 'Barmakidan',
        translation: 'The Barmakids - Powerful Persian family who guided the Translation Movement'
      }
    ],
    imagePrompt: 'Ancient library with scholars translating manuscripts, Arabic and Persian texts, Byzantine manuscripts, golden age atmosphere, warm lighting, intellectual communion'
  },
  {
    id: 'part2-farabi',
    title: 'Al-Farabi',
    subtitle: 'The Second Teacher',
    content: `Out of this ferment emerged Abu Nasr al-Farabi (d. 950), a man of such quiet, systematic brilliance that history calls him "The Second Teacher" (Aristotle being the first).

Al-Farabi was a musician and a logician, and he saw the universe as a symphony. His great contribution was political. He looked at Plato's *Republic*—with its ideal Philosopher-King—and he looked at the Islamic concept of the Prophet.

He made a startling connection: **They are the same person.**

For Al-Farabi, the Prophet is not just a vessel for miracles. The Prophet is a philosopher who has reached the peak of human intellect, touched the Divine consciousness, and then—crucially—possesses the imagination to translate that abstract truth into laws and symbols for the common people.

Religion, in Al-Farabi's view, is the shadow of philosophy cast upon the wall of the city. It is the public face of the absolute Truth. This idea saved philosophy in the Islamic world; it gave reason a sacred function.`,
    quotes: [
      {
        text: 'ابو نصر محمد بن فاران',
        transliteration: 'Abu Nasr Muhammad ibn Farab',
        translation: 'Abu Nasr al-Farabi - The Second Teacher'
      },
      {
        text: 'شهریار فیلسوف',
        transliteration: 'Shahryar-e Faylasuf',
        translation: 'Philosopher-King'
      }
    ],
    imagePrompt: 'Al-Farabi playing musical instrument, medieval Persian scholar, philosophical discourse, serene expression, traditional scholarly attire, warm amber tones'
  },
  {
    id: 'part2-avicenna',
    title: 'Avicenna (Ibn Sina)',
    subtitle: 'The Titan',
    content: `If Al-Farabi laid the foundation, Avicenna built the cathedral.

Born near Bukhara in 980 CE, Ibn Sina was a prodigy who famously claimed to have mastered all human knowledge by the age of 18. He was a physician, a vizier, and a philosopher who wrote his works during military campaigns, often dictating from horseback or late at night after heavy drinking sessions. He was brilliant, arrogant, and utterly indispensable.

**The Necessary Being**

Avicenna solved a problem that had plagued thinkers for centuries. He drew a sharp line between **Essence** (what something is) and **Existence** (the fact *that* it is).

Think of a phoenix. You know its *essence*: a bird that rises from ash. But does it *exist*? No. Its essence does not guarantee its reality.
Now look at yourself. You exist, but you didn't have to. You are "contingent." You require a cause (parents, food, air) to keep you here.

Avicenna argued that if you trace this chain of needs back, you must eventually hit a bedrock. You must reach a Being whose very *Essence* is *to Exist*. A Being that cannot *not* be. This is the **Necessary Being** (God).

This wasn't just theology; it was a logical proof for God that relied on physics, not scripture.

**The Floating Man**

To prove the soul existed, Avicenna asked us to imagine a man suspended in a void—blindfolded, deaf, limbs splayed so he cannot touch his own body. No sensory input whatsoever.

Does this man know he exists? Avicenna says yes. The "I" is there, even without the body. This "Floating Man" argument anticipated Descartes by 600 years, asserting that the self is an immaterial reality, independent of the meat and bone that houses it.`,
    quotes: [
      {
        text: 'ابن سینا',
        transliteration: 'Ibn Sina',
        translation: 'Avicenna - The Prince of Physicians'
      },
      {
        text: 'واجب الوجود',
        transliteration: 'Wajib al-Wujud',
        translation: 'Necessary Being - God as the necessarily existent'
      },
      {
        text: 'انسان طافی',
        transliteration: 'Insan-e Tafi',
        translation: 'The Floating Man - Avicenna\'s thought experiment'
      }
    ],
    imagePrompt: 'Avicenna in medieval Persian attire, Bukhara setting, philosophical manuscript, physician scholar, scholarly atmosphere, deep blue and gold tones'
  },
  {
    id: 'part2-ghazali',
    title: 'Al-Ghazali',
    subtitle: 'The Crisis of Reason',
    content: `Philosophy grew so powerful that it provoked a backlash. But this was not the backlash of an angry mob; it was the backlash of a genius.

Abu Hamid al-Ghazali (d. 1111) was a celebrity scholar in Baghdad, a master of law and theology. But at the height of his fame, he suffered a nervous breakdown. He stood at the lectern to teach, and no words came out. He realized that for all his logic, he did not *know* God; he only knew definitions of God.

He left his post, wandered into the desert, and spent years as a mystic. When he returned, he wrote *The Incoherence of the Philosophers* (*Tahafut al-Falasifa*).

**The Critique**

Al-Ghazali did not attack philosophy with blind faith; he attacked it with better logic. He dismantled Avicenna's arguments, showing that pure reason often leads to contradictions when it tries to discuss the Infinite. He argued that the universe is not a clockwork machine running on automatic laws; it is a direct expression of God's will at every moment.

Western historians often blame Al-Ghazali for "killing" science and philosophy in the East. This is false. He didn't kill it; he humbled it. He forced philosophy to admit its limits.

After Al-Ghazali, the Persian tradition shifted. It could no longer rely solely on the dry logic of the Greeks. It had to find a way to include the heart. The stage was set for the mystics.`,
    quotes: [
      {
        text: 'ابو حامد محمد بن محمد غزالی',
        transliteration: 'Abu Hamid Muhammad ibn Muhammad Ghazali',
        translation: 'Al-Ghazali - The Proof of Islam'
      },
      {
        text: 'تأملات فیلسوفان',
        transliteration: 'Tahafut al-Falasifa',
        translation: 'The Incoherence of the Philosophers'
      }
    ],
    imagePrompt: 'Al-Ghazali in desert retreat, mystical scholar, contemplative mood, austere setting, spiritual struggle, earth tones with golden light'
  },
  {
    id: 'part3',
    title: 'Part III',
    subtitle: 'Illumination and Ecstasy: Mystical Philosophy',
    content: `If Part II was about the triumph of the mind, Part III is about the rebellion of the heart.

By the 12th and 13th centuries, the Islamic world was facing an existential crisis. The rationalism of the philosophers had become dry and repetitive. Then, the Mongols arrived—a wave of destruction that leveled cities, burned libraries, and turned rivers black with ink and red with blood.

In the face of such chaos, logic offered no comfort. A syllogism cannot explain why a civilization burns. The Persian thinkers of this era turned inward. They stopped asking *how* the universe works and started asking *why* it feels the way it does. They moved from **Argument** to **Vision**.

Philosophy, until this point, had been a spectator sport. You stood back and observed reality. The mystics changed the rules: they insisted that you cannot know the truth until you *become* the truth.

This was the age where metaphysics was set on fire.`,
    quotes: [
      {
        text: 'تصوف',
        transliteration: 'Tasavvof',
        translation: 'Sufism - Islamic mysticism'
      },
      {
        text: 'عارف',
        transliteration: 'Arif',
        translation: 'The Gnostic - One who knows God directly'
      }
    ],
    imagePrompt: 'Sufi mystic in meditation, Whirling Dervish, Persian mystical art, ethereal golden light, spiritual ecstasy, traditional Sufi atmosphere'
  },
  {
    id: 'part3-suhrawardi',
    title: 'Suhrawardi',
    subtitle: 'The Master of Illumination',
    content: `Shihab al-Din Suhrawardi was a young genius with a dangerous idea. He looked at the philosophy of Avicenna—with its endless categories of "substance" and "accident"—and found it gray and lifeless.

He wanted to bring back the "Wisdom of the Ancients" (*Hikmat al-Ishraq*). He explicitly reached back to pre-Islamic Iran, to the sages who worshipped in the fire temples, and declared that they possessed a truth the Greeks had missed.

**The Metaphysics of Light**

Suhrawardi stripped the universe down to one thing: **Light**.
For him, "existence" is just a measure of intensity. God is the "Light of Lights" (*Nur al-Anwar*). An angel is a very bright light. A human soul is a dim light. A rock is a light so faint it has become a shadow.

This wasn't a metaphor. Suhrawardi argued that our standard way of knowing things—by definition—is flawed. If I define "pain" to you, you don't feel it. But if I pinch you, you know pain immediately. This is **Knowledge by Presence** (*Ilm al-huduri*).

Suhrawardi taught that the philosopher must polish the mirror of their soul until they catch the direct reflection of the Divine Light. He was executed in Aleppo at the age of 36 for his radical views, but he left behind a system that fused logic with blinding mystical experience.`,
    quotes: [
      {
        text: 'شهاب الدین سهروردی',
        transliteration: 'Shihab al-Din Suhrawardi',
        translation: 'The Master of Illumination'
      },
      {
        text: 'نور الأنوار',
        transliteration: 'Nur al-Anwar',
        translation: 'Light of Lights - The Divine'
      },
      {
        text: 'حکمت اشراق',
        transliteration: 'Hikmat al-Ishraq',
        translation: 'The Wisdom of Illumination'
      }
    ],
    imagePrompt: 'Divine light emanating from source, Suhrawardi\'s illumination philosophy, mystical radiance, ancient Persian fire temple wisdom, brilliant golden light, angelic figures'
  },
  {
    id: 'part3-rumi',
    title: 'Rumi',
    subtitle: 'The Religion of Love',
    content: `Jalal al-Din Rumi is often read today as a gentle poet of comfort. This is a mistake. Rumi is a philosopher of trauma and radical transformation.

Born in Balkh (modern Afghanistan), Rumi fled the Mongol invasion as a child. He settled in Konya as a respectable, sober professor of law. Then he met Shams of Tabriz—a wandering, antinomian dervish who challenged everything Rumi knew.

Shams took Rumi's books and (legend has it) threw them into a fountain. "You can't learn this from paper," he effectively said. "You have to burn."

**The Philosophy of Longing**

Rumi's massive work, the *Masnavi*, begins with the sound of a reed flute (*Ney*). The flute sings a sad song. Why? Because it has been cut from the reed bed. It yearns to go back to the mud where it grew.

This is Rumi's ontology: **We are in exile.**
The human condition is defined by a fundamental sense of loss. We are not from here. We are sparks cut off from the fire.

For Rumi, **Love** (*Ishq*) is not an emotion; it is gravity. It is the force that pulls the fragmented parts of the universe back toward the One. Reason is a donkey stuck in the mud; only Love has the wings to fly back to the source.

Rumi used poetry not because he lacked rigor, but because prose is too small to hold the paradoxes of God. He argued that the intellect can build a house, but only Love can live in it.`,
    quotes: [
      {
        text: 'جلال الدین محمد مولوی',
        transliteration: 'Jalal al-Din Muhammad Rumi',
        translation: 'Rumi - The great Sufi master of Konya'
      },
      {
        text: 'نی',
        transliteration: 'Ney',
        translation: 'The reed flute - Symbol of longing and separation'
      },
      {
        text: 'عشق',
        transliteration: 'Ishq',
        translation: 'Love - The force of divine attraction'
      },
      {
        text: 'بیا تا رخ را بر رخ نهیم، بیا تا جان را در جان نهیم',
        transliteration: 'Biya ta rokh ra bar rokh nehim, Biya ta jan ra jan nehim',
        translation: '"Come, let us press cheek to cheek; come, let us merge soul with soul"'
      }
    ],
    imagePrompt: 'Rumi and Shams meeting, Whirling Dervish in cosmic motion, reed flute ney, mystical union, golden divine light, Konya setting, Persian miniature art'
  },
  {
    id: 'part3-ibnarabi',
    title: 'Ibn Arabi',
    subtitle: 'The Architect of Unity',
    content: `While Rumi was dancing in Konya, another giant was reshaping the intellectual landscape. Ibn Arabi was from Andalusia (Spain), but his complex metaphysics found their most fertile soil in the Persian world.

He is known as *Al-Shaykh Al-Akbar* (The Greatest Master), and he provided the architectural blueprints for the mystical experience.

**Wahdat al-Wujud (The Unity of Being)**

Ibn Arabi proposed a terrifyingly simple idea: **There is only one Reality.**
We look around and see tables, chairs, people, and stars. We think these things "exist." Ibn Arabi says no. They are like waves on an ocean. The wave has a shape, a height, and a momentary form, but it has no substance of its own. It is *water*.

God is the Water. The universe is the Wave.
This is distinct from pantheism (which says the tree *is* God). Ibn Arabi says the tree is a *locus of manifestation* for God's names. The world is a theater of mirrors where God looks to see His own reflection.

**The Imaginal Realm**

Ibn Arabi also solved the problem of "where" spiritual experiences happen. He mapped out the **Alam al-Mithal** (The World of Image).

This is a layer of reality between the physical world and the pure spirit. It is where dreams happen. It is where angels take human form. It is where symbols are real.
Western philosophy often dismisses "imagination" as fantasy. Ibn Arabi elevated Imagination to an organ of perception. Just as the eye sees color, the Imagination sees meaning.`,
    quotes: [
      {
        text: 'ابن عربی',
        transliteration: 'Ibn Arabi',
        translation: 'The Greatest Master - Sheikh al-Akbar'
      },
      {
        text: 'وحدت الوجود',
        transliteration: 'Wahdat al-Wujud',
        translation: 'Unity of Being'
      },
      {
        text: 'عالم مثال',
        transliteration: 'Alam al-Mithal',
        translation: 'The World of Image - Imaginal realm'
      }
    ],
    imagePrompt: 'Cosmic unity, waves of existence, mystical reflection, Andalusian scholar in Persian setting, divine manifestation, mirror imagery, golden and aqua tones'
  },
  {
    id: 'part4',
    title: 'Part IV',
    subtitle: 'The Transcendent Theosophy: The Great Synthesis',
    content: `By the 16th century, the Persian world had been through centuries of fragmentation. Then, a new power arose: the Safavids. They reunited Iran under a single throne and a single faith (Shi'ism).

This political consolidation sparked an intellectual renaissance in the glittering capital of Isfahan. The question for philosophers was no longer "Reason or Revelation?" or "Logic or Mysticism?" The question was: **How do we fit it all together?**

They didn't want to choose. They wanted a Grand Unified Theory of everything—a system that could hold the rigorous logic of Avicenna, the blinding light of Suhrawardi, and the deep gnosis of the Imams.

In the schools of Isfahan, philosophy wasn't a dry academic subject; it was a spiritual discipline. Students were expected to master mathematics and logic, but also to purify their souls through prayer and asceticism.

The goal was _Hikmat_—Wisdom. And the man who would achieve this synthesis was a genius named Mulla Sadra.`,
    quotes: [
      {
        text: 'صفویه',
        transliteration: 'Safaviyun',
        translation: 'The Safavid Dynasty'
      },
      {
        text: 'اصفهان',
        transliteration: 'Isfahan',
        translation: 'The glittering Safavid capital'
      },
      {
        text: 'حکمت متعالیه',
        transliteration: 'Hikmat al-Mutaaliya',
        translation: 'Transcendent Theosophy'
      }
    ],
    imagePrompt: 'Isfahan cityscape, Safavid era architecture, Sheikh Lotfollah Mosque, blue tile work, intellectual gathering, golden light, Persian Renaissance atmosphere'
  },
  {
    id: 'part4-mullasadra',
    title: 'Mulla Sadra',
    subtitle: 'The Master of Synthesis',
    content: `Sadr al-Din Shirazi (d. 1640), known as Mulla Sadra, is to later Islamic philosophy what Kant is to the West or Shankara to India. He is the towering peak.

Sadra looked at the history of philosophy and saw a fundamental error. Everyone—from Aristotle to Avicenna—had been obsessed with **Essence** (what things are). They treated "Existence" as a secondary quality, like a coat of paint added to a statue.

Sadra flipped the table.

**The Primacy of Existence (_Asalat al-Wujud_)**

He argued that **Existence is the only reality.**
Think of a flame. It has heat, light, color, and movement. But these are just descriptions. The reality is the _burning_.

Sadra said the universe is a single, graded reality of "Being." God is pure, intense Being. An angel is slightly less intense. A human is weaker still. A stone is barely there.
There are no sharp lines between things; there is only a spectrum of intensity.

This was revolutionary. It meant that reality is not a collection of static objects; it is a single, flowing act of existence.

**Substantial Motion (_Al-Haraka al-Jawhariyya_)**

This led Sadra to his most radical idea: **Everything is moving.**
Aristotle had said that substances (like a tree or a man) are fixed, and only their accidents (size, color, location) change. Sadra said no. The very _substance_ of the tree is in motion.

The universe is constantly being reborn at every instant. It is a river of existence, flowing towards perfection.
Therefore, the human soul is not a static thing trapped in a body. The soul _is_ a bodily process that evolves, through knowledge and action, into a spiritual reality. We literally _become_ what we know.

**The Journey of the Soul**

Sadra mapped out the "Four Journeys" of the intellect:

1.  From the Self to God (dissolving the ego).
2.  In God with God (seeing reality through Divine eyes).
3.  From God to the World (returning to creation).
4.  In the World with God (guiding others while remaining connected to the Source).

This is a philosophy of action. You don't leave the world to find God; you find God to transform the world.`,
    quotes: [
      {
        text: 'صدرالدین شیرازی',
        transliteration: 'Sadr al-Din Shirazi',
        translation: 'Mulla Sadra - The Transcendent Philosopher'
      },
      {
        text: 'اصالت الوجود',
        transliteration: 'Asalat al-Wujud',
        translation: 'The Primacy of Existence'
      },
      {
        text: 'حرکت جوهریه',
        transliteration: 'Harakat al-Jawhariyya',
        translation: 'Substantial Motion'
      }
    ],
    imagePrompt: 'Mulla Sadra in contemplation, philosophical discourse, Isfahan seminary, flowing existence imagery, light and shadow play, scholarly Persian atmosphere'
  },
  {
    id: 'part4-schoolisfahan',
    title: 'The School of Isfahan',
    subtitle: 'Mir Damad and the Safavid Renaissance',
    content: `Mulla Sadra didn't work in a vacuum. He was part of a brilliant circle of thinkers in Isfahan, led by his teacher, Mir Damad.

Mir Damad was a dense, difficult writer (he was called "The Teacher of the Third Era"). He wrestled with the problem of **Time**.
If God is eternal and the world is created in time, how do they connect?
Mir Damad proposed a third category: _Dahr_ (Perpetuity).

- **Sarmad:** Eternity (God alone).
- **Zaman:** Time (Physical world).
- **Dahr:** The link between them. It is the "relation of the changeless to the changing."

This allowed the Safavid thinkers to solve the ancient riddle of creation without falling into heresy or materialism.

**Philosophy in the Court**

The Safavid emperors were patrons of the arts and sciences. They built the magnificent mosques and bridges of Isfahan, which are physical manifestations of this philosophy—geometric order infused with spiritual light.

But this was also a dangerous time. The strict religious scholars (_Ulama_) were suspicious of philosophy. Mulla Sadra himself was exiled for years to a small village (Kahak) before being allowed to return to teaching.
The "School of Isfahan" was a fragile flower, blooming in the gap between royal patronage and religious orthodoxy.

**The Unity of Knowledge**

The ultimate achievement of this era was the integration of **Shi'ite Theology**, **Greek Logic**, and **Sufi Mysticism**.
Before this, you had to choose a camp.

- Are you a Peripatetic (follower of Aristotle)?
- Are you an Illuminationist (follower of Suhrawardi)?
- Are you a Gnostic (follower of Ibn Arabi)?

Mulla Sadra and his colleagues said: **Yes.**
They built a "Transcendent Theosophy" (_Al-Hikmat al-Muta'aliya_) that used rational arguments to prove mystical truths, and scriptural revelation to guide rational inquiry.`,
    quotes: [
      {
        text: 'میرداماد',
        transliteration: 'Mir Damad',
        translation: 'The Teacher of the Third Era'
      },
      {
        text: 'دهر',
        transliteration: 'Dahr',
        translation: 'Perpetuity - The link between eternity and time'
      },
      {
        text: 'زمان',
        transliteration: 'Zaman',
        translation: 'Time - The physical world'
      }
    ],
    imagePrompt: 'Mir Damad teaching, Isfahan seminary scene, mosque architecture, geometric patterns, spiritual light through windows, Safavid artistic excellence'
  },
  {
    id: 'part5',
    title: 'Part V',
    subtitle: 'Poetry, Ethics, and the Human Condition',
    content: `In the West, philosophy is usually written in prose—dry, precise, and footnoted. In Persia, the deepest truths were too heavy for prose to carry. They had to be sung.

For the Persian mind, poetry is not merely entertainment or decoration; it is the highest form of thinking. While the philosophers in the madrasas debated the nature of existence, the poets were in the marketplace and the tavern, teaching the people how to *bear* existence.

This section explores how ethics, metaphysics, and history were woven into the very rug of daily life through verse.

If Mulla Sadra is the mind of Persia, the poets are its breath.

You can visit an illiterate grandmother in a village in Khorasan today, and she might not know who Avicenna is. But she can likely recite lines from Hafez or Saadi to explain why her heart is broken, or why a tyrant will eventually fall. In this tradition, poetry performs the work of philosophy: it explains the world to us.`,
    quotes: [
      {
        text: 'شاعر',
        transliteration: 'Shaer',
        translation: 'Poet - The voice of Persian wisdom'
      },
      {
        text: 'غزل',
        transliteration: 'Ghazal',
        translation: 'Ode - The Persian poetic form'
      }
    ],
    imagePrompt: 'Persian poet in garden, manuscripts of poetry, rose garden, traditional Persian art, contemplative poet, colorful Persian miniature'
  },
  {
    id: 'part5-saadi',
    title: 'Saadi Shirazi',
    subtitle: 'The Garden of Prudence',
    content: `Sheikh Saadi (13th century) was not a recluse. He was a traveler, a survivor, and a pragmatist. He spent decades wandering the Islamic world—from the bazaars of Damascus to the slave markets of Tripoli—observing how people actually behave.

When he returned to Shiraz, he didn't write a theoretical treatise on ethics. He wrote the *Gulistan* (The Rose Garden).

**Ethics on the Ground**

Saadi's philosophy is distinct because it is **worldly**. He doesn't demand that you become a saint; he asks you not to be a monster.
He tells stories—short, punchy, often funny anecdotes about kings, dervishes, and merchants. He teaches that justice is better than prayer, and that silence is better than foolish speech.

**The Organic Unity of Mankind**

Saadi gave the world one of its most profound ethical axioms in his famous poem *Bani Adam*:
*"Human beings are members of a whole, / In creation of one essence and soul."*

This is not a greeting-card sentiment. It is a metaphysical claim. Saadi argues that humanity is a single organism. If you are indifferent to the suffering of a stranger, you are not just "mean"—you are malfunctioning. You are a hand claiming it has no relation to the foot.
To be human is to feel the phantom pain of others.`,
    quotes: [
      {
        text: 'سعدی شیرازی',
        transliteration: 'Saadi Shirazi',
        translation: 'The Prince of Poets - Master of ethics'
      },
      {
        text: 'گلستان',
        transliteration: 'Gulistan',
        translation: 'The Rose Garden - Saadi\'s ethical masterpiece'
      },
      {
        text: 'بنی آدم اعضای یک پیکرند',
        transliteration: 'Bani Adam aazaa-yek peykarand',
        translation: '"Human beings are members of a whole" - Bani Adam'
      },
      {
        text: 'که در آفرینش یک روحند',
        transliteration: 'Ke dar afarinish yek ruhand',
        translation: '"In creation of one essence and soul"'
      }
    ],
    imagePrompt: 'Saadi in rose garden, Shiraz setting, storytelling scene, wise elder, Persian garden aesthetics, colorful miniature art'
  },
  {
    id: 'part5-hafez',
    title: 'Hafez',
    subtitle: 'The Mirror of the Heart',
    content: `If Saadi is the wise uncle advising you on how to live in society, Hafez (14th century) is the mystic rebel inviting you to break the rules.

Khwaja Hafez remains the most beloved figure in Persian culture. His book, the *Divan*, is found in almost every Iranian home, often placed right next to the Quran. People use it for divination (*Fal-e Hafez*), opening a random page to seek guidance for their problems.

**The Philosophy of Ambiguity**

Hafez is the master of **Irony**. He realized that the greatest enemy of truth is not the atheist, but the hypocrite—the person who prays loudly in the front row but has a stone in his heart.
Hafez attacks religious certainty. In his ghazals, he praises the "Rind"—the clever rogue, the drunkard, the lover. Why? Because the drunkard knows he is flawed. He has no ego. The pious ascetic, however, is drunk on his own self-righteousness.

**The Tavern and the Wine**

Hafez's poetry is drenched in wine. Is it literal alcohol? Is it the wine of Divine Love?
The answer is: **Yes.**
Hafez refuses to let you separate the physical from the spiritual. He uses the language of earthly intoxication to describe the annihilation of the self in God. The "Tavern" (*Maykhaneh*) is the sanctuary where we strip off the masks of social respectability and encounter the Truth nakedly.

Hafez teaches a philosophy of spiritual anarchism: tear down the prison of your reputation, smash the idol of your ego, and become a mirror that reflects nothing but the Beloved.`,
    quotes: [
      {
        text: 'خواجه حافظ شیرازی',
        transliteration: 'Khwaja Hafez Shirazi',
        translation: 'Hafez - The Persian Oracle'
      },
      {
        text: 'دیوان حافظ',
        transliteration: 'Divan-e Hafez',
        translation: 'The Collected Poems of Hafez'
      },
      {
        text: 'میخانه',
        transliteration: 'Maykhaneh',
        translation: 'The Tavern - Where the self is lost in divine love'
      },
      {
        text: 'اگر آن ترک شیرازی به دست آورد رخ، بوسه بر آن خال هندویش زنم',
        transliteration: 'Agar an Tork-e Shirazi be dast avord rokh, bosseh bar an khal-e Hendunash bezanim',
        translation: '"If that Turk of Shiraz attains her cheek, I would kiss the mole on her Indian face" - Classic Hafez'
      }
    ],
    imagePrompt: 'Hafez reading book, mystical tavern scene, wine and roses, ironic smile, divine love imagery, deep blue and red colors'
  },
  {
    id: 'part5-ferdowsi',
    title: 'Ferdowsi',
    subtitle: 'The Epic of Time',
    content: `Long before Saadi or Hafez, there was Ferdowsi (10th century). He did not write about mystics; he wrote about kings.

Ferdowsi spent thirty years writing the *Shahnameh* (The Book of Kings), a massive epic of 50,000 couplets. He did this to save the Persian language and history from being swallowed by the Arabic conquest. But in doing so, he wrote a profound meditation on **Power and Time**.

**The Tragedy of Power**

The *Shahnameh* is not a propaganda piece for monarchy. It is a tragedy.
It tells the story of Iran from the mythical creation of the world to the fall of the Sassanian Empire. We see kings rise, rule with glory, succumb to pride (*Hubris*), and then fall into ruin.

Ferdowsi's philosophy is cyclic. He is obsessed with the turning of the heavens (*Gardesh-e Gardoon*). Time is a ruthless grinder. It devours heroes and tyrants alike.
The only thing that survives Time is a "Good Name."

**Rostam and the Ethics of Fate**

The central hero, Rostam, is a man of immense strength who is constantly forced into moral dilemmas. In the most heartbreaking story, Rostam kills a young warrior in single combat, only to discover—too late—that the boy was his own son, Sohrab.
This is the Persian worldview in a nutshell: We are powerful, but we are blind. Fate weaves a web that even the strongest hero cannot tear.

Ferdowsi teaches us that because power is fleeting and fate is cruel, the only rational choice is nobility. We must do what is right, even if the sky is falling.`,
    quotes: [
      {
        text: 'ابوالقاسم فردوسی',
        transliteration: 'Abu al-Qasim Ferdowsi',
        translation: 'Ferdowsi - The Epic Poet of Persia'
      },
      {
        text: 'شاهنامه',
        transliteration: 'Shahnameh',
        translation: 'The Book of Kings - Epic Persian mythology'
      },
      {
        text: 'رستم',
        transliteration: 'Rostam',
        translation: 'The legendary hero of the Shahnameh'
      },
      {
        text: 'سهراب',
        transliteration: 'Sohrab',
        translation: 'Rostam\'s tragic son'
      }
    ],
    imagePrompt: 'Rostam battling the White Div, epic Persian battle scene, Shahnameh illustration, ancient Iranian heroes, dramatic sky, traditional Persian epic art'
  },
  {
    id: 'part6',
    title: 'Part VI',
    subtitle: 'Modern Currents and Contemporary Voices',
    content: `This is the hardest part of the story to tell.

For 2,500 years, Persian philosophy had been a conversation with itself—arguing with its own past, refining its own terms. Then, in the 19th century, the door was kicked open.

The arrival of Modernity was a shock. It wasn't just steam engines and telegraphs; it was a new way of being human. The West arrived with a confidence that shook the foundations of traditional thought.

Suddenly, the old answers didn't seem enough. The philosophers of Qom and Tehran had to decide: **Do we retreat into the past? Do we surrender to the future? Or do we create something new?**

In the bazaar of ideas, the Persian philosopher was no longer the only merchant.

Marx, Darwin, Freud, and Kant arrived in translation. They offered explanations for the world that didn't require God, didn't require the Soul, and didn't care about the Light of Lights.

This section is about the intellectual brawl that followed. It is about a civilization trying to remember its own name in a crowded room.`,
    quotes: [
      {
        text: 'قمر',
        transliteration: 'Qom',
        translation: 'The center of Shi\'ite theological learning'
      },
      {
        text: 'تهران',
        transliteration: 'Tehran',
        translation: 'Modern Iranian capital'
      }
    ],
    imagePrompt: 'Modern Tehran cityscape, intellectual debate, ancient and modern collision, Persian bazaar of ideas, traditional and contemporary fusion'
  },
  {
    id: 'part6-modernity',
    title: 'Encounter with Modernity',
    subtitle: 'The Crisis of the Self',
    content: `By the mid-19th century, Iran was weak. The Qajar kings were losing wars to Russia and Britain. They were signing away oil rights and tobacco monopolies.

Intellectuals traveled to Paris and London and saw societies that were powerful, organized, and scientifically advanced. They came back with a question that burned: **"Why are we backward?"** (*Chera ma aghab mandim?*)

**The Constitutional Revolution (1906)**

This wasn't just a political movement; it was a philosophical earthquake.
For the first time, Iranians debated concepts like "Law" (*Qanon*), "Freedom" (*Azadi*), and "Rights" (*Hoquq*)—concepts that had no direct equivalent in traditional Islamic jurisprudence.

Clerics like **Sheikh Fazlollah Nuri** argued that man-made law was blasphemy; only God legislates.
Intellectuals like **Mirza Malkam Khan** argued that without a Constitution, Iran would be eaten alive by colonial powers.

This debate split the Persian soul in two. One half wanted to become European; the other half wanted to remain pure.`,
    quotes: [
      {
        text: 'چرا ما عقب مانده‌ایم؟',
        transliteration: 'Chera ma aghab mandim?',
        translation: '"Why are we backward?" - The painful question of modernity'
      },
      {
        text: 'مشروطه',
        transliteration: 'Mashruteh',
        translation: 'Constitutional - The Constitutional Revolution'
      },
      {
        text: 'آزادی',
        transliteration: 'Azadi',
        translation: 'Freedom'
      }
    ],
    imagePrompt: 'Constitutional Revolution era Iran, parliament building, political discourse, traditional and modern clash, Persian intellectuals debating'
  },
  {
    id: 'part6-shariati',
    title: 'Ali Shariati',
    subtitle: 'The Red Shi\'ism',
    content: `In the 1960s and 70s, a young sociologist named Ali Shariati electrified the youth of Iran. He didn't wear a turban; he wore a tie (and sometimes a turtleneck). He had studied Sartre and Fanon in Paris.

Shariati did something brilliant and dangerous: **He turned religion into an ideology.**

**"Every Day is Ashura"**

Shariati looked at traditional Shi'ism—with its weeping, its mourning for Hussein, its passive waiting for the Savior—and he hated it. He called it "Black Shi'ism" (the religion of mourning).
He proposed "Red Shi'ism" (the religion of martyrdom).

He argued that Hussein didn't die to be cried over; he died to teach us how to rebel against tyranny.
He took Marxist concepts—class struggle, revolution, imperialism—and translated them into Islamic terms. "The Oppressed" became *Mostazafin*. "The Enlightened" became *Roshanfekr*.

Shariati made philosophy urgent. He told a generation that they didn't have to choose between being modern and being Muslim. They could be **Modern Revolutionary Muslims**.
His lectures at the *Hosseiniyeh Ershad* in Tehran were packed. Cassette tapes of his voice circulated like contraband. He prepared the mind of the revolution.`,
    quotes: [
      {
        text: 'علی شریعتی',
        transliteration: 'Ali Shariati',
        translation: 'The Revolutionary Sociologist'
      },
      {
        text: 'شیعه سرخ',
        transliteration: 'Shi\'eh-ye Sorkh',
        translation: 'Red Shi\'ism - Revolutionary Shi\'ism'
      },
      {
        text: 'مستضعفین',
        transliteration: 'Mostazafin',
        translation: 'The Oppressed'
      },
      {
        text: 'روشنفکر',
        transliteration: 'Roshanfekr',
        translation: 'The Enlightened Intellectual'
      }
    ],
    imagePrompt: 'Ali Shariati lecturing, crowded auditorium, revolutionary youth, cassette tapes, Hosseiniyeh Ershad, modern Iranian revolutionary atmosphere'
  },
  {
    id: 'part6-fardid',
    title: 'Ahmad Fardid',
    subtitle: 'The Heideggerian Turn',
    content: `While Shariati was inciting revolution, a darker, more obscure philosopher was holding court in living rooms.

Ahmad Fardid was a difficult man. He published almost nothing, but his oral teachings influenced an entire generation of thinkers (including the post-revolutionary leadership). He was obsessed with the German philosopher Martin Heidegger.

**Gharbzadegi (Westoxication)**

Fardid coined a term that would become the most famous concept in modern Iranian history: *Gharbzadegi*.
It is often translated as "Westoxication" or "Occidentosis."

Jalal Al-e Ahmad later popularized it, but Fardid meant it philosophically.
He argued that the West is not just a geography; it is a **disease of Being**. The West has forgotten God. It has reduced the world to a resource to be exploited by technology (*Technic*).

Fardid believed that Iranians were becoming "West-struck"—infected by this nihilism, losing their own connection to the Truth (*Haqq*).
He called for a return to the "Self"—but a Self that was mystical, Eastern, and deeply anti-modern.

This idea gave Iranians a philosophical weapon to reject Western culture, not just politically, but metaphysically.`,
    quotes: [
      {
        text: 'احمد فردید',
        transliteration: 'Ahmad Fardid',
        translation: 'The Anti-Western Philosopher'
      },
      {
        text: 'غرب‌زدگی',
        transliteration: 'Gharbzadegi',
        translation: 'Westoxication - The disease of Western influence'
      },
      {
        text: 'حق',
        transliteration: 'Haqq',
        translation: 'Truth - The Divine Reality'
      }
    ],
    imagePrompt: 'Ahmad Fardid in philosophical discourse, Heidegger influence, traditional Persian setting, anti-modern sentiment, intellectual intensity'
  },
  {
    id: 'part6-soroush',
    title: 'The Ongoing Conversation',
    subtitle: 'Philosophy Today',
    content: `The 1979 Revolution was, in many ways, the victory of these ideas. But history didn't stop there.

Today, Iran is one of the only countries in the world where philosophy is a matter of national security.
*   **The Seminaries (Qom):** Thousands of students still study Mulla Sadra and Avicenna. They are trying to produce an "Islamic Science" that can rival Western secular science.
*   **The Universities:** A new generation is reading everything—Analytic Philosophy, Feminism, Post-Modernism, Liberalism. They are asking: *Can we have democracy without losing our soul?*

**Abdolkarim Soroush**

One of the most important living philosophers, Soroush (a former revolutionary), rocked the establishment with his "Theory of the Contraction and Expansion of Religious Knowledge."
He argued that the *Text* of religion (Quran) is divine and unchanging, but our *Understanding* of it is human, fallible, and evolves with time.
This implies that religious law can change. It opened the door for a "Religious Democracy."

Modern Persian philosophy is a battlefield. It is the story of a civilization fighting for its identity.
It has produced radical revolutionaries like Shariati, nostalgic traditionalists like Fardid, and liberal reformers like Soroush.
They disagree on almost everything, except one thing: **Philosophy matters.** Ideas have consequences. And the question of "What does it mean to be Iranian and Muslim in the modern world?" is still the most dangerous question you can ask.`,
    quotes: [
      {
        text: 'عبدالکریم سروش',
        transliteration: 'Abdolkarim Soroush',
        translation: 'The Leading Reformist Philosopher'
      },
      {
        text: 'دینِ مردم‌سالار',
        transliteration: 'Din-e Mardom-salar',
        translation: 'Religious Democracy'
      },
      {
        text: 'توسعه و انقباض علم دینی',
        transliteration: 'Toseh va Eqbaaz-e Elm-e Dini',
        translation: 'Contraction and Expansion of Religious Knowledge'
      }
    ],
    imagePrompt: 'Contemporary Iranian philosopher, modern seminary, intellectual discourse, traditional books with modern ideas, reform and tradition dialogue'
  },
  {
    id: 'epilogue',
    title: 'Epilogue',
    subtitle: 'The Light That Endures',
    content: `We have walked a long road: from the fire temples of the Bronze Age to the digital seminaries of Qom.

If you take nothing else from this journey, take this: Persian philosophy is not a museum piece. It is not a collection of dusty ideas about "substance" and "accident" to be memorized for a test.

It is a **Technology of the Soul**.

### What This Tradition Offers the Modern World

We live in an age of fragmentation. We have separated Science from Ethics. We have separated Politics from Morality. We have separated the Brain from the Heart.
The result is a world that is technologically godlike but spiritually hollow. We are lonely, anxious, and obsessed with surfaces.

Persian philosophy offers a cure for this fracture. It refuses to cut the world into pieces.
*   **It tells the Scientist:** Your study of the physical world is a form of prayer.
*   **It tells the Activist:** You cannot fix society if your own soul is broken.
*   **It tells the Artist:** Beauty is not a luxury; it is the face of Truth.

It insists that **Reality is Intelligible**. The universe is not a random accident; it is a text waiting to be read. And you—the reader—are not a stranger here. You are the point where the universe becomes aware of itself.

### Wisdom as a Way of Being

In the West, "philosophy" is often something you *study*. In the East, *Hikmat* (Wisdom) is something you *become*.

The great Persian thinkers—Avicenna, Suhrawardi, Mulla Sadra—were not just writers. They were physicians who healed the sick, judges who decided the law, and mystics who stayed up all night in vigil.
They believed that true knowledge changes your chemistry. If you know the Truth, you cannot be cruel. If you see the Light, you cannot remain in the dark.

To enter this tradition is to accept a challenge: **Don't just think better. Be better.**

### An Invitation

The books listed below are not textbooks; they are maps.
Read Rumi when you are heartbroken. Read Hafez when you are tired of hypocrisy. Read Mulla Sadra when you doubt that life has meaning. Read Ferdowsi when you need courage.

The garden gate is open. Walk in.`,
    quotes: [
      {
        text: 'حکمت',
        transliteration: 'Hikmat',
        translation: 'Wisdom - Not just studied, but become'
      },
      {
        text: 'باغ',
        transliteration: 'Bagh',
        translation: 'Garden - The Persian concept of paradise'
      }
    ],
    imagePrompt: 'Eternal flame, light breaking through darkness, Persian garden gate opening, timeless wisdom, golden dawn, hope and continuity'
  },
  {
    id: 'closing',
    title: 'Closing Reflection',
    subtitle: '',
    content: `We end where we began: with the image of the Garden.

The Persian word for "Paradise" is *Pairi-daeza*—a walled garden.
Why a wall? Because outside is the desert. Outside is the scorching sun, the bandits, the chaos of history, the rise and fall of empires.
But inside the wall, there is water. There is shade. There is order.

Persian philosophy is an attempt to build that garden inside the human mind.
It admits that the world is harsh. It admits that tyrants rule and children starve. But it insists that we have the power to create an inner geometry of peace.

From the hymns of Zarathustra to the complex systems of Mulla Sadra, the goal has always been the same:
**To light a lamp in the desert, and to keep it burning against the wind.**`,
    quotes: [
      {
        text: 'پردیس',
        transliteration: 'Pairi-daeza',
        translation: 'Paradise - A walled garden'
      },
      {
        text: 'چراغ',
        transliteration: 'Cheragh',
        translation: 'Lamp - The light of wisdom'
      }
    ],
    imagePrompt: 'Persian paradise garden, lamp in desert, eternal flame, hope against darkness, circular patterns, peace within walls, golden sunset'
  }
];

export const bookMeta = {
  title: 'A History of Persian Wisdom',
  subtitle: 'From Zarathustra to the Modern Age',
  author: 'The Hikmatia Project',
  description: 'A journey through 2,500 years of Persian philosophical tradition, from the fire temples of ancient Iran to the digital seminaries of modern times.'
};
