const balance = document.getElementById('totalBalance');
const expense = document.getElementById("expense");
const income = document.getElementById("income");
const typeTransaction = document.getElementById('type');
const history = document.getElementById('history');
const nameTransaction = document.getElementById('nameTrans');
const amountTransaction = document.getElementById("amountTrans");
const submitBtn = document.getElementById("button");
const form = document.getElementById("form");

form.addEventListener('submit', check_type);

function check_type(){
    event.preventDefault();
    if (typeTransaction.value === 'income'){
        let new_balance = Number(balance.textContent.slice(1)) + Number(amountTransaction.value);
        new_balance = `$${new_balance}`;
        balance.textContent = new_balance;
        
        let new_income = Number(income.textContent.slice(1)) + Number(amountTransaction.value);
        new_income = `$${new_income}`;
        income.textContent = new_income;
        add_history('+')

    }else if(typeTransaction.value === 'expense'){
        let new_balance = Number(balance.textContent.slice(1)) - Number(amountTransaction.value);
        new_balance = `$${new_balance}`;
        balance.textContent = new_balance;

        let new_expense = Number(expense.textContent.slice(1)) + Number(amountTransaction.value);
        new_expense = `$${new_expense}`;
        expense.textContent = new_expense;
        add_history('-')
    }
    form.reset();

}

function add_history(sign){
    const historyName = document.createElement('p');
    const historyAmount = document.createElement('p');
    const historyBand = document.createElement('div');
    historyAmount.textContent = `${sign} $${amountTransaction.value}`;
    historyName.textContent = nameTransaction.value;

    historyBand.appendChild(historyName);
    historyBand.appendChild(historyAmount);

    historyBand.classList.add('transaction');

    history.appendChild(historyBand);

}