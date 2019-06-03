import $ from 'jquery';

$(() => {
  const $tabContent = $('.tabContent');
  const $tab = $('.tab');

  $tabContent.hide();
  $tabContent.eq(0).show();

  setSnsShareLink();

  $tab.on('click', function(e) {
    e.preventDefault();
    const index = $tab.index(this);
    $tab.removeClass('selected');
    $tab.eq(index).addClass('selected');

    $tabContent.hide();
    $tabContent.eq(index).show();
  });
});

/**
 * SNSのシェアURLのリンクを設定する
 */
function setSnsShareLink() {
  $('.js-snsLink-fb').on('click', function(e) {
    e.preventDefault();
    const href = $(this).attr('href');
    const shareUrl = `https://quirky-mcclintock-c77b60.netlify.com/${href}`;

    console.log(shareUrl);
    openPopUpWin(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`);
  });

  $('.js-snsLink-tw').on('click', function(e) {
    e.preventDefault();
    const href = $(this).attr('href');
    const shareUrl = `https://quirky-mcclintock-c77b60.netlify.com/${href}`;
    const siteTitle = 'タイトル';
    const hashTags = ['ハッシュタグ1', 'ハッシュタグ2'];

    console.log(shareUrl);

    openPopUpWin(`http://twitter.com/share?text=${siteTitle}&url=${shareUrl}&hashtags=${hashTags.join(',')}`);
  });
}

function openPopUpWin(url) {
  window.open(url, 'shareWin', 'width=600,height=400');
}
