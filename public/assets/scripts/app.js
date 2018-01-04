var searchForm = document.querySelector("#searchForm");
var searchButton = document.querySelector("#searchButton");
var contentDiv = document.querySelector(".content");
var wrapperDiv = document.querySelector(".wrapper");
var titleForm = document.querySelector(".titleForm");
var inputValue = "";
var url = "";

// add event listener to search form
searchForm.addEventListener("keypress", getValue);


//function to get the value from input form when user press enter
function getValue(e) {
    var key = e.keyCode;
    if (key === 13) {
        contentDiv.innerHTML = "";
        inputValue = searchForm.value;
        $(titleForm).delay(200).animate({
            paddingTop: "40px"
        }, 500);
        url += "https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=extracts%7Cinfo&list=search&titles=&utf8=1&ascii=1&srsearch=" 
        + inputValue + "&srnamespace=0%7C4&srlimit=9&srwhat=text";
        callAjax(); 
        
    }
    else if (searchForm.value.length == 1 && (key === 8 || key === 46)) {
        contentDiv.innerHTML = "";
        $(titleForm).delay(50).animate({
            paddingTop: "200px"
        }, 400);
    }
}


// setup ajax calls
function callAjax() {
    var xhr = new XMLHttpRequest();
        xhr.open('GET', url , true);

        xhr.onload = function() {
          if (this.status === 200) {
              var data = JSON.parse(this.responseText);
              var output = "";
              for (var i = 0; i < data.query.search.length; i++) {
                output += "<div><a target='_blank' href='https://en.wikipedia.org/?curid=" + data.query.search[i].pageid  + "'><h2>" + data.query.search[i].title + "</h2>";
                output += "<p>" + data.query.search[i].snippet + "...</p></a><br></div>";
              }
            //   var content = document.createElement('div');
              contentDiv.innerHTML = output;
            //   $(wrapperDiv).delay(200).append(content).slideDown("slow");
              
          }  
        };
        
        xhr.send();
}









//add event listener to search button
// searchButton.addEventListener("click", getValueClick); 
// function getValueClick(e) {
//     e.preventDefault();
//     inputValue = searchForm.value;
//     url += "https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=extracts%7Cinfo&list=search&titles=&utf8=1&ascii=1&srsearch=" 
//     + inputValue + "&srnamespace=0%7C4&srlimit=10&srwhat=text";
//     callAjax();
// }