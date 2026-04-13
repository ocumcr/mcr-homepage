import { fetchHTML, insertHTML } from "./utils.js"

export const pageMap = {
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

export type Page = keyof typeof pageMap

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

// ページ切り替え後の初期化コールバックの登録用
const pageInitializers: Partial<Record<Page, () => void>> = {}

export function registerPageInit(page: Page, initFn: () => void) {
    pageInitializers[page] = initFn
}

export function resolvePage(): Page {
    const query = new URLSearchParams(location.search).get("page")
    if (query && query in pageMap) return query as Page

    const hash = location.hash.split("/")[0]
    return legacyHashMap[hash] ?? "top"
}

export async function showPage(page: Page) {
    const path = `./pages/${pageMap[page]}/index.html`
    const html = await fetchHTML(path)
    insertHTML("#content-right", html)
    closeSmartphoneMenu()

    // 登録された初期化処理があれば実行
    if (pageInitializers[page]) {
        pageInitializers[page]!()
    }
}

export function navigate(page: Page) {
    history.pushState({ page }, "", `?page=${page}`)
    showPage(page)
}

function closeSmartphoneMenu() {
    const hamburger = document.getElementById("menu-btn") as HTMLInputElement | null
    if (hamburger) hamburger.checked = false
}
