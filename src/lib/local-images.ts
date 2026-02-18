export const localImages = {
  hero: {
    main: '/images/hero/hero-main.png',
  },
  philosophers: {
    rumi: '/images/philosophers/rumi.png',
    hafez: '/images/philosophers/hafez.png',
    saadi: '/images/philosophers/saadi.png',
    attar: '/images/philosophers/attar.png',
    ibnSina: '/images/philosophers/ibn-sina.png',
    alFarabi: '/images/philosophers/al-farabi.png',
    alGhazali: '/images/philosophers/al-ghazali.png',
    suhrawardi: '/images/philosophers/suhrawardi.png',
    mullaSadra: '/images/philosophers/mulla-sadra.png',
    ferdowsi: '/images/philosophers/ferdowsi.png',
  },
  sections: {
    ancient: '/images/sections/section-ancient.png',
    islamic: '/images/sections/section-islamic.png',
    mysticism: '/images/sections/section-mysticism.png',
    synthesis: '/images/sections/section-synthesis.png',
    poetry: '/images/sections/section-poetry.png',
    modern: '/images/sections/section-modern.png',
    default: '/images/sections/section-default.png',
  },
  ui: {
    logo: '/images/ui/logo-bg.svg',
    pattern: '/images/ui/pattern-overlay.svg',
  },
};

export const getPhilosopherImage = (philosopherId: string): string => {
  const idMap: Record<string, string> = {
    rumi: localImages.philosophers.rumi,
    hafez: localImages.philosophers.hafez,
    saadi: localImages.philosophers.saadi,
    attar: localImages.philosophers.attar,
    'ibn-sina': localImages.philosophers.ibnSina,
    'al-farabi': localImages.philosophers.alFarabi,
    'al-ghazali': localImages.philosophers.alGhazali,
    suhrawardi: localImages.philosophers.suhrawardi,
    'mulla-sadra': localImages.philosophers.mullaSadra,
    ferdowsi: localImages.philosophers.ferdowsi,
  };
  return idMap[philosopherId] || localImages.sections.default;
};

export const getSectionImage = (sectionType: string): string => {
  const typeMap: Record<string, string> = {
    ancient: localImages.sections.ancient,
    'islamic-golden-age': localImages.sections.islamic,
    classical: localImages.sections.islamic,
    medieval: localImages.sections.mysticism,
    goldenAge: localImages.sections.poetry,
    safavid: localImages.sections.synthesis,
    modern: localImages.sections.modern,
  };
  return typeMap[sectionType] || localImages.sections.default;
};
