/**
 * Alke Wallet - Lógica Principal
 * Maneja el estado de la aplicación usando localStorage y funciones compartidas de UI
 */

// Constantes
const DATA_KEYS = {
    BALANCE: 'wallet_balance',
    TRANSACTIONS: 'wallet_transactions',
    CONTACTS: 'wallet_contacts',
    USER: 'wallet_user'
};

const DEFAULT_DATA = {
    BALANCE: 1250.00,
    TRANSACTIONS: [],
    CONTACTS: []
};

// Utilidades
const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(amount);
};

const getFromStorage = (key, defaultVal) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultVal;
};

const saveToStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
};

// Gestión de Estado
const Wallet = {
    getBalance: () => getFromStorage(DATA_KEYS.BALANCE, DEFAULT_DATA.BALANCE),
    setBalance: (amount) => saveToStorage(DATA_KEYS.BALANCE, amount),

    getTransactions: () => getFromStorage(DATA_KEYS.TRANSACTIONS, DEFAULT_DATA.TRANSACTIONS),
    addTransaction: (transaction) => {
        const transactions = Wallet.getTransactions();
        transactions.unshift({
            id: Date.now(),
            date: new Date().toLocaleDateString(),
            ...transaction
        });
        saveToStorage(DATA_KEYS.TRANSACTIONS, transactions);
    },

    getContacts: () => getFromStorage(DATA_KEYS.CONTACTS, DEFAULT_DATA.CONTACTS),
    addContact: (contact) => {
        const contacts = Wallet.getContacts();
        contacts.push(contact);
        saveToStorage(DATA_KEYS.CONTACTS, contacts);
    },

    login: (email, password) => {
        if (email === 'admin@alkewallet.com' && password === '123456') {
            localStorage.setItem(DATA_KEYS.USER, JSON.stringify({ email, name: 'Admin User' }));
            return true;
        }
        return false;
    },

    logout: () => {
        localStorage.removeItem(DATA_KEYS.USER);
        window.location.href = 'login.html';
    },

    currentUser: () => {
        return getFromStorage(DATA_KEYS.USER, null);
    }
};

// Verificación de autenticación
if (!window.location.pathname.includes('login.html') && !window.location.pathname.includes('index.html')) {
    if (!Wallet.currentUser()) {
        window.location.href = 'login.html';
    }
}

// Mostrar notificaciones en pantalla (reemplaza alert)
function showNotification(message, type = 'success', timeout = 2500) {
    let container = document.getElementById('notification-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'notification-container';
        container.style.position = 'fixed';
        container.style.top = '16px';
        container.style.right = '16px';
        container.style.zIndex = 1060;
        document.body.appendChild(container);
    }

    const alert = document.createElement('div');
    alert.className = `alert alert-${type} alert-dismissible fade show`;
    alert.role = 'alert';
    alert.style.minWidth = '240px';
    alert.innerHTML = `${message}`;

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'btn-close';
    btn.setAttribute('data-bs-dismiss', 'alert');
    btn.setAttribute('aria-label', 'Cerrar');

    alert.appendChild(btn);
    container.appendChild(alert);

    if (timeout > 0) {
        setTimeout(() => {
            try { bootstrap.Alert.getOrCreateInstance(alert).close(); } catch (e) { alert.remove(); }
        }, timeout);
    }
    return alert;
}


