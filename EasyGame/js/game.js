//!(function(){
//	//渲染格子
//	var cellNum=2;
//	var i;
//	for(i=0;i<cellNum*cellNum;i++){
//		$("#box").append($('<span>'));
//	}
//	$("#box").prop("class","lv"+cellNum);
//	
//	//游戏结束
//	$("#result_page").show().animate({
//		marginTop:"50px"
//	},1000);
//})();
!(function(){
	 var totalTime=5;
	var game = {
		//页面初始化
		startPage: $("#start_page"),
		playPage: $("#play_page"),
		resultPage: $("#result_page"),
		
		//按钮的初始化
		btnStart:$("#btn_start"),
		btnMore:$("#btn_more"),
		btnAgain:$("#btn_again"),
		
		box:$("#box"),
		spanTime:$("#time"),
		timelimit:totalTime,
		level:[2,3,4,5,6,6,7,7,8,8,8,8,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9],
		score:0,
		currentindex:0,
		//初始化
		init: function(){
			var eventName = "ontouchstart" in document.documentElement ? "touched" : "click";
			//开始按钮(如果不给这个this会改变当前操作对象为按钮对象，如果给了的话就不会改变事件源，这个事件源是game对象)
			this.btnStart.on(eventName,this.start.bind(this));
			this.btnAgain.on(eventName,this.startAgain.bind(this));
			this.btnMore.on(eventName,this.More.bind(this));
		},
		start: function(){
			this.startPage.hide();
			this.playPage.show();
			this.resultPage.css({"margin-top":"-350px"}).hide();
			this.box.fadeIn();
			
			this.tick();
			this.rendercell();
			
		},
		tick:function(){
			if(this.timelimit<0){
				clearTimeout(this.timeOutId);
               this.gameOver();
     				return;
			}
			this.spanTime.html(this.timelimit);
			this.timelimit--;
			this.timeOutId=setTimeout(this.tick.bind(this),1000);
		},
		
		rendercell:function(){
			if(this.currentIndex>this.level.length-1)
			{
				var cellNum=this.level[this.level.length-1];
			}
			else
			{
				var cellNum=this.level[this.currentindex];
			}
			var i;
			for(i=0;i<cellNum*cellNum;i++){
				var eventName = "ontouchstart" in document.documentElement ? "touched" : "click";
				this.box.append($('<span>')).on(eventName,this.selectIndex.bind(this));
			}
			this.box.prop("class","lv"+cellNum);
			this.cellApi.render(cellNum);
		},
		
		
		selectIndex:function(event){
			if($(event.target).data("type")=="target")
			{   this.timelimit+=1;//加一秒
				this.score+=10;
				this.nextlevel();
				
			}
			
		},
	   
	   
	   nextlevel:function(){
	   	this.currentindex++;
	   	this.box.empty();
	   	this.rendercell();
	   },
	   
	   gameOver:function(){
		    if(this.score>=100)
			{this.resultPage.find("h1").html("恭喜通关");}
	   		this.box.fadeOut(1000,function(){
	   		this.playPage.hide();
	   		this.resultPage.show().animate({marginTop:"50px"},1000);
	   		this.resultPage.find(".score").html(this.score);

	   	}.bind(this)).empty();
	   },
	   
	   startAgain:function(){
	   	this.reset();
	   	this.start();
	   },
		
	   reset:function(){
	   	this.currentindex=0;
	   	this.score=0;
	   	this.timelimit=totalTime;
	   },
	   
	   More:function(){
//	   	var eventName = "ontouchstart" in document.documentElement ? "touched" : "click";
//      this.btnStart.on(eventName,this.start.bind(this));
         $.getScript("js/cell.js",function(){
			game.startPage.hide();
			game.playPage.show();
			game.resultPage.css({"margin-top":"-350px"}).hide();
			game.box.fadeIn();
			
			game.tick();
			game.rendercell();
         });
	   }
	}
	game.init();
	window.game=game;
})();
