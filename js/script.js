/*----------- VARIABLES ------------*/
//-- name, email section variables.
const nameField = document.querySelector('#name');
const emailField = document.querySelector('#mail');
const nameErrorMsg = document.querySelector('#name_msg');
const noNameMsg = document.querySelector('#no_name_msg');
const emailErrorMsg = document.querySelector('#email_msg');
const noEmailMsg = document.querySelector('#no_email_msg');
//-- t-shirt secton variables.
const tshirtDesignInput = document.querySelector('#design');
const tshirtColorInput = document.querySelector('#color');
const colourOptions = document.querySelectorAll('#color option');
//-- workshop secton variables.
const tuesdayMorningEvents = document.querySelectorAll('input[data-day-and-time="Tuesday 9am-12pm"]');
const tuesdayNoonEvents = document.querySelectorAll('input[data-day-and-time="Tuesday 1pm-4pm"]');
const activityInputs = document.querySelectorAll('.activities input');
const costSpan = document.querySelector('#workshop_cost');
//--  activity section variables.
const activitySection = document.querySelector('.activities');
const activityMsg = document.querySelector('#activity_msg');
//-- payment secton variables.
const paymentOption = document.querySelector('#payment');
const creditCardDiv = document.querySelector('.credit-card');
const paypalDiv = document.querySelector('.paypal');
const bitcoinDiv = document.querySelector('.bitcoin');
const cardNo = document.querySelector('#cc-num');
const cardNumMsg = document.querySelector('#cardNo_msg');
const noCardMsg = document.querySelector('#noCard_msg');
const zipNo = document.querySelector('#zip');
const zipNumMsg = document.querySelector('#zipNo_msg');
const noZipMsg = document.querySelector('#noZip_msg');
const cvvNo = document.querySelector('#cvv');
const cvvNumMsg = document.querySelector('#cvvNo_msg');
const noCvvMsg = document.querySelector('#noCvv_msg');
//-- form validation variables.
const form = document.querySelector('form');
const pageErrorMsg = document.querySelector('#submit_error');
/*--- ---------------------------------------- ---*/
//---- Regex's
const nameRegex = /^[-a-zA-Z\s]+$/;
const emailRegex = /\w+@\w+\.\w{2,}/;
const emptyRegex = /^$/;
const cardNoRegex = /^\d{13,16}$/;
const zipRegex = /^\d{5}$/;
const cvvRegex = /^\d{3}$/;

/*--------- UNIVERSAL FUNCTIONS ---------*/
// resets the form field/section and hides error messages.
const fieldReset = (input, msg1, msg2) => {
    input.style.border = '';
    msg1.style.display = 'none';
    msg2.style.display = 'none';
}
const sectionReset = (section, msg) => {
    section.classList.remove('background_error');
    msg.style.display = 'none';
}

// error functions. makes an error message display and a gives the field a red border or gives the section a red background.
const inputError = (input, msg) => {
    msg.style.display = 'block';
    input.style.border = '2px solid red';
}
const sectionError = (section, msg) => {
    section.classList.add('background_error');
    msg.style.display = 'block';
}

// removes the main error message when the user re-engages with the page.
window.addEventListener('change', () => {
    pageErrorMsg.style.display = 'none';
});
/* ------------------------------------- */
/*--------- PERSONAL DETAILS SECTION ---------*/
// Gives the name input focus immedietely
document.querySelector('#name').focus();

// name field must only contain letters and -.
nameField.addEventListener('keyup', (e) => {
    nameValidator(nameField);
});
// email field must contain the @ symbol and a full stop.
emailField.addEventListener('keyup', (e) => {
    emailValidator(emailField);
});

// these functions test the name and email inputs against the 'empty', 'name', 'email' and regexs.
const nameCheck = (input) => nameRegex.test(input) && !emptyRegex.test(input);
const emailCheck = (input) => emailRegex.test(input) && !emptyRegex.test(input);

