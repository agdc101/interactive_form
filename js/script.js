/*- Gives the name input focus immedietely -*/
document.querySelector('#name').focus();
/*- ------------------------------------- -*/
/*- Shows 'other job input' if 'other' is selected for job role -*/
const otherJobDiv = document.querySelector('.job_other');
const jobRoleInput = document.querySelector('#title');
jobRoleInput.addEventListener('change', (e) => {
    if (e.target.value == 'other') {
        otherJobDiv.style.display = 'block';
    } else {
        otherJobDiv.style.display = 'none';
    }
});
/*- ------------------------------------- -*/
/*- ------------------------------------- -*/
/*-- t-shirt info functionality --*/
const tshirtDesignInput = document.querySelector('#design');
const tshirtColorInput = document.querySelector('#color');
const colourOptions = document.querySelectorAll('#color option');
tshirtColorInput.value = 'noTheme';
tshirtColorInput.disabled = true;

// Simple function that enables the select list and adjusts the field.
const updateTshirtField = (tshirt) => {
    tshirtColorInput.disabled = false;
    tshirtColorInput.value = tshirt;
};
// event listener that changes the list based on the tshirt design that the user has selected.
tshirtDesignInput.addEventListener('change', (e) => {
    colourOptions.forEach(colour => {
        colour.style.display = '';
    }); 
    if (e.target.value === 'js puns') {
        updateTshirtField('cornflowerblue');
        colourOptions.forEach((colour, index) => {
            if (index > 3 || index == 0) {
                colour.style.display = 'none';
            }
    })     
    } else if (e.target.value === 'Select Theme') {
        tshirtColorInput.disabled = true;
        tshirtColorInput.value = 'noTheme';
    } else {
        updateTshirtField('tomato');
        colourOptions.forEach((colour, index) => {
            if (index <= 3) {
                colour.style.display = 'none';
            }
        }); 
    }
});
/*- ------------------------------------- -*/
/*- ------------------------------------- -*/
/*-- ”Register for Activities” section --*/
const tuesdayMorningEvents = document.querySelectorAll('input[data-day-and-time="Tuesday 9am-12pm"]');
const tuesdayNoonEvents = document.querySelectorAll('input[data-day-and-time="Tuesday 1pm-4pm"]');
const activityInputs = document.querySelectorAll('.activities input');
const costSpan = document.querySelector('#workshop_cost');

// function that disables a checkbox option and shows the hidden message
const disableOption = (option) => {
    option.disabled = true;
    option.closest('label').style.color = 'gray';
    option.nextElementSibling.style.display = 'block';
}
// function that enables a checkbox option and hides the hidden message
const enableOption = (option) => {
    option.disabled = false;
    option.closest('label').style.color = 'black';
    option.nextElementSibling.style.display = 'none';
}
// this function checks for event clashes. then calls the relevant function to hide or show the option.
const eventClash = (input, index, array) => {
    if(index == 0 && input.checked) {
        disableOption(array[1]);
    }
    else if (index == 1 && input.checked) {
        disableOption(array[0]);
    }
    else if(index == 0 && !input.checked) {
        enableOption(array[1]);
    }
    else if (index == 1 && !input.checked) {
        enableOption(array[0]);
    }
}
// gets the total cost of all the events that are checked.
let cost = 0;
const getTotalCost = () => {
    cost = 0;
    activityInputs.forEach(input => {
        if (input.checked) {
            cost += parseInt(input.getAttribute('data-cost'));
        }
    })  
    return cost;
};

const updateCost = (cost) => {
    costSpan.textContent= ` $${cost}`;
}

// event listeners for the events that may clash with each other & for adding the cost of workshops
tuesdayMorningEvents.forEach((input, index, array) => {
    input.addEventListener('change', () => {
      eventClash(input, index, array);
    })
})
tuesdayNoonEvents.forEach((input, index, array) => {
    input.addEventListener('change', () => {
        eventClash(input, index, array);
    })
})
activityInputs.forEach((input) => {
    input.addEventListener('change', () => {
        updateCost(getTotalCost()); // pass the cost of all the checked workshops to the updatecost function which updates the total cost span.
    })
})
/*- ------------------------------------- -*/
/*- ------------------------------------- -*/
/*-- ”Payment Information” section --*/
const paymentOptionInput = document.querySelector('#payment');
const creditCardDiv = document.querySelector('.credit-card');
const paypalDiv = document.querySelector('.paypal');
const bitcoinDiv = document.querySelector('.bitcoin');

paymentOptionInput.value = 'credit card'; // input set to 'credit card' by default.

paymentOptionInput.addEventListener('change', (e) => {
    if (e.target.value == 'credit card') {
        hideOrShowPaymentDivs('none', 'none', 'block');
    } else if (e.target.value == 'paypal') {
        hideOrShowPaymentDivs('none', 'block', 'none');
    } else {
        hideOrShowPaymentDivs('block', 'none', 'none');
    }
})
// function that sets the display of the payment divs.
const hideOrShowPaymentDivs = (bitcoin, paypal, creditCard) => {
    bitcoinDiv.style.display = bitcoin;
    paypalDiv.style.display = paypal;
    creditCardDiv.style.display = creditCard;
}
/*- ------------------------------------- -*/
/*- ------------------------------------- -*/
/*-- form validation --*/
const formButton = document.querySelector('#submit');
const form = document.querySelector('form');
const nameField = document.querySelector('#name');
const nameErrorMsg = document.querySelector('#invalid_name_msg');

const nameRegex = /^\D+$/;

form.addEventListener('submit', (e) => {
    if (!nameRegex.test(nameField.value)) {
        e.preventDefault();
        nameField.style.border = '3px solid red';
        nameErrorMsg.style.display = 'inline-block';
    }
})