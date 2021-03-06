//Function that calls the DataMuse API to retrieve synonyms for the users search query. 
//DataMuse API: https://www.datamuse.com/api/ 
function getSynonyms() {
    document.getElementById("resultsArea").innerHTML = "";
    var request = new XMLHttpRequest();
    var searchInput = document.getElementById("searchInput").value;
    var url = "https://api.datamuse.com/words?rel_syn=" + searchInput;
    
    //Setup up for results area with cards.
    //Resource used: https://www.taniarascia.com/how-to-connect-to-an-api-with-javascript/
    const app = document.getElementById("resultsArea");
    const logo = document.createElement('img');
    logo.src = 'logo_small.png';
    
    const container = document.createElement('div');
    container.setAttribute('class','container');
    app.appendChild(logo);
    app.appendChild(container);

    request.open('GET', url, true);
    request.onload = function () {

        //Handle JSON response
        var data = JSON.parse(this.response);
        
        //If no synonyms are found display a message
        if (request.status >= 200 && request.status < 400) {
            if(data.length == 0){
               document.getElementById("resultsArea").innerHTML += "We're speechless... No synonyms found.";
            }
            //Go through all results of response and create a card for each synonym with definition
            data.forEach(function (element) {
                const card = document.createElement('div');
                card.setAttribute('class','card');
                const title = document.createElement('h1');
                title.textContent = element.word;
                
                const p = document.createElement('p');
                getDefinition(element.word,p);           
                
                container.appendChild(card);
                card.appendChild(title);
                card.appendChild(p);
            });

        } else {
            console.log('Error from datamuse API');
        }
    }

    request.send();
}

//function to call Wordnik API to get definition of words
function getDefinition(word,p){
    var request2 = new XMLHttpRequest();
    var url_wordnik = "https://api.wordnik.com/v4/word.json/" + word + "/definitions?limit=200&includeRelated=false&useCanonical=false&includeTags=false&api_key=6154a97e2c3f02c2541080c31690924ea7cd4fa3ac7e47476";
    var definition = "";
    
    request2.open('GET', url_wordnik, true);  
    request2.onload = function () {

        //Handle JSON response
        var data = JSON.parse(this.response);

        if (request2.status >= 200 && request2.status < 400) {
            definition = data[0].text;
            p.textContent = definition;
        } else {
            console.log('Error from wordnik API');
        }
    }
    request2.send();
}










