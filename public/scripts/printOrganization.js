async function getInviteLink(role, actorId, orgName, isActive) {
    const data = {
        role: role,
        actorId: parseInt(actorId),
        orgName: orgName,
        isActive: isActive === "true"
    };

    const response = await fetch(`http://localhost:3000/api/auth/get_invite_link`, {
        method: "POST",
        headers: {
            "authorization": `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        const res_data = await response.json();
        alert(`Ошибка: ${res_data.message}`)
        throw new Error(res_data.message);
    }

    const link = await response.text();

    await navigator.clipboard.writeText(link);
    toastr.options = {
        "progressBar": true,
        "positionClass": "toast-top-right",
        "timeOut": "3000"
    };

    toastr.success("Ссылка скопирована в буфер обмена!");
}

async function loadUserData() {
    const token = localStorage.getItem("token");
    if (!token) {
        window.location.href = "auth";
    }

    const role = localStorage.getItem("role");
    if (role !== "2") {
        window.location.href = "403";
    }

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const name = urlParams.get("name");

    const loader = document.querySelector(".loader");

    try {
        loader.style.display = "block";
        const response = await fetch(`http://localhost:3000/api/organization/receive_with_all/${name}`, {
            method: "GET",
            headers: {
                "authorization": `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json"
            }
        });

        const org = await response.json();

        if (!response.ok) {
            throw new Error(org.message);
        }

        const orgName = org.name;

        document.getElementById("h1OrgName").textContent = orgName;

        const userTableBody = document.getElementById("userTableBody");
        userTableBody.innerHTML = "";

        const row = document.createElement("tr");
        const id = org.id;
        const org_name = org.name;
        const org_phone = org.phone;
        const org_email = org.email;
        const org_responsiblePerson = org.responsiblePerson;
        const org_address = org.address;
        row.id = `org-${org.id}`;
        row.innerHTML = `
                    <td class="id-cell">${id}</td>
                    <td class="name-cell">${org_name}</td>
                    <td class="address-cell">${org_address}</td>
                    <td class="phone-cell">${org_phone}</td>
                    <td class="email-cell">${org_email}</td>
                    <td class="responsiblePerson-cell">${org_responsiblePerson}</td>
                `;
        userTableBody.appendChild(row);


        const studentTableBody = document.getElementById("studentTableBody");
        studentTableBody.innerHTML = "";

        org.students.forEach((student) => {
            const row = document.createElement("tr");
            const studentId = student.id;
            const userID = student.userID;
            const name = student.name;
            const studentIsActive = student.isActive;
            const group = student.group;
            const email = student.email;
            const createdAt = student.createdAt;
            row.id = `student-${student.id}`;
            row.innerHTML = `
                    <td class="student-id-cell">${studentId}</td>
                    <td class="student-userId-cell">${userID}</td>
                    <td class="student-name-cell">${name}</td>
                    <td class="student-group-cell">${group}</td>
                    <td class="student-isActive-cell">${studentIsActive}</td>
                    <td class="student-email-cell">${email}</td>
                    <td class="student-createDate-cell">${createdAt}</td>
                    <td class="student-actions">
                        <button class="student-edit-button" onclick="getInviteLink(1, '${studentId}', '${orgName}', '${studentIsActive}')">🔗</button>
                    </td>
                `;

            if (!studentIsActive) {
                row.style.backgroundColor = "grey";
                row.querySelector(".student-edit-button").style.backgroundColor = "green";
            }

            studentTableBody.appendChild(row);
        });

        const teacherTableBody = document.getElementById("teacherTableBody");
        teacherTableBody.innerHTML = "";

        org.teachers.forEach((teacher) => {
            const row = document.createElement("tr");
            const teacherId = teacher.id;
            const userID = teacher.userID;
            const name = teacher.name;
            const teacherIsActive = teacher.isActive;
            const email = teacher.email;
            const createdAt = teacher.createdAt;
            row.id = `teacher-${teacher.id}`;
            row.innerHTML = `
                    <td class="teacher-id-cell">${teacherId}</td>
                    <td class="teacher-userId-cell">${userID}</td>
                    <td class="teacher-name-cell">${name}</td>
                    <td class="teacher-isActive-cell">${teacherIsActive}</td>
                    <td class="teacher-email-cell">${email}</td>
                    <td class="teacher-createDate-cell">${createdAt}</td>
                     <td class="teacher-actions">
                        <button class="teacher-edit-button" onclick="getInviteLink(0, '${teacherId}', '${orgName}', '${teacherIsActive}')">🔗</button>
                    </td>
                `;

            if (!teacherIsActive) {
                row.style.backgroundColor = "grey";
                row.querySelector(".teacher-edit-button").style.backgroundColor = "green";
            }

            teacherTableBody.appendChild(row);
        });

    } catch (error) {
        console.error(error);
    } finally {
        loader.style.display = "none";
    }
}

window.addEventListener("DOMContentLoaded", loadUserData);

//todo сделать кнопки добавления студента и преподавателя, форму для обновления организации, преподавателя и студента