$(document).ready(function() {
	// the setInterval is a JavaScript function that will call 'styling' every 10 seconds
	var handle = setInterval(styling,1000);

    function styling(){
    	
        var title = $(".rtp_rcmd2_title"); 
        var content_tl = $(".rtp_rcmd2_link_hidden h4")
        if (title.length) {
		    title.css('display', 'none');
		    $('.RTP_RCMD2[data-rtp-id]').css('max-width', '831px');
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

		    $(".rtp_rcmd2_content_container").hover(function() {
		    	$(".rtp_rcmd2_content_container").css('background-color', '#5A54A4');
		    	
		    }, function() {
		    	$(".rtp_rcmd2_content_container").css('background-color', '#E2E2E2');
		    });
		    clearInterval(handle);
		    handle = 0;
		}
		else {
			console.log("RCE Content Not Loading");
		}
    }

    // $.ajax({
    // 	url: 'https://sjrtp3.marketo.com/gw1/rtp/api/v1_2/rcmd/richmedia/trending.json?session_id=mktodemolivemaster&visitor_id=mktodemolivemaster&account_id=mktodemolivemaster&template_id=template1&visit_count=1&view_count=1&categories=Demo',
    // 	type: 'GET',
    // 	dataType: 'json'    	
    // })
    // .done(function(data) {
    // 	console.log("success");
    // 	console.log(data);
    // })
    // .fail(function() {
    // 	console.log("error");
    // })
    // .always(function() {
    // 	console.log("Fetching RCE Content");
    // });
    
});

// RCE Content 
// rtp('set', 'rcmd', 'richmedia','template1',
// {
//   "rcmd.general.font.family" : "Roboto, Helvetica, Arial, sans-serif",
//   "rcmd.title.text" : "RECOMMENDED CONTENT",
//   "rcmd.cta.text" : "Read More",
//   "rcmd.title.background.color" : "#4285F4",
//   "rcmd.title.font.color" : "white",
//   "rcmd.content.background.color" :"#E2E2E2",
//   "rcmd.cta.background.color" : "#737373",
//   "category": ["Financial Services"]
// }
// );
// rtp('get','rcmd', 'richmedia');
