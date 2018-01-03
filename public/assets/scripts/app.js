var searchForm = document.querySelector("#searchForm");
var searchButton = document.querySelector("#searchButton");
var contentDiv = document.querySelector(".content");
var inputValue = "";
var url = "";

// add event listener to search form
searchForm.addEventListener("keypress", getValue);

//add event listener to search button
searchButton.addEventListener("click", getValueClick); 
    // e.preventDefault();
    // inputValue = searchForm.value;
    // url += "https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=extracts%7Cinfo&list=search&titles=&utf8=1&ascii=1&srsearch=" 
    // + inputValue + "&srnamespace=0%7C4&srlimit=10&srwhat=text";



//function to get the value from input form and append result to a div 
function getValue(e) {
    // e.preventDefault();
    var key = e.keyCode;
    if (key === 13) {
        inputValue = searchForm.value;
        url += "https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=extracts%7Cinfo&list=search&titles=&utf8=1&ascii=1&srsearch=" 
        + inputValue + "&srnamespace=0%7C4&srlimit=10&srwhat=text";
        
        // setup ajax calls
        callAjax(); 
        
    }
}

function getValueClick(e) {
    e.preventDefault();
    inputValue = searchForm.value;
    url += "https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=extracts%7Cinfo&list=search&titles=&utf8=1&ascii=1&srsearch=" 
    + inputValue + "&srnamespace=0%7C4&srlimit=10&srwhat=text";
    callAjax();
}

function callAjax() {
    var xhr = new XMLHttpRequest();
        xhr.open('GET', url , true);

        xhr.onload = function() {
          if (this.status === 200) {
              var data = JSON.parse(this.responseText);
              var output = "";
              for (var i = 0; i < data.query.search.length; i++) {
                output += "<a target='_blank' href='https://en.wikipedia.org/?curid=" + data.query.search[i].pageid  + "'><h2>" + data.query.search[i].title + "</h2></a>";
                output += "<p>" + data.query.search[i].snippet + "</p><br>";
                contentDiv.innerHTML = output;
              }
          }  
        };
        
        xhr.send();
}




