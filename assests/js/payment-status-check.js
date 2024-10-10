//const nodeApi =  "https://dev-api.alite.fit";
//const appUrl = 'http://dev.alite.fit';

const nodeApi =  "https://api.alite.fit";
const appUrl = 'https://www.alite.fit/';

function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

$(document).ready(async()=>{
    $('#notValidOrder').addClass('displayNone')
    $('#pendingDiv').removeClass('displayNone')
    let orderId = getParameterByName('id');
    try {
        if(orderId) {
            var statusInterval = setInterval(()=>{
                getStaus();
            }, 2000)
        } else {
            $('#notValidOrder').removeClass('displayNone')
            $('#pendingDiv').addClass('displayNone')
        }
        let getStaus = async () => {
            fetch(nodeApi + '/payment-status-check?id='+ orderId, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => response.json())
            .then(response => {
                console.log('....: ', response);
                console.log('response.message: ', response);
                if(response.message == 'OrderId is not valid') {
                    $('#notValidOrder').removeClass('displayNone')
                    $('#pendingDiv').addClass('displayNone')
                    clearInterval(statusInterval);
                }
                if(response.message == 'Unable to get the status' || response.message == 'PENDING') {
                   // to handle other unknown cases. kept if condition blank.
                } else {
                    clearInterval(statusInterval);
                }
                if(response.message == 'SUCCESS') {
                    location.href = appUrl + 'thankyou.html'
                }
                if(response.message == 'FAILED') {
                    location.href = appUrl + 'payment-failed.html'
                }
            }).catch(()=>{
                console.log("capturing the error");
                $('#notValidOrder').removeClass('displayNone')
                $('#pendingDiv').addClass('displayNone')
                clearInterval(statusInterval);
            })    
        }
    } catch(e) {
        console.log("error", e);
    }
})
