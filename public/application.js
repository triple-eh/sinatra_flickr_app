$(function() {

  var page = 1;
  var flickrResponse;
  var pages;
  
  var img = $("<img />");
  img.css('display','none');
  img.appendTo("body");

  var getFlickrImages =
    $.ajax({
      url: 'https://api.flickr.com/services/rest/',
      data: {
        'method': 'flickr.photos.search',
        'api_key': '5bad2977891488cf413ce219b8bddeb4',
        'tags': 'lighthouse',
        'format': 'json',
        'page': page
      },
      dataType:'jsonp',
      jsonpCallback:'jsonFlickrApi'
      // success: function(data) {
      //   flickrResponse = data;
      // }
    });

  var images = new Array();
  var time = 1000;
  var delayStay = 5000;
  var delaySwitch = 1000;

  // getFlickrImages.then(function(data) {
  //   console.log(data);
  // });

  getFlickrImages.then(function(data) {
    $.each(data.photos.photo, function(index, flickrPhoto) {
      // var imgSrc = "https://farm"+ obj.farm + ".staticflickr.com/" + obj.server + "/" + obj.id + "_" + obj.secret + ".jpg";
      showImage(img,getImageSrc(flickrPhoto));
    });
  });

  // getFlickrImages.then(function(data) {
  //   $.each(data.photos.photo, function(index, obj) {
  //     var imgSrc = "https://farm"+ obj.farm + ".staticflickr.com/" + obj.server + "/" + obj.id + "_" + obj.secret + ".jpg";
  //     showImage(img,imgSrc);
  //   });
  // });

  function showImage(el, src) {
    setTimeout( function() { 
      el.attr('src', src);
      el.fadeIn(); }, time );
    time += delayStay;
    setTimeout( function() { 
      el.fadeOut(); }, time );
    time += delaySwitch;        
  };

  function getImageSrc(flickrPhoto) {
    var farm = flickrPhoto.farm;
    var server = flickrPhoto.server;
    var id = flickrPhoto.id;
    var secret = flickrPhoto.secret;
    var imgSrc = "https://farm" + farm + ".staticflickr.com/" + server + "/" + id + "_" + secret + ".jpg";
    return imgSrc
  };

});
