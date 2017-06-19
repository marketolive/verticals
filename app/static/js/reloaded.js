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
		    
		    content_tl.addClass('rtp-content-title, mdl-card__title-text')
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
