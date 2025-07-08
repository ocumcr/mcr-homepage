// ページごとのコンテンツを読み込み
// ページに応じて 'content1.html' や 'content2.html' に変更

const loadContent = (pagePath: string) => {
    if (!pagePath) return

    fetch(pagePath, { cache: "no-store" })
        .then((response) => response.text())
        .then((data) => {
            insertHTML(data)
        })
        .catch((error) => console.error("Error loading content:", error))
}

const insertHTML = (html: string) => {
    // コンテンツを挿入する要素を取得
    const contentContainer = document.getElementById("content-right")!
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
