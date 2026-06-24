const fetchInfo = () => {
    if (!localStorage.currentUser) {
        window.location.href = 'signin.html';
    } else {
        setTimeout(() => {
            document.getElementById('loader').style.display = 'none';
            document.getElementById('app').style.display = 'block';
        }, 1000);
    }
}

const logout = () => {
    localStorage.removeItem('currentUser');
    alert(`Logout successfully\nProceed to Login`);

    window.location.href = 'signin.html';
}

const changeUsername = () => {
    const uName = document.getElementById('unameProfile');
    const conf = confirm('Are you sure you want to change your username?')
    if (conf) {
        const allUsername = JSON.parse(localStorage.getItem('usernameList'));
        if (uName.value.charAt(0) !== '@') {
            alert(`Input Username as @${uName.value}`)
        } else if (allUsername.includes(uName.value.trim())) {
            alert('Username Taken Already');
        } else {
            let index = allUsername.indexOf(`${uName.value.trim()}`);
            const cUser = localStorage.getItem('currentUser');

            const uD = JSON.parse(localStorage.getItem(`${cUser}`));
            uD.username = uName.value;
            localStorage.setItem(`${cUser}`, JSON.stringify(uD));

            allUsername.splice(index, 1, uName.value.trim());
            localStorage.setItem('usernameList', JSON.stringify(allUsername));

            alert('Username Changed Successfully...');
        }
    } else {

    }
}

    document.getElementById('openModalPhone').addEventListener('click', () => {
        const pProfile = document.getElementById('phoneProfile');
        const pNow = document.getElementById('phoneIn')
        pNow.value = `0${pProfile.textContent.slice(4)}`;
});

const changePhone = () => {
    const pNow = document.getElementById('phoneIn');
    const pProfile = document.getElementById('phoneProfile');

    if (pNow.value.charAt(0) !== '0' || pNow.value.length < 11) {
        alert('Phone Number is invalid')
    } else {
        const cUser = localStorage.getItem('currentUser');

        const uD = JSON.parse(localStorage.getItem(`${cUser}`));
        uD.phone = pNow.value;
        localStorage.setItem(`${cUser}`, JSON.stringify(uD));
        alert('Phone Number Changed Successfully...');

        pProfile.innerHTML = `+234${pNow.value.slice(1)}`

        const modalElement = document.getElementById('myModal');

        const modal = bootstrap.Modal.getOrCreateInstance(modalElement);

        modal.hide();

    }
}

function isPasswordValid(password) {
    const regex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

    return regex.test(password);
}

const changePass = () => {
    const pass = document.getElementById('password');
    const Cpass = document.getElementById('Cpassword');
    const cUser = localStorage.getItem('currentUser');

    const uD = JSON.parse(localStorage.getItem(`${cUser}`));

    if (pass.value.trim() === '' || Cpass.value.trim() === '') {
        alert('Please fill all field');
    } else if (uD.password !== pass.value.trim()) {
        alert('Old Password does not match');
    } else if (pass.value.trim() === Cpass.value.trim()) {
        alert(`Old Password and New Password match\nInput a different New Password`)
    } else if (isPasswordValid(Cpass.value) === false) {
        alert(`Enter a valid password\nMust be Alphanumeric and contain at least one special character`)
    } else {
        uD.password = Cpass.value.trim();
        localStorage.setItem(`${cUser}`, JSON.stringify(uD));
        alert('Password Changed Successfully...');

        const modalElement = document.getElementById('myModalPass');

        const modal = bootstrap.Modal.getOrCreateInstance(modalElement);

        modal.hide();
    }
}

const p1 = document.getElementById('pNo1');
const p2 = document.getElementById('pNo2');
const p3 = document.getElementById('pNo3');
const p4 = document.getElementById('pNo4');

const checkPIN = () => {
    const cUser = localStorage.getItem('currentUser');
    const uD = JSON.parse(localStorage.getItem(`${cUser}`));

    const pA = `${p1.value}${p2.value}${p3.value}${p4.value}`

    if (pA.length < 4) {
        alert('Please input your Old Pin')
        p4.focus();
    } else {
        if (pA.trim() === uD.pin) {
            p1.value = '';
            p2.value = '';
            p3.value = '';
            p4.value = '';

            setTimeout(() => {
                const modalElement = document.getElementById('myModalPinA');
                const modal2 = bootstrap.Modal.getOrCreateInstance(modalElement);
                modal2.hide();

                const modal = new bootstrap.Modal(document.getElementById('myModalPinB'));
                modal.show();
            },1000)

        } else {
            alert('Incorrect Old PIN')
            p4.focus();
        }
    }

}


