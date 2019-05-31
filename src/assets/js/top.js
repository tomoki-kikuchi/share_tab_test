import $ from 'jquery';

$(() => {
  const $tabContent = $('.tabContent');
  const $tab = $('.tab');

  $tabContent.hide();
  $tabContent.eq(0).show();

  $tab.on('click', function(e) {
    e.preventDefault();
    const index = $tab.index(this);
    $tab.removeClass('selected');
    $tab.eq(index).addClass('selected');

    $tabContent.hide();
    $tabContent.eq(index).show();
  });
});
