function getSynonyms(){
    document.getElementById("resultsArea").innerHTML = "";
    var request = new XMLHttpRequest();
    var searchInput = document.getElementById("searchInput").value;
    var url = "https://api.datamuse.com/words?rel_syn="+searchInput;

    request.open('GET', url, true);
    request.onload = function () {

      // Begin accessing JSON data here
      var data = JSON.parse(this.response);

    if (request.status >= 200 && request.status < 400) {
        //console.log(result.word);
        data.forEach(function(element) {
            document.getElementById("resultsArea").innerHTML += element.word + " ";
        });
        
    } 
    else {
        console.log('error');
    }
    }

    request.send();
    
}