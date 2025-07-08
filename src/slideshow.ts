/**
 * 画像スライドショーを表示するためのもの（関数型っぽく）
 */

const getSlides = (): HTMLElement[] => Array.from(document.getElementsByClassName("slide")) as HTMLElement[]

const getDots = (): HTMLElement[] => Array.from(document.getElementsByClassName("dot")) as HTMLElement[]

const clampIndex = (n: number, length: number): number => (n > length ? 1 : n < 1 ? length : n)

const renderSlides = (slides: HTMLElement[], dots: HTMLElement[], activeIndex: number): void => {
    slides.forEach((slide, i) => {
        slide.style.display = i === activeIndex - 1 ? "block" : "none"
    })
    dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === activeIndex - 1)
    })
}

type SlideState = {
    slideIndex: number
    timeoutId: number | null
}

const showSlides = (n: number, prevTimeoutId: number | null): SlideState => {
    if (location.hash !== "#top") return { slideIndex: n, timeoutId: prevTimeoutId }

    const slides = getSlides()
    const dots = getDots()
    const slideIndex = clampIndex(n, slides.length)

    renderSlides(slides, dots, slideIndex)

    if (prevTimeoutId) clearTimeout(prevTimeoutId)
    const timeoutId = window.setTimeout(() => {
        state = showSlides(slideIndex + 1, timeoutId)
    }, 6000)

    return { slideIndex, timeoutId }
}

// イベントハンドラ
let state: SlideState = { slideIndex: 1, timeoutId: null }

const changeSlide = (n: number): void => {
    state = showSlides(state.slideIndex + n, state.timeoutId)
}

const currentSlide = (n: number): void => {
    state = showSlides(n, state.timeoutId)
}

// 初期表示
state = showSlides(state.slideIndex, state.timeoutId)
