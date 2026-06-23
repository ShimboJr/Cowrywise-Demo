// Reset Password

const passResult = document.getElementById('resetMSG')
const emailRec = document.getElementById('emailRec');

function isEmailValid(mail) {
    if (typeof mail !== 'string') {
        return false;
    }

    const trimmedEmail = mail.trim().toLowerCase();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(trimmedEmail);
}

const inPass = (err) => {
    passResult.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
                                <!-- Red Circle -->
                                <circle cx="16" cy="16" r="8" fill="#FB2C56" />

                                    <!-- Exclamation Line -->
                                <rect x="15.6" y="9.5" width="0.8" height="8" rx="0.4" fill="white" />

                                    <!-- Exclamation Dot -->
                                <circle cx="16" cy="20.5" r="0.8" fill="white" />
                            </svg> ${err} `;
    setTimeout(() => {
        passResult.innerHTML = "";
    }, 1500)
}

    const btnResetPass = () => {
    emailRec.innerHTML = ""

    if (emailRec.value === "") {
        inPass('Please input your email')
    } else if (isEmailValid(emailRec.value) === true) {
        const recData = JSON.parse(localStorage.getItem(`${emailRec.value.trim()}`));
        if (recData) {
            passResult.innerHTML = `Your Password is ${recData.password}`;

            setTimeout( () => {
                emailRec.value = "";
                passResult.innerHTML = "";
            }, 4000)
        } else {
            inPass('Email Does Not Exist')
        }
    }
    else {
        inPass('Your email is invalid')
    }

}