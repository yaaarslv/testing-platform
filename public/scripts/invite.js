let _userData = null;

async function checkInviteLink() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const link = urlParams.get("link");

    if (!link) {
        window.location.href = "403"
        return;
    }

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
    document.getElementById("registerForm").addEventListener("submit", async function(e) {
        e.preventDefault();
        if (_userData === undefined) {
            throw new Error();
        }

        const role = _userData.role;
        const actorId = _userData.actorId;
        const orgName = _userData.orgName

        const email = document.getElementById("register-email").value;
        const password = document.getElementById("register-password").value;

        const data = {
            login: email,
            password,
            role,
            actorId
        }

        const response = await fetch("http://localhost:3000/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (!response.ok) {
            toastr.options = {
                "progressBar": true,
                "positionClass": "toast-top-right",
                "timeOut": "5000"
            };

            toastr.error(`Ошибка: ${result.message}`);
            throw new Error(result.message);
        }

        localStorage.setItem('token', result.token);
        localStorage.setItem('role', result.user.role);

        document.querySelector(".register-form").style.display = "none";

        const invitationDiv = document.querySelector(".invitation");
        const invitationText = document.querySelector(".invitation-text");
        const roleText = role === 0 ? "преподавателя." : "студента."
        invitationText.textContent = `Добро пожаловать в организацию "${orgName}" в качестве ${roleText}`;
        invitationDiv.style.removeProperty("display");
    });
}

function loginAndShowInvitation() {
    document.getElementById("loginForm").addEventListener("submit", async function(e) {
        e.preventDefault();
        if (_userData === undefined) {
            throw new Error();
        }

        const role = _userData.role;
        const actorId = _userData.actorId;
        const orgName = _userData.orgName


        const email = document.getElementById("login-email").value;
        const password = document.getElementById("login-password").value;

        const data = {
            login: email,
            password,
            role,
            actorId
        }

        const response = await fetch("http://localhost:3000/api/auth/activate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (!response.ok) {
            toastr.options = {
                "progressBar": true,
                "positionClass": "toast-top-right",
                "timeOut": "5000"
            };

            toastr.error(`Ошибка: ${result.message}`);
            throw new Error(result.message);
        }

        document.querySelector(".login-form").style.display = "none";

        const invitationDiv = document.querySelector(".invitation");
        const invitationText = document.querySelector(".invitation-text");
        const roleText = role === 0 ? "преподавателя." : "студента."
        invitationText.textContent = `Добро пожаловать в организацию "${orgName}" в качестве ${roleText}`;
        invitationDiv.style.removeProperty("display");
    });
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

checkInviteLink();
window.addEventListener("DOMContentLoaded", registerAndShowInvitation);
window.addEventListener("DOMContentLoaded", loginAndShowInvitation);
window.addEventListener("DOMContentLoaded", hide);