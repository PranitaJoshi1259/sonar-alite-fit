const form = $("#sign-in-form");
form.on("submit", submitLoginForm);
//const nodeApi = "https://localhost:3010";
const nodeApi = "https://api.alite.fit";
async function submitLoginForm(event) {
    event.preventDefault();
    
    const loginData = {
        email: $('#login-email').val()?.trim()?.toLowerCase(),
        password: $('#login-password').val()?.trim()
    }

    const responseMessageDiv = $("#response-output");

    form.addClass("submitting");
    const response = await fetch(nodeApi + '/login', {
        method: 'POST',
        body: JSON.stringify(loginData),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const responseJson = await response.Json();
    
    if(response.status === 200) {
        localStorage.setItem('access_token', responseJson.token);
        form[0].reset();
        location.href = '/orderdetails.html';
    } else {
        form.addClass('failed');
        responseMessageDiv.attr("aria-hidden", false);
        responseMessageDiv.css('display', 'block');
        responseMessageDiv.html(responseJson.message || 'Something went wrong!');
    }

    
    form.removeClass("submitting");
}