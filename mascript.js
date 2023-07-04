let miUrl = "https://128.199.13.108" //"http://128.199.13.108:81"
const formularios = fetch(miUrl+"/forms.php")
.then(res => {
    console.log("algo en el res?", res)
    return res.json()
})
.then(datos => {
    console.log(datos)
    const selectForm = document.querySelector("#formulario")
    let txt = "<option disabled selected>Seleccione uno</option>"
    datos.map(formId => {
        txt += `<option value='${formId}'>Formulario ${formId}</option>`
    })
    selectForm.innerHTML =txt
}).catch(
    error => {
        console.log("hay error?", error.message)
    }
).finally(() => {
    console.log("fetch finalizado!")
})


const selectFormEscuchado = document.querySelector("#formulario")
selectFormEscuchado.addEventListener("change", (e)=>{
    console.log("cambio", e.target.value)
    const url = "https://128.199.13.108" //"http://128.199.13.108:81"
    const resp = fetch(url+"/obtener.php?formulario="+e.target.value)
    .then(res => res.json())
    .then(datos => {
        let texto = `<h3>Ha seleccionado el formulario ${datos.id} <h3>
        ${datos.f}`
        const mostrar = document.querySelector("#respuesta")
        mostrar.innerHTML = texto
        
        const botonGuardar = document.createElement("button")
        botonGuardar.textContent = "Guardar"
        document.querySelector("form").appendChild(botonGuardar)
    })
})