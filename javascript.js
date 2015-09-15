//var startTime = new Date().getTime();

$("div.reblog-list").after("<p class='newList insert-here'></p>");
$(".newList").width(function(n, c){
    return c - 40;
    });

var reblogLists = document.querySelectorAll(".reblog-list");
var newLists = document.querySelectorAll(".newList");
for (var i = 0; i < reblogLists.length; i++) {
	var contributedContent = reblogLists[i].parentNode.getElementsByClassName("contributed-content");
	var contributed = false;
	
	if (contributedContent.length > 0) {
		contributed = true;
		
		for ( var m = contributedContent.length-1; m >=0; m--) {
			var comment = contributedContent[m].getElementsByClassName("reblog-content")[0].innerHTML;
			var insertHeres = reblogLists[i].parentNode.getElementsByClassName("insert-here");
			var blockquoteMargin = "style='margin-bottom: 0px;'";
			insertHeres[insertHeres.length-1].innerHTML = 
				"<p class='insert-here' " + blockquoteMargin + ">" + comment + 
				"</p>" + insertHeres[insertHeres.length-1].innerHTML;
			$(contributedContent[m]).remove();
		}
	}
	var reblogItems = reblogLists[i].getElementsByClassName("reblog-list-item");
	for ( var j = reblogItems.length - 1; j >= 0; j-- ) {
		// if there is a header, insert it before the new reblog list
		var reblogTitles = reblogItems[j].getElementsByClassName("reblog-title");
		if (reblogTitles.length > 0) {
			for (var k = reblogTitles.length-1; k >= 0; k--) {
				$(reblogLists[i]).after("<div class='reblog-title reblogTitle'>" 
					+ reblogTitles[k].textContent + "</div>");
			}
			for (var k = reblogTitles.length-1; k >= 0; k--) {
				$(reblogTitles[k]).remove();
			}
		}

		var userTag = reblogItems[j].firstChild.childNodes[1];
		var usernameString;
		// deactivated user case
		if ($(userTag).hasClass("inactive")) {
			usernameString = "<span class='deactivated'><u>" + 
				userTag.firstChild.nodeValue + "</u>:" +
				// commenting out Deactivated status because display will
				// not change
				//"<span class='deactivated-status'>Deactivated</span>" +
				"</span>";
		}
		else {
			var username = userTag.textContent;
			var usernameLink = userTag.attributes.getNamedItem("href").value;
			usernameString = 
				"<a href='" + usernameLink + "'>" + username + "</a>:";
		}
		var insertHeres = reblogLists[i].parentNode.getElementsByClassName("insert-here");
		var comment = "";
		if (reblogItems[j].getElementsByClassName("reblog-content").length > 0) {
			comment = reblogItems[j].getElementsByClassName("reblog-content")[0].innerHTML;
			// if there's a comment, add user, blockquote, and comment
			var blockquoteMargin = 
				(j==reblogItems.length-1 && contributed==false) ? "style='margin-bottom: 0px;'" : "";
			insertHeres[insertHeres.length-1].innerHTML = 
				"<p>" + usernameString + "<blockquote class='insert-here' " + 
				blockquoteMargin + ">" + comment + "</blockquote></p>" + 
				insertHeres[insertHeres.length-1].innerHTML;
		}
		else {
			// if there's no comment, don't add anything
		}

		
	}
	// TODO: fix source and tags problem
	/*
	var sourceFooter = reblogLists[i].parentNode.parentNode.parentNode.getElementsByClassName("post-source-footer");
	if (sourceFooter.length > 0) {
		$(sourceFooter).css("position", "absolute");
		//$(sourceFooter).css("top", "5px");
		var postTags = reblogLists[i].parentNode.parentNode.parentNode.getElementsByClassName("post_tags")[0];
		$(postTags).css("position", "absolute");
		var width = $(sourceFooter).width();
		console.log("width: " + width);
		width = width + "px";
		console.log(width);
		$(postTags).css("left", width);
		console.log($(postTags).css("left"));
		$(postTags).css("margin-top", "-10px !important");
		console.log("got here");
	}
	$(sourceFooter).css("margin-top","-15px");
	*/
}

$(".reblog-list").remove();

// fixes title width
$(".reblogTitle").width(function(n, c){
	return c - 30;
});

// when there's no "reblog-list" but there's a "reblog-list-item contributed-content"
var contributedContent = document.querySelectorAll(".contributed-content");
if (contributedContent.length > 0) {
	for (var m = 0; m < contributedContent.length; m++) {
		if ($(contributedContent[m].parentNode).hasClass("post_content_inner") ||
			$(contributedContent[m].parentNode).hasClass("post_container")) {
			var comment = contributedContent[m].getElementsByClassName("reblog-content")[0].innerHTML;
			var blockquoteMargin = "style='margin-bottom: 0px;'";
			$(contributedContent[m]).after(
				"<div class='insert-here contributed-no-list' " + 
				blockquoteMargin + ">" + comment + "</div>");
			$(contributedContent[m]).remove();	
		}
	}
}

$(".contributed-no-list").width(function(n, c){
	return c - 40;
});

/* doesn't work, may be incompatible with Tumblr's framework
$(document).ready(function(){
	$(".deactivated").mouseenter(function(event){
	  $("#deactivated-status").css("display","inline");
	});

	$(".deactivated").mouseleave(function(event){
	  $("#deactivated-status").css("display","none");
	});
});
*/

/* go back to this if the above has any issues
$(".insert-here.contributed-no-list").width(function(n, c){
	return c - 20;
});
*/

//var endTime = new Date().getTime();
//console.log("Tumblr Posts Fix finished in " + (endTime-startTime) + "ms");