# EPIC 8: Internationalization - Spanish/English Bilingual

## Objective
Transform the app into a fully bilingual Spanish/English platform, making Persian philosophy accessible to the 500+ million Spanish speakers worldwide while maintaining the app's premium feel and usability.

---

## Vision
Break down language barriers and make this the definitive Persian philosophy resource for both English and Spanish speakers—serving the vast Spanish-speaking world including Latin America, Spain, and the growing US Hispanic population.

---

## Scope

### Language Coverage
- **Primary:** English and Spanish
- **Interface:** Complete UI translation
- **Content:** Core content in both languages
- **TTS:** Audio in both languages
- **Future-ready:** Architecture supports adding more languages

---

## Implementation

### 1. Technical Architecture

**i18n Framework:**
```typescript
// lib/i18n/config.ts
export const i18n = {
  defaultLocale: 'en',
  locales: ['en', 'es'],
  localeDetection: true,
};

// Messages structure
interface Messages {
  navigation: {
    home: string;
    explore: string;
    learn: string;
    community: string;
    about: string;
  };
  common: {
    loading: string;
    error: string;
    save: string;
    cancel: string;
    search: string;
  };
  // ... organized by feature
}
```

**Routing Strategy:**
- `/en/philosophers` - English
- `/es/philosofos` - Spanish
- `/` - Auto-detect or default
- Middleware handles language switching

**Translation Files:**
```
/messages
  /en.json
  /es.json
  /future-lang.json
```

### 2. UI Translation

**Complete Interface Translation:**

**Navigation:**
- Home / Inicio
- Philosophers / Filósofos
- Explore / Explorar
- Learn / Aprender
- Community / Comunidad
- About / Acerca de
- Premium / Premium

**Common UI Elements:**
- Search / Buscar
- Filter / Filtrar
- Sort by / Ordenar por
- Loading / Cargando
- Save / Guardar
- Cancel / Cancelar
- Next / Siguiente
- Previous / Anterior
- Share / Compartir
- Bookmark / Guardar
- Like / Me gusta
- Comment / Comentar

**Error Messages:**
- "Something went wrong" / "Algo salió mal"
- "Please try again" / "Por favor, inténtalo de nuevo"
- "Page not found" / "Página no encontrada"
- "Loading..." / "Cargando..."

**Form Labels:**
- Email / Correo electrónico
- Password / Contraseña
- Name / Nombre
- Submit / Enviar
- Required / Requerido

### 3. Content Translation Strategy

**Tier 1 - Essential Content (100% translated):**
- All UI elements
- Navigation and menus
- Error messages
- Email templates
- Landing page content
- Help documentation
- About pages

**Tier 2 - Core Content (High priority):**
- Philosopher biographies
- Work descriptions
- 1000 most popular quotes
- Learning path content
- Quiz questions
- Community guidelines

**Tier 3 - Extended Content (Ongoing):**
- Remaining quotes
- Annotations
- Discussion posts
- Blog articles
- Video subtitles

**Translation Methods:**
1. **Professional Translation:**
   - Hire native Spanish speakers
   - Cultural adaptation (not just literal)
   - Subject matter expertise (philosophy)
   - Review and editing process

2. **AI-Assisted:**
   - GPT-4 for initial translation
   - Human review and refinement
   - Consistency checking
   - Cost-effective for large volumes

3. **Community:**
   - User-suggested improvements
   - Voting on translations
   - Rewards for contributors
   - Quality control

### 4. Quote Translation

**Three-Layer Translation:**

**Layer 1: Persian (Original)**
- Always preserved
- Primary source of truth
- Multiple transliteration options

**Layer 2: English**
- High-quality literary translation
- Multiple translations where available
- Academic and poetic versions

**Layer 3: Spanish**
- Literary Spanish translation
- Latin American and Spain variants where needed
- Cultural adaptation of concepts

**Example:**
```
Persian: بیا تا برایت ببینیم
Transliteration: Bia ta barayat bebinim
English: "Come, let us see for you..."
Spanish: "Ven, veamos por ti..."
```

**Translation Challenges:**
- Mystical concepts (fana, ishq)
- Cultural references
- Poetic meter and rhyme
- Preserve beauty while ensuring accuracy

**Solution:**
- Transliterate key terms: "fana (extinción del ego)"
- Translator notes
- Multiple Spanish variants
- Community discussion on difficult passages

### 5. Audio TTS - Spanish

**Spanish TTS Implementation:**
- Latin American Spanish voices
- Spain Spanish voices
- Male and female options
- Emotional intonation

**Content:**
- All quotes in Spanish
- Navigation instructions
- Learning content
- Video narrations

### 6. SEO and Localization

**URL Structure:**
```
/philosophers/rumi (auto-detect or default)
/en/philosophers/rumi (English)
/es/filosofos/rumi (Spanish)
```

**Meta Tags:**
```html
<html lang="es">
<head>
  <title>Rumi | Filósofo y Poeta Sufí</title>
  <meta name="description" content="Explora la poesía y filosofía de Rumi...">
  <link rel="alternate" hreflang="en" href="/en/philosophers/rumi" />
  <link rel="alternate" hreflang="es" href="/es/filosofos/rumi" />
</head>
```

