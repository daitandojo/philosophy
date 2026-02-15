# EPIC1.md

## Epic 1: Core Content Engine

**Objective:**
Establish the foundational data architecture and content management system for the Rumi website. This includes storage, retrieval, and management of Persian texts, transliterations, LLM-generated English translations and summaries, thematic metadata, and wisdom scoring. The goal is a robust, scalable, and structured backend that supports all subsequent epics.

---

### **1. Scope & Deliverables**

* **Database design and schema:**

  * Store Persian text of Rumi’s works.
  * Store Latin-script transliteration and phonetic guidance for each line.
  * Store LLM-generated English translations and summaries.
  * Store metadata for each verse/quote: themes, source work, length, wisdom score, emotional tone, and optional tags.
  * Store version history for each content item to allow content updates without breaking references.
* **Content ingestion:**

  * Import public-domain Persian texts of Rumi’s works (e.g., Masnavi, Divan-e Shams).
  * Generate LLM-assisted English translations, summaries, and transliterations.
  * Generate initial metadata: theme tagging, wisdom scoring, and complexity rating.
* **API endpoints:**

  * CRUD operations for verses, translations, metadata, and annotations.
  * Query by theme, wisdom score, work, or keyword.
  * Batch endpoints for content population, updates, and LLM-assisted regeneration.
* **Versioning & history:**

  * Maintain content version history to allow rollback of translations, summaries, or metadata.
  * Track source of each translation (human, AI, hybrid).
* **Content consistency & validation:**

  * Ensure Persian text is correctly encoded (UTF-8) and renders properly in right-to-left layout.
  * Validate transliterations and LLM-generated English outputs for structural and semantic consistency.
* **Performance considerations:**

  * Optimize retrieval for single verses, grouped verses, and batch operations.
  * Prepare for search indexing and future metadata-driven filtering.

---

### **2. Technical Requirements**

* **Database:**

  * Use a flexible, scalable database (MongoDB recommended).
  * Support nested metadata structures for theme, scores, and multi-language content.
* **Content model examples:**

  * Each “verse/quote” should be a self-contained object with all associated data.
* **Backend:**

  * RESTful API or GraphQL endpoints for all content operations.
  * LLM integration pipeline to generate or update translations, summaries, and metadata.
* **Security & permissions:**

  * Initially, content management is internal (admin-only).
  * Prepare schema for future user-generated content, annotations, or submissions.

---

### **3. Functional Specifications**

* **Content storage:**

  * Persian text per line or verse.
  * Latin-script transliteration.
  * English translation (LLM-assisted).
  * Summary or commentary (LLM-assisted).
  * Metadata: themes, source work, length, complexity, wisdom score, optional tags.
* **Content retrieval:**

  * By verse ID, theme, source work, wisdom score, or keyword.
  * Batch retrieval for pages, thematic collections, or learning paths.
* **Metadata scoring:**

  * Wisdom score (1–10 or percentile).
  * Optional emotional tone or sentiment analysis.
* **Versioning & audit:**

  * Maintain previous translations and metadata in versioned records.
  * Track update date, author/source (human or LLM), and confidence rating for LLM outputs.

---

### **4. LLM Integration**

* **Translation & summarization pipeline:**

  * Fetch Persian text → generate transliteration → generate English translation → generate concise summary → assign metadata and scores.
  * Log LLM outputs with confidence scores for future refinement.
* **Metadata generation:**

  * Theme classification.
  * Wisdom scoring.
  * Optional sentiment/emotional tone.

---

### **5. Future-Proofing**

* Schema should support:

  * Additional languages.
  * Audio references or TTS output.
  * User-generated annotations.
  * Cross-linking between quotes or themes.

---

### **6. Acceptance Criteria**

* All Rumi texts ingested with accurate Persian encoding.
* Transliteration, English translation, summary, and metadata correctly generated and stored.
* API supports CRUD and query operations for all content fields.
* Version history properly maintained.
* System tested for retrieval performance and consistency.

---

### **7. Notes**

* Ensure the backend is decoupled from front-end rendering; it should serve both web and PWA clients.
* Design for eventual scaling to thousands of verses and associated metadata.
* Maintain clean separation between AI-generated content and manually curated content.

---

This epic lays the **foundation for all content-driven functionality**: translations, search, annotations, TTS, images, and LLM interactions will all rely on this content engine.