function generate_results(){

  let params = (new URL(document.location)).searchParams;

  if (params.has("artist")){
    let artistName = params.get("artist");
    let queryURL = "https://musicbrainz.org/ws/2/artist?query=" + artistName;

    getMBID(queryURL);
//    getAlbums(artistMBID);
  }
}

function getMBID(queryURL){
  let xmlHttp = new XMLHttpRequest();    //Create an XMLHttpRequest object
  xmlHttp.open("get", queryURL);         //Set the request method and url
  xmlHttp.send();                        //(sends) the XMLHttpRequest

  console.log("open and sent request for queryURL");

  xmlHttp.onreadystatechange = function(){
    // readyState: holds the status of the XMLHttpRequest (0: request not initialized, 1: server connection established, 2: request received, 3: processing request, 4: request finished and response is ready)
    // status: returns the status-number of a request (200: "OK", 403: "Forbidden", 404: "Not Found")
      if (this.readyState == 4 & this.status == 200){
        let retrievedData = this.responseXML;            //  Returns the response as document (XML data)

        //Data parsing
        let artistName = retrievedData.getElementsByTagName("artist")[0].getElementsByTagName("name")[0].innerHTML;
        let artistMBID = retrievedData.getElementsByTagName("artist")[0].id;
        
        getAlbums(artistMBID);

        let placeholder = document.getElementById('artist_Name');
        placeholder.innerHTML = `Current artist is ${artistName}`;

      }
   }
}

function getAlbums(artistMBID){
  console.log("we are in getAlbums, the artistMBID is " + artistMBID);
  let url = "https://musicbrainz.org/ws/2/release-group?artist=" + artistMBID;
  let xmlHttp = new XMLHttpRequest();    //Create an XMLHttpRequest object
  xmlHttp.open("get", url);         //Set the request method and url
  xmlHttp.send();                        //(sends) the XMLHttpRequest

  xmlHttp.onreadystatechange = function(){
    console.log("open and sent request for url, which is " + url);
    console.log("this.readyState is " + this.readyState + "this.status is " + this.status);
    if (this.readyState == 4 & this.status == 200){
      let retrievedData = this.responseXML;            //  Returns the response as document (XML data)
      console.log("WE MADE IT");

      //Data parsing
      let songs = retrievedData.getElementsByTagName('release-group');
      let albums = [];
      console.log("songs.length is " + songs.length);

      for (i = 0; i < songs.length; i++){
        if(songs[i].getAttribute("type") == "Album"){
            console.log("the songs at index " + i + " is an album by the name of " + songs[i]);
            albums.push(songs[i]);
        }
      }
      console.log("albums.length is " + albums.length);
      console.log("WE ARE GOING TO SHOW SORTED ALBUMS SOON")
      sortedAlbums = albums.sort((a,b)=> new Date(a.getElementsByTagName("first-release-date")[0].innerHTML) - new Date(b.getElementsByTagName("first-release-date")[0].innerHTML));
      showTable(sortedAlbums);
    }
  }
}

function showTable(sortedAlbums) {
    let table = document.createElement('table');
    tr = document.createElement('tr');
    td1 = document.createElement('td');
    td2 = document.createElement('td');

    td1.innerHTML = "Album Name";
    td2.innerHTML = "Release Date";

    tr.appendChild(td1);
    tr.appendChild(td2);

    table.appendChild(tr);

    for (i = 0; i < sortedAlbums.length; i++) {
        tr = document.createElement('tr');

        td1 = document.createElement('td');
        td1.innerHTML = sortedAlbums[i].getElementsByTagName('title')[0].innerHTML;
        tr.appendChild(td1);

        td2 = document.createElement('td');
        td2.innerHTML = sortedAlbums[i].getElementsByTagName('first-release-date')[0].innerHTML;
        tr.appendChild(td2);

        table.appendChild(tr);
    }
    document.getElementById('the_result').appendChild(table);
}

window.onload = generate_results();
