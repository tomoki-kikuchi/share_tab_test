import Swiper from 'swiper';
import $ from 'jquery';

$(() => {
  const swiper = setupSwiper();

  $('.js-pickupModal').on('click', event => {
    const modalIndex = $(event.currentTarget).attr('data-modal-index');
    const SLIDE_SPEED = 0;

    $('#pickupModal')
      .fadeIn()
      .css('display', 'flex');
    swiper.update();
    swiper.slideTo(modalIndex, SLIDE_SPEED);
  });

  $('.js-pickupModalClose').on('click', () => {
    $('#pickupModal').fadeOut();
  });

  shuffleThumbnail();

  // setupThumbnail();
});

function shuffleArray(array) {
  for (let i = array.length - 1; i >= 0; i--) {
    const rand = Math.floor(Math.random() * (i + 1));
    [array[i], array[rand]] = [array[rand], array[i]];
  }
  return array;
}

function shuffleThumbnail() {
  const $list = $('.thumbnailList .thumbnail');
  const random = [];
  $list.each(i => {
    random.push(i);
  });
  shuffleArray(random);
  $list.css({ opacity: 0 }).each((index, element) => {
    $(element)
      .delay(random[index] * 150)
      .animate({ opacity: 1 });
  });
}

/**
 * Swiperの初期設定を行う
 * @returns {Swiper}
 */
function setupSwiper() {
  return new Swiper('.swiper-container', {
    // pagination: {
    //   el: '.swiper-pagination',
    // },
    autoplay: false,
    loop: true,
  });
}
