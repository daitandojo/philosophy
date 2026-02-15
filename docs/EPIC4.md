## Epic 4: Multimedia & Interactive Layers

**Objective:**
Implement AI-generated visual and audio layers to enrich the Rumi website, making it immersive and interactive. This includes thematic images, calligraphy, text-to-speech (TTS), and dynamic audio-visual interactions per verse or section. Also includes configuration management for API keys and environment variables.

---

### **1. Scope & Deliverables**

* **AI-generated images:**

  * Generate thematic illustrations per quote or verse based on content, theme, or emotion.
  * Maintain a consistent visual style (e.g., Persian miniature-inspired, watercolor, or abstract).
  * Support resizing and adaptive layout for desktop, tablet, and mobile.
* **Calligraphy rendering:**

  * Convert Persian text into styled calligraphy (SVG or vector format).
  * Overlay or pair with background images.
  * Support interactive zoom or hover effects.
* **Text-to-Speech (TTS):**

  * Persian audio: native pronunciation of each verse.
  * English audio: AI voice reading summaries, translations, or commentary.
  * Optional multi-voice support for emphasis or theme-based variation.
* **Interactive layering:**

  * Allow hover, click, or toggle interactions to reveal:

    * Translation
    * Transliteration
    * Commentary
    * Images or calligraphy
    * Audio playback controls
* **Environment configuration:**

  * `.env.example` file to standardize API keys, TTS credentials, and image generation endpoints.
  * Support multiple AI providers (image, TTS, LLM) with separate config entries.

---

### **2. Technical Requirements**

* **Front-end integration:**

  * Components for rendering images, calligraphy, and TTS controls.
  * Lazy loading for images and audio for performance optimization.
  * Integration with Epic 1 content objects and Epic 2 LLM outputs.
* **Back-end or serverless API:**

  * Pipeline for generating images and TTS on demand or pre-populating the database.
  * Cache generated assets to reduce repeated API calls.
  * Store asset references in content objects with versioning.
* **TTS and audio playback:**

  * Controls: play, pause, replay, volume, speed.
  * Visual indicator for currently reading verse.
* **Calligraphy rendering:**

  * Convert Persian text to scalable SVG or PNG.
  * Support layering over images without obscuring text readability.

---

### **3. Functional Specifications**

* **Image generation pipeline:**

  * Input: Persian text + theme + AI prompt template.
  * Output: themed illustration stored in media storage, linked to content ID.
* **TTS pipeline:**

  * Input: Persian or English text.
  * Output: MP3/OGG file linked to content ID.
* **Interactive quote cards:**

  * Display Persian, transliteration, English translation, commentary, image, and audio.
  * Allow toggling layers on/off and playing audio inline.
* **Caching and performance:**

  * Store all AI-generated assets in CDN or local storage for instant retrieval.

---

### **4. Environment Variables (`.env.example`)**

Create `.env.example` in the project root with placeholders for all keys and endpoints:

```
# LLM (DeepSeek) API
DEESEEK_API_KEY=your_deepseek_api_key_here
DEESEEK_API_URL=https://api.deepseek.ai

# Image Generation API
IMAGE_API_KEY=your_image_api_key_here
IMAGE_API_URL=https://api.imagery.ai

# TTS API
TTS_API_KEY=your_tts_api_key_here
TTS_API_URL=https://api.tts.ai

# Storage / CDN
STORAGE_BUCKET_URL=https://your-storage-bucket.url
STORAGE_ACCESS_KEY=your_storage_access_key
STORAGE_SECRET_KEY=your_storage_secret_key

# Optional: Logging & Analytics
LOGGING_API_KEY=your_logging_service_key
```

* Developers copy `.env.example` to `.env` and populate with real keys.
* All keys must be kept secret and not pushed to the repository.

---

### **5. User Experience Considerations**

* Audio should auto-sync with displayed text where appropriate.
* Image and calligraphy display should not overwhelm text readability.
* Provide fallback content if AI-generated media fails to load.
* Maintain consistent style and theme across all media.

---

### **6. Security & Permissions**

* Protect all API keys via environment variables.
* Only server-side code should call AI APIs; front-end calls must use backend proxy.
* Validate and sanitize all user-provided content if uploads are integrated later.

---

### **7. Future-Proofing**

* Allow switching between multiple AI providers for images or TTS.
* Extend pipelines for user-generated multimedia uploads in later epics.
* Ensure assets are versioned alongside content for reproducibility.

---

### **8. Acceptance Criteria**

* Every verse/quote can display:

  * Thematic AI-generated image or illustration
  * Persian calligraphy
  * TTS playback in Persian and English
  * Interactive toggle for text and audio layers
* `.env.example` file exists and contains all placeholder variables.
* All generated assets are cached and retrievable from storage/CDN.
* Front-end components are fully responsive and maintain design consistency.

---

This epic ensures the Rumi website is **immersive, multi-sensory, and fully interactive**, providing visuals and audio that bring each verse to life while maintaining secure, flexible AI integration.