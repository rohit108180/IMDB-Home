const getInfo = async (id) => {
  const res = await fetch(
    `https://imdb-internet-movie-database-unofficial.p.rapidapi.com/film/${id}`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-host":
          "imdb-internet-movie-database-unofficial.p.rapidapi.com",
        "x-rapidapi-key": "ad9a1aebf7mshf163dfdf61a35a1p1e31a5jsn431418c9d644",
      },
    }
  );

  const data = await res.json();
  //   console.log(data);
  //   addCard(data, "action");
  return data;
};

const getByGenre = async (genre) => {
  const res = await fetch(
    `https://imdb8.p.rapidapi.com/title/get-popular-movies-by-genre?genre=%2Fchart%2Fpopular%2Fgenre%2F${genre}`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": "imdb8.p.rapidapi.com",
        "x-rapidapi-key": "3ee2123829msh85bada9096dc8bcp1c76a0jsne376afc63ed3",
      },
    }
  );

  const data = await res.json();
  //   console.log(data);
  for (let i = 0; i < 30; i++) {
    const dataj = data[i];
    const titleno = dataj.slice(7, dataj.length - 1);

    getInfo(titleno).then((data) => {
      if (data.length !== "") addCard(data, genre);
    });
  }
};

const addCard = (data, genre) => {
  const div = document.createElement("div");
  div.innerHTML = `<a href ="#movie-info"><div class="movies_card"><img src=${data.poster} alt=""><div class =  "info"><p class="title">${data.title}</p><p class="year">${data.year}</p><p class="time">${data.length} mins</p>    </div><button> <span>+</span>Watchlist</button></div><a>`;

  const movies_cards = document.querySelector(`#${genre} .movies_cards`);
  div.classList.add(data.id);

  // when clickd on some card to open movie details
  div.addEventListener("click", () => {
    document.querySelector(".home-page").classList.add("hidden");
    document.querySelector("#adventure").classList.add("hidden");
    const div2 = document.createElement("div");
    div2.innerHTML = `
      <button class= "back">←</button>  
      <h1 class="title">${data.title}</h1>
      <hr />
      <img
        src=${data.poster}
        alt=""
      />
      <hr />
      <div class="info-part">
        <div class="movie-desc">
          <p class ="genre">${genre}</p>
          <p class="plot">
           ${data.plot}
          </p>
          <hr>
          <p class = "year"> Year  :  <span class= "yellow">${data.year}</span></p>
          <hr>
          <p class = "year"> Length  :  <span class= "yellow">${data.length}</span></p>
          <hr>
          <p class = "year"> Rating  :  <span >⭐${data.rating}</span></p>
          <hr>
          <p class = "year"> Cast  :  <span class= "yellow">${data.cast[0].actor}, ${data.cast[1].actor}, ${data.cast[2].actor}</span></p>
          <br>
          <br>

        </div>
        <div class="desc-btn">
          <button>Add to Watchlist</button>
          <button><a href= ${data.trailer.link} target="_blank">Trailer</a></button>
        </div>
      </div>`;

    const movieInfo = document.querySelector("#movie-info");
    movieInfo.classList.remove("hidden");
    movieInfo.appendChild(div2);

    document.querySelector(".back").addEventListener("click", () => {
      //   console.log("backk");

      document.querySelector(".home-page").classList.remove("hidden");
      movieInfo.classList.add("hidden");
      movieInfo.innerHTML = "";
    });
  });
  movies_cards.appendChild(div);
};

const searchInput = document.querySelector("header form input[type = 'text']");
const submit = document.querySelector("header form input[type = 'submit'] ");
const form = document.forms["search-form"];

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const result_h1 = document.querySelector("#adventure h1");
  const search_text = searchInput.value;
  result_h1.innerHTML = `Results for ${search_text}`;
  const movies_cards = document.querySelector("#adventure .movies_cards");
  movies_cards.innerHTML = "";
  searchInput.value = "";

  const res = await fetch(
    `https://imdb-internet-movie-database-unofficial.p.rapidapi.com/search/${search_text}`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-host":
          "imdb-internet-movie-database-unofficial.p.rapidapi.com",
        "x-rapidapi-key": "ad9a1aebf7mshf163dfdf61a35a1p1e31a5jsn431418c9d644",
      },
    }
  );

  const data = await res.json();
  for (let i = 0; i < data.titles.length; i++) {
    getInfo(data.titles[i].id).then((data) => {
      if (data.length !== "") addCard(data, "adventure");
    });
  }

  document.querySelector("#adventure").classList.remove("hidden");
  // form.preventDefaut();
});

const croosButton = document.querySelector("#adventure .cross");

croosButton.addEventListener("click", () => {
  document.querySelector("#adventure").classList.add("hidden");
});

getByGenre("action");
getByGenre("horror");
getByGenre("comedy");
