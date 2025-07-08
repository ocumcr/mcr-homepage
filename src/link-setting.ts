const pages = ["#top", "#diary", "#info", "#work", "#member", "#computer", "#link", "#help"] as const

type Page = (typeof pages)[number]

const pageMap: Record<Page, string> = {
    "#top": "top",
    "#diary": "diary",
    "#info": "info",
    "#work": "work",
    "#member": "member",
    "#computer": "computer",
    "#link": "link",
    "#help": "help",
}

function getValidPageId(hash: string): Page | null {
    const pageId = hash.split("/")[0] as Page
    return pages.includes(pageId) && !pageId.includes("/") ? pageId : null
}

function loadPage(pageId: Page) {
    const folderName = pageMap[pageId]
    loadContent(`./pages/${folderName}/index.html`)

    // スマホ用のメニューを閉じる(無理やり)
    const hamburger = document.getElementById("menu-btn") as HTMLInputElement | null
    if (hamburger) hamburger.checked = false
}

window.addEventListener("popstate", (event) => {
    event.preventDefault()
    const pageId = getValidPageId(location.hash)
    if (pageId) loadPage(pageId)
})

window.addEventListener("load", (event) => {
    event.preventDefault()
    const pageId = getValidPageId(location.hash) ?? "#top"
    loadPage(pageId)
})

document.addEventListener("DOMContentLoaded", () => {
    if (!location.hash) location.hash = "#top"
})
