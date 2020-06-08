const api_key = "bc0a486e34f46f2e1df814d9d7d35008";
const searchButton = document.querySelector("#search");
const inputText = document.querySelector("#inputValue");
const url ="https://api.themoviedb.org/3/search/movie?api_key=bc0a486e34f46f2e1df814d9d7d35008&query=spiderman";
const image_url = "https://image.tmdb.org/t/p/w500";
const movieBoard = document.querySelector(".movie-display");
const movieUpcoming = document.querySelector(".movie-upcoming");
const movieNowPlaying = document.querySelector(".movie-nowplaying");
const movieTopRated = document.querySelector(".carousel-inner")

//抓圖片
function searchMoviesData(url, container){
    fetch(url)
        .then((res) =>  res.json())
        .then((data) => {
            const movies = data.results;
            console.log(movies)
            const movieResults =  movieDisplay(movies);
            container.innerHTML = "";
            container.append(movieResults);
        })
        .catch((err) => console.log(err))
}
function getMoviesData(url, container){
    fetch(url)
        .then((res) =>  res.json())
        .then((data) => {
            const movies = data.results;
            const movieResults =  movieDisplay(movies);
            container.append(movieResults);
        })
        .catch((err) => console.log(err))
}
//searching
searchButton.addEventListener("click", function(e){
    e.preventDefault();
    const value = inputText.value.trim();
    if(!value) return;
    const path = "/search/movie";
    const url = generateUrl(path) + "&query=" + value;
    searchMoviesData(url, movieBoard)
    inputText.value = "";
})


function getTrailers(data, content){
    const trailers = data.results;
    const key = trailers[0].key;
     // const length = trailers.length > 3 ? 3 : trailers.length;
     const trailersContanier = document.createElement("div");
     trailersContanier.append(generateIframe(key));
     // for(let i = 0; i < length; i++){
     //     const key = trailers[i].key;
     //     const iframe = generateIframe(key);
     //     trailersContanier.append(iframe);
     // }
     content.append(trailersContanier);
}


