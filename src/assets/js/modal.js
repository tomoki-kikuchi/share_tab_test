import Swiper from 'swiper';
import $ from 'jquery';
import { getJsonData } from './modules/utility';

const PICKUP_DATA_PATH = '/assets/json/pickup.json';
let pickupData = [];

$(() => {
  const swiper = setupSwiper();

  let changePanelIndex = 0;
  let nextShowPanelIndex = 8;

  setupThumbnail().then(() => {
    $('.js-pickupModalClose').on('click', () => {
      $('#pickupModal').fadeOut();
    });

    $(document).on('click', '.js-pickupModal', event => {
      const modalIndex = $(event.currentTarget).attr('data-modal-index');
      const SLIDE_SPEED = 0;
      $('#pickupModal')
        .fadeIn()
        .css('display', 'flex');
      swiper.update();
      swiper.slideTo(modalIndex, SLIDE_SPEED);
    });

    setInterval(() => {
      $('.thumbnail')
        .eq(changePanelIndex)
        .find('.js-pickupModal')
        .replaceWith(
          `
          <a href="#" class="js-pickupModal fadeIn" data-modal-index="${pickupData[nextShowPanelIndex].id}">
            <img src="${pickupData[nextShowPanelIndex].thum_image}" alt="">
          </a>
        `
        );
      if (changePanelIndex === 7) {
        changePanelIndex = 0;
      } else {
        changePanelIndex++;
      }
      if (nextShowPanelIndex === pickupData.length - 1) {
        nextShowPanelIndex = 0;
      } else {
        nextShowPanelIndex++;
      }
    }, 3000);
  });
});

function setupThumbnail() {
  return new Promise((resolve, reject) => {
    getJsonData(PICKUP_DATA_PATH).then(data => {
      // pickupData = shuffleArray(data);
      pickupData = data;
      let thumbnailTag = '<ul class="thumbnailList">';
      pickupData.forEach((item, index) => {
        if (index > 7) {
          return;
        }
        thumbnailTag += `
        <li class="thumbnail"><a href="#" class="js-pickupModal" data-modal-index="${item.id}"><img src="${item.thum_image}" alt=""></a></li>
      `;
      });
      thumbnailTag += '</ul>';
      $('#pickup').append(thumbnailTag);
      setTimeout(() => {
        shuffleThumbnail();
        resolve();
      }, 100);
    });
  });
}

function shuffleArray(array) {
  let length = array.length;
  let temp, i;
  while (length) {
    i = Math.floor(Math.random() * length--);
    temp = array[length];
    array[length] = array[i];
    array[i] = temp;
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
