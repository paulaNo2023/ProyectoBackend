const login = document.getElementById('login');
login.addEventListener('click', async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const user = {
        email,
        password
    };
    const response = await fetch('/api/sessions/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    const result = await response.json();
    if (result.status === 'success') {
        window.location.href = '/products';
    }
});

document.getElementById('signUp').addEventListener('click', () => {
    window.location.href = '/register';
});