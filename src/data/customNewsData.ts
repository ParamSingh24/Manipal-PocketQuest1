export interface NewsArticle {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  source: string;
  category?: 'health' | 'technology' | 'campus' | 'research' | 'global';
  priority?: 'high' | 'medium' | 'low';
}

export const customHealthNews: NewsArticle[] = [
  {
    title: "Manipal University Launches Revolutionary AI-Powered Health Monitoring System",
    description: "The new PocketQuest platform combines real-time disease tracking with AI-powered health guidance, revolutionizing how students and staff monitor their health on campus.",
    url: "#",
    publishedAt: new Date().toISOString(),
    source: "Manipal Health News",
    category: "technology",
    priority: "high"
  },
  {
    title: "Breakthrough in Vector-Borne Disease Prevention Using Smart Technology",
    description: "Researchers at Manipal Institute of Technology develop innovative mosquito tracking system that predicts outbreak patterns using machine learning algorithms.",
    url: "#",
    publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    source: "MIT Research",
    category: "research",
    priority: "high"
  },
  {
    title: "Campus Health Alert: Seasonal Flu Prevention Guidelines Updated",
    description: "New protocols implemented across Manipal campus including enhanced sanitization, social distancing measures, and mandatory health check-ins for international students.",
    url: "#",
    publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    source: "Campus Health Services",
    category: "campus",
    priority: "high"
  },
  {
    title: "AI Chatbot Revolutionizes Student Health Support at Manipal",
    description: "The new PocketQuest AI assistant provides 24/7 health guidance, symptom checking, and emergency response coordination for the entire university community.",
    url: "#",
    publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    source: "Tech Innovation Hub",
    category: "technology",
    priority: "medium"
  },
  {
    title: "Global Health Monitoring: Real-Time Disease Outbreak Tracking Goes Live",
    description: "PocketQuest's global outbreak map now provides real-time data on disease spread, helping users make informed decisions about travel and health precautions.",
    url: "#",
    publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    source: "Global Health Network",
    category: "global",
    priority: "medium"
  },
  {
    title: "Student Wellness Program: Gamified Health Challenges Launch Successfully",
    description: "New health challenges and rewards system encourages students to maintain healthy habits while earning points and competing on the leaderboard.",
    url: "#",
    publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    source: "Student Affairs",
    category: "campus",
    priority: "medium"
  },
  {
    title: "New Study: Smartphone-Based Health Monitoring Reduces Hospital Visits by 40%",
    description: "Research conducted at Manipal Medical College shows that proactive health monitoring through mobile apps significantly reduces emergency room visits and improves overall health outcomes.",
    url: "#",
    publishedAt: new Date(Date.now() - 16 * 60 * 60 * 1000).toISOString(),
    source: "Medical Research Journal",
    category: "research",
    priority: "medium"
  },
  {
    title: "International Students Health Portal: Multilingual Support Now Available",
    description: "PocketQuest now supports 15 languages, making health information accessible to international students from diverse backgrounds studying at Manipal University.",
    url: "#",
    publishedAt: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(),
    source: "International Office",
    category: "campus",
    priority: "medium"
  },
  {
    title: "Weather-Health Correlation System: Predicting Disease Outbreaks with 85% Accuracy",
    description: "Advanced AI algorithms now analyze weather patterns, humidity, and temperature to predict potential disease outbreaks up to 72 hours in advance.",
    url: "#",
    publishedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    source: "Climate Health Institute",
    category: "research",
    priority: "high"
  },
  {
    title: "Emergency Response Integration: Campus Security and Health Services Unite",
    description: "New integration between PocketQuest and campus security systems enables faster emergency response times and better coordination during health emergencies.",
    url: "#",
    publishedAt: new Date(Date.now() - 28 * 60 * 60 * 1000).toISOString(),
    source: "Campus Security",
    category: "campus",
    priority: "high"
  },
  {
    title: "Mental Health Support: AI-Powered Counseling Available 24/7",
    description: "PocketQuest introduces confidential AI counseling services to support student mental health, with human counselors available for critical situations.",
    url: "#",
    publishedAt: new Date(Date.now() - 32 * 60 * 60 * 1000).toISOString(),
    source: "Mental Health Services",
    category: "health",
    priority: "high"
  },
  {
    title: "Nutrition Tracking: Smart Food Recommendations Based on Health Data",
    description: "New feature analyzes user health data to provide personalized nutrition recommendations and meal planning for optimal health outcomes.",
    url: "#",
    publishedAt: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(),
    source: "Nutrition Department",
    category: "health",
    priority: "medium"
  }
];

export const getLatestNews = (limit: number = 12): NewsArticle[] => {
  return customHealthNews
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
};

export const getNewsByCategory = (category: string): NewsArticle[] => {
  return customHealthNews.filter(news => news.category === category);
};

export const getHighPriorityNews = (): NewsArticle[] => {
  return customHealthNews.filter(news => news.priority === 'high');
}; 