$(document).ready(function() {
	// the setInterval is a JavaScript function that will call 'styling' every 10 seconds
	var handle = setInterval(styling,1000);

    function styling(){
    	
        var title = $(".rtp_rcmd2_title"); 
        var content_tl = $(".rtp_rcmd2_link_hidden h4")
        if (title.length ) {
		    title.addClass('remove-title');
		    content_tl.addClass('rtp-content-title, mdl-card__title-text');
		    $(".rtp_rcmd2_link_container").css({
		    	'height': '40px',
		    	'overflow': 'inherit'
		    });
		    $(".rtp_rcmd2_link").attr('id', 'new-link');
		    $(".rtp_rcmd2_description p").css('font-size', '12px');
		    $(".rtp_rcmd2_label_container").css('height', 'auto');
		    $("[data-rtp-widget-container]").css({
		    	'border': "1px solid #d2d2d2",
		    	'padding': '10px',
		    	'font-family': "Roboto, Helvetica, Arial, sans-serif"
		    });

		    $(".rtp_rcmd2_item_inner").hover(function() {
		    	/* Stuff to do when the mouse enters the element */
		    	
		    }, function() {
		    	/* Stuff to do when the mouse leaves the element */
		    });
		    console.log("RCE Custom Styling Complete");
		    clearInterval(handle);
		    handle = 0;
		}
		else {
			// console.log("help?");
		}
    }
});
