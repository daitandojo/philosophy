# Rumi - The Definitive Digital Experience

A beautiful, immersive, and interactive platform for exploring Rumi's poetry, philosophy, and wisdom. Built with Next.js 15, MUI v5, and AI-powered by DeepSeek.

## Features

- **AI-Powered Translations**: DeepSeek LLM generates translations, transliterations, and summaries
- **Chat with Rumi**: Experience philosophical conversations in Rumi's voice
- **Guided Learning**: Structured educational paths from beginner to advanced
- **Community Features**: Annotations, comments, and blog posts
- **Responsive Design**: Works on desktop, tablet, and mobile
- **PWA Support**: Install as a native app

## Tech Stack

- **Frontend**: Next.js 15, App Router, MUI v5
- **Backend**: Node.js, MongoDB, NextAuth.js
- **AI**: DeepSeek for translations and chat
- **Authentication**: Google OAuth

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)
- DeepSeek API key
- Google OAuth credentials

### Installation

1. Clone the repository:
```bash
git clone https://github.com/daitandojo/rumi.git
cd rumi
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your credentials:
```
DEESEEK_API_KEY=your_api_key
MONGODB_URI=your_mongodb_uri
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXTAUTH_SECRET=your_jwt_secret
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── explore/           # Verse exploration
│   ├── chat/              # Chat with Rumi
│   ├── blog/              # Community blog
│   ├── learn/             # Guided learning
│   └── account/           # User account
├── components/            # React components
├── lib/                   # Utility functions and models
├── theme/                 # MUI theme configuration
└── types/                 # TypeScript definitions
```

## Epics

This project is organized into 10 epics:

1. **Core Content Engine** - Database schema and content management
2. **AI-Powered Interpretation** - DeepSeek integration for translations and chat
3. **User Interface** - Persian-inspired responsive design
4. **Multimedia** - Images, calligraphy, TTS support
5. **Authentication** - Google OAuth and user management
6. **Community** - Annotations, comments, blogs
7. **Search & Navigation** - Full-text search and filtering
8. **Education** - Learning paths and quizzes
9. **PWA** - Progressive Web App support
10. **Deployment** - CI/CD and operations

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - See LICENSE file for details.

---

*Made with love and the spirit of Rumi's wisdom*
