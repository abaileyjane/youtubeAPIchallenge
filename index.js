const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

function getDataFromApi(searchTerm, callback){
  console.log('get data from api ran');
  const query = {
    part:'snippet',
    q: `${searchTerm}`,
    key: 'AIzaSyCuc0lNylifJ6or791KDF3iQttjkaPsnZ4',
    per_page: 5
  };
  $.getJSON(YOUTUBE_SEARCH_URL, query, callback);
}


function renderResult(result){
   return `
    <div>
      <h2>
      <img class="thumbnail" src="${result.snippet.thumbnails.default.url}" target="_blank"> ${result.snippet.title}</h2>
    </div>
  `;
}

function displayYoutubeSearchData(data){
  console.log(data);
  const results = data.items.map((item,index)=> renderResult(item));
  $('.results').html(results);
}

function watchSubmit(){
  $(".search-form").submit(event=>{
    console.log("watch submit ran")
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.search-query');
    const query = queryTarget.val();
    console.log(query);
    queryTarget.val("");
    getDataFromApi(query, displayYoutubeSearchData);
  })
}
function link(){
  console.log("this is linked");
}

$(link);

$(watchSubmit);




