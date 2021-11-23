import "./css/front.css";
import "./css/responsive.css";

// Create and select theme
document.body.innerHTML = "<button type='button' id='dayNight'>Day / Night</button>"

if ((localStorage.getItem('theme') === "day") || (localStorage.getItem('theme') === null)){
    document.body.style.background = 'white';
    document.body.style.color = "black";
}
else if (localStorage.getItem('theme') === 'nigth') {
    document.body.style.background = 'black';
    document.body.style.color = "white";
}

document.getElementById('dayNight').addEventListener('click', function (){
    if (localStorage.getItem('theme') === "day" || localStorage.getItem('theme') === null){
        document.body.style.background = 'white';
        document.body.style.color = "black";
    } else if (localStorage.getItem('theme') === 'nigth') {
        document.body.style.background = 'black';
        document.body.style.color = "white";
    }
});

const NewsAPI = require('newsapi');

// CORS issue fix ! (if reqOptions don't help, use second)
// const reqOptions = { 'mode': 'cors', headers: { 'Access-Control-Allow-Origin': '*' } };
const newsapi = new NewsAPI('e4497f15dc6349dc91006f4a337f9bff', { corsProxyUrl: 'https://cors-anywhere.herokuapp.com/' });

// To get api data
newsapi.v2.topHeadlines({
    category: 'general',
    language: 'fr',
    country: 'fr'
}).then(response => {
    for (let i=0; i<response.articles.length; i++) {
        document.body.innerHTML +=
            "<div class='oneArticle'>" +
            "<div><img alt='Image' src='"+ response.articles[i].urlToImage +"'></div>" +
            "<div>" +
            "<h2>" + response.articles[i].title + "</h2>" + response.articles[i].source.name + " " + response.articles[i].publishedAt + "<br>" + response.articles[i].description +
            "<br><a href='"+ response.articles[i].url +"' target='_blank'>Lien vers l'artcile</a>" +
            "</div>" +
            "</div>";
    }
});