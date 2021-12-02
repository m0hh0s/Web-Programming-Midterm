const name = document.getElementById("name");
const submitBtn = document.getElementById("submit");
const saveBtn = document.getElementById("save")
const clearBtn = document.getElementById("clear");
const prediction = document.getElementById("predictionAnswer");
const message = document.getElementById("message");
const savedData = document.getElementById("savedAnswer");
const clearMsg = document.getElementById("clearMessage");
var elements = document.getElementsByTagName("input");


var inputName = "";

const getPredictionData = name => {
    
    const url = "https://api.genderize.io/";

    if (localStorage.getItem(name.trim()) != null) {
        let gender = localStorage.getItem(name);
        savedData.innerHTML = `
            <span class="title-wrapper">
                Saved Answer
            </span>
            <br>
        
                name: ${name}<br/>
                gender: ${gender}<br/>

        `
        clearBtn.style.display = "block";
    }

    

    fetch(url + "?name=" + name, {
        method: 'GET',
    })
    .then(res => res.json())
    .then(data => {
        prediction.innerHTML = `
            <span style="color:green" >Name successfully found</span><br/>
            name: ${data.name}<br/>
            gender: ${data.gender}<br/>
            probability: ${data.probability}<br/>
        `
    })
    .catch(err => {
        prediction.innerHTML = `
            <span style="color:red" >
                prediction For name ${name} not found
                error: ${err}
            </span>
        `
    })
    }


name.addEventListener("change", e => {
    inputName = e.target.value;
})


submitBtn.addEventListener("click", e => {
    e.preventDefault();
    getPredictionData(name.value);
})

saveBtn.addEventListener("click", e => {    
    e.preventDefault();
    var selectedGender = document.querySelector('input[name="gender"]:checked').value;
    
    if (localStorage.getItem(name.value) === null) {
        localStorage.setItem(name.value, selectedGender);
        savedData.innerHTML = `
            <span class="title-wrapper">
                Saved Answer
            </span>
            <br>
        
                name: ${name}<br/>
                gender: ${gender}<br/>

        `
        for (let i = 0; i < elements.length; i++) {
            if (elements[i].type == "radio") {
                elements[i].checked = false;
            }
        }

        name.value = "";

    } else {
        selectedName=name.value;
        localStorage.setItem(name.value, selectedGender);
        savedData.innerHTML = `
            <span class="title-wrapper">
                Saved Answer
            </span>
            <br>
        
                name: ${selectedName}<br/>
                gender: ${selectedGender}<br/>

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
    NAME "${name.value}" successfullt deleted!
    </span>
    `
    prediction.innerHTML=``
    savedData.innerHTML=``
    clearBtn.style.display = "none";
    name.value = "";
})



