document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();
    const amountInput = document.getElementById('amount');
    const amount = parseFloat(amountInput.value);

    if (isNaN(amount) || amount <= 0) {
        showNotification('Ingrese un monto válido mayor que 0.', 'danger', 2500);
        return;
    }

    // Commit ejemplo para feature/depositos: validar y formatear monto antes de depositar
    if (amount > 0) {
        // Actualizar saldo
        const currentBalance = Wallet.getBalance();
        const newBalance = currentBalance + amount;
        Wallet.setBalance(newBalance);

        // Registrar transacción
        Wallet.addTransaction({
            type: 'Depósito',
            amount: amount,
            description: 'Depósito en efectivo'
        });

        showNotification(`Depósito exitoso. Nuevo saldo: ${formatCurrency(newBalance)}`, 'success', 2000);
        // Redirigir al menú después de mostrar notificación
        setTimeout(() => { location.assign('menu.html'); }, 900);
    } else {
        showNotification('Ingrese un monto válido.', 'danger', 2500);
    }
});
