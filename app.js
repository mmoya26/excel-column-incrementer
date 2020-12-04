let btn_add = document.getElementById("btn_add")
let input_div_container = document.getElementById("inputs_container");
let containerNodesCount = input_div_container.childElementCount;
let choosenCharacter;
let generatedTable = document.getElementById("generated_table");
let alreadyChoosen = false;

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
            }
            return
        }

        if (inputBox.classList.contains("selected")) {
            inputBox.classList.remove("selected");
            alreadyChoosen = false;
        }   
        else {
            inputBox.classList.add("selected");
            alreadyChoosen = true;
        }
        
    });

    input_div_container.appendChild(inputBox);
});

let btn_reset = document.getElementById("btn_reset");

btn_reset.addEventListener("click", (event) => {

    // REMOVE ALL INPUT BOXES
    while(input_div_container.firstChild) {
        input_div_container.removeChild(input_div_container.firstChild)
    }

    // REMOVE ALL TABLE ROWS
    while(generatedTable.firstChild) {
        generatedTable.removeChild(generatedTable.firstChild);
    }
});


let btn_generate = document.getElementById("btn_generate");
btn_generate.addEventListener("click", (event) => {
    let counter = 5;
    

    for (i = 0; i < counter; i++) {
        let tableRow = document.createElement("tr") 
        let tableData = document.createElement("td");
        tableData.innerHTML = "XD";
        tableRow.appendChild(tableData);
        generatedTable.appendChild(tableRow);
    }
});

// DRAG AND DROP FUNCTIONALITY
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
  ev.target.removeChild(ev.target.firstChild);
}