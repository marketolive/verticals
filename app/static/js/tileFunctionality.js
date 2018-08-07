jQuery(document).ready(function () {
  var attributeToGet = 'data-section-val';

    // Show and hide rows of tiles based on icon click
  $('.icon-click-to-change').on('click', function (event) {
    if(!$(event.target).hasClass('active')) {
      var rowToShowVal = $(event.target).attr('value');
      var rowToHide = $('.row:visible').attr('data-section-val');

      $('.icon-click-to-change.active').removeClass('active');
      $(event.target).addClass('active');
      $('[data-section-val=' + '"' + rowToHide + '"' +']').hide();
      $('[data-section-val=' + '"' + rowToShowVal + '"' +']').show();
    }
  });
});
