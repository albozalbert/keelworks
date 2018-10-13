$(function(){
	$(".infobox").hover(
		function() {
			var icon = $(this).find(".icon img"),
				ico_n = icon.attr("src"), 
				hov = icon.data("hov");
			icon.attr("src", hov);
			icon.data("hov", ico_n);
		}, function() {
			var icon = $(this).find(".icon img"),
				icon_n = icon.data("hov"), 
				hov = icon.attr("src");
			icon.attr("src", icon_n);
			icon.data("hov", hov);
		}
	);
	
	$(".open_menu").on("click", function(e){
		e.preventDefault();
		$(".mob_menu").addClass("active");
		$("body").css({"overflow":"hidden"});
	});
	
	$(".close_menu").on("click", function(e){
		e.preventDefault();
		$(".mob_menu").removeClass("active");
		$("body").removeAttr("style");
	});
	
	if($(".testimonial").length){
		function resize_testimonial(){
			$(".testimonial").css({"height":(parseInt($(".testimonial ul li.active").outerHeight())+31)+'px'});
		}
		resize_testimonial();
		
		// auto play testimonials
		if($(".testimonial li").length > 1){
			var testimonials_play = setInterval(function(){
				if($(".test_bullets span.active").is(':last-child')){
					$(".test_bullets span:first-child").click();
				}else{
					$(".test_bullets span.active").next().click();
				}
			}, 10000);
		}
	}
	
	function change_testimonial(index){
		var container = $(".testimonial").offset().top,
			current = $(".testimonial li:nth-child("+index+")");
			
			//clearInterval(testimonials_play);
			
			if((parseInt(container)-parseInt(current.offset().top)) < 0){
				$(".testimonial ul").css({"margin-top": "-="+Math.abs((parseInt(container)-current.offset().top))+"px"});
			}else{
				$(".testimonial ul").css({"margin-top": "+="+(parseInt(container)-parseInt(current.offset().top))+"px"});
			}
			
			$(".testimonial li").removeClass("active");
			current.addClass("active");
			resize_testimonial();
			return false;
	}
	
	$(".test_bullets span").on("click", function(){
		var kjo = $(this);
		if(kjo.hasClass("active")) return false;
		
		$(".test_bullets span").removeClass("active");
		kjo.addClass("active");
		
		change_testimonial(parseInt(kjo.index())+1);
		
		return false;
	});
	
	$(".gttop").on("click", function(){
		var body = $("html, body");
		body.animate({scrollTop:0}, '400', 'swing');
		return false;
	});
	
	if($(".portfolio").length){
		$(".portfolio_menu a").on("click", function(){
			var kjo = $(this);
			if(kjo.hasClass("active")){
				$(".portfolio_menu a, .portfolio li").removeClass("active");
				$(".portfolio li").addClass("active");
				return false;
			}
			
			history.pushState(null, this.textContent, document.location.href.match(/(^[^#]*)/)[0]+"#"+kjo.data("cat"));
			
			$(".portfolio_menu a, .portfolio li").removeClass("active");
			kjo.addClass("active");
			$(".portfolio li[data-cat='"+kjo.data("cat")+"']").addClass("active");
			return false;
		});
		
		if(window.location.hash) {
			$('.portfolio_menu a[href="'+window.location.hash+'"]').click();
		}	
	}
	
	$(".team:not(.portfolio) > li").on("click", function(){
		$(this).toggleClass("active");
	});
	
	$(".apbnyt").on("click", function(e){
		e.preventDefault();
		var kjo = $(this);
		kjo.animate({"height":"toggle"}, 300, function(){ $(this).remove(); });
		$(".cv_forma").animate({"height":"toggle"}, 300);
	});
	
});