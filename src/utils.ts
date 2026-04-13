export const getFiscalYear = (): number => {
    const today = new Date()
    const month = today.getMonth() + 1
    return month >= 4 ? today.getFullYear() : today.getFullYear() - 1
}

export const insertHTML = (containerSelector: string, html: string) => {
    const container = document.querySelector(containerSelector)
    if (!container) throw new Error(`そんなエレメントは無い！${containerSelector}`)

    container.innerHTML = html

    // スクリプトの再実行処理
    const scripts = container.querySelectorAll("script")
    scripts.forEach((script) => {
        const newScript = document.createElement("script")
        if (script.src) {
            newScript.src = script.src
        } else {
            newScript.textContent = script.textContent
        }
        document.body.appendChild(newScript)
        document.body.removeChild(newScript)
    })
}

export const fetchHTML = async (path: string): Promise<string> => {
    const response = await fetch(path, { cache: "no-store" })
    return await response.text()
}

export async function loadCsvAsObjects<T>(url: string): Promise<T[] | null> {
    try {
        const response = await fetch(url, { cache: "no-store" })
        const csvText = await response.text()

        if (!csvText.includes(",") || csvText.trim() === "") return null

        const [headerLine, ...dataLines] = csvText.split("\n").filter((l) => l.trim() !== "")
        const headers = headerLine.split(",").map((h) => h.trim())

        return dataLines.map((line) => {
            const data = line.split(",").map((cell) => cell.trim())
            return headers.reduce((obj, header, idx) => ({ ...obj, [header]: data[idx] }), {} as T)
        })
    } catch (error) {
        console.error("CSV Load Error:", error)
        return null
    }
}
