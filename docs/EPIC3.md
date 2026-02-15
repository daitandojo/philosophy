## Epic 3: User Interface & Styling

**Objective:**
Design and implement a responsive, visually engaging, and user-friendly interface for the Rumi website. This includes multi-device support, premium Persian-inspired aesthetics, intuitive navigation, dynamic menus, and consistent presentation for all content types (quotes, translations, annotations, images, and AI commentary).

---

### **1. Scope & Deliverables**

* **Responsive design:**

  * Full compatibility with desktop, tablet, and mobile devices.
  * Support for PWA installation with smooth adaptive layouts.
* **Premium visual styling:**

  * Persian-inspired motifs, typography, color schemes, and illustrations.
  * Consistent styling for quotes, summaries, images, and TTS/audio components.
* **Dynamic navigation:**

  * Side menus for biography, bibliography, thematic browsing, and learning paths.
  * Top navigation for global sections (Home, Explore, Chat with Rumi, Blog, Account).
  * Collapsible or sticky menus for better mobile experience.
* **Splash screen & initial loading:**

  * Engaging animated splash screen for first-time visits.
  * Preload critical content to reduce perceived load times.
* **Content presentation:**

  * Layered display for Persian text, transliteration, English translation, and AI commentary.
  * Support for optional hover, toggle, or click interactions.
* **Illustration integration:**

  * Dynamic placement of AI-generated images or calligraphy per quote or section.
  * Adaptive resizing for different device screens.
* **Theme consistency:**

  * Uniform typography, spacing, colors, and iconography across the site.
  * Maintain readability and accessibility standards.

---

### **2. Technical Requirements**

* **Front-end framework:**

  * NextJS v15 with App Router.
  * MUI v5 for styling, layout, and icons.
  * Styled components or MUI’s `sx` prop for custom themes.
* **Right-to-left support:**

  * Correct rendering for Persian text (direction: rtl, text-align: right).
  * Ensure RTL and LTR content coexist seamlessly.
* **Interactive components:**

  * Quote cards with hover/toggle for translation, commentary, and metadata.
  * Dynamic image and audio rendering.
  * Side menu interactions (expand/collapse, sticky behavior, smooth scrolling).
* **Performance:**

  * Lazy-loading for images, audio, and AI commentary.
  * Optimized CSS and minimal DOM reflows.

---

### **3. Functional Specifications**

* **Quote display:**

  * Persian text + transliteration + English translation + AI commentary.
  * Optional thematic image or calligraphy per quote.
* **Menus & navigation:**

  * Side menu for biography, bibliography, themes.
  * Top navigation for major site sections.
  * Dynamic highlighting of current section.
* **Responsive behaviors:**

  * Collapse side menu on mobile; enable swipe or toggle gestures.
  * Adaptive font sizes and image scaling.
* **Interactive highlights:**

  * Hover, click, or toggle to show/hide transliteration, metadata, or commentary.
  * Smooth animation for expanding/collapsing sections.
* **Splash screen & preload:**

  * Display brief animation while LLM-backed content loads in the background.

---

### **4. User Experience Considerations**

* Maintain clarity and readability for multi-language text layers.
* Use intuitive visual cues for interactivity (buttons, icons, toggles).
* Ensure consistent styling for AI-generated versus user-generated content.
* Avoid clutter; prioritize whitespace and focus on Rumi’s content.

---

### **5. Accessibility & Localization**

* Ensure all text layers are readable with screen readers.
* Support high-contrast mode and adjustable font sizes.
* Properly render Persian and English text, including right-to-left and left-to-right integration.

---

### **6. Future-Proofing**

* Scalable styling to accommodate additional content layers (e.g., quizzes, annotations, reflections).
* Theme management for seasonal or user-customizable site styles.
* Adaptable components for new interactive features, including multimedia overlays.

---

### **7. Acceptance Criteria**

* Fully responsive layouts for desktop, tablet, and mobile.
* Side and top menus fully functional and dynamic.
* Persian, transliteration, English, and AI commentary layers display correctly.
* Splash screen implemented and preloading critical content functions properly.
* Illustrations, calligraphy, and images render correctly on all devices.
* UI passes accessibility checks and RTL/LTR integration is flawless.

---

### **8. Notes**

* Epic 3 depends on content from **Epic 1** and AI outputs from **Epic 2**.
* Styling should be modular, allowing easy updates or theme swaps.
* Interaction design should support future additions like annotations, blog posts, and user uploads.

---

This epic ensures the **site feels premium, visually cohesive, and fully interactive** while laying the groundwork for multimedia and community features.