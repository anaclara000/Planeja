var uriCard_Parcerias = 'http://localhost:3000/parcerias'
var uriCard_Usuarios = 'http://localhost:3000/usuarios'

var parcerias = []
var usuarios = []

console.log('tese');


var cadProdutor = document.querySelector('.card-body')

var user = JSON.parse(localStorage.getItem("info"));

if (user == null) {

    window.location.href = "../../Login/login.html"
}


function Carregar() {

    const options = { method: 'GET' };

    fetch(uriCard_Parcerias, options)
        .then(res => res.json())
        .then(res => {
            parcerias = res;

        }
        )
        .catch(err => console.error(err));

    fetch(uriCard_Usuarios, options)
        .then(res => res.json())
        .then(res => {
            usuarios = res;
            PreencherProdutores()
        }
        )
        .catch(err => console.error(err));

}


function PreencherProdutores() {


    usuarios.forEach(u => {

        if (u.id_usuario == user.id_user && u.tipo == "Produtor") {

            document.querySelector('.sec_promotor').style.display = "block" 
            document.querySelector('.btn_ver_perfil').style.display = "flex" 

        }

        if (u.tipo == "Produtor") {

            
            var novoCadProdutor = cadProdutor.cloneNode(true)

            novoCadProdutor.style.display = "block"

            novoCadProdutor.querySelector('.id_promotor').innerHTML = u.id_usuario
            novoCadProdutor.querySelector('.nome-promotor').innerHTML = u.nomeFantasia

            document.querySelector('.cards').appendChild(novoCadProdutor)
        }

    })
}



//Seleciona os itens clicado
var menuItem = document.querySelectorAll('.item-menu')
var title_menu = document.querySelector('.title_menu')


function selectLink() {
    menuItem.forEach((item) =>
        item.classList.remove('ativo')
    )
    this.classList.add('ativo')

}

menuItem.forEach((item) =>
    item.addEventListener('click', selectLink),
    title_menu.classList.add('model')

)

//Expandir o menu

var btnExp = document.querySelector('#btn-exp')
var menuSide = document.querySelector('.menu-lateral')

btnExp.addEventListener('click', function () {
    menuSide.classList.toggle('expandir')
    title_menu.classList.toggle('model')

})


function VerPromotor(e) {

    var id_produtor = e.parentNode.parentNode.querySelector('.id_promotor').innerHTML

    localStorage.setItem("v_user", JSON.stringify({ "id_promotor": id_produtor }));

    window.location.href = "../PerfilPromotor/perfilPromotor.html"


}

function VerMeuPerfil() {

    localStorage.setItem("v_user", JSON.stringify({ "id_promotor": user.id_user }));

    window.location.href = "../PerfilPromotor/perfilPromotor.html"


}