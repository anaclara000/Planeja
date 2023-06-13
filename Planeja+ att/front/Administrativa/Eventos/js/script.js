var uriCard_Locacoes = 'http://localhost:3000/locacoes'
var uriCard_Eventos = 'http://localhost:3000/eventos'
var uriCard_Usuarios = 'http://localhost:3000/usuarios'
var uriCard_Convidados = 'http://localhost:3000/convidados'
var uriCard_Parcerias = 'http://localhost:3000/parcerias'

var locacoes = []
var convidado = []
var eventos = []

var listaLocacoes = []
var listaEventos = []
var listaUsuarios = []
var listaConvidados = []
var listaParcerias = []

var userinfo = JSON.parse(localStorage.getItem("info"));

if (userinfo == null) {

    window.location.href = "../../Login/login.html"
}

const options = { method: 'GET' };

fetch(uriCard_Locacoes, options)
    .then(res => res.json())
    .then(res => {
        listaLocacoes = res;
    }
    )
    .catch(err => console.error(err));

fetch(uriCard_Usuarios, options)
    .then(res => res.json())
    .then(res => {
        listaUsuarios = res;
    }
    )
    .catch(err => console.error(err));

fetch(uriCard_Convidados, options)
    .then(res => res.json())
    .then(res => {
        listaConvidados = res;
    }
    )
    .catch(err => console.error(err));

fetch(uriCard_Parcerias, options)
    .then(res => res.json())
    .then(res => {
        listaParcerias = res;
    }
    )
    .catch(err => console.error(err));



function Carregar() {

    const options = { method: 'GET' };

    fetch(uriCard_Eventos, options)
        .then(res => res.json())
        .then(res => {
            listaEventos = res;
            preecherTabelas()

        }
        )
        .catch(err => console.error(err));

}

var linhasTabelas = document.querySelector('.evento')
var linhasTabelas2 = document.querySelector('.evento_user')


