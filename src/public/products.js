const logout = document.getElementById('logout');
logout.addEventListener('click', async () => {
    const response = await fetch('/api/sessions/logout', {
        method: 'POST'
    });
    const result = await response.json();
    if (result.status === 'success') {
        window.location.href = '/';
    }
});