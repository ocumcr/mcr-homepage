"use strict";
let workData;
const createModalHtml = (type, data) => {
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
                ${type === "games" && "gamePath" in data
        ? `
                    <a href="${data.gamePath}" target="_blank" class="download-button">
                        あそぶ!
                    </a>
                    <br /><br />
                `
        : ""}
                ${data.description}
            </div>
        </div>
    `;
    return baseHtml;
};
const openModal = (html) => {
    const modal = document.getElementById("modal");
    const modalContent = document.getElementById("modal-content");
    modalContent.innerHTML = `<span class="close">&times;</span>` + html;
    modal.style.display = "flex";
    document.querySelector(".close").addEventListener("click", () => {
        modal.style.display = "none";
    });
};
const openWorkModal = (type, i) => {
    const data = workData[type][i];
    openModal(createModalHtml(type, data));
};
const createButton = (type, data, index) => {
    const className = `${data.option?.includes("big") ? "big" : ""} ${data.option?.includes("square") ? "square" : ""}`;
    const button = document.createElement("button");
    button.className = `image-frame ${className}`;
    button.onclick = () => openWorkModal(type, index);
    const img = document.createElement("img");
    img.src = data.imagePath;
    img.alt = "thumbnail";
    button.appendChild(img);
    return button;
};
const appendButtons = (type, dataList) => {
    const elm = document.getElementById(type);
    if (!elm)
        throw new Error("そんなエレメントは無い!");
    dataList.forEach((data, index) => {
        elm.appendChild(createButton(type, data, index));
    });
};
const setModal = async () => {
    const response = await fetch("workdata.json", { cache: "no-store" });
    workData = await response.json();
    Object.entries(workData).forEach(([type, dataList]) => {
        appendButtons(type, dataList);
    });
    const modal = document.getElementById("modal");
    modal.style.display = "none";
    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
};
