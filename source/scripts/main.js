document.addEventListener('DOMContentLoaded', function(){
    document.getElementById('formSorteador').addEventListener('submit',function(evento){
        evento.preventDefault();
        let numeroMaximo = document.getElementById('numeroMaximo').value;
        numeroMaximo = parseInt(numeroMaximo);

        let numeroAleatorio = Math.random()* numeroMaximo;
        do {
            numeroAleatorio = Math.random() * numeroMaximo;
        } while (numeroAleatorio <1)
        numeroAleatorio= Math.round(numeroAleatorio)  //math.ceil arredonta para mais , math.floor arredonda para menos e o math.round para o mais próximo
        document.getElementById('valor-resultado').innerText=  numeroAleatorio;
        document.getElementById('resultado').style.display = 'block';
    })
})