document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("changePasswordForm").addEventListener("submit", function(e) {
        e.preventDefault();

        const password = document.getElementById("password").value;
        const checkPassword = document.getElementById("checkPassword").value;
        if (password === checkPassword) {
            const data = {
                password: password
            };

            const changePasswordForm = document.getElementById("changePasswordForm");
            changePasswordForm.classList.add("disabled");

            fetch("http://localhost:3000/api/auth/update_password", {
                method: "POST",
                headers: {
                    "authorization": `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(data => {
                    if (data) {
                        alert("Пароль обновлён");
                    } else {
                        alert("Ошибка: " + data.error);
                        changePasswordForm.classList.remove("disabled");
                    }
                })
                .catch(error => {
                    console.error("Ошибка: " + error);
                });
        } else {
            alert("Пароли не совпадают!");
        }
    });
});