(function($){
    
    $(function() {
        $('.lazy').Lazy();
    });
    
    function setCookie(name, value, lifetime_days) {
        var exp = new Date();
        exp.setDate(new Date().getDate() + lifetime_days);
        document.cookie = name + '=' + value + ';expires=' + exp.toUTCString() + ';path=/';
    }
    
    function getCookie(name) {
        if(document.cookie) {
            var regex = new RegExp(escape(name) + '=([^;]*)', 'gm'),
            matches = regex.exec(document.cookie);
            if(matches) {
                return matches[1];
            }
        }
    }
    
    $('.js_thumb_action').on('click',function(e){
        
        e.preventDefault(); 
        
        let execute = $(this).data('action'),
            pid = $(this).data('pid');
            btn = $(this);
        
        if(getCookie('do_'+pid)){
            alert('Голосовать можно раз в месяц!'); 
            return;  		
        }
                          
        $.ajax({
            url: theme.ajaxUrl,
            type: 'post',
            data: {
                'action': 'rate_thumbs',
                'execute': execute,
                'pid': pid
            },
            beforeSend: function(){
                btn.addClass('cursor_progress');
            },
            complete: function(){
                btn.removeClass('cursor_progress');
            },
            success: function (data) {
                setCookie('do_'+pid, true, 30);
                btn.find('span').html(data);
            }
        });                  
    });
    
    $('.mini_gallery_slider').each(function (idx, item) {
        var carouselId = "carousel" + idx;
        this.id = carouselId;
        $(this).slick({
            lazyLoad: 'ondemand',
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
            arrows: false,
        });
    });
    
    $(function() {
        setTimeout(() => $('.js_load').each(function(item){
            load = $(this).data('load');
            $(this).html(load);
        }), 1000);
    });
    
    $('.js_show_all_reviews').click(function(e){
       e.preventDefault();
       $(this).hide();
       $('.feedback_slider .item').slideDown(); 
    });
      
    $("input[name='tel']").mask(theme.mask);
    $("input[name='birthday']").mask("99-99-9999");
    
    $("a.fancybox").fancybox({
        padding: 0,
        scrolling: 'auto',
	});
	
	$('#mmenu').click(function(){
		$(this).toggleClass('open');
		$('.header .menu').toggleClass('open');
	});
	

    $(function() {
      $('.anhors a, a.anchor').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
          if (target.length) {
            $('html, body').animate({
              scrollTop: target.offset().top
            }, 1000);
            return false;
          }
        }
      });
    });

	
	// quiz
    $('#step_next').on('click', function (e) {
        e.preventDefault()
        $('#steps .step.active').removeClass('active').next().addClass('active')
        $('#step_back').parent().show();

        if ( $('#steps .step.last').hasClass('active') ) {
            $('.step_navigation').hide();
        }
                
        if ( $('#steps .step.last_test').hasClass('active') ) {
            $('.step_navigation #step_next').hide();
        }

        // запишем значения в форму
        var stepsArray = [],
            stepsArrayTest = [],
            num = 0,
            formTitle = '';
            
        $('#steps .step:not(.last):not(.last_test)').each(function () {
            num++
            stepsArray.push(num + ' ' + $(this).children().find('input:checked').val())
            stepsArrayTest.push($(this).children().find('input:checked').val())  
        })

        $('#discount textarea').val(stepsArray.join('<br>'))
    });

    $('#step_back').on('click', function (e) {
        e.preventDefault()
        $('#steps .step.active').removeClass('active').prev().addClass('active')
        
        $('.step_navigation #step_next').show();
        
        if ( $('#step_0').hasClass('active') ) {
            $('#step_back').parent().hide()
        }
    });
	
	
	$('input[type="radio"]').on('change', function(){
    	$('.wpcf7-radio .wpcf7-list-item').removeClass('active');
	    $('.wpcf7-radio input:checked').parent().parent().prev().addClass('active');
	    $('.wpcf7-radio input:checked').parent().parent().prev().prev().addClass('active');
	    $('.wpcf7-radio input:checked').parent().parent().prev().prev().prev().addClass('active');
	    $('.wpcf7-radio input:checked').parent().parent().prev().prev().prev().prev().addClass('active');
	});
	
    $('a[href="#discount"]').click(function(){
		var c = $(this).data('club'),
		    d = $(this).data('discount'),
		    m = $(this).data('mail');
		    
		$('#discount input[name="text-club"]').val(c);
		$('#discount input[name="text-discount"]').val(d);
		$('#discount input[name="email-club"]').val(m);
	});
	
	if ($(window).width() < 1025) {
		$('.feedback_slider').slick({
           slidesToShow: 1,
           slidesToScroll: 1,
           arrows: false,
           dots: true,
           adaptiveHeight: true,
        });
	}
	
})(jQuery);