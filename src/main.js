import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import GiphyService from './services/GiphyService.js';

$(document).ready(function() {
  $('#gifResults').click(function() {
    const userInput = $('#user-search').val();
    $("#user-search").val("");
    let promise = GiphyService.searchGif(userInput);
    promise.then(function(response) {
      const body = JSON.parse(response);
      console.log(body.data.embed_url);
      $('.showGIF').html(`<iframe src="${body.data.embed_url}"></iframe>`);
    }, function(error) {
      $("#error").text(`There was an error processing your request: ${error}`);
    });
  });

  $('#trendingGif').click(function() {
    let promise = GiphyService.trendingGif();
    promise.then(function(response) {
      const body = JSON.parse(response);
      const i = Math.floor(Math.random() * 25);
    $('.showGIF').html(`<iframe src="${body.data[i].embed_url}"></iframe>`);
    }, function(error) {
      $("#error").text(`There was an error processing your request: ${error}`);
    });
  });
});
