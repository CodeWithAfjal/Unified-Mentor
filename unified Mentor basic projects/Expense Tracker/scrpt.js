// Get elements from the DOM
const transactionForm = document.getElementById('transaction-form');
const transactionsList = document.getElementById('transactions-list');
const totalIncome = document.getElementById('total-income');
const totalExpenses = document.getElementById('total-expenses');
const netIncome = document.getElementById('net-income');

let transactions = [];

// Function to update the display of transactions
function updateTransactionsList() {
    transactionsList.innerHTML = '';

    let incomeTotal = 0;
    let expenseTotal = 0;

    transactions.forEach((transaction, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${transaction.date}</span>
            <span>${transaction.description}</span>
            <span>${transaction.category}</span>
            <span>$${transaction.amount}</span>
            <button onclick="deleteTransaction(${index})">Delete</button>
        `;
        transactionsList.appendChild(li);

        // Calculate totals based on type of transaction
        if (transaction.type === 'income') {
            incomeTotal += parseFloat(transaction.amount);
        } else {
            expenseTotal += parseFloat(transaction.amount);
        }
    });

    // Update the summary
    totalIncome.innerText = `$${incomeTotal}`;
    totalExpenses.innerText = `$${expenseTotal}`;
    netIncome.innerText = `$${incomeTotal - expenseTotal}`;
}

// Function to handle form submission
transactionForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const date = document.getElementById('date').value;
    const description = document.getElementById('description').value;
    const category = document.getElementById('category').value;
    const amount = document.getElementById('amount').value;

    // Validate input
    if (!date || !description || !category || !amount) {
        alert('Please fill in all fields');
        return;
    }

    // Add transaction (Income or Expense)
    const type = amount < 0 ? 'expense' : 'income'; // Treat negative amounts as expenses
    transactions.push({ date, description, category, amount, type });

    // Reset form and update list
    transactionForm.reset();
    updateTransactionsList();
});

// Function to delete a transaction
function deleteTransaction(index) {
    transactions.splice(index, 1);
    updateTransactionsList();
}
