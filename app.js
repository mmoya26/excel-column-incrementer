let btn_add = document.getElementById("btn_add");
let btn_generate = document.getElementById("btn_generate");
let btn_reset = document.getElementById("btn_reset");

let input_div_container = document.getElementById("inputs_container");
let containerNodesCount = input_div_container.childElementCount;
let generatedTable = document.getElementById("generated_table");

let alreadyChoosen = false;
let choosenCharacter;

btn_generate.disabled = true;

btn_add.addEventListener("click", (event) =>  {
    containerNodesCount = input_div_container.childElementCount + 1;
    let inputBox = document.createElement("input");

    inputBox.setAttribute("class", "input_square");
    inputBox.setAttribute("maxlength", "1");
    inputBox.setAttribute("draggable", "true");
    inputBox.setAttribute("ondragstart", "drag(event)")
    inputBox.setAttribute("id", `input_box_${containerNodesCount}`);
    inputBox.addEventListener("input", (event) => {

        // CHECK IF THE CHANGE WAS SIMPLY A BACKSPACE
        // IF SO THEN RETURN BECAUSE WE DON'T WANT TO REMOVE FOCUS FROM CURRENT INPUT BOX 
        if (event.data == null) {
            return
        }

        let idNumber = parseInt(inputBox.getAttribute("id").replace( /^\D+/g, ''), 10) + 1;
        let nextElement = document.getElementById(`input_box_${idNumber}`);
        if (nextElement) {
            nextElement.focus();
        }
    });

    inputBox.addEventListener("dblclick", (event) => {
        console.log("Double clicked...");

        if (alreadyChoosen) {
            if (event.target.classList.contains("selected")) {
                inputBox.classList.remove("selected");
                alreadyChoosen = false;
                btn_generate.disabled = true;
            }
            return
        }

        if (inputBox.classList.contains("selected")) {
            inputBox.classList.remove("selected");
            alreadyChoosen = false;
            btn_generate.disabled = true;
        }   
        else {
            inputBox.classList.add("selected");
            alreadyChoosen = true;
            btn_generate.disabled = false;
        }
        
    });

    input_div_container.appendChild(inputBox);
});

btn_reset.addEventListener("click", (event) => {

    // REMOVE ALL INPUT BOXES
    while(input_div_container.firstChild) {
        input_div_container.removeChild(input_div_container.firstChild);
    }

    // REMOVE ALL TABLE ROWS
    while(generatedTable.firstChild) {
        generatedTable.removeChild(generatedTable.firstChild);
    }

    alreadyChoosen = false; 
});

btn_generate.addEventListener("click", (event) => {
    let counter = 10;
    let inputsCounter = input_div_container.childElementCount;
    let childNodesArray = input_div_container.childNodes;
    let inputsOnlyArray = [];
    let inputsCharArray = [];
    let theFinalString = "";
    let currentSelectedValue;
    let selectedIndex;

    for (i = 0; i < inputsCounter; i++) {
        if (childNodesArray[i].tagName == "INPUT") {
            inputsOnlyArray.push(childNodesArray[i]);
        } else {
            inputsCounter++;
        }
    }

    for (i = 0; i < inputsOnlyArray.length; i++) {
        if (inputsOnlyArray[i].classList.contains("selected")) {
            let idNumber = parseInt(inputsOnlyArray[i].getAttribute("id").replace( /^\D+/g, ''), 10) - 1;
            currentSelectedValue = inputsOnlyArray[i].value;
            selectedIndex = idNumber;
        }
        inputsCharArray.push(inputsOnlyArray[i].value);
    }

    for (i = 0; i < inputsCharArray.length; i++) {
        theFinalString += inputsCharArray[i];
    }

    for (i = 0; i < counter; i++) {
        let tableRow = document.createElement("tr") 
        let tableData = document.createElement("td");
        let stringInsert = theFinalString.replaceAt(selectedIndex, currentSelectedValue);

        for (j = selectedIndex + 1; j < inputsCharArray.length; j++) {
            stringInsert += inputsCharArray[j];
        }
        tableData.innerHTML = stringInsert;
        tableRow.appendChild(tableData);
        generatedTable.appendChild(tableRow);
        currentSelectedValue++;
    }
});

// START - DRAG AND DROP FUNCTIONALITY
function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));

  if (ev.target.firstChild.classList.contains("selected")) {
    alreadyChoosen = false;
    btn_generate.disabled = true;
  }

  ev.target.removeChild(ev.target.firstChild);
  renameInputBoxes();
}

function renameInputBoxes() {
    let counter = input_div_container.childElementCount;
    let childNodesArray = input_div_container.childNodes;
    let idCounter = 1
    for (i = 0; i < counter; i++) {
        if (childNodesArray[i].tagName == "INPUT") {
            childNodesArray[i].setAttribute("id", `input_box_${idCounter}`);
            idCounter++;
        } else {
            counter++;
        }
    }
}
// END - DRAG AND DROP FUNCTIONALITY

String.prototype.replaceAt = function(index, replacement) {
    return this.substr(0, index) + replacement;
}