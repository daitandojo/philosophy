'use client';

import { useRef, useState, useEffect } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Image from 'next/image';

const philosopherImages: Record<string, string> = {
  rumi: '/images/philosopher-rumi.png',
  hafez: '/images/philosopher-hafez.png',
  saadi: '/images/philosopher-saadi.png',
  attar: '/images/philosopher-attar.png',
  sanai: '/images/philosopher-sanai.png',
  jami: '/images/philosopher-jami.png',
  nizami: '/images/philosopher-nizami.png',
  ferdowsi: '/images/philosopher-ferdowsi.png',
  'ibn-sina': '/images/philosopher-ibn-sina.png',
  'al-farabi': '/images/philosopher-al-farabi.png',
  'al-kindi': '/images/philosopher-al-kindi.png',
  'al-ghazali': '/images/philosopher-al-ghazali.png',
  suhrawardi: '/images/philosopher-suhrawardi.png',
  'mulla-sadra': '/images/philosopher-mulla-sadra.png',
  'nasir-tusi': '/images/philosopher-nasir-tusi.png',
  'ibn-rushd': '/images/philosopher-ibn-rushd.png',
  'ibn-arabi': '/images/philosopher-ibn-arabi.png',
  'bayazid-bastami': '/images/philosopher-bayazid-bastami.png',
  hallaj: '/images/philosopher-hallaj.png',
  'junayd-baghdadi': '/images/philosopher-junayd-baghdadi.png',
  'abdul-qadir-gilani': '/images/philosopher-abdul-qadir-gilani.png',
  'najm-kubra': '/images/philosopher-najm-kubra.png',
  'seyyed-hossein-nasr': '/images/philosopher-seyyed-hossein-nasr.png',
  'allama-tabatabai': '/images/philosopher-allama-tabatabai.png',
  'morteza-motahhari': '/images/philosopher-morteza-motahhari.png',
  'abdolkarim-soroush': '/images/philosopher-abdolkarim-soroush.png',
  'Dariush-shayegan': '/images/philosopher-dariush-shayegan.png',
  zoroaster: '/images/philosopher-zoroaster.png',
  mazdak: '/images/philosopher-mazdak.png',
  mani: '/images/philosopher-mani.png',
};

interface PhilosopherData {
  id: string;
  name: string;
  title: string;
  birth: number;
  death?: number;
  bio: string;
  image: string;
  quoteFarsi: string;
  quoteEnglish: string;
}

