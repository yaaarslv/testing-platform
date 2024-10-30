function setInputWidth(inputElement, additional = 0, length = null) {
    const calculator = document.getElementById("textWidthCalculator");
    if (length == null) {
        calculator.textContent = inputElement.value;

        const textWidth = calculator.offsetWidth + additional;

        inputElement.style.width = `${textWidth}px`;
    } else {
        inputElement.style.width = `${length}px`;
    }
}

function add_question() {
    document.getElementById("addQuestionForm").addEventListener("submit", async function(e) {
        e.preventDefault();

        const teacherName = document.getElementById("teacher-name").value === "" ? null : document.getElementById("teacher-name").value;
        const organizationId = parseInt(document.querySelector(".id-cell").textContent);

        const data = {
            name: teacherName,
            organizationId
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
            addTeacherForm.classList.remove("disabled");
            const json = await response.json();
            alert(json.message);
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
            row.style.backgroundColor = "darkslategrey";
            row.querySelector(".teacher-edit-button").style.backgroundColor = "green";
        }

        teacherTableBody.appendChild(row);
        cancelAddTeacher();
    });
}

function addQuestion() {
    const addQuestionButton = document.querySelector(".addQuestionButton");
    addQuestionButton.style.display = "none";

    const addQuestionForm = document.querySelector(".add-question-form");
    addQuestionForm.style.display = "block";
}

function cancelAddQuestion() {
    const addQuestionForm = document.querySelector(".add-question-form");
    addQuestionForm.style.display = "none";

    const addQuestionButton = document.querySelector(".addQuestionButton");
    addQuestionButton.style.removeProperty("display");
}

function editRow(rowId, subject) {
    if (subject === "topic") {
        const row = document.getElementById(`topic-${rowId}`);

        let nameCell = row.querySelector(`.name-cell`);
        let organizationIdCell = row.querySelector(`.organization_id-cell`);
        let actionsCell = row.querySelector(`.actions`);

        // Сохраняем оригинальные значения перед редактированием
        nameCell.setAttribute("data-original-value", nameCell.textContent);
        organizationIdCell.setAttribute("data-original-value", organizationIdCell.textContent);

        // Заменяем текст на поля ввода
        nameCell.innerHTML = `<input type="text" id="edit-name-${rowId}" value="${nameCell.textContent}" />`;
        organizationIdCell.innerHTML = `<input type="text" id="edit-organization_id-${rowId}" value="${organizationIdCell.textContent}" />`;

        // Устанавливаем ширину полей ввода на основе содержимого
        setInputWidth(document.getElementById(`edit-name-${rowId}`), 200);
        setInputWidth(document.getElementById(`edit-organization_id-${rowId}`), 30);

        // Скрываем иконку редактирования и показываем иконки сохранения/отмены
        const pencil = actionsCell.querySelector(".fa-pencil-alt");
        const check = actionsCell.querySelector(".fa-check");
        const times = actionsCell.querySelector(".fa-times");

        pencil.style.display = "none";
        check.style.removeProperty("display");
        times.style.removeProperty("display");
    }
}