//Change PIN

const pin1 = document.getElementById('pinNo1');
const pin2 = document.getElementById('pinNo2');
const pin3 = document.getElementById('pinNo3');
const pin4 = document.getElementById('pinNo4');

const Cpin1 = document.getElementById('CpinNo1');
const Cpin2 = document.getElementById('CpinNo2');
const Cpin3 = document.getElementById('CpinNo3');
const Cpin4 = document.getElementById('CpinNo4');

const changePIN = () => {
    const pinA = `${pin1.value}${pin2.value}${pin3.value}${pin4.value}`
    const pinB = `${Cpin1.value}${Cpin2.value}${Cpin3.value}${Cpin4.value}`

    if (pinA === "" || pinB === "" || pinA.length < 4 || pinB.length < 4) {
        alert('Please input your Pin')
    } else if (pinA !== pinB) {
        alert('Pin does not match')
        Cpin4.focus();
    } else {
        const cUser = localStorage.getItem('currentUser');

        const uD = JSON.parse(localStorage.getItem(`${cUser}`))
        uD.pin = pinA;
        localStorage.setItem(`${cUser}`, JSON.stringify(uD));

        alert('PIN changed successfully...');
        pin1.value = '';
        pin2.value = '';
        pin3.value = '';
        pin4.value = '';
        Cpin1.value = '';
        Cpin2.value = '';
        Cpin3.value = '';
        Cpin4.value = '';

        setTimeout(() => {
            const modalElement = document.getElementById('myModalPinB');
            const modal = bootstrap.Modal.getOrCreateInstance(modalElement);
            modal.hide();
        },500)
    }
}


//Terminate Account

const closeAccount = () => {
    const cUser = localStorage.getItem('currentUser');
    const uD = JSON.parse(localStorage.getItem(`${cUser}`));
    const allUsername = JSON.parse(localStorage.getItem('usernameList'));

    const  conf = confirm('Are you sure you want to Terminate your Account?')
    if (conf) {
        const prompting = prompt(`Enter your account password to confirm deletion:`);
        if (prompting === uD.password) {
            let index = allUsername.indexOf(`${uD.username}`);
            allUsername.splice(index, 1);
            localStorage.setItem('usernameList', JSON.stringify(allUsername));

            localStorage.removeItem(`${cUser}`)
            localStorage.removeItem('currentUser');
            alert('Account Terminated Successfully...')

            setTimeout(() => {
                window.location.href = 'signin.html';
            }, 1000)
        } else {
            alert('Incorrect password, Termination cancelled...');
        }
    } else {

    }
}

const payAmt = document.getElementById('payment-amount');

const addCash = (fixedAmount) => {
    payAmt.value = `${fixedAmount}`

    const modalElement = document.getElementById('myModalAddCash');

    const modal = bootstrap.Modal.getOrCreateInstance(modalElement);

    modal.show();
}

const addCashBtn = () => {
    const  conf = confirm(`Are you sure you want to deposit ₦${payAmt.value.trim()}`)
    if (conf) {
        const cUser = localStorage.getItem('currentUser');
        const uD = JSON.parse(localStorage.getItem(`${cUser}`));

        let currentBal = parseFloat(uD.balance);
        let payBal = parseFloat(payAmt.value.trim());

        let newBal = currentBal + payBal;
        uD.balance = newBal.toFixed(2);
        localStorage.setItem(`${cUser}`, JSON.stringify(uD));

        setTimeout(() => {
            alert(`Deposit of ₦${payBal} is done successfully...`);
            location.reload();
        }, 1000);
    } else {

    }
}

const withdrawAmt = document.getElementById('withdrawal-amount');

const withdrawBtn = () => {
    const  conf = confirm(`Are you sure you want to withdraw ₦${withdrawAmt.value.trim()}`)
    if (conf) {
        const cUser = localStorage.getItem('currentUser');
        const uD = JSON.parse(localStorage.getItem(`${cUser}`));

        let currentBal = parseFloat(uD.balance);
        let withdrawBal = parseFloat(withdrawAmt.value.trim());

        let newBal = currentBal - withdrawBal;

        if (currentBal < withdrawBal) {
            alert(`Insufficient Balance to Initiate this Withdrawal\nCurrent Balance: ₦${currentBal}`);
        } else {
            uD.balance = newBal.toFixed(2);

            localStorage.setItem(`${cUser}`, JSON.stringify(uD));
            setTimeout(() => {
                alert(`Withdrawal of ₦${withdrawBal} is done successfully...`);
                location.reload();
            }, 1000);
        }

    } else {

    }
}