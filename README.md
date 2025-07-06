# Manipal PocketQuest

A modern React application featuring Google Maps integration, real-time news, and interactive health monitoring features.

## Features

- 🗺️ **Google Maps Integration** - Global outbreak mapping with real-time data
- 📰 **Health News Feed** - Latest health news and outbreak reports
- 🎮 **Interactive UI** - Modern, responsive design with animations
- 🔍 **Real-time Data** - Live statistics and monitoring
- 📱 **Mobile Responsive** - Works perfectly on all devices

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + Shadcn/ui
- **Build Tool**: Vite
- **Maps**: Google Maps API
- **News**: NewsAPI
- **Deployment**: Vercel

## Environment Variables

The following environment variables are required:

```env
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
VITE_NEWS_API_KEY=your_news_api_key
VITE_GEMINI_API_KEY=your_gemini_api_key
VITE_PERPLEXITY_API_KEY=your_perplexity_api_key
```

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/ParamSingh24/Manipal-PocketQuest1.git
   cd Manipal-PocketQuest1
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory with your API keys.

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## Deployment

This project is configured for deployment on Vercel. The `vercel.json` file includes:

- Proper build configuration
- SPA routing support
- Security headers
- Optimized build settings

## API Keys Used

- **Google Maps API**: For interactive maps and location services
- **News API**: For health news and outbreak reports
- **Gemini API**: For AI-powered features
- **Perplexity API**: For enhanced search capabilities

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.

## Live Demo

Visit the live application at: [Your Vercel URL]

---

Built with ❤️ for Manipal University
