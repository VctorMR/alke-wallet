let selectedContactIndex = -1;

function renderContacts() {
    const contacts = Wallet.getContacts();
    const list = document.getElementById('contacts-list');
    list.innerHTML = '';

    if (contacts.length === 0) {
        list.innerHTML = '<p class="text-muted text-center p-3">No hay contactos guardados.</p>';
        return;
    }

    contacts.forEach((contact, index) => {
        const btn = document.createElement('button');
        btn.className = `list-group-item list-group-item-action ${index === selectedContactIndex ? 'active' : ''}`;
        btn.innerHTML = `
            <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">${contact.name}</h5>
                <small>${contact.bank}</small>
            </div>
            <p class="mb-1">Cuenta: ${contact.cbu}</p>
            <small>Alias: ${contact.alias}</small>
        `;
        btn.onclick = () => selectContact(index);
        list.appendChild(btn);
    });
}

function selectContact(index) {
    selectedContactIndex = index;
    document.getElementById('btn-send-money').disabled = false;
    renderContacts();
}

// Formulario: agregar contacto
document.getElementById('add-contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const newContact = {
        name: document.getElementById('contactName').value,
        email: document.getElementById('contactEmail').value,
        cbu: document.getElementById('contactCBU').value,
        alias: document.getElementById('contactAlias').value,
        bank: document.getElementById('contactBank').value
    };

    Wallet.addContact(newContact);

    // Cerrar modal y limpiar formulario
    const modalEl = document.getElementById('addContactModal');
    const modal = bootstrap.Modal.getInstance(modalEl);
    modal.hide();
    e.target.reset();

    renderContacts();
    showNotification('Contacto agregado exitosamente.', 'success', 2000);
});

// Lógica: enviar dinero (usa modal en vez de prompt)
const transferModalEl = document.getElementById('transferModal');
const transferModal = transferModalEl ? new bootstrap.Modal(transferModalEl) : null;
const transferRecipientEl = document.getElementById('transferRecipient');
const transferAmountEl = document.getElementById('transferAmount');
const confirmTransferBtn = document.getElementById('confirm-transfer-btn');

document.getElementById('btn-send-money').addEventListener('click', () => {
    if (selectedContactIndex === -1) return;
    const contact = Wallet.getContacts()[selectedContactIndex];
    if (!transferModal) return;

    transferRecipientEl.textContent = contact.name;
    document.getElementById('balance-display').textContent = Wallet.getBalance();
    transferAmountEl.value = '';
    transferModal.show();
});

if (confirmTransferBtn) {
    confirmTransferBtn.addEventListener('click', () => {
        const contact = Wallet.getContacts()[selectedContactIndex];
        const amount = parseFloat(transferAmountEl.value);
        if (!contact) {
            showNotification('Seleccione un contacto.', 'danger', 2200);
            return;
        }
        if (isNaN(amount) || amount <= 0) {
            showNotification('Ingrese un monto válido.', 'danger', 2200);
            return;
        }
        if (amount > Wallet.getBalance()) {
            showNotification('Saldo insuficiente.', 'danger', 2600);
            return;
        }

        // Procesar transferencia
        Wallet.setBalance(Wallet.getBalance() - amount);
        Wallet.addTransaction({
            type: 'Transferencia',
            amount: -amount,
            description: `Transferencia a ${contact.name}`
        });

        transferModal.hide();
        showNotification('Transferencia realizada con éxito.', 'success', 1800);
        setTimeout(() => { location.assign('menu.html'); }, 900);
    });
}

// Render inicial
renderContacts();
