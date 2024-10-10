
const form = document.getElementById("contactUsForm");
form.addEventListener("submit", submitForm);

function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

function isValidPhone(phone) {
   return phone.length === 10;
}

async function submitForm(event) {
    let nodeApi = "https://api.alite.fit";
     //let nodeApi = "http://localhost:3010"
    event.preventDefault();
    const recaptcha = grecaptcha.getResponse();
    let inputs = {
        fullName: document.getElementsByName('your-name')[0],
        email: document.getElementsByName('your-email')[0],
        mobile: document.getElementsByName('your-phone')[0],
        message: document.getElementsByName('your-message')[0]
    }
    let promises = [];
    Object.keys(inputs).forEach(element => {
        promises.push(new Promise((resolve, reject) => {
            const value = inputs[element].value;
            if (!value) {
                inputs[element].nextElementSibling.innerHTML = "Please fill out this field";
            }
            else if (element === 'email' && !isValidEmail(value)) {
                inputs[element].nextElementSibling.innerHTML = "Please enter a valid email";
            }
            else if (element === 'mobile' && !isValidPhone(value)) {
                inputs[element].nextElementSibling.innerHTML = "Please provide valid phone number";
            }
            else {
                /* console.log("%c Line:39 🌽 element", "color:#33a5ff", element);
                console.log("%c Line:40 🍞 inputs[element].nextElementSibling", "color:#ffdd4d", inputs[element].nextElementSibling); */
                inputs[element].nextElementSibling.innerHTML = "";
                resolve();
            }
        }))
    })
    Promise.all(promises).then(async (data) => {
        let displayDiv = document.getElementById("response-output");
        let form = document.getElementById("contactUsForm");
        if (recaptcha) {
            form.classList.add("submitting");
            const response = await fetch(nodeApi + '/sendContactUs', {
                method: 'POST',
                body: JSON.stringify({
                    recaptcha,
                    fullName: inputs.fullName.value,
                    email: inputs.email.value,
                    mobile: inputs.mobile.value,
                    message: inputs.message.value
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            displayDiv.setAttribute("aria-hidden", false);
            displayDiv.style.display = "block";
            if (response.ok) {
                displayDiv.innerHTML = "We have sent your message, Alite Fit team will get back to you soon!";
                form.classList.remove('failed');
                form.classList.add('sent');
                form.reset();
            }
            else {
                form.classList.add('failed');
                displayDiv.innerHTML = "Something went wrong! Please try again later";
            }   
            grecaptcha.reset();
            form.classList.remove("submitting");
        }
        else {
            displayDiv.style.display = "block";
            form.classList.add('failed');
            displayDiv.innerHTML = "Please confirm that you are not a robot";
        }
    }).catch((e) => {
        console.log("%c Line:84 🍊 e", "color:#3f7cff", e);
    })
}
