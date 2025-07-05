class NewsService {
  static async fetchHealthNews(country = 'us') {
    const apiKey = import.meta.env.VITE_NEWS_API_KEY;
    const endpoints = [
      `https://newsapi.org/v2/top-headlines?category=health&country=${country}&apiKey=${apiKey}`,
      `https://newsapi.org/v2/everything?q=outbreak%20OR%20pandemic%20OR%20epidemic&sortBy=publishedAt&apiKey=${apiKey}`
    ];
    try {
      const responses = await Promise.all(endpoints.map(url => fetch(url)));
      const data = await Promise.all(responses.map(r => r.json()));
      return this.combineNewsData(data);
    } catch (error) {
      console.error('NewsAPI fetch failed:', error);
      return [];
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