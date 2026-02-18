import { localImages } from './local-images';

export const bookImages: Record<string, string> = {
  part1: localImages.sections.ancient,
  'part1-zarathustra': localImages.sections.ancient,
  'part1-achaemenid': localImages.sections.ancient,
  'part1-hellenistic': localImages.sections.ancient,
  part2: localImages.sections.islamic,
  'part2-translation': localImages.sections.islamic,
  'part2-farabi': localImages.sections.islamic,
  'part2-avicenna': localImages.sections.islamic,
  'part2-ghazali': localImages.sections.islamic,
  part3: localImages.sections.mysticism,
  'part3-suhrawardi': localImages.sections.mysticism,
  'part3-rumi': localImages.philosophers.rumi,
  'part3-ibnarabi': localImages.sections.mysticism,
  part4: localImages.sections.synthesis,
  'part4-mullasadra': localImages.philosophers.mullaSadra,
  'part4-schoolisfahan': localImages.sections.synthesis,
  part5: localImages.sections.poetry,
  'part5-saadi': localImages.philosophers.saadi,
  'part5-hafez': localImages.philosophers.hafez,
  'part5-ferdowsi': localImages.philosophers.ferdowsi,
  part6: localImages.sections.modern,
  'part6-modernity': localImages.sections.modern,
  'part6-shariati': localImages.sections.modern,
  'part6-fardid': localImages.sections.modern,
  'part6-soroush': localImages.sections.modern,
  epilogue: localImages.sections.default,
  closing: localImages.sections.default,
};

export const getBookImage = (sectionId: string): string => {
  return bookImages[sectionId] || bookImages['part1'];
};
