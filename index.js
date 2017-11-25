const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';
let resultNumber=0; 

function getDataFromApi(searchTerm, callback){
  console.log('get data from api ran');
  const query = {
    part:'snippet',
    q: `${searchTerm}`,
    key: 'AIzaSyCuc0lNylifJ6or791KDF3iQttjkaPsnZ4',
    per_page: 5
  };
  $.getJSON(YOUTUBE_SEARCH_URL, query, callback);
//  $.getJSON(YOUTUBE_SEARCH_URL, query).then(callback);
  
}


function renderResult(result){
  resultNumber ++;
   return `
    <div>
      <h2>
      <a href="https://www.youtube.com/watch?v=${result.id.videoId}">
      <img class="thumbnail" alt="${result.snippet.title}" src="${result.snippet.thumbnails.default.url}" target="_blank"></a> ${result.snippet.title}</h2>
    </div>
  `;
}

function displayNumberOfResults(data){
  console.log(resultNumber);
  $('.number-of-results').html(`<p>This page displays ${resultNumber} results.</p>`)
}

function displayYoutubeSearchData(data){
  console.log(data);
  const results = data.items.map((item,index)=> renderResult(item));
  $('.results').html(results).prop('hidden', false);
  displayNumberOfResults(data);
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
    resultNumber=0;

  })
}
function link(){
  console.log("this is linked");
}

$(link);

$(watchSubmit);




//HOW DO I MAKE IT READ OUT .nnumber-of-results on click?
//is my css linked?
//change border on focused element?