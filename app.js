let btn_generate = document.getElementById("btn_generate")
btn_generate.addEventListener("click", generate);

let btn_reset = document.getElementById("btn_reset");
btn_reset.addEventListener("click", reset);

let input_div_container = document.getElementById("inputs_container");

let inputSizeFieldElement = document.getElementById("input_size_field");

function generate() {
    
    let inputSizeValue = inputSizeFieldElement.value;

    // CHECK IF THE USER LEFT THE FIELD EMPTY OR ENTERED 0
    // IF SO RETURN AND DO NOT GENERATE INPUT BOXES
    if (inputSizeValue == "" || inputSizeValue == 0) {
        inputSizeValue = 0
        console.log("Input value: O or Empty")
        return
    }
    console.log("Input value: " + inputSizeValue)

    for (i = 0; i < inputSizeValue; i++) {
        var inputBox = document.createElement("input");
        inputBox.setAttribute("class", "input_square");
        inputBox.setAttribute("maxlength", "1");
        input_div_container.appendChild(inputBox);
    }

    disableGenerateButton()
}

function reset() {
    btn_generate.disabled = false;

    while(input_div_container.firstChild) {
        input_div_container.removeChild(input_div_container.firstChild)
    }

    inputSizeFieldElement.value = "";
    inputSizeFieldElement.focus();
}

function disableGenerateButton() {
    btn_generate.disabled = true;
}