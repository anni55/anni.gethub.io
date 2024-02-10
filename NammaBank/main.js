'use strict';

// Switch between LogIn and SignIn
    let toSignin = document.getElementById("toSignin");
    let toLogin = document.getElementById("toLogin");
    let login_div = document.querySelector(".login_div");
    let signin_div = document.querySelector(".signin_div");
    toSignin.addEventListener("click", ()=> { refresh(); });
    toLogin.addEventListener("click", ()=> { refresh(); });

    function refresh()
    {
        login_div.classList.toggle("hide");
        logInUserName.value = "";
        logInPassword.value = "";
        logInSubmit.value = "";
        signinFullName.value = "";
        signinUserName.value = "";
        signinPassword.value = "";
        signinConformPassword.value = "";
        phone.value = "";
        Email.value = "";
        signin_div.classList.toggle("hide");
    }
//



// Regex and SignIn button click
    let userAndpassword_regx = /^[a-zA-Z0-9/@/#]{4,15}$/;
    let name_regx = /^[a-z A-Z]{2,15}$/;
    let phone_regx = /^[0-9]{10}$/;
    let email_regx = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]{3,15}$/;
    
    let logInUserName = document.getElementById("id");
    let logInPassword = document.getElementById("password");
    let logInSubmit = document.getElementById("logInSubmit");
    let signinFullName = document.getElementById("signinFullName");
    let signinUserName = document.getElementById("signinUserName");
    let signinPassword = document.getElementById("signinPassword");
    let signinConformPassword = document.getElementById("signinConformPassword");
    let phone = document.getElementById("phone");
    let Email = document.getElementById("Email");
    let SignInSubmit = document.getElementById("signInSubmit");

    // LogIn and SignIn Regex
        function usernameRegX()
        {
            if(logInUserName.value == "")
            {
                logInUserName.classList.remove("wrong");
                logInUserName.classList.remove("rignt");
            }
            else
            {
                if(userAndpassword_regx.test(logInUserName.value))
                {
                    logInUserName.classList.add("rignt");
                    logInUserName.classList.remove("wrong");
                    LogIncheck();
                }
                else
                {
                    logInUserName.classList.remove("rignt");
                    logInUserName.classList.add("wrong");
                    LogIncheck();
                }
            }
        }
        function passwordRegX()
        {
            if(logInPassword.value == "")
            {
                logInPassword.classList.remove("wrong");
                logInPassword.classList.remove("rignt");
            }
            else
            {
                if(userAndpassword_regx.test(logInPassword.value))
                {
                    logInPassword.classList.add("rignt");
                    logInPassword.classList.remove("wrong");
                    LogIncheck();
                }
                else
                {
                    logInPassword.classList.remove("rignt");
                    logInPassword.classList.add("wrong");
                    LogIncheck();
                }
            }
        }
        function LogIncheck()
        {
            if(userAndpassword_regx.test(logInUserName.value) && userAndpassword_regx.test(logInPassword.value))
            {
                logInSubmit.disabled = false;
            }
            else
            {
                logInSubmit.disabled = true;
            }
        }
        
        function signinFullNameRegX()
        {
            if(signinFullName.value == "")
            {
                signinFullName.classList.remove("rignt");
                signinFullName.classList.remove("wrong");
            }
            else
            {
                if(name_regx.test(signinFullName.value))
                {
                    signinFullName.classList.add("rignt");
                    signinFullName.classList.remove("wrong");
                    signInCheck();
                }
                else
                {
                    signinFullName.classList.remove("rignt");
                    signinFullName.classList.add("wrong");
                    signInCheck();
                }
            }
        }
        function signinUserNameRegX()
        {
            if(signinUserName.value == "")
            {
                signinUserName.classList.remove("rignt");
                signinUserName.classList.remove("wrong");
            }
            else
            {
                if(name_regx.test(signinUserName.value))
                {
                    signinUserName.classList.add("rignt");
                    signinUserName.classList.remove("wrong");
                    signInCheck();
                }
                else
                {
                    signinUserName.classList.remove("rignt");
                    signinUserName.classList.add("wrong");
                    signInCheck();
                }
            }
        }
        function signinPasswordRegX()
        {
            if(signinPassword.value == "")
            {
                signinPassword.classList.remove("rignt");
                signinPassword.classList.remove("wrong");
            }
            else
            {
                if(userAndpassword_regx.test(signinPassword.value))
                {
                    signinPassword.classList.add("rignt");
                    signinPassword.classList.remove("wrong");
                    signInCheck();
                }
                else
                {
                    signinPassword.classList.remove("rignt");
                    signinPassword.classList.add("wrong");
                    signInCheck();
                }
            }
        }
        function signinConformPasswordRegX()
        {
            if(signinConformPassword.value == "")
            {
                signinConformPassword.classList.remove("rignt");
                signinConformPassword.classList.remove("wrong");
            }
            else
            {
                if(signinPassword.value == signinConformPassword.value)
                {
                    signinConformPassword.classList.add("rignt");
                    signinConformPassword.classList.remove("wrong");
                    signInCheck();
                }
                else
                {
                    signinConformPassword.classList.remove("rignt");
                    signinConformPassword.classList.add("wrong");
                    signInCheck();
                }
            }
        }
        function phoneRegX()
        {
            if(phone.value == "")
            {
                phone.classList.remove("rignt");
                phone.classList.remove("wrong");
            }
            else
            {
                if(phone_regx.test(phone.value))
                {
                    phone.classList.add("rignt");
                    phone.classList.remove("wrong");
                    signInCheck();
                }
                else
                {
                    phone.classList.remove("rignt");
                    phone.classList.add("wrong");
                    signInCheck();
                }
            }
        }
        function EmailRegX()
        {
            if(Email.value == "")
            {
                Email.classList.remove("rignt");
                Email.classList.remove("wrong");
            }
            else
            {
                if(email_regx.test(Email.value))
                {
                    Email.classList.add("rignt");
                    Email.classList.remove("wrong");
                    signInCheck();
                }
                else
                {
                    Email.classList.remove("rignt");
                    Email.classList.add("wrong");
                    signInCheck();
                }
            }
        }
        function signInCheck()
        {
            if( name_regx.test(signinFullName.value) && name_regx.test(signinUserName.value) && userAndpassword_regx.test(signinPassword.value) && signinPassword.value == signinConformPassword.value && phone_regx.test(phone.value) && email_regx.test(Email.value))
            {
                SignInSubmit.disabled = false;
            }
            else
            {
                SignInSubmit.disabled = true;
            }
        }
    //
    
    // SignIn button click
        let accounts;
        if(localStorage.getItem("AllAccounts"))
        {
            accounts = JSON.parse(localStorage.getItem("AllAccounts"));
            console.log(accounts);
        }
        else
        {
            accounts = [];
        }

        function addAccounts()
        {
            accounts.push({owner: `${signinFullName.value}`, movements: [100,20], password: `${signinPassword.value}`, userName: `${signinUserName.value}`, });
            localStorage.setItem("AllAccounts", JSON.stringify(accounts));
            refresh();
            document.querySelector(".popUpHolder").insertAdjacentHTML("afterbegin", popUp("Account created successfully"));
        }
        function fundAccount()
        {
            let yourAccount = accounts.findIndex((account)=>{ return account.userName == logInUserName.value && account.password == logInPassword.value});
            if(yourAccount >= 0)
            {
                sessionStorage.setItem("youraccount", yourAccount);
                logInUserName.value = "";
                logInPassword.value = "";
                window.location.href = "next.html";
            }
            else
            {
                document.querySelector(".popUpHolder").insertAdjacentHTML("afterbegin", popUp("User not found"));
            }
        }



        function popUp(alert)
        {
            return `<div class="popUp"> <span> ${alert} </span> </div>`;
        }
        // function resteInputFields()
        // {
        //     logInUserName.value = "";
        //     logInPassword.value = "";
        //     logInSubmit.value = "";
        //     signinFullName.value = "";
        //     signinUserName.value = "";
        //     signinPassword.value = "";
        //     signinConformPassword.value = "";
        //     phone.value = "";
        //     Email.value = "";
        // }

        // localStorage.clear()
        // alert("clear");
    //
//