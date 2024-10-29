document.querySelectorAll('.delete-product').forEach(button => {
    button.addEventListener('click', function() {
        console.log(productId);
        fetch('/api/carts/' + cart + '/products/' + productId, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            window.location.href = '/carts/' + cart;
        })
        .catch((error) => {
            console.error('Error:' , error);
        });
    });
});

document.querySelectorAll('.buy').forEach(button => {
    button.addEventListener('click', function() {
        fetch('/api/tickets', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify({
                amount: total
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            // window.location.href = '/tickets/' + cart;
        })
        .catch((error) => {
            console.error('Error:' , error);
        });
    });
});