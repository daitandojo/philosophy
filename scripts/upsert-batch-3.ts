import mongoose from 'mongoose';

const quotes = [
  { author: 'Mulla Sadra', farsi: 'الوجود أشرف من الماهیه — هستی از چیستی برتر است', english: 'Existence is nobler than essence — being is superior to mere definition.', theme: 'The primacy of existence over abstract essence as the foundation of reality' },
  { author: 'Mulla Sadra', farsi: 'حرکت جوهری آن است که همه چیز در ذات خود در سفر است', english: 'Substantial motion means that everything in its very essence is on a journey.', theme: 'All of existence is in perpetual motion and transformation at its very core' },
  { author: 'Mulla Sadra', farsi: 'عقل و عشق و شهود سه پایه معرفت‌اند و بدون هر سه، دانش ناقص است', english: 'Reason, love, and intuition are the three pillars of knowledge — without all three, knowing is incomplete.', theme: 'Complete knowledge requires the integration of reason, love, and direct intuition' },
  { author: 'Mulla Sadra', farsi: 'هر که نفس خود را شناخت، رب خود را شناخت', english: 'Whoever knows their own soul knows their Lord.', theme: 'Self-knowledge as the most direct path to knowledge of the divine' },
  { author: 'Suhrawardi', farsi: 'نور بر نور است و تاریکی پرده‌ای است که انسان خود بر خود می‌اندازد', english: 'Light upon light — and darkness is a veil that a person casts upon themselves.', theme: 'Darkness is not an external force but a self-imposed veil that obscures inner light' },
  { author: 'Suhrawardi', farsi: 'حکمت اشراق آن است که دانش از درون باشد، نه از بیرون آموخته شود', english: 'The philosophy of illumination holds that true knowledge shines from within, not learned from without.', theme: 'True wisdom as an inner illumination rather than an externally acquired accumulation' },
  { author: 'Suhrawardi', farsi: 'روح آدمی از عالم نور است و به عالم نور باز خواهد گشت', english: 'The human soul belongs to the world of light and to the world of light it shall return.', theme: 'The soul luminous origin and its inevitable return to the divine realm of light' },
  { author: 'Mir Damad', farsi: 'زمان مخلوق است اما حدوث دهری آن را از ابدیت جدا می‌کند', english: 'Time is created, but its temporal origination separates it from eternity.', theme: 'The philosophical distinction between created time and uncreated eternity' },
  { author: 'Mir Damad', farsi: 'هر چیزی که در زمان است، پایدار نیست / و هر چیزی که پایدار است، در زمان نیست', english: 'Everything that exists in time is impermanent / And everything that is permanent does not exist in time.', theme: 'The mutual exclusivity of temporal existence and genuine permanence' },
  { author: 'Fakhr al-Din al-Razi', farsi: 'اگر همه عمر در تحصیل دانش گذرانی، باز هم در آغاز راهی', english: 'Even if you spend your entire life acquiring knowledge, you are still only at the beginning of the path.', theme: 'The infinite vastness of knowledge that renders all human learning just a beginning' },
  { author: 'Fakhr al-Din al-Razi', farsi: 'عقل چراغی است که اگر هوای نفس آن را خاموش نکند، راه را روشن می‌کند', english: 'Reason is a lamp that, if the breath of ego does not extinguish it, illuminates the path.', theme: 'Reason as a divine lamp extinguished only by the ego self-serving desires' },
  { author: 'Fakhr al-Din al-Razi', farsi: 'تکبر دیوار است میان انسان و حقیقت', english: 'Pride is a wall between a human being and the truth.', theme: 'Arrogance as the impenetrable wall that blocks the mind from perceiving truth' },
  { author: 'Khwaja Abdullah Ansari', farsi: 'الهی، به درگاهت آمدم با دستی پر از گناه و دلی پر از امید', english: 'O God, I have come to Your threshold with hands full of sin and a heart full of hope.', theme: 'The paradox of approaching the divine with full acknowledgment of imperfection and full hope' },
  { author: 'Khwaja Abdullah Ansari', farsi: 'الهی، تو را از تو می‌خواهم، نه از خود', english: 'O God, I seek You through You, not through myself.', theme: 'Seeking the divine only through the divine itself, transcending all self-reliance' },
  { author: 'Khwaja Abdullah Ansari', farsi: 'بهترین کار آن است که برای خدا باشد و بدترین کار آن که برای خلق باشد', english: 'The best action is that which is done for God, and the worst is that which is done for people approval.', theme: 'Purity of intention — doing for the divine rather than for human approval' },
  { author: 'Shaykh Mahmud Shabistari', farsi: 'هر که آگه شد از اسرار خویش / کافر و مؤمن یکی دید او همی', english: 'Whoever became aware of the secrets of selfhood / Saw the unbeliever and the believer as one.', theme: 'Deep self-knowledge dissolves all apparent religious and social divisions' },
  { author: 'Shaykh Mahmud Shabistari', farsi: 'گلشن راز آن است که هر جا نگری / جمال دوست می‌بینی به هر ذری', english: 'The rose garden of mystery is such that wherever you look / You see the beauty of the Beloved in every particle.', theme: 'The awakened eye that perceives the divine beloved shining in every particle of creation' },
  { author: 'Shaykh Mahmud Shabistari', farsi: 'خویی پندار و پندار خویی / در این آیینه بنگر تا کجایی', english: 'The ego is a fantasy and the fantasy is the ego / Look into this mirror to see where you truly are.', theme: 'The ego-self as pure illusion — a fantasy that mistakenly believes in its own solidity' },
  { author: 'Jami', farsi: 'هر که در این بزم ره یافت، مست از باده‌السِت است', english: 'Whoever found a way into this gathering is drunk from the wine of the primordial covenant.', theme: 'The mystical intoxication derived from the primordial covenant between the soul and the divine' },
  { author: 'Ayn al-Qudat Hamadani', farsi: 'عشق آتشی است که هر که را سوزاند، پاک کند', english: 'Love is a fire that whoever it burns, it also purifies.', theme: 'Love fire as simultaneously destructive and purifying — burning away impurity' },
  { author: 'Ayn al-Qudat Hamadani', farsi: 'کسی که از عشق نگریخت، از خود گریخت / کسی که به عشق پناه برد، به خود پناه برد', english: 'Whoever fled from love fled from themselves / Whoever took refuge in love took refuge in themselves.', theme: 'Love and the true self are identical — fleeing love is fleeing one own deepest nature' },
  { author: 'Ayn al-Qudat Hamadani', farsi: 'هر که در عشق صادق است، جهان در پیش او ذره‌ای است', english: 'Whoever is sincere in love, the whole world is but a particle before them.', theme: 'Sincere love grants a perspective before which the entire world shrinks to insignificance' },
  { author: 'Yahya ibn Muadh al-Razi', farsi: 'دوستی با کسی که خدا را دوست دارد، خود نوعی عبادت است', english: 'Friendship with one who loves God is itself a form of worship.', theme: 'The sacred dimension of friendship with those who are devoted to the divine' },
  { author: 'Yahya ibn Muadh al-Razi', farsi: 'قلب سالم آن است که نه از دنیا آکنده باشد، نه از ترس خالی', english: 'A sound heart is one that is neither filled with the world nor emptied of wholesome fear.', theme: 'The healthy heart as one that is balanced — neither worldly nor devoid of reverence' },
  { author: 'Ahmad ibn Hanbal', farsi: 'صبر در برابر آنچه دوست نداری، از بزرگ‌ترین عبادات است', english: 'Patience in the face of what you dislike is among the greatest acts of worship.', theme: 'Patient endurance of hardship as one of the highest forms of spiritual devotion' },
  { author: 'Al-Ghazali', farsi: 'ظلم سه گونه است: ظلم به خدا، ظلم به مردم، ظلم به خویشتن', english: 'Injustice is of three kinds: injustice to God, injustice to people, and injustice to oneself.', theme: 'The three dimensions of injustice — toward the divine, toward others, and toward oneself' },
  { author: 'Shams-i-Tabrizi', farsi: 'آنچه تو را از خود می‌رباید، همان است که به خودت باز می‌گرداند', english: 'That which robs you of yourself is the very thing that returns you to yourself.', theme: 'The mystical paradox: losing the false self is the path to finding the true self' },
  { author: 'Shams-i-Tabrizi', farsi: 'بزرگ‌ترین گناه آن است که بدانی و عمل نکنی', english: 'The greatest sin is to know and not to act.', theme: 'Knowledge without action is the deepest form of moral failure and self-betrayal' },
  { author: 'Shams-i-Tabrizi', farsi: 'هر که با تو نشیند و دلت را گرم کند، او آفتاب است نه آدم', english: 'Whoever sits with you and warms your heart is a sun, not merely a person.', theme: 'True companions who warm the heart are rare gifts as radiant as the sun' },
  { author: 'Shams-i-Tabrizi', farsi: 'راه دور نیست؛ تو دوری', english: 'The path is not far; you are the one who is far.', theme: 'The divine is not distant — the only distance is the one we create through ignorance' },
  { author: 'Shams-i-Tabrizi', farsi: 'اگر می‌خواهی بدانی خدا کجاست، به آیینه نگاه کن', english: 'If you want to know where God is, look in the mirror.', theme: 'The divine presence found most immediately and fully in the depths of one own being' },
  { author: 'Sultan Walad', farsi: 'پدرم گفت: عشق درس نمی‌خواهد / خود راه خود را می‌شناسد', english: 'My father said: love needs no lesson / It knows its own way.', theme: 'Love as an innate, self-guiding force that needs no external instruction' },
  { author: 'Sultan Walad', farsi: 'میراث پدر، نه زر است نه سیم / بلکه عشق و دانش و دل سالم', english: 'A father inheritance is not gold or silver / But love, knowledge, and a sound heart.', theme: 'The true inheritance from parent to child is love, wisdom, and moral soundness' },
  { author: 'Khaqani', farsi: 'شعر من آیینه‌ای است که در آن روزگار خود را ببین', english: 'My poetry is a mirror — look into it and see your own age.', theme: 'Great poetry as a mirror that reflects not just beauty but the truth of the age' },
  { author: 'Masud Sa\'d Salman', farsi: 'زندان تن را، دل آزاد است / هر که دل آزاد داشت، آزاد است', english: 'The body may be in prison, but the heart is free / Whoever keeps the heart free is truly free.', theme: 'Inner freedom of the heart as the only true freedom, beyond all physical captivity' },
  { author: 'Masud Sa\'d Salman', farsi: 'قلم من مرغی است که در قفس زندان آواز می‌خواند', english: 'My pen is a bird that sings in the cage of prison.', theme: 'The indomitable creative spirit that sings and creates even in the depths of captivity' },
  { author: 'Obeyd Zakani', farsi: 'دنیا چنان است که هر که بیشتر می‌داند، بیشتر می‌داند که نمی‌داند', english: 'The world is such that whoever knows more, knows more how much they do not know.', theme: 'The recursive humility of knowledge — the more one learns, the more one sees the infinite unknown' },
  { author: 'Obeyd Zakani', farsi: 'زاهد که نماز می‌کند و دل به دنیا دارد / آن نماز نماز نیست، آن ریا است', english: 'The ascetic who prays while his heart is attached to the world / That prayer is not prayer — it is hypocrisy.', theme: 'Ritual without inner sincerity is hollow performance and the purest form of hypocrisy' },
  { author: 'Obeyd Zakani', farsi: 'عقل آدمی را بر زبانش می‌سنجند', english: 'A person reason is measured by their tongue.', theme: 'The quality of one speech as the primary indicator of the quality of one mind' },
  { author: 'Abu\'l-Faraj Runi', farsi: 'آن که می‌داند و می‌داند که می‌داند / اسب دانش را برانید', english: 'One who knows and knows that he knows / Ride the horse of knowledge.', theme: 'Conscious, self-aware mastery of knowledge as the highest level of learning' },
  { author: 'Zahir al-Din Faryabi', farsi: 'مدح دشمن از دشمنی بدتر نیست / ذم دوست از دوستی بهتر بسیار', english: 'Praising an enemy is no better than enmity / Criticizing a friend is far better than false friendship.', theme: 'Honest criticism from a true friend is infinitely more valuable than flattery from any source' },
  { author: 'Adib Sabir Tirmidhi', farsi: 'هر که را درد نبود، دارو نجست / هر که را زخم نبود، مرهم نخواست', english: 'Whoever has no pain, seeks no cure / Whoever has no wound, needs no balm.', theme: 'Pain as the necessary condition that awakens the desire for healing and growth' },
  { author: 'Suzani Samarqandi', farsi: 'دانا به یک کلمه دانا می‌شناسد / نادان به صد سخن هنوز نادان است', english: 'The wise recognizes the wise with a single word / The ignorant, after a hundred speeches, remains ignorant.', theme: 'Wisdom instantly recognizes wisdom, while ignorance cannot perceive it even after long exposure' },
  { author: 'Rashid Vatvat', farsi: 'سخن که از دل راست آید، به دل نشیند', english: 'Speech that comes from a sincere heart settles in the heart.', theme: 'Only speech that originates in sincere feeling can truly reach and touch another heart' },
  { author: 'Rashid Vatvat', farsi: 'ادب در همه حال لازم است / که بی‌ادب محروم می‌ماند از فیض خلق', english: 'Courtesy is required in all situations / For the discourteous remain deprived of the grace of creation.', theme: 'Courtesy and good manners as the key that unlocks the grace and goodwill of the world' },
  { author: 'Nasir Khusraw', farsi: 'مرد آن نیست که بسیار بگوید / مرد آن است که بسیار بداند', english: 'A man is not one who says much / A man is one who knows much.', theme: 'True manhood defined by depth of knowledge rather than volume of speech' },
  { author: 'Abu Shukur Balkhi', farsi: 'نیکی آن است که بدون چشم داشت باشد / چون نیکی با چشم داشت، تجارت است', english: 'True goodness is that which expects nothing in return / For goodness with expectation is merely commerce.', theme: 'Unconditional giving as the only genuine goodness — all other giving is mere transaction' },
  { author: 'Abu Shukur Balkhi', farsi: 'هر که خوار است پیش خویش، خوار است پیش دیگران', english: 'Whoever is lowly in their own eyes is lowly in the eyes of others.', theme: 'Self-respect as the foundation of the respect one receives from the world' },
  { author: 'Gurgani', farsi: 'عشق را قانون نبود، عاشق آزاد است / آزادی عاشق از قانون عشق است', english: 'Love has no law; the lover is free / And the lover freedom comes from the very law of love.', theme: 'The paradox that love own law is the transcendence of all other laws' },
  { author: 'Nasir al-Din Tusi', farsi: 'آنکه راضی به قضا است، از همه چیز آسوده‌تر است', english: 'Whoever is content with fate is the most at peace with everything.', theme: 'Radical acceptance of fate as the path to deepest peace and equanimity' },
  { author: 'Hafiz Ibrahim', farsi: 'زبان فصیح مردم را متحد می‌کند / زبان زشت، دشمنی می‌پراکند', english: 'Eloquent speech unites people / Foul speech spreads enmity.', theme: 'The power of language to either unite communities or sow seeds of division and enmity' },
  { author: 'Kamal ud-Din Ismail Isfahani', farsi: 'فکر کن پیش از آنکه بگویی / چرا که تیر از کمان رفته بازنگردد', english: 'Think before you speak / For the arrow that has left the bow does not return.', theme: 'Words, once spoken, are irretrievable — thoughtfulness before speaking is essential' },
  { author: 'Kamal ud-Din Ismail Isfahani', farsi: 'در دنیا آنچه ماند، نام نیک است / مال و جاه چون سایه ناپایدارند', english: 'In the world, what remains is a good name / Wealth and status are as fleeting as a shadow.', theme: 'A good name as the only form of worldly wealth that truly endures beyond death' },
  { author: 'Nizam al-Din Awliya', farsi: 'دل را نگاه دار که خانه خداست / هر چه در خانه خدا باشد، با اوست', english: 'Guard the heart, for it is the house of God / Whatever is in the house of God belongs with Him.', theme: 'The human heart as the sacred dwelling place of the divine, deserving of the utmost care' },
  { author: 'Nizam al-Din Awliya', farsi: 'خدمت به خلق، خدمت به حق است', english: 'Service to creation is service to the Creator.', theme: 'Every act of service to a fellow creature is simultaneously an act of worship of the divine' },
  { author: 'Nizam al-Din Awliya', farsi: 'اگر می‌خواهی به خدا برسی، از میان مردم برو', english: 'If you want to reach God, pass through the midst of people.', theme: 'The divine is reached not by withdrawing from humanity but by passing through and serving it' },
  { author: 'Fakhr al-Din Iraqi', farsi: 'عشق آمد و شد خلاصه کائنات / در یک دل گنجید همه آفاق', english: 'Love came and became the essence of all existence / All horizons were contained within a single heart.', theme: 'Love as the concentrated essence of the universe, holding all creation in a single heart' },
  { author: 'Fakhr al-Din Iraqi', farsi: 'دل من از شوق تو گم شد در خود / چون بحر که در خود غرق شود', english: 'My heart lost itself in longing for you / Like the sea that drowns within itself.', theme: 'The heart consumed by longing loses itself as completely as an ocean drowning in itself' },
  { author: 'Sanai', farsi: 'خداوند را از راه عقل نتوان شناخت / که عشق کمربند اوست نه عقل', english: 'God cannot be known through reason alone / For love is His belt, not reason.', theme: 'Love rather than rational inquiry as the true means of approaching the divine mystery' },
  { author: 'Jalal al-Din Dawwani', farsi: 'فضیلت اخلاقی آن است که خوبی از روی اراده باشد، نه اجبار', english: 'Moral virtue is that goodness flows from free will, not compulsion.', theme: 'Genuine virtue requires free choice — goodness under compulsion is not true virtue' },
  { author: 'Jalal al-Din Dawwani', farsi: 'سعادت نهایی آدمی در معرفت و محبت است', english: 'The ultimate happiness of a human being lies in knowledge and love.', theme: 'The highest human flourishing achieved only through the integration of knowledge and love' },
  { author: 'Qutb al-Din Shirazi', farsi: 'طبیعت را با طبیعت درمان کن / که هر دردی طبیعت داروست', english: 'Heal nature with nature / For nature is the cure for every pain.', theme: 'Nature as the ultimate physician whose remedies address the root of all ailments' },
  { author: 'Qutb al-Din Shirazi', farsi: 'جهان کتابی است که هر که دانا بود، خواند / و هر که نادان بود، ورق زد و گذشت', english: 'The world is a book that the wise person reads / And the ignorant person merely flips through and passes by.', theme: 'The world as a profound text readable only by those with the wisdom to perceive its meaning' },
  { author: 'Ibn Yamin Faryumadi', farsi: 'دولت دنیا به دست ناکسان است / دولت آخرت به دست نیکوکاران', english: 'The fortune of this world is in the hands of the base / The fortune of the hereafter is in the hands of the virtuous.', theme: 'The irony that worldly fortune often belongs to the base while eternal fortune belongs to the virtuous' },
  { author: 'Ibn Yamin Faryumadi', farsi: 'هر کجا دانشمندی است، آنجا وطن من است', english: 'Wherever a learned person exists, that is my homeland.', theme: 'The homeland of the truly learned person is wherever wisdom and knowledge reside' },
  { author: 'Khwaju Kermani', farsi: 'هر که دل داد به دنیا، دل گم کرد / هر که دل به حق داد، دل پر کرد', english: 'Whoever gave their heart to the world lost their heart / Whoever gave their heart to the divine found their heart full.', theme: 'Giving the heart to the world empties it, while giving it to the divine fills it completely' },
  { author: 'Khwaju Kermani', farsi: 'در راه عشق نه وسعت راه است نه آسانی / که عشق راه خود می‌برد نه آدم راه عشق', english: 'On the path of love there is neither breadth nor ease / For love takes its own way; it is not man who takes the way of love.', theme: 'Love as the active agent that chooses its path — the lover is carried rather than walking freely' },
  { author: 'Kamāl al-Dīn Mas\'ūd Khujandi', farsi: 'آن که دل دارد به دل با دل سخن می‌گوید / و آن که دل ندارد، با هزار کلمه لال است', english: 'One who has heart speaks to the heart with the heart / And one who has no heart is mute despite a thousand words.', theme: 'True communication is of heart to heart — without it, even a thousand words convey nothing' },
  { author: 'Baba Faghani Shirazi', farsi: 'عشق بازی با آتش است، دست محتاط می‌برد', english: 'Love is playing with fire — a cautious hand draws back.', theme: 'True love demands reckless courage — caution is the enemy of genuine passion' },
  { author: 'Bidel Dehlavi', farsi: 'آنقدر پیچیده است راز هستی / که هر که فهمید، فهمید که نفهمید', english: 'The secret of existence is so complex / That whoever understood it, understood that they had not understood.', theme: 'The infinite complexity of existence that defeats every confident claim to understanding' },
  { author: 'Bidel Dehlavi', farsi: 'ما نیستیم و هستیم، هستیم و نیستیم / این معما را کسی نگشود که باشد', english: 'We are not and we are; we are and we are not / This riddle has been solved by no one who has existed.', theme: 'The ultimate paradox of human existence — simultaneously being and non-being' },
  { author: 'Bidel Dehlavi', farsi: 'دل آیینه‌ای است که جز پاکیزگی در آن نمی‌نشیند', english: 'The heart is a mirror in which only purity can settle.', theme: 'The heart as a mirror that reflects only what matches its own quality — purity reflects purity' },
  { author: 'Hatif Isfahani', farsi: 'یکی است و هیچ نیست جز او / وحدت در کثرت، کثرت در وحدت', english: 'There is only One and nothing exists but Him / Unity within multiplicity, multiplicity within unity.', theme: 'The fundamental mystical teaching of unity in multiplicity and multiplicity within unity' },
  { author: 'Hatif Isfahani', farsi: 'از هر طرف که رفتم جز وحشت و تاریکی ندیدم /الا در آن راه که عشق بود چراغ', english: 'From every direction I traveled I saw nothing but desolation and darkness / Except on that path where love was the lamp.', theme: 'Love as the only lamp illuminating the otherwise dark and desolate paths of life' },
  { author: 'Sabzavari', farsi: 'وجود را درجاتی است و کمال آدمی در صعود از درجه‌ای به درجه‌ای است', english: 'Existence has degrees, and human perfection lies in ascending from one degree to another.', theme: 'Human perfection as a continuous process of ascending through ever-higher degrees of existence' },
  { author: 'Sabzavari', farsi: 'خرمند آن است که در ظاهر می‌نگرد و باطن را می‌بیند', english: 'The wise person is one who looks at the outward and sees the inward.', theme: 'Wisdom as the capacity to perceive inner realities through outer appearances' },
  { author: 'Mirza Ghalib', farsi: 'ہستی کے مت فریب میں آ جاؤ اسد — ہستی کو فریب نہ خور کہ نیستی انگاری بھی خود ہستی ہے', english: 'Do not be deceived by existence, Asad — for even non-existence is itself a form of existence.', theme: 'The philosophical paradox in which even nothingness is a mode of being' },
  { author: 'Siraj ud-Din Ali Khan Arzu', farsi: 'زبان آدمی ترجمان اندیشه اوست / پس اندیشه را پاک کن که زبان پاک شود', english: 'A person tongue is the translator of their thought / So purify thought and the tongue will be purified.', theme: 'Purifying one thoughts at the source as the most effective way to purify one speech' },
  { author: 'Muhammad Iqbal', farsi: 'خودی را کن بلند آنقدر که ہر تقدیر سے پہلے / خدا بندے سے خود پوچے بتا تیری رضا کیا ہے', english: 'Elevate your self to such heights that before every decree of fate / God Himself asks you: tell me, what is your wish?', theme: 'The elevation of the human self to a dignity so great that it enters into dialogue with the divine' },
  { author: 'Muhammad Iqbal', farsi: 'تو شاهین است، پرواز تو را نیست پایان / نشین بر نوک کوه و جهان را بنگر', english: 'You are an eagle — your flight has no end / Sit upon the mountain peak and behold the world.', theme: 'The unlimited potential of the human spirit, summoned to soar above all limitations' },
  { author: 'Muhammad Iqbal', farsi: 'ملت از نسبت با ارباب هنر زنده است / ورنہ از نقش نگار و رنگ و بو زندہ نہ', english: 'A nation lives through its relationship with masters of art / Otherwise it does not live through mere colors and forms.', theme: 'The spiritual life of a nation sustained only through its living relationship with art and creative genius' },
  { author: 'Muhammad Iqbal', farsi: 'زندگی در سینه هر ذره نهفته است / کیست کہان را باز جوید؟ مرد خودآگاه', english: 'Life is hidden in the breast of every particle / Who is it that seeks it out? The self-aware person.', theme: 'The self-aware individual as the only one capable of perceiving the hidden life in all things' },
  { author: 'Iraj Mirza', farsi: 'دانا کسی است که از دیگران یاد گیرد / و نادان کسی که فقط از خود', english: 'The wise person is one who learns from others / The foolish one is he who learns only from himself.', theme: 'Openness to learning from others as the mark of wisdom, versus self-enclosed ignorance' },
  { author: 'Bahar', farsi: 'ای وطن، ای مادر من، ای بهشت / من فدای خاک پاکت گشته‌ام', english: 'O homeland, O my mother, O paradise / I have sacrificed myself for your pure earth.', theme: 'Devotion to the homeland as the deepest expression of love and ultimate sacrifice' },
  { author: 'Bahar', farsi: 'بهار آزادی رسید و قفس شکست / مرغ دل از بند رها شد به سوی آشیان', english: 'The spring of freedom arrived and the cage broke / The bird of the heart was freed from its bonds, toward its nest.', theme: 'Freedom as the spring season of the soul, releasing the imprisoned heart to its true home' },
  { author: 'Nima Yushij', farsi: 'ای آدم‌ها که بر ساحل نشسته شاد و خندانید / یک نفر در آب دارد می‌سپارد جان', english: 'O people sitting on the shore, happy and laughing / Someone is drowning in the water.', theme: 'The moral indictment of those who celebrate at ease while others suffer and drown nearby' },
  { author: 'Nima Yushij', farsi: 'شعر آن است که زندگی را بازتاباند / نه آن که در برج عاج بنشینند', english: 'Poetry is that which reflects life / Not that which sits in an ivory tower.', theme: 'True poetry as engaged with real life and human suffering, not withdrawn into aesthetic isolation' },
  { author: 'Mehdi Akhavan-Sales', farsi: 'زمستان است و سرما / ولی دل گرم دارد هر که عشقی دارد', english: 'It is winter and cold / But whoever has love keeps a warm heart.', theme: 'Love as the inner fire that keeps the heart warm in the coldest and most desolate conditions' },
  { author: 'Mehdi Akhavan-Sales', farsi: 'سلام ما را / پاسخ نداد کسی / که ما به راه گمشده‌ای رهسپار بودیم', english: 'No one answered our greeting / For we were travelers on a path that had been lost.', theme: 'The deep alienation of those whose path has been lost and whose greeting is met with silence' },
  { author: 'Ghahraman', farsi: 'هر داستانی که نوشته می‌شود، داستان دیگری است که نوشته نمی‌شود', english: 'Every story that is written is another story that is not written.', theme: 'Every creative choice entails an infinite field of unexplored possibilities' },
  { author: 'Simin Behbahani', farsi: 'بنشین که دنیا گل است و باغ است / اگر دیده‌ات باز باشد به دیدن', english: 'Sit, for the world is flower and garden / If your eyes are open to seeing.', theme: 'The world reveals its beauty as a garden only to those who have open and receptive eyes' },
  { author: 'Simin Behbahani', farsi: 'زن بودن در این دیار / هم درد است و هم شرافت', english: 'Being a woman in this land / Is both pain and honor.', theme: 'The paradoxical experience of womanhood as simultaneously a site of oppression and profound dignity' },
  { author: 'Simin Behbahani', farsi: 'عشق یعنی که هر روز از نو بسازی / آنچه روزگار خراب کرده', english: 'Love means that every day you rebuild anew / What time has destroyed.', theme: 'Love as an act of daily rebuilding against all the destruction that time inevitably brings' },
  { author: 'Persian Proverb', farsi: 'خواهی نشوی رسوا، همرنگ جماعت شو', english: 'If you do not want to be disgraced, blend in with the crowd.', theme: 'The pragmatic — and ironic — social wisdom of conformity as a shield against disgrace' },
  { author: 'Persian Proverb', farsi: 'چاه مکن برای کسی، اول خودت می‌افتی', english: 'Do not dig a pit for someone else — you will fall into it first.', theme: 'The boomerang nature of malicious scheming — traps set for others ensnare their makers first' },
  { author: 'Persian Proverb', farsi: 'از آب گل‌آلود ماهی می‌گیرند', english: 'They catch fish in muddy water.', theme: 'Those with cunning find opportunity precisely where others see only chaos and murkiness' },
  { author: 'Persian Proverb', farsi: 'عقل در پیری می‌رسد، جوانی می‌رود', english: 'Wisdom arrives in old age, but youth departs.', theme: 'The painful irony that wisdom arrives precisely when the energy of youth to apply it has departed' },
  { author: 'Persian Proverb', farsi: 'مرده را باید بر تخت نعش گذاشت، نه دل زنده را', english: 'It is the dead who should be placed on the bier, not the living heart.', theme: 'The living heart must resist all that would consign it to the passivity of death' },
  { author: 'Persian Proverb', farsi: 'خاموشی طلاست، سخن نقره', english: 'Silence is gold, speech is silver.', theme: 'The classical wisdom that silence is more precious than the finest speech' },
  { author: 'Persian Proverb', farsi: 'دیگ به دیگ می‌گوید: روی سیاه', english: 'The pot says to the pot: your face is black.', theme: 'The universal human tendency to see in others exactly the faults one most possesses oneself' },
  { author: 'Persian Proverb', farsi: 'تا نباشد آتشی، دودی نمی‌خیزد', english: 'Without fire, no smoke can rise.', theme: 'Every visible effect points to a hidden cause — where there is smoke, there is always fire' },
  { author: 'Shams-i-Tabrizi', farsi: 'همه می‌دانند که چگونه زندگی کنند / جز آنانی که واقعاً زندگی می‌کنند', english: 'Everyone knows how to live / Except those who are truly living.', theme: 'The paradox that those who theorize most about life are often those least immersed in living it' },
  { author: 'Shams-i-Tabrizi', farsi: 'دوستی که در سختی نباشد، دوست نیست / سایه‌ای است که در آفتاب گم می‌شود', english: 'A friend who is absent in hardship is not a friend / They are a shadow that vanishes in sunlight.', theme: 'True friendship is proven only in adversity — fair-weather friendship is as insubstantial as a shadow' },
  { author: 'Mulla Sadra', farsi: 'اتحاد عاقل و معقول، کمال وجود است', english: 'The union of the knower and the known is the perfection of existence.', theme: 'True knowing as a union where knower and known become one — the summit of intellectual existence' },
  { author: 'Suhrawardi', farsi: 'خرد اشراقی آن است که پیش از استدلال، دیدن باشد', english: 'Illuminative wisdom is that seeing comes before argumentation.', theme: 'Direct intuitive vision as prior to and more fundamental than discursive rational argument' },
  { author: 'Nima Yushij', farsi: 'مرغ غم پای بند این دیار است / وای به حال آن که پای بند نیست', english: 'The bird of sorrow is bound to this land / Woe to those who are not bound — for they are truly lost.', theme: 'The paradox that being bound to a suffering homeland is preferable to the rootlessness of exile' },
  { author: 'Bidel Dehlavi', farsi: 'عجب‌تر از عجب این است که آدمی می‌داند که خواهد مرد و در غفلت می‌زید', english: 'The strangest of strange things is that a person knows they will die and yet lives in heedlessness.', theme: 'The supreme human contradiction of knowing death is certain while living as though it will never come' },
  { author: 'Ayn al-Qudat Hamadani', farsi: 'آنچه را که می‌دانی نگو، آنچه را که می‌گویی بدان', english: 'Do not say everything you know; know everything you say.', theme: 'Mastery of speech requires both selective silence and complete integrity in what is spoken' },
  { author: 'Khwaja Abdullah Ansari', farsi: 'آنقدر بنده باش که خود را نبینی / آنقدر آزاد باش که غیر را نبینی', english: 'Be servant enough that you do not see yourself / Be free enough that you do not see the other.', theme: 'The mystical paradox: selfless servitude and total freedom are achieved simultaneously in the divine' },
  { author: 'Fakhr al-Din Iraqi', farsi: 'هر که از خود رفت، به حق رسید / هر که ماند، در نفس خود جا ماند', english: 'Whoever departed from the self arrived at the divine / Whoever remained was stuck in the place of their own ego.', theme: 'Departure from the ego-self as the only gateway to arrival at the divine' },
  { author: 'Masud Sa\'d Salman', farsi: 'شاعر در بند نیست، اگرچه پایش در زنجیر باشد', english: 'The poet is not imprisoned, even if their feet are in chains.', theme: 'The poetic spirit as ultimately unchainable — soaring freely even when the body is imprisoned' }
];

