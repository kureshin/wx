$(function(){
			var lform = $('#login_form');
			var errmsg=$('#login_err');
            //密码框得到焦点
            $("#pwd").focus(function(){
                $("#left_hand").animate({
                    left: "150",
                    top: " -38"
                },{step: function(){
                    if(parseInt($("#left_hand").css("left"))>140){
                        $("#left_hand").attr("class","left_hand");
                    }
                }}, 2000);
                $("#right_hand").animate({
                    right: "-64",
                    top: "-38px"
                },{step: function(){
                    if(parseInt($("#right_hand").css("right"))> -70){
                        $("#right_hand").attr("class","right_hand");
                    }
                }}, 2000);
            });
            //密码框失去焦点
            $("#pwd").blur(function(){
                $("#left_hand").attr("class","initial_left_hand");
                $("#left_hand").attr("style","left:100px;top:-12px;");
                $("#right_hand").attr("class","initial_right_hand");
                $("#right_hand").attr("style","right:-112px;top:-12px");
               var find=$("#pwd").val();
                if(find=="")
                {
                	errmsg.text('密码不为空');
                }else{
                	errmsg.text('');
                }
                
            });
            //检测密码填写的正确性
            $("#pwd").bind('keyup',function(){
            	var find=$("#pwd").val();
                if(find=="")
                {
                	errmsg.text('密码不为空');
                }else if(find.length<6){
                	errmsg.text('密码长度小于6位');
                }else{
                	errmsg.text('');
                }
            });
            //失焦时验证用户名的正确性
            $("#uname").blur(function(){
            	var find=$("#uname").val();
                if(find=="")
                {
                	errmsg.text('用户名不为空');
                }else if(!isEmail(find)){
                	errmsg.text('格式不正确');
                }else{
                	errmsg.text('');
                }
            });
            //验证用户名的正确性
            $("#uname").bind('keyup',function(){
            	var find=$("#uname").val();
                if(find=="")
                {
                	errmsg.text('用户名不为空');
                }else if(!isEmail(find)){
                	errmsg.text('格式不正确');
                }else{
                	errmsg.text('');
                }
            });
		   	//提交登录表单
		    $(".btn_login").click(function() {
		    	var find=$("#uname").val();
		    	if($("#uname").val()==""||$("#pwd").val()=="")
		    	{
		    		errmsg.text('用户名和密码不为空');
		    	}else if(!isEmail(find)){
		    		errmsg.text('格式不正确');
		    	}
		    	else{
		    		isAjaxLogin();
		    	}
			});
		 function isAjaxLogin(){
				var  params = lform.serialize();
				$.ajax({
					type: "post",
					url: "doLogin",
					async: true,
					data: params,
					success:function(resp){
						console.log(resp);
						if(resp.status == 200){
							switch(resp.data){
								case 1:
								errmsg.text('用户名或密码错误');
								break;
								case 0:
								errmsg.text('');
								window.location.href = "../Index/index";
//								window.history.go(-1);
								break;
							}
						}
					}
				});
		 }
		
		function isEmail(email){
			   var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
			   if(!myreg.test(email)) return false;
			   return true;
		}
});