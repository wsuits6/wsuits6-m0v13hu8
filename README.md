# Movie Hub

Movie search web app built with vanilla JavaScript using the [OMDb API](https://www.omdbapi.com/). Features live movie search, a session watchlist, and a dark/light theme toggle.

## Setup

1. Get a free API key from [OMDb API](https://www.omdbapi.com/apikey.aspx).
2. In `js/script.js`, replace `YOUR_OMDB_API_KEY` with your key:

```js
const apikey = "your_omdb_api_key_here";
```

> Never commit real API keys. The key in this repo source is a placeholder.

## Usage

Open `index.html` in a browser (or serve it with any static server), type a movie title, and press Search. Results load from OMDb; use "Add To Watchlist" to keep titles for the session.

## Features

- Movie title search with error handling
- Session-only watchlist (cleared on reload)
- Dark/light theme toggle

## License

MIT