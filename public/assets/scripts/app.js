var searchForm = document.querySelector("#searchForm");
var deleteButton = document.querySelector(".deleteIcon");
var contentDiv = document.querySelector(".content");
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
        }, 500, function() {
            deleteButton.style.display = "block";
        });
        url += "https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=extracts%7Cinfo&list=search&titles=&utf8=1&ascii=1&srsearch=" 
        + inputValue + "&srnamespace=0%7C4&srlimit=9&srwhat=text";
        callAjax();
    }
    else if (searchForm.value.length == 1 && (key === 8 || key === 46)) {
        deleteResult();
    }
}

// setup delete button event
deleteButton.addEventListener('click', deleteResult);


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
              $(contentDiv).html(output).hide().show("fade", 1500);
          }  
        };
        xhr.send();
}


function deleteResult() {
    $(contentDiv).hide("slide", {direction: "down"}, 300, function() {
        $(contentDiv).html("");  
        $(titleForm).animate({
            paddingTop: "200px"
        }, 100);
        deleteButton.style.display = "none";
        searchForm.value = "";
        $(searchForm).focus();
        });
}
