import mongoose from 'mongoose';

const quotes = [
  { author: 'Rumi', farsi: 'بشنو این نی چون شکایت می‌کند / از جدایی‌ها حکایت می‌کند', english: 'Listen to the reed, how it tells a tale of separations / It complains of the pain of longing.', theme: 'The soul yearning for its divine origin' },
  { author: 'Rumi', farsi: 'آتش عشق است کاندر نی فتاد / جوشش عشق است کاندر می فتاد', english: 'The fire of love has fallen into the reed / The ferment of love has fallen into the wine.', theme: 'The transformative power of divine love' },
  { author: 'Rumi', farsi: 'خاموشی دریای علم است و کلام / چون کف دریا و دریا خود تمام', english: 'Silence is the ocean of knowledge, and speech is like its foam / The ocean itself is whole.', theme: 'The virtue of silence over idle speech' },
  { author: 'Rumi', farsi: 'ما کجا بودیم کاین آتش نبود / عاشقی آتش است و دل هیزم', english: 'Where were we when this fire did not exist? / Love is fire and the heart is its wood.', theme: 'Love as a consuming and purifying force' },
  { author: 'Rumi', farsi: 'هین مگو فردا که فرداها گذشت / تا به کی ای سست عنصر روز هشت', english: 'Say not tomorrow, for many tomorrows have passed / How long will you procrastinate, O weak one?', theme: 'The importance of acting in the present moment' },
  { author: 'Rumi', farsi: 'آدمی را ضیف روز شمار نیست / بلکه ضیف جان که آن بی مار نیست', english: 'A person is not a guest for a few days only / But a guest of the soul, which is eternal.', theme: 'The eternal nature of the soul beyond physical existence' },
  { author: 'Rumi', farsi: 'گر نه‌ای در بند، چون زندانیان / تو هم آزادی ز قید جسم و جان', english: 'If you are not imprisoned like prisoners / You too are free from the bondage of body and soul.', theme: 'Inner freedom beyond physical constraints' },
  { author: 'Rumi', farsi: 'هر که را اسرار حق آموخت رفت / محرم این هوش جز بی‌هوش نیست', english: 'Whoever was taught the secrets of God, departed / No one is privy to this awareness except the one who has lost awareness.', theme: 'Divine secrets are revealed only in states of selfless surrender' },
  { author: 'Rumi', farsi: 'عقل قربانی کن اندر پای عشق / عقل را جز عشق نبود جای عشق', english: 'Sacrifice reason at the feet of love / Reason has no place except at the abode of love.', theme: 'Love transcends rational understanding' },
  { author: 'Rumi', farsi: 'در درون من بجز عشق تو نیست / جایگاه غیر تو در دل نیست', english: 'Within me there is nothing but love of you / There is no place in my heart for anyone but you.', theme: 'Total devotion and union with the beloved' },
  { author: 'Rumi', farsi: 'من کجا بودم که خود را گم کنم / تا که پیدا گردم اندر تو همی', english: 'Where was I that I lost myself / So that I may find myself within you.', theme: 'Finding the self through losing the ego in the divine' },
  { author: 'Rumi', farsi: 'از کجا آمده‌ام، آمدنم بهر چه بود / به کجا می‌روم آخر، ننمایی وطنم', english: 'Where have I come from, what was the purpose of my coming / Where am I going, wont you show me my homeland?', theme: 'Questioning the origin and purpose of human existence' },
  { author: 'Hafez', farsi: 'الا یا ایها الساقی ادر کأساً و ناولها / که عشق آسان نمود اول ولی افتاد مشکل‌ها', english: 'Ho! Cupbearer, pass around and offer the bowl / For love seemed easy at first, but difficulties arose.', theme: 'Love deceptive ease that reveals deep complexity' },
  { author: 'Hafez', farsi: 'دل می‌رود ز دستم صاحب‌دلان خدا را / دردا که راز پنهان خواهد شد آشکارا', english: 'My heart is slipping from my grasp, O wise ones, for God sake / Alas, the hidden secret will soon be revealed.', theme: 'The uncontrollable nature of love and longing' },
  { author: 'Hafez', farsi: 'می‌خور که عقل را نکند عیب زاهدان / یک جرعه می بهست ز صد من پرهیزکاری', english: 'Drink wine, for the righteous will not be faulted by the pious / A single sip of wine is worth more than a hundred measures of piety.', theme: 'Authentic joy versus performative piety' },
  { author: 'Hafez', farsi: 'حافظ این حال عجب با که توان گفت که ما / بلبلانیم که در موسم گل خاموشیم', english: 'Hafez, to whom can one tell this strange state: / We are nightingales who are silent in the season of roses.', theme: 'The paradox of being silenced by overwhelming beauty' },
  { author: 'Hafez', farsi: 'مژده ای دل که دگر باد صبا بازآمد / هدهد خوش خبر از طرف سبا بازآمد', english: 'Good news, O heart, the morning breeze returns / The good-news hoopoe returns from the land of Sheba.', theme: 'Hope and renewal after hardship' },
  { author: 'Hafez', farsi: 'بیا که قصر امل سخت سست بنیاد است / بیار باده که بنیاد عمر بر باد است', english: 'Come, for the palace of hope has a very weak foundation / Bring wine, for the foundation of life is built on wind.', theme: 'The fragility of human hopes and the brevity of life' },
  { author: 'Hafez', farsi: 'عیب می‌جویان نکو باشد که عیب خود ببینند / گر چه از آیینه سیمی عیب می‌جو می‌نشیند', english: 'It would be good for fault-finders to see their own faults / Though from a silver mirror, the fault-finder is not satisfied.', theme: 'The hypocrisy of judging others while ignoring own faults' },
  { author: 'Hafez', farsi: 'غم دنیا مخور ای دل که غم دنیا را / نه مقیمی نه مسافر، همه یاران گذرانند', english: 'Do not grieve the sorrows of the world, O heart / For the world guests neither stay permanently nor depart — all companions are passing.', theme: 'The transient nature of worldly attachments' },
  { author: 'Saadi', farsi: 'بنی آدم اعضای یک پیکرند / که در آفرینش ز یک گوهرند', english: 'Human beings are members of a whole / In creation, of one essence and soul.', theme: 'The fundamental unity and brotherhood of all human beings' },
  { author: 'Saadi', farsi: 'چو عضوی به درد آورد روزگار / دگر عضوها را نماند قرار', english: 'If one member suffers affliction / The other members cannot remain at rest.', theme: 'Human empathy as a moral imperative' },
  { author: 'Saadi', farsi: 'تو کز محنت دیگران بی‌غمی / نشاید که نامت نهند آدمی', english: 'If you are indifferent to the suffering of others / You do not deserve to be called a human being.', theme: 'Empathy as the defining quality of humanity' },
  { author: 'Saadi', farsi: 'سعدیا مرد نکونام نمیرد هرگز / مرده آن است که نامش به نکویی نبرند', english: 'Saadi, a man of good name never truly dies / Dead is the one whose name is not spoken with goodness.', theme: 'The immortality of a good reputation and legacy' },
  { author: 'Saadi', farsi: 'هر که نان از عمل خویش خورد / منت حاتم طایی نبرد', english: 'Whoever earns bread through his own labor / Need not be grateful to even the most generous benefactor.', theme: 'The dignity and independence of earning through own effort' },
  { author: 'Saadi', farsi: 'توانا بود هر که دانا بود / ز دانش دل پیر برنا بود', english: 'Whoever is wise shall be powerful / Through knowledge, even an old heart becomes young.', theme: 'Knowledge as the source of true power and vitality' },
  { author: 'Saadi', farsi: 'علم را چون آموختی بیاموز / دانش نو را که هست هر روز نو', english: 'When you have learned, learn again / For knowledge is new every day.', theme: 'The continuous and never-ending pursuit of knowledge' },
  { author: 'Saadi', farsi: 'دروغ مصلحت‌آمیز به از راست فتنه‌انگیز', english: 'A lie that brings peace is better than a truth that stirs up strife.', theme: 'The ethical complexity of truth versus social harmony' },
  { author: 'Saadi', farsi: 'اگر بدی کنی انتظار بدی داشته باش', english: 'If you do evil, expect evil in return.', theme: 'The law of moral cause and effect' },
  { author: 'Saadi', farsi: 'گر صبر کنی ز غوره حلوا سازی', english: 'If you are patient, you can make candy from an unripe grape.', theme: 'Patience as the means of transforming hardship into sweetness' },
  { author: 'Saadi', farsi: 'آدمی زاده طرفه معجونی است / کز فرشته سرشته و از حیوان', english: 'The human being is a wondrous compound / Made from both the angel and the animal.', theme: 'The dual nature of humanity between divine and animal instincts' },
  { author: 'Omar Khayyam', farsi: 'خیام اگر ز باده مستی خوش باش / با ماهرخی اگر نشستی خوش باش', english: 'Khayyam, if you are drunk with wine, be happy / If you sit with a moon-faced beauty, be happy.', theme: 'Embracing the present joys of life' },
  { author: 'Omar Khayyam', farsi: 'هر کاسه‌ای که شکست و هر جام که ریخت / از دستاجل بود، نه از جور فلک', english: 'Every bowl that shattered, every cup that spilled / Was by the hand of fate, not by the cruelty of the sky.', theme: 'Acceptance of fate as the governing force of existence' },
  { author: 'Omar Khayyam', farsi: 'آمدنم به عالم از بهر چه بود / رفتن من چرا و کجا بود و چه سود', english: 'Why did I come into this world? / Why must I go and where, and what is the gain?', theme: 'The fundamental philosophical questioning of human existence' },
  { author: 'Omar Khayyam', farsi: 'دریاب که از روح جدا خواهی رفت / در پرده اسرار فنا خواهی رفت', english: 'Realize that you will depart from your soul / You will disappear behind the veil of secrets.', theme: 'Awareness of mortality as a guide for living' },
  { author: 'Omar Khayyam', farsi: 'هر بامداد کز نو دمد آفتاب / یک روز ز عمر ما رود در حساب', english: 'Every morning when the sun rises anew / One day of our life is counted away.', theme: 'The continuous passage of time as a reminder of mortality' },
  { author: 'Omar Khayyam', farsi: 'این قافله عمر عجب می‌گذرد / دریاب دمی که با طرب می‌گذرد', english: 'This caravan of life passes by strangely / Seize the moment that passes in joy.', theme: 'Seizing joyful moments as life passes swiftly' },
  { author: 'Omar Khayyam', farsi: 'می خور که ز دوزخ و بهشتت ندهند / کس راه درست بر سر راه نشان', english: 'Drink wine, for no one will give you a true map to paradise or hell / The true path is uncertain.', theme: 'Skepticism about religious certainties and the value of present joy' },
  { author: 'Omar Khayyam', farsi: 'پیش از من و تو لیل و نهاری بوده است / گردنده فلک نیز به کاری بوده است', english: 'Before you and I, there was day and night / The turning sky was also at work before us.', theme: 'Human smallness in the face of cosmic time' },
  { author: 'Ferdowsi', farsi: 'توانا بود هر که دانا بود / ز دانش دل پیر برنا بود', english: 'The one who knows is truly powerful / Through knowledge, even an aged heart stays young.', theme: 'Knowledge as the foundation of true power' },
  { author: 'Ferdowsi', farsi: 'کسی کو خرد را ندارد ز پیش / دلش گردد از کرده خویش ریش', english: 'He who does not possess wisdom beforehand / Will have his heart wounded by his own deeds.', theme: 'The necessity of wisdom to avoid self-inflicted suffering' },
  { author: 'Ferdowsi', farsi: 'میازار موری که دانه‌کش است / که جان دارد و جان شیرین خوش است', english: 'Do not hurt even an ant that is carrying its grain / For it has a life, and life is sweet.', theme: 'The sanctity of all life and universal compassion' },
  { author: 'Ferdowsi', farsi: 'بزرگی از آن باشد که خوی بد ندارد / نه از گوهر و تخت و افسر و داد', english: 'Greatness comes from having no bad character / Not from lineage, throne, crown, or power.', theme: 'True greatness resides in moral character, not status or lineage' },
  { author: 'Ferdowsi', farsi: 'چو ایران نباشد تن من مباد / بدین بوم و بر زنده یک تن مباد', english: 'If Iran is no more, let my body cease to be / Let not a single soul live on this land.', theme: 'Profound love and devotion to homeland' },
  { author: 'Ferdowsi', farsi: 'دانش و دین، بهترین سفرند', english: 'Knowledge and faith are the best companions for the journey of life.', theme: 'Knowledge and spirituality as guides through life journey' },
  { author: 'Nizami Ganjavi', farsi: 'عشق آتشی است که هر کجا افتد / همه چیز را در خود می‌کشد', english: 'Love is a fire that, wherever it falls / Consumes everything within itself.', theme: 'The all-consuming and transformative power of love' },
  { author: 'Nizami Ganjavi', farsi: 'صبر تلخ است ولی میوه‌اش شیرین بود', english: 'Patience is bitter, but its fruit is sweet.', theme: 'The sweet reward that follows the bitterness of patience' },
  { author: 'Nizami Ganjavi', farsi: 'خرد را چراغ ره باید کرد / همیشه به دانش دل شاد کرد', english: 'One must make wisdom the lamp of the path / Always rejoice the heart with knowledge.', theme: 'Wisdom and knowledge as the light guiding one path' },
  { author: 'Nizami Ganjavi', farsi: 'نیکی‌ای کن در این دو روز جهان / تا بمانی در جهان جاودان', english: 'Do good in these brief two days of the world / So that you may remain eternally in the world.', theme: 'Goodness as the means to lasting legacy and eternal life' },
  { author: 'Attar', farsi: 'هر کسی کو دور ماند از اصل خویش / باز جوید روزگار وصل خویش', english: 'Whoever remains far from their origin / Seeks again the time of reunion.', theme: 'The soul eternal longing to return to its divine source' },
  { author: 'Attar', farsi: 'سالک اندر راه باید صادق بود / در طریقت راه باید راستق بود', english: 'The spiritual seeker must be truthful on the path / In the mystical way, one must be sincere.', theme: 'Sincerity and truthfulness as requirements for the spiritual path' },
  { author: 'Attar', farsi: 'مرگ آن‌گاه شاد باید خواند / که مرد از مرگ ترسیدن نداند', english: 'Death should be welcomed joyfully / When a man no longer fears it.', theme: 'The spiritual warrior fearless acceptance of death' },
  { author: 'Attar', farsi: 'خود را بشناس پیش از آنکه دیر شود / که آگاهی ز خود، کلید هر دری بود', english: 'Know yourself before it is too late / For self-knowledge is the key to every door.', theme: 'Self-knowledge as the master key to all wisdom and liberation' },
  { author: 'Attar', farsi: 'جهان را پایداری نیست هیچ / مرو در پی او که دامی بیش نیست', english: 'This world has no permanence / Do not chase it, for it is nothing but a trap.', theme: 'Detachment from the impermanent material world' },
  { author: 'Attar', farsi: 'در ره منزل لیلی که خطرهاست در آن / شرط اول قدم آن است که مجنون باشی', english: 'On the path to Layla dwelling, fraught with dangers / The first step condition is that you must be a Majnun (madly in love).', theme: 'Total surrender and madness in love as the prerequisite for spiritual union' },
  { author: 'Ibn Sina', farsi: 'جهانم آرزو دارد که شادمان باشم / اگر به علم و خرد خویشتن بیاراشم', english: 'The world wishes that I be joyful / If I adorn myself with knowledge and reason.', theme: 'Knowledge and reason as the source of true happiness and fulfillment' },
  { author: 'Ibn Sina', farsi: 'دانشمند کسی است که می‌داند که نمی‌داند', english: 'A truly learned person is one who knows that he does not know.', theme: 'True wisdom begins with the recognition of own ignorance' },
  { author: 'Ibn Sina', farsi: 'خواب برادر مرگ است، پس مرگ را دوست بدار', english: 'Sleep is the brother of death, so make friends with death.', theme: 'Philosophical acceptance of death through familiarity with rest' },
  { author: 'Ibn Sina', farsi: 'بهترین داروی دل، امید است', english: 'The best medicine for the heart is hope.', theme: 'Hope as the most powerful remedy for the human heart' },
  { author: 'Naser Khosrow', farsi: 'علم بیاموز تا بر دشمن فضل یابی / دانش بجوی تا ز بدان برتر آیی', english: 'Learn knowledge so that you may surpass your enemy in virtue / Seek wisdom so that you may rise above the wicked.', theme: 'Knowledge as the means to achieve moral and intellectual superiority' },
  { author: 'Naser Khosrow', farsi: 'آن که نیک است، نیک‌نامی یابد / آن که بد است، بد نشانی یابد', english: 'He who is good will earn a good name / He who is evil will earn an evil mark.', theme: 'Good character as the foundation of lasting good reputation' },
  { author: 'Naser Khosrow', farsi: 'خوشی دنیا فریب است و غرور / از خوشی‌های دنیا پرهیز کن', english: 'The pleasures of the world are deception and pride / Beware of the pleasures of the world.', theme: 'Caution against being deceived by the transient pleasures of the world' },
  { author: 'Sanai', farsi: 'عشق، عقل را مسخر می‌کند / هر دلی را در خود محو می‌کند', english: 'Love conquers reason / It dissolves every heart within itself.', theme: 'Divine love as a force that surpasses and dissolves rational thought' },
  { author: 'Sanai', farsi: 'شکوه مرد نه در ثروت، بلکه در علم است', english: 'A man glory lies not in wealth, but in knowledge.', theme: 'Knowledge over wealth as the true measure of a person worth' },
  { author: 'Sanai', farsi: 'مرد را در سخن شناخت توان / مرد پنهان است در زیر زبان', english: 'A person can be known by their words / A person is hidden beneath their tongue.', theme: 'Speech as the mirror of a person true character' },
  { author: 'Jami', farsi: 'عشق آمد عقل را از سر ربود / دل شد پر نور و عاقل خاموش شود', english: 'Love arrived and took reason from the head / The heart became full of light and the rational mind fell silent.', theme: 'Mystical love as a light that silences the rational ego' },
  { author: 'Jami', farsi: 'بزرگ کسی است که تواضع دارد / نه آن که برتر از دیگران نشیند', english: 'Great is the one who possesses humility / Not the one who sits above others.', theme: 'True greatness expressed through humility rather than pride' },
  { author: 'Jami', farsi: 'هر که را عشق در دل افتاده است / از عقل و دانش آزاده است', english: 'Whoever has love fallen in the heart / Is liberated from mere intellect and book knowledge.', theme: 'Love as a liberation beyond intellectual and scholarly constraints' },
  { author: 'Rudaki', farsi: 'بوی جوی مولیان آید همی / یاد یار مهربان آید همی', english: 'The scent of the Mulian stream reaches me still / The memory of my kind beloved reaches me still.', theme: 'The power of memory and sensory experience to evoke longing' },
  { author: 'Rudaki', farsi: 'مادر می را باید ستود / که فرزند او عقل و هوش را ربود', english: 'One must praise the mother of wine / Whose child has stolen reason and consciousness.', theme: 'The paradoxical nature of intoxication as both thief and gift of awareness' },
  { author: 'Rudaki', farsi: 'هر که نیکی کند، نیکی بیند / هر که بدی کند، بدی بیند', english: 'Whoever does good, will see good / Whoever does evil, will see evil.', theme: 'The universal law of moral reciprocity' },
  { author: 'Khaqani', farsi: 'آنقدر بلند پرواز که فلک از تو آموزد', english: 'Soar so high that the heavens learn from you.', theme: 'Limitless ambition and the courage to transcend all boundaries' },
  { author: 'Khaqani', farsi: 'اگر چه دشمنی بینی به صد رو / تو نیکی کن که نیکی دوست دارد', english: 'Even if you see enmity in a hundred faces / Do good, for goodness is beloved.', theme: 'Persisting in goodness regardless of the hostility of others' },
  { author: 'Anvari', farsi: 'گفتم با دل که خاموش باش / دل گفت: خاموشی بهتر است', english: 'I told my heart to be silent / My heart said: silence is best.', theme: 'The wisdom and power of silence over unnecessary speech' },
  { author: 'Anvari', farsi: 'آنکه دانا است، کم سخن گوید / آنکه نادان است، بسیار سخن گوید', english: 'The wise person speaks little / The fool speaks much.', theme: 'Restraint in speech as a hallmark of wisdom' },
  { author: 'Hakim Owhadi', farsi: 'هر که درد خویش را درمان نجست / پیش دردش مات ماند در شکست', english: 'Whoever does not seek a cure for their own pain / Will remain defeated before their suffering.', theme: 'The necessity of actively seeking solutions to one own pain' },
  { author: 'Amir Khusrow', farsi: 'عشق را هر جا که هست، پایداری نیست / دل به عشق می‌بندد، اما قرار نیست', english: 'Love has no permanence wherever it is / The heart attaches to love, but there is no stability.', theme: 'The bittersweet impermanence of love' },
  { author: 'Amir Khusrow', farsi: 'یاران که رفتند، یاد آید همی / فراموش‌شان نتوان کرد، جانم', english: 'Friends who have gone still come to memory / One cannot forget them, my soul.', theme: 'The enduring presence of lost friends in memory' },
  { author: 'Nizam al-Mulk', farsi: 'پادشاهی که به عدل نشیند / ملکش پاید و مردم از او آسایش یابند', english: 'A king who rules with justice / Will have a lasting kingdom and people will find peace under him.', theme: 'Justice as the cornerstone of lasting and legitimate governance' },
  { author: 'Nizam al-Mulk', farsi: 'در کار ملک صبر و تدبیر بباید / که بی‌صبری ملک را ویران سازد', english: 'In governance, patience and wise planning are needed / For impatience destroys the kingdom.', theme: 'Patience and strategic wisdom as essential qualities of leadership' },
  { author: 'Al-Ghazali', farsi: 'علم بدون عمل درختی است بدون میوه', english: 'Knowledge without action is a tree without fruit.', theme: 'Applied knowledge as the only meaningful form of wisdom' },
  { author: 'Al-Ghazali', farsi: 'هر که خود را شناخت، خدا را شناخت', english: 'Whoever knows himself, knows God.', theme: 'Self-knowledge as the path to divine knowledge' },
  { author: 'Al-Ghazali', farsi: 'از چهار چیز مراقب باش: زبانت، دلت، نفست، و دستانت', english: 'Guard yourself from four things: your tongue, your heart, your desires, and your hands.', theme: 'Self-mastery through vigilance over speech, intention, desire, and action' },
  { author: 'Al-Ghazali', farsi: 'تنهایی گنجینه‌ای است برای عاقل', english: 'Solitude is a treasure for the wise.', theme: 'Solitude as a sacred space for the development of wisdom' },
  { author: 'Al-Ghazali', farsi: 'کسی که از دیگران انتقاد می‌کند بدون آنکه خودش را اصلاح کرده باشد، مانند کسی است که دیگران را از آتش نجات می‌دهد در حالی که خودش در آتش است', english: 'One who criticizes others without having reformed themselves is like one who saves others from fire while burning in it themselves.', theme: 'The hypocrisy of guiding others before first reforming oneself' },
  { author: 'Nezami Aruzi', farsi: 'شاعری را این قدر بزرگی است که سخن او را نه زمین محدود کند و نه آسمان', english: 'Poetry has such grandeur that neither earth nor sky can contain its words.', theme: 'The boundless power and reach of great poetry' },
  { author: 'Forough Farrokhzad', farsi: 'من به باغ می‌روم، باغبان را می‌بینم / درختان را می‌بوسم، و گل‌ها را می‌چینم', english: 'I go to the garden, I see the gardener / I kiss the trees and pick the flowers.', theme: 'The joyful union with nature as an act of spiritual reclamation' },
  { author: 'Forough Farrokhzad', farsi: 'تنها صداست که می‌ماند', english: 'Only the voice remains.', theme: 'The immortality of authentic creative voice beyond death' },
  { author: 'Forough Farrokhzad', farsi: 'من در دنیایی زندگی می‌کنم که / هیچ‌کس برای من نیست', english: 'I live in a world where / No one exists for me.', theme: 'The existential loneliness of the individual in a disconnected world' },
  { author: 'Ahmad Shamlu', farsi: 'شعر، آینه‌ای است که دنیا را در آن می‌بینی', english: 'Poetry is a mirror in which you see the world.', theme: 'Poetry as the clearest mirror of reality and human experience' },
  { author: 'Ahmad Shamlu', farsi: 'آزادی را بر دار می‌کشند / چرا که ترسند از آن', english: 'They crucify freedom / Because they fear it.', theme: 'Freedom as a force that threatens and destabilizes oppressive power' },
  { author: 'Sohrab Sepehri', farsi: 'آب را گل نکنیم / در فرودست انگار کسی می‌شوید دست', english: 'Let us not muddy the water / Downstream, perhaps someone is washing their hands.', theme: 'Collective responsibility and care for shared resources and community' },
  { author: 'Sohrab Sepehri', farsi: 'من نمی‌دانم / که چرا می‌گویند اسب حیوان نجیبی است، کبوتر زیباست / و چرا در باغچه هیچ‌کس گل مرغ را دوست ندارد', english: 'I do not know / Why people say the horse is a noble animal, the dove is beautiful / And why no one in the garden loves the morning glory.', theme: 'Questioning arbitrary standards of beauty and worth' },
  { author: 'Sohrab Sepehri', farsi: 'حجم دنیا را با عشق پر کن', english: 'Fill the volume of the world with love.', theme: 'Love as the ultimate purpose and meaning of existence' },
  { author: 'Parvin Etesami', farsi: 'زن اگر زندگی را هدف گیرد / آفتاب هستی او می‌شود', english: 'If a woman aims for life as her goal / She becomes the sun of her own existence.', theme: 'Women agency and self-determination as a path to radiant existence' },
  { author: 'Parvin Etesami', farsi: 'عدل، آن است که بی‌گناهان رنج نبرند', english: 'Justice is that the innocent suffer no pain.', theme: 'True justice defined by the protection of the innocent from suffering' },
  { author: 'Parvin Etesami', farsi: 'هر کجا دانا نشسته، آن نشست / از میان خوبی‌ها سرافرازتر است', english: 'Wherever the wise sits, that gathering / Is more glorious than all other good gatherings.', theme: 'The elevating power of wisdom in any gathering or community' },
  { author: 'Iraj Mirza', farsi: 'آنکه نیکی کند، نیکی بیند همیشه / ره نیکان، ره بهشت است', english: 'He who does good, always sees good / The path of the good is the path to paradise.', theme: 'The divine reward inherent in a life of goodness' },
  { author: 'Abu Said Abil Kheir', farsi: 'تا نگردی آشنا زین پرده، رمزی نشنوی / گوش نامحرم نباشد جای پیغام سروش', english: 'Until you become familiar with this veil, you will hear no secret / An uninitiated ear is no place for the divine messenger message.', theme: 'Spiritual readiness as the prerequisite for receiving divine wisdom' },
  { author: 'Abu Said Abil Kheir', farsi: 'آنچه آمد رفت، آنچه بود نماند / جز که ذکر نیک که جاودان بماند', english: 'What came, went; what existed, did not remain / Except the good remembrance that remains forever.', theme: 'Virtuous legacy as the only permanence in a transient world' },
  { author: 'Baba Tahir', farsi: 'همه عالم تنم، عشقم روان است / همه بیم و امیدم در این جهان است', english: 'The whole world is my body, love is my spirit / All my fear and hope is in this world.', theme: 'Love as the animating spirit of all existence' },
  { author: 'Baba Tahir', farsi: 'دلم می‌خواهد از این دیار بروم / ولی بی‌تو رفتن را چه سود؟', english: 'My heart wishes to leave this land / But what is the use of leaving without you?', theme: 'The binding power of love that makes even departure meaningless' },
  { author: 'Nasir al-Din Tusi', farsi: 'دانشمند کسی است که نادانی خود را بشناسد', english: 'A scholar is one who recognizes his own ignorance.', theme: 'Intellectual humility as the foundation of genuine scholarship' },
  { author: 'Nasir al-Din Tusi', farsi: 'هر که می‌خواهد که دانا شود / باید که نادان بودن خود را بداند', english: 'Whoever wishes to become wise / Must first know that they are ignorant.', theme: 'Recognizing one ignorance as the first step toward wisdom' },
  { author: 'Rashid al-Din', farsi: 'اتحاد قوت است، و تفرقه ضعف', english: 'Unity is strength, and division is weakness.', theme: 'The power of collective unity versus the weakness of division' },
  { author: 'Manuchehri', farsi: 'جهان پر از شگفتی است، چشم باز کن / که زیبایی در هر گوشه پنهان است', english: 'The world is full of wonders, open your eyes / For beauty is hidden in every corner.', theme: 'Cultivating the awareness to perceive the hidden beauty in all things' },
  { author: 'Qabus', farsi: 'با دانا نشین که دانا شوی / از نادان بگریز که نادان شوی', english: 'Sit with the wise so that you become wise / Flee from the ignorant lest you become ignorant.', theme: 'The profound influence of one companions on one character' },
  { author: 'Qabus', farsi: 'آنچه می‌کاری، همان را درو خواهی کرد / پس نیک بکار تا نیک درو کنی', english: 'What you sow, that is what you will reap / So sow well, that you may reap well.', theme: 'The universal law of reaping what one sows' },
  { author: 'Auhad ud-Din Kirmani', farsi: 'هیچ دردی نیست که درمان نداشته باشد / الا درد نادانی که درمانش دانش است', english: 'There is no pain that has no cure / Except the pain of ignorance, whose cure is knowledge.', theme: 'Knowledge as the ultimate and only cure for the disease of ignorance' },
  { author: 'Persian Proverb', farsi: 'عجله کار شیطان است', english: 'Haste is the work of the devil.', theme: 'The danger of rushing decisions and the virtue of deliberate patience' },
  { author: 'Persian Proverb', farsi: 'سنگ که به آب بیفتد، دریا تاریک می‌شود', english: 'When a stone falls into water, even the sea grows dark.', theme: 'The far-reaching consequences of even small actions' },
  { author: 'Persian Proverb', farsi: 'هم‌نشینی با بدان، نیک‌مرد را بد کند', english: 'Keeping the company of the wicked makes a good man wicked.', theme: 'The corrupting power of bad company on good character' },
  { author: 'Persian Proverb', farsi: 'خانه‌ای که در آن آتش عشق نباشد، خانه نیست', english: 'A house in which there is no fire of love is not a home.', theme: 'Love as the essential warmth that transforms a house into a home' },
  { author: 'Persian Proverb', farsi: 'از کوزه همان برون تراود که در اوست', english: 'From a vessel, only that which is within it can flow out.', theme: 'A person outward actions are a perfect reflection of their inner character' },
  { author: 'Persian Proverb', farsi: 'صبر کن صبر کن که صبر آید / بعد از آن کام دل به دست آید', english: 'Be patient, be patient, for patience will come / After it, the desire of the heart will be attained.', theme: 'The assurance that patience will ultimately be rewarded' },
  { author: 'Persian Proverb', farsi: 'نیکی کن و در دجله انداز', english: 'Do good and cast it in the Tigris River (and forget about it).', theme: 'True generosity means doing good without expectation of return' },
  { author: 'Persian Proverb', farsi: 'دروغگو را حافظه نیست', english: 'A liar has no memory.', theme: 'The self-defeating and unsustainable nature of deception' },
  { author: 'Persian Proverb', farsi: 'آدم عاقل اول فکر می‌کند و بعد حرف می‌زند، آدم احمق اول حرف می‌زند و بعد فکر می‌کند', english: 'A wise person first thinks and then speaks; a foolish person first speaks and then thinks.', theme: 'Thoughtfulness and deliberation as the hallmarks of true wisdom' },
  { author: 'Persian Proverb', farsi: 'قطره قطره جمع گردد، وانگهی دریا شود', english: 'Drop by drop it gathers, and then it becomes a sea.', theme: 'The power of consistent small actions to create vast outcomes' },
  { author: 'Persian Proverb', farsi: 'هر که طاووس خواهد جور هندوستان کشد', english: 'Whoever wants a peacock must endure the hardships of India.', theme: 'Great rewards require enduring great hardships and perseverance' },
  { author: 'Persian Proverb', farsi: 'دشمن دانا به از دوست نادان', english: 'A wise enemy is better than an ignorant friend.', theme: 'Honest adversity from a wise opponent is more valuable than foolish friendship' },
  { author: 'Persian Proverb', farsi: 'مشک آن است که خود ببوید، نه آنکه عطار بگوید', english: 'Musk is that which itself gives off fragrance, not that which the perfumer advertises.', theme: 'True quality is self-evident and needs no external promotion' },
  { author: 'Persian Proverb', farsi: 'زبان سرخ سر سبز می‌دهد بر باد', english: 'A red (loose) tongue gives a fresh (green) head to the wind.', theme: 'Careless speech can bring about one own downfall and destruction' },
  { author: 'Persian Proverb', farsi: 'شب همه شب یلداست اگر یار نباشد', english: 'Every night is the longest night if the beloved is absent.', theme: 'How love absence transforms time into endless darkness' },
  { author: 'Rumi', farsi: 'آدمی مهمان‌خانه‌ای است / هر صباحی ضیف نو آید در آن', english: 'A human being is like a guesthouse / Every morning a new guest arrives.', theme: 'Welcoming all emotions and experiences as transient guests of the soul' },
  { author: 'Rumi', farsi: 'شادی و غم، درد و درمان همی آمدند / صحبتشان دار که هر کس رهی آمدند', english: 'Joy and sorrow, pain and cure kept coming / Welcome their company, for each has come as a guide.', theme: 'All life experiences as valuable guides deserving of welcome' },
  { author: 'Rumi', farsi: 'این جهان کوه است و فعل ما ندا / سوی ما آید نداهای صدا', english: 'This world is a mountain and our deeds are a call / The echo of our calls returns to us.', theme: 'The world as a great echo chamber that returns to us exactly what we put out' },
  { author: 'Rumi', farsi: 'در درون آدمی سیل است و کوه / آن که دارد این صفت، دارد شکوه', english: 'Within a human being there is both a flood and a mountain / He who possesses both these qualities has dignity.', theme: 'The coexistence of opposing forces within human nature as a source of dignity' },
  { author: 'Rumi', farsi: 'با یکی خوش‌باش و با جمله بدبین مباش / با همه دوست‌دار و با خود دشمن灌木', english: 'Be pleasant with one, but do not be suspicious of all / Be friendly to everyone, but do not be an enemy to yourself.', theme: 'The importance of self-kindness alongside generosity toward others' },
  { author: 'Hafez', farsi: 'در ازل پرتو حسنت ز تجلی دم زد / عشق پیدا شد و آتش به همه عالم زد', english: 'In eternity, the radiance of your beauty breathed from its revelation / Love appeared and set fire to the entire world.', theme: 'Divine love as the first creative act, the fire that ignited all of existence' },
  { author: 'Hafez', farsi: 'حسن تو در آینه دل پدیدار شد / چون که دل پاک شد، حسن نمودار شد', english: 'Your beauty became visible in the mirror of the heart / When the heart became pure, beauty revealed itself.', theme: 'A pure heart as the only mirror capable of reflecting divine beauty' },
  { author: 'Hafez', farsi: 'ما آزموده‌ایم در این شهر بخت خویش / باید برون کشید از این ورطه رخت خویش', english: 'We have tested our fortune in this city / We must pull our belongings out of this abyss.', theme: 'The courage to leave unfavorable circumstances and forge a new path' },
  { author: 'Saadi', farsi: 'تندرستی گنجی است پنهان، ای پسر', english: 'Good health is a hidden treasure, O son.', theme: 'Health as the greatest and most underappreciated form of wealth' },
  { author: 'Saadi', farsi: 'پیش دانا گفتن و خاموش بود / بهتر از گفتار و نشنیدن بود', english: 'To speak before the wise and then be silent / Is better than speaking and not listening.', theme: 'Genuine learning requires speaking less and listening more to the wise' },
  { author: 'Saadi', farsi: 'سخن که در دل تنگ آید به زبان مگو / که آنچه در دل است، بر زبان نشاید آمد', english: 'Do not speak words that come from a troubled heart / For what is in the heart should not always come to the tongue.', theme: 'The wisdom of restraining emotionally charged speech' },
  { author: 'Sanai', farsi: 'دل را به دست آور که حج اکبر این است', english: 'Win over the heart — this is the greatest pilgrimage.', theme: 'Winning hearts and cultivating love as the highest spiritual act' },
  { author: 'Rumi', farsi: 'خاموشی دریایی از علم است و کلام / همچو کف دریا و دریا خود تمام', english: 'Silence is the ocean of knowledge, and speech is its foam / The ocean itself is whole.', theme: 'Silence as the vast ocean of knowledge, with speech as only its surface foam' }
];

