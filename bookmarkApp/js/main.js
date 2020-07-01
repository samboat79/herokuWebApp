document.getElementById("myForm").addEventListener("submit", saveBoomark);

//This is to save bookmark when submit button is clicked
function saveBoomark(e) {
  //Get form values
  var siteName = document.getElementById("siteName").value;
  var siteUrl = document.getElementById("siteUrl").value;

  if(!validateForm(siteName, siteUrl)){
    return false;

  }

  var bookmark = { name: siteName, url: siteUrl };

  //Using local storage to test
  /*localStorage.setItem("test", "Hello World");
  console.log(localStorage.getItem("test", "Hello World"));
  localStorage.deleteItem("test") */

  //Test if bookmarks is null
  if (localStorage.getItem("bookmarks") === null) {
    //init array
    var bookmarks = [];
    //Add to array
    bookmarks.push(bookmark);
    //set to local storage
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  } else {
    //Get bookmarks from local storage
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

    //Add bookmark to array
    bookmarks.push(bookmark);
    //Reset it to local storage
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

  }
  // clear form
  document.getElementById("myForm").reset();




  //Re-fetch bookmarks
  fetchBookmarks();

  //prevent form from relying on default behavior
  e.preventDefault();
}

//Delete bookmark function
function deleteBookmark(url) {
//Get bookmarks from Local Storage
var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

//Loop through bookmarks
for(var i=0; i < bookmarks.length; i++) {
  if(bookmarks[i].url == url){
    //Remove from array
    bookmarks.splice(i, 1)
  }
}
//Reset local storage after deleting it
localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

//Re-fetch bookmarks
fetchBookmarks();

}

//Fetching bookmarks
function fetchBookmarks() {
  var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

  //Get output id
  var bookmarksResults = document.getElementById("bookmarksResults");

  //Build your output
  bookmarksResults.innerHTML = " ";
  for (var i = 0; i < bookmarks.length; i++) {
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

    bookmarksResults.innerHTML +=
      '<div class="card bg-light text-dark card-body mt-3">'+
      '<h2>' + name +

      '<a class="btn btn-primary" target="_blank" href="'+url+'">visit</a> '  +
      '<a onclick="deleteBookmark(\''+ url + '\')" class="btn btn-danger" href="#">Delete</a> ' +
    '</h2>' + '</div>';
  }
}

function validateForm(siteName, siteUrl){
  if(!siteName || !siteUrl){
    alert("please fill in the form");
    return false;
  }
  var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if(!siteUrl.match(regex)){
    alert("please use valid url");
    return false;
  }

  return true;
}