// these functions validate the email and name fields. making the borders red and displaying error messages if required.
const nameValidator = (input) => { 
    if (emptyRegex.test(input.value)) {
        inputError(input, noNameMsg);
        nameErrorMsg.style.display = 'none';
    } else if (!nameRegex.test(input.value)) {
        inputError(input, nameErrorMsg);
        noNameMsg.style.display = 'none';
    } else {
        fieldReset(input, nameErrorMsg, noNameMsg);
    }
};
const emailValidator = (input) => { 
    if (emptyRegex.test(input.value)) {
        inputError(input, noEmailMsg);
        emailErrorMsg.style.display = 'none';
    } else if (!emailRegex.test(input.value)) {
        inputError(input, emailErrorMsg);
        noEmailMsg.style.display = 'none';
    } else {
        fieldReset(input, emailErrorMsg, noEmailMsg);
    }
};
/*--- ---------------------------------------- ---*/
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
/*--------- T-SHIRT SECTION ---------*/
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
    } else if (e.target.value === 'select_theme') {
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
/*- --------------------------------------- -*/
/*----------- ACTIVITIES SECTION ------------*/
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

// gets the total cost of all the events that are checked.
const getTotalCost = () => {
    let cost = 0;
    activityInputs.forEach(input => {
        if (input.checked) {
            cost += parseInt(input.getAttribute('data-cost'));
        }
    })  
    return cost;
};

// updates the cost to the DOM.
const updateCost = (cost) => {
    costSpan.textContent= ` $${cost}`;
};

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
// function listens for changes on the activity list.
activityInputs.forEach((input) => {
    input.addEventListener('change', () => {
        updateCost(getTotalCost()); // pass the cost of all the checked workshops to the updatecost function which updates the total cost span.
        activityValidator(); // validate the list. check if anything has been ticked etc.
    })
});
// event listeners for the events that may clash with each other & for adding the cost of workshops
tuesdayMorningEvents.forEach((input, index, array) => {
    input.addEventListener('change', () => {
      eventClash(input, index, array);
    })
});
tuesdayNoonEvents.forEach((input, index, array) => {
    input.addEventListener('change', () => {
        eventClash(input, index, array);
    })
});
// checks that at least 1 workshop has been checked. if not, errors are produced.
const activityValidator = () => { 
    let inputCheck = false;
    activityInputs.forEach((input) => {
        if (input.checked) {
            inputCheck = true;
        }
    });
    if (!inputCheck) {
        sectionError(activitySection, activityMsg);
    } else {
        sectionReset(activitySection, activityMsg);
    }
    return inputCheck;
};
/*- ------------------------------------- -*/
/*----------- PAYMENT SECTION -------------*/
// input set to 'credit card' by default.
paymentOption.value = 'credit card'; 

// listens for changes on the payment select list.
paymentOption.addEventListener('change', (e) => {
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

// checks the whether all the card details match the regex and are not empty!
const cardCheck = ((number, zip, cvv) => {
    return cardNoRegex.test(number) && !emptyRegex.test(number) && 
    zipRegex.test(zip) && !emptyRegex.test(zip) && 
    cvvRegex.test(cvv) && !emptyRegex.test(cvv);
});

// validator function builder.
const validatorFunc = (input, inputVal, regex, blankMsg, errorMsg) => {
    if (emptyRegex.test(inputVal)) {
        inputError(input, blankMsg);
        errorMsg.style.display = 'none';
    } else if (!regex.test(input.value)) {
        inputError(input, errorMsg);
        blankMsg.style.display = 'none';
    } else {
        fieldReset(inputVal, errorMsg, blankMsg);
    }
}

// sends the relevant data to the validator function builder, for each field.
const cardNumValidator = (input) => { 
    validatorFunc(cardNo, input, cardNoRegex, noCardMsg, cardNumMsg);
};
const zipNoValidator = (input) => { 
    validatorFunc(zipNo, input, zipRegex, noZipMsg, zipNumMsg);
};
const cvvNoValidator = (input) => { 
    validatorFunc(cvvNo, input, cvvRegex, noCvvMsg, cvvNumMsg);
};

// function runs all the card validation functions when called.
const creditCardValidator = () => {
    cvvNoValidator(cvvNo);
    zipNoValidator(zipNo);
    cardNumValidator(cardNo);
};

// keyboard listerners provides the user with live validation.
cardNo.addEventListener('keyup', (e) => {
    cardNumValidator(e.target);
});
zipNo.addEventListener('keyup', (e) => {
    zipNoValidator(e.target);
});
cvvNo.addEventListener('keyup', (e) => {
    cvvNoValidator(e.target);
});
/*- -------------------------------------- -*/
/*----------- FORM SUBMITION ------------- -*/
form.addEventListener('submit', (e) => {
    if (paymentOption.value == 'credit card') {
        if (!nameCheck(nameField.value) || !emailCheck(emailField.value) || !cardCheck(cardNo.value, zipNo.value, cvvNo.value) || !activityValidator()) {
            pageErrorMsg.style.display = 'inline-block';
            e.preventDefault();
            emailValidator(emailField);
            nameValidator(nameField);
            activityValidator();
            creditCardValidator();
        } else {
            e.submit();
        }
    } else {
        if (!nameCheck(nameField.value) || !emailCheck(emailField.value) || !activityValidator()) {
            pageErrorMsg.style.display = 'inline-block';
            e.preventDefault();
            emailValidator(emailField);
            nameValidator(nameField);
            activityValidator();
        } else {
            e.submit();
        }
    }
});
/*- ----------------------------------- -*/