const authorMap: Record<string, string> = {
  'Rumi': 'rumi', 'Hafez': 'hafez', 'Saadi': 'saadi', 'Omar Khayyam': 'unknown', 'Ferdowsi': 'ferdowsi',
  'Nizami Ganjavi': 'nizami', 'Attar': 'attar', 'Ibn Sina': 'ibn-sina', 'Naser Khosrow': 'naser-khosrow',
  'Sanai': 'sanai', 'Jami': 'jami', 'Rudaki': 'rudaki', 'Khaqani': 'khaqani', 'Anvari': 'anvari',
  'Hakim Owhadi': 'unknown', 'Amir Khusrow': 'amir-khusrow', 'Nizam al-Mulk': 'nizam-al-mulk',
  'Al-Ghazali': 'al-ghazali', 'Nezami Aruzi': 'nezami-aruzi', 'Forough Farrokhzad': 'forough-farrokhzad',
  'Ahmad Shamlu': 'ahmad-shamlu', 'Sohrab Sepehri': 'sohrab-sepehri', 'Parvin Etesami': 'parvin-etesami',
  'Iraj Mirza': 'iraj-mirza', 'Abu Said Abil Kheir': 'abu-said-abil-kheir', 'Baba Tahir': 'baba-tahir',
  'Nasir al-Din Tusi': 'nasir-al-din-tusi', 'Rashid al-Din': 'rashid-al-din', 'Manuchehri': 'manuchehri',
  'Qabus': 'qabus', 'Auhad ud-Din Kirmani': 'auhad-ud-din-kirmani', 'Persian Proverb': 'unknown'
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