const philosopherData: PhilosopherData[] = [
  { id: 'zoroaster', name: 'Zoroaster', title: 'Prophet of Ancient Persia', birth: -628, death: -551, bio: 'Founder of Zoroastrianism, one of the oldest monotheistic religions.', image: philosopherImages.zoroaster, quoteFarsi: 'پندار نیک، گفتار نیک، کردار نیک', quoteEnglish: 'Good thoughts, good words, good deeds.' },
  { id: 'mani', name: 'Mani', title: 'Prophet of Light', birth: 216, death: 276, bio: 'Founder of Manichaeism, a major religious movement.', image: philosopherImages.mani, quoteFarsi: 'نور و تاریکی در جدال ابدی هستند', quoteEnglish: 'Light and darkness are in eternal struggle.' },
  { id: 'mazdak', name: 'Mazdak', title: 'Social Reformer', birth: 420, death: 530, bio: 'Persian proto-communist philosopher and religious leader.', image: philosopherImages.mazdak, quoteFarsi: 'ثروت باید میان همه تقسیم شود', quoteEnglish: 'Wealth should be shared among all.' },
  { id: 'al-kindi', name: 'Al-Kindi', title: 'Father of Arab Philosophy', birth: 801, death: 873, bio: 'First major philosopher of the Islamic golden age.', image: philosopherImages['al-kindi'], quoteFarsi: 'حقیقت را از هر کجا که بیاید بپذیرید', quoteEnglish: 'Accept the truth from wherever it comes.' },
  { id: 'al-farabi', name: 'Al-Farabi', title: 'Second Teacher', birth: 872, death: 950, bio: 'Polymath who contributed to philosophy, music, and science.', image: philosopherImages['al-farabi'], quoteFarsi: 'سعادت در شناخت حقیقت است', quoteEnglish: 'Happiness lies in knowing the truth.' },
  { id: 'ibn-sina', name: 'Ibn Sina', title: 'Avicenna', birth: 980, death: 1037, bio: 'Persian polymath and physician, author of The Canon of Medicine.', image: philosopherImages['ibn-sina'], quoteFarsi: 'علم بدون عمل مانند درختی است بی‌میوه', quoteEnglish: 'Knowledge without action is like a tree without fruit.' },
  { id: 'bayazid-bastami', name: 'Bayazid Bastami', title: 'Sufi Mystic', birth: 804, death: 874, bio: 'Early Persian Sufi known for his ecstatic experiences of God.', image: philosopherImages['bayazid-bastami'], quoteFarsi: 'من خود را گم کردم تا خدا را بیابم', quoteEnglish: 'I lost myself to find God.' },
  { id: 'hallaj', name: 'Hallaj', title: 'Martyr of Love', birth: 858, death: 922, bio: 'Sufi mystic famous for his declaration "Ana al-Haqq".', image: philosopherImages.hallaj, quoteFarsi: 'انا الحق', quoteEnglish: 'I am the Truth.' },
  { id: 'junayd-baghdadi', name: 'Junayd Baghdad', title: 'Sufi Master', birth: 830, death: 910, bio: 'One of the most important figures in early Sufism.', image: philosopherImages['junayd-baghdadi'], quoteFarsi: 'تصوف آن است که تو با خدا باشی و هیچ نباشی', quoteEnglish: 'Sufism is that you should be with God and be nothing.' },
  { id: 'attar', name: 'Attar', title: 'Poet Mystic', birth: 1145, death: 1221, bio: 'Persian poet known for his Sufi poetry including The Conference of the Birds.', image: philosopherImages.attar, quoteFarsi: 'سی مرغ به پرواز درآمدند، سیمرغ شدند', quoteEnglish: 'Thirty birds took flight and became the Simurgh.' },
  { id: 'najm-kubra', name: 'Najm Kubra', title: 'Sufi Master', birth: 1145, death: 1221, bio: 'Founder of the Kubrawiya Sufi order.', image: philosopherImages['najm-kubra'], quoteFarsi: 'نور دل را روشن می‌کند', quoteEnglish: 'Light illuminates the heart.' },
  { id: 'sanai', name: 'Sanai', title: 'Poet Philosopher', birth: 1080, death: 1131, bio: 'Persian poet who pioneered mystical poetry.', image: philosopherImages.sanai, quoteFarsi: 'عالم همه صورت توست، جان همه سیرت توست', quoteEnglish: 'The world is your form, the soul is your essence.' },
  { id: 'ferdowsi', name: 'Ferdowsi', title: 'Poet of Kings', birth: 940, death: 1020, bio: 'Author of Shahnameh, the epic poem of Persia.', image: philosopherImages.ferdowsi, quoteFarsi: 'توانا بود هر که دانا بود', quoteEnglish: 'He who has knowledge is powerful.' },
  { id: 'nizami', name: 'Nizami', title: 'Poet of Wisdom', birth: 1141, death: 1209, bio: 'Persian poet known for his Khamsa (Quintet).', image: philosopherImages.nizami, quoteFarsi: 'عشق آتش است و ما هیزم آن', quoteEnglish: 'Love is fire and we are its fuel.' },
  { id: 'rumi', name: 'Rumi', title: 'Mawlana', birth: 1207, death: 1273, bio: 'The greatest Sufi poet, author of the Masnavi and Divan-e Shams.', image: philosopherImages.rumi, quoteFarsi: 'بیا، بیا، هر آنچه هستی بیا', quoteEnglish: 'Come, come, whoever you are, come.' },
  { id: 'saadi', name: 'Saadi', title: 'Poet of Wisdom', birth: 1210, death: 1291, bio: 'Famous for his practical wisdom in Golestan and Bustan.', image: philosopherImages.saadi, quoteFarsi: 'بنى آدم اعضای یکدیگرند', quoteEnglish: 'Human beings are members of a whole.' },
  { id: 'hafez', name: 'Hafez', title: 'Tongue of the Invisible', birth: 1315, death: 1390, bio: 'Master of the ghazal form, author of the Divan-e Hafez.', image: philosopherImages.hafez, quoteFarsi: 'مرا به کار جهان چه کار؟', quoteEnglish: 'What business have I with the affairs of the world?' },
  { id: 'jami', name: 'Jami', title: 'Last Great Sufi Poet', birth: 1414, death: 1492, bio: 'Last major poet of classical Persia.', image: philosopherImages.jami, quoteFarsi: 'هر که را اسرار حق آموختند، مهر کردند و دهانش دوختند', quoteEnglish: 'Those who were taught the secrets of Truth were sealed with a kiss and their mouths were sewn shut.' },
  { id: 'suhrawardi', name: 'Suhrawardi', title: 'Master of Illumination', birth: 1154, death: 1191, bio: 'Founder of the Illuminationist school of philosophy.', image: philosopherImages.suhrawardi, quoteFarsi: 'نور، حقیقت مطلق است', quoteEnglish: 'Light is the absolute truth.' },
  { id: 'ibn-rushd', name: 'Ibn Rushd', title: 'Averroes', birth: 1126, death: 1198, bio: 'Andalusian philosopher who defended Aristotelian philosophy.', image: philosopherImages['ibn-rushd'], quoteFarsi: 'عقل و ایمان با هم سازگارند', quoteEnglish: 'Reason and faith are compatible.' },
  { id: 'nasir-tusi', name: 'Nasir al-Din Tusi', title: 'Polymath', birth: 1201, death: 1274, bio: 'Persian polymath who contributed to astronomy and philosophy.', image: philosopherImages['nasir-tusi'], quoteFarsi: 'جهان بر اساس نظم ریاضی استوار است', quoteEnglish: 'The universe is based on mathematical order.' },
  { id: 'ibn-arabi', name: 'Ibn Arabi', title: 'Sheikh al-Akbar', birth: 1165, death: 1240, bio: 'One of the most important Sufi masters, author of Fusus al-Hikam.', image: philosopherImages['ibn-arabi'], quoteFarsi: 'خداوند آیینه‌ای است که خود را در آن می‌بیند', quoteEnglish: 'God is a mirror in which He sees Himself.' },
  { id: 'al-ghazali', name: 'Al-Ghazali', title: 'Proof of Islam', birth: 1058, death: 1111, bio: 'The most influential Muslim after the Prophet Muhammad.', image: philosopherImages['al-ghazali'], quoteFarsi: 'علم حقیقی، علم به خداوند است', quoteEnglish: 'True knowledge is knowledge of God.' },
  { id: 'mulla-sadra', name: 'Mulla Sadra', title: 'Transcendent Theosophy', birth: 1571, death: 1640, bio: 'Founder of Transcendent Theosophy (Hikmat al-Mutaaliya).', image: philosopherImages['mulla-sadra'], quoteFarsi: 'وجود، حقیقت بسیط و واحد است', quoteEnglish: 'Existence is a simple and unified reality.' },
].sort((a, b) => a.birth - b.birth);

