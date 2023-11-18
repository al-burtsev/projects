
let openMenu = document.getElementById('open-menu');
let closeMenu = document.getElementById('close-menu');
let menu = document.getElementById('main-menu');
let burger = document.getElementById('burger');
let cross = document.getElementById('cross');
let enter = document.getElementById('enter');
let body = document.querySelector('.body');

let showMenu = function () {

  if (window.innerWidth <= 1200) {
    menu.classList.toggle('menu-active');
    enter.classList.toggle('menu-active');
    closeMenu.classList.toggle('menu-active');
    body.classList.toggle('no-scroll')
  };
}

let hideMenu = function () {
  menu.classList.remove('menu-active');
  enter.classList.remove('menu-active');
  closeMenu.classList.remove('menu-active');
  body.classList.remove('no-scroll')
}



openMenu.addEventListener('click', showMenu);
closeMenu.addEventListener('click', hideMenu);

let openSearch = document.getElementById('open-search');
let searchForm = document.getElementById('search-media');
let closeSearch = document.getElementById('close-search');
let searchBtn = document.querySelector('.header__search-btn')
let searchInput = document.querySelector('.header__search-input')

openSearch.addEventListener('click', () => {
  searchForm.classList.add('header__search-form_active');
  searchBtn.classList.add('active');
  searchInput.classList.add('active');
  openSearch.classList.add('hidden');
})

closeSearch.addEventListener('click', (e) => {
  searchForm.classList.remove('header__search-form_active');
  openSearch.classList.remove('hidden');
  document.querySelector('.header__search-input').value = '';
  e.preventDefault()
})


let slides = document.querySelectorAll('.gallery__slide');

slides.forEach((el) => {
  el.addEventListener('click', () => {
    modal.classList.add('modal-visible');
  });
})

slides.forEach((el) => {
  el.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      modal.classList.add('modal-visible');
    }
  });
})

let modal = document.querySelector('.gallery__modal');
let closeModal = document.querySelector('.gallery__paint-close');

closeModal.addEventListener('click', () => {
  modal.classList.toggle('modal-visible');
})

document.querySelector('.gallery__paint').addEventListener('click', (event) => {
  event._isClick = true;
});

modal.addEventListener('click', function (event) {
  if (event._isClick == true) return
  modal.classList.remove('modal-visible');
})

let artistBtn = document.querySelectorAll('.ac-text__btn');
let artistDisplay = document.querySelectorAll('.catalog__card');

artistBtn.forEach(function (el) {

  el.addEventListener('click', function (e) {
    const path = e.currentTarget.dataset.path;

    artistBtn.forEach(function (btn) {
      btn.classList.remove('ac-text__btn_active');
      e.currentTarget.classList.add('ac-text__btn_active')
    });

    artistDisplay.forEach(function (el) {
      el.classList.remove('catalog__card_active')
    });
    document.querySelector(`[data-target="${path}"]`).classList.add('catalog__card_active');
  });
});

const heroSwiper = new Swiper('.hero__swiper', {
  direction: 'horizontal',
  loop: true,
  autoplay: {
    delay: 6000,
    disableOnInteraction: false,
  },
  slidesPerView: 1,
});

const gallerySwiper = new Swiper('.gallery__swiper', {
  // Optional parameters
  direction: 'horizontal',
  pagination: {
    el: '.gallery__pagination-descr',
    type: 'fraction',
  },
  navigation: {
    nextEl: '.gallery__button-next',
    prevEl: '.gallery__button-prev',
  },
  keyboard: {
    enabled: true,
    onlyInViewport: false,
  },
  a11y: {
    prevSlideMessage: 'Перейти на предыдущий слайд',
    nextSlideMessage: 'Перейти на следующий слайд',
    slideLabelMessage: '{{index}} слайд из {{slidesLength}}',
  },

  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 20,
      slidesPerGroup: 1,
    },
    480: {
      slidesPerView: 2,
      spaceBetween: 30,
      slidesPerGroup: 2,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 38,
      slidesPerGroup: 2,
    },
    1024: {
      slidesPerView: 2,
      spaceBetween: 34,
      slidesPerGroup: 2,
    },
    1200: {
      slidesPerView: 3,
      spaceBetween: 50,
      slidesPerGroup: 3,
    }
  }

});

