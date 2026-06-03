VANTA.NET({
  el: "#bg",
  mouseControls: true,
  touchControls: true,
  color: 0x6c3cff,
  backgroundColor: 0x080818,
  points: 10,
  maxDistance: 20,
});

document.addEventListener("DOMContentLoaded", function () {
  const moveBtns = document.querySelectorAll('.two_title .move-btns button');
  if (!moveBtns || moveBtns.length < 2) return;
  const prevBtn = moveBtns[0];
  const nextBtn = moveBtns[1];
  const slider = document.querySelector('.two_box');
  if (!slider) return;
  const card = slider.querySelector('.two_card');
  const gap = parseInt(getComputedStyle(slider).gap) || 30;
  const scrollAmount = (card ? card.offsetWidth : slider.clientWidth * 0.8) + gap;

  nextBtn.addEventListener('click', function () {
    slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  });

  prevBtn.addEventListener('click', function () {
    slider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  });
});