//delegation 還沒想到搞個函數
function clickDelegation(target){
    if(target.tagName === "IMG"){
        //處理框框
        const section = target.parentNode;
        const content = section.nextElementSibling;
        content.classList.add("content-display");
        //抓預告
        content.innerHTML = "<p id='content-close'>X</p>";
        const movieId = target.dataset.movieId;
        const videoPath = `/movie/${movieId}/videos`;
        const videoUrl = generateUrl(videoPath);
        fetch(videoUrl)
            .then((res) => res.json())
            .then((data) => { 
               getTrailers(data, content)
            })
            .catch((err) => console.log(err));
        //抓詳細資訊
        const detailPath = `/movie/${movieId}`;
        const detailUrl = generateUrl(detailPath); 
        fetch(detailUrl)
            .then((res) => res.json())
            .then((data) => { 
                generateDetail(data, content);
            })
            .catch((err) => console.log(err)); 
    }
    if(target.id === "content-close"){
        const content = target.parentElement;
        content.classList.remove("content-display")
    }
}
movieBoard.addEventListener("click", function(event){
    const target = event.target;
    clickDelegation(target);
})
movieUpcoming.addEventListener("click", function(e){
    const target = e.target;
    clickDelegation(target);
})
movieTopRated.addEventListener("click", function(e){
    const target = e.target;
    clickDelegation(target);
})
movieNowPlaying.addEventListener("click", function(e){
    const target = e.target;
    clickDelegation(target);
})
// movieUpcoming.addEventListener("click", function(e){
//     const target = e.target;
//     if(target.tagName === "IMG"){
//         //處理框框
//         const section = e.target.parentNode;
//         const content = section.nextElementSibling;
//         content.classList.add("content-display");
//         //抓預告
//         content.innerHTML = "<p id='content-close'>X</p>";
//         const movieId = target.dataset.movieId;
//         const path = `/movie/${movieId}/videos`;
//         const url = generateUrl(path);
//         fetch(url)
//             .then((res) => res.json())
//             .then((data) => { 
//                getTrailers(data, content)
//             })
//             .catch((err) => console.log(err));   
//     }
//     if(target.id === "content-close"){
//         const content = target.parentElement;
//         content.classList.remove("content-display")
//     }
// })
// movieNowPlaying.addEventListener("click", function(e){
//     const target = e.target;
//     if(target.tagName === "IMG"){
//         //處理框框
//         const section = e.target.parentNode;
//         const content = section.nextElementSibling;
//         content.classList.add("content-display");
//         //抓預告
//         content.innerHTML = "<p id='content-close'>X</p>";
//         const movieId = target.dataset.movieId;
//         const path = `/movie/${movieId}/videos`;
//         const url = generateUrl(path);
//         fetch(url)
//             .then((res) => res.json())
//             .then((data) => { 
//                getTrailers(data, content)
//             })
//             .catch((err) => console.log(err));   
//     }
//     if(target.id === "content-close"){
//         const content = target.parentElement;
//         content.classList.remove("content-display")
//     }
// })
// movieTopRated.addEventListener("click", function(e){
//     const target = e.target;
//     if(target.tagName === "IMG"){
//         //處理框框
//         const section = e.target.parentNode;
//         const content = section.nextElementSibling;
//         content.classList.add("content-display");
//         //抓預告
//         content.innerHTML = "<p id='content-close'>X</p>";
//         const movieId = target.dataset.movieId;
//         const path = `/movie/${movieId}/videos`;
//         const url = generateUrl(path);
//         fetch(url)
//             .then((res) => res.json())
//             .then((data) => { 
//                getTrailers(data, content)
//             })
//             .catch((err) => console.log(err));   
//     }
//     if(target.id === "content-close"){
//         const content = target.parentElement;
//         content.classList.remove("content-display")
//     }
// })

function getUpcoming(){
    const path = "/movie/upcoming";
    const url = generateUrl(path);
    getMoviesData(url, movieUpcoming)
}
function getTopRated(){
    const path = "/movie/top_rated";
    const url = generateUrl(path);
    getMoviesData(url, movieTopRated)
}
function getNowPlaying(){
    const path = "/movie/now_playing";
    const url = generateUrl(path);
    getMoviesData(url, movieNowPlaying);
}



//產生對應網址
function generateUrl(path){
    const url = `https://api.themoviedb.org/3${path}?api_key=bc0a486e34f46f2e1df814d9d7d35008`
    return url;
}

//分開結果
function movieDisplay(movies){
    const moviebox = document.createElement("div");
    moviebox.classList.add("movie");
    const movieLists = `${movies.map(
        (movie) => `<div class="carousel-item "><img src="${image_url + movie.poster_path}" class="d-block w-100" data-movie-id="${movie.id}"</img></div>` 
    )}`.replace(/,/g,"");
    const movieSection = `
        ${movieLists}
        <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    <div class="content"><p id="content-close">X</p></div>
    `;
    moviebox.innerHTML = movieSection;
    return moviebox;
}

//產生影片框
function generateIframe(video){
    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube.com/embed/${video}`;
    // iframe.width = 360;
    // iframe.height = 240;
     iframe.allowFullscreen = true;
    return iframe;
}

function generateDetail(data, content){
    const detailContainer = document.createElement("div")
    detailContainer.innerHTML =`<h1>${data.original_title}</h1>
        <h1>Date</h1>:<p>${data.release_date}<p>
        <h1>Runtime</h1>:<p>${data.runtime}mins<p>
        <h1>Plot</h1>:<p>${data.overview}<p>    
        `
    console.log(data);
    content.append(detailContainer)
}
// getMoviesData(url, movieBoard)
// getUpcoming();
getTopRated();
// getNowPlaying();
