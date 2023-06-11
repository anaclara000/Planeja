var uriCard_Usuarios = 'http://localhost:3000/usuarios'
var uriCard_Eventos = 'http://localhost:3000/eventos'
var uriCard_Parcerias = 'http://localhost:3000/parcerias'


//Seleciona os itens clicado
var menuItem = document.querySelectorAll('.item-menu')
var title_menu = document.querySelector('.title_menu')

var usuarios = []
var eventos = []
var parcerias = []

var userinfo = JSON.parse(localStorage.getItem("info"));

if (userinfo == null) {

    window.location.href = "../../Login/login.html"
}


const options = { method: 'GET' };

fetch(uriCard_Usuarios, options)
    .then(res => res.json())
    .then(res => {
        usuarios = res;

    }
    )
    .catch(err => console.error(err));

fetch(uriCard_Eventos, options)
    .then(res => res.json())
    .then(res => {
        eventos = res;

    }
    )
    .catch(err => console.error(err));

fetch(uriCard_Parcerias, options)
    .then(res => res.json())
    .then(res => {
        parcerias = res;

    }
    )
    .catch(err => console.error(err));



function Carregar() {


    preencherCards()
}

var qtdEventosAbertos = 0
var qtdEventosFechados = 0
var qtdParceriasPendentes = 0
var cnpjProdutor = 0

var cardEventos = document.querySelector('.cards_eventos')
function preencherCards() {

    var contagem = 0

    usuarios.forEach(u => {

        if (u.id_usuario == userinfo.id_user) {

            cnpjProdutor = u.cnpj

            document.querySelector('.nome_promotor').innerHTML = u.nomeFantasia
            document.querySelector('.email').innerHTML = u.email

            eventos.forEach(e => {

                if (e.cnpjProdutor == cnpjProdutor && e.status == "Aberto") {

                    qtdEventosAbertos += 1

                }
                else if (e.cnpjProdutor == cnpjProdutor && e.status == "Fechados") {
                    qtdEventosFechados += 1
                }

            })
        }
    })

    parcerias.forEach(p => {

        if (p.idProdutor == userinfo.id_user && p.status == "Pendente") {

            qtdParceriasPendentes += 1

        }

    })

    eventos.forEach(e => {

        if (contagem < 4) {

            usuarios.forEach(u => {

                if (u.id_usuario == userinfo.id_user) {

                    if (e.cnpjProdutor == u.cnpj) {

                        var novoCardEventos = cardEventos.cloneNode(true)

                        novoCardEventos.style.display = "flex"

                        contagem += 1

                        novoCardEventos.querySelector('.nome_evento').innerHTML = e.nome_evento
                        novoCardEventos.querySelector('.data_Evento').innerHTML = e.data_hora_inicio

                        document.querySelector('.cont_card_eventos').appendChild(novoCardEventos)
                    }

                }

            })

        }

    })

    document.querySelector('.qtd_eventos_abertos').innerHTML = qtdEventosAbertos

    document.querySelector('.qtd_eventos_fechados').innerHTML = qtdEventosFechados


    console.log(qtdEventosAbertos, qtdEventosFechados);

    // document.querySelector('.qtd_parcerias_pendentes').innerHTML = qtdParceriasPendentes 

}

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

var btnExp = document.querySelector('#btn-exp')
var menuSide = document.querySelector('.menu-lateral')

btnExp.addEventListener('click', function () {
    menuSide.classList.toggle('expandir')
    title_menu.classList.toggle('model')

})