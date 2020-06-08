

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
        (movie) => `<img src="${image_url + movie.poster_path}" data-movie-id="${movie.id}"</img>` 
    )}`.replace(/,/g,"");
    const movieSection = `
        <section class="section ">${movieLists}</section>
    <div class="content container "><p id="content-close">X</p></div>
    `;
    moviebox.innerHTML = movieSection;
    return moviebox;
}

//產生影片框
function generateIframe(video){
    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube.com/embed/${video}`;
    iframe.width = 360;
    iframe.height = 240;
     iframe.allowFullscreen = true;
    return iframe;
}

function generateDetail(data, content){
    const detailContainer = document.createElement("div")
    const plotContainer = document.createElement('div')
    detailContainer.className = 'detail';
    plotContainer.className = 'plot';
    detailContainer.innerHTML =`<ul class="list-group>
        <li class="list-group-item"><strong>${data.original_title}</strong></li>
        <li class="list-group-item"><strong>Date:</strong>${data.release_date}</li>
        <li class="list-group-item"><strong>Runtime:</strong>${data.runtime}mins</li>
        <li class="list-group-item"><strong>Date:</strong>${data.release_date}</li>
        `;
    plotContainer.innerHTML = `<h1>Plot</h1><p>${data.overview}</p>`
    console.log(data);
    content.append(detailContainer, plotContainer)
}


