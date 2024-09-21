document.addEventListener("DOMContentLoaded", function () {
  var pcSource = "pc/";
  var pcNumImages = 450;

  var numImages = pcNumImages;
  var imageHeight = numImages * 6;
  var contentDiv = document.getElementById("content-pv1");
  var canvas = document.getElementById("image-sequence-pv1");
  var ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  contentDiv.style.height = numImages * 6 + "px";
  contentDiv.style.paddingTop = numImages * 6 + "px";

  var preloadedImages = [];
  var loadedImagesCount = 0;

  function preloadImages() {
    var canvaspv1 = document.getElementById("image-sequence-pv1");
    var ctxpv1 = canvaspv1.getContext("2d");

    var imgpv1 = new Image();

    imgpv1.onload = function () {
      ctxpv1.clearRect(0, 0, canvaspv1.width, canvaspv1.height);
      ctxpv1.drawImage(imgpv1, 0, 0, canvaspv1.width, canvaspv1.height);
    };

    imgpv1.src = "pc/45-44-11-21-9-2024_pcv1-00001.jpg";

    for (var i = 0; i < numImages; i++) {
      var img = new Image();
      var imageUrl =
        pcSource + "45-44-11-21-9-2024_pcv1-" + pad(i + 1, 5) + ".jpg";
      img.src = imageUrl;
      img.onload = function () {
        loadedImagesCount++;

        if (loadedImagesCount === numImages) {
          console.log("All images preloaded");
        }
      };
      preloadedImages.push(img);
    }
  }

  preloadImages();

  window.addEventListener("scroll", function () {
    var scrollTop = window.scrollY || window.pageYOffset;
    var windowHeight =
      window.innerHeight || document.documentElement.clientHeight;

    var imageIndex = Math.floor(scrollTop / (imageHeight / numImages));

    if (imageIndex >= numImages) {
      imageIndex = numImages - 1;
    }

    var img = preloadedImages[imageIndex];
    if (img.complete) {
      console.log(img);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
  });

  function pad(num, size) {
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
  }
});
