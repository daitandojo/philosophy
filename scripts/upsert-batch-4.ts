import mongoose from 'mongoose';

const quotes = [
  { author: 'Ferdowsi', farsi: 'چو گفتار نیکو بود، گوش دار / که نیکو سخن خود بود یادگار', english: "When speech is good, listen carefully / For good words are themselves a lasting memorial.", theme: 'Worthy speech deserves attentive ears and becomes its own living monument' },
  { author: 'Ferdowsi', farsi: 'نگر تا نگردی تو ایمن ز دشمن / که دشمن چو آتش بود در نشیمن', english: "Take care that you never feel safe from an enemy / For an enemy is like fire in your dwelling.", theme: 'Perpetual vigilance against adversity as a fundamental requirement of survival' },
  { author: 'Abu Nasr al-Farabi', farsi: 'شهر فاضله آن است که در آن انسان به سعادت حقیقی برسد', english: 'The virtuous city is the one in which human beings attain true happiness.', theme: 'The ideal society measured solely by its capacity to foster genuine human flourishing' },
  { author: 'Abu Nasr al-Farabi', farsi: 'رئیس اول آن است که نه فرمان‌برد نه کسی بر او برتری جوید', english: 'The first ruler is one who obeys no one and over whom no one seeks supremacy.', theme: 'The philosopher-king as the ideal ruler — self-sufficient in wisdom and answerable to none' },
  { author: 'Abu Nasr al-Farabi', farsi: 'موسیقی روح را آن می‌کند که ورزش جسم را', english: 'Music does for the soul what exercise does for the body.', theme: 'Music as the essential nourishment and exercise of the human soul' },
  { author: 'Abu Nasr al-Farabi', farsi: 'غایت فلسفه شناخت موجودات است آن‌چنان که هستند', english: 'The purpose of philosophy is to know existing things as they truly are.', theme: "Philosophy's highest purpose as the unflinching perception of reality as it truly is" },
  { author: 'Ikhwan al-Safa', farsi: 'فلسفه آن است که آدمی تا آنجا که توانایی دارد شبیه به خدا شود', english: 'Philosophy is for a person to become, insofar as they are able, similar to God.', theme: 'The telos of philosophy as the gradual divinization of the human being' },
  { author: 'Ikhwan al-Safa', farsi: 'علوم سه‌گانه‌اند: علم بدن، علم نفس، علم الهی / و کمال آدمی در جمع هر سه', english: 'The sciences are threefold: knowledge of the body, knowledge of the soul, and knowledge of the divine / Human perfection lies in combining all three.', theme: 'Complete human development requires integrating bodily, psychological, and spiritual knowledge' },
  { author: 'Zakariya al-Razi', farsi: 'عقل بزرگ‌ترین نعمت خداست / پس از آن فروگذار مکن', english: "Reason is God's greatest gift / So do not abandon it.", theme: 'Reason as the supreme divine gift that carries the moral obligation never to be abandoned' },
  { author: 'Zakariya al-Razi', farsi: 'پزشک که بیمار خود را نشناسد، درمان او نتواند', english: 'A physician who does not know their patient cannot heal them.', theme: 'True healing requires knowing the whole person, not merely treating the disease' },
  { author: 'Zakariya al-Razi', farsi: 'فیلسوف آن است که دانش را برای دانش دوست بدارد، نه برای سود', english: "A philosopher is one who loves knowledge for knowledge's sake, not for gain.", theme: 'Pure love of knowledge as the defining quality of the true philosopher' },
  { author: 'Al-Biruni', farsi: 'مسافر باید چشم باز داشته باشد / که جهان هر جا درسی می‌دهد', english: 'The traveler must keep eyes open / For the world offers a lesson everywhere.', theme: 'Travel with open eyes as one of the most reliable schools of wisdom' },
  { author: 'Al-Biruni', farsi: 'تعصب آفت علم است / که هر که تعصب دارد، راه دانش را بسته است', english: 'Prejudice is the plague of knowledge / For whoever holds prejudice has closed the road to learning.', theme: 'Prejudice as the most deadly enemy of genuine knowledge and open inquiry' },
  { author: 'Khwandamir', farsi: 'آن که تاریخ را نخواند، محکوم به تکرار آن است', english: 'One who does not read history is condemned to repeat it.', theme: 'Historical knowledge as the only shield against the repetition of past catastrophes' },
  { author: 'Khwandamir', farsi: 'شاهان را اگر عدل باشد، ملک پاید / وگر ظلم باشد، ملک نپاید', english: 'If kings have justice, their kingdom endures / If they have oppression, their kingdom does not endure.', theme: 'Justice as the cornerstone upon which all enduring power is built' },
  { author: 'Vasifi', farsi: 'عمر آدمی دو روز است / یک روز به کسب ادب و یک روز به کار بستن آن', english: "A person's life consists of two days / One day for acquiring culture and one day for putting it to work.", theme: "Life's ideal division between the acquisition of wisdom and its active application" },
  { author: 'Jalaluddin Davani', farsi: 'انسان کامل آینه‌ی تمام‌نمای وجود است', english: 'The perfect human being is the full-reflecting mirror of existence.', theme: 'The fully realized human being as the supreme mirror in which all of existence sees itself' },
  { author: 'Lutfi of Samarkand', farsi: 'عشق آن است که در آن خود را فراموش کنی / نه آن که خود را به یاد آوری', english: 'Love is that in which you forget yourself / Not that which brings you to remember yourself.', theme: 'Genuine love defined by the complete forgetting of the self, not its enhancement' },
  { author: 'Hilali Jagatai', farsi: 'آن که در عشق شکیبا است، عاشق راستین است / که عشق آزمایشی است و صبر پاسخ آن', english: 'One who is patient in love is the true lover / For love is a test and patience is its answer.', theme: "Love's inevitable tests and trials" },
  { author: 'Mushtaq Ali Shah', farsi: 'آن که از دنیا گذشت، به حق رسید / آن که در دنیا ماند، در خود ماند', english: 'One who passed beyond the world arrived at the divine / One who remained in the world remained within themselves.', theme: 'Transcendence of worldly attachment as the path from the self to the divine' },
  { author: 'Hazin Lahiji', farsi: 'عارف را بهشت و دوزخ یکی است / که عارف فراتر از هر دو است', english: 'For the mystic, paradise and hell are one / For the mystic has transcended both.', theme: 'The true mystic transcending the duality of heaven and hell to reach undivided reality' },
  { author: 'Hazin Lahiji', farsi: 'غم غربت آن است که نه جا داری و نه یار / که در غربت، یار جای را می‌پوشاند', english: 'The sorrow of exile is having neither home nor companion / For in exile, a companion covers for the lack of home.', theme: 'Companionship as the one thing that can make exile bearable by serving as home' },
  { author: 'Shah Nimatullah Wali', farsi: 'دلم دریاست و عشق موج آن / کجا مرا آرام و قرار؟', english: 'My heart is a sea and love is its wave / Where shall I find rest and stillness?', theme: 'The heart consumed by love as a sea that can never be completely stilled' },
  { author: 'Shah Nimatullah Wali', farsi: 'آنچه هستی آنی / و آنچه نیستی آنی نیستی', english: 'What you are, that you are / And what you are not, that you are not.', theme: 'The radical simplicity of authentic self-knowledge — you are exactly what you are, no more' },
  { author: 'Qadir Khan Khattak', farsi: 'مرد آن است که در میدان نماند، بلکه میدان را تغییر دهد', english: 'A true man is not one who merely holds the field, but one who changes it.', theme: 'True heroism not in passive endurance but in actively transforming the field of struggle' },
  { author: 'Hakim Shafai Isfahani', farsi: 'آن که دانا بود و خاموش نشست / از آن که نادان بود و پرگو، برتر است', english: 'One who is wise and sits in silence / Is superior to one who is ignorant and talkative.', theme: 'Silent wisdom surpassing loud ignorance as the measure of true intellectual worth' },
  { author: 'Waqif Lahori', farsi: 'عمر گذشت و ما هنوز در آغازیم / که سفر دانش را پایانی نیست', english: 'Life passed and we are still at the beginning / For the journey of knowledge has no end.', theme: 'A life of learning revealing, at its close, that one has only reached the beginning' },
  { author: 'Mirza Talib Amuli', farsi: 'از تجربه چیزی آموختم که از کتاب نیاموختم', english: 'From experience I learned what I could not learn from books.', theme: 'Lived experience as a teacher that surpasses all that can be learned from written texts' },
  { author: 'Mirza Talib Amuli', farsi: 'آن که می‌گوید ولی نمی‌کند، چراغی است که خود را می‌سوزاند', english: 'One who speaks but does not act is a lamp that burns itself.', theme: 'Empty words without corresponding action consuming their speaker like a self-immolating flame' },
  { author: 'Mushfiq Kashifi', farsi: 'ادب تاج سر است / که هر که ادب داشت، سربلند بود', english: 'Courtesy is the crown of the head / Whoever has courtesy walks with head held high.', theme: 'Refined manners and courtesy as the most visible crown of genuine character' },
  { author: 'Maktabi Shirazi', farsi: 'عشق را زبان نیست، اما همه می‌فهمند', english: 'Love has no tongue, yet everyone understands it.', theme: 'Love as a wordless universal language understood across all boundaries of speech' },
  { author: 'Fighani Shirazi', farsi: 'در دل شکسته گنجینه‌ای است / که در دل درست نتوان یافت', english: 'In a broken heart there is a treasure / That cannot be found in an unbroken one.', theme: 'The broken heart as the sacred vessel that holds what the whole, untroubled heart never can' },
  { author: 'Fighani Shirazi', farsi: 'سوختن شمع آن نیست که خاموش شود / بلکه آن است که تا آخر بسوزد', english: 'The burning of a candle is not that it goes out / But that it burns to the very end.', theme: 'A life well lived is one that burns completely and to the end' },
  { author: 'Ahli Shirazi', farsi: 'عشق پیر نمی‌شود / که آتش جوان می‌ماند تا بسوزد', english: 'Love does not grow old / For fire remains young as long as it burns.', theme: 'Love as an eternal fire that remains forever young as long as its flame endures' },
  { author: 'Ahli Shirazi', farsi: 'کسی که خود را نشناخت، دیگران را نخواهد شناخت', english: 'One who has not known themselves will not know others.', theme: 'Self-knowledge as the foundational prerequisite for all genuine knowledge of others' },
  { author: 'Naziri Nishapuri', farsi: 'دریای محبت را ساحل نیست / هر که فرو رفت، راه برگشت نیست', english: 'The ocean of love has no shore / Whoever sinks in it has no way back.', theme: 'True love as a boundless ocean from which there is no return for those who truly enter it' },
  { author: 'Naziri Nishapuri', farsi: 'سخن آینه‌ی دل است / هر چه در دل باشد، در سخن پیداست', english: 'Speech is the mirror of the heart / Whatever is in the heart is visible in speech.', theme: "Every utterance as an involuntary revelation of the heart's true contents" },
  { author: 'Talib Amuli', farsi: 'هنرمند کسی است که از ناچیز، ارزش بسازد', english: 'An artist is one who creates value from the insignificant.', theme: 'Artistic genius as the capacity to transmute the ordinary and overlooked into something of value' },
  { author: 'Saib Tabrizi', farsi: 'خاری که امروز از پا بکشی / دردی است که فردا نخواهی کشید', english: 'A thorn you remove from your foot today / Is a pain you will not endure tomorrow.', theme: 'Dealing with small problems promptly as the surest way to prevent large suffering later' },
  { author: 'Saib Tabrizi', farsi: 'عیب خود دیدن هنر است / که هر که عیب خود دید، راه اصلاح یافت', english: "Seeing one's own faults is an art / For whoever sees their own faults has found the path to correction.", theme: "The rare art of seeing one's own faults clearly as the necessary first step toward correction" },
  { author: 'Saib Tabrizi', farsi: 'از خار تجربه، گل معرفت می‌روید', english: 'From the thorns of experience, the flower of wisdom grows.', theme: 'Painful experience as the thorny soil from which genuine wisdom ultimately flowers' },
  { author: 'Saib Tabrizi', farsi: 'آیینه‌ای باش که عیب نشان دهد / نه دیواری که عیب را پنهان کند', english: 'Be a mirror that reveals flaws / Not a wall that conceals them.', theme: 'Honest, mirror-like friendship that reveals truth as infinitely more valuable than flattering concealment' },
  { author: 'Kalim Kashani', farsi: 'شکستن دل آسان است / ساختن دل سخت‌ترین کار دنیاست', english: 'Breaking a heart is easy / Mending a heart is the hardest work in the world.', theme: 'The ease of destruction versus the immense difficulty of healing and restoration' },
  { author: 'Kalim Kashani', farsi: 'هر که گوشه‌ی عزلت گرفت، با جهانی نشست', english: 'Whoever took a corner of solitude sat with the whole world.', theme: 'The paradox that true solitude opens into the fullest possible encounter with the whole world' },
  { author: 'Zuhuri Tursheizi', farsi: 'قلم فکر را به دام می‌اندازد / که فکر بی‌قلم چون پرنده‌ی بی‌لانه است', english: 'The pen captures thought in its net / For thought without a pen is like a bird without a nest.', theme: 'Writing as the nest that gives thought a fixed dwelling before it flies away forever' },
  { author: 'Zuhuri Tursheizi', farsi: 'از تنهایی نهراس / که تنها آن است که با خود تنهاست', english: 'Do not fear solitude / For truly alone is one who is alone with themselves — and cannot bear it.', theme: 'True loneliness is inner emptiness — those who can dwell with themselves are never truly alone' },
  { author: 'Fayz Kashani', farsi: 'دل به قدر ظرفیت خود می‌گیرد / هر که ظرفش بزرگ‌تر، بیشتر می‌یابد', english: 'The heart receives according to its own capacity / Whoever has the larger vessel finds more.', theme: 'Spiritual receptivity proportional to the breadth and purity of the heart' },
  { author: 'Fayz Kashani', farsi: 'عالم آخرت مزرعه‌ی اعمال دنیاست', english: 'The hereafter is the harvest field of the deeds of this world.', theme: 'The hereafter as the inevitable harvest of every seed of action planted in this life' },
  { author: 'Mir Najat Isfahani', farsi: 'بی‌نیازی از مردم، بزرگ‌ترین ثروت است', english: "Independence from people's approval is the greatest wealth.", theme: "Freedom from dependence on others' approval as the highest and most liberating form of wealth" },
  { author: 'Mir Najat Isfahani', farsi: 'آرامش آن نیست که آشوبی نباشد / بلکه آن است که در آشوب آرام باشی', english: 'Peace is not the absence of turmoil / But the ability to remain calm within turmoil.', theme: 'True inner peace as equanimity maintained in the very midst of chaos and upheaval' },
  { author: 'Mir Najat Isfahani', farsi: 'هر که درد ندید، شادی را نشناخت / که شادی در سایه‌ی درد پرورش می‌یابد', english: 'Whoever has not seen pain has not known joy / For joy is nurtured in the shadow of pain.', theme: 'Joy fully known only by those who have first endured the depth of pain' },
  { author: 'Ghanimat Kunjahi', farsi: 'نغمه‌ی دل را کسی می‌شنود / که خود دلی داشته باشد', english: 'The melody of the heart is heard only by one / Who themselves possesses a heart.', theme: 'Only those who have cultivated genuine feeling can perceive and receive the feelings of others' },
  { author: 'Arzu Khurasani', farsi: 'آن که سخن بسیار گوید، کم می‌اندیشد / آن که کم گوید، بسیار می‌اندیشد', english: 'One who speaks much thinks little / One who speaks little thinks much.', theme: 'The inverse relationship between the volume of speech and the depth of thought' },
  { author: 'Hatim Tai', farsi: 'آنچه دادم را دارم / آنچه خوردم رفت / آنچه اندوختم نه از من ماند نه از دیگران', english: 'What I gave, I still possess / What I ate is gone / What I hoarded remained for neither me nor others.', theme: 'The paradox of giving: only what is given away is truly and permanently possessed' },
  { author: 'Rumi', farsi: 'نه شرقی‌ام نه غربی / من نه از زمینم نه از آسمان / نه از آب و خاکم نه از بادم', english: 'I am neither Eastern nor Western / I am neither of the earth nor of the heavens / I am neither of water and earth, nor of wind.', theme: "The mystic's identity as universal — beyond all geographic, elemental, and temporal categories" },
  { author: 'Rumi', farsi: 'جان که فارغ شد از عشق، مُرد / زندگانی عاشقی را بُرد', english: 'The soul that became free of love, died / It is love that sustains all life.', theme: 'Love as the animating principle of existence — without it the soul is merely dead' },
  { author: 'Rumi', farsi: 'تن آدمی شریف است به جان آدمی / نه به جامه‌ی زری و ابریشمی', english: 'The human body is ennobled by the human soul / Not by garments of gold thread and silk.', theme: "Human dignity rooted solely in the soul's quality, not in external wealth or adornment" },
  { author: 'Hafez', farsi: 'مرا روزی است با آن ماه روی / که هم شب باشد آن روز و هم روی', english: 'I have a day with that moon-faced beloved / Where that day is both night and bright day.', theme: "Love's union as a state beyond ordinary time where day and night are dissolved into one" },
  { author: 'Hafez', farsi: 'عیب رندان مکن ای زاهد پاکیزه سرشت / که گناه دگران بر تو نخواهند نوشت', english: 'Do not blame the pleasure-seekers, O pure-natured ascetic / For the sins of others will not be written against your account.', theme: 'Each person accountable only for their own deeds — judging others serves no moral purpose' },
  { author: 'Hafez', farsi: 'عشق آتش است و من پروانه‌وار / می‌سوزم و می‌چرخم بر گِرد یار', english: 'Love is fire and I, like a moth / Burn and circle around my beloved.', theme: "The lover's willing self-immolation in the fire of love, like a moth circling a flame" },
  { author: 'Saadi', farsi: 'هر که پند نپذیرد، آزموده باید که بیند / آزموده را آزمودن خطاست', english: 'Whoever does not accept counsel must learn through experience / But to repeat what has already been experienced is an error.', theme: 'The highest error is to repeat what experience has already taught — counsel exists to spare us this' },
  { author: 'Saadi', farsi: 'خدا را بر آن بنده بخشایش است / که خلق از وجودش در آسایش است', english: "God's mercy is upon the servant / Whose existence brings ease to others.", theme: 'Divine grace flowing most abundantly to those whose presence brings peace and relief to others' },
  { author: 'Saadi', farsi: 'هنر چشمه است و جهل بیابان / هنرمند سیراب است و نادان تشنه', english: 'Skill is a spring and ignorance a desert / The skilled one is sated and the ignorant one thirsts.', theme: 'Cultivated skill as an inexhaustible spring against the barren thirst of ignorance' },
  { author: 'Omar Khayyam', farsi: 'ما لعبتگانیم و فلک لعبت‌باز / از روی حقیقتی نه از روی مجاز', english: 'We are the puppets and the sky is the puppet-master / This is a reality, not a metaphor.', theme: 'The sober philosophical recognition that human free will may be largely an illusion of cosmic fate' },
  { author: 'Omar Khayyam', farsi: 'من می‌خورم و هر که چو من اهل بود / می خوردن من به نزد او سهل بود', english: 'I drink wine, and whoever is like me in knowledge / Will find my wine-drinking an easy matter.', theme: 'Tolerance as the natural fruit of genuine understanding and philosophical depth' },
  { author: 'Attar', farsi: 'مرغ دلم در قفس تن محبوس است / کی آزاد شوم؟ وقتی که تن را فراموش کنم', english: 'The bird of my heart is imprisoned in the cage of the body / When will I be free? When I forget the body.', theme: 'Liberation of the soul achieved through transcendence and forgetting of bodily identity' },
  { author: 'Attar', farsi: 'آن که طالب حقیقت است، اول باید کاذب را بشناسد', english: 'One who seeks truth must first learn to recognize falsehood.', theme: 'Discernment of falsehood as the necessary first step on any genuine path toward truth' },
  { author: 'Nizami Ganjavi', farsi: 'دل سلطان است و تن کشور او / آن که دل را گرفت، کشور را گرفت', english: 'The heart is the sultan and the body its kingdom / Whoever captures the heart captures the kingdom.', theme: 'The heart as the true seat of sovereign power — conquer it and all else follows' },
  { author: 'Nizami Ganjavi', farsi: 'قصه‌گو حکیم است اگر قصه درست باشد / که داستان آیینه‌ی روزگار است', english: 'The storyteller is a sage if the story is true / For the tale is the mirror of the age.', theme: 'True storytelling as a form of wisdom that holds up a mirror to the truth of its era' },
  { author: 'Fakhruddin Gurgani', farsi: 'آن که در درد است، دل را می‌شناسد / آن که در راحتی است، از دل بی‌خبر است', english: 'One who is in pain knows the heart / One who is in comfort is ignorant of the heart.', theme: 'Suffering as the tutor that teaches genuine knowledge of the human heart' },
  { author: 'Sanai', farsi: 'نفس خود را بشناس پیش از آنکه دیگری تو را بشناساند', english: 'Know your own ego before another reveals it to you.', theme: "Proactive self-knowledge as protection against the humiliation of having one's flaws exposed by others" },
  { author: 'Sanai', farsi: 'هر که آموخت و عمل نکرد / دانشش زنگ زد و ضایع شد', english: 'Whoever learned but did not act / Their knowledge rusted and went to waste.', theme: 'Knowledge left unapplied rusts and deteriorates like an unused tool left to the weather' },
  { author: 'Jami', farsi: 'عالم هستی آینه‌ی حق است / هر که را چشم باز باشد، حق را بیند', english: 'The world of existence is the mirror of the divine / Whoever has open eyes sees the divine in it.', theme: 'The entire world as a vast mirror of the divine for those with the clarity of vision to see it' },
  { author: 'Jami', farsi: 'دانا بر نادان رحم آورد / که نادان ره گم کرده است و خود نمی‌داند', english: 'The wise shows compassion to the ignorant / For the ignorant has lost the way and does not know it.', theme: 'The truly wise respond to ignorance not with contempt but with compassion for the lost' },
  { author: 'Abu Said Abil Kheir', farsi: 'هر که در کوی عشق قدم نهاد / از خود بیرون آمد و به حق رسید', english: 'Whoever set foot in the lane of love / Stepped out of themselves and arrived at the divine.', theme: 'Love as the precise pathway out of the imprisoning self and into the freedom of the divine' },
  { author: 'Abu Said Abil Kheir', farsi: 'تصوف آن است که آنچه داری بدهی / و آنچه نداری بیابی', english: 'Sufism is to give away what you have / And to find what you do not have.', theme: 'Sufi poverty as a paradox: emptying oneself of what is possessed to gain what cannot be possessed' },
  { author: 'Ruzbihan Baqli', farsi: 'زیبایی تجلی حق است و دیدار آن عبادت', english: 'Beauty is the manifestation of the divine, and beholding it is worship.', theme: 'The contemplation of beauty as a legitimate and genuine form of spiritual worship' },
  { author: 'Ruzbihan Baqli', farsi: 'عارف در هر صورتی جمال حق را می‌بیند', english: 'The mystic sees the beauty of the divine in every form.', theme: 'Mystical vision that perceives the divine beauty shining through every created form' },
  { author: 'Ruzbihan Baqli', farsi: 'عشق حقیقی آن است که نه از ترس باشد نه از طمع / بلکه از سرشت ذات', english: 'True love is that which comes neither from fear nor from greed / But from the very nature of being.', theme: 'Authentic love arising purely from the innermost nature of being — untainted by fear or desire' },
  { author: 'Shabestari', farsi: 'هر که بیرون جست از خود را / یافت در هر ذره معشوق خود را', english: 'Whoever sought outside themselves / Found their beloved in every particle.', theme: "Stepping outside the self reveals the beloved's presence in every particle of existence" },
  { author: 'Iqbal', farsi: 'در سینه‌ی کوه آتشفشانی است / در سینه‌ی مرد همتی والاست', english: 'Within the mountain lies a volcano / Within the person of high resolve lies a noble aspiration.', theme: 'The dormant volcanic power within every person of genuine aspiration and resolve' },
  { author: 'Iqbal', farsi: 'از خاک برخیز و آسمانی شو / که خاک تو را نگه نمی‌دارد', english: 'Rise from the earth and become heavenly / For the earth cannot hold you.', theme: "The divine summons to transcend earthly limitations and rise to one's heavenly potential" },
  { author: 'Persian Proverb', farsi: 'هر که گندم کارد، گندم درود / هر که جو کارد، جو درود', english: 'Whoever plants wheat, harvests wheat / Whoever plants barley, harvests barley.', theme: 'The exact and reliable correspondence between what one plants in life and what one harvests' },
  { author: 'Persian Proverb', farsi: 'آتش که نداری، دود هم نداری', english: 'If you have no fire, you have no smoke either.', theme: 'Every visible effect proves an invisible cause — where there is no fire, no smoke can exist' },
  { author: 'Persian Proverb', farsi: 'آنقدر بزن که پنبه دنده شود', english: 'Strike until the cotton becomes thread.', theme: 'Sustained, patient effort as the force that transforms raw potential into refined product' },
  { author: 'Persian Proverb', farsi: 'آش نخورده دهان سوخته', english: 'The mouth burned from soup not yet eaten.', theme: 'The futility of suffering in anticipation of a harm that may never actually arrive' },
  { author: 'Persian Proverb', farsi: 'کبوتر با کبوتر، باز با باز / کند هم‌جنس با هم‌جنس پرواز', english: 'Dove with dove, hawk with hawk / Like flies with like through the air.', theme: 'The natural law that like seeks like — people of similar nature are inevitably drawn together' },
  { author: 'Persian Proverb', farsi: 'کار امروز را به فردا میفکن', english: "Do not cast today's work to tomorrow.", theme: 'The fundamental discipline of addressing the present task rather than deferring it to tomorrow' },
  { author: 'Persian Proverb', farsi: 'درد بی‌درمان نیست جز مرگ', english: 'There is no incurable pain except death.', theme: 'The radical hopefulness that declares all pain curable — only death itself has no remedy' },
  { author: 'Persian Proverb', farsi: 'نه هر که چهره برافروخت دلبری داند', english: 'Not everyone who brightens their face knows how to win hearts.', theme: 'Outward attractiveness without inner substance unable to captivate a discerning heart' },
  { author: 'Persian Proverb', farsi: 'گربه را دُم بریده به خانه می‌آید', english: 'The cat comes home with its tail cut off.', theme: 'One who has done wrong inevitably returns bearing the visible marks of the consequences' },
  { author: 'Persian Proverb', farsi: 'چراغی که به خانه رواست، به مسجد حرام است', english: 'The lamp that is right for the home is forbidden in the mosque.', theme: 'The importance of context in determining the appropriateness of any action or thing' },
  { author: 'Fakhr al-Din al-Razi', farsi: 'سؤال پرسیدن نصف علم است', english: 'Asking a question is half of knowledge.', theme: 'The act of asking the right question as itself constituting half the journey toward knowledge' },
  { author: 'Mulla Sadra', farsi: 'شادی حقیقی از معرفت است نه از لذت', english: 'True joy comes from knowledge, not from pleasure.', theme: 'Distinguishing the shallow happiness of pleasure from the deep joy of genuine understanding' },
  { author: 'Suhrawardi', farsi: 'اشراق دیدنی است نه گفتنی', english: 'Illumination is to be seen, not to be spoken.', theme: 'Mystical illumination as a direct experience that fundamentally transcends verbal expression' },
  { author: 'Shams-i-Tabrizi', farsi: 'آن که می‌گوید می‌دانم، کم‌تر می‌داند / آن که می‌گوید نمی‌دانم، بیشتر می‌داند', english: "One who says 'I know' knows less / One who says 'I do not know' knows more.", theme: 'The deepest paradox of knowledge: certainty signals shallowness while uncertainty signals depth' },
  { author: 'Simin Behbahani', farsi: 'از خاک برمی‌خیزم، چون گل / و با باد می‌روم، چون ابر', english: 'I rise from the earth like a flower / And go with the wind, like a cloud.', theme: 'The human life as flowering from the earth and drifting with the wind — beautiful and impermanent' },
  { author: 'Ayn al-Qudat Hamadani', farsi: 'کسی که حقیقت را دید، از هر دو دنیا گذشت', english: 'Whoever has seen the truth has passed beyond both worlds.', theme: 'True perception of reality as a state that transcends both the present and the future world' },
  { author: 'Bidel Dehlavi', farsi: 'جهان آیینه‌ای است که در آن خود را می‌بینی / اگر دیدی که چه هستی، دیدی که جهان چیست', english: 'The world is a mirror in which you see yourself / If you see what you are, you see what the world is.', theme: 'The world as the mirror of the self — knowing oneself is knowing the nature of all existence' },
  { author: 'Saib Tabrizi', farsi: 'دشمن دانا به از دوست نادان / که دوست نادان خانه‌ات را ویران کند', english: 'A wise enemy is better than an ignorant friend / For the ignorant friend can ruin your house.', theme: 'The danger of well-meaning ignorance surpassing the danger of conscious enmity' },
  { author: 'Fighani Shirazi', farsi: 'گر صبر کنی، ز غوره انگور شود / وز انگور می ناب، ز می هوش ربود', english: 'If you are patient, the unripe grape becomes a grape / From the grape comes pure wine, and from wine comes transported awareness.', theme: 'The chain of patient transformation from raw beginnings to the highest states of awareness' },
  { author: 'Hatif Isfahani', farsi: 'گر مؤمن و گر کافر، عاشق همه را / در کوی محبت راه است و مقام', english: 'Whether believer or unbeliever, love embraces all / In the lane of devotion there is a path and a station for each.', theme: "Love's lane as open to all human beings regardless of faith or creed" },
  { author: 'Kalim Kashani', farsi: 'وقت گذشته باز نمی‌گردد / پس امروز را دریاب که فردا نیست', english: 'Time that has passed does not return / So seize today for there may be no tomorrow.', theme: 'The irreversibility of time as the most powerful argument for seizing the present moment' },
  { author: 'Nima Yushij', farsi: 'من می‌نویسم پس هستم / که قلم تنها گواه وجود من است', english: 'I write, therefore I am / For the pen is the only witness to my existence.', theme: "The act of writing as the fundamental act of self-affirmation and proof of one's existence" },
  { author: 'Mehdi Akhavan-Sales', farsi: 'ما سرزمین عجیبی داریم / که درد آن شیرین‌تر از شادی‌های دیگران است', english: "We have a strange homeland / Whose pain is sweeter than other people's joys.", theme: "The paradoxical sweetness of suffering for one's homeland that surpasses foreign joy" },
  { author: 'Forughi Bastami', farsi: 'عشق اول قدم است و آخرین / که از اول تا به آخر عشق باید رفت', english: 'Love is the first step and the last / For from beginning to end, one must travel with love.', theme: 'Love as both the beginning and the end of the journey — the alpha and omega of all seeking' },
  { author: 'Forughi Bastami', farsi: 'دل بی‌عشق ویران است / عشق است که خانه‌ی دل را آباد می‌کند', english: 'A heart without love is a ruin / It is love that causes the house of the heart to flourish.', theme: 'Love as the only force capable of transforming the heart from ruin to flourishing dwelling' },
  { author: 'Yahya ibn Muadh al-Razi', farsi: 'امید به خدا بیشتر از ترس از خدا ثمر می‌دهد', english: 'Hope in God bears more fruit than fear of God.', theme: 'Divine hope as a more generative and creative spiritual force than divine fear' },
  { author: 'Sanai', farsi: 'علم ظاهر است و علم باطن / ظاهر برای تن و باطن برای جان', english: 'There is outward knowledge and inward knowledge / The outward is for the body and the inward for the soul.', theme: 'The necessary distinction between external knowledge serving the body and inner knowledge feeding the soul' },
  { author: 'Qabus', farsi: 'هر که راز خود به دشمن گفت / دشمن را سلاح داد', english: 'Whoever reveals their secret to an enemy / Has given the enemy a weapon.', theme: "Careless disclosure of one's vulnerabilities as the act of arming one's own enemy" },
  { author: 'Nasir al-Din Tusi', farsi: 'معاشرت با نیکان نیکی را آموزد / معاشرت با بدان بدی را تعلیم دهد', english: 'Association with the good teaches goodness / Association with the bad teaches evil.', theme: "The moral environment of one's companions as the most reliable teacher of character" },
  { author: 'Shah Nimatullah Wali', farsi: 'در هر قدم که برمی‌داری، جهانی تازه پیش روست', english: 'With every step you take, a new world lies ahead.', theme: 'Each step forward revealing a entirely new world of possibility previously invisible' },
  { author: 'Mir Damad', farsi: 'حکیم آن است که از ظاهر به باطن و از باطن به حق برسد', english: 'The philosopher is one who travels from the outward to the inward, and from the inward to the divine.', theme: "The philosopher's path as a threefold journey from surface appearances to inner truth to the divine" }
];

