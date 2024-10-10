// all events and contant require for index.html page which are common for phonepay or razorpay will be come under this file
// to avoid duplicate code

$(document).ready(()=>{
    let nodeApi = "https://api.alite.fit"
    //let nodeApi = "http://localhost:3010"

    let globleTshirtPrice, globleFinalPrice, globleDiscount, globleDiscountValue = null;

    let locationBatchDetail = [
        {
            "location": "Sayaji Garden (Kamatibaug), Fatehganj",
            "days": [
                {
                    "name": "Monday | Wednesday | Friday",
                    "batches": [{
                        "time": "Batch 1 - 6:00 to 7:15 A.M. (Morning)",
                        "reporting-time": '5:55 A.M.'
                    },
                    {
                        "time": "Batch 2 - 7:15 to 8:15 A.M. (Morning)",
                        "reporting-time": '7:10 A.M.'
                    },
                    {
                        "time": "Batch 3 - 6:15 to 7:15 P.M. (Evening)",
                        "reporting-time": '6:10 P.M.'
                    }]
                }]
        },
        {
            "location": "Gotri Garden, Gotri",
            "days": [
                {
                    "name": "Tuesday | Thursday | Saturday",
                    "batches": [{
                        "time": "Batch 1 - 6:15 to 7:30 A.M. (Morning)",
                        "reporting-time": '6:10 A.M.'
                    },
                    {
                        "time": "Batch 2 - 7:15 to 8:15 A.M. (Morning)",
                        "reporting-time": '7:10 A.M.'
                    },
                    {
                        "time": "Batch 3 - 6:15 to 7:15 P.M. (Evening)",
                        "reporting-time": '6:10 P.M.'
                    }]
                }]
        },
        /* {
            "location": "GBGC (GBGC Members Only)", 
            "days": [
                {
                    "name": "Monday | Wednesday | Friday",
                    "batches": [{
                        "time": "Fitness Training - 7:30 to 8:30 A.M. (Morning)",
                        "reporting-time": '7:25 A.M.'
                    }]
                }]
        } */
       /*  {
            "location": "Decathlon, Sevasi",
            "days": [
                {
                    "name": "Tuesday | Thursday | Saturday",
                    "batches": [{
                        "time": "7:45 to 9:00 A.M.",
                        "reporting-time": '7:40 A.M.'
                    }]
                }]
        } */
    ]

    locationBatchDetail.forEach((currentLocation, index)=>{
        $('#location').append(`<option value="${currentLocation.location}">${currentLocation.location}</option>`)
    })
    
    $('#location').change(()=>{
        let selectedLocation = _.findWhere(locationBatchDetail, {"location": $('#location').val()});
        let days = selectedLocation.days;
        $('#days option:not(:first)').remove();
        $('#timing option:not(:first)').remove();
        days.forEach((currentDay, index)=>{
            $('#days').append(`<option value="${currentDay.name}">${currentDay.name}</option>`)
        })  
    })

    $('#days').change(()=>{
        let selectedLocation = _.findWhere(locationBatchDetail, {"location": $('#location').val()});
        let days = selectedLocation.days;
        let selectedDay = _.findWhere(days, { name: $('#days').val() })
        let batches = selectedDay.batches;
        $('#timing option:not(:first)').remove();
        batches.forEach((selectedBatch, index)=>{
            $('#timing').append(`<option value="${selectedBatch.time}">${selectedBatch.time}</option>`)
        })  
    })

    // Disable T-shirt checkbox initially
    $('#checkbox-tshirt').prop('disabled', true);
    $("input[name='genderRadioInput']").change(() => {
        $('#checkbox-tshirt').prop('disabled', false);
        if ($("#male").is(":checked")) {
            $("#singlet-image").attr("src", "./assests/images/Mens- Singlet.jpg");
            $("#tshirt-image").attr("src", "./assests/images/Mens-Tshirt.png");
            $("#singlet-text").text("Mens-Singlet");
            $("#tshirt-text").text("Mens-Tshirt");
        } else if ($("#female").is(":checked")) {
            // Update image and text for female
            $("#singlet-image").attr("src", "./assests/images/Womens-Racerback.png");
            $("#tshirt-image").attr("src", "./assests/images/Womens-Tshirt.png");
            $("#singlet-text").text("Womens-Singlet");
            $("#tshirt-text").text("Womens-Tshirt");
        }
    });

    let json = 
        {
            "A" : {
                "Monthly": 2000,
                "Monthly_Discount": 0,
                "Monthly_Discount_Value": 0,
                "Quaterly": 5000,
                "Quaterly_Discount": 0,
                "Quaterly_Discount_Value": 0,
                "HalfYearly": 9000,
                "HalfYearly_Discount": 0,
                "HalfYearly_Discount_Value": 0,
                "Annually": 16000,
                "Annually_Discount": 0,
                "Annually_Discount_Value": 0,
            },
            "B": {
                "Monthly": 2000,
                "Monthly_Discount": 0,
                "Monthly_Discount_Value": 0,
                "Quaterly": 4500,
                "Quaterly_Discount": 10,
                "Quaterly_Discount_Value": 500,
                "HalfYearly": 7875,
                "HalfYearly_Discount": 12.50,
                "HalfYearly_Discount_Value": 1125,
                "Annually": 13600,
                "Annually_Discount": 15,
                "Annually_Discount_Value": 2400,
            },
            "C": {
                "Monthly": 1800,
                "Monthly_Discount": 10,
                "Monthly_Discount_Value": 200,
                "Quaterly": 4375,
                "Quaterly_Discount": 12.50,
                "Quaterly_Discount_Value": 625,
                "HalfYearly": 7650,
                "HalfYearly_Discount": 15,
                "HalfYearly_Discount_Value": 1350,
                "Annually": 13200,
                "Annually_Discount": 17.50,
                "Annually_Discount_Value": 2800,
            },
            "D": {
                "Monthly": 1750,
                "Monthly_Discount": 12.50,
                "Monthly_Discount_Value": 250,
                "Quaterly": 4250,
                "Quaterly_Discount": 15,
                "Quaterly_Discount_Value": 750,
                "HalfYearly": 7425,
                "HalfYearly_Discount": 17.50,
                "HalfYearly_Discount_Value": 1575,
                "Annually": 12800,
                "Annually_Discount": 20,
                "Annually_Discount_Value": 3200,
            },
            "E": {
                "Monthly": 1700,
                "Monthly_Discount": 15,
                "Monthly_Discount_Value": 300,
                "Quaterly": 4125,
                "Quaterly_Discount": 17.50,
                "Quaterly_Discount_Value": 875,
                "HalfYearly": 7200,
                "HalfYearly_Discount": 20,
                "HalfYearly_Discount_Value": 1800,
                "Annually": 12400,
                "Annually_Discount": 22.50,
                "Annually_Discount_Value": 3600,
            },
            "F": {
                "Monthly": 1650,
                "Monthly_Discount": 17.50,
                "Monthly_Discount_Value": 350,
                "Quaterly": 4000,
                "Quaterly_Discount": 20,
                "Quaterly_Discount_Value": 1000,
                "HalfYearly": 6975,
                "HalfYearly_Discount": 22.5,
                "HalfYearly_Discount_Value": 2025,
                "Annually": 12000,
                "Annually_Discount": 25,
                "Annually_Discount_Value": 4000,
            },
            "G": {
                "Monthly": 1600,
                "Monthly_Discount": 20,
                "Monthly_Discount_Value": 400,
                "Quaterly": 3875,
                "Quaterly_Discount": 22.50,
                "Quaterly_Discount_Value": 1125,
                "HalfYearly": 6750,
                "HalfYearly_Discount": 25,
                "HalfYearly_Discount_Value": 2250,
                "Annually": 11600,
                "Annually_Discount": 27.50,
                "Annually_Discount_Value": 4400,
            },
            "H": {
                "Monthly": 1550,
                "Monthly_Discount": 22.50,
                "Monthly_Discount_Value": 450,
                "Quaterly": 3750,
                "Quaterly_Discount": 25,
                "Quaterly_Discount_Value": 1250,
                "HalfYearly": 6525,
                "HalfYearly_Discount": 27.50,
                "HalfYearly_Discount_Value": 2475,
                "Annually": 11200,
                "Annually_Discount": 30,
                "Annually_Discount_Value": 4800,
            }
        }

    const T_SHIRT_SIZE = {
        "XS": {
            "BasePrice": 999,
            "Discount": 9.10,
            "Discount_Value": 100
        },
        "S": {
            "BasePrice": 999,
            "Discount": 9.10,
            "Discount_Value": 100
        },
        "M": {
            "BasePrice": 999,
            "Discount": 9.10,
            "Discount_Value": 100
        },
        "L": {
            "BasePrice": 999,
            "Discount": 9.10,
            "Discount_Value": 100
        },
        "XL": {
            "BasePrice": 999,
            "Discount": 9.10,
            "Discount_Value": 100
        },
        "XXL": {
            "BasePrice": 999,
            "Discount": 9.10,
            "Discount_Value": 100
        },
        "XXXL": {
            "BasePrice": 999,
            "Discount": 9.10,
            "Discount_Value": 100
        }
    }

    
    let setValuesOnPaymentPopup = function(pricePerPerson, discountPer, discountAmount, tshirtPrice) {


        let personCount = 1
        let totalPrice = parseFloat(pricePerPerson) * parseFloat(personCount);
        $('#txtPricePerPerson').val(pricePerPerson);
        $('#txtDiscountPercentage').val(discountPer);
        $('#txtDicountAmount').val(discountAmount);
        $('#txtTotalPrice').val(totalPrice);
        let finalTxt = "Payable amount: " + totalPrice + " + Convenience fee";
        if(tshirtPrice){
            finalTxt =  "Plan price: " + totalPrice + " + " + tshirtPrice + " (T-shirt price) " + "Payable amount: " + (totalPrice + tshirtPrice) + " + Convenience fee"
        }
        $('#finalPayableAmount').text(finalTxt)

        // reset coupon configuration
        // $('#hdnCouponApplied').val(false)
        // $('#txtCouponCode').val('');
        // $('#lblRemove').addClass('displayNone');

        let finalPayablePrice = totalPrice;
        $('#totalPrice').val(finalPayablePrice);
        if(finalPayablePrice >= 450000) {
            $('#paynowinfo').modal('show');
        } else {
            $('#staticBackdrop').modal('show');
        }
    }

    let setValuesOnUI = function(monthly, quaterly, halfyearly, yearly) {
        //yearly, yearlydiscount, yearlydiscountvalue
        //halfyearly, halfyearlydiscount, halfyearlydiscountvalue
        //quaterly, quaterlydiscount, quaterlydiscountvalue
        //monthly, monthlydiscount, monthlydiscountvalue
        //$(selector).text(content)
        $('#monthly').text(monthly.price)
        $('#monthlydiscount').text(monthly.discount)
        $('#monthlydiscountvalue').text(monthly.discountvalue)

        $('#quaterly').text(quaterly.price)
        $('#quaterlydiscount').text(quaterly.discount)
        $('#quaterlydiscountvalue').text(quaterly.discountvalue)

        $('#halfyearly').text(halfyearly.price)
        $('#halfyearlydiscount').text(halfyearly.discount)
        $('#halfyearlydiscountvalue').text(halfyearly.discountvalue)

        $('#yearly').text(yearly.price)
        $('#yearlydiscount').text(yearly.discount)
        $('#yearlydiscountvalue').text(yearly.discountvalue)
    }

    let autoSetUIValue = function(value) {
        let monthly = {
            price: json[value]['Monthly'],
            discount: 'Discount ' + json[value]['Monthly_Discount'] + '%',
            discountvalue: 'Discount ₹ ' + json[value]['Monthly_Discount_Value'],
        }
        let quaterly = {
            price: json[value]['Quaterly'],
            discount: 'Discount ' + json[value]['Quaterly_Discount'] + '%',
            discountvalue: 'Discount ₹ ' + json[value]['Quaterly_Discount_Value'],
        }
        let halfyearly = {
            price: json[value]['HalfYearly'],
            discount: 'Discount ' +  json[value]['HalfYearly_Discount'] + '%',
            discountvalue:'Discount ₹ ' +  json[value]['HalfYearly_Discount_Value'],
        }
        let yearly = {
            price: json[value]['Annually'],
            discount: 'Discount ' +  json[value]['Annually_Discount'] + '%',
            discountvalue: 'Discount ₹ ' + json[value]['Annually_Discount_Value'],
        }
        setValuesOnUI(monthly, quaterly, halfyearly, yearly)
        setTotalValue(parseFloat(json[value]['Monthly']) , parseFloat(json[value]['Quaterly']), parseFloat(json[value]['HalfYearly']), parseFloat(json[value]['Annually']))
    }

    let setTotalValue = function(monthly, quaterly, halfyearly, annually) {
       let person = 1
        // if($('#personcount').val().trim() == '' || $('#personcount').val().trim() == 1) {
            if(person == 1){
            $('#monthlytotalvalue').text('Price ₹ ' + monthly);
            $('#quaterlytotalvalue').text('Price ₹ ' + quaterly);
            $('#halfyearlytotalvalue').text('Price ₹ ' + halfyearly );
            $('#yearlytotalvalue').text('Price ₹ ' + annually);
            finalMonthlyPrice = monthly;
            finalQuaterlyPrice = quaterly;
            finalHalfYearlyPrice = halfyearly;
            finalYearlyPrice = annually;
        }
        /* if($('#personcount').val() > 1) {
            $('#monthlytotalvalue').text('Price ₹ ' + monthly * $('#personcount').val());
            $('#quaterlytotalvalue').text('Price ₹ ' + quaterly * $('#personcount').val());
            $('#halfyearlytotalvalue').text('Price ₹ ' + halfyearly * $('#personcount').val());
            $('#yearlytotalvalue').text('Price ₹ ' + annually * $('#personcount').val());
            finalMonthlyPrice = monthly * $('#personcount').val();
            finalQuaterlyPrice = quaterly * $('#personcount').val();
            finalHalfYearlyPrice = halfyearly * $('#personcount').val();
            finalYearlyPrice = annually * $('#personcount').val();
        } */
    }

    let setDefaultPricing = function() {
        // A
        let monthly = {
            price: json['A']['Monthly'],
            discount: '',
            discountvalue: '',
        }
        let quaterly = {
            price: json['A']['Quaterly'],
            discount: '',
            discountvalue: '',
        }
        let halfyearly = {
            price: json['A']['HalfYearly'],
            discount: '',
            discountvalue: '',
        }
        let yearly = {
            price: json['A']['Annually'],
            discount: '',
            discountvalue: '',
        }
        setValuesOnUI(monthly, quaterly, halfyearly, yearly)
        setTotalValue(parseFloat(json['A']['Monthly']) , parseFloat(json['A']['Quaterly']), parseFloat(json['A']['HalfYearly']), parseFloat(json['A']['Annually']))
    }


    let getPopupPriceValues = function(duration) {
        /* let currentNumber = $('#personcount').val().trim();
        if(!currentNumber) currentNumber = 1; */
        let currentNumber = 1 
        
        if(currentNumber) {
            currentNumber = parseInt(currentNumber);
            if(currentNumber == 1) {
                //A
                setValuesOnPaymentPopup(json['A'][duration], json['A'][duration+"_Discount"], json['A'][duration+"_Discount_Value"], 0)
            }
            if(currentNumber <= 20 && currentNumber >=11) {
                //B
                setValuesOnPaymentPopup(json['B'][duration], json['B'][duration+"_Discount"], json['B'][duration+"_Discount_Value"])
            }
            if(currentNumber <= 30 && currentNumber >=21) {
                // C
                setValuesOnPaymentPopup(json['C'][duration], json['C'][duration+"_Discount"], json['C'][duration+"_Discount_Value"])
            }
            if(currentNumber <= 50 && currentNumber >=31) {
                //D
                setValuesOnPaymentPopup(json['D'][duration], json['D'][duration+"_Discount"], json['D'][duration+"_Discount_Value"])
            }
            if(currentNumber <= 75 && currentNumber >=51) {
                //E
                setValuesOnPaymentPopup(json['E'][duration], json['E'][duration+"_Discount"], json['E'][duration+"_Discount_Value"])
            }
            if(currentNumber <= 100 && currentNumber >=76) {
                //F
                setValuesOnPaymentPopup(json['F'][duration], json['F'][duration+"_Discount"], json['F'][duration+"_Discount_Value"])
            }
            if(currentNumber <= 150 && currentNumber >=101) {
                //G
                setValuesOnPaymentPopup(json['G'][duration], json['G'][duration+"_Discount"], json['G'][duration+"_Discount_Value"])
            }
            if(currentNumber > 150) {
                //H
                setValuesOnPaymentPopup(json['H'][duration], json['H'][duration+"_Discount"], json['H'][duration+"_Discount_Value"])
            }
        } else {
            //A
            setValuesOnPaymentPopup(json['A'][duration], json['A'][duration+"_Discount"], json['A'][duration+"_Discount_Value"],0)
        }
    }

        /**
     * Gets the final price values for a T-shirt based on its size.
     *
     * @param {string} size - The size of the T-shirt.
     * @returns {number} - The base price of the T-shirt.
     */
    const getPopupPriceValuesForTshirt = (size) => {
        /**
         * Sets the final price of the T-shirt and updates the UI.
         *
         * @param {Object} sizeData - The data object for the T-shirt size.
         * @param {number} discountPer - The discount percentage for the T-shirt.
         * @param {number} discountAmount - The discount amount for the T-shirt.
         */
        const setTshirtFinalPrice = (sizeData, discountPer, discountAmount) => {
            $('#finalTshirtPayableAmount').text("₹" + sizeData.BasePrice);
        };

        // Replace the following placeholder with your actual JSON data structure for T-shirt sizes
        const tshirtSizeData = T_SHIRT_SIZE[size];

        if (tshirtSizeData) {
            setTshirtFinalPrice(tshirtSizeData, tshirtSizeData['Discount'], tshirtSizeData['Discount_Value']);
        }

        return tshirtSizeData ? tshirtSizeData.BasePrice : 0;
    }
// end 

    let currentExecution = function() {
        /* let currentNumber = $('#personcount').val().trim();
        if(!currentNumber) currentNumber = 1; */
        let currentNumber = 1
        
        if(currentNumber) {
            if(currentNumber <= 10 && currentNumber >=1) {
                // A
                let monthly = {
                    price: json['A']['Monthly'],
                    discount: '',
                    discountvalue: '',
                }
                let quaterly = {
                    price: json['A']['Quaterly'],
                    discount: '',
                    discountvalue: '',
                }
                let halfyearly = {
                    price: json['A']['HalfYearly'],
                    discount: '',
                    discountvalue: '',
                }
                let yearly = {
                    price: json['A']['Annually'],
                    discount: '',
                    discountvalue: '',
                }
                setValuesOnUI(monthly, quaterly, halfyearly, yearly)
                setTotalValue(parseFloat(json['A']['Monthly']) , parseFloat(json['A']['Quaterly']), parseFloat(json['A']['HalfYearly']), parseFloat(json['A']['Annually']))
            }
            if(currentNumber <= 20 && currentNumber >=11) {
                // B
                let monthly = {
                    price: json['B']['Monthly'],
                    discount: '',
                    discountvalue: '',
                }
                let quaterly = {
                    price: json['B']['Quaterly'],
                    discount: 'Discount ' + json['B']['Quaterly_Discount'] + '%',
                    discountvalue: 'Discount ₹ ' + json['B']['Quaterly_Discount_Value'],
                }
                let halfyearly = {
                    price: json['B']['HalfYearly'],
                    discount: 'Discount ' +  json['B']['HalfYearly_Discount'] + '%',
                    discountvalue:'Discount ₹ ' +  json['B']['HalfYearly_Discount_Value'],
                }
                let yearly = {
                    price: json['B']['Annually'],
                    discount: 'Discount ' +  json['B']['Annually_Discount'] + '%',
                    discountvalue: 'Discount ₹ ' + json['B']['Annually_Discount_Value'],
                }
                setValuesOnUI(monthly, quaterly, halfyearly, yearly)
                setTotalValue(parseFloat(json['B']['Monthly']) , parseFloat(json['B']['Quaterly']), parseFloat(json['B']['HalfYearly']), parseFloat(json['B']['Annually']))
            }
            if(currentNumber <= 30 && currentNumber >=21) {
                // C
                autoSetUIValue('C')
            }
            if(currentNumber <= 50 && currentNumber >=31) {
                autoSetUIValue('D')
            }
            if(currentNumber <= 75 && currentNumber >=51) {
                autoSetUIValue('E')
            }
            if(currentNumber <= 100 && currentNumber >=76) {
                autoSetUIValue('F')
            }
            if(currentNumber <= 150 && currentNumber >=101) {
                autoSetUIValue('G')
            }
            if(currentNumber > 150) {
                autoSetUIValue('H')
            }
        } else {
            setDefaultPricing();
        }
    }

    /* document.getElementById('personcount').addEventListener("keyup", currentExecution);

    $('#personcount').change(currentExecution)
    setTimeout(()=>{
        currentExecution();
    }, 2000) */


    function isValidEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    $('#monthlyPayNow').click(function(e){
        // here we need to call api to get the order id from the server
        // call http://localhost:3001/generateOrder api to get the order id from the response and then call
        
        //callRazorPayWithRequireParams(finalMonthlyPrice, 'Monthly');
        $('#selectedPlan').val('Monthly')
        e.preventDefault()
        // here we need to write a code to set the popup textbox value. 
        getPopupPriceValues('Monthly')
        return false;
    })

    $('#quaterlyPayNow').click(function(e){
        // here we need to call api to get the order id from the server
        // call http://localhost:3001/generateOrder api to get the order id from the response and then call
        
        //callRazorPayWithRequireParams(finalQuaterlyPrice, 'Quaterly');
        $('#selectedPlan').val('Quaterly')
        e.preventDefault()
        getPopupPriceValues('Quaterly')
        return false;
    })

    $('#halfYearlyPayNow').click(function(e){
        // here we need to call api to get the order id from the server
        // call http://localhost:3001/generateOrder api to get the order id from the response and then call
        
        //callRazorPayWithRequireParams(finalHalfYearlyPrice, 'Half Yearly');
        $('#selectedPlan').val('HalfYearly')
        e.preventDefault()
        getPopupPriceValues('HalfYearly')
        return false;
    })

    $('#yearlyPayNow').click(function(e){
        // here we need to call api to get the order id from the server
        // call http://localhost:3001/generateOrder api to get the order id from the response and then call
        
        //callRazorPayWithRequireParams(finalYearlyPrice, 'Annually');
        $('#selectedPlan').val('Annually')
        e.preventDefault()
        getPopupPriceValues('Annually')
        return false;
    })

    $('#lblRemoveCoupon').click((e) => {
        e.preventDefault();
        $('#hdnCouponApplied').val(false);
        $('#txtCouponCode').val('');
        $('#lblRemove').addClass('displayNone');
        const selectedSize = $("input[name='t-shirt-size']:checked").val();
        const tshirtPrice = getPopupPriceValuesForTshirt(selectedSize);
        const duration = $("#selectedPlan").val();
        const isTshirtBoxChecked = $('#checkbox-tshirt').prop('checked');
        const isCouponApplied = $('#hdnCouponApplied').val() === 'true' ?  true : false;
        const isTshirtCouponApplied = $('#hdnTshirtCouponApplied').val() === 'true' ?  true : false;
        if (isTshirtBoxChecked && isCouponApplied) {
            setValuesOnPaymentPopup(globleFinalPrice, globleDiscount, globleDiscountValue);
        } else if (!isTshirtBoxChecked && !isCouponApplied) {
            setValuesOnPaymentPopup(json['A'][duration], json['A'][duration + "_Discount"], json['A'][duration + "_Discount_Value"]);
        } else if(isTshirtCouponApplied && !isCouponApplied) {
            setValuesOnPaymentPopup(json['A'][duration], json['A'][duration + "_Discount"], json['A'][duration + "_Discount_Value"], globleTshirtPrice);
        }else{
            setValuesOnPaymentPopup(json['A'][duration], json['A'][duration + "_Discount"], json['A'][duration + "_Discount_Value"],tshirtPrice);
        }
        return false;
    });

    $('#lblRemoveTshirtCoupon').click((e) => {
        e.preventDefault();
        $('#hdnTshirtCouponApplied').val(false)
        $('#tshirtCouponCode').val('');
        $('#lblRemoveTshirtCode').addClass('displayNone');
        const selectedSize = $("input[name='t-shirt-size']:checked").val()
        const tshirtPrice = getPopupPriceValuesForTshirt(selectedSize);
        const duration = $("#selectedPlan").val()
        const isCouponApplied = $('#hdnCouponApplied').val() === 'true' ?  true : false;
        const isTshirtCouponApplied = $('#hdnTshirtCouponApplied').val() === 'true' ?  true : false;
        globleTshirtPrice  = globleTshirtPrice ? globleTshirtPrice : tshirtPrice

        if(isCouponApplied && !isTshirtCouponApplied){
            setValuesOnPaymentPopup(globleFinalPrice, globleDiscount, globleDiscountValue, tshirtPrice)
        }
        else{
            setValuesOnPaymentPopup(json['A'][duration], json['A'][duration+"_Discount"], json['A'][duration+"_Discount_Value"],tshirtPrice)
        }        
    })

    $("#checkbox-tshirt").click(function () {
        const selectedSize = $("input[name='t-shirt-size']:checked").val();
        const tshirtPrice = getPopupPriceValuesForTshirt(selectedSize);
        const duration = $("#selectedPlan").val();
        $('#hdnTshirtCouponApplied').val(false);
        $('#tshirtCouponCode').val('');
        $('#lblRemoveTshirtCode').addClass('displayNone');

        const isCouponApplied = $('#hdnCouponApplied').val() === 'true' ? true : false;
        const isTshirtCouponApplied = $('#hdnTshirtCouponApplied').val() === 'true' ? true : false;        
        if ($("#checkbox-tshirt").prop("checked")) {
            globleTshirtPrice = globleTshirtPrice ? globleTshirtPrice : tshirtPrice;
            if (globleFinalPrice && isCouponApplied) {
                setValuesOnPaymentPopup(globleFinalPrice, globleDiscount, globleDiscountValue, tshirtPrice);
            }
             else {
                setValuesOnPaymentPopup(json['A'][duration], json['A'][duration + "_Discount"], json['A'][duration + "_Discount_Value"], tshirtPrice);
            }
        } else {
            if (isCouponApplied && isTshirtCouponApplied) {
                globleFinalPrice = globleTshirtPrice ? globleFinalPrice - globleTshirtPrice : globleFinalPrice;
            } 
            else if(isTshirtCouponApplied){
                setValuesOnPaymentPopup(globleFinalPrice, globleDiscount, globleDiscountValue,0);
            }
            else if(isCouponApplied){
                globleTshirtPrice = 0
                setValuesOnPaymentPopup(globleFinalPrice, globleDiscount, globleDiscountValue, globleTshirtPrice);
            }
            else {
                const duration = $("#selectedPlan").val();
                globleFinalPrice = parseFloat(json['A'][duration]) 
                setValuesOnPaymentPopup(json['A'][duration], globleDiscount, globleDiscountValue,0);
            }
        }
    });
       
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

    $('#tshirtBtn').click((e) => {
        if ($('#tshirtCouponCode').val().trim() == '') {
            $('#lblNotValidTshirtCode').removeClass('displayNone');
            $('#lblNotValidTshirtCode').text('Coupon code is required')
            return false
        }
        if (!['AFMT30'].includes($('#tshirtCouponCode').val().trim())) {
            $('#lblNotValidTshirtCode').removeClass('displayNone');
            $('#lblNotValidTshirtCode').text('Not a valid coupon')
            return false
        }
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
                    scrollToElement($('#firstNamePayment'));
                }
                else if (element === 'email' && !isValidEmail(value)) {
                    inputs[element].nextElementSibling.innerHTML = "Please enter a valid email";
                    scrollToElement($('#emailPayment'));
                }
                else if (element === 'mobile' && !isValidPhone(value)) {
                    inputs[element].nextElementSibling.innerHTML = "Please provide valid phone number";
                    scrollToElement($('#phoneNumberPayment'));
                }
                else if (element === 'gender') {
                    let gender = getGenderValue();
                    if (!gender) {
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
        Promise.all(promises).then(async () => {
            // here we need to call the API to get the discounted price
            // let person = $('#personcount').val()
            let person = 1
            // if(!person) person = 1;
            var settings = {
                "url": nodeApi + "/applyCoupon",
                "method": "POST",
                "timeout": 0,
                "headers": {
                    "Content-Type": "application/json"
                },
                "data": JSON.stringify({
                    "amount": $('#totalPrice').val(),
                    "tshirtSize": $('#checkbox-tshirt').prop('checked') ? $("input[name='t-shirt-size']").val() : "",
                    "tshirtCouponCode": $('#tshirtCouponCode').val(),
                    "tshirtStyle": $('#checkbox-tshirt').prop('checked') ? $("input[name='tshirt-image']").val() : "",
                    "isTshirtAdded": $('#checkbox-tshirt').prop('checked'),
                    "firstName": $('#firstNamePayment').val(),
                    "lastName": $('#lastNamePayment').val(),
                    "email": $('#emailPayment').val(),
                    "phoneNumber": $('#phoneNumberPayment').val(),
                    "planDuration": $('#selectedPlan').val(),
                    "noOfPersons": person,
                    'gender': getGenderValue(),
                    'dateOfBirth': $('#dob').val(),
                    "couponCode": $('#txtCouponCode').val(),
                    "location": $('#location').val(),
                    "days": $('#days').val(),
                    "timing": $('#timing').val()
                }),
            };

            //creates new orderId everytime
            $.ajax(settings).done(function (response) {
                // show final discounted price in the UI 
                $('#lblNotValidTshirtCode').addClass('displayNone')
                $('#lblRemoveTshirtCode').removeClass('displayNone')
                $('#finalTshirtPayableAmount').text("₹" + response.finalTshirtPrice)
                $('#hdnTshirtCouponApplied').val(true)
                const duration = $("#selectedPlan").val()
                globleTshirtPrice = response?.finalTshirtPrice
                globleFinalPrice = response?.finalPrice
                globleDiscount = response?.discount,
                globleDiscountValue = response?.discountValue
                
                const isCouponApplied = $('#hdnCouponApplied').val() === 'true' ?  true : false;
                if(isCouponApplied){
                    setValuesOnPaymentPopup(response?.finalPrice, response?.discount, response?.discountValue, response?.finalTshirtPrice)
                }else{
                    setValuesOnPaymentPopup(json['A'][duration], globleDiscount, globleDiscountValue, response?.finalTshirtPrice)

                }

                
            }).fail(function (jqXHR, exception) {
                // show message that invalid coupon
                $('#lblNotValidTshirtCode').text('Not a valid coupon');
                $('#lblNotValidTshirtCode').removeClass('displayNone')
                $('#lblRemoveTshirtCode').addClass('displayNone')
                $('#hdnTshirtCouponApplied').val(false)
                $('#hdnTshirtCouponApplied').val(false)
            })
        })
    })

    $('#btnApply').click((e) => {
        if ($('#txtCouponCode').val().trim() == '') {
            $('#lblNotValid').removeClass('displayNone');
            $('#lblNotValid').text('Coupon code is required')
            return false
        }

        const couponCode = $('#txtCouponCode').val().trim();
        const duration = $('#selectedPlan').val().trim();

        const validCouponCodes = ['ALITEFIT10', 'ALITEFIT5', 'ALITEFITJITO20', 'ALITESTAFF50', 'P4F10', 'P4F125', 'P4F15', 'P4F20', 'SPECIAL30', 'WEEKEND50', 'JITO15'];
        if (!validCouponCodes.includes(couponCode)) {
            $('#lblNotValid').removeClass('displayNone');
            $('#lblNotValid').text('Not a valid coupon');
            return false;
        }

        if (['P4F10'].includes(couponCode) && duration !== 'Quaterly') {
            $('#lblNotValid').removeClass('displayNone');
            $('#lblNotValid').text('Invalid duration for this coupon code');
            return false;
        }

        if (['ALITEFIT5', 'P4F125', 'P4F15'].includes(couponCode) && duration !== 'HalfYearly') {
            $('#lblNotValid').removeClass('displayNone');
            $('#lblNotValid').text('Invalid duration for this coupon code');
            return false;
        }

        if (['ALITEFIT10', 'P4F20', 'SPECIAL30', 'WEEKEND50'].includes(couponCode) && duration !== 'Annually') {
            $('#lblNotValid').removeClass('displayNone');
            $('#lblNotValid').text('Invalid duration for this coupon code');
            return false;
        }

        $('#lblNotValid').addClass('displayNone');
        $('#lblNotValid').text('');

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
                    scrollToElement($('#firstNamePayment'));
                }
                else if (element === 'email' && !isValidEmail(value)) {
                    inputs[element].nextElementSibling.innerHTML = "Please enter a valid email";
                    scrollToElement($('#emailPayment'));
                }
                else if (element === 'mobile' && !isValidPhone(value)) {
                    inputs[element].nextElementSibling.innerHTML = "Please provide valid phone number";
                    scrollToElement($('#phoneNumberPayment'));
                }
                else if (element === 'gender') {
                    let gender = getGenderValue();
                    if (!gender) {
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
        Promise.all(promises).then(async () => {
            // here we need to call the API to get the discounted price
            /* let person = $('#personcount').val()
            if(!person) person = 1; */
            let person = 1
            var settings = {
                "url": nodeApi + "/applyCoupon",
                "method": "POST",
                "timeout": 0,
                "headers": {
                    "Content-Type": "application/json"
                },
                "data": JSON.stringify({
                    "amount": $('#totalPrice').val(),
                    "tshirtSize": $("input[name='t-shirt-size']").val(),
                    "tshirtCouponCode": $('#tshirtCouponCode').val(),
                    "tshirtStyle": $("input[name='tshirt-image']").val(),
                    "tshirtStyle": $("input[name='tshirt-image']").val(),
                    "isTshirtAdded": $('#checkbox-tshirt').prop('checked'),
                    "firstName": $('#firstNamePayment').val(),
                    "lastName": $('#lastNamePayment').val(),
                    "email": $('#emailPayment').val(),
                    "phoneNumber": $('#phoneNumberPayment').val(),
                    "planDuration": $('#selectedPlan').val(),
                    "noOfPersons": person,
                    'gender': getGenderValue(),
                    'dateOfBirth': $('#dob').val(),
                    "couponCode": $('#txtCouponCode').val(),
                    "location": $('#location').val(),
                    "days": $('#days').val(),
                    "timing": $('#timing').val()
                }),
            };

            //creates new orderId everytime
            $.ajax(settings).done(function (response) {
                // show final discounted price in the UI 
                $('#lblNotValid').addClass('displayNone')
                $('#lblRemove').removeClass('displayNone')
                $('#hdnCouponApplied').val(true)
                const selectedSize = $("input[name='t-shirt-size']:checked").val()
                const tshirtPrice = getPopupPriceValuesForTshirt(selectedSize);
                const isTshirtCouponApplied = $('#hdnTshirtCouponApplied').val() === 'true' ? true : false;

                globleTshirtPrice = response?.finalTshirtPrice
                globleFinalPrice = response?.finalPrice
                globleDiscount = response?.discount
                globleDiscountValue = response?.discountValue

                if ($('#checkbox-tshirt').prop('checked') && isTshirtCouponApplied) {
                    $('#finalTshirtPayableAmount').text("₹" + response.finalTshirtPrice)
                    setValuesOnPaymentPopup(globleFinalPrice, globleDiscount, globleDiscountValue, globleTshirtPrice)
                }
                else if ($('#checkbox-tshirt').prop('checked') && !isTshirtCouponApplied) {
                    globleTshirtPrice = tshirtPrice
                    setValuesOnPaymentPopup(globleFinalPrice, response?.discount, response?.discountValue, globleTshirtPrice)
                }
                else if (!$('#checkbox-tshirt').prop('checked') && !isTshirtCouponApplied) {
                    setValuesOnPaymentPopup(globleFinalPrice, response?.discount, response?.discountValue, 0)
                }
                else {
                    globleTshirtPrice =  tshirtPrice
                    setValuesOnPaymentPopup(globleFinalPrice, response?.discount, response?.discountValue, globleTshirtPrice)
                }
            }).fail(function (jqXHR, exception) {
                // show message that invalid coupon
                $('#lblNotValid').text('Not a valid coupon');
                $('#lblNotValid').removeClass('displayNone')
                $('#lblRemove').addClass('displayNone')
                $('#hdnCouponApplied').val(false)
            })
        })

    })

    $('#closePaymentForm').click((e) => {
        $("#payment-form")[0].reset();
    });

    function scrollToElement(element) {
        $('html, body').animate({
            scrollTop: element.offset().top - 10
        }, 3000);
        element.focus();
    }
});