const authorMap: Record<string, string> = {
  'Mulla Sadra': 'mulla-sadra', 'Suhrawardi': 'suhrawardi', 'Mir Damad': 'mir-damad',
  'Fakhr al-Din al-Razi': 'fakhr-al-din-al-razi', 'Khwaja Abdullah Ansari': 'khwaja-abdullah-ansari',
  'Shaykh Mahmud Shabistari': 'shaykh-mahmud-shabistari', 'Jami': 'jami',
  'Ayn al-Qudat Hamadani': 'ayn-al-qudat-hamadani', 'Yahya ibn Muadh al-Razi': 'yahya-ibn-muadh-al-razi',
  'Ahmad ibn Hanbal': 'ahmad-ibn-hanbal', 'Al-Ghazali': 'al-ghazali', 'Shams-i-Tabrizi': 'shams-i-tabrizi',
  'Sultan Walad': 'sultan-walad', 'Khaqani': 'khaqani', 'Masud Sa\'d Salman': 'masud-sa\'d-salman',
  'Obeyd Zakani': 'obeyd-zakani', 'Abu\'l-Faraj Runi': 'abu\'l-faraj-runi',
  'Zahir al-Din Faryabi': 'zahir-al-din-faryabi', 'Adib Sabir Tirmidhi': 'adib-sabir-tirmidhi',
  'Suzani Samarqandi': 'suzani-samarqandi', 'Rashid Vatvat': 'rashid-vatvat',
  'Nasir Khusraw': 'nasir-khusraw', 'Abu Shukur Balkhi': 'abu-shukur-balkhi',
  'Gurgani': 'gurgani', 'Nasir al-Din Tusi': 'nasir-al-din-tusi',
  'Hafiz Ibrahim': 'hafiz-ibrahim', 'Kamal ud-Din Ismail Isfahani': 'kamal-ud-din-ismail-isfahani',
  'Nizam al-Din Awliya': 'nizam-al-din-awliya', 'Fakhr al-Din Iraqi': 'fakhr-al-din-iraqi',
  'Sanai': 'sanai', 'Jalal al-Din Dawwani': 'jalal-al-din-dawwani',
  'Qutb al-Din Shirazi': 'qutb-al-din-shirazi', 'Ibn Yamin Faryumadi': 'ibn-yamin-faryumadi',
  'Khwaju Kermani': 'khwaju-kermani', 'Kamāl al-Dīn Mas\'ūd Khujandi': 'kamal-al-din-masud-khujandi',
  'Baba Faghani Shirazi': 'baba-faghani-shirazi', 'Bidel Dehlavi': 'bidel-dehlavi',
  'Hatif Isfahani': 'hatif-isfahani', 'Sabzavari': 'sabzavari', 'Mirza Ghalib': 'mirza-ghalib',
  'Siraj ud-Din Ali Khan Arzu': 'siraj-ud-din-ali-khan-arzu', 'Muhammad Iqbal': 'muhammad-iqbal',
  'Iraj Mirza': 'iraj-mirza', 'Bahar': 'bahar', 'Nima Yushij': 'nima-yushij',
  'Mehdi Akhavan-Sales': 'mehdi-akhavan-sales', 'Ghahraman': 'ghahraman',
  'Simin Behbahani': 'simin-behbahani', 'Persian Proverb': 'unknown'
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
