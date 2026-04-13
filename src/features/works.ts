interface WorkData {
    title: string
    author: string
    year: string
    imagePath: string
    description: string
    option?: string[]
    gamePath?: string
}

export async function initWorkPage() {
    const response = await fetch("workdata.json", { cache: "no-store" })
    const workData = await response.json()

    Object.entries(workData).forEach(([type, dataList]) => {
        const container = document.getElementById(type)
        if (!container) return
        ;(dataList as WorkData[]).forEach((data) => {
            const btn = createWorkButton(data)
            container.appendChild(btn)
        })
    })
}

function createWorkButton(data: WorkData): HTMLButtonElement {
    const btn = document.createElement("button")
    const classNames = ["image-frame", ...(data.option ?? [])]
    btn.className = classNames.join(" ")
    btn.onclick = () => openModal(data)

    const img = document.createElement("img")
    img.src = data.imagePath
    img.alt = data.title
    btn.appendChild(img)
    return btn
}

function openModal(data: WorkData) {
    const modal = document.createElement("div")
    modal.id = "modal"
    modal.innerHTML = `
        <div id="modal-content">
            <span class="close">&times;</span>
            <h3>${data.title}</h3>
            <div class="game-description">
                <img src="${data.imagePath}">
                <div class="game-text">
                    制作者: ${data.author}<br>制作年: ${data.year}<br><br>
                    ${data.gamePath ? `<a href="${data.gamePath}" target="_blank" class="download-button">あそぶ!</a>` : ""}
                    ${data.description}
                </div>
            </div>
        </div>
    `
    modal.querySelector(".close")?.addEventListener("click", () => modal.remove())
    document.body.appendChild(modal)
}
