// urlの変更が発生した時に、#topとかを見て正しいページを表示させる
const loadPage = (pageId) => {
    loadContent(
        "pages/" +
            {
                "#top": "top.html",
                "#info": "info.html",
                "#work": "work.html",
                "#member": "member.html",
                "#computer": "computer.html",
                "#link": "link.html",
                "#help": "help.html",
            }[pageId],
    )

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
