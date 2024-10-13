document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('sendRecoverLinkButton').addEventListener('click', function () {
        const email = document.getElementById('email').value;

        if (email) {
            const data = {
                email: email
            };

            const code_button = document.getElementById("sendRecoverLinkButton")
            code_button.disabled = true;

            fetch('http://localhost:3000/api/auth/recover_password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(data => {
                    if (data) {
                        alert('Письмо успешно отправлено на указанный адрес почты');
                    } else {
                        alert('Ошибка при отправке письма: ' + data.error);
                        code_button.disabled = false;
                    }
                })
                .catch(error => {
                    console.error('Ошибка: ' + error);
                });
        } else {
            alert('Введите почту, чтобы восстановить пароль');
        }
    });
});

