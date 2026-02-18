import mongoose from 'mongoose';

const quotes = [
  { author: 'Rumi', farsi: 'گر زبان خواهی که باشد ترجمان / دل بباید پاک چون آب روان', english: 'If you want your tongue to be a true interpreter / Your heart must be pure, like flowing water.', theme: 'Authentic speech flows only from a pure and sincere heart' },
  { author: 'Rumi', farsi: 'آفتاب آمد دلیل آفتاب / گر دلیلت باید از وی رو متاب', english: 'The sun itself is the proof of the sun / If you need proof of it, do not turn away from it.', theme: 'Divine truth is self-evident to those who do not turn away from it' },
  { author: 'Rumi', farsi: 'آتش عشق است کاندر نی فتاد / مرد عاشق شد جدا از اهل راد', english: 'The fire of love has fallen into the reed / The true lover has become separate from those of ordinary standing.', theme: 'Love as a transformative fire that separates the devoted from the ordinary' },
  { author: 'Rumi', farsi: 'صبر کن با درد، درمانت کند / صبر کن با غم، خوشانت کند', english: 'Be patient with pain, it will heal you / Be patient with sorrow, it will make you joyful.', theme: 'Enduring pain and sorrow with patience as the path to healing and joy' },
  { author: 'Rumi', farsi: 'هر که را درد است، او برده است گوی / بی‌درد، نی جستجو دارد نه روی', english: 'Whoever has pain has won the prize / Without pain, there is neither search nor face.', theme: 'Pain as the essential catalyst for spiritual seeking and growth' },
  { author: 'Rumi', farsi: 'نی حریف هر که از یاری برید / پرده‌هایش پرده‌های ما درید', english: 'The reed is the companion of all who are severed from a friend / Its veils have torn away our veils.', theme: 'Shared suffering in separation creates profound understanding and empathy' },
  { author: 'Rumi', farsi: 'من به هر جمعیتی نالان شدم / جفت بدحالان و خوش‌حالان شدم', english: 'I lamented in every gathering / I paired with those in misery and with those in joy.', theme: 'Universal compassion that transcends the distinction between joy and sorrow' },
  { author: 'Rumi', farsi: 'عشق بر دریای غم کشتی بود / عاشقی را عشق کافی بود', english: 'Love is a ship upon the sea of sorrow / For the lover, love alone is sufficient.', theme: 'Love as the only vessel that can navigate the seas of sorrow' },
  { author: 'Rumi', farsi: 'پس چه باید کرد ای اقوام شرق؟ / گم شدن در موج این دریای فرق', english: 'So what must be done, O Eastern peoples? / To lose oneself in the waves of this sea of distinction.', theme: 'The dissolution of the ego-self as the ultimate spiritual act' },
  { author: 'Rumi', farsi: 'مرده بودم زنده شدم، گریه بودم خنده شدم / دولت عشق آمد و من دولت پاینده شدم', english: 'I was dead, I came alive; I was weeping, I became laughing / The fortune of love came, and I became an enduring fortune.', theme: 'Love as the divine force that resurrects the dead soul into vibrant life' },
  { author: 'Hafez', farsi: 'آن که پیش از این دل من سوخت از عشق / الله الله چه حریف بی‌محابا', english: 'The one who burned my heart with love before this / God, God, what a bold and fearless companion.', theme: 'The reckless courage of true love that burns without restraint' },
  { author: 'Hafez', farsi: 'رسید مژده که ایام غم نخواهد ماند / چنین نماند و چنین هم نخواهد ماند', english: 'Good news arrived: the days of sorrow will not remain / It did not remain so and it will not remain so.', theme: 'All sorrow is temporary — nothing remains forever, not even suffering' },
  { author: 'Hafez', farsi: 'ای دل غمین مباش که این گنبد مینا / بر هیچ کس نماند و بر هیچ کس نخواهد ماند', english: 'O grieving heart, be not sorrowful, for this azure dome / Did not remain for anyone, and will not remain for anyone.', theme: 'The impermanence of the cosmos as consolation for personal grief' },
  { author: 'Hafez', farsi: 'واعظان کاین جلوه در محراب و منبر می‌کنند / چون به خلوت می‌روند آن کار دیگر می‌کنند', english: 'The preachers who display piety in the mosque and pulpit / When they go into private, they do something altogether different.', theme: 'The gap between public piety and private conduct as the essence of hypocrisy' },
  { author: 'Hafez', farsi: 'گر مسلمانی از این است که حافظ دارد / آه اگر از پس امروز بود فردایی', english: 'If Islam is what Hafez has / Alas, if there is a tomorrow after today.', theme: 'Honest self-examination of one spiritual shortcomings' },
  { author: 'Hafez', farsi: 'شکر خدا که هر چه طلب کردم، یافتم / کام جوان بر آمد و مقصد میسر شد', english: 'Thanks be to God that everything I sought, I found / The wish of youth was fulfilled and the goal was achieved.', theme: 'Gratitude to the divine for the fulfillment of sincere seeking' },
  { author: 'Hafez', farsi: 'هر که آمد عالمی آراست رفت / ما که داریم این جهان را؟', english: 'Everyone who came adorned a world and departed / What do we own of this world?', theme: 'The transience of all human achievement in the face of mortality' },
  { author: 'Hafez', farsi: 'الا ای آهوی وحشی کجایی؟ / مرا با تو است چندین آشنایی', english: 'O wild deer, where are you? / I have so much familiarity with you.', theme: 'The soul kinship with wild, untameable freedom' },
  { author: 'Saadi', farsi: 'نشاید که گویی ندارم توان / چو گفتن توانی که ندارم توان', english: 'You should not say I have no capacity / For you have the capacity to say I have no capacity.', theme: 'The hidden capacity that disproves all claims of inability' },
  { author: 'Saadi', farsi: 'تو آن مرغی که می‌دانی که گفتی / چرا در بند می‌مانی ز دستی', english: 'You are that bird that knows how to speak / Why then do you remain in the hand cage?', theme: 'The tragedy of remaining imprisoned when you possess the power to be free' },
  { author: 'Saadi', farsi: 'چه خوش بود که بعد از این نیک کنم / بدی‌هایم را با نیکی تلافی کنم', english: 'How good it would be if from now on I do good / And compensate for my wrongs with goodness.', theme: 'The power of choosing goodness as a redemption for past wrongs' },
  { author: 'Saadi', farsi: 'بسیار سفر باید تا پخته شود خامی / صوفی نشود صافی تا در سفر نیاید', english: 'Much travel is needed for the raw to become mature / The Sufi does not become refined until he undertakes a journey.', theme: 'Life experience and travel as the essential forge of wisdom and maturity' },
  { author: 'Saadi', farsi: 'کریم الطبع دشوار آزار می‌گیرد / ولی چون برآشفت، دشوار آرام می‌گیرد', english: 'A generous spirit is slow to be offended / But once stirred, it is slow to calm down.', theme: 'The nature of the truly patient — slow to anger but deeply felt when crossed' },
  { author: 'Saadi', farsi: 'یکی نغز گفت از سر راستی / که بیماری راحت است از کاهلی', english: 'Someone wisely said with sincerity / That illness of the body comes from laziness of the soul.', theme: 'Spiritual and physical laziness as root causes of decline and illness' },
  { author: 'Omar Khayyam', farsi: 'گویند کسان بهشت با حور خوش است / من می‌گویم که آب انگور خوش است', english: 'People say paradise with houris is delightful / I say that the juice of the grape is delightful.', theme: 'Preferring present earthly pleasures over speculative future rewards' },
  { author: 'Omar Khayyam', farsi: 'یک قطره آب بود با دریا شد / یک ذره خاک بود با صحرا شد', english: 'A drop of water was, and became the sea / A grain of dust was, and became the desert.', theme: 'The individual merging with the universal — the journey from smallness to vastness' },
  { author: 'Omar Khayyam', farsi: 'چون عمر به سر رسد چه بغداد و چه بلخ / پیمانه چو پر شد چه شیرین و چه تلخ', english: 'When life comes to its end, what matter Baghdad or Balkh / When the cup is full, what matter sweet or bitter.', theme: 'Death as the great equalizer that renders all earthly distinctions meaningless' },
  { author: 'Omar Khayyam', farsi: 'می نوش که بعد از من و تو ماه بسیار / از سلخ به غره شود از غره به سلخ', english: 'Drink wine, for after you and I, the moon will many times / Pass from full to new and from new to full.', theme: 'The endless continuation of cosmic cycles after our passing, urging present joy' },
  { author: 'Omar Khayyam', farsi: 'نیکی و بدی که در نهاد بشر است / شادی و غمی که در قضا و قدر است', english: 'The good and evil that lie in human nature / The joy and sorrow in fate and destiny.', theme: 'The inseparable duality of good and evil, joy and sorrow, in human fate' },
  { author: 'Ferdowsi', farsi: 'مکن بد که بد ببینی اندر جهان / که تخم بدی را بروید زمان', english: 'Do no evil, lest you see evil in the world / For time will cause the seed of evil to sprout.', theme: 'Evil actions as seeds that time inevitably causes to grow and bear bitter fruit' },
  { author: 'Ferdowsi', farsi: 'دانش و دین یار یکدیگر بوند / هر دو با هم تاج افسر بوند', english: 'Knowledge and faith are companions of one another / Together they form the crown of excellence.', theme: 'Knowledge and faith as complementary companions that together create excellence' },
  { author: 'Ferdowsi', farsi: 'زبان را نگه دار در زیر دندان / که چون تیر رفته نیاید به کمان', english: 'Guard your tongue behind your teeth / For like an arrow that has been fired, it cannot return to the bow.', theme: 'Words, like arrows, once released cannot be taken back' },
  { author: 'Ferdowsi', farsi: 'سر مرد گردد سخن چون دراز / از اندک سخن گفتن آید نیاز', english: 'A man head is turned by speech when it is prolonged / From speaking little comes what is needed.', theme: 'Brevity in speech as a mark of wisdom and practical necessity' },
  { author: 'Ferdowsi', farsi: 'چنین گفت موبد که مرد دروغ‌زن / نگردد کبیر اندر انجمن', english: 'Thus spoke the wise man: the liar / Will never become great in the assembly.', theme: 'Dishonesty as an insurmountable obstacle to true greatness and respect' },
  { author: 'Nizami Ganjavi', farsi: 'از محبت خارها گل می‌شود / از محبت سرکه‌ها مل می‌شود', english: 'Through love, thorns become roses / Through love, vinegar becomes wine.', theme: 'Love as a divine alchemy that transforms bitterness and pain into beauty' },
  { author: 'Nizami Ganjavi', farsi: 'چو گنج عشق در دل داشتی / همه عالم از آن آباد داشتی', english: 'When you carry the treasure of love in your heart / You hold the entire world in a state of flourishing.', theme: 'Love as an inner treasure that enriches one entire relationship with the world' },
  { author: 'Nizami Ganjavi', farsi: 'هر کسی کو دور ماند از اصل خویش / باز می‌جوید روزگار وصل خویش', english: 'Whoever remains apart from their true origin / Seeks again the era of reunion.', theme: 'The eternal yearning to return to one true origin and nature' },
  { author: 'Nizami Ganjavi', farsi: 'مرد با همت بلند است در جهان / که رسد بر اوج آرزوی خویشتن', english: 'The person of high ambition stands tall in the world / Who reaches the peak of their own desires.', theme: 'High ambition and the determination to reach the peaks of one aspirations' },
  { author: 'Attar', farsi: 'چون دل پاک باشد، راه پاک باشد / وقت پاک باشد، نگاه پاک باشد', english: 'When the heart is pure, the path is pure / When the moment is pure, the vision is pure.', theme: 'Inner purity of heart as the source of clear perception and a righteous path' },
  { author: 'Attar', farsi: 'در همه ذرات جهان خورشیدی است / آن که بیناست، ببیند این را هشیار', english: 'In every atom of the world, there is a sun / One who is truly awake will see this clearly.', theme: 'Divine light as present in every particle of existence for those who are awake' },
  { author: 'Attar', farsi: 'مرغ روحم در قفس نگه دارم / کی برد این مرغ را خورشید راه', english: 'I keep the bird of my soul in a cage / When will the sun of the path liberate this bird?', theme: 'The soul imprisonment in the ego-self and its longing for divine liberation' },
  { author: 'Attar', farsi: 'تو خود حجاب خودی حافظ از میان برخیز', english: 'You yourself are the veil between yourself and the divine — rise from the midst.', theme: 'The ego-self as the only true barrier between the human and the divine' },
  { author: 'Attar', farsi: 'عشق را هفتاد و دو ملت بهانه است / عاشقی مذهب جداگانه است', english: 'Love has seventy-two nations as its pretexts / Lovingness itself is a separate religion.', theme: 'Love as a universal religion that transcends all sectarian divisions' },
  { author: 'Ibn Sina', farsi: 'طبیب که خود بیمار است، درمان کدام است؟', english: 'What cure does a physician have who is himself sick?', theme: 'The necessity of healing oneself before presuming to heal others' },
  { author: 'Ibn Sina', farsi: 'انسان از دو چیز ساخته شده: تن و روح / تن نیازمند خوراک است و روح نیازمند حکمت', english: 'A human is made of two things: body and soul / The body needs food, and the soul needs wisdom.', theme: 'The dual nourishment required by human beings — food for the body, wisdom for the soul' },
  { author: 'Ibn Sina', farsi: 'عقل اول بپرس، سپس بگو / تا ندانی، لب ز گفتار فرو', english: 'First ask your reason, then speak / Until you know, keep your lips from speaking.', theme: 'Rational inquiry as the prerequisite for all meaningful speech' },
  { author: 'Ibn Sina', farsi: 'فضیلت در علم است و عمل / نه در نژاد و اصل و نسب', english: 'Virtue lies in knowledge and action / Not in race, origin, or lineage.', theme: 'True virtue is earned through knowledge and action, not inherited through lineage' },
  { author: 'Al-Biruni', farsi: 'دانستن سود دارد، نه دانستن زیان', english: 'Knowing is beneficial; not knowing is harmful.', theme: 'Knowledge as always beneficial and ignorance as always harmful' },
  { author: 'Al-Biruni', farsi: 'هر پدیده‌ای علتی دارد / و هر علتی را می‌توان یافت', english: 'Every phenomenon has a cause / And every cause can be found.', theme: 'The rational and discoverable nature of all causality in the universe' },
  { author: 'Al-Biruni', farsi: 'آنچه نمی‌دانی را بگویی نمی‌دانم / که این خود نوعی دانش است', english: 'Say I do not know to what you do not know / For this itself is a form of knowledge.', theme: 'Admitting ignorance honestly as itself a form of genuine wisdom' },
  { author: 'Naser Khosrow', farsi: 'کسی که با دانش نشست، دانا شد / کسی که با نادان نشست، نادان شد', english: 'He who sat with the learned became learned / He who sat with the ignorant became ignorant.', theme: 'The transformative power of one intellectual and social environment' },
  { author: 'Naser Khosrow', farsi: 'هر که حق گوید، حق‌اش پیدا شود / هر که باطل گوید، باطل‌اش نمایان شود', english: 'Whoever speaks truth, their truth will become manifest / Whoever speaks falsehood, their falsehood will become apparent.', theme: 'The inevitable manifestation of both truth and falsehood over time' },
  { author: 'Sanai', farsi: 'تا نگردی آشنا زین پرده، راز نشنوی / دل پاک کن که این آیینه را گرد نشنوی', english: 'Until you become familiar with this veil, you will hear no secret / Purify the heart, for you will not hear the dust on this mirror.', theme: 'Spiritual purity as the prerequisite for receiving divine secrets' },
  { author: 'Sanai', farsi: 'خوش بود گر محک تجربه آید به میان / تا سیه‌روی شود هر که در او غش باشد', english: 'It would be good if the touchstone of experience came forth / So that whoever has impurity within them would be exposed.', theme: 'Experience as the ultimate touchstone that reveals true character and hidden flaws' },
  { author: 'Jami', farsi: 'دوست آن است که گیرد دست دوست / در پریشان‌حالی و درماندگی', english: 'A friend is one who takes the hand of a friend / In times of distress and helplessness.', theme: 'True friendship defined by presence and support in times of greatest need' },
  { author: 'Jami', farsi: 'کمال انسان نه در ثروت است نه در قدرت / بلکه در معرفت و محبت است', english: 'Human perfection lies not in wealth or power / But in knowledge and love.', theme: 'True human perfection measured by love and knowledge rather than power or wealth' },
  { author: 'Jami', farsi: 'هر که را دل پاک بود، زندگی‌اش پاک بود / هر که را دل کج بود، راهش کج بود', english: 'Whoever has a pure heart has a pure life / Whoever has a crooked heart has a crooked path.', theme: 'The heart as the source that determines the quality and direction of one life' },
  { author: 'Rudaki', farsi: 'هر که نکوتر زیست، او را بیشتر جای است در یاد', english: 'Whoever lived more beautifully occupies more space in memory.', theme: 'A beautiful life as the most enduring claim on the memory of posterity' },
  { author: 'Rudaki', farsi: 'علم داری، عمل کن، که علم بی‌عمل / مانند درختی است که میوه ندارد', english: 'If you have knowledge, act upon it, for knowledge without action / Is like a tree that bears no fruit.', theme: 'Knowledge that is not put into action is sterile and without value' },
  { author: 'Hakim Owhadi', farsi: 'قدر وقت ار نشناسد دل و کاری نکند / این همه راه که آمد، همه را باز رود', english: 'If the heart does not know the value of time and does nothing / All the road it has traveled, it will travel back again.', theme: 'Failure to act decisively in time leads only to wasted effort and regression' },
  { author: 'Amir Khusrow', farsi: 'در هجر ماهرویان، دل بسوزد آتشین / چون شمع می‌گدازد اندر آتش یقین', english: 'In the absence of a sun-faced beloved, the heart burns fiercely / Like a candle melting in the fire of certainty.', theme: 'The burning intensity of the heart that endures the absence of the beloved' },
  { author: 'Amir Khusrow', farsi: 'زبان شیرین، دل آدم را نرم کند / زبان تلخ، دل آدم را سخت کند', english: 'Sweet speech softens a person heart / Bitter speech hardens a person heart.', theme: 'The power of gentle speech to open hearts and of harsh speech to close them' },
  { author: 'Parvin Etesami', farsi: 'گهر پیدا کن اندر ژرف دریا / اگر آسایش دیدار خواهی', english: 'Find the pearl in the depths of the sea / If you desire the peace of true vision.', theme: 'True treasures require the courage to dive into the deepest depths' },
  { author: 'Parvin Etesami', farsi: 'ستم‌دیده را توان و توان بیشتر است / که زیر بار ستم، جان می‌شود محکم‌تر', english: 'The oppressed have greater strength and capacity / For under the burden of oppression, the soul becomes stronger.', theme: 'Suffering and oppression as the forge that tempers and strengthens the human soul' },
  { author: 'Forough Farrokhzad', farsi: 'در شب تاریک، روشنایی را باید یافت / که آفتاب هر روز از نو می‌درخشد', english: 'In the dark night, one must find the light / For the sun shines anew each day.', theme: 'Hope as the light that must actively be sought in the darkest of times' },
  { author: 'Ahmad Shamlu', farsi: 'وقتی که می‌خندی، دنیا می‌خندد با تو / وقتی که گریه می‌کنی، تنها گریه می‌کنی', english: 'When you laugh, the world laughs with you / When you cry, you cry alone.', theme: 'The social truth that joy is shared while sorrow is often borne alone' },
  { author: 'Ahmad Shamlu', farsi: 'انسان را شناختن، خود را شناختن است', english: 'To know a human being is to know oneself.', theme: 'The deep connection between understanding others and understanding oneself' },
  { author: 'Sohrab Sepehri', farsi: 'چشم‌ها را باید شست / جور دیگر باید دید', english: 'One must wash one eyes / One must see differently.', theme: 'The necessity of cleansing one perception to see the world truly and freshly' },
  { author: 'Sohrab Sepehri', farsi: 'زندگی یعنی که تنها باشی / زندگی یعنی که آزاد باشی', english: 'Life means being alone / Life means being free.', theme: 'Solitude and freedom as the twin pillars of authentic human existence' },
  { author: 'Sohrab Sepehri', farsi: 'به باغ آمدم، درختان را دیدم / بوی گل دادند، آب را شنیدم', english: 'I came to the garden, I saw the trees / They gave off the fragrance of flowers, I heard the water.', theme: 'Full sensory presence in nature as a form of awakened consciousness' },
  { author: 'Nizam al-Mulk', farsi: 'آن پادشاه که به مردم ظلم کند / پادشاهی‌اش دیری نپاید', english: 'A king who oppresses his people / His kingship will not last long.', theme: 'Oppression as the seed of a ruler own inevitable downfall' },
  { author: 'Nizam al-Mulk', farsi: 'وزیر خردمند، سلطان را بزرگ کند / وزیر نادان، سلطان را کوچک کند', english: 'A wise minister makes the sultan great / A foolish minister makes the sultan small.', theme: 'The critical importance of wise counsel in determining a leader greatness or failure' },
  { author: 'Al-Ghazali', farsi: 'اگر به دنبال خوشبختی می‌گردی، به درون خود نگاه کن / چرا که خوشبختی در بیرون از تو نیست', english: 'If you are looking for happiness, look within yourself / For happiness does not lie outside of you.', theme: 'Happiness as an inner state that can only be found through self-inquiry' },
  { author: 'Al-Ghazali', farsi: 'دنیا مزرعه آخرت است', english: 'This world is the field of the hereafter.', theme: 'The present life as a field in which one plants the seeds of eternal consequence' },
  { author: 'Al-Ghazali', farsi: 'ستودن خود نشانه نادانی است / شکستن دیگران نشانه ضعف است', english: 'Praising yourself is a sign of ignorance / Belittling others is a sign of weakness.', theme: 'Self-aggrandizement and the disparagement of others as signs of ignorance and weakness' },
  { author: 'Abu Said Abil Kheir', farsi: 'هر که شد محرم دل، در حرم یار نشست / که حرم درگه اسرار دل‌افروز من است', english: 'Whoever becomes privy to the heart secrets, sits in the beloved sanctuary / For the sanctuary is the threshold of the secrets that kindle my heart.', theme: 'The innermost heart as the sacred sanctuary where the divine is truly encountered' },
  { author: 'Abu Said Abil Kheir', farsi: 'گر مرد رهی، میان خون باید رفت / از پای در آمده سرنگون باید رفت', english: 'If you are a traveler of the path, you must go through blood / You must go tumbling headlong where feet fail.', theme: 'The spiritual path demands total sacrifice, even to the point of complete surrender' },
  { author: 'Baba Tahir', farsi: 'دلم غرق درد است از دوری یار / که دوری چو آتش بسوزد دلم زار', english: 'My heart is drowning in pain from the distance of my beloved / For distance, like fire, burns my wretched heart.', theme: 'The consuming fire of longing caused by distance from one beloved' },
  { author: 'Baba Tahir', farsi: 'اگر صد سال خوانی علم و حکمت / ولی مهرت نباشد، کور و کر مان', english: 'If you study knowledge and wisdom for a hundred years / But have no love, you remain blind and deaf.', theme: 'Love as the sense that gives sight and hearing to all accumulated knowledge' },
  { author: 'Nasir al-Din Tusi', farsi: 'انسان کامل کسی است که عقل او بر هوای نفس غلبه کند', english: 'A perfect human being is one whose reason triumphs over the desires of the ego.', theme: 'Human perfection defined by the victory of reason over ego-driven desire' },
  { author: 'Nasir al-Din Tusi', farsi: 'سعادت در سه چیز است: علم، عمل، و اخلاق', english: 'Happiness lies in three things: knowledge, action, and moral character.', theme: 'The threefold formula for genuine happiness — knowledge, action, and virtue' },
  { author: 'Persian Proverb', farsi: 'درخت هر قدر بلندتر باشد، ریشه‌اش عمیق‌تر است', english: 'The taller the tree, the deeper its roots.', theme: 'True height and achievement are supported by correspondingly deep foundations' },
  { author: 'Persian Proverb', farsi: 'ماهی از سر گنده می‌شود نه از دم', english: 'A fish rots from the head, not from the tail.', theme: 'Leadership and those at the top bear primary responsibility for institutional decay' },
  { author: 'Persian Proverb', farsi: 'آب از سرچشمه صاف است', english: 'Water is pure at its source.', theme: 'Things are most pure and true at their origin before being corrupted by distance' },
  { author: 'Persian Proverb', farsi: 'اگر کوه به کوه نمی‌رسد، آدم به آدم می‌رسد', english: 'If mountain does not meet mountain, person meets person.', theme: 'Human beings inevitably find one another even when circumstances seem impossible' },
  { author: 'Persian Proverb', farsi: 'عروس نشان می‌دهند، عیب پنهان می‌کنند', english: 'The bride is shown; her faults are hidden.', theme: 'The universal tendency to present the best face while concealing true shortcomings' },
  { author: 'Persian Proverb', farsi: 'با یک گل بهار نمی‌شود', english: 'With a single flower, spring does not arrive.', theme: 'No single effort alone is sufficient — great things require collective contribution' },
  { author: 'Persian Proverb', farsi: 'صبر تلخ است ولی ثمره‌اش شیرین', english: 'Patience is bitter, but its fruit is sweet.', theme: 'The bitterness of patience is always redeemed by the sweetness of its eventual reward' },
  { author: 'Persian Proverb', farsi: 'سنگ بزرگ نشان نزدن است', english: 'A large stone is a sign of not being thrown.', theme: 'Grandiose plans that are never executed are worse than modest ones fulfilled' },
  { author: 'Persian Proverb', farsi: 'گاو پیشانی سفید را همه می‌شناسند', english: 'Everyone knows the cow with the white forehead.', theme: 'Those with distinctive character or reputation cannot hide or remain unknown' },
  { author: 'Persian Proverb', farsi: 'آتش که گرفت، خشک و تر می‌سوزد', english: 'When fire catches, it burns both the dry and the wet.', theme: 'Uncontrolled destructive forces make no distinction between the innocent and guilty' },
  { author: 'Persian Proverb', farsi: 'کار نیکو کردن از پر کردن است', english: 'Doing good work comes from filling oneself first.', theme: 'One must first fill oneself with knowledge and virtue before doing truly good work' },
  { author: 'Persian Proverb', farsi: 'حرف مرد یکی است', english: 'A man word is one (i.e., a person of honor keeps their word).', theme: 'Integrity of character is measured by the consistency between one words and deeds' },
  { author: 'Persian Proverb', farsi: 'دوری و دوستی', english: 'Distance and friendship (i.e., absence makes the heart grow fonder).', theme: 'Occasional separation can strengthen the bonds of friendship and love' },
  { author: 'Persian Proverb', farsi: 'شتر در خواب بیند پنبه‌دانه / گاهی لپ‌لپ خورد گاه دانه‌دانه', english: 'The camel dreams of cotton fields / Sometimes it eats in gulps, sometimes grain by grain.', theme: 'The vast gap between what we dream of and the modest reality we actually inhabit' },
  { author: 'Persian Proverb', farsi: 'هر که بامش بیش، برفش بیشتر', english: 'Whoever has the bigger roof, has more snow on it.', theme: 'Greater privilege, status, or wealth comes with proportionally greater burden and responsibility' },
  { author: 'Persian Proverb', farsi: 'نه سیخ بسوزد، نه کباب', english: 'Neither the skewer burns nor the kebab (i.e., doing things with wisdom to avoid all losses).', theme: 'True wisdom finds solutions where no one loses and all interests are preserved' },
  { author: 'Persian Proverb', farsi: 'آدم عاقل عبرت می‌گیرد، آدم احمق پشیمان می‌شود', english: 'A wise person learns a lesson; a foolish person only regrets.', theme: 'Wisdom converts experience into lessons while foolishness converts it into mere regret' },
  { author: 'Persian Proverb', farsi: 'در بسته را که باز کند؟ مگر کلید', english: 'Who can open a locked door? Only a key.', theme: 'Every problem has a specific solution; the task is finding the right key' },
  { author: 'Persian Proverb', farsi: 'هر نی که خورد زهر، تریاکش هم هست', english: 'For every poison that a reed drinks, its antidote also exists.', theme: 'For every harm or poison in the world, a corresponding remedy also exists' },
  { author: 'Persian Proverb', farsi: 'شیر را در قفس پرورش ندهند', english: 'A lion is not raised in a cage.', theme: 'True greatness and wild potential cannot flourish within confining environments' },
  { author: 'Khalil ibn Ahmad', farsi: 'من آنم که می‌دانم که نمی‌دانم', english: 'I am the one who knows that he does not know.', theme: 'The Socratic acknowledgment that true knowledge begins with knowing one own ignorance' },
  { author: 'Khalil ibn Ahmad', farsi: 'زبان شمشیر است، از آن مراقب باش / که زخمش از زخم تیغ دیرتر بهبود یابد', english: 'The tongue is a sword, guard it carefully / For its wound heals more slowly than the wound of a blade.', theme: 'Words wound more deeply and heal more slowly than any physical blade' },
  { author: 'Qabus', farsi: 'هر که را صبر است، کامروا شود / ثمره صبر همیشه شیرین بود', english: 'Whoever has patience will have their wishes fulfilled / The fruit of patience is always sweet.', theme: 'Patience as the guaranteed path to the fulfillment of one deepest wishes' },
  { author: 'Qabus', farsi: 'آنچه در قلبت داری، روز به روز بر زبانت می‌آید', english: 'What you carry in your heart comes to your tongue day by day.', theme: 'The inner content of the heart inevitably reveals itself through speech over time' },
  { author: 'Rashid al-Din', farsi: 'دانش بدون حکمت، خطرناک است', english: 'Knowledge without wisdom is dangerous.', theme: 'Raw knowledge unguided by moral wisdom becomes a dangerous instrument' },
  { author: 'Rashid al-Din', farsi: 'آنچه برای خود نمی‌پسندی برای دیگران هم مپسند', english: 'What you do not wish for yourself, do not wish for others.', theme: 'The Golden Rule: empathy and reciprocity as the foundation of all ethics' },
  { author: 'Manuchehri', farsi: 'بهار آمد، گل‌ها شکفتند / دل را به شادی وا کن، که دنیا تازه شد', english: 'Spring has come, the flowers have bloomed / Open your heart to joy, for the world is renewed.', theme: 'Spring as a divine invitation to open the heart to renewal and joy' },
  { author: 'Auhad ud-Din Kirmani', farsi: 'سالک آن است که ذره ذره از خود بگذرد / تا به دریای بی‌کران برسد', english: 'The spiritual seeker is one who passes beyond themselves, particle by particle / Until reaching the boundless sea.', theme: 'The spiritual journey as a gradual dissolution of the self into the infinite divine' },
  { author: 'Auhad ud-Din Kirmani', farsi: 'محبت کن به هر ذره که ببینی / که در هر ذره‌ای، خورشیدی نهفته است', english: 'Love every particle that you see / For within every particle, a sun is hidden.', theme: 'Divine love revealed in every particle of existence to the awakened eye' },
  { author: 'Sanai', farsi: 'طالب دیدار حق، چون حق شود / از همه عالم جدا و متحد', english: 'The seeker of the divine vision, when becoming divine / Becomes both separate from the whole world and united with it.', theme: 'The paradox of the divine seeker who, in union, becomes both separate and one with all' },
  { author: 'Sanai', farsi: 'چون نمی‌دانی کجا خواهی رسید / خود برو، ره خود به خود می‌دانی دید', english: 'Since you do not know where you will arrive / Just go — the path reveals itself to you as you travel.', theme: 'The courage to begin walking without knowing the destination, trusting the path to reveal itself' },
  { author: 'Iraj Mirza', farsi: 'از مادر خود شرم نیست کردن / با مهر مادر، دنیا گلستان شود', english: 'It is no shame to be devoted to one mother / Through a mother love, the world becomes a garden of roses.', theme: 'Maternal love as the original and most transformative love that makes the world bloom' },
  { author: 'Khaqani', farsi: 'تاج شاهان از زر است و سیم و گوهر / تاج فرزانه از علم است و هنر', english: 'The crown of kings is made of gold, silver, and gems / The crown of the wise is made of knowledge and art.', theme: 'The crown of wisdom, made of knowledge and art, exceeds any crown of worldly power' },
  { author: 'Anvari', farsi: 'ای که یک عمر تمنای سخن داری و بس / هنر آن نیست که گویی، هنر آن است که دانی', english: 'O you who spend a lifetime only craving to speak / The art is not in speaking, the art is in knowing.', theme: 'True artistry lies in depth of knowledge rather than in the volume of speech' },
  { author: 'Anvari', farsi: 'کمال مرد در سخن است و در خرد / نه در مال و جاه و زر و سیم و خرد', english: 'A man perfection lies in his speech and his reason / Not in wealth, status, gold, silver, and possessions.', theme: 'Eloquence and rational wisdom as the true measure of a person worth and perfection' },
  { author: 'Nezami Aruzi', farsi: 'آن کس که در راه دانش گام زد / از تاریکی جهالت رهایی یافت', english: 'The one who walked the path of knowledge / Found liberation from the darkness of ignorance.', theme: 'The pursuit of knowledge as the path from the darkness of ignorance into liberating light' },
  { author: 'Rumi', farsi: 'دی شیخ با چراغ همی‌گشت گرد شهر / کز دیو و دد ملولم و انسانم آرزوست', english: 'Yesterday the Sheikh wandered around the city with a lantern / Saying: I am weary of demons and beasts — I yearn for a human being.', theme: 'The rarity of true human beings who possess genuine virtue, compassion, and wisdom' },
  { author: 'Rumi', farsi: 'مولوی هرگز نخواند جز دل / کو نخوانده است همیشه کتاب دل', english: 'Rumi never read anything but the heart / For he who has not read the book of the heart, has not truly read.', theme: 'The heart as the supreme and most essential text, surpassing all written books' },
  { author: 'Hafez', farsi: 'همه کس طالب یارند، چه هشیار و چه مست / همه جا خانه عشق است، چه مسجد چه کنیشت', english: 'Everyone seeks the beloved, whether sober or drunk / Everywhere is the house of love, whether mosque or synagogue.', theme: 'Love as the universal human seeking that transcends all religious boundaries' }
];

