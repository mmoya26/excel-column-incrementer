let btn_generate = document.getElementById("btn_generate")
let input_div_container = document.getElementById("inputs_container");
let containerNodesCount = input_div_container.childElementCount;

btn_generate.addEventListener("click", (event) =>  {
    containerNodesCount = input_div_container.childElementCount + 1;
    let inputBox = document.createElement("input");

    inputBox.setAttribute("class", "input_square");
    inputBox.setAttribute("maxlength", "1");
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
    input_div_container.appendChild(inputBox);
});

let btn_reset = document.getElementById("btn_reset");

btn_reset.addEventListener("click", (event) => {
    while(input_div_container.firstChild) {
        input_div_container.removeChild(input_div_container.firstChild)
    }
});


