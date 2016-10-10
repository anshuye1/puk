$(function(){
	//红桃：h 黑桃：s 梅花：c 方块：d
	$(window).on('mousedown',false)
	//制作扑克
	function makePoker(){
		var poker=[];
		var biao={};


		while(poker.length!==52){
		var n=Math.ceil(Math.random()*13);
		var colors=['h','s','c','d'];
		var index=Math.floor(Math.random()*4);
		var c=colors[index];
		var v={color:c,namber:n};
			if (!(biao[n+c])) {
			biao[n+c]=true;
			poker.push(v)
			};
		}
		return poker;
	};
	//放入界面
	function setPoker(poker){
		var dict={1:'A',2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9,10:'T',11:'J',12:'Q',13:'K'}
		var val=0;

	    for (var i = 0; i < 7; i++) {
	    	for (var j = 0; j < i+1; j++) {
	    		val+=1;
		    	$('<div>')
		    		.attr('id',i+'-'+j)
		    		.attr('data-number',poker[val].namber)
					.addClass('pai')
					.css({'backgroundImage':'url(./image/'+dict[poker[val].namber]+poker[val].color+'.png)'})
					.appendTo('.scene1')
					.delay(val*30)
					.animate({
						 top:i*40,
						 left:j*130+(7-i)*65,
					 	 opacity:1	 
					})	
	    	}
		}
		for (; val < poker.length; val++) {
		// for (; val < 32; val++) {
		$('<div>')
		    .attr('data-number',poker[val].namber)
			.addClass('pai left')
			.css({'backgroundImage':'url(./image/'+dict[poker[val].namber]+poker[val].color+'.png)'})
			.appendTo('.scene1')
			.delay(val*30)
			.animate({
				 top: 428,
				 left: 190,
				 opacity:1
			})
		};	
	};
	var poker=makePoker()
   	setPoker(poker);
   	//左右按钮
	   	var moveLeft=$('.move-left');
	   	var moveRight=$('.move-right');
	   	var zIndex=0;
	   	moveRight.on('click',function(){
	   		// console.log($(this).top())
	   		// if($(this)==-20){
	   		// 	$(this).animate({top:'+=20'})
	   		// }
	   		zIndex++;
	   		if ($('.left').length) {
		   		$('.left')
		   		.last()
		   		.css({'zIndex':zIndex})
		   		.animate({left:690})
		   		.queue(function(){
		   			$(this)
		   			.removeClass('left')
		   			.addClass('right')
		   			.dequeue();})
	   		};
	   	})
	   	var number=0;
	   	moveLeft.on('click',function(){
	   		if ($('.left').length) {
	   			return;
	   		}else{
	   			number++;
	   		if (number>3) {return;};
	   		// console.log(number)
	   			$('.right').each(function(i,v){
		   			$(this)
		   			.delay(i*130)
		   			.animate({left:190})
		   			.queue(function(){
		   				$(this)
		   				.css('zIndex',0)
		   				.removeClass('right')
		   				.addClass('left')
		   				.dequeue()
		   			})
	   			})
	   		}
	   	})
	   	//判断点击
	   	var prev=null;
	   	var prev1=null;
	   	function getNumber(el){
	   		return parseInt($(el).attr('data-number'))
	   	}
	   	function isCanClick(el){
	   		var x=parseInt($(el).attr('id').split('-')[0]);
	   		var y=parseInt($(el).attr('id').split('-')[1]);
	   		if ($('#'+(x+1)+'-'+y).length||$('#'+(x+1)+'-'+(y+1)).length){
	   			return false;
	   		}else{
	   			return true;
	   		}
	   	}
	   	var fs=0;
	   	$('.df,.df1').hide()
	   	//点击事件
	   	$('.scene').on('click','.pai',function(){
	   		$(this).css({'border':'3px solid red'})
	   		if ($(this).attr('id')&&!isCanClick(this)) {
	   			$(this).css({'border':'none'})
	   			return;};
	   		if (getNumber($(this))===13) {
	   			fs+=10;
	   			$('.df,.df1').show('slow').delay(600).hide('slow')
	   			$(this).animate({
	   				top:-20,
	   				left:900
	   			},'slow').queue(function(){
	   				$(this).detach()
	   				.dequeue()
	   			})
	   			return $('.fs').text(fs);
	   		}else{   		
	   			if (prev) {			
	   			//第二次点击有prev相当于第一次不是13
		   				if (getNumber(this)+getNumber(prev)==13) {
		   		//如果两次的数字为13
	   						fs+=10;
	   						$('.df,.df1').show('slow').delay(600).hide('slow')
		   					$(this).add(prev)
		   						.animate({
					   				top:-20,
					   				left:900
						   			})
		   						.queue(function(){
					   				$(this).add(prev).detach().dequeue()	
					   		})
		   					$('.fs').text(fs)
		   					prev=null;	
		   					return fs;
				//将选中的这两张移出
		   				}else{
		   					if (this===prev1) {
		   						$(this).add(prev)
			   					.animate({top:'+=20'})
			   					.queue(function(){
			   						$(this).css({'border'
			   						:'none'}).dequeue()
			   					})
		   					}else{
			   					$(this)
			   					.animate({top:'-=20'})
			   					.animate({top:'+=20'})
			   					.queue(function(){
			   						$(this).css({'border'
			   						:'none'}).dequeue()
			   					})
			   					prev
			   					.delay(400)
			   					.animate({top:'+=20'})
			   					.queue(function(){
			   						$(this).css({'border'
			   						:'none'}).dequeue()
			   					})}
		   			};
		   			prev=null;
	   			}else{
	   				prev=$(this);
	   				prev1=this;
	   				prev.animate({top:'-=20'});
	   				//第一次点击赋值prev $(this)	
	   			}
	   		}
		})
		$('.scene button').on('click',function(){
   			$('.scene1').empty()
			setPoker(poker)
			number=0;
			fs=0;
			$('.fs').text(0);
		})

		$('.xx').on('click',function(){
			$('.poker-box').fadeOut('slow');
			$('.start').fadeIn('slow');
			number=0;
			$('.fs').text(0);
			fs=0;
			$('.scene1').empty()
			setPoker(poker)
		})
		$('.start .ks').on('click',function(){
			$('.start').fadeOut('slow');
			$('.poker-box').fadeIn('slow');
		})
		var x=100;	
		var t=setInterval(movess,20);
		var flag=true;
		function movess(){
				if(flag){
					if(x==800){flag=false}
					$('.start .ks').css({'left':x+=1})
				}else{
					if (x==100) {flag=true};
					$('.start .ks').css({'left':x-=1})
				}
			}
		$('.start .ks').on('mouseenter',function(){
			clearInterval(t)
		})
		$('.start .ks').on('mouseleave',function(){
			t=setInterval(movess,20);
		})

		var x1=20;	
		var t1=setInterval(move1,20);
		var flag1=true;
		function move1(){
			if(flag1){
					if(x1==450){flag1=false}
					$('.ff').css({'top':x1+=1})
				}else{
					if (x1==20) {flag1=true};
					$('.ff').css({'top':x1-=1})
				}
		}
			$('.ff div').hide();

		$('.ff').on('mouseenter',function(){
			$('.ff div').show('slow');
			clearInterval(t1)
		})
		$('.ff').on('mouseleave',function(){
			t1=setInterval(move1,20);
			$('.ff div').hide('slow');
		})
		$('.guize').hide();
		$('.ff').on('click',function(){
			$('.guize').show('slow').animate({'left':450})
		})
		$('button').on('click',function(){
			$('.guize').animate({'left':0}).hide('slow')
		})
})