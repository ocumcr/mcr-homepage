const pageMap = {
    "#top": "top",
    "#diary": "diary",
    "#info": "info",
    "#work": "work",
    "#member": "member",
    "#computer": "computer",
    "#link": "link",
    "#help": "help",
    "#archive": "archive",

    "#futaba-2026": "festival/futaba-2026",

    "#programming-js": "programming/js",
} as const

type Page = keyof typeof pageMap

function getValidPageId(hash: string): Page | undefined {
    const pageId = hash.split("/")[0] as Page
    return pageId in pageMap ? pageId : undefined
}

function loadPage(pageId: Page) {
    const folderName = pageMap[pageId]
    loadContent(`./pages/${folderName}/index.html`)
    closeSmartphoneMenu()
}

// スマホ用のメニューを閉じる(無理やり)
function closeSmartphoneMenu() {
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
