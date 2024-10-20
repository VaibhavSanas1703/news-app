const searchBox = document.querySelector('.search-box');
const searchIcon = document.querySelector('.search-icon');
const searchInput = document.querySelector('.search-box input');
const searchBtn = document.querySelector('.search-box button');

const menuIcon = document.querySelector('.menu svg');
const navlinks = document.querySelector('.navlinks');
const nav_links = document.querySelectorAll('.hover');

const newsContainer = document.querySelector('.news-container');
const API_KEY = "571364d3171176f0e123abfad6407578";

const getNews = async (query) => {
     try{
          const res = await fetch(`https://gnews.io/api/v4/search?q=${query}&lang=en&max=10&apikey=${API_KEY}`)
          const data = await res.json()
          const newsdata = data.articles;
          let showdata = ""
          console.log(data);
          
          newsdata.forEach((news) => {
               const imageNot = news.image == null ? "assets/images/image_not.png" : news.image;
               const formatDate = new Date(news.publishedAt).toLocaleString('en-US',{
                    timeZone: 'Asia/Jakarta'
               })
               showdata += `
               <div class='cards'>
               <div class='image-container'>
               <img src=${imageNot}>
               </div>

               <div class="content">
               <h1>${news.title}</h1>
               <h4>${news.source.name} - ${formatDate}</h4>
               <p>${news.description.substr(0,140)}...</p>
               <a href=${news.url}>Read more..</a>
               </div>
               </div>
               `
          })

          newsContainer.innerHTML = showdata;

     } 
     catch (error) {
          document.write('Some Error While Fetching data!')
     }
}

nav_links.forEach((item) => {
     item.addEventListener('click',(e) => {
          getNews(e.target.innerHTML)
     })
})

document.addEventListener('DOMContentLoaded',() => {
     getNews('Google')
})

menuIcon.addEventListener('click',() => {
     navlinks.classList.toggle('active-nav')    
      searchBox.classList.remove('active-search')
})

searchIcon.addEventListener('click',() => {
     searchBox.classList.toggle('active-search')
})

document.addEventListener('keydown',(e) => {
     if(e.key == 'Enter'){
          searchBtn.click()
          searchBox.classList.remove('active-search')
     }
})

searchBtn.addEventListener('click',() => {
     if(searchInput.value == ''){
          alert('Please enter any keyword')
     }
     else{
          getNews(searchInput.value)
          setTimeout(() => {
               searchInput.value = ''
               searchBox.classList.remove('active-search')
          }, 1200);
     }
})
