$(document).ready(function() {
	console.log("linked?");
	var shutdown;

	$(".rtp_rcmd2_title")
	$(".android-section-title").addClass('class_name');

	var handle = setInterval(styling,1000);

    function styling(){
    	console.log("working??");
        var title = $(".rtp_rcmd2_title"); 
        var content_tl = $(".rtp_rcmd2_link_hidden h4")
        if (title.length ) {
		    title.addClass('remove-title');
		    content_tl.addClass('rtp-content-title, mdl-card__title-text');
		    $(".rtp_rcmd2_link").attr('id', 'new-link').css({
		    	"background-color": "none",
		    	"font-family": "Roboto, 'Helvetica', 'Arial', sans-serif"
		    });
		    $(".rtp_rcmd2_description p").css('font-size', '12px');
		    $(".rtp_rcmd2_label_container").css('height', 'auto');
		    $("[data-rtp-widget-container]").css({
		    	'border': "1px solid #d2d2d2",
		    	'padding': '10px',
		    	'font-family': "Roboto, Helvetica, Arial, sans-serif"
		    });
		    clearInterval(handle);
		    handle = 0;
		}
		else {
			console.log("help?");
		}



        //active.removeClass('active');
        // next.addClass('active');
    }





       
});

// $(document).ready(function() {
// 	var myVar;
// 	console.log("here?");
// 	function myfunction() {
// 		myVar= setInterval(alertFunc, 3000);
// 		console.log("ehre");
// 	}

// 	function alertFunc() {
// 		console.log("hello?");
// 	}
// });
