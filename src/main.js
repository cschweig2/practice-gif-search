import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

$(document).ready(function() {
  $('#gifResults').click(function() {
    const userInput = $('#user-search').val();
    // $('#user-search').val("");

    let request = new XMLHttpRequest();
    let url = `https://api.giphy.com/v1/gifs/random?api_key=${process.env.API_KEY}&rating=r&lang=en`;

    if(userInput) {
      url = url + `&tag=${userInput}`;
    }

    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        getElements(response);
      }
    };

    request.open("GET", url, true);
    request.send();

    function getElements(response) {
      $('.showGIF').html(`<iframe src="${response.data.embed_url}"></iframe>`);
    }
  });

  $('#trendingGif').click(function() {
    let request = new XMLHttpRequest();
    let urlRandom = `https://api.giphy.com/v1/gifs/trending?api_key=${process.env.API_KEY}&limit=25&rating=r&lang=en`;

    request.onreadystatechange = function() {
      try {
          if(this.status === 403) {
            throw "invalid";
          } else if (this.readyState === 4 && this.status === 200) {
          const response = JSON.parse(this.responseText);
          getElements(response);
          }
        } catch (error) {
          $("#error").text("input is " + error);
        }
    };

    request.open("GET", urlRandom, true);
    request.send();

    function getElements(response) {
      const i = Math.floor(Math.random() * 25);
      $('.showRandom').html(`<iframe src="${response.data[i].embed_url}"></iframe>`);
    }
  });
});