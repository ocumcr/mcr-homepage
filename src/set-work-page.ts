type WorkData = {
    title: string
    author: string
    year: string
    imagePath: string
    description: string
    option?: string[]
}

type VRCData = WorkData
type OtherData = WorkData
type GameData = WorkData & {
    gamePath: string
}

type WorkDataMap = {
    "vrc": VRCData[]
    "browser-games": GameData[]
    "games": GameData[]
    "other": OtherData[]
}

type WorkDataType = keyof WorkDataMap

let workData: WorkDataMap

const createModalHtml = (type: WorkDataType, data: WorkData): string => {
    const baseHtml = `
        <h3>${data.title}</h3>
        <div class="game-description">
            <div class="modal-image-frame">
                <img src="${data.imagePath}" alt="thumbnail">
            </div>
            <div class="game-text">
                制作者: ${data.author}<br />
                制作年: ${data.year}<br />
                <br />
                ${(() => {
                    if (type === "games" || type === "browser-games") {
                        return `
                            <a href="${(data as GameData).gamePath}" target="_blank" class="download-button">
                                あそぶ!
                            </a>
                            <br /><br />
                        `
                    } else {
                        return ""
                    }
                })()}
                ${data.description}
            </div>
        </div>
    `
    return baseHtml
}

const setupModalElement = (html: string): void => {
    const modal = document.getElementById("modal")!
    modal.style.display = "flex"

    const modalContent = document.getElementById("modal-content")!
    modalContent.innerHTML = `<span class="close">&times;</span>` + html

    document.querySelector(".close")!.addEventListener("click", () => {
        modal.style.display = "none"
    })
}

const openWorkModal = (type: WorkDataType, i: number): void => {
    const data = workData[type][i]
    setupModalElement(createModalHtml(type, data))
}

const createButton = (type: WorkDataType, data: WorkData, index: number): HTMLButtonElement => {
    const className = `${data.option?.includes("big") ? "big" : ""} ${data.option?.includes("square") ? "square" : ""}`

    const button = document.createElement("button")
    button.className = `image-frame ${className}`
    button.onclick = () => openWorkModal(type, index)

    const img = document.createElement("img")
    img.src = data.imagePath
    img.alt = "thumbnail"
    button.appendChild(img)

    return button
}

const appendButtons = (type: WorkDataType, dataList: WorkData[]): void => {
    const elm = document.getElementById(type)
    if (!elm) throw new Error("そんなエレメントは無い!")

    dataList.forEach((data, index) => {
        elm.appendChild(createButton(type, data, index))
    })
}

const setModal = async (): Promise<void> => {
    workData = await (await fetch("workdata.json", { cache: "no-store" })).json()

    Object.entries(workData).forEach(([type, dataList]) => {
        appendButtons(type as WorkDataType, dataList)
    })

    const modal = document.getElementById("modal")!
    modal.style.display = "none"

    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none"
        }
    })
}
