document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (Wallet.login(email, password)) {
        // Éxito
        window.location.href = 'menu.html';
    } else {
        // Error
        alert('Credenciales incorrectas. Intente nuevamente.');
    }
});
