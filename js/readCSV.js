// urlを受け取ってcsvファイルをobjectにする（関数型っぽく）
const loadCsvAsObjects = async (url) => {
    const response = await fetch(url, { cache: "no-store" })
    const csvText = await response.text()

    // CSV形式の簡易チェック: 最低1行のヘッダーと1つ以上のカンマが必要
    if (!csvText.includes("\n") || !csvText.includes(",")) {
        throw new Error("CSV形式ではありません")
    }

    const [headerLine, ...dataLines] = csvText.split("\n").filter((line) => line.trim() !== "")
    const headers = headerLine.split(",").map((h) => h.trim())

    return dataLines
        .map((line) => line.split(",").map((cell) => cell.trim()))
        .filter((data) => data.length === headers.length)
        .map((data) => headers.reduce((obj, header, idx) => ({ ...obj, [header]: data[idx] }), {}))
}

// 注意を払う
const safeLoadCsvAsObjects = async (url) => {
    if (typeof url !== "string") {
        console.error("url must be stringにゃ!")
        return null
    }

    if (url == "") {
        console.error("urlを入力するにゃ!")
        return null
    }

    try {
        const csv = await loadCsvAsObjects(url)
        return csv
    } catch (error) {
        console.error(error)
        return null
    }
}
