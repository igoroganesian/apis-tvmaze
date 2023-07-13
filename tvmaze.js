"use strict";

const $showsList = $("#showsList");
const $episodesArea = $("#episodesArea");
const $searchForm = $("#searchForm");

const TVMAZE_URL = "http://api.tvmaze.com/search/shows";
const TVMAZE_EPS = "http://api.tvmaze.com/shows";
const MISSING_URL = "https://tinyurl.com/tv-missing";

/** Given a search term, search for tv shows that match that query.
 *
 *  Returns (promise) array of show objects: [show, show, ...].
 *    Each show object should contain exactly: {id, name, summary, image}
 *    (if no image URL given by API, put in a default image URL)
 */



async function getShowsByTerm(term) {
  const response = await axios.get(`${TVMAZE_URL}`, {params: {q: term}});
  console.log(`The response: ${response}`);
  const shows = response.data.map((show) => (
    {
      id: show.show.id,
      name: show.show.name,
      summary: show.show.summary,
      image: show.show.image?.medium || (MISSING_URL)
    }));

    return shows;
}

/** Given list of shows, create markup for each and append to DOM.
 *
 * A show is {id, name, summary, image}
 *
 * */

function displayShows(shows) {
  $showsList.empty();

  for (const show of shows) {

   //TODO: avoid image in alt
    const $show = $(`
         <div data-show-id="${show.id}" class="Show col-md-12 col-lg-6 mb-4">
         <div class="media">
           <img
              src="${show.image}"
              alt="${show.name}"
              class="w-25 me-3">
           <div class="media-body">
             <h5 class="text-primary">${show.name}</h5>
             <div><small>${show.summary}</small></div>
             <button class="btn btn-outline-light btn-sm Show-getEpisodes">
               Episodes
             </button>
           </div>
         </div>
       </div>
      `);

    console.log("The this is", $(this));
      $showsList.append($show);
    $(".Show-getEpisodes").on("click", getEpisodesOfShow);
  }
}


/** Handle search form submission: get shows from API and display.
 *    Hide episodes area (that only gets shown if they ask for episodes)
 */

async function searchShowsAndDisplay() {
  const term = $("#searchForm-term").val();
  const shows = await getShowsByTerm(term);

  $episodesArea.hide();
  displayShows(shows);
}

$searchForm.on("submit", async function handleSearchForm(evt) {
  evt.preventDefault();
  await searchShowsAndDisplay();
});


/** Given a show ID, get from API and return (promise) array of episodes:
 *      { id, name, season, number }
 */

//return array of objects with id, name, season, number
async function getEpisodesOfShow(evt) {
  showId = evt.target.this.id;
  let response = await axios.get(`${TVMAZE_EPS}/${showId}/episodes`);
  console.log(response);


}






/** Write a clear docstring for this function... */

// function displayEpisodes(episodes) { }

// add other functions that will be useful / match our structure & design



