# Hikmatia - Persian Philosophy Platform

A beautiful, immersive, and interactive platform for exploring Persian philosophy, wisdom from Rumi, Hafez, Saadi, and more. Built with Next.js 15, MUI v5, and AI-powered by DeepSeek.

## Features

- **AI-Powered Translations**: DeepSeek LLM generates translations, transliterations, and summaries
- **Chat with Philosophers**: Experience philosophical conversations with Rumi, Hafez, Saadi, and more
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
git clone https://github.com/daitandojo/hikmatia.git
cd hikmatia
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
│   ├── chat/              # Chat with philosophers
│   ├── philosophers/      # Browse philosophers
│   ├── quiz/              # Personality quiz
│   ├── blog/              # Community blog
│   ├── learn/             # Guided learning
│   └── account/           # User account
├── components/            # React components
├── lib/                   # Utility functions and models
├── theme/                 # MUI theme configuration
└── types/                 # TypeScript definitions
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - See LICENSE file for details.

---

*Made with love and the spirit of Persian wisdom*