async function saveRow(rowId, subject) {
    if (subject === "topic") {
        const row = document.getElementById(`topic-${rowId}`);

        let nameCell = row.querySelector(`.name-cell`);
        let organizationIdCell = row.querySelector(`.organization_id-cell`);
        let actionsCell = row.querySelector(`.actions`);

        const name = document.getElementById(`edit-name-${rowId}`).value;
        const organizationId = document.getElementById(`edit-organization_id-${rowId}`).value;

        const data = {
            name: name === "" || name === "null" ? null : name,
            organizationId: organizationId === "" || organizationId === "null" ? null : parseInt(organizationId)
        };

        const response = await fetch(`http://localhost:3000/api/topic/update/${rowId}`, {
            method: "PUT",
            headers: {
                "authorization": `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const topic = await response.json();

        if (!response.ok) {
            toastr.options = {
                "progressBar": true,
                "positionClass": "toast-top-right",
                "timeOut": "5000"
            };

            toastr.error(`Ошибка: ${topic.message}`);
            throw new Error(topic.message);
        }

        toastr.options = {
            "progressBar": true,
            "positionClass": "toast-top-right",
            "timeOut": "3000"
        };

        toastr.success(`Данные темы успешно обновлены`);

        // Получаем значения из input и заменяем их на текстовое содержимое
        nameCell.textContent = topic.name + "";
        organizationIdCell.textContent = topic.organizationId + "";

        document.getElementById("h1TopicName").textContent = topic.name;

        // Скрываем иконки сохранения/отмены и показываем иконку редактирования
        const pencil = actionsCell.querySelector(".fa-pencil-alt");
        const check = actionsCell.querySelector(".fa-check");
        const times = actionsCell.querySelector(".fa-times");

        pencil.style.removeProperty("display");
        check.style.display = "none";
        times.style.display = "none";
    }
}

function cancelEdit(rowId, subject) {
    if (subject === "topic") {
        const row = document.getElementById(`topic-${rowId}`);

        let nameCell = row.querySelector(`.name-cell`);
        let organizationIdCell = row.querySelector(`.organization_id-cell`);
        let actionsCell = row.querySelector(`.actions`);

        // Восстанавливаем оригинальные значения из data-атрибутов
        nameCell.textContent = nameCell.getAttribute("data-original-value");
        organizationIdCell.textContent = organizationIdCell.getAttribute("data-original-value");

        // Скрываем иконки сохранения/отмены и показываем иконку редактирования
        const pencil = actionsCell.querySelector(".fa-pencil-alt");
        const check = actionsCell.querySelector(".fa-check");
        const times = actionsCell.querySelector(".fa-times");

        pencil.style.removeProperty("display");
        check.style.display = "none";
        times.style.display = "none";
    }
}


async function loadUserData() {
    const token = localStorage.getItem("token");
    if (!token) {
        window.location.href = "auth";
    }

    const role = localStorage.getItem("role");
    if (role !== "0") {
        window.location.href = "403";
    }

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const topicId = urlParams.get("id");

    const loader = document.querySelector(".loader");

    try {
        loader.style.display = "block";
        const response = await fetch(`http://localhost:3000/api/topic/receive_full/${topicId}`, {
            method: "GET",
            headers: {
                "authorization": `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json"
            }
        });

        const topic = await response.json();

        if (!response.ok) {
            throw new Error(topic.message);
        }

        const topicName = topic.name;

        document.getElementById("h1TopicName").textContent = topicName;

        const userTableBody = document.getElementById("userTableBody");
        userTableBody.innerHTML = "";

        const row = document.createElement("tr");
        const topic_id = topic.id;
        const topic_name = topic.name;
        const topic_organizationId = topic.organizationId;
        row.id = `topic-${topic_id}`;
        row.innerHTML = `
                    <td class="id-cell">${topic_id}</td>
                    <td class="organization_id-cell">${topic_organizationId}</td>
                    <td class="name-cell">${topic_name}</td>
                    <td class="actions">
                        <i class="fas fa-pencil-alt" onclick="editRow('${topic_id}', 'topic')"></i>
                        <i class="fas fa-check" style="display: none" onclick="saveRow('${topic_id}', 'topic')"></i>
                        <i class="fas fa-times" style="display: none" onclick="cancelEdit('${topic_id}', 'topic')"></i>
                    </td>
                `;
        userTableBody.appendChild(row);


        const studentTableBody = document.getElementById("studentTableBody");
        studentTableBody.innerHTML = "";

        topic.questions.forEach((question) => {
            const row = document.createElement("tr");
            const questionId = question.id;
            const questionText = question.questionText;
            row.id = `question-${questionId}`;
            row.innerHTML = `
                    <td class="question-id-cell">${questionId}</td>
                    <td class="question-questionText-cell">${questionText}</td>
                `;

            studentTableBody.appendChild(row);

            const bc = row.style.backgroundColor;

            row.addEventListener("mouseover", () => {
                row.style.transition = "color 0.3s";
                row.style.cursor = "pointer";
                row.style.color = "white";
                row.style.backgroundColor = "grey";
            });

            row.addEventListener("mouseout", () => {
                row.style.color = "initial";
                row.style.backgroundColor = bc;
            });

            row.addEventListener("click", () => {
                window.location.href = `question?id=${questionId}`;
            });
        });


    } catch (error) {
        console.error(error);
    } finally {
        loader.style.display = "none";
    }
}

function changeQuestionTableVisibility() {
    changeTableVisibility(".questionsTableTitle", ".questionsTable");
}

function changeTableVisibility(titleClassName, tableClassName) {
    const title = document.querySelector(titleClassName);
    const table = document.querySelector(tableClassName);

    title.addEventListener("click", function() {
        const styleIsNone = table.style.display === "none";

        if (styleIsNone) {
            table.style.display = "table";
        } else {
            table.style.display = "none";
        }
    });
}

window.addEventListener("DOMContentLoaded", loadUserData);
window.addEventListener("DOMContentLoaded", add_question);
window.addEventListener("DOMContentLoaded", changeQuestionTableVisibility);
