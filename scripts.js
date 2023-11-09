const apiKey = process.env.NEWS_API_KEY;
const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`


async function fetchNews() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        //console.log(data);
        displayNews(data.articles);
        return data.articles;
    }
    catch(error) {
        console.error("There was an error", error);
        return [];
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

function searchNews() {
    let inputValue = document.getElementById("searchInput").value.trim().toLowerCase();
    if (!inputValue) {
        alert("Nothing Returned")
        return;
    }
    fetchNews().then(articles => {
        document.getElementById('news').innerHTML = '';
        let filteredArticles = articles.filter(article => article.title.toLowerCase().includes(inputValue));
        displayNews(filteredArticles);
        });
}
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('searchButton').addEventListener('click', searchNews);
});



fetchNews();