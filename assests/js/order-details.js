let currentPageOrders = [];
//const nodeApi = "https://localhost:3010";
const nodeApi = "https://api.alite.fit";
$(document).ready(async () => {
    populateOrderPage();
    $('#navigation').on('click', 'a', (event) => {
        event.preventDefault();
        const page = $(event.currentTarget).attr('data-index')
        populateOrderPage(page);
    })

    $('table#order-listing tbody').on('click', 'tr', (event) => {
        event.preventDefault();
        const orderIndex = $(event.currentTarget).attr('data-index');
        const currentOrder = currentPageOrders[orderIndex];
        if(currentOrder.paymentId) {
            openPaymentDetailsModal(currentOrder.paymentId);
        }
    })
    
    $('#programdetails').on('hidden.bs.modal', () => {
        $('#payment-id').val('');
        $('#amount').val('');
        $('#status').val('');
        $('#payment-method').val('');
        $('#email').val('');
        $('#contact').val('');
    })
});

async function openPaymentDetailsModal(paymentDetailId) {
    const paymentDetails = await getPaymentDetailsFromAPI(paymentDetailId);
    if(paymentDetails?.success) {
        const paymentDetailInfo = paymentDetails.data;
        $('#payment-id').val(paymentDetailInfo.paymentId);
        $('#amount').val((paymentDetailInfo.amount || 0)/100);
        $('#status').val(paymentDetailInfo.status);
        $('#payment-method').val(paymentDetailInfo.method);
        $('#email').val(paymentDetailInfo.email);
        $('#contact').val(paymentDetailInfo.mobile);
        $('#programdetails').modal('show');
    }
}

async function getPaymentDetailsFromAPI(paymentId) {
    const accessToken = localStorage.getItem('access_token');

    if (!accessToken) {
        redirectToLoginPage();
    }

    const response = await fetch(`${nodeApi}/payment/${paymentId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': accessToken
        }
    });

    const responseJSON = await response.json();

    if (![200, 201].includes(response.status)) {
        if ([401, 403].includes(response.status)) {
            redirectToLoginPage();
        } else {
            throw new Error(responseJSON.message);
        }
    }

    return responseJSON;
}

async function populateOrderPage(page = 1) {
    try {
        const tableBody = $('table#order-listing tbody');
        const paginationNav = $('#navigation')
        tableBody.html(`<tr><td colspan='11' class='text-center'>Processing...</td></tr>`);
        paginationNav.html('');
        const orders = await getOrdersFromAPI(page);
        if(orders?.success) {
            const { list = [], totalPages } = orders.data || {};
            currentPageOrders = list;
            let orderListHtml = generateOrderListHTML(list);
            let paginationHtml = generatePaginationHTML(totalPages, page);
            tableBody.html(orderListHtml);
            if(paginationHtml?.trim()) {
                paginationNav.html(`<ul class="pagination justify-content-center">${paginationHtml}</ul>`)
            }
        }
    } catch (error) {
        handleErrors(error);
    }
}

async function getOrdersFromAPI(page) {
    const accessToken = localStorage.getItem('access_token');

    if (!accessToken) {
        redirectToLoginPage();
    }

    const reqBody = {
        limit: 20,
        sort: { "createdAt": "desc" },
        pageIndex: page
    };

    const response = await fetch(`${nodeApi}/orders`, {
        method: 'POST',
        body: JSON.stringify(reqBody),
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': accessToken
        }
    });

    const responseJSON = await response.json();

    if (![200, 201].includes(response.status)) {
        if ([401, 403].includes(response.status)) {
            redirectToLoginPage();
        } else {
            throw new Error(responseJSON.message);
        }
    }

    return responseJSON;
}

function generateOrderListHTML(list) {
    if (list.length === 0) {
        return `<tr><td colspan='11' class='text-center'>No order found!</td></tr>`;
    }

    return list.map((item, index) => `
        <tr class="text-center mb-2" data-index='${index}'>
            <td class="payment-id ${!item.paymentId ? 'text-decoration-none' : ''}">${item.paymentId || '-'}</td>
            <td>${item.firstName}</td>
            <td>${item.lastName}</td>
            <td>${item.email}</td>
            <td>${item.mobile}</td>
            <td>${item.planDuration}</td>
            <td>${item.noOfPersons}</td>
            <td class='text-capitalize'>${item.status}</td>
            <td>${item.orderAmount}/-</td>
            <td>${moment(item.createdAt).format('DD/MM/YYYY')}</td>
            <td>${item.couponCode}</td>
            <td>${(item.paidAmount || 0)/100}/-</td>
        </tr>
    `).join('');
}

function generatePaginationHTML(totalPages, currentPage) {
    if (totalPages < 1) {
        return '';
    }

    const paginationHtml = [];
    for (let i = 1; i <= totalPages; i++) {
        paginationHtml.push(`<li class="page-item ${i == currentPage ? 'active' : ''}"><a class="page-link" href="javascript:void(0)" data-index="${i}">${i}</a></li>`);
    }
    return paginationHtml.join('');
}

function redirectToLoginPage() {
    location.href = '/login.html';
}

function handleErrors(error) {
    console.error("Error:", error);
}
