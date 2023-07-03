function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.dataset.type);
}

function drop(event) {
    event.preventDefault();
    var elementType = event.dataTransfer.getData("text");

    var formElement = document.createElement("div");
    formElement.className = "form-element";

    var label = document.createElement("label");
    var labelText = document.createTextNode("Etiqueta del campo");
    label.appendChild(labelText);
    formElement.appendChild(label);

    var input;
    if (elementType === "input-text") {
        input = document.createElement("input");
        input.type = "text";
    } else if (elementType === "input-number") {
        input = document.createElement("input");
        input.type = "number";
    } else if (elementType === "input-checkbox") {
        input = document.createElement("input");
        input.type = "checkbox";
    } else if (elementType === "input-radio") {
        input = document.createElement("input");
        input.type = "radio";
    }
    formElement.appendChild(input);

    document.getElementById("myForm").appendChild(formElement);
}
