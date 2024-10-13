function check_recover_link() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const link = urlParams.get("link");

    fetch("http://localhost:3000/api/auth/check_recover_link", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ link: link })
    })
        .then(response => response.json())
        .then(data => {
            if (!data) {
                alert("Недействительная ссылка");
                window.location.href = "auth";
            }
        })
        .catch(error => { console.log(error); });
}

check_recover_link()

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("changePasswordForm").addEventListener("submit", function(e) {
        e.preventDefault();

        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const link = urlParams.get("link");

        const password = document.getElementById("password").value;
        const checkPassword = document.getElementById("checkPassword").value;
        if (password === checkPassword) {
            const data = {
                link: link,
                password: password
            };

            const changePasswordForm = document.getElementById("changePasswordForm");
            changePasswordForm.classList.add("disabled");

            fetch("http://localhost:3000/api/auth/update_password_after_recover", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(data => {
                    if (data) {
                        alert("Пароль обновлён. Войдите в аккаунт с новым паролем");
                        window.location.href = "auth";
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