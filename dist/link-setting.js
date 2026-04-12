"use strict";
const pageMap = {
    "#top": "top",
    "#diary": "diary",
    "#info": "info",
    "#work": "work",
    "#member": "member",
    "#computer": "computer",
    "#link": "link",
    "#help": "help",
    "#archive": "archive",
    "#futaba-2026": "festival/futaba-2026",
    "#programming-js": "programming/js",
};
function getValidPageId(hash) {
    const pageId = hash.split("/")[0];
    return pageId in pageMap ? pageId : undefined;
}
function loadPage(pageId) {
    const folderName = pageMap[pageId];
    loadContent(`./pages/${folderName}/index.html`);
    closeSmartphoneMenu();
}
// スマホ用のメニューを閉じる(無理やり)
function closeSmartphoneMenu() {
    const hamburger = document.getElementById("menu-btn");
    if (hamburger)
        hamburger.checked = false;
}
window.addEventListener("popstate", (event) => {
    event.preventDefault();
    const pageId = getValidPageId(location.hash);
    if (pageId)
        loadPage(pageId);
});
window.addEventListener("load", (event) => {
    event.preventDefault();
    const pageId = getValidPageId(location.hash) ?? "#top";
    loadPage(pageId);
});
document.addEventListener("DOMContentLoaded", () => {
    if (!location.hash)
        location.hash = "#top";
});
