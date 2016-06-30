$(function() {

  var page = 1;
  var flickrResponse;
  var photoPages;
  
  var img = $("<img />");
  img.css('display','none');
  img.appendTo("body");

 var getFlickrData = 
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
    });

 getFlickrData.then(function (data) {
  flickrPhotoArray = data.photos.photo;
  loopThroughImages(flickrPhotoArray);
 });
 
  var images = new Array();
  var time = 1000;
  var delayStay = 5000;
  var delaySwitch = 1000;


  function loopThroughImages(flickrPhotoArray) {
    $.each(flickrPhotoArray, function(index, flickrPhoto) {
      showImage(img,getImageSrc(flickrPhoto));
    });
  };

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


