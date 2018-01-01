var searchForm = document.querySelector("#searchForm");
var inputValue;

searchForm.addEventListener("keypress", appendData);

function appendData(e) {
    // e.preventDefault();
    var key = e.keyCode;
    if (key === 13) {
        inputValue = searchForm.value;
        alert(inputValue);
        e.preventDefault();
    }
}