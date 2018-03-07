$(function() {
	//获取全国接口
	$.ajax({
//		url:"http://60.205.115.173:8881/yitai-educational-web/allOrg",
		url:"http://192.168.20.245:8081/yitai-educational-web/allOrg",
		dataType:'JSON',
		type:"GET",
		success:function(res){
			if(res.code == 200){
				var str = '';
				for(var i=0;i<res.data.length;i++){
					var parentNodes = $('#country');
					var data = res.data[i];
					str += '<li><lable>' +
						'<span class="country defaultCss" cityId="'+ data.id +'"><input type="checkbox" name="orgId" value="'+data.id+'"/> '+ data.name +
						'</lable></li>';
				}
				parentNodes.html('').html(str);
			}
		}
	});
	$(document).on("click","#country li span.country",function(e){
		e.stopPropagation();
		var cityStr = '';
		var id = $(this).attr('cityid');
		var _self = $(this);
//					获取省接口
		$.ajax({
//			url:"http://60.205.115.173:8881/yitai-educational-web/eduadmin/eduInfo?id="+id,
			url:"http://192.168.20.245:8081/yitai-educational-web/schadmin/getAreaChilds?id="+id,
			dataType:'JSON',
			type:"GET",
			success:function(res){
				if(res.code == 200){
					if(res.data && res.data.length == 0){
						alert("没有数据");
					}
					if(_self.hasClass('defaultCss')){
						_self.removeClass('defaultCss');
						_self.after('').after('<ul id="city" style="display: none"></ul>');
						for(var i=0;i<res.data.length;i++){
							cityStr +=
								'<li><lable><span class="city defaultStyle" educationId="'+res.data[i].id+'"><input type="checkbox" name="orgId" value="'+res.data[i].id+'" />'+ res.data[i].name +'</span><lable></li>';
						}
						_self.next('#city').html('').html(cityStr);
					}
					if(_self.next('ul#city').is(":visible")){
						_self.next('ul#city').hide();
						_self.next('ul#city').find('ul#district').show();
					} else {
						_self.next('ul#city').show();
						_self.next('ul#city').find('ul#district').hide();
					}
				}
			}
		});
	});
	$(document).on("click","#country li span.city",function(){
		var districtStr = '';
		var educationId = $(this).attr('educationId');
		var that = $(this);
//					获取市接口
		$.ajax({
//			url:"http://60.205.115.173:8881/yitai-educational-web/eduadmin/eduUserList?educationId="+educationId,
			url:"http://192.168.20.245:8081/yitai-educational-web/schadmin/getAreaChilds?id="+educationId,
			dataType:'JSON',
			type:"GET",
			success:function(res){
				if(res.code == 200){
					if(res.data && res.data.length == 0){
						alert("没有数据");
					}
					if(that.hasClass('defaultStyle')){
						that.removeClass('defaultStyle');
						that.after('').after('<ul id="district" style="display: none"></ul>');
						for(var i=0;i<res.data.length;i++){
							districtStr +=
								'<li><lable><span class="district" educationId="'+res.data[i].id+'"><input type="checkbox" name="orgId" value="'+res.data[i].id+'" />'+ res.data[i].name +'</span></lable></li>';
						}
						that.next('#district').html('').html(districtStr);
						
					}
					if(that.next('ul#district').is(":visible")){
						that.next('ul#district').hide();
					} else {
						that.next('ul#district').show();
					}
				}
			}
		});

	});
});

$('#btn_submit').click(function jqchk() { // jquery获取复选框值
	var chk_value = [];
	$('input[name="orgId"]:checked').each(function() {
		chk_value.push($(this).val());
	});
//	alert(chk_value.length == 0 ? '你还没有选择任何内容！' : chk_value);
	
	var boo = confirm(chk_value.length == 0);
	if(boo == true){
//		$.ajax({
//			url:"http://192.168.20.245:8081/yitai-ces-web/mailMessage/saveMessage?id="+educationId,
//			dataType:'JSON',
//			type:"GET",
//			success:function(res){
//				if(res.code == 200){}
//			}
//		});
		alert('发送成功!');
	}
	
});