const eventSwiper = new Swiper('.events__swiper', {
  // Optional parameters
  direction: 'horizontal',
  pagination: {
    el: '.events__pagination',
    type: 'bullets',
    clickable: 'true',
  },
  a11y: {
    prevSlideMessage: 'Перейти на предыдущий слайд',
    nextSlideMessage: 'Перейти на следующий слайд',
    slideLabelMessage: '{{index}} слайд из {{slidesLength}}',
    paginationBulletMessage: 'Перейти к слайду {{index}}',
  },
  navigation: {
    nextEl: '.events__button-next',
  },
  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    650: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 34,
      navigation: {
        nextEl: '.swiper-button-disabled',
      },
    },
    768: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 34,
      navigation: {
        nextEl: '.swiper-button-disabled',
      },
    },
    1024: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 27,
    },
    1200: {
      slidesPerView: 3,
      slidesGroup: 3,
      spaceBetween: 50,
      navigation: {
        nextEl: '.events__button-next',
      },
      pagination: {
        enabled: false,
      },
    }
  }

});

const projectSwiper = new Swiper('.projects__swiper', {
  // Optional parameters
  direction: 'horizontal',
  a11y: {
    prevSlideMessage: 'Перейти на предыдущий слайд',
    nextSlideMessage: 'Перейти на следующий слайд',
    slideLabelMessage: '{{index}} слайд из {{slidesLength}}',
    paginationBulletMessage: 'Перейти к слайду {{index}}',
  },
  // Navigation arrows
  navigation: {
    prevEl: '.projects__button-prev',
    nextEl: '.projects__button-next',
  },
  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 1,
      spaceBetween: 20
    },
    650: {
      slidesPerView: 2,
      spaceBetween: 20
    },
    // when window width is >= 480px
    768: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 34,
    },
    // when window width is >= 640px
    1024: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 50,
    },
    1200: {
      slidesPerView: 3,
      spaceBetween: 50,
    }
  }
});

const accordion = new Accordion('.accordion-container');
accordion.open(0);

let eventsCardTitle = document.getElementById('eventsCardTitle');

function changeTitle() {
  if ((window).innerWidth < 340) {
    eventsCardTitle.innerHTML = 'Книжная гравюра в&nbsp;восприятии';
  }
};

changeTitle()

let hyphen = document.querySelectorAll('.hyphen');

hyphen.forEach(function (el) {
  if ((window).innerWidth < 340) {
    el.innerHTML = ' — ';
  }
})

function changeCardDescr() {
  if ((window).innerWidth > 450 && (window).innerWidth < 992) {
    document.querySelector('.events__card-descr_mod').innerHTML = 'Один из ведущих флорентийских художников Кватроченто, основатель художественной династии, которую продолжили его брат Давид и сын Ридольфо';
  }
};

changeCardDescr()

function changeLink() {
  if ((window).innerWidth > 767 && (window).innerWidth < 1024) {
    document.querySelector('.projects__descr-link').innerHTML = 'blanchard-art.ru';
  }
};

changeLink()

function changeBtn() {
  if ((window).innerWidth > 319 && (window).innerWidth < 450) {
    document.querySelector('.contacts__btn').innerHTML = 'Заказать';
  }
};

changeBtn()

let tooltip = document.querySelectorAll('.projects__tooltip');

tooltip.forEach(elem => {
  elem.addEventListener('click', function (e) {
    tooltip.forEach(el => {
      if (el != this) {
        el.classList.remove('projects__tooltip_active');
      }
    });
    e.currentTarget.classList.toggle('projects__tooltip_active');
  })
});

document.body.addEventListener('click', function (event) {
  if (
    event.target.classList.contains('projects__tooltip-bg') || 
    event.target.classList.contains('projects__tooltip-icon')
  )
    return
  document.querySelectorAll('.projects__tooltip').forEach(item => {
    item.classList.remove('projects__tooltip_active');
  })
});


tippy('#projectTooltip1', {
  content: 'Пример современных тенденций — современная методология разработки',
  theme: 'custom',
  maxWidth: 264,
  delay: 350,
  aria: {
    content: 'labelledby',
  },
});

tippy('#projectTooltip2', {
  content: 'Приятно, граждане, наблюдать, как сделанные на базе аналитики выводы вызывают у вас эмоции',
  theme: 'custom',
  maxWidth: 264,
  delay: 350,
  aria: {
    content: 'labelledby',
  },
});

tippy('#projectTooltip3', {
  content: 'В стремлении повысить качество',
  theme: 'custom',
  maxWidth: 242,
  delay: 350,
  aria: {
    content: 'labelledby',
  },
});
















