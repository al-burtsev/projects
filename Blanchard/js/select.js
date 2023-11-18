
document.querySelectorAll(".header__simplebar").forEach(dropdown => {
  new SimpleBar(dropdown, {
    autoHide: false,
    scrollbarMaxSize: 25,
  });
})

const btns = document.querySelectorAll(".header__art-btn");
const dropdowns = document.querySelectorAll(".header__dropdown");
const arrows = document.querySelectorAll('.header__art-arrow')
const activeClassdropdowns = "dropdown__active";
const activeClassbtns = "btn__active";
const activeClassarrows = "arrow__active"

btns.forEach(item => {
  item.addEventListener("click", function (event) {
    event._isClick = true;
    let DropThis = this.parentElement.querySelector(".header__dropdown");
    let thisArrow = this.parentElement.querySelector('.header__art-arrow')
    dropdowns.forEach(el => {
      if (el != DropThis) {
        el.classList.remove(activeClassdropdowns)
      }
    });
    btns.forEach(el => {
      if (el != this) {
        el.classList.remove(activeClassbtns)
      }
    });
    arrows.forEach(el => {
      if (el != thisArrow) {
        el.classList.remove(activeClassarrows)
      }
    });
    DropThis.classList.toggle(activeClassdropdowns);
    this.classList.toggle(activeClassbtns);
    thisArrow.classList.toggle(activeClassarrows);
  })
})

document.body.addEventListener('click', function (event) {
  if (
    event._isClick == true ||
    event.target.classList.contains('header__art-btn') ||
    event.target.classList.contains('header__dropdown') ||
    event.target.classList.contains('header__dropdown-item') || 
    event.target.classList.contains('simplebar-content')
  )
    return
  document.querySelectorAll('.header__dropdown').forEach(btn => {
    btn.classList.remove('dropdown__active');
  })
  document.querySelectorAll('.header__art-arrow').forEach(arrow => {
    arrow.classList.remove('arrow__active');
  })
})

const selector = document.querySelector(".choices")

const choices = new Choices(selector, {
  searchEnabled: false,
  shouldSort: false,
  itemSelectText: '',
  duplicateItemsAllowed: false,
  classNames: {
    containerOuter: 'choices header_choices',
  },
  position: 'absolute',
});