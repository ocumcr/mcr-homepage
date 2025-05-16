function setHTML(htmlPath, selector) {
    document.addEventListener("DOMContentLoaded", async () => {
        const html = await (await fetch(htmlPath)).text()

        document.querySelector(selector).innerHTML = html
    })
}
