let btn_generate = document.getElementById("btn_generate")
btn_generate.addEventListener("click", generate);

let btn_reset = document.getElementById("btn_reset");
btn_reset.addEventListener("click", reset);

let input_div_container = document.getElementById("inputs_container");

let containerNodesCount = input_div_container.childElementCount;

function generate() {
    containerNodesCount = input_div_container.childElementCount + 1;
    let inputBox = document.createElement("input");

    inputBox.setAttribute("class", "input_square");
    inputBox.setAttribute("maxlength", "1");
    inputBox.setAttribute("id", `input_box_${containerNodesCount}`);
    input_div_container.appendChild(inputBox);
}

function reset() {

    while(input_div_container.firstChild) {
        input_div_container.removeChild(input_div_container.firstChild)
    }

    inputSizeFieldElement.value = "";
    inputSizeFieldElement.focus();
}
