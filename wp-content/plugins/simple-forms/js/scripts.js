(function($){
    
    $('input[name="website"]').parent().hide();
        
    $('.sf_form').on('submit',function(e){
        e.preventDefault();
                            
        let form = $(this);
        let form_data = new FormData(form[0]);
                
        $.ajax({
            url: sf.ajaxUrl,
            type: 'post',
            contentType: false,
            processData: false,
            data: form_data,
            async: true,
            cache: false,
            dataType: 'json',
            beforeSend: function(){
                form.find('input[type="submit"]').addClass('sf_cursor_progress');  
            },
            complete: function(){
                form.find('input[type="submit"]').removeClass('sf_cursor_progress');
            },
            success: function (data) {
                console.log(data.response);
                alert(data.message);
                if(data.status == 'success'){
                    //form.trigger("reset");
                    window.location.reload();
                    
                }
            }
        });                  
    });
})(jQuery);