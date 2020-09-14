//get input fields divs
const percentForm = document.querySelector('#percent-form');
const fixedForm = document.querySelector('#amt-form')
//get input fields
const percentInput = document.querySelector('#percentOff');
const fixedInput = document.querySelector('#amtOff')

//get select
const select = document.querySelector('#inputState');

//choose discount type
const chooseType = (e) => {
    //i remove d-none attribute to show the input field
    if(e.target.value === 'percentOff'){
        percentForm.children[0].className= 'input-group mb-2';
        percentInput.className = 'form-control';
        //add d-none attribute to other input field so they dont show at the same time
        if(fixedForm.children[0].classList.contains('d-none') !== true){
            fixedForm.children[0].className= 'input-group mb-2 d-none';
            fixedInput.className = 'form-control d-none';
        }
        return;
        }
         //i remove d-none attribute to show the input field
    else if(e.target.value === 'fixedOff'){
        fixedForm.children[0].className= 'input-group mb-2';
        fixedInput.className = 'form-control';
        //add d-none attribute to other input field so they dont show at the same time
        if(percentForm.children[0].classList.contains('d-none') !== true){
            percentForm.children[0].className= 'input-group mb-2 d-none';
            percentInput.className = 'form-control d-none';
        }
        return;
        }
    else{
        //add d-none attribute to both input field so it goes back to how it looks originally
        if(fixedForm.children[0].classList.contains('d-none') !== true){
            fixedForm.children[0].className= 'input-group mb-2 d-none';
            fixedInput.className = 'form-control d-none';
        }
        if(percentForm.children[0].classList.contains('d-none') !== true){
            percentForm.children[0].className= 'input-group mb-2 d-none';
            percentInput.className = 'form-control d-none';
        }
        return;
    }
}
//add event to select
select.addEventListener('click', chooseType);
//clear error
const clearError = () =>{
    document.querySelector('.alert').remove();
}
//show error
const showError = (error) => {
    const card = document.querySelector('.card-body');
    const cardTitle = document.querySelector('.card-title')
    const errorDiv = document.createElement('div');
    errorDiv.className = 'alert alert-danger';
    errorDiv.appendChild(document.createTextNode(error));
    card.insertBefore(errorDiv, cardTitle);
    //clear error message ater 3 secs
    setTimeout(clearError, 3000);
}
const calculate = (e) => {
    
    const price = document.querySelector('#price');
    //i put this hear to do for price what the other showerrors in the else block are doing for fixed and percent input
    if(price.value === '' ){
        showError('Please Input Your Values');
    }
    //get result inputs
    const newPrice = document.querySelector('#newPrice');
    const amtSaved = document.querySelector('#amtSaved');

    if(select.value === "percentOff"){
        const x = parseFloat(percentInput.value);
        if(isFinite(x)){
            const p = (x/100) * parseFloat(price.value);
            amtSaved.value = p.toFixed(2); //2 decimal places
            newPrice.value =  (parseFloat(price.value) - p).toFixed(2);
        }
        else{
            showError('Please Input Your Values'); 
        }
    }
    else if(select.value === "fixedOff"){
        const x = parseFloat(fixedInput.value);
        if(isFinite(x)){    
            amtSaved.value = x.toFixed(2); //2 decimal places
            newPrice.value =  (parseFloat(price.value) - x).toFixed(2);
        }
        else{
            showError('Please Input Your Values');
            //was in the tutorial but didnt end up working
            //because my value was empty string and therefore x was infinite and
            // so it always read true and this else never went 
        }
    }
    
    e.preventDefault();
}

document.querySelector("#form").addEventListener('submit', calculate);

//if i touch any of the form inputs again i want the amt part to disappear
//put error message if inputs have not been filled before calc is pressed
//if i dont put in any values the page reloads
//what to do if percent off and amt off will give negative value
//change id names if possible