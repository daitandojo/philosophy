## Epic 2: AI-Powered Interpretation & Chat

**Objective:**
Integrate persistent LLM (DeepSeek) into the Rumi website to provide intelligent translations, summaries, thematic explanations, phonetic guidance, and interactive conversational features, including “Chat with Rumi.” This epic ensures the site offers dynamic AI-driven insight and contextual understanding for every verse, phrase, or theme.

---

### **1. Scope & Deliverables**

* **LLM integration for translations & summaries:**

  * Generate high-quality English translations from Persian lines.
  * Generate concise summaries and thematic explanations.
  * Produce transliterations and phonetic guidance for Latin-script readers.
  * Maintain logs of LLM output for audit, revision, and improvement.
* **Chat interface (“Chat with Rumi”):**

  * Allow users to ask questions about verses, themes, or philosophy.
  * LLM responds in the style and tone of Rumi’s philosophy.
  * Maintain context across user sessions for coherent conversation.
* **Metadata enrichment:**

  * Dynamically update or validate theme tagging, wisdom scoring, emotional tone, or complexity of verses.
  * Optionally suggest related verses or quotes based on user interactions.
* **Backend pipeline:**

  * Centralized LLM request handling for translations, summaries, and chat.
  * Rate limiting, caching, and batching to optimize performance.
  * Track user queries and LLM responses for analytics and continuous improvement.

---

### **2. Technical Requirements**

* **LLM integration:**

  * Persistent session management (DeepSeek) for context continuity.
  * API endpoints to request:

    * Translation
    * Summary
    * Phonetic guidance / transliteration
    * Theme analysis
    * Chat responses
* **Context-aware chat:**

  * Maintain conversation memory per user session.
  * Link chat responses to existing verses, translations, and metadata.
  * Support multi-turn interactions with reasoning across themes and works.
* **Performance & scalability:**

  * Cache frequent translation/summaries to reduce redundant LLM calls.
  * Support concurrent user queries without lag.

---

### **3. Functional Specifications**

* **Translation & summarization flow:**

  1. Fetch Persian verse from content engine.
  2. Generate transliteration and phonetic guidance.
  3. Generate English translation via LLM.
  4. Generate summary/commentary contextualizing the quote.
  5. Assign or update metadata (theme, wisdom score, sentiment).
* **Chat functionality:**

  * Input: User question or discussion prompt.
  * Output: Context-aware response from DeepSeek in Rumi’s philosophical voice.
  * Support references: Link quotes or explanations from the content engine when relevant.
* **Interactive suggestions:**

  * While chatting, LLM can suggest related quotes, images, or lessons dynamically.

---

### **4. User Experience Considerations**

* Provide clear labeling of AI-generated responses.
* Allow users to toggle between:

  * Persian text
  * Transliteration / phonetic guide
  * English translation
  * LLM-generated commentary
* Optionally allow users to “expand” LLM commentary for more depth.

---

### **5. Security & Permissions**

* Ensure user queries are processed securely.
* Maintain privacy: chat history should be linked only to authenticated sessions.
* Protect LLM API keys and rate-limiting credentials.

---

### **6. Future-Proofing**

* Allow integration of additional LLMs if DeepSeek is updated or replaced.
* Enable expansion to multi-language summaries.
* Design for potential AI-assisted educational modules and quizzes.
* Store LLM outputs for offline reuse (e.g., pre-populated lesson plans or summaries).

---

### **7. Acceptance Criteria**

* LLM generates accurate translations, transliterations, and summaries.
* Chat interface responds contextually to multi-turn user queries in Rumi’s voice.
* Metadata is correctly assigned or updated via LLM.
* LLM pipeline scales to multiple concurrent users without performance degradation.
* Outputs are logged and versioned for audit, correction, and improvement.

---

### **8. Notes**

* This epic is dependent on the **Core Content Engine** for Persian text, transliterations, and metadata.
* The chat interface should feel seamless on both web and PWA/mobile devices.
* Ensure consistency in tone, formatting, and referencing between AI-generated content and the curated content engine.

---

This epic establishes **dynamic AI interpretation**, making the website more than a static reference—it becomes an interactive, living experience of Rumi’s philosophy.