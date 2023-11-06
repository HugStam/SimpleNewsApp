const apiKey = process.env.NEWS_API_KEY;
const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`


async function fetchNews() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        displayNews(data.articles);
    }catch (error) {
        console.error('There was an error!')
    }
}


function displayNews(articles) {
    const newsDev = document.querySelector('#news');
    for (const article of articles) {
        const articleDiv = document.createElement('div');

        //create and append a headline to the articleDiv
        const title = document.createElement('h4');
        title.textContent = article.title;
        articleDiv.appendChild(title);

        //append a discription
        const description = document.createElement('p');
        description.textContent = article.description;
        articleDiv.appendChild(description);

        // append the content to the articleDiv
        const link = document.createElement('a');
        link.textContent = 'Read More';
        link.href = article.url;
        articleDiv.appendChild(link);

        // append a photo to the articleDiv
        const image = document.createElement('img');
        image.src = article.urlToImage;
        image.alt = article.title;
        image.classList.add('thumbnail');
        articleDiv.appendChild(image);

        newsDev.appendChild(articleDiv);
    }
}

// the search feature
function performSearch() {
    const searchInput = document.querySelector('#searchInput');
    const searchButton = document.querySelector('#searchButton');
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredArticles = article.filter(article => article.title.toLowerCase().includes(searchTerm));
        // empty the newsDiv before showing the filtered articles
        newsDev.innerHTML = '';
        displayNews(filteredArticles);
    
    });
}

searchButton.addEventListener('click', performSearch);

//displayNews(filteredArticles);
fetchNews();