const authorMap: Record<string, string> = {
  'Ferdowsi': 'ferdowsi', 'Abu Nasr al-Farabi': 'abu-nasr-al-farabi', 'Ikhwan al-Safa': 'ikhwan-al-safa',
  'Zakariya al-Razi': 'zakariya-al-razi', 'Al-Biruni': 'al-biruni', 'Khwandamir': 'khwandamir',
  'Vasifi': 'vasifi', 'Jalaluddin Davani': 'jalaluddin-davani', 'Lutfi of Samarkand': 'lutfi-of-samarkand',
  'Hilali Jagatai': 'hilali-jagatai', 'Mushtaq Ali Shah': 'mushtaq-ali-shah', 'Hazin Lahiji': 'hazin-lahiji',
  'Shah Nimatullah Wali': 'shah-nimatullah-wali', 'Qadir Khan Khattak': 'qadir-khan-khattak',
  'Hakim Shafai Isfahani': 'hakim-shafai-isfahani', 'Waqif Lahori': 'waqif-lahori', 'Mirza Talib Amuli': 'mirza-talib-amuli',
  'Mushfiq Kashifi': 'mushfiq-kashifi', 'Maktabi Shirazi': 'maktabi-shirazi', 'Fighani Shirazi': 'fighani-shirazi',
  'Ahli Shirazi': 'ahli-shirazi', 'Naziri Nishapuri': 'naziri-nishapuri', 'Talib Amuli': 'talib-amuli',
  'Saib Tabrizi': 'saib-tabrizi', 'Kalim Kashani': 'kalim-kashani', 'Zuhuri Tursheizi': 'zuhuri-tursheizi',
  'Fayz Kashani': 'fayz-kashani', 'Mir Najat Isfahani': 'mir-najat-isfahani', 'Ghanimat Kunjahi': 'ghanimat-kunjahi',
  'Arzu Khurasani': 'arzu-khurasani', 'Hatim Tai': 'hatim-tai', 'Rumi': 'rumi', 'Hafez': 'hafez',
  'Saadi': 'saadi', 'Omar Khayyam': 'unknown', 'Attar': 'attar', 'Nizami Ganjavi': 'nizami',
  'Fakhruddin Gurgani': 'fakhruddin-gurgani', 'Sanai': 'sanai', 'Jami': 'jami', 'Abu Said Abil Kheir': 'abu-said-abil-kheir',
  'Ruzbihan Baqli': 'ruzbihan-baqli', 'Shabestari': 'shabestari', 'Iqbal': 'iqbal', 'Persian Proverb': 'unknown',
  'Fakhr al-Din al-Razi': 'fakhr-al-din-al-razi', 'Mulla Sadra': 'mulla-sadra', 'Suhrawardi': 'suhrawardi',
  'Shams-i-Tabrizi': 'shams-i-tabrizi', 'Simin Behbahani': 'simin-behbahani', 'Ayn al-Qudat Hamadani': 'ayn-al-qudat-hamadani',
  'Bidel Dehlavi': 'bidel-dehlavi', 'Nima Yushij': 'nima-yushij', 'Mehdi Akhavan-Sales': 'mehdi-akhavan-sales',
  'Forughi Bastami': 'forughi-bastami', 'Yahya ibn Muadh al-Razi': 'yahya-ibn-muadh-al-razi',
  'Qabus': 'qabus', 'Nasir al-Din Tusi': 'nasir-al-din-tusi', 'Mir Damad': 'mir-damad'
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
        summary: q.theme,
        sourceWork: 'Persian Poetry',
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
