//Meny
// https://codepen.io/sutterlity/pen/OJojvW

const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const links = document.querySelectorAll(".nav-links li");

hamburger.addEventListener("click", () => {
  //Animate Links
  navLinks.classList.toggle("open");
  links.forEach((link) => {
    link.classList.toggle("fade");
  });

  //Hamburger Animation
  hamburger.classList.toggle("toggle");
});

// card animaation
const animatedEls = document.querySelectorAll("[data-animation]");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const animation = entry.target.getAttribute("data-animation");

    if (entry.isIntersecting) {
      entry.target.classList.add("animated", `${animation}`);
      observer.unobserve(entry.target); // Stop observing the element
    }
  });
});

animatedEls.forEach((el) => observer.observe(el));

// prenumerera knappen
document
  .getElementById("subscribeButton")
  .addEventListener("click", function () {
    alert("Du har nu prenumererat på vår lunchmeny & nyhetsbrev!");
  });

// event-slider

/* --------------------
Vars
-------------------- */
const $menu = document.querySelector(".menu");
const $items = document.querySelectorAll(".menu--item");
let itemWidth = $items[0].clientWidth;
let wrapWidth = $items.length * itemWidth;

let scrollY = 0;
let y = 0;

/* --------------------
Lerp
-------------------- */
const lerp = (v0, v1, t) => {
  return v0 * (1 - t) + v1 * t;
};

const Ja = (t, e) => {
  return t || t === 0 ? e(t) : e;
};
const wrap = (e, t, r) => {
  const i = t - e;
  return Ja(r, function (t) {
    return ((i + ((t - e) % i)) % i) + e;
  });
};
/* --------------------
Dispose
-------------------- */
const dispose = (scroll) => {
  $items.forEach((el, i) => {
    const x = `${i * itemWidth + scroll}`;
    const s = wrap(-itemWidth, wrapWidth - itemWidth, parseInt(x));
    el.style.transform = `translate(${s}px, 0px)`;
  });
};
dispose(0);

/* --------------------
Touch
-------------------- */
let touchStart = 0;
let touchX = 0;
let isDragging = false;
const handleTouchStart = (e) => {
  touchStart = e.clientX || e.touches[0].clientX;
  isDragging = true;
};
const handleTouchMove = (e) => {
  if (!isDragging) return;
  touchX = e.clientX || e.touches[0].clientX;
  scrollY += (touchX - touchStart) * 2.5;
  touchStart = touchX;
};
const handleTouchEnd = () => {
  isDragging = false;
};

/* --------------------
Listeners
-------------------- */

$menu.addEventListener("touchstart", handleTouchStart);
$menu.addEventListener("touchmove", handleTouchMove);
$menu.addEventListener("touchend", handleTouchEnd);

$menu.addEventListener("mousedown", handleTouchStart);
$menu.addEventListener("mousemove", handleTouchMove);
$menu.addEventListener("mouseleave", handleTouchEnd);
$menu.addEventListener("mouseup", handleTouchEnd);

$menu.addEventListener("selectstart", () => {
  return false;
});

/* --------------------
Resize
-------------------- */
window.addEventListener("resize", () => {
  itemWidth = $items[0].clientWidth;
  wrapWidth = $items.length * itemWidth;
});

/* --------------------
Render
-------------------- */
const render = () => {
  requestAnimationFrame(render);
  y = lerp(y, scrollY, 0.1);
  dispose(y);
};
render();
