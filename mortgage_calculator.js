let year = document.getElementById("loan-term");
let loan = document.getElementById("loan");
let rate = document.getElementById("rate");
let interval = document.getElementById("frequency");
let slider = document.getElementById("slider");

let calBtn = document.getElementById("calculateBtn");

let repayment = document.getElementById("repayment");
let interest = document.getElementById("interest");
let principle = document.getElementById("principle");
let total = document.getElementById("total");
let numOfPay = document.getElementById("numOfPay");

/*Slider*/
year.innerHTML = slider.value; // Display the default slider value
// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
    year.innerHTML = this.value;
} 

const calPayment = (rate,interval,year,loan) => {
    r = (rate / 100) / interval;
    n = year * interval;
    let instalment = loan * ( ( r * (1 + r) ** n) ) / ( ( (1 + r) ** n ) - 1) ;
    let totalLoan = instalment * n;
    let totalInterest = totalLoan - loan;
    return [instalment, totalInterest, totalLoan, n];
}

loan.onchange = calculate;
rate.onchange = calculate;
interval.onchange = calculate;
slider.onchange = calculate;

/* To calculate repayment upon any changes to input fields */
function calculate() {
    /*Debugging*/
    console.log(`The value of loan term is ${year.innerHTML}`);
    console.log(`The value of loan amount is ${loan.value}`)
    console.log(`The value of interest rate ${rate.value}`)
    console.log(`The value of frequency ${interval.value}`)

    if (loan.value != '' && rate.value != '' && interval.value != '') {
        let answer = calPayment(rate.value, interval.value, year.innerHTML, loan.value);
        repayment.innerHTML = formatPrice(answer[0]);
        interest.innerHTML = formatPrice(answer[1]);
        principle.innerHTML = formatPrice(Number(loan.value));
        total.innerHTML = formatPrice(answer[2]);    
        numOfPay.innerHTML = (answer[3]);   
    }
}

/* Helper function to set currency and */
function formatPrice(num) {
    options = 
    {   
        currency: "NZD",
        style: "currency"
    };
    return num.toLocaleString("en-NZ", options);
}

// calBtn.onclick = function() {
//     /*Debugging*/
//     console.log(`The value of loan term is ${year.innerHTML}`);
//     console.log(`The value of loan amount is ${loan.value}`)
//     console.log(`The value of interest rate ${rate.value}`)
//     console.log(`The value of frequency ${interval.value}`)

//     if (loan.value != '' && rate.value != '' && interval.value != '') {
//         let answer = calPayment(rate.value, interval.value, year.innerHTML, loan.value);
//         repayment.innerHTML = formatPrice(answer[0]);
//         interest.innerHTML = formatPrice(answer[1]);
//         principle.innerHTML = formatPrice(Number(loan.value));
//         total.innerHTML = formatPrice(answer[2]);       
//     }
// }
