const name = document.getElementById("name");
const submitBtn = document.getElementById("submit");
const saveBtn = document.getElementById("save")
const clearBtn = document.getElementById("clear");
const prediction = document.getElementById("predictionAnswer");
const message = document.getElementById("message");
const savedData = document.getElementById("savedAnswer");
const clearMsg = document.getElementById("clearMessage");
var elements = document.getElementsByTagName("input");
const validInput=/^[ A-Za-z]{1,255}$/;

var inputName = "";

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


submitBtn.addEventListener("click", e => {
    e.preventDefault();
    clearMsg.innerHTML=``;
    getPredictionData(name.value);
})

saveBtn.addEventListener("click", e => {    
    e.preventDefault();
    clearMsg.innerHTML=``;
    var selectedGender = document.querySelector('input[name="gender"]:checked').value;
    var selectedName = document.querySelector('#name').value;
    if(!validInput.test(selectedName)){
        clearMsg.innerHTML =`
        <span style="color: red">
            Invalid input!
        </span>
        `
    }
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
        for (let i = 0; i < elements.length; i++) {
            if (elements[i].type == "radio") {
                elements[i].checked = false;
            }
        }

        name.value = "";

    } else {
        
        localStorage.setItem(name.value, selectedGender);
        savedData.innerHTML = `
            <span class="title-wrapper">
                Saved answer
            </span>
            <br>
        
                Name: ${selectedName}<br/>
                Gender: ${selectedGender}<br/>

        `
        for (let i = 0; i < elements.length; i++) {
            if (elements[i].type == "radio") {
                elements[i].checked = false;
            }
        }
        name.value = "";
    } 
    clearBtn.style.display = "block";

})


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
})



