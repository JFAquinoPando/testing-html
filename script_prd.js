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
    } else if (elementType === "input-file-camara") {
        input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*"
        input.capture = "camera"
    }
    formElement.appendChild(input);

    // Agregar atributos adicionales al campo
    formElement.addEventListener("click", function(ev) {
        console.log("el evento!", ev)
        showFieldOptions(formElement);
    });

    document.getElementById("myForm").appendChild(formElement);
}

function showFieldOptions(formElement) {
    console.log("se muestra opciones del campo!")
    var label = formElement.querySelector("label");
    var labelText = label.textContent;

    var attributes = formElement.querySelector("input").attributes;

    // Crear el menú de edición
    var editMenu = document.createElement("div");
    editMenu.className = "edit-menu";
    editMenu.textContent = "Veamos"

    var labelInput = document.createElement("input");
    labelInput.type = "text";
    labelInput.value = labelText;
    editMenu.appendChild(labelInput);

    var requiredCheckbox = document.createElement("input");
    requiredCheckbox.type = "checkbox";
    requiredCheckbox.checked = formElement.querySelector("input").required;
    var requiredLabel = document.createElement("label");
    requiredLabel.textContent = "Requerido";
    requiredLabel.appendChild(requiredCheckbox);
    editMenu.appendChild(requiredLabel);



    // Mostrar atributos adicionales
    for (var i = 0; i < attributes.length; i++) {
        var attributeName = attributes[i].name;
        var attributeValue = attributes[i].value;

        if (attributeName !== "type" && attributeName !== "value" && attributeName !== "required") {
            var attributeLabel = document.createElement("label");
            attributeLabel.textContent = attributeName;

            var attributeInput = document.createElement("input");
            attributeInput.type = "text";
            attributeInput.value = attributeValue;

            attributeInput.addEventListener("input", function() {
                formElement.querySelector("input").setAttribute(attributeName, attributeInput.value);
            });

            attributeLabel.appendChild(attributeInput);
            editMenu.appendChild(attributeLabel);
        }
    }

    // Actualizar la etiqueta y los atributos al cambiar los valores en el menú de edición
    labelInput.addEventListener("input", function() {
        label.textContent = labelInput.value;
    });

    requiredCheckbox.addEventListener("change", function() {
        formElement.querySelector("input").required = requiredCheckbox.checked;
    });


    /*Se agrega boton de cerrado */
    const botonCierre = document.createElement("button");
    botonCierre.textContent = "Cerrar";
    botonCierre.className = "cerrar"
    editMenu.appendChild(botonCierre);

    // Agregar el menú de edición al formulario
    document.getElementById("myForm").appendChild(editMenu);

    // Eliminar el menú de edición cuando se haga clic fuera de él


    document.querySelector("#myForm").addEventListener("click", (ev) => {
        console.log("veamos el target!", ev.target)
        if (ev.target.className === "cerrar") {
            ev.preventDefault();
            editMenu.remove();
        }
        //if (!editMenu.contains(ev.target)) {editMenu.remove();}
    })


    /*window.addEventListener("click", function(event) {
        console.log("quitamos")
        if (!editMenu.contains(event.target)) {
            editMenu.remove();
        }
    });*/
}

var saveButton = document.getElementById("saveButton");

saveButton.addEventListener("click", function(event) {
    event.preventDefault(); // Evita que el formulario se envíe

    // Obtén el HTML del formulario
    var formHTML = document.querySelector("#myForm").outerHTML;

    // Guarda el HTML en el LocalStorage
    //const url = 'http://128.199.13.108:81/index.php';
    const url = 'https://captura.unoup.com/captura/indexr.php' //'https://128.199.13.108/index.php';
    const data = {
        datos: formHTML // Puedes ajustar los datos que deseas enviar
    };

    fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.text())
        .then(result => {
            console.log(result); // Aquí puedes procesar la respuesta del servidor
        })
        .catch(error => {
            console.error('Error:', error);
        });


    // Opcional: Muestra un mensaje de confirmación
    alert("Formulario guardado en el LocalStorage");
});