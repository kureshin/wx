$(function(){
			var errinfo=$('#register_err');
			var isEmailValid=false;
			//返回上一页
			$(".btn_return").click(function() {
               window.history.back(-1);
		   });
		    //提交注册表单
		    $(".btn_ok").click(function() {
		    	var find=$("#uname").val();
		    	if($("#uname").val()==""&&$("#pwd1").val()==""&&$("#pwd_again").val()==""&&$("#pwd1").val()==$("#pwd_again").val())
		    	{
		    		errinfo.text('用户名和密码不为空');
		    	}else if(!isEmail(find)){
		    		errinfo.text('格式不正确');
		    	}else if(!isHasUname())
		    	{
		    		errinfo.text('该用户名已存在');
		    	}
		    	else{
		    		$('#register_form').submit();	
		    	}
				
			});
			//密码框聚焦
		   $("#pwd1,#pwd_again").focus(function(){
                $("#left_hand2").animate({
                    left: "150",
                    top: " -38"
                },{step: function(){
                    if(parseInt($("#left_hand2").css("left"))>140){
                        $("#left_hand2").attr("class","left_hand");
                    }
                }}, 2000);
                $("#right_hand2").animate({
                    right: "-64",
                    top: "-38px"
                },{step: function(){
                    if(parseInt($("#right_hand2").css("right"))> -70){
                        $("#right_hand2").attr("class","right_hand");
                    }
                }}, 2000);
            });
            //密码框失去焦点验证
            $("#pwd1,#pwd_again").blur(function(){
                $("#left_hand2").attr("class","initial_left_hand");
                $("#left_hand2").attr("style","left:100px;top:-12px;");
                $("#right_hand2").attr("class","initial_right_hand");
                $("#right_hand2").attr("style","right:-112px;top:-12px");
                var find1=$("#pwd1").val();
			    var find2=$("#pwd_again").val();
                if(find1=="")
                {
                	errinfo.text('密码不为空');
                }else{
                	errinfo.text('');
                }
                //再次输入密码
                if(find2=="")
                {
                	errinfo.text('密码不为空');
                }else if(find2!=find1){
                	errinfo.text('密码不一致');
                }else
                {
                    errinfo.text('');
                }
            });
           $("#uname").blur(function(){
                var find=$("#uname").val();
                if(find=="")
                {
                	errinfo.text('用户名不为空');
                }else{
                	errinfo.text('');
                }
            });
            //验证用户名的可用性
            $("#uname").bind('keyup',function(){
            	var find=$("#uname").val();
                if(find=="")
                {
                	errinfo.text('用户名不为空');
                }else if(!isEmail(find)){
                	errinfo.text('格式不正确');
                }else{
                	errinfo.text('');
                }
            });
            //检测密码填写的正确性
            $("#pwd1").bind('keyup',function(){
            	var find1=$("#pwd1").val();
                if(find1=="")
                {
                	errinfo.text('密码不为空');
                }else if(!isNaN(find1)){
                	errinfo.text('密码不能纯数字');
                }else if(find1.length<6){
                	errinfo.text('密码长度小于6位');
                }else{
                	errinfo.text('');
                }
            });  
            //检测密码填写的正确性
            $("#pwd_again").bind('keyup',function(){
                 var find1=$("#pwd1").val();
                 var find2=$("#pwd_again").val();
                if(find2=="")
                {
                	errinfo.text('密码不为空');
                }else if(!isNaN(find2)){
                	errinfo.text('密码不能纯数字');
                }else if(find2.length<6){
                	errinfo.text('密码长度小于6位');
                }else if(find1!=find2){
                	errinfo.text('密码不一致');
                }else{
                	errinfo.text('');
                }
            });

		  function isEmail(email){
				   var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
				   if(!myreg.test(email)) return false;
				   return true;
		  }
		  function isHasUname(){
		  	   var email=$("#uname").val().trim();
				$.ajax({
					type: "post",
					url: "checkEmail",
					async: true,
					data:{ email:email} ,
					success:function(resp){
						console.log(resp);
						if(resp.status == 200){
							switch(resp.data){
								case 1:
							     errinfo.text('该用户名已存在');
							     isEmailValid = false;
								break;
								case 0:
								errinfo.text('');
								isEmailValid = true;
								break;
							}
						}
					}
				});
				return true;
 }
		  
});