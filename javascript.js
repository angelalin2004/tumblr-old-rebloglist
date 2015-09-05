$("div.reblog-list").after("<p class='newList insert-here'></p>");
$(".newList").width(function(n, c){
    return c - 40;
    });

var reblogLists = document.querySelectorAll(".reblog-list");
var newLists = document.querySelectorAll(".newList");
for (var i = 0; i < reblogLists.length; i++) {
	var reblogItems = reblogLists[i].getElementsByClassName("reblog-list-item");
	for ( var j = reblogItems.length - 1; j >= 0; j-- ) {
		// if there is a header, insert it before the new reblog list
		var reblogTitles = reblogItems[j].getElementsByClassName("reblog-title");
		if (reblogTitles.length > 0) {
			for (var k = reblogTitles.length-1; k >= 0; k--) {
				$(reblogLists[i]).after("<div class='reblog-title reblogTitle'>" + reblogTitles[k].textContent + "</div>");
			}
		}

		var userTag = reblogItems[j].firstChild.childNodes[1];
		var usernameString;
		// deactivated user case
		if ($(userTag).hasClass("inactive")) {
			usernameString = "<span class='deactivated'>" + 
				userTag.firstChild.nodeValue + "-deactivated</span>:";
		}
		else {
			
			var username = userTag.textContent;
			var usernameLink = 
				userTag.attributes.getNamedItem("href").value;
			usernameString = "<a href='" + usernameLink + "'>" + username + "</a>:";
			
		}
		var comment = reblogItems[j].getElementsByClassName("reblog-content")[0].innerHTML;
		var blockquoteMargin = (j==reblogItems.length-1) ? "style='margin-bottom: 0px;'" : "";
		var insertHeres = reblogLists[i].parentNode.getElementsByClassName("insert-here");
		insertHeres[insertHeres.length-1].innerHTML = "<p>" + usernameString + 
			"<blockquote class='insert-here' " + blockquoteMargin + ">" + comment + 
			"</blockquote></p>" + insertHeres[insertHeres.length-1].innerHTML;
	}
	// reduce source footer margin
	/*
	var sourceFooter = reblogLists[i].parentNode.getElementsByClassName("post-source-footer")[0];
	$(sourceFooter).css("margin-top","-15px");
	*/
}

$(".reblog-list").remove();
//$(".newList").addClass("reblog-list");

$(".reblogTitle").width(function(n, c){
	return c - 20;
});