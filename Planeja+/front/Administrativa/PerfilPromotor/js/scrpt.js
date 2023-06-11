var uriCard_Parcerias = 'http://localhost:3000/parcerias'
var uriCard_Usuarios = 'http://localhost:3000/usuarios'
var uriCard_TiposEventos = 'http://localhost:3000/tipos'
var uriCard_Servicos = 'http://localhost:3000/servicos'
var uriCard_Locacoes = 'http://localhost:3000/locacoes'

var parcerias = []
var usuarios = []
var tipoEventos = []
var servicos = []
var locacoes = []

var lineTableParcerias = document.querySelector('.parcerias')

var cardTipoEventos = document.querySelector('.fotos-cont-body')
var cardServico = document.querySelector('.c_servico')
var cardLocacoes = document.querySelector('.fotos-cont-body-locacoes')

var id_produtor

var user = JSON.parse(localStorage.getItem("info"));
var v_user = JSON.parse(localStorage.getItem("v_user"));

if (user == null) {

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

fetch(uriCard_TiposEventos, options)
    .then(res => res.json())
    .then(res => {
        tipoEventos = res;

    }
    )
    .catch(err => console.error(err));

fetch(uriCard_Servicos, options)
    .then(res => res.json())
    .then(res => {
        servicos = res;

    }
    )
    .catch(err => console.error(err));

fetch(uriCard_Locacoes, options)
    .then(res => res.json())
    .then(res => {
        locacoes = res;

    }
    )
    .catch(err => console.error(err));


function Carregar() {

    var tipo = "";
    var pertence = false;
    usuarios.forEach(u => {

        if (u.id_usuario == user.id_user && u.tipo == "Produtor") {

            document.querySelector('.sec_promotor').style.display = "block"

            if (v_user.id_promotor == user.id_user) {
                pertence = true
            }

            tipo = "Produtor"

        }


    })

    if (tipo == "Produtor") {

        if (pertence == true) {

            document.querySelector('.btn_acao1').style.display = "block"
            document.querySelector('.btn_acao2').style.display = "block"
            document.querySelector('.btn_acao3').style.display = "block"
            document.querySelector('.btn_acao4').style.display = "block"
            document.querySelector('.btn_acao5').style.display = "block"
            document.querySelector('.btn_acao6').style.display = "block"

        }

        console.log('entrou');
        document.querySelector('.cont_btn_adicionar_editar_eventos').style.display = "block"

        document.querySelector('.aberta').style.display = "none"
        document.querySelector('.fechada').style.display = "none"
        document.querySelector('.pendente').style.display = "none"

        document.querySelector('.a2').style.display = "none"
        document.querySelector('.p2').style.display = "none"
        document.querySelector('.f2').style.display = "none"

    }
    else {
        var existePendente = false
        var existeFechada = false
        document.querySelector('.cont_btn_adicionar_editar_eventos').style.display = "none"

        parcerias.forEach(p => {

            console.log(user.id_user, p.idCliente);

            if (user.id_user == p.idCliente && v_user.id_promotor == p.idProdutor && p.status == "Pendente") {
                existePendente = true;
            }

            else if (user.id_user == p.idCliente && v_user.id_promotor == p.idProdutor && p.status == "Fechada") {
                existeFechada = true;
            }
        })

        if (existePendente == true) {

            document.querySelector('.pendente').style.display = "flex"
            document.querySelector('.fechada').style.display = "none"
            document.querySelector('.aberta').style.display = "none"

            document.querySelector('.a2').style.display = "none"
            document.querySelector('.p2').style.display = "flex"
            document.querySelector('.f2').style.display = "none"
        }

        if (existeFechada == true) {
            document.querySelector('.fechada').style.display = "flex"
            document.querySelector('.pendente').style.display = "none"
            document.querySelector('.aberta').style.display = "none"

            document.querySelector('.a2').style.display = "none"
            document.querySelector('.p2').style.display = "none"
            document.querySelector('.f2').style.display = "flex"

        }

        if (existeFechada == false && existePendente == false) {
            document.querySelector('.aberta').style.display = "flex"
            document.querySelector('.fechada').style.display = "none"
            document.querySelector('.pendente').style.display = "none"

            document.querySelector('.a2').style.display = "flex"
            document.querySelector('.p2').style.display = "none"
            document.querySelector('.f2').style.display = "none"

        }
    }

    usuarios.forEach(u => {
        if (u.id_usuario == v_user.id_promotor) {
            id_produtor = u.id_usuario
            document.querySelector('.nome-promotor').innerHTML = u.nomeFantasia
            document.querySelector('.tel').innerHTML = u.telefone
            document.querySelector('.email').innerHTML = u.email

            tipoEventos.forEach(te => {

                if (te.id_usuario == u.id_usuario) {

                    var novoCardTipoEventos = cardTipoEventos.cloneNode(true)

                    novoCardTipoEventos.style.display = "block"

                    // novoCardTipoEventos.querySelector('.foto_card').src = "assets/foto_padrao.jpeg"
                    novoCardTipoEventos.querySelector('.titulo-foto').innerHTML = te.nome
                    novoCardTipoEventos.querySelector('.id_tipo_evento').innerHTML = te.id_tiposEvento

                    document.querySelector('.cont-fotos').appendChild(novoCardTipoEventos)

                }

            })

            servicos.forEach(s => {

                if (s.id_usuario == u.id_usuario) {

                    if (s.id_usuario == u.id_usuario) {

                        var novoCardServicos = cardServico.cloneNode(true)

                        novoCardServicos.style.display = "flex"

                        novoCardServicos.querySelector('.servico').innerHTML = s.nome
                        novoCardServicos.querySelector('.id_servico').innerHTML = s.id_servicos

                        console.log(novoCardServicos);
                        document.querySelector('.cont-servicos').appendChild(novoCardServicos)

                    }


                }

            })

            locacoes.forEach(l => {

                if (l.idUsuario == u.id_usuario) {

                    if (l.idUsuario == u.id_usuario) {

                        var novoCardLocacoes = cardLocacoes.cloneNode(true)

                        novoCardLocacoes.style.display = "flex"

                        novoCardLocacoes.querySelector('.titulo-foto-locacoes').innerHTML = l.nome
                        novoCardLocacoes.querySelector('.endereco-locacoes').innerHTML = l.endereco
                        novoCardLocacoes.querySelector('.id_locacoes').innerHTML = l.id_locacoes

                        document.querySelector('.cont-fotos-locacoes').appendChild(novoCardLocacoes)

                    }


                }
            })


        }
    })


}
//Seleciona os itens clicado
var menuItem = document.querySelectorAll('.item-menu')
var title_menu = document.querySelector('.title_menu')

var v_user = JSON.parse(localStorage.getItem("v_user"));


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


function ConfirmarParceria() {
    var erro = 0;

    document.querySelector('.err_tipo_evento').style.display = "none"
    document.querySelector('.err_data_evento').style.display = "none"

    var tipo_evento = document.querySelector('.tipo_evento_inp').value
    var inp_data = document.querySelector('.inp_data').value


    if (tipo_evento.trim() == "") {
        document.querySelector('.err_tipo_evento').style.display = "block"
        document.querySelector('.err_tipo_evento').innerHTML = "Tipo do Evento Vazio!"

        erro += 1

    }

    if (inp_data.trim() == "") {
        document.querySelector('.err_data_evento').style.display = "block"
        document.querySelector('.err_data_evento').innerHTML = "Data do Evento Vazia!"

        erro += 1
    }



    if (erro == 0) {

        const dataString1 = inp_data;
        const data1 = new Date(dataString1);

        const dia1 = ("0" + data1.getDate()).slice(-2);
        const mes1 = ("0" + (data1.getMonth() + 1)).slice(-2);
        const ano1 = data1.getFullYear();

        const hora1 = ("0" + data1.getHours()).slice(-2);
        const minuto1 = ("0" + data1.getMinutes()).slice(-2);

        const dataFormatada1 = `${dia1}/${mes1}/${ano1} - ${hora1}:${minuto1}`;

        var options = JSON.stringify({
            "idProdutor": String(id_produtor),
            "idCliente": user.id_user,
            "tipoEvento": tipo_evento,
            "data_evento": dataFormatada1,
            "status": "Pendente"
        })

        console.log(options);


        fetch("http://localhost:3000/parcerias", {
            "method": "POST",
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

}

function FecharParceria() {
    document.querySelector('.modal_fechar_parceria').style.display = "block"
}

function Cancelar() {
    document.querySelector('.modal_fechar_parceria').style.display = "none"
}
function Cancelar2() {

    document.querySelector('.modal_adicionar_editar_tipo_eventos').classList.add('model')
    document.querySelector('.btn_confirmar_modal').style.display = "block"
    document.querySelector('.btn_editar_modal').style.display = "flex"
}
function Cancelar3() {
    document.querySelector('.modal_adicionar_editar_servicos').classList.add('model')
    document.querySelector('.btn_confirmar_servicos_modal').style.display = "block"
    document.querySelector('.btn_editar_servicos_modal').style.display = "flex"
}
function Cancelar4() {
    document.querySelector('.modal_adicionar_locacoes').classList.add('model')
    document.querySelector('.btn_confirmar_locacao_modal').style.display = "block"
    document.querySelector('.btn_editar_locacao_modal').style.display = "flex"
}

var id_evento
function AbrirModalTipoEvento(e) {
    document.querySelector('.err_tipo_servico').style.display = "none"
    document.querySelector('.btn_confirmar_modal').style.display = "none"
    document.querySelector('.btn_editar_modal').style.display = "block"
    document.querySelector('.icon_lixo').style.display = "block"


    var id_tipo_evento = e.parentNode.parentNode.querySelector('.id_tipo_evento').innerHTML
    document.querySelector('.modal_adicionar_editar_tipo_eventos').classList.remove('model')

    tipoEventos.forEach(te => {

        if (te.id_tiposEvento == id_tipo_evento) {
            id_evento = te.id_tiposEvento
            document.querySelector('.titulo_evento_modal').value = te.nome

        }

    })
}

function AbrirModalTipoEventoCadastrar() {

    document.querySelector('.err_tipo_servico').style.display = "none"

    document.querySelector('.modal_adicionar_editar_tipo_eventos').classList.remove('model')
    document.querySelector('.btn_confirmar_modal').style.display = "block"
    document.querySelector('.btn_editar_modal').style.display = "none"
    document.querySelector('.icon_lixo').style.display = "none"


    document.querySelector('.titulo_evento_modal').value = ""

}

function CadastrarTipoEvento() {
    var valor = 0

    document.querySelector('.err_tipo_servico').style.display = "none"

    var titulo_tipo_evento = document.querySelector('.titulo_evento_modal').value

    if (titulo_tipo_evento.trim() == "") {
        document.querySelector('.err_tipo_servico').style.display = "block"
        document.querySelector('.err_tipo_servico').innerHTML = "- Tipo Serviço Vazio"

        valor += 1
    }

    if (valor == 0) {

        var options = JSON.stringify({
            "nome": titulo_tipo_evento,
            "id_usuario": user.id_user
        })

        fetch("http://localhost:3000/tipos", {
            "method": "POST",
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


}

function EditarModal(e) {
    var valor = 0;
    document.querySelector('.err_tipo_servico').style.display = "none"

    var titulo_tipo_evento = document.querySelector('.titulo_evento_modal').value

    if (titulo_tipo_evento.trim() == "") {

        document.querySelector('.err_tipo_servico').style.display = "block"
        document.querySelector('.err_tipo_servico').innerHTML = "- Tipo Serviço Vazio"

        valor += 1
    }
    if (valor == 0) {

        var options = JSON.stringify({
            "nome": titulo_tipo_evento,
            "id_usuario": user.id_user
        })

        fetch("http://localhost:3000/tipos/id/" + id_evento, {
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

}

var id_locacoes

function AbrirModalLocacoes(e) {

    document.querySelector('.err_nome_locacao').style.display = "none"
    document.querySelector('.err_endereco_locacao').style.display = "none"
    document.querySelector('.btn_confirmar_locacao_modal').style.display = "none"
    document.querySelector('.btn_editar_locacao_modal').style.display = "block"
    document.querySelector('.icon_lixo_locacao').style.display = "block"

    var id_tipo_locacoes = e.parentNode.parentNode.querySelector('.id_locacoes').innerHTML

    console.log(id_tipo_locacoes);

    console.log(e.parentNode.parentNode);
    document.querySelector('.modal_adicionar_locacoes').classList.remove('model')

    locacoes.forEach(l => {

        if (l.id_locacoes == id_tipo_locacoes) {

            id_locacoes = l.id_locacoes
            document.querySelector('.nome_locacao_modal').value = l.nome
            document.querySelector('.endereco_locacao_modal').value = l.endereco

        }

    })

}

var id_servico_modal
function AbrirModalTipoServicos(e) {

    document.querySelector('.btn_confirmar_servicos_modal').style.display = "none"
    document.querySelector('.btn_editar_servicos_modal').style.display = "block"
    document.querySelector('.icon_lixo_servico').style.display = "block"


    var id_tipo_evento = e.parentNode.querySelector('.id_servico').innerHTML

    document.querySelector('.modal_adicionar_editar_servicos').classList.remove('model')

    servicos.forEach(s => {

        if (s.id_servicos == id_tipo_evento) {

            id_servico_modal = s.id_servicos

            console.log(id_servico_modal);
            document.querySelector('.titulo_servicos_modal').value = s.nome

        }

    })
}

function AbrirModalTipoServicosCadastrar() {
    document.querySelector('.err_nome_servico').style.display = "none"

    document.querySelector('.modal_adicionar_editar_servicos').classList.remove('model')
    document.querySelector('.btn_confirmar_servicos_modal').style.display = "block"
    document.querySelector('.btn_editar_servicos_modal').style.display = "none"

    document.querySelector('.icon_lixo_servico').style.display = "none"

    document.querySelector('.titulo_servicos_modal').value = ""

}


function AbrirModaLocacoesCadastrar() {

    document.querySelector('.err_nome_locacao').style.display = "none"

    document.querySelector('.modal_adicionar_locacoes').classList.remove('model')
    document.querySelector('.btn_confirmar_locacao_modal').style.display = "block"
    document.querySelector('.btn_editar_locacao_modal').style.display = "none"
    document.querySelector('.icon_lixo_locacao').style.display = "none"


    document.querySelector('.nome_locacao_modal').value = ""
    document.querySelector('.endereco_locacao_modal').value = ""
}

function CadastrarServicos() {

    var titulo_servivos = document.querySelector('.titulo_servicos_modal').value


    if (titulo_servivos.trim() == "") {

    }

    var options = JSON.stringify({
        "nome": titulo_servivos,
        "id_usuario": user.id_user
    })

    fetch("http://localhost:3000/servicos", {
        "method": "POST",
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

function CadastrarLocacoes() {
    var valor = 0

    document.querySelector('.err_nome_locacao').style.display = "none"
    document.querySelector('.err_endereco_locacao').style.display = "none"

    var nome_locacoes = document.querySelector('.nome_locacao_modal').value
    var endereco_locacoes = document.querySelector('.endereco_locacao_modal').value

    if (nome_locacoes.trim() == "") {
        document.querySelector('.err_nome_locacao').style.display = "block"
        document.querySelector('.err_nome_locacao').innerHTML = "- Locações da Locação vazio"

        valor += 1
    }

    if (endereco_locacoes.trim() == "") {
        document.querySelector('.err_endereco_locacao').style.display = "block"
        document.querySelector('.err_endereco_locacao').innerHTML = "- Endereço da Locação vazio"

        valor += 1
    }


    if (valor == 0) {


        var options = JSON.stringify({
            tipo: "",
            nome: nome_locacoes,
            endereco: endereco_locacoes,
            descricao: "",
            status: true,
            "idUsuario": user.id_user
        })

        console.log(options);
        fetch("http://localhost:3000/locacoes", {
            "method": "POST",
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


}

function EditarModalServiços() {
    var valor = 0
    document.querySelector('.err_nome_servico').style.display = "none"
    var titulo_servivos = document.querySelector('.titulo_servicos_modal').value

    if (titulo_servivos.trim() == "") {
        document.querySelector('.err_nome_servico').style.display = "block"
        document.querySelector('.err_nome_servico').innerHTML = "- Nome do Serviço vazio"

        valor += 1
    }

    if (valor == 0) {

        var options = JSON.stringify({
            "nome": titulo_servivos,
            "id_usuario": user.id_user
        })

        console.log(options);

        fetch("http://localhost:3000/servicos/id/" + id_servico_modal, {
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

}

function EditarModalLocacoes(e) {
    var valor = 0

    document.querySelector('.err_nome_locacao').style.display = "none"
    document.querySelector('.err_endereco_locacao').style.display = "none"

    var nome_locacao = document.querySelector('.nome_locacao_modal').value
    var endereco_locacoes = document.querySelector('.endereco_locacao_modal').value

    if (nome_locacao.trim() == "") {
        document.querySelector('.err_nome_locacao').style.display = "block"
        document.querySelector('.err_nome_locacao').innerHTML = "- Locações da Locação vazio"

        valor += 1
    }

    if (endereco_locacoes.trim() == "") {
        document.querySelector('.err_endereco_locacao').style.display = "block"
        document.querySelector('.err_endereco_locacao').innerHTML = "- Endereço da Locação vazio"

        valor += 1
    }

    if (valor == 0) {

        var options = JSON.stringify({
            tipo: "",
            nome: nome_locacao,
            endereco: endereco_locacoes,
            descricao: "",
            status: false,
            "idUsuario": user.id_user
        })


        fetch("http://localhost:3000/locacoes/id/" + id_locacoes, {
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

}

function DeletarTipoEvento() {

    fetch("http://localhost:3000/tipos/id/" + id_evento, {
        "method": "DELETE",
        "headers": {
            "Content-Type": "application/json"
        },
    })
        .then(res => {
            if (res.status == 200) {
                window.location.reload()
            }
        })

}

function DeletarServico() {

    fetch("http://localhost:3000/servicos/id/" + id_servico_modal, {
        "method": "DELETE",
        "headers": {
            "Content-Type": "application/json"
        },
    })
        .then(res => {
            if (res.status == 200) {
                window.location.reload()
            }
        })

}