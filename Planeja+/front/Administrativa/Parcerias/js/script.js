var uriCard_Parcerias = 'http://localhost:3000/parcerias'
var uriCard_Usuarios = 'http://localhost:3000/usuarios'
var uriCard_Eventos = 'http://localhost:3000/eventos'

var parcerias = []
var usuarios = []
var lista_eventos = []

var lineTableParcerias = document.querySelector('.parcerias')
var lineTableParceriasPromotor = document.querySelector('.parcerias_promotor')


localStorage.removeItem("v_user_evento")
var userinfo = JSON.parse(localStorage.getItem("info"));


if (userinfo == null) {

    window.location.href = "../../Login/login.html"
}

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
    }
    )
    .catch(err => console.error(err));


function Carregar() {

    const options = { method: 'GET' };

    fetch(uriCard_Eventos, options)
        .then(res => res.json())
        .then(res => {
            lista_eventos = res;
            PreencherTabelas();

        }
        )
        .catch(err => console.error(err));


}



function PreencherTabelas() {

    usuarios.forEach(u => {

        if (userinfo.id_user == u.id_usuario) {

            if (u.tipo == "Produtor") {

                document.querySelector('.cont_user').classList.add('model')
                document.querySelector('.cont_promotor').classList.remove('model')
                document.querySelector('.sec_promotor').style.display = "block"

                preencherTabelasPromotor()

            }
            else {
                document.querySelector('.cont_user').classList.remove('model')
                document.querySelector('.cont_promotor').classList.add('model')
                preencherTabelasUsuario()
            }
        }

    })

}

function preencherTabelasPromotor() {

    SelecionarCategoriaTabela()

    parcerias.forEach(p => {

        if (p.status == "Pendente") {

            if (userinfo.id_user == p.idProdutor) {

                var novaLinhaTableParcerias = lineTableParceriasPromotor.cloneNode(true)

                novaLinhaTableParcerias.classList.remove('model')

                novaLinhaTableParcerias.querySelector('.id_parceria').innerHTML = p.id_parceria

                usuarios.forEach(u => {

                    if (u.id_usuario == p.idCliente) {
                        novaLinhaTableParcerias.querySelector('.cliente').innerHTML = u.nome

                    }
                })
                novaLinhaTableParcerias.querySelector('.tipo_Evento').innerHTML = p.tipoEvento
                novaLinhaTableParcerias.querySelector('.data_evento').innerHTML = p.data_evento
                novaLinhaTableParcerias.querySelector('.status_Evento').innerHTML = p.status
                document.querySelector('.pendente').appendChild(novaLinhaTableParcerias)

            }
        }

        if (p.status == "Fechada") {

            if (userinfo.id_user == p.idProdutor) {

                var novaLinhaTableParcerias = lineTableParceriasPromotor.cloneNode(true)

                novaLinhaTableParcerias.classList.remove('model')

                console.log(novaLinhaTableParcerias.querySelector('.id_parceria'));
                novaLinhaTableParcerias.querySelector('.id_parceria').innerHTML = p.id_parceria

                usuarios.forEach(u => {

                    if (u.id_usuario == p.idCliente) {
                        novaLinhaTableParcerias.querySelector('.cliente').innerHTML = u.nome

                    }
                })
                novaLinhaTableParcerias.querySelector('.tipo_Evento').innerHTML = p.tipoEvento
                novaLinhaTableParcerias.querySelector('.data_evento').innerHTML = p.data_evento
                novaLinhaTableParcerias.querySelector('.status_Evento').innerHTML = p.status

                document.querySelector('.fechada').appendChild(novaLinhaTableParcerias)

            }
        }


    })

}

