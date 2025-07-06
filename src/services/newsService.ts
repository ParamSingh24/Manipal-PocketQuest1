import { getLatestNews, NewsArticle } from '../data/customNewsData';

class NewsService {
  // Get custom health news data
  static getCustomHealthNews(): NewsArticle[] {
    return getLatestNews(12);
  }

  static async fetchHealthNews(country = 'us') {
    const apiKey = '8048448833f24633bf0ae4e76cac7a42';
    
    // Get custom news first
    const customNews = this.getCustomHealthNews();
    
    // Check if API key is missing
    if (!apiKey || apiKey.trim() === '') {
      console.warn('News API key is missing. Using custom health news data.');
      return customNews;
    }
    
    const endpoints = [
      `https://newsapi.org/v2/top-headlines?category=health&country=${country}&apiKey=${apiKey}`,
      `https://newsapi.org/v2/everything?q=outbreak%20OR%20pandemic%20OR%20epidemic&sortBy=publishedAt&apiKey=${apiKey}`
    ];
    
    try {
      const responses = await Promise.all(endpoints.map(url => fetch(url)));
      const data = await Promise.all(responses.map(r => r.json()));
      const apiNews = this.combineNewsData(data);
      
      // Combine custom news with API news, prioritizing custom news
      const combinedNews = [...customNews, ...apiNews];
      return combinedNews.slice(0, 12); // Return more news items
    } catch (error) {
      console.error('NewsAPI fetch failed:', error);
      console.log('Using custom health news data as fallback.');
      return customNews;
    }
  }

  static combineNewsData(newsArrays) {
    const allArticles = newsArrays.flatMap(data => data.articles || []);
    return allArticles
      .filter(article => article.title && article.url)
      .slice(0, 10)
      .map(article => ({
        title: article.title,
        description: article.description,
        url: article.url,
        publishedAt: article.publishedAt,
        source: article.source.name
      }));
  }
}

export default NewsService; 