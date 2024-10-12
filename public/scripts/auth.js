document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const redirect = urlParams.get('redirect');

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const data = {
        login: email,
        password: password
    };

    const loginForm = document.getElementById('loginForm');
    loginForm.classList.add('disabled');

    fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            if (!data.error) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('role', data.user.role);

                if (redirect){
                    window.location.href = `${redirect}`;
                } else{
                    window.location.href = "active_tests";
                }
            } else {
                alert('Ошибка входа: ' + data.message);
                loginForm.classList.remove('disabled');
            }
        })
        .catch(error => {
            console.error('Ошибка: ' + error);
        });
});
