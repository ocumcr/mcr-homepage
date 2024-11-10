// ページごとのコンテンツを読み込み
// ページに応じて 'content1.html' や 'content2.html' に変更

const loadContent = (page) => {
    if (page == null) return

    fetch(page, { cache: "no-store" })
        .then((response) => response.text())
        .then((data) => {
            insertHTML(data)
        })
        .catch((error) => console.error("Error loading content:", error))
}

const insertHTML = (html) => {
    // コンテンツを挿入する要素を取得
    const contentContainer = document.getElementById("contentsRight")
    contentContainer.innerHTML = html

    // `<script>` タグの実行を処理
    const scripts = contentContainer.querySelectorAll("script")
    scripts.forEach((script) => {
        const newScript = document.createElement("script")
        newScript.textContent = script.textContent // スクリプトの内容をコピー
        document.body.appendChild(newScript) // スクリプトを実行するためにbodyに追加
        document.body.removeChild(newScript) // 実行後は削除
    })
}
