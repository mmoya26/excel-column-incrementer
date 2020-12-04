let btn_generate = document.getElementById("btn_generate")

btn_generate.addEventListener("click", (event) =>  {
    containerNodesCount = input_div_container.childElementCount + 1;
    let inputBox = document.createElement("input");

    inputBox.setAttribute("class", "input_square");
    inputBox.setAttribute("maxlength", "1");
    inputBox.setAttribute("id", `input_box_${containerNodesCount}`);
    input_div_container.appendChild(inputBox);
});

let btn_reset = document.getElementById("btn_reset");
btn_reset.addEventListener("click", (event) => {
    while(input_div_container.firstChild) {
        input_div_container.removeChild(input_div_container.firstChild)
    }

    inputSizeFieldElement.value = "";
    inputSizeFieldElement.focus();
});

let input_div_container = document.getElementById("inputs_container");

let containerNodesCount = input_div_container.childElementCount;
