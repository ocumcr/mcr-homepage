// urlの変更が発生した時に、#topとかを見て正しいページを表示させる
const loadPage = (event) => {
    event.preventDefault()

    // #なんとか
    const pageId = location.hash

    if (pageId.includes("/")) return

    loadContent(
        "pages/" +
            {
                "#top": "top.html",
                "#info": "info.html",
                "#work": "work.html",
                "#member": "member.html",
                "#computer": "computer.html",
                "#link": "link.html",
            }[pageId],
    )
}

window.addEventListener("popstate", loadPage)
window.addEventListener("load", loadPage)
