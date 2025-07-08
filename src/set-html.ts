function setHTML(htmlPath: string, selector: string) {
    document.addEventListener("DOMContentLoaded", async () => {
        const html = await (await fetch(htmlPath)).text()

        const elm = document.querySelector(selector)

        if (!elm) throw new Error("そんなエレメントは無い!")

        elm.innerHTML = html
    })
}
