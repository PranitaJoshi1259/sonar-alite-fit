$(document).ready(()=>{
    let nodeApi = "https://api.alite.fit"
    //let nodeApi = "http://localhost:3010"

    let getGenderValue = function() {
        let male = "male", female="female", other="other";
        if($("input[type='radio'].maleRadioButton").is(':checked')) {
            var card_type = $("input[type='radio'].maleRadioButton:checked").val();
            if(card_type) return male 
        }
        if($("input[type='radio'].femaleRadioButton").is(':checked')) {
            var card_type = $("input[type='radio'].femaleRadioButton:checked").val();
            if(card_type) return female 
        }
        if($("input[type='radio'].otherRadioButton").is(':checked')) {
            var card_type = $("input[type='radio'].otherRadioButton:checked").val();
            if(card_type) return other 
        }
    }


    let callRazorPayWithRequireParams = function(duration) {
        let person = $('#personcount').val()
        if(!person) person = 1;
        var settings = {
            "url": nodeApi + "/generateOrder",
            "method": "POST",
            "timeout": 0,
            "headers": {
              "Content-Type": "application/json"
            },
            "data": JSON.stringify({
              "amount": $('#totalPrice').val(),
              "firstName": $('#firstNamePayment').val(),
              "lastName":  $('#lastNamePayment').val(),
              "email":  $('#emailPayment').val(),
              "phoneNumber": $('#phoneNumberPayment').val(),
              "planDuration": duration,
              "noOfPersons": person,
              'gender':  getGenderValue(),
              'dateOfBirth':  $('#dob').val(),
              'couponCode': $('#txtCouponCode').val(),
              'couponApplied': $('#hdnCouponApplied').val(),
              "location": $('#location').val(),
              "days": $('#days').val(),
              "timing": $('#timing').val()
            }),
          };
          
          //creates new orderId everytime
          $.ajax(settings).done(function (response) {
             orderId=response.id;
            location.href = "https://alite.events/payment.html?orderId=" + orderId;
          })          
    }


    $('#btnPayNow').click((e)=>{
        submitForm(e);
    });

    function isValidEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    async function submitForm(event) {
        event.preventDefault();
        //const recaptcha = grecaptcha.getResponse();
        let inputs = {
            firstName: document.getElementsByName('firstNamePayment')[0],
            lastName: document.getElementsByName('lastNamePayment')[0],
            email: document.getElementsByName('emailPayment')[0],
            mobile: document.getElementsByName('phoneNumberPayment')[0],
            gender: document.getElementsByName('genderRadioInput')[0],
            dob: document.getElementsByName('dob')[0],
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
                else if (element === 'gender') {
                    let gender = getGenderValue();
                    if(!gender) {
                        document.getElementById("genderSpan").innerHTML = "Please select gender.";
                    }
                    else {
                        inputs["gender"] = gender;
                        document.getElementById("genderSpan").innerHTML = "";
                        resolve();
                    }
                }
                else {
                    inputs[element].nextElementSibling.innerHTML = "";
                    resolve();
                }
            }))
        })
        Promise.all(promises).then(async (data) => {
            let selectedPlan = $('#selectedPlan').val();
            if(selectedPlan == 'Annually') {
                callRazorPayWithRequireParams('Annually');
            }
            if(selectedPlan == 'HalfYearly') {
                callRazorPayWithRequireParams('HalfYearly');
            }
            if(selectedPlan == 'Quaterly') {
                callRazorPayWithRequireParams('Quaterly');
            }
            if(selectedPlan == 'Monthly') {
                callRazorPayWithRequireParams('Monthly');
            }
        }).catch((e) => {
            console.log("%c Line:84 🍊 e", "color:#3f7cff", e.message);
        })

    }

})



