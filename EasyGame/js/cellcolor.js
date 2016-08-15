!(function(){
	var box=game.box;
	game.cellApi={
		render:function(cellNum){
				//色差因子，用来干扰颜色
				var f=5;
				f=game.currentindex>9?15:f;
				f=game.currentindex>20?9:f;
				f=game.currentindex>30?5:f;
				
				//根据色差因子得出色值的干扰因子，关卡数超过10就取1
				var v = f * Math.max(9-game.currentindex,1);
				
				var disColor=this.getdisColor();
				var disColorstr="rgb(" + disColor.join(",") + ")";
				var targetColor="rgb(" + this.gettargetColor(disColor,v).join(",") +")";
				
				box.find("span").css({
					  "background-color":disColorstr
				});
				var m=Math.floor(Math.random()*cellNum*cellNum);
				box.find("span").eq(m).css({
	              "background-color": targetColor
				}).data("type","target");
			},
		
		getdisColor:function(){
			return [
			 Math.floor(Math.random()*255),
			 Math.floor(Math.random()*255),
			 Math.floor(Math.random()*255)
			]
		},
		
		gettargetColor:function(disColor,v){
	      var targetColor=[];
	      for(var i in disColor)
	      {
	      	targetColor[i]=disColor[i]+10+v;
	      }
	      return targetColor;
		},
	}
})();
