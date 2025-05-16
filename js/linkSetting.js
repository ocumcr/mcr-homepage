// urlの変更が発生した時に、#topとかを見て正しいページを表示させる
const loadPage = (pageId) => {
    const pageMap = {
        "#top": "top",
        "#diary": "diary",
        "#info": "info",
        "#work": "work",
        "#member": "member",
        "#computer": "computer",
        "#link": "link",
        "#help": "help",
    }

    const folderName = pageMap[pageId]

    loadContent(`pages/${folderName}/index.html`)

    // スマホ用のメニューを閉じる(無理やり)
    document.getElementById("menu-btn").checked = false
}

window.addEventListener("popstate", (event) => {
    event.preventDefault()

    // #なんとか
    const pageId = location.hash

    if (pageId.includes("/")) return
    loadPage(pageId)
})

window.addEventListener("load", (event) => {
    event.preventDefault()

    loadPage(location.hash.split("/")[0])
})

if (location.hash == "") location.href += "#top"
