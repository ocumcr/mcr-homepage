const pageMap = {
    "top": "top",
    "diary": "diary",
    "info": "info",
    "work": "work",
    "member": "member",
    "computer": "computer",
    "link": "link",
    "help": "help",
    "archive": "archive",

    "futaba-2026": "festival/futaba-2026",
    "programming-js": "programming/js",
} as const

type Page = keyof typeof pageMap

// #top〜#archive の旧ハッシュURLとの後方互換マップ
const legacyHashMap: Partial<Record<string, Page>> = {
    "#top": "top",
    "#diary": "diary",
    "#info": "info",
    "#work": "work",
    "#member": "member",
    "#computer": "computer",
    "#link": "link",
    "#help": "help",
    "#archive": "archive",
}

function resolvePage(): Page {
    const query = new URLSearchParams(location.search).get("page")
    if (query && query in pageMap) return query as Page

    const hash = location.hash.split("/")[0]
    return legacyHashMap[hash] ?? "top"
}

function showPage(page: Page) {
    loadContent(`./pages/${pageMap[page]}/index.html`)
    closeSmartphoneMenu()
}

function navigate(page: Page) {
    history.pushState({ page }, "", `?page=${page}`)
    showPage(page)
}

function closeSmartphoneMenu() {
    const hamburger = document.getElementById("menu-btn") as HTMLInputElement | null
    if (hamburger) hamburger.checked = false
}

window.addEventListener("popstate", (e) => {
    e.preventDefault()
    showPage(resolvePage())
})

window.addEventListener("load", (e) => {
    e.preventDefault()
    const page = resolvePage()
    history.replaceState(null, "", `?page=${page}`)
    showPage(page)
})

// ページ内の ?page= リンクをすべて横取りする
document.addEventListener("click", (e) => {
    const target = (e.target as Element).closest("a")
    if (!target) return

    const href = target.getAttribute("href")
    if (!href) return

    const params = new URLSearchParams(href.startsWith("?") ? href.slice(1) : "")
    const page = params.get("page")
    if (!page || !(page in pageMap)) return

    e.preventDefault()
    navigate(page as Page)
})
