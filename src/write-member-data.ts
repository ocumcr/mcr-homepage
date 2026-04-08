// 各学年のデータを書き込む
const writeMemberData = async (grade: number) => {
    // 現在の1年生が何期生か?
    const currentGrade1 = getFiscalYear()

    document.getElementById("members")!.innerHTML += `
        <section class="intro-table">
            <h3>
                ${grade}回生
            </h3>
            <div class="students" id="student-${grade}">
            </div>
        </section>
    `

    const members = await safeLoadCsvAsObjects(`memberdata/student-${currentGrade1 - grade + 1}.csv`)

    if (!members) return

    const student = document.getElementById(`student-${grade}`)!

    members.forEach((member) => {
        student.innerHTML += `
            <div class="row">
                <div class="row-head">
                    <span class="name">${member.name}</span>
                    <span class="job">${member.job ?? ""}</span>
                </div>
                <div class="row-content">
                    <span class="course">${member.course}</span>
                    <span class="detail">
                        趣味: ${member.hobby}<br>
                        一言: ${member.comment}
                    </span>
                </div>
            </div>
        `
    })
}

const writeOb = async (term: number) => {
    const student = document.getElementById(`student-ob-og`)!

    const members = await safeLoadCsvAsObjects(`memberdata/student-${term}.csv`)

    if (!members) throw new Error("あああ")

    members.forEach((member) => {
        student.innerHTML += `
            <div class="row">
                <div class="row-head">
                    <span class="name">${member.name}</span>
                    <span class="job">${member.job ?? ""}</span>
                </div>
                <div class="row-content">
                    <span class="course">${member.course}</span>
                    <span class="detail">
                        趣味: ${member.hobby}<br>
                        一言: ${member.comment}
                    </span>
                </div>
            </div>
        `
    })
}

// const writeMoreBefore = async () => {
//     const student = document.getElementById(`student-ob-og`)

//     const members = await safeLoadCsvAsObjects(`memberdata/student-それ以前.csv`)

//     members.forEach((member) => {
//         student.innerHTML += `
//             <tr>
//                 <th class="name">${member.name}</th>
//                 <td class="course">${member.course}</td>
//                 <td class="detail">
//                     趣味: ${member.hobby}<br>
//                     一言: ${member.comment}
//                 </td>
//             </tr>
//         `
//     })
// }

const getFiscalYear = () => {
    const today = new Date()
    const year = today.getFullYear()
    const month = today.getMonth() + 1 // getMonth() は 0 から 11 の範囲なので +1

    // 日本の年度（4月〜翌年3月）
    return month >= 4 ? year : year - 1
}

const writeAllMemberData = async () => {
    for (let i = 0; i < 4; i++) {
        await writeMemberData(i + 1)
    }

    document.getElementById("members")!.innerHTML += `
        <section class="intro-table">
            <h3>OB-OG</h3>
            <div class="students" id="student-ob-og">
            </div>
        </section>
    `

    for (let i = getFiscalYear() - 4; i >= 2011; i--) {
        // console.log(i)
        await writeOb(i)
    }

    // await writeMoreBefore()
}
