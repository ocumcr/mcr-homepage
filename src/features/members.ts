import { loadCsvAsObjects, getFiscalYear } from "../utils.js"

interface MemberData {
    name: string
    job?: string
    course: string
    hobby: string
    comment: string
}

export async function initMemberPage() {
    const container = document.getElementById("members")
    if (!container) return
    container.innerHTML = "" // クリア

    // 現役生の読み込み (1〜4回生)
    for (let i = 1; i <= 4; i++) {
        await renderMemberSection(i, container)
    }

    // OB/OGセクション
    const obSection = document.createElement("section")
    obSection.className = "intro-table"
    obSection.innerHTML = `<h3>OB-OG</h3><div class="students" id="student-ob-og"></div>`
    container.appendChild(obSection)

    const obContainer = document.getElementById("student-ob-og")!
    for (let i = getFiscalYear() - 4; i >= 2011; i--) {
        await renderObData(i, obContainer)
    }
}

async function renderMemberSection(grade: number, parent: HTMLElement) {
    const currentGrade1 = getFiscalYear()
    const term = currentGrade1 - grade + 1
    const members = await loadCsvAsObjects<MemberData>(`memberdata/student-${term}.csv`)

    const section = document.createElement("section")
    section.className = "intro-table"
    section.innerHTML = `<h3>${grade}回生</h3><div class="students">${createMemberCards(members)}</div>`
    parent.appendChild(section)
}

async function renderObData(term: number, container: HTMLElement) {
    const members = await loadCsvAsObjects<MemberData>(`memberdata/student-${term}.csv`)
    if (members) container.innerHTML += createMemberCards(members)
}

function createMemberCards(members: MemberData[] | null): string {
    if (!members) return ""
    return members
        .map(
            (m) => `
        <div class="row">
            <div class="row-head"><span class="name">${m.name}</span><span class="job">${m.job ?? ""}</span></div>
            <div class="row-content"><span class="course">${m.course}</span>
            <span class="detail">趣味: ${m.hobby}<br>一言: ${m.comment}</span></div>
        </div>
    `,
        )
        .join("")
}
