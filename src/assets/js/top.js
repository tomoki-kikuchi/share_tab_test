import $ from 'jquery';

$(() => {
  const $tab = $('.tab');

  setSnsShareLink();
  setInitialTab();

  // タブの切替を行う
  $tab.on('click', function(e) {
    e.preventDefault();
    const index = $tab.index(this);
    selectTab(index);
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

    console.log(`shareUrl::`, shareUrl);
    openPopUpWin(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`);
  });

  $('.js-snsLink-tw').on('click', function(e) {
    e.preventDefault();
    const href = $(this).attr('href');
    const shareUrl = `https://quirky-mcclintock-c77b60.netlify.com/${href}`;
    const siteTitle = 'タイトル';
    const hashTags = ['ハッシュタグ1', 'ハッシュタグ2'];

    console.log(`shareUrl::`, shareUrl);

    openPopUpWin(`http://twitter.com/share?text=${siteTitle}&url=${shareUrl}&hashtags=${hashTags.join(',')}`);
  });

  $('.js-snsLink-line').on('click', function(e) {
    e.preventDefault();
    const href = $(this).attr('href');
    const shareUrl = `https://quirky-mcclintock-c77b60.netlify.com/${href}`;

    console.log(`shareUrl::`, shareUrl);

    openPopUpWin(`https://line.me/R/msg/text/?${shareUrl}`);
  });
}

function openPopUpWin(url) {
  window.open(url, 'shareWin', 'width=600,height=400');
}

/**
 * GETパラメータを取得する
 */
function getUrlVars() {
  const vars = {};
  const params = location.search.substring(1).split('&');
  params.forEach(param => {
    let key = '';
    const value = param.slice(param.indexOf('=', 0) + 1);
    const keySearch = param.search(/=/);
    if (keySearch !== -1) {
      key = param.slice(0, keySearch);
    }
    if (key !== '') {
      vars[key] = decodeURI(value);
    }
  });
  return vars;
}

/**
 * 初期表示のタブの設定を行う
 */
function setInitialTab() {
  const params = getUrlVars();
  const tabIndex = params['tab'] ? params['tab'] : 0;
  console.log(`param:`, params);
  console.log(`tabIndex:`, tabIndex);
  selectTab(tabIndex);
}

/**
 * タブの切替を行う
 * @param index
 */
function selectTab(index) {
  const $tab = $('.tab');
  const $tabContent = $('.tabContent');
  $tab.removeClass('selected');
  $tab.eq(index).addClass('selected');

  $tabContent.hide();
  $tabContent.eq(index).show();
}
