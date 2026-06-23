// Create PIN

const pin1 = document.getElementById('pinNo1');
const pin2 = document.getElementById('pinNo2');
const pin3 = document.getElementById('pinNo3');
const pin4 = document.getElementById('pinNo4');

const Cpin1 = document.getElementById('CpinNo1');
const Cpin2 = document.getElementById('CpinNo2');
const Cpin3 = document.getElementById('CpinNo3');
const Cpin4 = document.getElementById('CpinNo4');

const errorMessage3 = document.getElementById('errMSG');

const inCre = (err) => {
    errorMessage3.style.display = "block";
    errorMessage3.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
                                <!-- Red Circle -->
                                <circle cx="16" cy="16" r="8" fill="#FB2C56" />

                                    <!-- Exclamation Line -->
                                <rect x="15.6" y="9.5" width="0.8" height="8" rx="0.4" fill="white" />

                                    <!-- Exclamation Dot -->
                                <circle cx="16" cy="20.5" r="0.8" fill="white" />
                            </svg> ${err} `;
    setTimeout(() => {
        errorMessage3.style.display = "none";
    }, 1500)
}

const btnCreatePin = () => {
    const pinA = `${pin1.value}${pin2.value}${pin3.value}${pin4.value}`
    const pinB = `${Cpin1.value}${Cpin2.value}${Cpin3.value}${Cpin4.value}`
    console.log(pinA);
    console.log(pinB);

    if (pinA === "" || pinB === "" || pinA.length < 4 || pinB.length < 4) {
        inCre('Please input your Pin');
    } else if (pinA !== pinB) {
        inCre('Pin does not match');
    } else {
        const cUser = localStorage.getItem('currentUser');

        const uD = JSON.parse(localStorage.getItem(`${cUser}`))
        uD.pin = pinA;
        localStorage.setItem(`${cUser}`, JSON.stringify(uD));

        localStorage.removeItem('currentUser');
        alert(`Registration done successfully\nProceed to Login`);

        window.location.href = 'signin.html';
    }
}