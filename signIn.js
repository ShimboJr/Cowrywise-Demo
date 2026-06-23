// Sign In


const Email = document.getElementById('emailIn');
const Password = document.getElementById('passwordIn');
const emailInLabel = document.getElementById('emailInLabel');
const passwordInLabel = document.getElementById('passwordInLabel');
const errorMessage2 = document.getElementById("errorMG");

const epEmail = () => {
    if (Email.value === '' && Password.value === '') {
        Email.style.border = "1px solid #FB2C56";
        emailInLabel.style.color = "#FB2C56";
        Password.style.border = "1px solid #FB2C56";
        passwordInLabel.style.color = "#FB2C56";
        errorMessage2.style.display = "block";
        errorMessage2.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
                                <!-- Red Circle -->
                                <circle cx="16" cy="16" r="8" fill="#FB2C56" />

                                    <!-- Exclamation Line -->
                                <rect x="15.6" y="9.5" width="0.8" height="8" rx="0.4" fill="white" />

                                    <!-- Exclamation Dot -->
                                <circle cx="16" cy="20.5" r="0.8" fill="white" />
                            </svg> Please fill in your login credentials `;
        Email.focus();
        setTimeout(() => {
            errorMessage2.style.display = "none";
            Email.style.border = "1px solid #0066F5FF";
            emailInLabel.style.color = "#0066F5FF";
            Password.style.border = "1px solid #0066F5FF";
            passwordInLabel.style.color = "#0066F5FF";
        }, 2000)
    } else if (Email.value === '') {
        Email.style.border = "1px solid #FB2C56";
        emailInLabel.style.color = "#FB2C56";
        errorMessage2.style.display = "block";
        errorMessage2.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
                                <!-- Red Circle -->
                                <circle cx="16" cy="16" r="8" fill="#FB2C56" />

                                    <!-- Exclamation Line -->
                                <rect x="15.6" y="9.5" width="0.8" height="8" rx="0.4" fill="white" />

                                    <!-- Exclamation Dot -->
                                <circle cx="16" cy="20.5" r="0.8" fill="white" />
                            </svg> Please fill in your login credentials `;
        Email.focus();
        setTimeout(() => {
            errorMessage2.style.display = "none";
            Email.style.border = "1px solid #0066F5FF";
            emailInLabel.style.color = "#0066F5FF";
        }, 2000)
    } else if (Password.value === '') {
        Password.style.border = "1px solid #FB2C56";
        passwordInLabel.style.color = "#FB2C56";
        errorMessage2.style.display = "block";
        errorMessage2.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
                                <!-- Red Circle -->
                                <circle cx="16" cy="16" r="8" fill="#FB2C56" />

                                    <!-- Exclamation Line -->
                                <rect x="15.6" y="9.5" width="0.8" height="8" rx="0.4" fill="white" />

                                    <!-- Exclamation Dot -->
                                <circle cx="16" cy="20.5" r="0.8" fill="white" />
                            </svg> Please fill in your login credentials `;
        Password.focus();
        setTimeout(() => {
            errorMessage2.style.display = "none";
            Password.style.border = "1px solid #0066F5FF";
            passwordInLabel.style.color = "#0066F5FF";
        }, 2000)
    }

}

const invCre = (err) => {
    Email.style.border = "1px solid #FB2C56";
    emailInLabel.style.color = "#FB2C56";
    errorMessage2.style.display = "block";
    errorMessage2.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
                                <!-- Red Circle -->
                                <circle cx="16" cy="16" r="8" fill="#FB2C56" />

                                    <!-- Exclamation Line -->
                                <rect x="15.6" y="9.5" width="0.8" height="8" rx="0.4" fill="white" />

                                    <!-- Exclamation Dot -->
                                <circle cx="16" cy="20.5" r="0.8" fill="white" />
                            </svg> ${err} `;
    Email.focus();
    setTimeout(() => {
        errorMessage2.style.display = "none";
        Email.style.border = "1px solid #0066F5FF";
        emailInLabel.style.color = "#0066F5FF";
    }, 2000)
}


const btnSignIn = () => {
    if (Email.value === "" || Password.value === "") {
        epEmail();
    } else {
        try {
            const loginUser = JSON.parse(localStorage.getItem(`${Email.value.trim()}`));

            if (loginUser.email === Email.value.trim() && loginUser.password === Password.value && loginUser.pin === "") {
                localStorage.setItem('currentUser', Email.value.trim());
                Email.value = '';
                Password.value = '';
                alert("Proceed to Create your PIN")
                window.location.href = 'create-pin.html';
            } else if (loginUser.email === Email.value.trim() && loginUser.password === Password.value) {
                localStorage.setItem('currentUser', Email.value.trim());
                Email.value = '';
                Password.value = '';
                // alert('Login Successful');
                window.location.href = 'dashboard.html';
            } else {
                invCre('You have provided an invalid email or password. Please check and try again');
            }
        } catch (error) {
            invCre('Provided email address is not registered');
        }
    }

}