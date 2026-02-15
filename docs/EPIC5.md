## Epic 5: User Authentication & Accounts

**Objective:**
Implement a secure, scalable authentication and account management system for the Rumi website. This enables personalized experiences including saved annotations, favorites, learning paths, and AI-assisted interactions. Supports Google OAuth, multi-device access, and PWA compatibility.

---

### **1. Scope & Deliverables**

* **User registration and login:**

  * Google OAuth integration.
  * Optional email/password registration for future expansion.
  * Account creation linked to saved preferences, annotations, and content interactions.
* **Profile and settings:**

  * Manage display preferences (theme, font size, layout).
  * Saved favorites, personal quote collections, learning paths.
  * Notification preferences for daily/weekly Rumi quotes or learning nudges.
* **Session management:**

  * Persistent sessions across devices and PWA installs.
  * Secure token handling with JWT or equivalent.
* **Role management:**

  * Initially, standard user vs admin roles.
  * Admins can manage content, moderate annotations, and oversee user uploads.
* **Integration with content and AI:**

  * Link user interactions with DeepSeek session memory for personalized AI responses.
  * Allow retrieval of personalized annotation history, favorites, and user-generated content.

---

### **2. Technical Requirements**

* **Authentication framework:**

  * NextAuth.js for NextJS integration recommended.
  * Google OAuth 2.0 implementation with token refresh.
* **Database schema:**

  * User profile table: user ID, name, email, role, preferences.
  * Saved annotations and favorites linked via user ID.
  * Learning paths and collections stored per user.
* **Security:**

  * Enforce secure password handling if email/password is enabled.
  * HTTPS and secure cookies for all sessions.
  * Rate limiting and brute-force protection on authentication endpoints.
* **Environment configuration:**

  * `.env` variables for OAuth client ID, client secret, JWT secret, and callback URLs.

Example additions for `.env.example`:

```
# Authentication
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXTAUTH_SECRET=your_jwt_secret
NEXTAUTH_URL=https://Rumi.vercel.app
```

---

### **3. Functional Specifications**

* **Login flow:**

  1. User clicks “Sign in with Google.”
  2. Redirected to Google OAuth consent.
  3. On success, user account created or retrieved from database.
  4. Session token issued and persisted across devices.
* **Profile management:**

  * Edit display name, avatar, preferences.
  * Access saved quotes, annotations, and personal collections.
* **Integration with AI features:**

  * Personalized “Chat with Rumi” remembers user’s prior interactions.
  * Learning path progress tracked per account.
* **Multi-device and PWA:**

  * Authentication works seamlessly on web, mobile, and installed PWA.
  * Offline caching for authenticated content where possible.

---

### **4. User Experience Considerations**

* Minimal friction: single-click login via Google.
* Clear messaging for first-time users explaining account benefits (favorites, annotations, chat history).
* Account switch and logout functionality easy to access.
* Ensure consistency of saved preferences and AI personalization across devices.

---

### **5. Security & Privacy**

* Protect all authentication secrets in environment variables.
* Encrypt sensitive user data in the database.
* GDPR compliance: provide user data export and deletion on request.
* Limit exposure of AI session data to authenticated users only.

---

### **6. Future-Proofing**

* Support additional OAuth providers (Apple, Microsoft) if desired.
* Add advanced roles or permissions for moderators, contributors, or educators.
* Enable social features (comment attribution, shared collections) securely tied to accounts.
* Ready backend to link AI-generated content to user accounts for persistent personalization.

---

### **7. Acceptance Criteria**

* Google OAuth login fully functional on web and PWA/mobile.
* User profile, preferences, favorites, and annotations persist across sessions and devices.
* Secure session tokens and database entries.
* DeepSeek interactions maintain user context where authorized.
* Admin role functional with content moderation capabilities.

---

This epic ensures **secure personalization and persistent user experiences**, enabling the full set of community, annotation, and AI-driven features.