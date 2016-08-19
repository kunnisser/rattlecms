(function(window,document,undefined){
	/*
	 url:接口地址
	 type:请求类型
	 dataType:响应数据类型
	 data:json参数
	 * */
	var mockAjax=function(url,coverData,callback,options){
		this.$url=url,
		this.$defaultsData={},
		this.$defaultSet={
			'type':'POST',
			'dataType':'json',
			'async':true
		},
		this.optionsData=$.extend({}, this.$defaultsData, coverData||{}),
		this.optionType=$.extend({},this.$defaultSet,options||{}),
		this.optionsCallBack=callback
	}
	
	mockAjax.prototype={
		init:function(){
			var _this=this;
			var errorMes='请求失败，请检查网络环境或接口！';
			$.ajax({
				type:_this.optionType.type,
				url:_this.$url,
				async:_this.optionType.async,
				dataType:_this.optionType.dataType,
				data:_this.optionsData,
				success:function(data){
					_this.optionsCallBack.call(this,data);
				},
				error:function(data){
					console.log(errorMes);
				}
			});
		},
		crossDomain:function(){
			var _this=this;
			var errorMes='请求超时，请检查网络环境或接口！';
			$.ajax({
				url:_this.$url,
				data:_this.optionsData,
				timeout:5000,
				dataType:'jsonp',
				jsonpCallback:'jsonp',
				success:function(data){
					_this.optionsCallBack.call(this,data);
				},
				error:function(xhr,type){
					console.log(errorMes);
				}
			});
		}
	}
	
	$.fn.mockPlugin=function(url,coverData,callback,options){
		return (new mockAjax(url,coverData,callback,options)).init();
	}
	
	$.fn.mockPluginDomain=function(url,coverData,callback,options){
		return (new mockAjax(url,coverData,callback,options)).crossDomain();
	}
}(jQuery,window,document));
