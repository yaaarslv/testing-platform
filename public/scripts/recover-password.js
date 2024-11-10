document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('sendRecoverLinkButton').addEventListener('click', function () {
        const email = document.getElementById('email').value;

        if (email) {
            const data = {
                email: email
            };

            const code_button = document.getElementById("sendRecoverLinkButton")
            code_button.disabled = true;

            fetch('https://testing-platform.onrender.com/api/auth/recover_password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(data => {
                    if (data) {
                        toastr.options = {
                            "progressBar": true,
                            "positionClass": "toast-top-right",
                            "timeOut": "3000"
                        };

                        toastr.success(`Письмо успешно отправлено на указанный адрес почты`);
                    } else {
                        toastr.options = {
                            "progressBar": true,
                            "positionClass": "toast-top-right",
                            "timeOut": "5000"
                        };

                        toastr.error(`Ошибка при отправке письма: ${data.error}`);
                        code_button.disabled = false;
                    }
                })
                .catch(error => {
                    console.error('Ошибка: ' + error);
                });
        } else {
            toastr.options = {
                "progressBar": true,
                "positionClass": "toast-top-right",
                "timeOut": "5000"
            };

            toastr.error(`Введите почту, чтобы восстановить пароль`);
        }
    });
});

