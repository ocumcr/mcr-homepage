/**
 * 画像スライドショーを表示するためのもの
 */

let slideIndex = 1

function changeSlide(n) {
    showSlides((slideIndex += n))
}

function currentSlide(n) {
    showSlides((slideIndex = n))
}

function showSlides(n) {
    if (location.hash !== "#top") return

    const slides = document.getElementsByClassName("slide")
    const dots = document.getElementsByClassName("dot")

    if (n > slides.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none"
        dots[i].className = dots[i].className.replace(" active", "")
    }

    slides[slideIndex - 1].style.display = "block"
    dots[slideIndex - 1].className += " active"
}

let id = setInterval(() => {
    changeSlide(1)
}, 6000)
