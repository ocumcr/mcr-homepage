// urlを受け取ってcsvファイルをobjectにする
const loadCsvAsObjects = async (url) => {
    const response = await fetch(url, {
        cache: "no-store",
    })

    const csvText = await response.text()

    const lines = csvText.split("\n")
    const headers = lines[0].split(",") // 1行目をラベルとして取得
    const objects = []

    for (let i = 1; i < lines.length; i++) {
        const data = lines[i].split(",")
        if (data.length === headers.length) {
            // 空行を無視
            const obj = {}
            headers.forEach((header, index) => {
                obj[header.trim()] = data[index].trim() // キーと値を設定
            })
            objects.push(obj)
        }
    }

    return objects
}

// 注意を払う
const safeLoadCsvAsObjects = async (url) => {
    if (typeof url !== "string") {
        console.error("url must be stringにゃ!")
        return
    }

    if (url == "") {
        console.error("urlを入力するにゃ!")
        return
    }

    try {
        return loadCsvAsObjects(url)
    } catch (error) {
        console.error(error)
    }
}
