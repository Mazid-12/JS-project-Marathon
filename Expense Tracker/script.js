const balance = document.getElementById('totalBalance');
const expense = document.getElementById("expense");
const income = document.getElementById("income");
const typeTransaction = document.getElementById('type');
const history = document.getElementById('history');
const nameTransaction = document.getElementById('nameTrans');
const amountTransaction = document.getElementById("amountTrans");
const submitBtn = document.getElementById("button");
const form = document.getElementById("form");

let new_amount;
let new_name;
let new_balance;
let new_total;
let storedArray = []


if(localStorage.length !== 0){
    load_data();
}

form.addEventListener('submit', update_app);

function update_app(){
    event.preventDefault();
    new_amount = Number(amountTransaction.value);
    new_name = nameTransaction.value;
    if(typeTransaction.value === 'income'){
        console.log(new_amount);
        new_balance = Number(balance.textContent.slice(1)) + new_amount;
        new_total = Number(income.textContent.slice(1)) + new_amount;
        console.log(new_amount);
        update_balance(new_balance);
        update_board(income, new_total);
        display_history('+', new_amount, new_name);
    }else if(typeTransaction.value === 'expense'){
        new_balance = Number(balance.textContent.slice(1)) - new_amount;
        new_total = Number(expense.textContent.slice(1)) + new_amount;
        update_balance(new_balance);
        update_board(expense, new_total);
        display_history('-', new_amount, new_name);
    }
    store_data(typeTransaction.value, new_amount, new_name);
    form.reset();
}

function update_balance(amount){
    balance.textContent = `$${amount}`
}

function update_board(type, amount){;
    amount = `$${amount}`;
    type.textContent = amount;
}

function display_history(sign, amount, name ){
    const historyName = document.createElement('p');
    const historyAmount = document.createElement('p');
    const historyBand = document.createElement('div');
    historyAmount.textContent = `${sign} $${amount}`;
    historyName.textContent = name;

    historyBand.appendChild(historyName);
    historyBand.appendChild(historyAmount);

    historyBand.classList.add('transaction');
    if(sign === '-'){
        historyBand.style.borderRightColor = 'red'
    }
    history.appendChild(historyBand);

}

function store_data(typeTran, amountTran, nameTran){
    let transactionObject = {};
    transactionObject.type = typeTran;
    transactionObject.amount = amountTran;
    transactionObject.name = nameTran;
    if(localStorage.length !==0){
        storedArray = JSON.parse(localStorage.getItem('transaction'));
    }
    storedArray.push(transactionObject);
    localStorage.setItem('transaction', JSON.stringify(storedArray));
}

function load_data(){
    storedArray = JSON.parse(localStorage.getItem('transaction')); 
    let totalIncome = 0;
    let totalExpense = 0;

    storedArray.forEach(transaction => {
        if(transaction.type === 'income'){
            totalIncome += Number(transaction.amount);
            //console.log(transaction.amount);
            display_history('+', transaction.amount, transaction.name);
        }else if(transaction.type === 'expense'){
            totalExpense += Number(transaction.amount);
            //console.log(transaction.amount)
            display_history('-', transaction.amount, transaction.name);
        }
    });

    let totalBalance = totalIncome - totalExpense;

    update_board(income, totalIncome);
    update_board(expense, totalExpense);
    update_balance(totalBalance);
    
}
