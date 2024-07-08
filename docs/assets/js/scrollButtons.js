//Get the buttons
var topButton = document.getElementById("scrollToTopBtn");
var bottomButton = document.getElementById("scrollToBottomBtn");

// When the user scrolls down 20px from the top of the document, show the buttons
window.onscroll = function() {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    topButton.style.display = "block";
  } else {
    topButton.style.display = "none";
  }

  // Always show the bottom button
  bottomButton.style.display = "block";
}

// When the user clicks on the top button, scroll to the top of the document
topButton.onclick = function() {
  topFunction();
};

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

// When the user clicks on the bottom button, scroll to the bottom of the document
bottomButton.onclick = function() {
  bottomFunction();
};

function bottomFunction() {
  window.scrollTo(0, document.body.scrollHeight);
}
