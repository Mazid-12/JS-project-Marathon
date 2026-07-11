const balance = document.getElementById('totalBalance');
const expense = document.getElementById("expense");
const income = document.getElementById("income");
const typeTransaction = document.getElementById('type');
const history = document.getElementById('history');
const nameTransaction = document.getElementById('nametrans');
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

    }else if(typeTransaction.value === 'expense'){
        let new_balance = Number(balance.textContent.slice(1)) - Number(amountTransaction.value);
        new_balance = `$${new_balance}`;
        balance.textContent = new_balance;

        let new_expense = Number(expense.textContent.slice(1)) + Number(amountTransaction.value);
        new_expense = `$${new_expense}`;
        expense.textContent = new_expense;
    }
    form.reset();

    add_history();

}

function add_history(){

}