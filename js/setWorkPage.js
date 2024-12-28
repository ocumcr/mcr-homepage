// ゲーム専用
const openWorkModal = (type, i) => {
    const data = workData[type.id][i]

    if (type.id == "games") {
        openModal(`
            <h3>${data.title}</h3>
            <div class="game-description">
                <div class="modal-image-frame">
                    <img src="${data.imagePath}" alt="thumbnail">
                </div>
                <div class="game-text">
                    制作者: ${data.author}<br />
                    制作年: ${data.year}<br />
                    <br />
                    <a href="${data.gamePath}" target="_blank" class="download-button">
                    あそぶ!
                    </a>
                    <br /><br />
                    ${data.description}
                </div>
            </div>
        `)
    } else {
        openModal(`
            <h3>${data.title}</h3>
            <div class="game-description">
                <div class="modal-image-frame">
                    <img src="${data.imagePath}" alt="thumbnail">
                </div>
                <div class="game-text">
                    制作者: ${data.author}<br />
                    制作年: ${data.year}<br />
                    <br />
                    ${data.description}
                </div>
            </div>
        `)
    }
}

// モーダルウィンドウを開く
const openModal = (html) => {
    const modal = document.getElementById("modal")
    const modalContent = document.getElementById("modal-content")

    modalContent.innerHTML =
        `
            <span class="close">&times;</span>
        ` + html

    modal.style.display = "flex" // モーダルを表示

    const closeModalBtn = document.querySelector(".close")
    // モーダルを閉じる
    closeModalBtn.addEventListener("click", () => {
        modal.style.display = "none" // モーダルを非表示
    })
}

let workData

// ゲームを自動追加
const setModal = async () => {
    const response = await fetch("workdata.json", {
        cache: "no-store",
    })

    workData = await response.json()

    for (const type in workData) {
        workData[type].forEach((data, index) => {
            document.getElementById(type).innerHTML += `
            <button class="image-frame" onclick="openWorkModal(${type}, ${index})" style="${
                data.option?.includes("square") ? "aspect-ratio: 1" : ""
            }">
                <img src="${data.imagePath}" alt="thumbnail">
            </button>
          `
        })
    }

    const modal = document.getElementById("modal")
    modal.style.display = "none"

    // モーダルの外側をクリックしても閉じる
    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none"
        }
    })
}

// #idの中身をmodalで表示する
const openSpecialModal = (id) => {
    const html = document.getElementById(id).innerHTML
    openModal(html)
}