**Sitemap:**
- Separate sitemaps per language
- hreflang annotations
- Priority indicators

**Content Strategy:**
- Spanish-language blog content
- Social media in Spanish
- Spanish-speaking influencer partnerships
- Target keywords: "filosofía persiana", "Rumi en español", "sufismo"

### 7. Regional Considerations

**Spanish Variants:**
- **Default:** Neutral Spanish (understood by all)
- **Latin America:** Specific terminology where needed
- **Spain:** European Spanish variant
- **User choice:** Allow preference setting

**Cultural Adaptation:**
- Examples that resonate with Hispanic culture
- References to Latin American philosophers
- Local holidays and celebrations
- Regional content recommendations

### 8. Language Switcher UI

**Implementation:**
```
[EN ▼]  or  [ES ▼]

Dropdown:
- English
- Español

Or flags (if appropriate):
[🇺🇸] [🇪🇸] [🇲🇽]
```

**Placement:**
- Header (always visible)
- Footer (alternative access)
- Settings page
- Welcome screen for new users

**Behavior:**
- Remember preference (localStorage + account)
- Smooth transition (no page reload)
- Preserve scroll position
- Update URL

### 9. Email Templates - Spanish

**Daily Wisdom Email:**
- Spanish version of all emails
- Same beautiful design
- Cultural references appropriate for audience
- Time zone considerations (send at appropriate local time)

**Notification Emails:**
- Welcome (Bienvenido)
- Weekly digest (Resumen semanal)
- Achievement unlocked (Logro desbloqueado)
- Friend activity (Actividad de amigos)

### 10. Right-to-Left (RTL) Considerations

**Persian Text:**
- Persian is RTL
- Spanish and English are LTR
- Mixed content needs careful handling

**Implementation:**
```css
[dir="rtl"] {
  text-align: right;
}

[dir="ltr"] {
  text-align: left;
}

/* For mixed content */
.persian-text {
  direction: rtl;
  text-align: right;
  font-family: 'Vazir', serif;
}
```

**UI Mirroring:**
- For full Arabic/Persian interface (future)
- Navigation flips
- Icons may need adjustment
- Testing required

---

## Content Translation Priorities

### Phase 1: Core UI (Week 1-2)
- All navigation
- Common UI elements
- Error messages
- Email templates
- Landing pages

### Phase 2: Main Content (Week 3-6)
- 20 philosopher biographies
- 1000 most popular quotes
- Work descriptions
- Learning paths
- Quiz questions

### Phase 3: Extended Content (Week 7-10)
- Remaining quotes
- Community content
- Blog posts
- Video subtitles
- Help documentation

### Phase 4: Polish (Week 11-12)
- Quality review
- User testing with Spanish speakers
- SEO optimization
- Cultural adaptation

---

## Marketing for Spanish Speakers

**Content Marketing:**
- Spanish blog ("Filosofía Persiana Hoy")
- YouTube channel with Spanish content
- Podcast in Spanish
- Instagram/TikTok Spanish content

**Partnerships:**
- Latin American universities
- Spanish philosophy influencers
- Hispanic cultural centers
- Meditation/yoga communities

**Advertising:**
- Google Ads targeting Spanish keywords
- Facebook/Instagram Spanish campaigns
- YouTube pre-roll in Spanish
- Podcast sponsorships

---

## Success Metrics

**Adoption:**
- 30% of users choose Spanish interface
- 20% of content views are Spanish version
- 15% of new users from Spanish-speaking countries
- 1000+ Spanish-language quotes viewed daily

**Engagement:**
- Spanish users have same engagement as English
- 5+ minute average session
- 40% return rate within 7 days

**Growth:**
- 25% of traffic from Spanish-speaking regions
- Mexico, Colombia, Argentina, Spain top countries
- Organic search in Spanish growing 20% monthly

**Quality:**
- Translation accuracy score: 95%+
- Native speaker satisfaction: 4.5/5
- Cultural appropriateness: 4.5/5

---

## Acceptance Criteria

- Complete UI in Spanish and English
- 1000+ quotes translated to Spanish
- 20+ philosopher biographies in Spanish
- All learning paths available in both languages
- TTS working in Spanish
- Email templates in both languages
- Language switcher functional
- SEO optimized for both languages
- Cultural adaptation appropriate
- Native speaker review complete
- All navigation and menus translated
- Help documentation bilingual

---

## Timeline

Week 1-2: Technical setup, i18n framework
Week 3-4: Core UI translation
Week 5-6: Content translation (priority content)
Week 7-8: Spanish TTS integration
Week 9-10: Extended content, SEO
Week 11-12: Testing, cultural review, launch

---

## Future Languages

**Architecture supports adding:**
- French (Philosophy tradition)
- German (Strong interest in mysticism)
- Portuguese (Brazil market)
- Arabic (Original language context)
- Turkish (Sufi tradition)
- Hindi/Urdu (South Asian Sufism)

**Each new language:**
- Follows same architecture
- Reuses translation workflows
- Maintains quality standards
- Culturally adapted

---

This EPIC makes the app truly global—bringing Persian wisdom to the 500+ million Spanish speakers and establishing the foundation for even broader international reach.