const authorMap: Record<string, string> = {
  'Rumi': 'rumi', 'Hafez': 'hafez', 'Saadi': 'saadi', 'Omar Khayyam': 'unknown', 'Ferdowsi': 'ferdowsi',
  'Nizami Ganjavi': 'nizami', 'Attar': 'attar', 'Ibn Sina': 'ibn-sina', 'Al-Biruni': 'al-biruni',
  'Naser Khosrow': 'naser-khosrow', 'Sanai': 'sanai', 'Jami': 'jami', 'Rudaki': 'rudaki',
  'Hakim Owhadi': 'unknown', 'Amir Khusrow': 'amir-khusrow', 'Parvin Etesami': 'parvin-etesami',
  'Forough Farrokhzad': 'forough-farrokhzad', 'Ahmad Shamlu': 'ahmad-shamlu', 'Sohrab Sepehri': 'sohrab-sepehri',
  'Nizam al-Mulk': 'nizam-al-mulk', 'Al-Ghazali': 'al-ghazali', 'Abu Said Abil Kheir': 'abu-said-abil-kheir',
  'Baba Tahir': 'baba-tahir', 'Nasir al-Din Tusi': 'nasir-al-din-tusi', 'Persian Proverb': 'unknown',
  'Khalil ibn Ahmad': 'khalil-ibn-ahmad', 'Qabus': 'qabus', 'Rashid al-Din': 'rashid-al-din',
  'Manuchehri': 'manuchehri', 'Auhad ud-Din Kirmani': 'auhad-ud-din-kirmani', 'Iraj Mirza': 'iraj-mirza',
  'Khaqani': 'khaqani', 'Anvari': 'anvari', 'Nezami Aruzi': 'nezami-aruzi'
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
