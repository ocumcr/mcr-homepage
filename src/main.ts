import { resolvePage, showPage, navigate, registerPageInit, pageMap } from "./router.js"
import { initWorkPage } from "./features/works.js"
import { initMemberPage } from "./features/members.js"
import { fetchHTML, insertHTML } from "./utils.js"

// 各ページ固有の初期化処理を登録
registerPageInit("work", initWorkPage)
registerPageInit("member", initMemberPage)
// registerPageInit("top", initSlideshow); // スライドショーも同様に

window.addEventListener("popstate", () => {
    showPage(resolvePage())
})

window.addEventListener("load", () => {
    const page = resolvePage()
    history.replaceState(null, "", `?page=${page}`)
    showPage(page)
})

// リンクの横取り (SPA挙動)
document.addEventListener("click", (e) => {
    const target = (e.target as Element).closest("a")
    if (!target) return

    const href = target.getAttribute("href")
    if (!href || !href.startsWith("?page=")) return

    const params = new URLSearchParams(href.slice(1))
    const page = params.get("page")

    if (page && page in pageMap) {
        e.preventDefault()
        navigate(page as any)
    }
})

document.addEventListener("DOMContentLoaded", async () => {
    console.log("iiiiii")
    insertHTML("header", await fetchHTML("../../html-component/smartphone-menu.html"))
    insertHTML("#content-left", await fetchHTML("../../html-component/menu.html"))
})
