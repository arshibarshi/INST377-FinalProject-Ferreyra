async function getNews(){
    const url = await fetch("https://newsapi.org/v2/everything?q=pokemon&apiKey=b0d4720338c3440b936c977ad45015c6")
    const data = await url.json();
    
    const newsSection = document.getElementById('news-section');
    const pokemonNews = data.articles;

    pokemonNews.forEach(article => {
        const articleElement = document.createElement('div');
        articleElement.classList.add('news-article');

        const title = document.createElement('h3');
        title.textContent = article.title;
        articleElement.appendChild(title);

        const publishedAt = document.createElement('p');
        publishedAt.textContent = `Published On: ${new Date(article.publishedAt).toLocaleDateString()}`;
        articleElement.appendChild(publishedAt);
        
        const description = document.createElement('p');
        description.textContent = article.description;
        articleElement.appendChild(description);

        const link = document.createElement('a');
        link.href = article.url;
        link.textContent = 'Read more';
        articleElement.appendChild(link);

        newsSection.appendChild(articleElement);
    });
}

getNews();