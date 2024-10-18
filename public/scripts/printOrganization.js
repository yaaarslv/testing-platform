function setInputWidth(inputElement) {
    // Получаем скрытый элемент для измерения текста
    const calculator = document.getElementById('textWidthCalculator');

    // Устанавливаем текст в скрытый элемент
    calculator.textContent = inputElement.value;

    // Получаем ширину текста
    const textWidth = calculator.offsetWidth;

    // Задаем ширину полю ввода с небольшим запасом
    inputElement.style.width = `${textWidth}px`;
}


function add_student() {
    document.getElementById("addStudentForm").addEventListener("submit", async function(e) {
        e.preventDefault();

        const studentName = document.getElementById("student-name").value === "" ? null : document.getElementById("student-name").value;
        const studentGroup = document.getElementById("student-group").value === "" ? null : document.getElementById("student-group").value;
        const organizationId = parseInt(document.querySelector(".id-cell").textContent);

        const data = {
            name: studentName,
            group: studentGroup,
            organizationId,
        };

        const addStudentForm = document.getElementById("addStudentForm");
        addStudentForm.classList.add("disabled");

        const response = await fetch("http://localhost:3000/api/student/create", {
            method: "POST",
            headers: {
                "authorization": `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            addStudentForm.classList.remove('disabled');
            const json = await response.json();
            alert(json.message)
            throw new Error(json.message);
        }

        const student = await response.json();
        const studentId = student.id;
        const userID = student.userID;
        const name = student.name;
        const studentIsActive = student.isActive;
        const group = student.group;
        const email = student.email;
        const createdAt = student.createdAt;
        const orgName = document.getElementById("h1OrgName").textContent;

        const studentTableBody = document.getElementById("studentTableBody");
        const row = document.createElement("tr");
        row.id = `student-${studentId}`;
        row.innerHTML = `
                    <td class="student-id-cell">${studentId}</td>
                    <td class="student-userId-cell">${userID}</td>
                    <td class="student-name-cell">${name}</td>
                    <td class="student-group-cell">${group}</td>
                    <td class="student-isActive-cell">${studentIsActive}</td>
                    <td class="student-email-cell">${email}</td>
                    <td class="student-createDate-cell">${createdAt}</td>
                    <td class="student-actions">
                        <i class="fas fa-pencil-alt" onclick="editRow('${studentId}', 'student')"></i>
                        <i class="fas fa-check" style="display: none" onclick="saveRow('${studentId}', 'student')"></i>
                        <i class="fas fa-times" style="display: none" onclick="cancelEdit('${studentId}', 'student')"></i>
                        <button class="student-edit-button" onclick="getInviteLink(1, '${studentId}', '${orgName}', '${studentIsActive}')">🔗</button>
                    </td>
                `;

        if (!studentIsActive) {
            row.style.backgroundColor = "grey";
            row.querySelector(".student-edit-button").style.backgroundColor = "green";
        }

        studentTableBody.appendChild(row);
        cancelAddStudent()
    });
}

function addStudent() {
    const addStudentButton = document.querySelector(".addStudentButton");
    addStudentButton.style.display = "none";

    const addStudentForm = document.querySelector(".add-student-form");
    addStudentForm.style.display = "block";

}

function cancelAddStudent() {
    const addStudentForm = document.querySelector(".add-student-form");
    addStudentForm.style.display = "none";

    const addStudentButton = document.querySelector(".addStudentButton");
    addStudentButton.style.display = "revert";
}

function add_teacher() {
    document.getElementById("addTeacherForm").addEventListener("submit", async function(e) {
        e.preventDefault();

        const teacherName = document.getElementById("teacher-name").value === "" ? null : document.getElementById("teacher-name").value;
        const organizationId = parseInt(document.querySelector(".id-cell").textContent);

        const data = {
            name: teacherName,
            organizationId,
        };

        const addTeacherForm = document.getElementById("addTeacherForm");
        addTeacherForm.classList.add("disabled");

        const response = await fetch("http://localhost:3000/api/teacher/create", {
            method: "POST",
            headers: {
                "authorization": `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            addTeacherForm.classList.remove('disabled');
            const json = await response.json();
            alert(json.message)
            throw new Error(json.message);
        }

        const teacher = await response.json();
        const teacherId = teacher.id;
        const userID = teacher.userID;
        const name = teacher.name;
        const teacherIsActive = teacher.isActive;
        const email = teacher.email;
        const createdAt = teacher.createdAt;
        const orgName = document.getElementById("h1OrgName").textContent;

        const teacherTableBody = document.getElementById("teacherTableBody");
        const row = document.createElement("tr");
        row.id = `teacher-${teacherId}`;
        row.innerHTML = `
                    <td class="teacher-id-cell">${teacherId}</td>
                    <td class="teacher-userId-cell">${userID}</td>
                    <td class="teacher-name-cell">${name}</td>
                    <td class="teacher-isActive-cell">${teacherIsActive}</td>
                    <td class="teacher-email-cell">${email}</td>
                    <td class="teacher-createDate-cell">${createdAt}</td>
                     <td class="teacher-actions">
                        <i class="fas fa-pencil-alt" onclick="editRow('${teacherId}', 'teacher')"></i>
                        <i class="fas fa-check" style="display: none" onclick="saveRow('${teacherId}', 'teacher')"></i>
                        <i class="fas fa-times" style="display: none" onclick="cancelEdit('${teacherId}', 'teacher')"></i>
                        <button class="teacher-edit-button" onclick="getInviteLink(0, '${teacherId}', '${orgName}', '${teacherIsActive}')">🔗</button>
                    </td>
                `;

        if (!teacherIsActive) {
            row.style.backgroundColor = "grey";
            row.querySelector(".teacher-edit-button").style.backgroundColor = "green";
        }

        teacherTableBody.appendChild(row);
        cancelAddTeacher()
    });
}

function addTeacher() {
    const addTeacherButton = document.querySelector(".addTeacherButton");
    addTeacherButton.style.display = "none";

    const addTeacherForm = document.querySelector(".add-teacher-form");
    addTeacherForm.style.display = "block";

}

function cancelAddTeacher() {
    const addTeacherForm = document.querySelector(".add-teacher-form");
    addTeacherForm.style.display = "none";

    const addTeacherButton = document.querySelector(".addTeacherButton");
    addTeacherButton.style.display = "revert";
}

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

function editRow(rowId, subject) {
    if (subject === "org") {
        const row = document.getElementById(`org-${rowId}`);

        let nameCell = row.querySelector(`.name-cell`);
        let addressCell = row.querySelector(`.address-cell`);
        let phoneCell = row.querySelector(`.phone-cell`);
        let emailCell = row.querySelector(`.email-cell`);
        let responsiblePersonCell = row.querySelector(`.responsiblePerson-cell`);
        let actionsCell = row.querySelector(`.actions`);

        nameCell.innerHTML = `<input type="text" id="edit-name-${rowId}" value="${nameCell.textContent}" />`;
        addressCell.innerHTML = `<input type="text" id="edit-address-${rowId}" value="${addressCell.textContent}" />`;
        phoneCell.innerHTML = `<input type="text" id="edit-phone-${rowId}" value="${phoneCell.textContent}" />`;
        emailCell.innerHTML = `<input type="email" id="edit-email-${rowId}" value="${emailCell.textContent}" />`;
        responsiblePersonCell.innerHTML = `<input type="text" id="edit-responsiblePerson-${rowId}" value="${responsiblePersonCell.textContent}" />`;

        setInputWidth(document.getElementById(`edit-name-${rowId}`));
        setInputWidth(document.getElementById(`edit-address-${rowId}`));
        setInputWidth(document.getElementById(`edit-phone-${rowId}`));
        setInputWidth(document.getElementById(`edit-email-${rowId}`));
        setInputWidth(document.getElementById(`edit-responsiblePerson-${rowId}`));

        const pencil = actionsCell.querySelector(".fa-pencil-alt");
        const check = actionsCell.querySelector(".fa-check");
        const times = actionsCell.querySelector(".fa-times");

        pencil.style.display = "none";
        check.style.display = "revert";
        times.style.display = "revert";
    }
    // row.id = `org-${id}`;
    // <td class="id-cell">${id}</td>
    // <td class="name-cell">${org_name}</td>
    // <td class="address-cell">${org_address}</td>
    // <td class="phone-cell">${org_phone}</td>
    // <td class="email-cell">${org_email}</td>
    // <td class="responsiblePerson-cell">${org_responsiblePerson}</td>
    // <td class="actions">
    //     <i class="fas fa-pencil-alt" onclick="editRow('${id}', 'org')"></i>
    //     <i class="fas fa-check" style="display: none" onclick="saveRow('${id}', 'org')"></i>
    //     <i class="fas fa-times" style="display: none" onclick="cancelEdit('${id}', 'org')"></i>
    // </td>
    //     `;
}

function saveRow(id, subject) {

}

function cancelEdit(id, subject) {

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
        row.id = `org-${id}`;
        row.innerHTML = `
                    <td class="id-cell">${id}</td>
                    <td class="name-cell">${org_name}</td>
                    <td class="address-cell">${org_address}</td>
                    <td class="phone-cell">${org_phone}</td>
                    <td class="email-cell">${org_email}</td>
                    <td class="responsiblePerson-cell">${org_responsiblePerson}</td>
                    <td class="actions">
                        <i class="fas fa-pencil-alt" onclick="editRow('${id}', 'org')"></i>
                        <i class="fas fa-check" style="display: none" onclick="saveRow('${id}', 'org')"></i>
                        <i class="fas fa-times" style="display: none" onclick="cancelEdit('${id}', 'org')"></i>
                    </td>
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
            row.id = `student-${studentId}`;
            row.innerHTML = `
                    <td class="student-id-cell">${studentId}</td>
                    <td class="student-userId-cell">${userID}</td>
                    <td class="student-name-cell">${name}</td>
                    <td class="student-group-cell">${group}</td>
                    <td class="student-isActive-cell">${studentIsActive}</td>
                    <td class="student-email-cell">${email}</td>
                    <td class="student-createDate-cell">${createdAt}</td>
                    <td class="student-actions">
                        <i class="fas fa-pencil-alt" onclick="editRow('${studentId}', 'student')"></i>
                        <i class="fas fa-check" style="display: none" onclick="saveRow('${studentId}', 'student')"></i>
                        <i class="fas fa-times" style="display: none" onclick="cancelEdit('${studentId}', 'student')"></i>
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
            row.id = `teacher-${teacherId}`;
            row.innerHTML = `
                    <td class="teacher-id-cell">${teacherId}</td>
                    <td class="teacher-userId-cell">${userID}</td>
                    <td class="teacher-name-cell">${name}</td>
                    <td class="teacher-isActive-cell">${teacherIsActive}</td>
                    <td class="teacher-email-cell">${email}</td>
                    <td class="teacher-createDate-cell">${createdAt}</td>
                     <td class="teacher-actions">
                        <i class="fas fa-pencil-alt" onclick="editRow('${teacherId}', 'teacher')"></i>
                        <i class="fas fa-check" style="display: none" onclick="saveRow('${teacherId}', 'teacher')"></i>
                        <i class="fas fa-times" style="display: none" onclick="cancelEdit('${teacherId}', 'teacher')"></i>
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
window.addEventListener("DOMContentLoaded", add_student);
window.addEventListener("DOMContentLoaded", add_teacher);

//todo сделать форму для обновления организации, преподавателя и студента