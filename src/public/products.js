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

const cartView = document.getElementById('cartview');
cartView.addEventListener('click', async () => {
        window.location.href = '/carts/' + cart;
});

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const productId = this.dataset.id;
        console.log(productId);
        fetch('/api/carts/' + cart + '/product/' + productId, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    });
});