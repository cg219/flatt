(function(){
	var content = document.querySelector(".content");
	var videos = [
	"110520891",
	"110531415",
	"110526958",
	"110522221",
	"110527224",
	"110527538",
	"110536700",
	"110535061",
	"110534367",
	"110528974"];

	var player = new DOMParser().parseFromString(iframe, "text/html").querySelector("iframe");

	function makePlayers(videos){
		var i = 0;
		var li;
		var url;
		var currentPlayer;

		for(i; i < videos.length; i++){
			currentPlayer = player.cloneNode();
			li = document.createElement("li");
			url = currentPlayer.getAttribute("src") + videos[i];
			currentPlayer.setAttribute("src", url);

			li.appendChild(currentPlayer);
			content.querySelector("ul").appendChild(li);
		}
	}

	function onResize(){
		var lis = content.querySelectorAll("li");

		if(lis.length > 0){
			var i = 0;
			var newHeight = (content.offsetWidth * .56) + "px";

			for(i; i < lis.length; i++){
				lis[i].style.height = newHeight;
			}
		}
	}

	window.addEventListener("resize", onResize);

	makePlayers(videos);
	onResize();

})();