function preencherTabelasUsuario() {

    SelecionarCategoriaTabelaUser()

    parcerias.forEach(p => {

        if (p.status == "Pendente") {

            if (userinfo.id_user == p.idCliente) {

                var novaLinhaTableParcerias = lineTableParcerias.cloneNode(true)

                novaLinhaTableParcerias.classList.remove('model')

                novaLinhaTableParcerias.querySelector('.id_parceria_user').innerHTML = p.id_parceria

                usuarios.forEach(u => {

                    if (u.id_usuario == p.idProdutor) {
                        novaLinhaTableParcerias.querySelector('.promotor_user').innerHTML = u.nomeFantasia

                    }
                })

                novaLinhaTableParcerias.querySelector('.tipo_Evento_user').innerHTML = p.tipoEvento
                novaLinhaTableParcerias.querySelector('.data_evento_user').innerHTML = p.data_evento
                novaLinhaTableParcerias.querySelector('.status_Evento_user').innerHTML = p.status
                document.querySelector('.pendente_user').appendChild(novaLinhaTableParcerias)

            }
        }

        if (p.status == "Fechada") {
            if (userinfo.id_user == p.idCliente) {

                var novaLinhaTableParcerias = lineTableParcerias.cloneNode(true)

                novaLinhaTableParcerias.classList.remove('model')

                novaLinhaTableParcerias.querySelector('.id_parceria_user').innerHTML = p.id_parceria

                usuarios.forEach(u => {

                    if (u.id_usuario == p.idProdutor) {
                        novaLinhaTableParcerias.querySelector('.promotor_user').innerHTML = u.nomeFantasia

                    }
                })
                novaLinhaTableParcerias.querySelector('.tipo_Evento_user').innerHTML = p.tipoEvento
                novaLinhaTableParcerias.querySelector('.data_evento_user').innerHTML = p.data_evento
                novaLinhaTableParcerias.querySelector('.status_Evento_user').innerHTML = p.status


                console.log(novaLinhaTableParcerias);
                document.querySelector('.fechada_user').appendChild(novaLinhaTableParcerias)

            }
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

var btnExp = document.querySelector('#btn-exp')
var menuSide = document.querySelector('.menu-lateral')

btnExp.addEventListener('click', function () {
    menuSide.classList.toggle('expandir')
    title_menu.classList.toggle('model')

})


function SelecionarCategoriaTabela() {

    var status_parceria_selecionada = document.querySelector(".select_tipo_parceria")
    let status = status_parceria_selecionada.options[status_parceria_selecionada.selectedIndex].value;

    if (status == "p_pendente") {

        document.querySelector('.pendente').classList.remove('model')
        document.querySelector('.fechada').classList.add('model')
    }

    if (status == "p_fechada") {
        document.querySelector('.pendente').classList.add('model')
        document.querySelector('.fechada').classList.remove('model')
        // document.querySelector('.cancelada').classList.add('model')
    }

    if (status == "p_cancelada") {
        document.querySelector('.pendente').classList.add('model')
        document.querySelector('.fechada').classList.add('model')
        // document.querySelector('.cancelada').classList.remove('model')
    }

}

function SelecionarCategoriaTabelaUser() {
    var status_parceria_selecionada = document.querySelector(".select_tipo_parceria_user")
    let status = status_parceria_selecionada.options[status_parceria_selecionada.selectedIndex].value;

    if (status == "p_u_pendente") {

        document.querySelector('.pendente_user').classList.remove('model')
        document.querySelector('.fechada_user').classList.add('model')
        // document.querySelector('.cancelada_user').classList.add('model')
    }

    if (status == "p_u_fechada") {
        document.querySelector('.pendente_user').classList.add('model')
        document.querySelector('.fechada_user').classList.remove('model')
        // document.querySelector('.cancelada_user').classList.add('model')
    }

    if (status == "p_cancelada") {
        document.querySelector('.pendente').classList.add('model')
        document.querySelector('.fechada').classList.add('model')
        // document.querySelector('.cancelada').classList.remove('model')
    }
}
var id_cliente_parceria
var data_do_eveto_parceria
var tipo_evento

var id_evento
function AbrirModal(e) {



    var parceria = e.parentNode.querySelector('.id_parceria').innerHTML

    console.log(parceria);
    parcerias.forEach(p => {
        if (p.id_parceria == parceria) {

            id_cliente_parceria = p.idCliente
            data_do_eveto_parceria = p.data_evento
            tipo_evento = p.tipoEvento
            document.querySelector('.modal_parceria').classList.remove('model')

            console.log(p);
            usuarios.forEach(u => {

                if (u.id_usuario == p.idCliente) {

                    document.querySelector('.cliente').value = u.nome

                    cpf = u.cpf.replace(/\D/g, '');

                    // Formata o CPF no formato XXX.XXX.XXX-XX
                    cpfFormatado = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');

                    document.querySelector('.cpf_cliente').value = cpfFormatado


                }
            })

            document.querySelector('.id_parceria_modal').innerHTML = p.id_parceria
            document.querySelector('.tipo_evento').value = p.tipoEvento
            document.querySelector('.data_hora_inicio').value = p.data_evento
            document.querySelector('.status').innerHTML = p.status

            if (p.status == "Fechada") {

                document.querySelector('.btn_confirmar_parceria').classList.add('model')
                document.querySelector('.btn_conferir_evento').classList.add('model')
                document.querySelector('.btn_criar_eventos_p_parceria').classList.remove('model')
            }

            else if (p.status == "Pendente") {

                console.log('entrou');
                document.querySelector('.btn_confirmar_parceria').classList.remove('model')
                document.querySelector('.btn_criar_eventos_p_parceria').classList.add('model')
                document.querySelector('.btn_conferir_evento').classList.add('model')

            }
            else {
                lista_eventos.forEach(e => {


                    if (p.idCliente == e.idUsuario && e.status == "Aberto") {

                        id_evento = e.id_eventos
                        document.querySelector('.btn_confirmar_parceria').classList.add('model')
                        document.querySelector('.btn_criar_eventos_p_parceria').classList.add('model')
                        document.querySelector('.btn_conferir_evento').classList.remove('model')

                    }

                })
            }

        }
    })

}

function ConfirmarParceria(e) {

    var id_parceria = e.parentNode.parentNode.parentNode.querySelector('.id_parceria_modal').innerHTML

    var options = JSON.stringify({

        data_evento: data_do_eveto_parceria,
        idCliente: Number(id_cliente_parceria),
        idProdutor: userinfo.id_user.toString(),
        status: "Fechada",
        tipoEvento: tipo_evento

    })


    fetch("http://localhost:3000/parcerias/id/" + id_parceria, {
        "method": "PUT",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": options
    })
        .then(res => {
            if (res.status == 200) {

                window.location.reload()

            }
        })

}

function CriarEvento(e) {

    localStorage.setItem("v_user_evento", JSON.stringify({ "cliente": id_cliente_parceria }));

    localStorage.removeItem("operacao")
    localStorage.removeItem("v_user")

    window.location.href = "../Eventos/CriarEventos/index.html"
}

function VoltarModal() {
    document.querySelector('.modal_parceria').classList.add('model')
}

function DeletarParceria(e) {

    var id_parceria = e.parentNode.parentNode.parentNode.querySelector('.id_parceria_modal').innerHTML

    var options = JSON.stringify({

        data_evento: data_do_eveto_parceria,
        idCliente: Number(id_cliente_parceria),
        idProdutor: userinfo.id_user.toString(),
        status: "Cancelada",
        tipoEvento: tipo_evento

    })


    fetch("http://localhost:3000/parcerias/id/" + id_parceria, {
        "method": "PUT",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": options
    })
        .then(res => {
            if (res.status == 200) {

                window.location.reload()

            }
        })

}


// function ConferirEvento() {

//     window.location.href = "../Eventos/Conferir/index.html?id=" + id_evento

// }

function ConferirEvento(e) {

    lista_eventos.forEach(le => {

        if (id_evento == le.id_eventos) {

            window.location.href = "../Eventos/Conferir/index.html?code=" + le.codigo
        }
    })


}