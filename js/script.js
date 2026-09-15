//===================
//Movie Hub
//====================

//Flow

// (1) All variables
// Theme Toggle variable
const themeToggle = document.getElementById("themeToggle");

// User Input and button 
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

//Status message and Movie grid 
const statusMessage = document.getElementById("statusMessage");
const movieGrid = document.getElementById("movieGrid");

//Watch list GRID and STATUS message
const watchlistGrid = document.getElementById("watchlistGrid");
const watchlistEmptyMessage = document.getElementById("watchlistEmpty");

//Variables for API Key and BASE URL
// Replace with your own OMDb API key (https://www.omdbapi.com/apikey.aspx)
const apikey = "YOUR_OMDB_API_KEY";
const baseurl = "https://www.omdbapi.com/?apikey=" + apikey;

//Watchlist Array
let watchlist = [];
//==========================================================================





//Check User input throougn event listiner
//click event on searchBtn 
searchBtn.addEventListener("click", () => {

    //taking User Data fromINput field
    const searchTerm = searchInput.value.trim(); //removing whitespace from Input string

    //check if user types nothing return Reminder
    if (searchTerm === "") {
        statusMessage.textContent = "Type Something first.";
        return;
    }

    //return Searching User Message
    statusMessage.textContent = "Searching.....";

    //perform Search 
    searchMOvies(searchTerm)
})

// (3) A Function that handles searches
// and implements ERROR handling

// Creating a Search movie Function to OMDb API search 
// on the parameter term bu Applying it to 
// BASE URL  and API KEY
async function searchMOvies(term) {
    const url = `${baseurl}&s=${term}`;


    //Error Handling
    try {
        //reponse Variable Assingned to URL HTTP RESPONSE
        const response = await fetch(url);
        const data = await response.json();

        //Error Handling For No HTTP Response
        //Data is False
        if (data.Response === "False") {

            //Assinging Status Messafe to Data Error Response
            statusMessage.textContent = data.Error;

            //Return Nothing Into the Movie Grid Container
            movieGrid.innerHTML = "";
            return
        }

        //If there is not Error Return nothing to status Message
        statusMessage.textContent = "";

        //Calling Render Movie Function to Render Data
        renderMovies(data.Search)

    } catch (error) { // Catching Other Erros 
        statusMessage.textContent = "Network Problem"
    }
 } 


//==========================================================================
// (3) Render Movies Function 

function renderMovies(movie) {
    // The Movie Grid HTML should be Empty
    movieGrid.innerHTML = "";

    // Creating a Movies Loop
    movie.forEach(movie => {
        // Setting movie as parameter for the create Movie Card
        createMovieCard(movie); //Rendering Movie Contents in Create ovie Function
    });
}

//==========================================================================
// (4) Create Movie Card HTML Function

function createMovieCard(movie) {
    //creating DIV for card in DOM
    const card  = document.createElement("div");

    //Adding  Class to CARD DIV
    card.classList.add("movie-card");

    //Crating inner Card html Elements 
    //Html Elements with Data loaded form movie ARRAY
    card.innerHTML = `
    <img src="${movie.Poster}" alt="movie Poster">
    <h3>${movie.Title}</h3>
    <p>${movie.Year}</p>
    <button> Add To Watch list</button>
    `;

    //selecting a Button Elements in CARD and btn assignning btn
    const btn = card.querySelector("button");

    //If user clicks on Card button
    //Call AddToWatch list fucntion
    btn.addEventListener("click", () => {
        addToWatchlist(movie);
    });

    //Appending ELement to moviesGrid ELement As a child
    movieGrid.appendChild(card);

}

//==========================================================================
// (4) Add to Watch list fuction 
// uses render watch list funciton 
// movie parameter to load contents form render movie
function addToWatchlist(movie) {
    watchlist.push(movie);
    renderWatchlist();
}

//==========================================================================
// (5) Render Function Render Watch list 
function renderWatchlist() {
    //Making Sure watch list Grid is Empty with no HTML
    watchlistGrid.innerHTML = "";
    
    //checking if watch list ARRAY is Empty and returning Error
    if (watchlist.length === 0) {

        //Stying Empty mesage element to display block
        watchlistEmptyMessage.style.display = "block"
        return;
    }

    //setting wathc lsit to none for TRUE reponse
    watchlistEmptyMessage.style.display = "none";

    //Looping Through movie Array and using index
    watchlist.forEach((movie, index) => {
        // creating Item  CArd for movie  Grid 
        const item = document.createElement("div");
        //addingn class to item DIV
        item.classList.add("movie-card");

        //Creating inner HTML elements for DIV
        item.innerHTML = `
        <img src="${movie.Poster}">
        <h3>${movie.Title}</h3>
        <button>Remove</button>
        `;

        // selecting  all Buttons in item card and adding click event listener to remove movie CARD forn GRID
        item.querySelector("button").addEventListener("click", () => {
            //removing item elements in watchlist
            watchlist.splice(index, 1);
            renderWatchlist()
        });

        //apending item card to Watch list Grid Contianer
        watchlistGrid.appendChild(item);


    });

}

//==========================================================================
// (6) DARK MODE FUNCTION THEME TOGGLEser 
// If USER clicks on THEME toggle Button
themeToggle.addEventListener("click", ()=> {
    //change class list dynamically to toggle theme
    document.body.classList.toggle("dark-mode");
})
//==========================================================================
//==========================================================================
//==========================================================================
//==========================================================================
