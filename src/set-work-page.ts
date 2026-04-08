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
    "smartphone-games": GameData[]
    "browser-games": GameData[]
    "games": GameData[]
    "other": OtherData[]
}

type WorkDataType = keyof WorkDataMap

let workData: WorkDataMap

const createModalHtml = (data: WorkData): string => {
    const button = (() => {
        if ("gamePath" in data) {
            return `
                <a href="${data.gamePath}" target="_blank" class="download-button">
                    あそぶ!
                </a>
                <br /><br />
            `
        } else {
            return ""
        }
    })()

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
                ${button}
                ${data.description}
            </div>
        </div>
    `
    return baseHtml
}

const createModalElement = (html: string) => {
    const modal = document.createElement("div")
    modal.id = "modal"

    modal.innerHTML = `
        <div id="modal-content">
            <span class="close">&times;</span>
            ${html}
        </div>
    `

    modal.querySelector(".close")!.addEventListener("click", () => {
        modal.remove()
    })

    return modal
}

const openWorkModal = (data: WorkData): void => {
    const modal = createModalElement(createModalHtml(data))
    document.body.appendChild(modal)
}

const createButton = (data: WorkData): HTMLButtonElement => {
    const className = `${data.option?.includes("big") ? "big" : ""} ${data.option?.includes("square") ? "square" : ""}`

    const button = document.createElement("button")
    button.className = `image-frame ${className}`
    button.onclick = () => openWorkModal(data)

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
        elm.appendChild(createButton(data))
    })
}

const loadData = async () => {
    workData = await (await fetch("workdata.json", { cache: "no-store" })).json()
}

const setModal = async (): Promise<void> => {
    await loadData()

    Object.entries(workData).forEach(([type, dataList]) => {
        appendButtons(type as WorkDataType, dataList)
    })
}
