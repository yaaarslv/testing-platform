// document.getElementById('sendCodeButton').addEventListener('click', function () {
//     const email = document.getElementById('email').value;
//
//     if (email) {
//         const data = {
//             recipient: email
//         };
//
//         const code_button = document.getElementById("sendCodeButton")
//         code_button.disabled = true;
//
//         fetch('http://localhost:3000/app/send_code', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(data)
//         })
//             .then(response => response.json())
//             .then(data => {
//                 if (data.success) {
//                     alert('Код подтверждения успешно отправлен на указанный адрес почты');
//                 } else {
//                     alert('Ошибка при отправке кода подтверждения: ' + data.error);
//                     code_button.disabled = false;
//                 }
//             })
//             .catch(error => {
//                 console.error('Ошибка: ' + error);
//             });
//     } else {
//         alert('Введите почту, чтобы отправить код подтверждения');
//     }
// });

let _userData = null;

async function checkInviteLink() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const link = urlParams.get("link");

    try {
        const response = await fetch(`http://localhost:3000/api/auth/check_invite_link`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ link: link })
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message);
        }

        const success = result.success;
        const userData = result.userData;
        const message = result.message;

        if (!success) {
            toastr.options = {
                "progressBar": true,
                "positionClass": "toast-top-right",
                "timeOut": "5000"
            };

            toastr.error(`Ошибка: ${message}`);
            throw new Error(message);
        }
        _userData = userData;
    } catch (error) {
        console.error(error);
    }
}

function registerAndShowInvitation() {
    document.getElementById("registerForm").addEventListener("submit", function(e) {
        e.preventDefault();
        if (_userData === undefined) {
            throw new Error();
        }

        const role = _userData.role;
        const actorId = _userData.actorId;
        const orgName = _userData.orgName
        const isActive = _userData.isActive;

        //todo сделать регистрацию и потом показ окна "добро пожаловать"
    });

    // if (isActive) {
    //     const invitationDiv = document.querySelector(".invitation");
    //     const invitationText = document.querySelector(".invitation-text");
    //     invitationText.textContent = `Добро пожаловать в организацию "${orgName}"`;
    // }
}

function loginAndShowInvitation() {
    document.getElementById("loginForm").addEventListener("submit", function(e) {
        e.preventDefault();
        if (_userData === undefined) {
            throw new Error();
        }

        const role = _userData.role;
        const actorId = _userData.actorId;
        const orgName = _userData.orgName
        const isActive = _userData.isActive;

        //todo сделать забор данных и отправку на активацию и потом показ окна "добро пожаловать"
    });

    // if (isActive) {
    //     const invitationDiv = document.querySelector(".invitation");
    //     const invitationText = document.querySelector(".invitation-text");
    //     invitationText.textContent = `Добро пожаловать в организацию "${orgName}"`;
    // }
}

function hide() {
    const hideLoginFormA = document.querySelector(".hide-login-form-a");
    const hideRegisterFormA = document.querySelector(".hide-register-form-a");
    const registerForm = document.querySelector(".register-form");
    const loginForm = document.querySelector(".login-form");

    hideLoginFormA.addEventListener("click", function() {
        loginForm.style.display = "none";
        registerForm.style.display = "block";
    });

    hideRegisterFormA.addEventListener("click", function() {
        registerForm.style.display = "none";
        loginForm.style.display = "block";
    });
}


window.addEventListener("DOMContentLoaded", registerAndShowInvitation);
window.addEventListener("DOMContentLoaded", loginAndShowInvitation);
window.addEventListener("DOMContentLoaded", hide);