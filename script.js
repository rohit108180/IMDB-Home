const getInfo = async (id) => { 
    const res = await fetch(
      `https://imdb8.p.rapidapi.com/title/get-details?tconst=${id}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "imdb8.p.rapidapi.com",
          "x-rapidapi-key": "66ab5d9bf6mshca69ded24c36619p104d17jsn70fe22637213",
        },
      }
    );
    const data = await res.json();
    // console.log(data);
    // addCard(data, "action");
    return data;
  };




const getByGenre = async (genre) => {
  const res = await fetch(
    `https://imdb8.p.rapidapi.com/title/get-popular-movies-by-genre?genre=%2Fchart%2Fpopular%2Fgenre%2F${genre}`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": "imdb8.p.rapidapi.com",
        "x-rapidapi-key": "66ab5d9bf6mshca69ded24c36619p104d17jsn70fe22637213",
      },
    }
  );

  const data = await res.json();
  console.log(data);
  for (let i = 0; i < 2; i++) {
    const dataj = data[i];
    const titleno = dataj.slice(7, dataj.length - 1);

    getInfo(titleno)
        .then(data=>{
            addCard(data,genre);
        });
  }
};

const addCard = (data, genre) => {
  const time = data.runningTimeInMinutes ? data.runningTimeInMinutes : 115;
  const div = document.createElement("div");
  div.innerHTML = `<div class="movies_card"><img src=${data.image.url} alt=""><div class =  "info"><p class="title">${data.title}</p><p class="year">${data.year}</p><p class="time">${time} mins</p>    </div><button> <span>+</span>Watchlist</button></div>`;

  const movies_cards = document.querySelector(`#${genre} .movies_cards`);
  movies_cards.appendChild(div);
  // div.classList.add(data)
};



getByGenre("action");
getByGenre("horror");
getByGenre("comedy");


