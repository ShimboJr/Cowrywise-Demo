// Sign Up

const email = document.getElementById("emailInput");
const emailLabel = document.getElementById("emailLabel");
const errorMessage = document.getElementById("errorMSG");

// Object Declaration
const userData = {
    email: '',
    fname: '',
    lname: '',
    username: '',
    phone: '',
    password: '',
    pin: '',
    balance: ''
}
const allUsername = JSON.parse(localStorage.getItem('usernameList')) || [];

// Email Validator

function isEmailValid(mail) {
    if (typeof mail !== 'string') {
        return false;
    }

    const trimmedEmail = mail.trim().toLowerCase();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(trimmedEmail);
}

function isPasswordValid(password) {
      const regex =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

      return regex.test(password);
}

const invEmail = () => {
    email.style.border = "1px solid #FB2C56";
    emailLabel.style.color = "#FB2C56";
    errorMessage.style.display = "block";
    errorMessage.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
                                <!-- Red Circle -->
                                <circle cx="16" cy="16" r="8" fill="#FB2C56" />

                                    <!-- Exclamation Line -->
                                <rect x="15.6" y="9.5" width="0.8" height="8" rx="0.4" fill="white" />

                                    <!-- Exclamation Dot -->
                                <circle cx="16" cy="20.5" r="0.8" fill="white" />
                            </svg> Email Username is missing`;
    email.focus();
    setTimeout(() => {
        errorMessage.style.display = "none";
        email.style.border = "1px solid #0066F5FF";
        emailLabel.style.color = "#0066F5FF";
    }, 3000)
}

const empEmail = () => {
    email.style.border = "1px solid #FB2C56";
    emailLabel.style.color = "#FB2C56";
    errorMessage.style.display = "block";
    errorMessage.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
                                <!-- Red Circle -->
                                <circle cx="16" cy="16" r="8" fill="#FB2C56" />

                                    <!-- Exclamation Line -->
                                <rect x="15.6" y="9.5" width="0.8" height="8" rx="0.4" fill="white" />

                                    <!-- Exclamation Dot -->
                                <circle cx="16" cy="20.5" r="0.8" fill="white" />
                            </svg> Enter your email address`;
    email.focus();
    setTimeout(() => {
        errorMessage.style.display = "none";
        email.style.border = "1px solid #0066F5FF";
        emailLabel.style.color = "#0066F5FF";
    }, 3000)
}

const btnSignUp = () => {
    if (email.value === "") {
        empEmail();
    } else {
        errorMessage.innerHTML = "";
        if (email.value.charAt(0) === '@') {
            invEmail();
        } else if (isEmailValid(email.value.toLowerCase()) === true) {

            const cUser = localStorage.getItem(`${email.value.trim().toLowerCase()}`);
            const cUs = JSON.parse(cUser);

            if (cUser && cUs.password !== "" && cUs.pin === "") {
                localStorage.setItem('currentUser', email.value.trim());
                email.value = '';
                window.location.href = 'create-pin.html';
            } else if (cUser && cUs.password !== "" && cUs.pin !== "") {
                alert('User Already Exist');
                email.value = '';
                window.location.href = 'signin.html';
            } else {
                    userData.email = email.value;
                    userData.username = `@${email.value.slice(0,email.value.indexOf('@'))}`;

                    const userDataString = JSON.stringify(userData);
                    localStorage.setItem(`${userData.email}`, userDataString);
                    localStorage.setItem('currentUser', email.value.trim());
                    email.value = '';
                    window.location.href = "create-account.html";
            }
        } else {
            errorMessage.style.display = "block";
            errorMessage.innerHTML = `Your email ${email.value} is Not Valid`
            email.focus();
            setTimeout(() => {
                errorMessage.style.display = "none";
                email.style.border = "1px solid #0066F5FF";
                emailLabel.style.color = "#0066F5FF";
            }, 3000)
        }
    }
}

const fName = document.getElementById('fnameInput');
const lName = document.getElementById('lnameInput');
const uName = document.getElementById('unameInput');
const phoneNo = document.getElementById('phoneInput');
const pass = document.getElementById('password');

  fName.addEventListener('input', () => {
      fName.value = fName.value.replace(/[^a-zA-Z]/g, '');
  });
  lName.addEventListener('input', () => {
      lName.value = lName.value.replace(/[^a-zA-Z ]/g, '');
  });

const btnCreate = () => {
    if (fName.value === '' || lName.value === '' || uName.value === '' || phoneNo.value === '' || pass.value === '') {
        alert('Please fill all field')
    } else if (uName.value.charAt(0) !== '@') {
        alert(`Input Username as @${uName.value}`)
    } else if (isPasswordValid(pass.value) === false) {
        alert(`Enter a valid password\nMust be Alphanumeric and contain at least one special character`)
    } else if (allUsername.includes(uName.value.trim())) {
        alert('Username Taken Already');
        // console.log(allUsername.indexOf(uName.value.trim()));
    } else {
        const cUser = localStorage.getItem('currentUser');

        userData.email = cUser;
        userData.fname = fName.value;
        userData.lname = lName.value;
        userData.username = uName.value.trim();
        userData.phone = phoneNo.value;
        userData.password = pass.value;
        userData.balance = '0.00';

        allUsername.push(uName.value.trim());
        localStorage.setItem('usernameList', JSON.stringify(allUsername));

        const userDataString = JSON.stringify(userData);
        localStorage.setItem(`${cUser}`, userDataString);

        fName.value = "";
        lName.value = "";
        uName.value = "";
        phoneNo.value = "";
        window.location.href = 'create-pin.html';
    }

}