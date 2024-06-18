const register = document.getElementById('register');
register.addEventListener('click', async () => {
    const name = document.getElementById('name').value;
    const lname = document.getElementById('lname').value;
    const email = document.getElementById('email').value;
    const age = document.getElementById('age').value;
    const password = document.getElementById('password').value;
    const user = {
        first_name: name,
        last_name: lname,
        email,
        age,
        password
    };
    const response = await fetch('/api/sessions/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    const result = await response.json();
    if (result.status === 'success') {
        window.location.href = '/';
    }
});