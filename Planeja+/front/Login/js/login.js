var inpUser = document.querySelector('#user')
var inpSenha = document.querySelector('#senha')

var uriCard_Usuarios = 'http://localhost:3000/usuarios'

var usuarios = []

const options = { method: 'GET' };

fetch(uriCard_Usuarios, options)
    .then(res => res.json())
    .then(res => {
        usuarios = res;
    }
    )
    .catch(err => console.error(err));


function logar() {

    var existeEmail = false;
    var erroVazio = false;


    console.log(inpUser.value, inpSenha.value);

    if (inpUser.value.trim() == "" || inpSenha.value.trim() == "") {
        var erro = document.querySelector('.erro')
        erro.classList.remove('model')

        erro.innerHTML = "Dado não preenchido"
        erroVazio = true

    }

    if (erroVazio == false) {

        usuarios.forEach(u => {

            console.log('validando');

            if (u.email == inpUser.value) {
                existeEmail = true;

            }

        })

        if (existeEmail == false) {
            var erro = document.querySelector('.erro')
            erro.classList.remove('model')

            erro.innerHTML = "Email não existe"
        }

        if (existeEmail == true) {

            let data = {
                "email": inpUser.value,
                "senha": inpSenha.value
            }
            fetch("http://localhost:3000/usuarios/login", {
                "method": "POST",
                "headers": {
                    "Content-Type": "application/json"
                },
                "body": JSON.stringify(data)
            })
                .then(res => { return res.json() })
                .then(data => {

                    if (data.erro == "Senha inválida") {
                        var erro = document.querySelector('.erro')
                        erro.classList.remove('model')

                        erro.innerHTML = "Senha inválida"
                    }

                    if (data.erro === undefined) {
                        console.log(data)
                        localStorage.setItem("info", JSON.stringify({ "id_user": data.uid, "nome": data.uname, "token": data.token }));

                        window.location.href = "../Home/home.html"

                    }
                })


        }

    }

}

