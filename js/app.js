// fetching the elements from document using getElementById 
const name = document.getElementById("name");
const submitBtn = document.getElementById("submit");
const saveBtn = document.getElementById("save")
const clearBtn = document.getElementById("clear");
const prediction = document.getElementById("predictionAnswer");
const message = document.getElementById("message");
const savedData = document.getElementById("savedAnswer");
const clearMsg = document.getElementById("clearMessage");
var elements = document.getElementsByTagName("input");
//making a regex for validating the input form used for save and submit button
const validInput=/^[ A-Za-z]{1,255}$/;

var inputName = "";
//fetching the data from api and displaying the data in prediction section and if its found in local storage displaying the data in saved answer section
const getPredictionData = name => {
    
    const url = "https://api.genderize.io/";

    if (localStorage.getItem(name.trim()) != null) {
        let gender = localStorage.getItem(name);
        savedData.innerHTML = `
            <span class="title-wrapper">
                Saved answer
            </span>
            <br>
        
                Name: ${name}<br/>
                Gender: ${gender}<br/>

        `
        clearBtn.style.display = "block";
    }

    

    fetch(url + "?name=" + name, {
        method: 'GET',
    })
    .then(res => res.json())
    .then(data => {
        if(data.gender === null){
            prediction.innerHTML=`
            <span style="color:red" >No predictions found!</span><br/>`
        }
        else{
        prediction.innerHTML = `
            <span style="color:green" >Name successfully found!</span><br/>
            Name: ${data.name}<br/>
            Gender: ${data.gender}<br/>
            Probability: ${data.probability}<br/>
        `
        }
    })
    //catching errors in case of network problem
    .catch(err => {
        prediction.innerHTML = `
            <span style="color:red" >
                Network error occurred!
            </span>
        `
    })
    }


name.addEventListener("change", e => {
    inputName = e.target.value;
})

//attaching the logic to submit button if case of clicking it and added the input validator 
submitBtn.addEventListener("click", e => {
    e.preventDefault();
    savedData.innerHTML = ``
    clearBtn.style.display = "none";
    //validating
    if(!validInput.test(name.value)){
        clearMsg.innerHTML =`
        <span style="color: red">
            Invalid input!
        </span>
        `
        prediction.innerHTML=``
    }
    else{
    
    clearMsg.innerHTML=``;
    getPredictionData(name.value);
    }
})

//attaching the logic to save button if case of clicking it and added the input validator 
saveBtn.addEventListener("click", e => {    
    e.preventDefault();
    clearMsg.innerHTML=``;
    var selectedGender = document.querySelector('input[name="gender"]:checked').value;
    var selectedName = document.querySelector('#name').value;
    //validating
    if(!validInput.test(selectedName)){
        clearMsg.innerHTML =`
        <span style="color: red">
            Invalid input!
        </span>
        `
    }
    //saving a new answer
    else if (localStorage.getItem(name.value) === null) {
        localStorage.setItem(name.value, selectedGender);
        savedData.innerHTML = `
            <span class="title-wrapper">
                Saved answer
            </span>
            <br>
        
                Name: ${selectedName}<br/>
                Gender: ${selectedGender}<br/>

        `
        //unChecking the radio buttons
        for (let i = 0; i < elements.length; i++) {
            if (elements[i].type == "radio") {
                elements[i].checked = false;
            }
        }
        clearBtn.style.display = "block";
        
    } else {
        //over writing an answer
        localStorage.setItem(name.value, selectedGender);
        savedData.innerHTML = `
            <span class="title-wrapper">
                Saved answer
            </span>
            <br>
        
                Name: ${selectedName}<br/>
                Gender: ${selectedGender}<br/>

        `
        //unChecking the radio buttons
        for (let i = 0; i < elements.length; i++) {
            if (elements[i].type == "radio") {
                elements[i].checked = false;
            }
        }
        clearBtn.style.display = "block";
    } 
    

})

//attaching the logic to the clear button in case of clicking it and removing the answer from local storage
clearBtn.addEventListener("click", () => {
    localStorage.removeItem(name.value);
    clearMsg.innerHTML = `
    <span style="color: green">
    NAME "${name.value}" successfully deleted!
    </span>
    `
    prediction.innerHTML=``
    savedData.innerHTML=``
    clearBtn.style.display = "none";
    name.value = "";
    //unChecking the radio buttons
    for (let i = 0; i < elements.length; i++) {
        if (elements[i].type == "radio") {
            elements[i].checked = false;
        }
    }
})



