'use strict';


    
let labelBalance = document.querySelector('.balance__value');
let labelDate = document.querySelector('.date');
let labelTimer = document.querySelector('.timer');

let containerMovements = document.querySelector('.movements');

let btnTransfer = document.querySelector('.form__btn--transfer');
let btnLoan = document.querySelector('.form__btn--loan');
let btnClose = document.querySelector('.form__btn--close');
let btnLogout = document.querySelector('.logout');

let inputTransferTo = document.querySelector('.form__input--to');
let inputTransferAmount = document.querySelector('.form__input--amount');
let inputLoanAmount = document.querySelector('.form__input--loan-amount');
let inputCloseUsername = document.querySelector('.form__input--user');
let inputClosePin = document.querySelector('.form__input--pin');

let accounts = JSON.parse(localStorage.getItem("AllAccounts"));
let yourAccount = sessionStorage.getItem("youraccount");

let popUpHolder = document.querySelector(".popUpHolder");

if(yourAccount >= 0)
{
    refresh(yourAccount);
}
else
{
    window.location.href = "index.html";
}


// Transfer Ammount
btnTransfer.addEventListener("click", function(e)
{
e.preventDefault();
transfer(inputTransferTo.value, inputTransferAmount.value);
});

// Delet Account
btnClose.addEventListener("click", function(e)
{
e.preventDefault();
closeAccount(inputCloseUsername.value, inputClosePin.value);
});

// Request Loan
btnLoan.addEventListener("click", function(e)
{
    e.preventDefault();
    let Amount = Number(inputLoanAmount.value);
    if(Amount > 0 && accounts[yourAccount].movements.some(mov => mov >= Amount / 10))
    {
        accounts[yourAccount].movements.push(Amount);
        localStorage.setItem("AllAccounts" , JSON.stringify(accounts));
        refresh(yourAccount);
    }
    else
    {
        popUpHolder.insertAdjacentHTML("afterbegin", popUp(`Bank can't grant you loan of ${Amount} sorry`));
    }
    inputLoanAmount.value = "";
});

// LogOut
btnLogout.addEventListener("click", function(e)
{
    yourAccount = -1;
    sessionStorage.setItem("youraccount", yourAccount);
    window.location.href = "index.html";
});



function refresh(yourAccountIndes)
{
    displayMovements(accounts[yourAccountIndes].movements);
    showTotalAmmount(accounts[yourAccountIndes].movements);
}
function displayMovements(movement)
{
  containerMovements.innerHTML = "";
  movement.forEach(function(value, i)
  {
    let type = value > 0 ? 'deposit' : 'withdrawal';
    let html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${i+1} ${type}</div>
      <div class="movements__value">${value} RS</div>
    </div>
    `;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  })
};
function showTotalAmmount(movement)
{
    let total;
    if(movement.length > 0)
    {
        total = movement.reduce( function(total, value){ return total + value });
    }
    else
    {
        total = "0000";
    }
    labelBalance.textContent = `${total} RS`;
}

function transfer(to, amount)
{
    let accToTransfer;
    
    if(amount > 0)
    {
        accToTransfer = accounts.find((accounts) => accounts.userName == to);
    }
    else
    {
        popUpHolder.insertAdjacentHTML("afterbegin", popUp("Amount must be gratter than 0"));
        return
    }  

    if(accToTransfer)
    {
        if(accounts[yourAccount].movements.reduce((ans, value) => {return ans + value}) >= amount)
        {
            accToTransfer.movements.push(Number(amount));
            accounts[yourAccount].movements.push(Number(-amount));
            popUpHolder.insertAdjacentHTML("afterbegin", popUp(`RS ${amount} transfered to ${accToTransfer.userName} account`));
            localStorage.setItem("AllAccounts" , JSON.stringify(accounts));
            refresh(yourAccount);
        }
        else
        {
            popUpHolder.insertAdjacentHTML("afterbegin", popUp("low balance can't transfer ammount :("));
        }
    }
    else
    {
        popUpHolder.insertAdjacentHTML("afterbegin", popUp("user does not exits"));
    }
}
function closeAccount(id, pin)
{
    let accountIndex = accounts.findIndex(acc=> {return acc.userName == id && acc.password == pin} );
    if(accountIndex >= 0)
    {
        accounts.splice(accountIndex, 1);
        popUpHolder.insertAdjacentHTML("afterbegin", popUp("User deleted successfuly :)"));
        localStorage.setItem("AllAccounts", JSON.stringify(accounts));
        refresh();
    }
    else
    {
        popUpHolder.insertAdjacentHTML("afterbegin", popUp(" User does not exist "));
    }
}




function popUp(alert)
{
    return `<div class="popUp"> <span> ${alert} </span> </div>`;
}