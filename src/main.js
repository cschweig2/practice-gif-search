import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

$(document).ready(function() {
  $('#gifResults').click(function() {
    const userInput = $('#user-search').val();
    $('#user-search').val("");

    let request = new XMLHttpRequest();
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.API_KEY}&q=${userInput}&limit=25&offset=0&rating=r&lang=en`;

    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        getElements(response);
      }
    };

    request.open("GET", url, true);
    request.send();

    function getElements(response) {
      $('.showGIF').html(`<iframe src="${response.data[0].embed_url}"></iframe>`);
    }
  });

  $('#randomGif').click(function() {

    let request2 = new XMLHttpRequest();
    let urlRandom = `https://api.giphy.com/v1/gifs/random?api_key=${process.env.API_KEY}&rating=r&lang=en`;

    request2.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        getElements(response);
      }
    };

    request2.open("GET", urlRandom, true);
    request2.send();

    function getElements(response) {
      $('.showRandom').html(`<iframe src="${response.data.embed_url}"></iframe>`);
    }
  });
});