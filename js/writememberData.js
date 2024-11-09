// 各学年のデータを書き込む
const writeMemberData = async (grade) => {
    document.getElementById("members").innerHTML += `
      <table summary="サークルのメンバーの紹介" class="introTable">
          <caption>
          ${grade}回生
          </caption>
          <colgroup class="name"></colgroup>
          <colgroup class="course"></colgroup>
          <colgroup class="detail"></colgroup>
          <tbody id="student-${grade}"></tbody>
      </table>
    `

    const student = document.getElementById(`student-${grade}`)

    const members = await safeLoadCsvAsObjects(`memberdata/student-${grade}.csv`)

    members.forEach((member) => {
        student.innerHTML += `
              <tr>
                  <th>${member.name}</th>
                  <td>${member.course}</td>
                  <td>
                      趣味: ${member.hobby}<br>
                      一言: ${member.comment}
                  </td>
              </tr>
            `
    })
}
