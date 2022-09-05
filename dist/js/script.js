'use strict';
//Hero scripts
const slideyItems = document.querySelectorAll(".slidey__item");
const btnNext = document.querySelector(".slidey__arrows--right");
const btnBack = document.querySelector(".slidey__arrows--left");

const slidey = {
  currentItem: 0,

  init: () => {
    slidey.in(slidey.currentItem);
  },

  in: (index) => {
    const slideyItem = slideyItems[index];
    const texts = slideyItem.querySelectorAll(".text-play");
    gsap.set(slideyItem, { scale: 0 });
    gsap.set(slideyItem, { left: "-100vw" });
    const timeline = gsap.timeline();

    timeline
      .to(slideyItem, 0.5, { left: 0 })
      .to(slideyItem, 0.5, { scale: 1 })
      .from(texts, 1, {
        autoAlpha: 0,
        ease: Back.easeOut,
        stagger: {
          y: 300,
          each: 0.3
        }
      });
  },

  out: (index, nextIndex) => {
    const slideyItem = slideyItems[index];
    const texts = slideyItem.querySelectorAll("p");
    const timeline = gsap.timeline();
    timeline
      .to(slideyItem, 0.5, {
        left: "100vw",
        delay: 0.5,
        scale: 0.3,
        opacity: 0
      })
      .to(texts, 1, {
        autoAlpha: 0,
        ease: Back.easeIn,
        stagger: {
          y: -300,
          each: 0.3
        }
      })
      .call(slidey.in, [nextIndex], this, "-=1.5")
      .set([texts, slideyItem], { clearProps: "all" });
  },

  next: () => {
    const next =
      slidey.currentItem !== slideyItems.length - 1
        ? slidey.currentItem + 1
        : 0;
    slidey.out(slidey.currentItem, next);
    slidey.currentItem = next;
  },

  back: () => {
    const prev =
      slidey.currentItem > 0 ? slidey.currentItem - 1 : slideyItems.length - 1;
    slidey.out(slidey.currentItem, prev);
    slidey.currentItem = prev;
  }
};

// Events
btnNext.addEventListener("click", slidey.next);
btnBack.addEventListener("click", slidey.back);
setInterval(slidey.next, 12000);


slidey.init();



//Nav menu
const menuBtn = document.querySelector('.menu-btn');
const hamburger = document.querySelector('.menu-btn__burger');
const nav = document.querySelector('.nav');
const menuNav = document.querySelector('.menu-nav');
const navItems = document.querySelectorAll('.menu-nav__item');

let showMenu = false;

menuBtn.addEventListener('click', toggleMenu);

function toggleMenu() {
  if (!showMenu) {
    hamburger.classList.add('open');
    nav.classList.add('open');
    menuNav.classList.add('open');
    navItems.forEach(function (list) {
      list.classList.add('open');
    });

    showMenu = true;
  } else {
    hamburger.classList.remove('open');
    nav.classList.remove('open');
    menuNav.classList.remove('open');
    navItems.forEach(function (list) {
      list.classList.remove('open');
    });

    showMenu = false;
  }
}




// Reviews Slider
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();


//SIGN IN / SIGNUP PASSWORD SHOW/HIDE
const pswrdField = document.querySelector(".form-group__input input[type='password']"),
  toggleBtn = document.querySelector(".form-group__input i");

toggleBtn.onclick = () => {
  if (pswrdField.type == "password") {
    pswrdField.type = "text";
    toggleBtn.classList.add("active");
  } else {
    pswrdField.type = "password";
    toggleBtn.classList.remove("active");
  }
}






