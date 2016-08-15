!(function(){
	var box=game.box;
	game.cellApi={
		render:function(cellNum){
			box.find("span").css({
				"background":"url(img/dog2.gif)",
				"background-size":"cover"

			});
			var m=Math.floor(Math.random()*cellNum*cellNum);
			box.find("span").eq(m).css({
				"background":"url(img/dog.gif)",
				"background-size":"cover"
			}).data("type","target");
		}
	}
})();
