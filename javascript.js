$("div.reblog-list").after("<p class='test insert-here'></p>");
$(".test").width(function(n, c){
        return c - 40;
        });


var reblogLists = document.querySelectorAll(".reblog-list");
var newLists = document.querySelectorAll(".test");
console.log("Number of lists: " + reblogLists.length);
console.log("Number of NEW lists: " + newLists.length);
for (var i = 0; i < reblogLists.length; i++) {
	var reblogItems = reblogLists[i].getElementsByClassName("reblog-list-item");
	console.log("Items in list " + i + ": " + reblogItems.length);
	for ( var j = reblogItems.length - 1; j >= 0; j-- ) {
		var username = reblogItems[j].firstChild.childNodes[1].textContent;
		var usernameLink = 
			reblogItems[j].firstChild.childNodes[1].attributes.getNamedItem("href").value;
		var comment = reblogItems[j].childNodes[1].innerHTML;
		console.log(username);
		var insertHeres = reblogLists[i].parentNode.getElementsByClassName("insert-here");
		insertHeres[insertHeres.length-1].innerHTML = "<p><a href='" + usernameLink + "'>" + 
			username + ":</a><blockquote class='insert-here'>" + comment + 
			"</blockquote></p>" + insertHeres[insertHeres.length-1].innerHTML;
	}
}