function preecherTabelas() {

    var cnpjProdutor = 0

    listaUsuarios.forEach(lu => {

        if (userinfo.id_user == lu.id_usuario) {

            if (lu.tipo == "Produtor") {

                SelecionarCategoriaTabelaPromotor()

                document.querySelector('.sec_promotor').style.display = "block"


                document.querySelector('.table_promotor').classList.remove('model')
                document.querySelector('.table_user').classList.add('model')

                cnpjProdutor = lu.cnpj

                document.querySelector('.details_user').classList.add("model")
                document.querySelector('.details_promotor').classList.remove('model')

                // document.querySelector('#idUsuarioFoto').innerHTML = lu.id_usuario

                document.querySelector('.nome_fantasia').value = lu.nomeFantasia
                var nomeFantasia = document.querySelector('.nome_fantasia')
                nomeFantasia.disabled = true
                document.querySelector('.razao_social').value = lu.raz
                document.querySelector('.cnpj').value = lu.cnpj
                var cnpj = document.querySelector('.cnpj')
                cnpj.disabled = true
                var razao = document.querySelector('.razao_social')
                razao.disabled = true
                document.querySelector('.email_promotor').value = lu.email
                var email = document.querySelector('.email_promotor')
                email.disabled = true
                document.querySelector('.telefone_promotor').value = lu.telefone
                var telefone = document.querySelector('.telefone_promotor')
                telefone.disabled = true
                document.querySelector('.status_Evento').value = lu.email
                document.querySelector('.img_icon').src = "../../../back/src" + lu.caminhoImagem
                document.querySelector('.tables').classList.remove('model')
            }
            else {

                SelecionarCategoriaTabelaUser()

                document.querySelector('.table_promotor').classList.add('model')
                document.querySelector('.table_user').classList.remove('model')

                document.querySelector('.details_user').classList.remove("model")
                document.querySelector('.details_promotor').classList.add('model')
                document.querySelector('.tables').classList.add('model')

                document.querySelector('.nome').value = lu.nome
                document.querySelector('.cpf_user').value = lu.cpf
                document.querySelector('.email_user').value = lu.email

            }

        }

    })

    listaEventos.forEach(le => {


        if (cnpjProdutor != 0) {

            if (le.cnpjProdutor == cnpjProdutor) {

                if (le.status == "Aberto") {
                    console.log('adicionando');

                    var novaLinhaTabela = linhasTabelas.cloneNode(true)

                    novaLinhaTabela.classList.remove('model')

                    novaLinhaTabela.querySelector('.nome_evento').innerHTML = le.nome_evento

                    const dataString = le.data_hora_inicio;
                    const data = new Date(dataString);

                    const dia = ("0" + data.getDate()).slice(-2);
                    const mes = ("0" + (data.getMonth() + 1)).slice(-2);
                    const ano = data.getFullYear();

                    const hora = ("0" + data.getHours()).slice(-2);
                    const minuto = ("0" + data.getMinutes()).slice(-2);

                    const dataFormatada = `${dia}/${mes}/${ano} - ${hora}:${minuto}`;

                    novaLinhaTabela.querySelector('.id_evento').innerHTML = le.id_eventos
                    novaLinhaTabela.querySelector('.data_inicio').innerHTML = dataFormatada
                    novaLinhaTabela.querySelector('.status_Evento').innerHTML = le.status


                    document.querySelector('.aberto').appendChild(novaLinhaTabela)
                }
                else {

                    console.log(le);
                    var novaLinhaTabela = linhasTabelas.cloneNode(true)

                    novaLinhaTabela.classList.remove('model')

                    novaLinhaTabela.querySelector('.id_evento').innerHTML = le.id_eventos
                    novaLinhaTabela.querySelector('.nome_evento').innerHTML = le.nome_evento
                    novaLinhaTabela.querySelector('.data_inicio').innerHTML = le.data_hora_inicio
                    novaLinhaTabela.querySelector('.status_Evento').innerHTML = le.status

                    console.log(novaLinhaTabela);
                    document.querySelector('.finalizados').appendChild(novaLinhaTabela)
                }

            }
        }
        else {

            if (le.idUsuario == userinfo.id_user) {

                if (le.status == "Aberto") {
                    console.log('adicionando');

                    var novaLinhaTabela = linhasTabelas2.cloneNode(true)

                    novaLinhaTabela.classList.remove('model')

                    novaLinhaTabela.querySelector('.nome_evento').innerHTML = le.nome_evento

                    const dataString = le.data_hora_inicio;
                    const data = new Date(dataString);

                    const dia = ("0" + data.getDate()).slice(-2);
                    const mes = ("0" + (data.getMonth() + 1)).slice(-2);
                    const ano = data.getFullYear();

                    const hora = ("0" + data.getHours()).slice(-2);
                    const minuto = ("0" + data.getMinutes()).slice(-2);

                    const dataFormatada = `${dia}/${mes}/${ano} - ${hora}:${minuto}`;

                    novaLinhaTabela.querySelector('.id_evento').innerHTML = le.id_eventos
                    novaLinhaTabela.querySelector('.data_inicio').innerHTML = dataFormatada
                    novaLinhaTabela.querySelector('.status_Evento').innerHTML = le.status

                    console.log(document.querySelector('.aberto_user'));

                    document.querySelector('.aberto_user').appendChild(novaLinhaTabela)
                }
                else {

                    var novaLinhaTabela = linhasTabelas2.cloneNode(true)

                    novaLinhaTabela.classList.remove('model')

                    novaLinhaTabela.querySelector('.id_evento').innerHTML = le.id_eventos
                    novaLinhaTabela.querySelector('.nome_evento').innerHTML = le.nome_evento
                    novaLinhaTabela.querySelector('.data_inicio').innerHTML = le.data_hora_inicio
                    novaLinhaTabela.querySelector('.status').innerHTML = le.status

                    document.querySelector('.finalizados_user').appendChild(novaLinhaTabela)
                }
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

//Expandir o menu
var btnExp = document.querySelector('#btn-exp')
var menuSide = document.querySelector('.menu-lateral')

btnExp.addEventListener('click', function () {
    menuSide.classList.toggle('expandir')
    title_menu.classList.toggle('model')

})


function Conferir(e) {
    var evento = e.parentNode.parentNode.querySelector('.id_evento').innerHTML

    listaEventos.forEach(le => {

        if (le.id_eventos == evento) {

            window.location.href = "./Conferir/index.html?code=" + le.codigo
        }
    })


}

function BtnMostrarModalEvento() {

    document.querySelector('.cont_modal_criar_evento').classList.toggle('model')
}

var cardLocacao = document.querySelector('.cont_card_locacao')

var cardConvidado = document.querySelector('.cont_card_convidados')

var eventoModal = document.querySelector('.modal_Eventos');
function BtnMostrarEvento(e) {

    document.querySelector(".cont_convidados").innerHTML = ""
    document.querySelector(".cont_locacao").innerHTML = ""

    locacoes = []

    var id_evento = e.parentNode.parentNode.querySelector('.id_eventos').innerHTML

    document.querySelector('.acoes').style.display = "none"
    document.querySelector('.teste22').style.display = "none"
    document.querySelector('.btn_acao_remover_card').style.display = "none"
    document.querySelector('.btn_acao_remover_card_convidado').style.display = "none"
    document.querySelector('.btn_criar_evento').style.display = "none"

    document.querySelector('.modal_Eventos').style.display = "block"
    eventoModal.scrollIntoView({ behavior: 'smooth' });

    document.querySelector('.btn_criar_evento').style.display = "none"

    listaEventos.forEach(le => {

        if (id_evento == le.id_eventos) {

            document.querySelector('.nomeEventos').innerHTML = le.nome_evento
            document.querySelector('.endereco_evento').innerHTML = le.endereco_evento
            document.querySelector('.descricao_evento').innerHTML = le.descricao
            document.querySelector('.data_inicio').innerHTML = le.data_hora_inicio
            document.querySelector('.data_fim').innerHTML = le.data_hora_fim
        }

    })

    listaLocacoes.forEach(ll => {

        if (id_evento == ll.idEvento) {

            var addLocacoes = {
                "tipo": ll.tipo,
                "nome": "",
                "endereco": "",
                "descricao": ll.descricao,
                "telefone": "",
                "email": "",
                "valor": ll.valor,
                "idEvento": ll.idEvento
            }

            locacoes.push(addLocacoes)

            console.log(locacoes);

        }
    })
    listaConvidados.forEach(lc => {

        if (id_evento == lc.idEvento) {

            var addConvidado = {
                "nome": lc.nome,
                "telefone": lc.telefone,
                "idEvento": lc.idEvento
            }

            convidado.push(addConvidado)

            console.log(convidado);

        }
    })
    locacoes.forEach(ll => {

        var novoCardLocacao = cardLocacao.cloneNode(true)

        novoCardLocacao.style.display = "block"

        novoCardLocacao.querySelector('.tipo_locacao').innerHTML = ll.tipo
        novoCardLocacao.querySelector('.descricao_locacao').innerHTML = ll.descricao

        document.querySelector('.cont_locacao').appendChild(novoCardLocacao)
    })
    convidado.forEach(c => {

        var novoCardConvidado = cardConvidado.cloneNode(true)

        novoCardConvidado.style.display = "block"

        novoCardConvidado.querySelector('.nome_convidado').innerHTML = c.nome
        novoCardConvidado.querySelector('.telefone_convidado').innerHTML = c.telefone

        document.querySelector('.cont_convidados').appendChild(novoCardConvidado)

    })

}


function CriarEvento() {

    localStorage.removeItem('v_user_evento')
    localStorage.removeItem('operacao')

    window.location.href = "CriarEventos/index.html"
}

function EditarEvento(e) {

    localStorage.removeItem('v_user_evento')
    localStorage.removeItem('v_user')
    localStorage.removeItem('operacao')

    var evento = e.parentNode.parentNode.querySelector('.id_evento').innerHTML
    localStorage.setItem("operacao", JSON.stringify({ "op": "Editar", "id_evento": evento }));

    window.location.href = "CriarEventos/index.html"


}

function SelecionarCategoriaTabelaUser() {

    var status_parceria_selecionada = document.querySelector(".select_tipo_evento")
    let status = status_parceria_selecionada.options[status_parceria_selecionada.selectedIndex].value;

    console.log(status);
    if (status == "evento_aberto_user") {

        document.querySelector('.aberto_user').classList.remove('model')
        document.querySelector('.finalizados_user').classList.add('model')
    }

    if (status == "evento_finalizados_user") {
        document.querySelector('.aberto_user').classList.add('model')
        document.querySelector('.finalizados_user').classList.remove('model')
    }


}

function SelecionarCategoriaTabelaPromotor() {

    var status_parceria_selecionada = document.querySelector(".eventos_tipo_promotor")
    let status = status_parceria_selecionada.options[status_parceria_selecionada.selectedIndex].value;

    if (status == "evento_abertos_promotor") {

        document.querySelector('.aberto').classList.remove('model')
        document.querySelector('.finalizados').classList.add('model')
        document.querySelector('.possuidos').classList.add('model')

    }

    if (status == "evento_finalizados_promotor") {
        document.querySelector('.aberto').classList.add('model')
        document.querySelector('.finalizados').classList.remove('model')
        document.querySelector('.possuidos').classList.add('model')

    }
}

// PESQUISA DO USUARIO
var search_btn = document.querySelector('.btn-filter-user')
const INPUT_BUSCA = document.querySelector('.search')

const TABELA_ABERTO_USER = document.querySelector('.aberto_user')
const TABELA_FINALIZADOS_USER = document.querySelector('.finalizados_user')


search_btn.addEventListener('click', () => {

    var status_parceria_selecionada = document.querySelector(".select_tipo_evento")
    let status = status_parceria_selecionada.options[status_parceria_selecionada.selectedIndex].value;

    console.log(status);

    if (status == "evento_aberto_user") {
        let expressao = INPUT_BUSCA.value

        let linhas = TABELA_ABERTO_USER.getElementsByTagName('tr')

        for (let posicao in linhas) {
            if (true === isNaN(posicao)) {
                continue
            }

            let conteudoDaLinha = linhas[posicao].innerHTML

            if (true === conteudoDaLinha.includes(expressao)) {
                linhas[posicao].style.display = ''
            } else {
                linhas[posicao].style.display = 'none'

            }

        }
    }
    else if (status == "evento_finalizados_user") {
        let expressao = INPUT_BUSCA.value

        let linhas = TABELA_FINALIZADOS_USER.getElementsByTagName('tr')

        for (let posicao in linhas) {
            if (true === isNaN(posicao)) {
                continue
            }

            let conteudoDaLinha = linhas[posicao].innerHTML

            if (true === conteudoDaLinha.includes(expressao)) {
                linhas[posicao].style.display = ''
            } else {
                linhas[posicao].style.display = 'none'

            }

        }
    }



})


var id_evento_finalizar
function AbrirModalFinalizarEvento(e) {

    var id_evento = e.parentNode.parentNode.querySelector('.id_evento').innerHTML

    id_evento_finalizar = id_evento

    listaEventos.forEach(le => {

        if (id_evento == le.id_eventos) {

            document.querySelector(".nome_Evento").innerHTML = le.nome_evento

            if (le.status == "Fechados") {

                document.querySelector('.btn_confirmar').style.display = "none"
                document.querySelector('.btn_reabrir').style.display = "block"
            }
            else {
                document.querySelector('.btn_confirmar').style.display = "block"
                document.querySelector('.btn_reabrir').style.display = "none"
            }
        }

    })

    document.querySelector('.modal_finalizar_evento').classList.remove('model')
}

function CancelarFinalizarEvento() {
    document.querySelector('.modal_finalizar_evento').classList.add('model')

}

function ConfirmarFinalizarEvento() {

    var options
    listaEventos.forEach(le => {

        if (le.id_eventos == id_evento_finalizar)
            options = JSON.stringify({
                "idUsuario": le.idUsuario,
                "cnpjProdutor": le.cnpjProdutor,
                "tipo_evento": le.tipo_evento,
                "descricao": le.descricao,
                "nome_evento": le.nome_evento,
                "endereco_evento": le.endereco_evento,
                "data_hora_inicio": le.data_hora_inicio,
                "data_hora_fim": le.data_hora_fim,
                "status": "Fechados"
            })

    })

    console.log(options);

    fetch("http://localhost:3000/eventos/id/" + id_evento_finalizar, {
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

    listaUsuarios.forEach(lu => {

        if (lu.id_usuario == userinfo.id_user) {

            listaParcerias.forEach(lp => {

                if (lp.cnpjProdutor == u.cnpj && lp.status == "Fechada") {

                    options = JSON.stringify({
                        "id_parceria": lp.id_parceria,
                        "idProdutor": userinfo.id_user,
                        "idCliente": 2,
                        "tipoEvento": "sadadadad",
                        "data_evento": "12/06/2023 - 14:11",
                        "status": "Fechada"
                    })
                }



            })
        }


    })

}

function ConfirmarReabrirEvento() {

    var options
    listaEventos.forEach(le => {

        if (le.id_eventos == id_evento_finalizar)
            options = JSON.stringify({
                "idUsuario": le.idUsuario,
                "cnpjProdutor": le.cnpjProdutor,
                "tipo_evento": le.tipo_evento,
                "descricao": le.descricao,
                "nome_evento": le.nome_evento,
                "endereco_evento": le.endereco_evento,
                "data_hora_inicio": le.data_hora_inicio,
                "data_hora_fim": le.data_hora_fim,
                "status": "Aberto"
            })

    })

    console.log(options);

    fetch("http://localhost:3000/eventos/id/" + id_evento_finalizar, {
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

// PESQUISA DO USUARIO
var search_btn_promotor = document.querySelector('.btn-filter')
const INPUT_BUSCA_PROMOTOR = document.querySelector('.search_inp_promotor')

const TABELA_ABERTO_PROMOTOR = document.querySelector('.aberto')
const TABELA_FINALIZADOS_PROMOTOR = document.querySelector('.evento')


search_btn_promotor.addEventListener('click', () => {


    var status_parceria_selecionada = document.querySelector(".eventos_tipo_promotor")
    let status = status_parceria_selecionada.options[status_parceria_selecionada.selectedIndex].value;
    console.log(status);

    if (status == "evento_abertos_promotor") {
        let expressao = INPUT_BUSCA_PROMOTOR.value

        let linhas = TABELA_ABERTO_PROMOTOR.getElementsByTagName('tr')

        for (let posicao in linhas) {
            if (true === isNaN(posicao)) {
                continue
            }

            let conteudoDaLinha = linhas[posicao].innerHTML

            if (true === conteudoDaLinha.includes(expressao)) {
                linhas[posicao].style.display = ''
            } else {
                linhas[posicao].style.display = 'none'

            }

        }
    }
    else if (status == "evento_finalizados_promotor") {
        let expressao = INPUT_BUSCA.value

        let linhas = TABELA_FINALIZADOS_PROMOTOR.getElementsByTagName('tr')

        for (let posicao in linhas) {
            if (true === isNaN(posicao)) {
                continue
            }

            let conteudoDaLinha = linhas[posicao].innerHTML

            if (true === conteudoDaLinha.includes(expressao)) {
                linhas[posicao].style.display = ''
            } else {
                linhas[posicao].style.display = 'none'

            }

        }
    }

})

// function showForm() {
//     const icon = document.querySelector('.bxs-message-square-edit')
//     const form = document.querySelector('.banner_productor');
//     form.style.display = 'block';
//     icon.style.cursor = 'pointer';
// }

// function hideForm() {
//     const form = document.querySelector('.banner_productor');
//     form.style.display = 'none';

// }

// const form = document.querySelector('form');

// form.addEventListener('submit', function (event) {
//     event.preventDefault();
// });

// function enviarArquivos(event) {
//     event.preventDefault();
//     const input = document.querySelector('#img');
//     const formData = new FormData();

//     for (let i = 0; i < input.files.length; i++) {
//         formData.append('img', input.files[i]);
//         console.log("for")
//     }

//     fetch(`http://localhost:3000/enviar/` + userinfo.id_user, {
//         method: 'POST',
//         body: formData,
//     })
//         .then(response => response.json())
//         .then(data => {
//             console.log(data);
//         })
//         .catch(error => {
//             console.error(error);
//         });
// }

// const input = document.querySelector('#img');
// const previewContainer = document.querySelector('#preview-container');

// input.addEventListener('change', () => {
//     mostrarPreview(input);
//     mostrarBotao()
// });

// function mostrarBotao() {
//     var btnConfirmar = document.querySelector(".btnConfirmarImg")
//     var btnConfirmarClose = document.querySelector(".btnConfirmarImgClose")
//     btnConfirmar.classList.remove("model")
//     btnConfirmarClose.classList.remove("model")
// }
// function mostrarPreview() {
//     previewContainer.innerHTML = ''; // Limpa o conteúdo da div

//     const files = input.files;

//     for (let i = 0; i < files.length; i++) {
//         const file = files[i];

//         if (!file.type.startsWith('image/')) { // Verifica se o arquivo é uma imagem
//             continue;
//         }

//         const img = document.createElement('img');
//         img.classList.add('preview');
//         previewContainer.appendChild(img);

//         const reader = new FileReader();
//         reader.onload = (event) => {
//             img.src = event.target.result;
//         };
//         reader.readAsDataURL(file);
//     }
// }


// const idUsuario = document.querySelector(".idLogin");
// var userinfo = JSON.parse(localStorage.getItem("info"));

// idUsuario.innerHTML = userinfo.id_user;

function enviarAtt() {
    let senhaAntiga = document.querySelector('.senhaAntiga').value
    let senhaNova = document.querySelector('.senhaNova').value
    let confirmarSenha = document.querySelector('.confirmarSenha').value
    listaUsuarios.forEach(user => {
        if (user.senha == senhaAntiga && senhaNova == confirmarSenha) {
            let info = JSON.stringify({
                "senha": senhaNova,
            })
            console.log(senhaAntiga);
            console.log(senhaNova);
            console.log(confirmarSenha);
            fetch('http://localhost:3000/usuarios/id/' + userinfo.id_user, {
                "method": "PUT",
                "headers": {
                    "Content-Type": "application/json"
                },
                "body": info
            })
                .then(response => response.json())
                .then(resp => {
                    window.location.reload()
                })
        } else {
            var dados = document.querySelector('.dados')
            dados.classList.remove('model')
        }
    })

}



const btnAdicionar = document.getElementById('btn_adicionar');
const inputFile = document.getElementById('input-file');

btnAdicionar.addEventListener('click', () => {
    inputFile.click();
});

inputFile.addEventListener('change', (event) => {
    const file = event.target.files[0];

    const formData = new FormData();
    formData.append('img', file);
    console.log(file)
    const id_usuario = userinfo.id_user;

    const url = `http://localhost:3000/enviar/${id_usuario}`;

    fetch(url, {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            // O upload foi concluído com sucesso
            console.log(data);
        })
        .catch(error => {
            // Ocorreu um erro durante o upload
            console.error(error);
        });
});