const eraThemes: Record<string, { bg: string; accent: string; name: string }> = {
  ancient: { bg: '#1a0a00', accent: '#ff6b35', name: 'Ancient Persia' },
  classical: { bg: '#0a1a2e', accent: '#4fc3f7', name: 'Classical Age' },
  golden: { bg: '#1a0f1a', accent: '#ce93d8', name: 'Islamic Golden Age' },
  medieval: { bg: '#0f1a1a', accent: '#26a69a', name: 'Medieval Persia' },
  modern: { bg: '#1a1a1a', accent: '#78909c', name: 'Modern Era' },
};

function getEraTheme(birthYear: number) {
  if (birthYear < 0) return { ...eraThemes.ancient, name: 'Ancient Persia' };
  if (birthYear < 800) return { ...eraThemes.classical, name: 'Classical Age' };
  if (birthYear < 1200) return { ...eraThemes.golden, name: 'Islamic Golden Age' };
  if (birthYear < 1500) return { ...eraThemes.medieval, name: 'Medieval Persia' };
  return { ...eraThemes.modern, name: 'Modern Philosophy' };
}

export default function TimelinePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const goNext = () => {
    if (currentIndex < philosopherData.length - 1) setCurrentIndex(currentIndex + 1);
  };
  
  const goPrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };
  
  useEffect(() => {
    if (containerRef.current) {
      // Each philosopher takes full viewport width (100vw)
      const scrollAmount = containerRef.current.clientWidth;
      containerRef.current.scrollTo({ left: currentIndex * scrollAmount, behavior: 'smooth' });
    }
  }, [currentIndex]);

  const philosopher = philosopherData[currentIndex];
  const theme = getEraTheme(philosopher.birth);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#1a3a2a' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #0d1f18 0%, #1a3a2a 50%, #2e4a3d 100%)',
          minHeight: { xs: 180, md: 220 },
          position: 'relative',
          overflow: 'hidden',
          py: { xs: 4, md: 5 },
        }}
      >
        {/* Background Image */}
        <Box sx={{ position: 'absolute', inset: 0, opacity: 0.15 }}>
          <Image 
            src="/images/hero/hero-main.png" 
            alt="Persian philosophy timeline" 
            fill 
            style={{ objectFit: 'cover' }} 
            priority 
          />
        </Box>
        
        <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center', px: 2, maxWidth: 1200, mx: 'auto' }}>
          <Typography
            variant="h3"
            sx={{
              color: '#ffffff',
              fontFamily: '"Vazir", serif',
              fontSize: { xs: '1.75rem', md: '2.5rem' },
              fontWeight: 300,
              mb: 1,
              letterSpacing: '-0.02em',
            }}
          >
            Scroll of Time
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'rgba(255,255,255,0.7)',
              fontFamily: '"Vazir", serif',
              fontSize: '0.95rem',
              fontWeight: 300,
              maxWidth: 600,
              lineHeight: 1.6,
              mx: 'auto',
              mb: 2,
            }}
          >
            Journey through 2,500 years of Persian philosophical wisdom
          </Typography>
          
          {/* Era indicator */}
          <Box sx={{ 
            display: 'inline-flex',
            bgcolor: 'rgba(0,0,0,0.3)',
            p: 1.5,
            borderRadius: 2,
            border: `1px solid ${theme.accent}40`,
            backdropFilter: 'blur(8px)',
          }}>
            <Typography
              sx={{
                color: theme.accent,
                fontFamily: '"Vazir", serif',
                fontSize: '0.9rem',
                fontWeight: 500,
              }}
            >
              {theme.name} • {philosopher.birth < 0 ? Math.abs(philosopher.birth) + ' BCE' : philosopher.birth}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Timeline */}
      <Box
        ref={containerRef}
        sx={{
          width: '100%',
          height: { xs: 'calc(100dvh - 236px)', md: 'calc(100dvh - 276px)' },
          minHeight: 400,
          overflowX: 'auto',
          overflowY: 'auto',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
          bgcolor: '#1a3a2a',
        }}
      >
        <Box
           sx={{
             display: 'flex',
             height: '100%',
             // Flex container - each child takes full width
             // No explicit width needed - flex children define their own width
             alignItems: 'center',
           }}
        >
          {philosopherData.map((p, idx) => {
            const pTheme = getEraTheme(p.birth);
            const isActive = idx === currentIndex;
            const offset = Math.abs(idx - currentIndex);
            
            return (
              <Box
                key={p.id}
                 sx={{
                   flex: '0 0 100%', // Each philosopher takes full width of container (viewport)
                   height: '100%',
                   display: 'flex',
                   alignItems: 'center',
                   justifyContent: 'center',
                    opacity: Math.max(0.7, 1 - offset * 0.15),
                    transform: `scale(${Math.max(0.85, 1 - offset * 0.05)})`,
                   transition: 'all 0.5s ease',
                 }}
              >
                <Box sx={{ maxWidth: 800, width: '100%' }}>
                  {/* Date */}
                  <Typography
                    sx={{
                      color: pTheme.accent,
                      fontFamily: '"Vazir", serif',
                      fontSize: { xs: '2rem', md: '4rem' },
                      fontWeight: 300,
                      lineHeight: 1,
                      mb: 2,
                       opacity: 0.3,
                    }}
                  >
                    {p.birth < 0 ? Math.abs(p.birth) + ' BCE' : p.birth}
                  </Typography>

                  {/* Card */}
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: { xs: 'column', md: 'row' },
                      gap: 4,
                      alignItems: 'center',
                    }}
                  >
                    {/* Portrait */}
                    <Box
                      sx={{
                        width: { xs: 180, md: 260 },
                        height: { xs: 220, md: 320 },
                        position: 'relative',
                        flexShrink: 0,
                        borderRadius: 2,
                        overflow: 'hidden',
                        boxShadow: `0 20px 60px rgba(0,0,0,0.5), 0 0 40px ${pTheme.accent}20`,
                      }}
                    >
                      {p.image && (
                        <Image src={p.image} alt={p.name} fill style={{ objectFit: 'cover' }} />
                      )}
                    </Box>

                    {/* Info */}
                    <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
                      <Typography sx={{ color: '#c9a962', fontFamily: '"Vazir", serif', fontSize: '2rem', mb: 1 }}>
                        {p.name}
                      </Typography>
                      <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontFamily: '"Vazir", serif', fontSize: '0.9rem', mb: 2 }}>
                        {p.title}
                      </Typography>
                       <Typography sx={{ color: 'rgba(255,255,255,0.8)', fontFamily: '"Vazir", serif', fontSize: '1rem', lineHeight: 1.8, mb: 3 }}>
                         {p.bio}
                       </Typography>
                       
                       {/* Quote */}
                       <Box sx={{ borderLeft: `3px solid ${pTheme.accent}`, pl: 2, py: 1, mt: 2 }}>
                         <Typography sx={{ color: pTheme.accent, fontFamily: '"Vazir", serif', fontSize: '1.1rem', lineHeight: 1.8, fontStyle: 'italic', mb: 1 }}>
                           {p.quoteFarsi}
                         </Typography>
                         <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontFamily: '"Vazir", serif', fontSize: '0.9rem', lineHeight: 1.6 }}>
                           {p.quoteEnglish}
                         </Typography>
                       </Box>
                     </Box>
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>

      {/* Navigation */}
      <Box sx={{ position: 'fixed', bottom: 30, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 2, zIndex: 100 }}>
        <IconButton onClick={goPrev} disabled={currentIndex === 0} sx={{ color: '#c9a962', bgcolor: 'rgba(0,0,0,0.4)', border: '1px solid rgba(201,169,98,0.3)', '&:hover': { bgcolor: 'rgba(201,169,98,0.2)' }, '&.Mui-disabled': { opacity: 0.3 } }}>
          <ChevronLeftIcon />
        </IconButton>
        
        <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center', px: 2, bgcolor: 'rgba(0,0,0,0.4)', borderRadius: 3, border: '1px solid rgba(201,169,98,0.2)' }}>
          {philosopherData.map((_, idx) => (
            <Box key={idx} onClick={() => setCurrentIndex(idx)} sx={{ width: idx === currentIndex ? 20 : 4, height: 2, borderRadius: 1, bgcolor: idx === currentIndex ? '#c9a962' : 'rgba(201,169,98,0.2)', cursor: 'pointer', transition: 'all 0.3s' }} />
          ))}
        </Box>

        <IconButton onClick={goNext} disabled={currentIndex === philosopherData.length - 1} sx={{ color: '#c9a962', bgcolor: 'rgba(0,0,0,0.4)', border: '1px solid rgba(201,169,98,0.3)', '&:hover': { bgcolor: 'rgba(201,169,98,0.2)' }, '&.Mui-disabled': { opacity: 0.3 } }}>
          <ChevronRightIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
