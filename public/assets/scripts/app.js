var searchForm = document.querySelector("#searchForm");
var searchButton = document.querySelector("#searchButton");
var contentDiv = document.querySelector(".content");
var inputValue;

// add event listener to search form
searchForm.addEventListener("keypress", getValue);

//add event listener to search button
searchButton.addEventListener("click", function(e) {
    e.preventDefault();
    inputValue = searchForm.value;
});

//function to get the value from input form and append result to a div 
function getValue(e) {
    // e.preventDefault();
    var key = e.keyCode;
    if (key === 13) {
        inputValue = searchForm.value;
        
    }
}

// function appendDiv() {
//     contentDiv.innerHTML = "<p>" + inputValue + "</p>";   
// }

// setup ajax calls

var xhr = new XMLHttpRequest();
var url = "https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=extracts%7Cinfo&list=search&titles=&utf8=1&ascii=1&srsearch=" + inputValue + "&srnamespace=0%7C4&srlimit=10&srwhat=text";
xhr.open('GET', url , true);

xhr.onload = function() {
  if (this.status === 200) {
      var data = JSON.parse(this.responseText);
      console.log(data.query.search[0].title);
      console.log(data.query.search[0].snippet);
  }  
};

xhr.send();


