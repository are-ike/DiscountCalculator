//get input fields divs
const percentForm = document.querySelector('#percent-form-group');
const fixedForm = document.querySelector('#amt-form-group');
//get input fields
const percentInput = document.querySelector('#percentInput');
const fixedInput = document.querySelector('#amtInput');
//get select
const select = document.querySelector('#inputState');
// //get results
const results = document.querySelector('#results');
//get img in loader
const image = document.querySelector('img');
//get price
const price = document.querySelector('#price');
//get form 
const form = document.querySelector('#form');
//get img div
const loader = document.querySelector('#loader');


//styling loader div
loader.style.width = '10vh'
//hiding the gif
image.classList.add('d-none');
// //hiding the results
results.classList.add('d-none');


//choose discount type function
const chooseDiscType = (e) => {
    if(e.target.value === 'percentOption'){
        percentInput.classList.remove('d-none');
        percentForm.children[0].classList.remove('d-none');
        
        if(fixedForm.children[0].classList.contains('d-none') === false|| fixedInput.classList.contains('d-none') === false){
            fixedForm.children[0].classList.add('d-none');
            fixedInput.classList.add('d-none');
            fixedInput.value = '';
        }
    }
    else if(e.target.value === 'fixedOption'){
        fixedForm.children[0].classList.remove('d-none');
        fixedInput.classList.remove('d-none');

        if(percentForm.children[0].classList.contains('d-none') === false|| percentInput.classList.contains('d-none') === false){
            percentForm.children[0].classList.add('d-none');
            percentInput.classList.add('d-none');
            percentInput.value = '';
        }
    }
    else{
        if(fixedForm.children[0].classList.contains('d-none') === false|| fixedInput.classList.contains('d-none') === false){
            fixedForm.children[0].classList.add('d-none');
            fixedInput.classList.add('d-none');
            fixedInput.value = '';
        }
        if(percentForm.children[0].classList.contains('d-none') === false|| percentInput.classList.contains('d-none') === false){
            percentForm.children[0].classList.add('d-none');
            percentInput.classList.add('d-none');
            percentInput.value = '';
        }
    }
}

//show loader function 
const showLoader = (e) => {
    if(results.classList.contains('d-none') === false){
        results.classList.add('d-none')
    }
    image.classList.remove('d-none');
    setTimeout(calculate, 1000)
    e.preventDefault();
}

//clear error function
const clearError = () => {
    const errorDiv = document.querySelector('.alert').remove();
}
//show error function
const showError = (error) => {
    //remove existing error div before putting another
    const alert = document.querySelector('.alert');
    if(alert){
        clearError();
    }

    const card = document.querySelector('.card-body');
    const cardTitle = document.querySelector('.card-title')

    const errorDiv = document.createElement('div');
    errorDiv.classList.add('alert', 'alert-danger');
    errorDiv.appendChild(document.createTextNode(error));

    card.insertBefore(errorDiv, cardTitle);
    //clear error message ater 3 secs
    setTimeout(clearError, 3000);

}

//calculate function
const calculate = () => {
    //error message
    if(price.value === ''){
        showError('Please Input Your Values');
        image.classList.add('d-none');
        return;
    }

    const newPrice = document.querySelector('#newPrice');
    const amtSaved = document.querySelector('#amtSaved');
    if(select.value === 'percentOption'){
        if(isFinite(percentInput.value)){
            //error message
            if(percentInput.value === ''){
                showError('Please Input Your Values');
                image.classList.add('d-none');
                return;
            }
            amtSaved.value = ((parseFloat(percentInput.value) / 100) * parseFloat(price.value)).toFixed(2);
            newPrice.value = (parseFloat(price.value) - amtSaved.value).toFixed(2);
        }
        //there was supposed to be an else here for the error to show if the value isnt 
        //infinite but it was always infinite so the else never went, so i put the error
        //condition in the last else block
    }
    else if(select.value === 'fixedOption'){
        if(isFinite(fixedInput.value)){
            //error message
            if(fixedInput.value === ''){
                showError('Please Input Your Values');
                image.classList.add('d-none');
                return;
            }
            amtSaved.value = parseFloat(fixedInput.value).toFixed(2);
            newPrice.value = (parseFloat(price.value) - amtSaved.value).toFixed(2);
        }
        //there was supposed to be an else here for the error to show if the value isnt 
        //infinite but it was always infinite so the else never went, so i put the error
        //condition in the last else block
    }
    else{
        showError('Please Select Discount Type and Input Your Values');
        image.classList.add('d-none');
        return;
        }
    
    image.classList.add('d-none');
    results.classList.remove('d-none');
}

//add events
select.addEventListener('click', chooseDiscType);
form.addEventListener('submit', showLoader);