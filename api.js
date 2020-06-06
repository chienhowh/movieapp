

//產生對應網址
function generateUrl(path){
    const url = `https://api.themoviedb.org/3${path}?api_key=bc0a486e34f46f2e1df814d9d7d35008`
    return url;
}

//分開結果
function movieDisplay(movies){
    const moviebox = document.createElement("div");
    moviebox.classList.add("movie");
    const movirLists = `
        <section class="section">${movies.map(
        (movie) => `<img src="${image_url + movie.poster_path}" data-movie-id="${movie.id}"</img>` 
    )}</section>
    <div class="content"><p id="content-close">X</p></div>
    `;
    moviebox.innerHTML = movirLists;
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

