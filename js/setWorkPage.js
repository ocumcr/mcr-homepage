// ゲーム専用
const openGameModal = (i) => {
    const gamedata = games[i]

    openModal(`
      <h3>${gamedata.title}</h3>
      <div class="game-description">
          <div class="imageFrame2">
              <img src="${gamedata.imagePath}" alt="${gamedata.title}">
          </div>
          <div class="game-text">
              制作者: ${gamedata.author}<br />
              制作年: ${gamedata.year}<br />
              <br />
              <a href="${gamedata.gamePath}" target="_blank" class="download-button">
              あそぶ!
              </a><br /><br />
              ${gamedata.description}
          </div>
      </div>
      `)
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

let games

// ゲームを自動追加
const setModal = async () => {
    const response = await fetch("gamedata.json", {
        cache: "no-store",
    })

    games = await response.json()

    games.forEach((gamedata, i) => {
        document.getElementById("games").innerHTML += `
          <button class="imageFrame" onclick="openGameModal(${i})">
              <img src="${gamedata.imagePath}" alt="${gamedata.title}">
          </button>
      `
    })

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
