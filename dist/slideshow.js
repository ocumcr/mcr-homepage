"use strict";
/**
 * 画像スライドショーを表示するためのもの（関数型っぽく）
 */
const getSlides = () => Array.from(document.getElementsByClassName("slide"));
const getDots = () => Array.from(document.getElementsByClassName("dot"));
const clampIndex = (n, length) => (n > length ? 1 : n < 1 ? length : n);
const renderSlides = (slides, dots, activeIndex) => {
    slides.forEach((slide, i) => {
        slide.style.display = i === activeIndex - 1 ? "block" : "none";
    });
    dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === activeIndex - 1);
    });
};
const showSlides = (n, prevTimeoutId) => {
    if (location.hash !== "#top")
        return { slideIndex: n, timeoutId: prevTimeoutId };
    const slides = getSlides();
    const dots = getDots();
    const slideIndex = clampIndex(n, slides.length);
    renderSlides(slides, dots, slideIndex);
    if (prevTimeoutId)
        clearTimeout(prevTimeoutId);
    const timeoutId = window.setTimeout(() => {
        state = showSlides(slideIndex + 1, timeoutId);
    }, 6000);
    return { slideIndex, timeoutId };
};
// イベントハンドラ
let state = { slideIndex: 1, timeoutId: null };
const changeSlide = (n) => {
    state = showSlides(state.slideIndex + n, state.timeoutId);
};
const currentSlide = (n) => {
    state = showSlides(n, state.timeoutId);
};
// 初期表示
state = showSlides(state.slideIndex, state.timeoutId);
