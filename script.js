function getBackgroundImage() {
    return axios
        .get('https://api.unsplash.com/photos/random', {
            headers: {
                Authorization: 'Client-ID 89G_t0_-NtipLD1Xn8TGz0lqzcwM34Fiv9pPG0b6hKk',
            },
        })
        .then(({ data }) => {
            const backgroundImageUrl = data.urls.full;
            const photographerName = data.user.name;
            return { backgroundImageUrl, photographerName };
        })
        // .catch(handleError);
        .catch (error => {
        handleError(error);
        reject(error);
    });
}

getBackgroundImage().then(({ backgroundImageUrl, photographerName }) => {
    document.body.style.backgroundImage = `url(${backgroundImageUrl})`;
    document.getElementById('photographer-name').textContent = photographerName;
});

// Geo API 

navigator.geolocation.getCurrentPosition(success, error);

function success(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    // Använd Axios
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=d40075ba674ddec2a41af4d69a5b6f68`)
        .then(response => {
            //  väderdata 
            const weatherData = response.data;
            document.getElementById("weather").innerHTML = `
        <p>Temperature: ${weatherData.main.temp}°C</p>
        <p>Humidity: ${weatherData.main.humidity}%</p>
        <p>Weather: ${weatherData.weather[0].description}</p>
      `;
        })
        .catch(err => {
            
            console.error(err);
        });
}

function error(err) {

    console.error(err);
}




// Time 
function updateTime() {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const time = `${hours}:${minutes}:${seconds}`;

    document.getElementById('current-time').textContent = time;
}

setInterval(updateTime, 1000);

// valfri API news
function getNews() {
    const API_KEY = "75915417870b49b0801bbcfc5051a36a";
    const API_URL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;

    return axios
        .get(API_URL)
        .then(response => {
            const { articles } = response.data;
            return articles;
        })
        .catch(error => {
            console.error(error);
            return Promise.reject(error);
        });
}

getNews().then(articles => {
    // Do something with the articles, like displaying them on the page
    const newsList = document.getElementById("news-list");
    articles.forEach(article => {
        const li = document.createElement("li");
        li.textContent = article.title;
        newsList.appendChild(li);
    });
});

// valfri API wikipedia 
function getWikiInfo() {
    const API_URL = `https://en.wikipedia.org/w/rest.php/v1/search/page?q=earth&limit=1`;

    return axios
        .get(API_URL)
        .then(response => {
            const { pages } = response.data;

            return pages;
        })
        .catch(error => {
            console.error(error);
            return Promise.reject(error);
        });
}

getWikiInfo().then(pages => {
    let wikiHTML = '';

    pages.forEach(page => {
        const { title, description, url } = page;

        wikiHTML += `
      <div class="wiki-info">
        <h3>${title}</h3>
        <p>${description}</p>
        <a href="${url}" target="_blank">Read more</a>
      </div>
    `;
    });

   
    document.getElementById('wiki_info').innerHTML = wikiHTML;
});

         














