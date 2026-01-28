document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    // Validación mínima en cliente antes de enviar a Wallet
    if (!email || !password) {
        showNotification('Complete email y contraseña.', 'warning', 2000);
        return;
    }

    if (Wallet.login(email, password)) {
        // Éxito
        location.assign('menu.html');
    } else {
        // Error
        showNotification('Credenciales incorrectas. Intente nuevamente.', 'danger', 2400);
    }
});
