'use strict';


    
let labelBalance = document.querySelector('.balance__value');
let labelDate = document.querySelector('.date');
let labelTimer = document.querySelector('.timer');

let containerMovements = document.querySelector('.movements');
let popUpHolder = document.querySelector(".popUpHolder");

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

let date = new Date();
let day = `${date.getDate()}`.padStart(2,0);
let month = `${date.getMonth()}`.padStart(2,0);
let year = `${date.getFullYear()}`;


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
    let Amount =Math.floor(Number(inputLoanAmount.value));
    if(Amount > 0 && accounts[yourAccount].movements.some(mov => mov >= Amount / 10))
    {
        accounts[yourAccount].movements.push(Amount);
        accounts[yourAccount].dates.push(`${day}-${month}-${year}, ${date.getHours()}:${date.getMinutes()} `);
        localStorage.setItem("AllAccounts" , JSON.stringify(accounts));
        refresh(yourAccount);
    }
    else
    {
        popUpHolder.insertAdjacentHTML("afterbegin", popUp(`Bank can't grant you loan of ${Number(Amount).toFixed(2)} sorry`));
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
    inputTransferTo.value = "";
    inputTransferAmount.value = "";
    inputLoanAmount.value = "";
    inputCloseUsername.value = "";
    inputClosePin.value = "";
}

function displayMovements(movement)
{
  containerMovements.innerHTML = "";
  labelDate.textContent = ` ${day}/${month}/${year}, ${date.getHours()}:${date.getMinutes()}`;

  movement.forEach(function(value, i)
  {
    let type = value > 0 ? 'deposit' : 'withdrawal';
    let html = `
    <div class="movements__row">
        <div>
            <div class="movements__type movements__type--${type}">${i+1} ${type}</div>
            <div class="movements__date"> ${accounts[yourAccount].dates[i]} </div>
        </div>
      <div class="movements__value">${Number(value).toFixed(2)} RS</div>
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
        total = movement.reduce( function(total, value){ return total + Number(value) }).toFixed(2);
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
    
    if(amount >= 1)
    {
        accToTransfer = accounts.findIndex((accounts) => accounts.userName == to);
    }
    else
    {
        popUpHolder.insertAdjacentHTML("afterbegin", popUp("Amount must be gratter than 0"));
        return
    }  

    if(accToTransfer >= 0)
    {
        if(accounts[yourAccount].movements.reduce((ans, value) => {return Number(ans + value)}) >= amount)
        {
            accounts[accToTransfer].movements.push(Number(Math.floor(amount)));
            accounts[accToTransfer].dates.push(`${day}-${month}-${year}, ${date.getHours()}:${date.getMinutes()} `);
            accounts[yourAccount].movements.push(Number(-Math.floor(amount)));
            accounts[yourAccount].dates.push(`${day}-${month}-${year}, ${date.getHours()}:${date.getMinutes()} `);
            popUpHolder.insertAdjacentHTML("afterbegin", popUp(`RS ${Math.floor(Number(amount)).toFixed(2)} transfered to ${accounts[accToTransfer].userName} account`));
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
        localStorage.setItem("AllAccounts", JSON.stringify(accounts));
        yourAccount = -1;
        sessionStorage.setItem("youraccount", yourAccount);
        window.location.href = "index.html";
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
