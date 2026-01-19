// Mostrar saldo
document.getElementById('balance-display').textContent = formatCurrency(Wallet.getBalance());

// Cargar últimos 3 movimientos
function renderTransactions() {
    const allTransactions = Wallet.getTransactions();
    const lastThree = allTransactions.slice(0, 3);
    const container = document.getElementById('transactions-container');
    
    if (lastThree.length === 0) {
        container.innerHTML = '<p class="text-muted text-center">Sin movimientos aún</p>';
        return;
    }

    // Nota: devolver los últimos 3 por fecha si vienen desordenados
    // (mejora para feature/transacciones)
    lastThree.sort((a,b) => new Date(b.date) - new Date(a.date));

    container.innerHTML = lastThree.map(transaction => {
        const amt = Number(transaction.amount);
        const positive = amt > 0;
        const cls = positive ? 'text-success' : 'text-danger';
        const sign = positive ? '+' : '-';
        return `
        <div class="d-flex justify-content-between align-items-center py-2 border-bottom">
            <div>
                <p class="mb-0 fw-500" style="color: #e0e0e0;">${transaction.description}</p>
                <small class="text-muted">${transaction.date}</small>
            </div>
            <div class="text-end">
                <p class="mb-0 ${cls}">${sign} ${formatCurrency(Math.abs(amt))}</p>
            </div>
        </div>
    `;
    }).join('');
}

renderTransactions();

// Ocultar/mostrar saldo
let balanceVisible = true;
document.getElementById('toggle-balance').addEventListener('click', function(e) {
    e.stopPropagation();
    balanceVisible = !balanceVisible;
    const balanceDisplay = document.getElementById('balance-display');
    const icon = this.querySelector('.material-icons');
    
    if (balanceVisible) {
        balanceDisplay.textContent = formatCurrency(Wallet.getBalance());
        icon.textContent = 'visibility';
    } else {
        balanceDisplay.textContent = '•••••';
        icon.textContent = 'visibility_off';
    }
});

// Ocultar/mostrar movimientos
let transactionsVisible = true;
document.getElementById('toggle-transactions').addEventListener('click', function() {
    transactionsVisible = !transactionsVisible;
    const container = document.getElementById('transactions-container');
    const icon = this.querySelector('.material-icons');
    
    if (transactionsVisible) {
        renderTransactions();
        icon.textContent = 'visibility';
    } else {
        container.innerHTML = '<p class="text-muted text-center">Movimientos ocultos</p>';
        icon.textContent = 'visibility_off';
    }
});

// Navegar
document.getElementById('btn-deposit').addEventListener('click', () => {
    window.location.href = 'deposit.html';
});

document.getElementById('btn-send').addEventListener('click', () => {
    window.location.href = 'sendmoney.html';
});

document.getElementById('btn-transactions').addEventListener('click', () => {
    window.location.href = 'transactions.html';
});

// Logout desde modal de perfil
const logoutBtn = document.getElementById('logout-btn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        Wallet.logout();
    });
}
