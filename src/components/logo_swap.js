// src/components/logoSwap.js

document.addEventListener('DOMContentLoaded', () => {
  const img = document.getElementById('site-logo');
    console.log(img);
    console.log("LKFLSK");
    window.addEventListener('scroll', () => {
    console.log(window.scrollY);
    img.src = window.scrollY > 100
        ? '/avb_logo.svg'
        : '/avb_logo_no_name.svg';
    });
});
