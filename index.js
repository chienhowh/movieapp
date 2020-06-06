const api_key = "bc0a486e34f46f2e1df814d9d7d35008";
const searchButton = document.querySelector("#search");
const inputText = document.querySelector("#inputValue");
const url ="https://api.themoviedb.org/3/search/movie?api_key=bc0a486e34f46f2e1df814d9d7d35008";
const image_url = "https://image.tmdb.org/t/p/w500";
const movieBoard = document.querySelector(".movie-display")


//searching
searchButton.addEventListener("click", function(e){
    e.preventDefault();
    const value = inputText.value.trim();
    if(!value) return;
    const newUrl = url + "&query=" + value;
    fetch(newUrl)
        .then((res) =>  res.json())
        .then((data) => {
            const movies = data.results;
            const movieResults =  movieDisplay(movies);
            movieBoard.innerHTML = "";
            movieBoard.append(movieResults);
            
        })
        .catch((err) => console.log(err))
    inputText.value = "";
})

//分開結果
function movieDisplay(movies){
    const moviebox = document.createElement("div");
    moviebox.classList.add("movie");
    const box = `<section class="section">${movies.map(
        (movie) => `<img src="${image_url + movie.poster_path}" data-movie-id="${movie.id}"</img>` 
    )}</section>
    <div class="content"><p id="content-close">X</p></div>
    `;
    moviebox.innerHTML = box;
    return moviebox;
}

//delegation
movieBoard.addEventListener("click", function(e){
    const target = e.target;
    if(target.tagName === "IMG"){
        const section = e.target.parentNode;
        const content = section.nextElementSibling;
        content.classList.add("content-display")
    }
    if(target.id === "content-close"){
        const content = target.parentElement;
        content.classList.remove("content-display")
    }
})