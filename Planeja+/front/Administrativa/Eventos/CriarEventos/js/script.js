var uriCard_Locacoes = 'http://localhost:3000/locacoes'
var uriCard_LocacoesEvento = 'http://localhost:3000/locacoesEvento'
var uriCard_Eventos = 'http://localhost:3000/eventos'
var uriCard_Usuarios = 'http://localhost:3000/usuarios'
var uriCard_Convidados = 'http://localhost:3000/convidados'
var uriCard_Parcerias = 'http://localhost:3000/parcerias'

var locacoes = []
var convidado = []
var eventos = []

var codigo_evento_editar

var convidadosRemovidos = []
var locacoesRemovidas = []

var listaLocacoes = []
var listaLocacoesEventos = []
var listaEventos = []
var listaUsuarios = []
var listaConvidados = []
var listaParcerias = []

var ultimoEventoLocacao = 0

var evento = []

var userinfo = JSON.parse(localStorage.getItem("info"));
var evento_user = JSON.parse(localStorage.getItem("v_user_evento"));
var operacao_evento = JSON.parse(localStorage.getItem("operacao"));

var id_user = 0


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

fetch(uriCard_LocacoesEvento, options)
    .then(res => res.json())
    .then(res => {
        listaLocacoesEventos = res;
    }
    )
    .catch(err => console.error(err));

function Carregar() {

    const options = { method: 'GET' };

    fetch(uriCard_Eventos, options)
        .then(res => res.json())
        .then(res => {
            listaEventos = res;

            PreencherDados()

        }
        )
        .catch(err => console.error(err));


}

function TesteEventos() {

    const options = { method: 'GET' };

    fetch(uriCard_Eventos, options)
        .then(res => res.json())
        .then(res => {
            listaEventos = res;

        }
        )
        .catch(err => console.error(err));

}

function PreencherDados() {

    if (listaEventos.length > 0) {

        listaEventos.forEach(le => {

            ultimoEventoLocacao = le.id_eventos

        })

    }
    else {
        ultimoEventoLocacao = 0
    }

    var dataAtual = new Date().toISOString().slice(0, 16);

    // Obtém o elemento input de data e hora
    var inputDateTime = document.querySelector('.data_hora_inicio')
    var inputDateTime2 = document.querySelector('.data_hora_fim')

    // Define o valor mínimo para a data atual
    inputDateTime.setAttribute('min', dataAtual);
    inputDateTime2.setAttribute('min', dataAtual);

    listaUsuarios.forEach(lu => {

        if (lu.id_usuario == userinfo.id_user && lu.tipo == "Produtor") {

            document.querySelector('.sec_promotor').style.display = "block"
        }
    })





    if (evento_user != null) {

        document.querySelector('.section_0').classList.add('model')
        document.querySelector('.section_1').classList.remove('model')

        listaParcerias.forEach(lp => {

            if (lp.idCliente == evento_user.cliente) {

                document.querySelector('.tipo_evento').value = lp.tipoEvento

                id_user = evento_user.cliente

                listaUsuarios.forEach(lu => {

                    if (lu.id_usuario == evento_user.cliente) {

                        cpf = lu.cpf.replace(/\D/g, ''); // Remove todos os caracteres não numéricos

                        // Adiciona pontos e traço no CPF formatado
                        cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
                        cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
                        cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

                        document.querySelector('.cpf_user').value = cpf
                        document.querySelector('.cpf_user').disable = true



                    }


                    var inputString = lp.data_evento
                    var partes = inputString.split(" - ");
                    var dataPartes = partes[0].split("/");
                    var horaPartes = partes[1].split(":");

                    var dia = dataPartes[0];
                    var mes = dataPartes[1];
                    var ano = dataPartes[2];

                    var hora = horaPartes[0];
                    var minuto = horaPartes[1];

                    var dataHoraFormatada = ano + "-" + mes + "-" + dia + "T" + hora + ":" + minuto;

                    document.querySelector('.data_hora_inicio').value = dataHoraFormatada
                    document.querySelector('.data_hora_inicio').disabled = true

                    document.querySelector('.data_hora_inicio').disable = true

                })

            }

        })
    }

    if (operacao_evento != null) {

        document.querySelector('.section_0').classList.add('model')
        document.querySelector('.section_1').classList.remove('model')
        document.querySelector('.btn_criar_evento').style.display = "none"
        document.querySelector('.btn_editar_evento').style.display = "block"

        listaEventos.forEach(le => {

            if (le.id_eventos == operacao_evento.id_evento) {

                codigo_evento_editar = le.codigo
                listaUsuarios.forEach(lu => {

                    if (lu.id_usuario == le.idUsuario) {

                        id_user = lu.id_usuario

                        cpf = lu.cpf.replace(/\D/g, ''); // Remove todos os caracteres não numéricos

                        // Adiciona pontos e traço no CPF formatado
                        cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
                        cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
                        cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

                        document.querySelector('.cpf_user').value = cpf
                        document.querySelector('.cpf_user').disabled = true

                    }

                    // var inputDataHora = le.data_hora_inicio
                    // var dataHora = new Date(inputDataHora);
                    // var dataFormatada = dataHora.toISOString().substr(0, 10);

                    // console.log(dataFormatada);
                    document.querySelector('.data_hora_inicio').value = le.data_hora_inicio
                    document.querySelector('.data_hora_fim').value = le.data_hora_fim
                    // document.querySelector('.data_hora_inicio').disabled = true'

                    document.querySelector('.data_hora_inicio').disable = true

                })

                document.querySelector('.nome_evento').value = le.nome_evento
                document.querySelector('.endereco_evento').value = le.endereco_evento
                document.querySelector('.descricao_evento').value = le.descricao
                document.querySelector('.tipo_evento').value = le.tipo_evento



            }



        })

        listaConvidados.forEach(lc => {

            if (lc.idEvento == operacao_evento.id_evento) {

                var novoCardConvidado = cardConvidado.cloneNode(true)

                novoCardConvidado.style.display = "flex"

                novoCardConvidado.querySelector('#nome_convidado').innerHTML = lc.nome
                novoCardConvidado.querySelector('#telefone_convidado').innerHTML = lc.telefone
                novoCardConvidado.querySelector('#id_convidado').innerHTML = lc.id_convidado

                document.querySelector('.modal_lista_convidados').appendChild(novoCardConvidado)

                var novo_convivado = {
                    "id_convidado": lc.id_convidado,
                    "nome": lc.nome,
                    "telefone": lc.telefone
                }

                convidado.push(novo_convivado)

                document.querySelector('.nomeConvidado').value = ""
                document.querySelector('.telConvidado').value = ""
            }


        })

        listaLocacoesEventos.forEach(ll => {
            if (ll.idEvento == operacao_evento.id_evento) {

                var status_parceria_selecionada = document.querySelector(".select_locacoes")

                var novoCardLocacao = cardLocacao.cloneNode(true)

                novoCardLocacao.style.display = "flex"

                novoCardLocacao.querySelector('#endereco_locacao').innerHTML = ll.endereco
                novoCardLocacao.querySelector('#nome_locacao').innerHTML = ll.nome
                novoCardLocacao.querySelector('#id_locacao').innerHTML = ll.id_locacoes
                novoCardLocacao.querySelector('#id_locacaoEvento').innerHTML = ll.id_locacoesEvento

                document.querySelector('.modal_lista_locacoes').appendChild(novoCardLocacao)

                listaLocacoes.forEach(location => {
                    console.log(location.id_locacoes, ll.id_locacoes);

                    console.log(location.idUsuario == userinfo.id_user && location.id_locacoes == ll.id_locacoes);

                    if (location.idUsuario == userinfo.id_user && location.id_locacoes == ll.id_locacoes) {

                        var option = document.createElement("option");
                        option.value = location.id_locacoes + "-" + location.nome;
                        option.innerHTML = location.id_locacoes + "-" + location.nome;
                        document.querySelector('.select_locacoes').appendChild(option);

                    }
                });

                var novo_locacoes = {
                    "id_locacaoEventos": ll.id_locacoesEvento,
                    "id_locacao": ll.id_locacoes,
                    "tipo": "",
                    "nome": ll.nome,
                    "endereco": ll.endereco,
                    "descricao": "",
                    "idUsuario": userinfo.id_user,
                    "status": true
                }

                locacoes.push(novo_locacoes)

                console.log(locacoes);
            }
        })

    }
    else {
        listaLocacoes.forEach(ll => {

            if (ll.idUsuario == userinfo.id_user) {

                var option = document.createElement("option")
                option.value = ll.id_locacoes + "-" + ll.nome
                option.innerHTML = ll.id_locacoes + "-" + ll.nome

                document.querySelector('.select_locacoes').appendChild(option)

            }
        })

    }
}
var linhasTabelas = document.querySelector('.operacoes')


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


function Conferir() {

    document.querySelector('.modal_Eventos').style.display = "none";

    var erro = 0

    //VARIAVEIS DOS ERROS 
    var erroNomeEvento = document.querySelector('.erro_nome_evento')
    var erroDescEvento = document.querySelector('.erro_descricao_evento')
    var erroEnderecEvento = document.querySelector('.erro_endereco_evento')
    var erroDataInicioEvento = document.querySelector('.erro_dataHoraInicio_evento')
    var erroDataFimEvento = document.querySelector('.erro_dataHoraFim_evento')

    erroNomeEvento.style.display = "none"
    erroDescEvento.style.display = "none"
    erroEnderecEvento.style.display = "none"
    erroDataInicioEvento.style.display = "none"
    erroDataFimEvento.style.display = "none"



    // var erroNomeFornecedor = document.querySelector('.')
    // var erroDescFornecedor = document.querySelector('.')
    // var erroTipoFornecedor = document.querySelector('.')
    // var erroTelefoneFornecedor = document.querySelector('.')
    // var erroValorFornecedor = document.querySelector('.')


    // VARIAVEIS DA SESSÃO INFORMAÇÃO // 

    var nomeEvento = document.querySelector('.nomeEvento').value
    var descEvento = document.querySelector('.descricaoEvento').value
    var enderecoEvento = document.querySelector('.enderecoEvento').value
    var dateTime_inicio = document.querySelector('.dateTime_inicio').value
    var dateTime_fim = document.querySelector('.dateTime_fim').value


    // VARIAVEIS DA SESSÃO FORNECEDOR // 

    // var nomeFornecedor = document.querySelector('.nomeFornecedor').value
    // var descricaoFornecedor = document.querySelector('.descricaoFornecedor').value
    // var tipoFornecedor = document.querySelector('.tipoFornecedor').value
    // var telefoneFornecedor = document.querySelector('.telefoneFornecedor').value
    // var valorFornecedor = document.querySelector('.valorFornecedor').value

    // VARIAVEIS DA SESSÃO LOCAÇÃO // 

    // var nomeFornecedor = document.querySelector('.nomeFornecedor').value
    // var descriLocacao = document.querySelector('.descriLocacao').value

    // VARIAVEIS DA SESSÃO CONVIDADOS // 

    // var nomeConvidado = document.querySelector('.nomeConvidado').value
    // var telConvidado = document.querySelector('.telConvidado').value

    if (nomeEvento.trim() == "") { erro += 1; erroNomeEvento.style.display = "block", erroNomeEvento.innerHTML = "Nome Evento Vazio" }
    if (descEvento.trim() == "") { erro += 1; erroDescEvento.style.display = "block", erroDescEvento.innerHTML = "Descrição do Evento Vazia" }
    if (enderecoEvento.trim() == "") { erro += 1; erroEnderecEvento.style.display = "block", erroEnderecEvento.innerHTML = "Endereço do Evento Vazio" }
    if (dateTime_inicio.trim() == "") { erro += 1; erroDataInicioEvento.style.display = "block", erroDataInicioEvento.innerHTML = "Escolha uma Data/Hora para o inicio do Evento" }
    if (dateTime_fim.trim() == "") { erro += 1; erroDataFimEvento.style.display = "block", erroDataFimEvento.innerHTML = "Escolha uma Data/Hora para o fim do Evento" }



    if (erro == 0) {

        document.querySelector('.modal_Eventos').style.display = "block";
        document.querySelector('.cont_modal_criar_evento').style.display = "none";

        document.querySelector('.nome_evento').innerHTML = nomeEvento
        document.querySelector('.descricao_evento').innerHTML = descEvento
        document.querySelector('.endereco_evento').innerHTML = enderecoEvento

        document.querySelector('.acoes').style.display = "flex"
        document.querySelector('.convidado').style.display = "flex"
        document.querySelector('.btn_acao_remover_card').style.display = "flex"
        document.querySelector('.btn_criar_evento').style.display = "block"


        var dataHora = new Date(dateTime_inicio);

        var dia = dataHora.getDate().toString().padStart(2, "0");
        var mes = (dataHora.getMonth() + 1).toString().padStart(2, "0");
        var ano = dataHora.getFullYear().toString();

        var hora = dataHora.getHours().toString().padStart(2, "0");
        var minutos = dataHora.getMinutes().toString().padStart(2, "0");
        var segundos = dataHora.getSeconds().toString().padStart(2, "0");

        var dataHoraFormatada_inicio = dia + "/" + mes + "/" + ano + " [" + hora + ":" + minutos + "]";
        // dataHoraFormatada_inicio = dataHoraFormatada_inicio.replace("[", " ").replace("]", " ");

        var dataHora = new Date(dateTime_fim);

        var dia = dataHora.getDate().toString().padStart(2, "0");
        var mes = (dataHora.getMonth() + 1).toString().padStart(2, "0");
        var ano = dataHora.getFullYear().toString();

        var hora = dataHora.getHours().toString().padStart(2, "0");
        var minutos = dataHora.getMinutes().toString().padStart(2, "0");
        var segundos = dataHora.getSeconds().toString().padStart(2, "0");

        var dataHoraFormatada_fim = dia + "/" + mes + "/" + ano + " [" + hora + ":" + minutos + "]";
        // dataHoraFormatada_fim = dataHoraFormatada_fim.replace("[", " ").replace("]", " ");

        document.querySelector('.data_inicio').innerHTML = dataHoraFormatada_inicio
        document.querySelector('.data_fim').innerHTML = dataHoraFormatada_fim
        // document.querySelector('.tipo_locacao').innerHTML = tipoLocacao
    }


}

function BtnMostrarModalEvento() {

    document.querySelector('.cont_modal_criar_evento').classList.toggle('model')
}

var cardLocacao = document.querySelector('.cont_locacao')

function AdicionarLocacao() {
    var status_parceria_selecionada = document.querySelector(".select_locacoes")

    if (status_parceria_selecionada.selectedIndex !== -1) {

        let status = status_parceria_selecionada.options[status_parceria_selecionada.selectedIndex].value;


        var partes = status.split(" - ");
        var id = status.match(/^\d+/)[0];
        var nomeLocacao = ""

        var novoCardLocacao = cardLocacao.cloneNode(true)

        var endereco_locacao = ""

        novoCardLocacao.style.display = "flex"

        listaLocacoes.forEach(ll => {

            console.log(ll.id_locacoes, id);
            if (ll.id_locacoes == id) {
                console.log('entrou');
                novoCardLocacao.querySelector('#id_locacao').innerHTML = ll.id_locacoes
                novoCardLocacao.querySelector('#nome_locacao').innerHTML = ll.nome
                novoCardLocacao.querySelector('#endereco_locacao').innerHTML = ll.endereco

                endereco_locacao = ll.endereco
                nomeLocacao = ll.nome

                console.log(novoCardLocacao);
                document.querySelector('.modal_lista_locacoes').appendChild(novoCardLocacao)

            }
        })

        var novo_locacoes = {
            "id_locacaoEventos": "",
            "id_locacao": id,
            "tipo": "",
            "nome": nomeLocacao,
            "endereco": endereco_locacao,
            "descricao": "",
            "idUsuario": userinfo.id_user,
            "status": true
        }

        locacoes.push(novo_locacoes)

        console.log(locacoes);
        status_parceria_selecionada.remove(status_parceria_selecionada.selectedIndex);
    }

}

function RemoverLocacao(e) {

    var id_locacaoEventos = e.parentNode.querySelector('#id_locacaoEvento').innerHTML
    var id_locacao = e.parentNode.querySelector('#id_locacao').innerHTML

    console.log(id_locacaoEventos);
    if (id_locacaoEventos != undefined) {

        var nova_locacao_removido = {
            "id_locacao": Number(id_locacaoEventos)
        }

        locacoesRemovidas.push(nova_locacao_removido)

    }

    console.log(e.parentNode.querySelector('#nome_locacao'));

    var tipo_locacao = e.parentNode.querySelector('#nome_locacao').innerHTML

    console.log(tipo_locacao);

    listaLocacoes.forEach(ll => {

        if (id_locacao == ll.id_locacoes) {

            nome_locacao = ll.nome
        }

    })


    var posicao_locacao = locacoes.findIndex(l => l.id_locacao == id_locacao)

    console.log(locacoes);
    console.log(posicao_locacao);
    if (posicao_locacao !== -1) {
        locacoes.splice(posicao_locacao, 1)

        console.log(locacoes);
        var div = document.querySelector('.modal_lista_locacoes')
        var filho = div.children[posicao_locacao]

        if (filho !== null) {
            div.removeChild(filho)
        }

        // Adicionar a locação removida novamente ao select
        var selectLocacoes = document.querySelector(".select_locacoes");
        var option = document.createElement("option");
        option.value = id_locacao + "-" + tipo_locacao;
        option.text = id_locacao + "-" + tipo_locacao;
        selectLocacoes.appendChild(option);
    }
}


var cardConvidado = document.querySelector('.cont_convidado')


function AdicionarConvidados() {

    var erro = 0;

    document.querySelector('.err_telefone_convidado').classList.add('model')
    document.querySelector('.err_nome_convidado').classList.add('model')


    var nomeConvidado = document.querySelector('.nomeConvidado').value
    var telefone = document.querySelector('.telConvidado').value

    var telFormatado = telefone

    if (nomeConvidado.trim() == "") {

        document.querySelector('.err_nome_convidado').classList.remove('model')
        document.querySelector('.err_nome_convidado').innerHTML = " - *Nome Vazio"
        erro += 1;

    }

    if (telefone.trim() == "") {

        document.querySelector('.err_telefone_convidado').classList.remove('model')
        document.querySelector('.err_telefone_convidado').innerHTML = " - *Telefone Vazio"
        erro += 1;

    }
    else {
        telefone = telefone.replace(/\D/g, '');

        //verifica se tem a qtde de numero correto
        if (!(telefone.length >= 10 && telefone.length <= 11)) {
            document.querySelector('.err_telefone_convidado').classList.remove('model')
            document.querySelector('.err_telefone_convidado').innerHTML = "Telefone Inválido";
            erro += 1;
        }

        //Se tiver 11 caracteres, verificar se começa com 9 o celula
        if (telefone.length == 11 && parseInt(telefone.substring(2, 3)) != 9) {
            document.querySelector('.err_telefone_convidado').classList.remove('model')
            document.querySelector('.err_telefone_convidado').innerHTML = "Telefone Inválido";
            erro += 1;
        }

        //verifica se não é nenhum numero digitado errado (propositalmente)
        for (var n = 0; n < 10; n++) {
            //estou utilizando o metodo Array(q+1).join(n) onde "q" é a quantidade e n é o
            //caractere a ser repetido
            if (telefone == new Array(11).join(n) || telefone == new Array(12).join(n)) {
                document.querySelector('.err_telefone_convidado').classList.remove('model')
                document.querySelector('.err_telefone_convidado').innerHTML = "Telefone Inválido";
                erro += 1;
            }
        }
        //DDDs validos
        var codigosDDD = [11, 12, 13, 14, 15, 16, 17, 18, 19,
            21, 22, 24, 27, 28, 31, 32, 33, 34,
            35, 37, 38, 41, 42, 43, 44, 45, 46,
            47, 48, 49, 51, 53, 54, 55, 61, 62,
            64, 63, 65, 66, 67, 68, 69, 71, 73,
            74, 75, 77, 79, 81, 82, 83, 84, 85,
            86, 87, 88, 89, 91, 92, 93, 94, 95,
            96, 97, 98, 99];
        //verifica se o DDD é valido (sim, da pra verificar rsrsrs)
        if (codigosDDD.indexOf(parseInt(telefone.substring(0, 2))) == -1) {
            document.querySelector('.err_telefone_convidado').classList.remove('model')
            document.querySelector('.err_telefone_convidado').innerHTML = "Telefone Inválido";
            erro += 1;
        }

        if (new Date().getFullYear() < 2017) return true;
        if (telefone.length == 10 && [2, 3, 4, 5, 7].indexOf(parseInt(telefone.substring(2, 3))) == -1) {
            document.querySelector('.err_telefone_convidado').classList.remove('model')
            document.querySelector('.err_telefone_convidado').innerHTML = "Telefone Inválido";
            erro += 1;
        }

        //se passar por todas as validações acima, então está tudo certo
    }

    if (erro == 0) {


        var novoCardConvidado = cardConvidado.cloneNode(true)


        novoCardConvidado.style.display = "flex"

        novoCardConvidado.querySelector('#nome_convidado').innerHTML = nomeConvidado
        novoCardConvidado.querySelector('#telefone_convidado').innerHTML = telFormatado


        document.querySelector('.modal_lista_convidados').appendChild(novoCardConvidado)

        var novo_convivado = {
            "nome": nomeConvidado,
            "telefone": telFormatado
        }

        convidado.push(novo_convivado)

        document.querySelector('.nomeConvidado').value = ""
        document.querySelector('.telConvidado').value = ""

    }

}

function RemoverConvidado(e) {
    var id_convidado = e.parentNode.querySelector('#id_convidado').innerHTML

    if (id_convidado != "") {

        var novo_convivado_removido = {
            "id_convidado": Number(id_convidado)
        }

        convidadosRemovidos.push(novo_convivado_removido)

    }


    var tel_convidado = e.parentNode.querySelector('#telefone_convidado').innerHTML

    var posicao_convidado = convidado.findIndex(c => c.telefone == tel_convidado)


    if (posicao_convidado !== -1) {
        convidado.splice(posicao_convidado, 1)

        locacoes.splice(posicao_convidado, 1)

        var div = document.querySelector('.modal_lista_convidados')
        var filho = div.children[posicao_convidado]

        if (filho !== null) {
            div.removeChild(filho)
        }

    }
}

function BtnCriarEvento() {

    var codigo = gerarCodigo(10)

    var options = JSON.stringify({
        "idUsuario": evento.idUsuario,
        "cnpjProdutor": evento.cnpjProdutor,
        "tipo_evento": evento.tipo_evento,
        "descricao": evento.descricao,
        "nome_evento": evento.nome_evento,
        "endereco_evento": evento.endereco_evento,
        "data_hora_inicio": evento.data_hora_inicio,
        "data_hora_fim": evento.data_hora_fim,
        "codigo": codigo,
        "status": "Aberto"
    })

    fetch("http://localhost:3000/eventos", {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": options
    })
        .then(res => {
            if (res.status == 200) {

            }
        })



    if (locacoes != "") {

        console.log('Último Evento' + ultimoEventoLocacao + 1);

        locacoes.forEach(l => {

            console.log(l);
            let options = JSON.stringify({
                "id_locacoes": Number(l.id_locacao),
                "tipo": "",
                "nome": l.endereco,
                "endereco": l.endereco,
                "descricao": "",
                "telefone": "",
                "email": "",
                "valor": 0.0,
                "idEvento": ultimoEventoLocacao + 1,
                "status": true

            })

            console.log(options);

            fetch("http://localhost:3000/locacoesEvento/criar", {
                "method": "POST",
                "headers": {
                    "Content-Type": "application/json"
                },
                "body": options
            })
                .then(res => {
                    if (res.status == 200) {

                        console.log('cadastrou locacao');

                    }
                })

        })



    }

    if (convidado.length > 0) {

        convidado.forEach(c => {

            let options = JSON.stringify({
                "nome": c.nome,
                "telefone": c.telefone,
                "idEvento": ultimoEventoLocacao + 1,
            })


            fetch("http://localhost:3000/convidados", {
                "method": "POST",
                "headers": {
                    "Content-Type": "application/json"
                },
                "body": options
            })
                .then(res => {
                    if (res.status == 200) {


                    }
                })

        })
    }

    VoltarTelaInicial()

}

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

function Comecar() {

    document.querySelector('.section_0').classList.toggle('model')
    document.querySelector('.section_1').classList.toggle('model')

}

function Cancelar() {
    window.location.reload()
}

function VoltarConvidado() {
    document.querySelector('.section_0').classList.add('model')
    document.querySelector('.section_1').classList.add('model')
    document.querySelector('.section_2').classList.remove('model')
    document.querySelector('.section_3').classList.add('model')
}

function VoltarDataHoraEvento() {
    document.querySelector('.section_0').classList.add('model')
    document.querySelector('.section_1').classList.remove('model')
    document.querySelector('.section_2').classList.add('model')
    document.querySelector('.section_3').classList.add('model')
}

function VoltarLocacao() {
    document.querySelector('.section_0').classList.add('model')
    document.querySelector('.section_1').classList.add('model')
    document.querySelector('.section_2').classList.add('model')
    document.querySelector('.section_3').classList.remove('model')
    document.querySelector('.section_4').classList.add('model')
}

function VoltarBanner() {
    document.querySelector('.section_0').classList.add('model')
    document.querySelector('.section_1').classList.add('model')
    document.querySelector('.section_2').classList.add('model')
    document.querySelector('.section_3').classList.add('model')
    document.querySelector('.section_4').classList.remove('model')
    document.querySelector('.section_5').classList.add('model')
}

function VoltarTelaInicial() {
    window.location.href = "../index.html"
}

var erro = 0
var cnpj_promotor

var erroConferirCFP = false;
function ConfirmarCadastroIncial() {

    document.querySelector('.err_cpf_cliente').classList.add('model')
    document.querySelector('.err_nome_evento').classList.add('model')
    document.querySelector('.err_endereco_evento').classList.add('model')
    document.querySelector('.err_descricao_evento').classList.add('model')
    document.querySelector('.err_tipo_evento').classList.add('model')

    erro = 0;
    var id_produtor = 0

    var cpf_user = document.querySelector('.cpf_user').value
    var nome_evento = document.querySelector('.nome_evento').value
    var endereco_evento = document.querySelector('.endereco_evento').value
    var descricao_evento = document.querySelector('.descricao_evento').value
    var tipo_evento = document.querySelector('.tipo_evento').value

    listaUsuarios.forEach(lu => {

        if (lu.id_usuario == userinfo.id_user) {
            cnpj_promotor = lu.cnpj
        }
    })

    if (cpf_user.trim() == "") {

        document.querySelector('.err_cpf_cliente').classList.remove('model')
        document.querySelector('.err_cpf_cliente').innerHTML = " - Cpf Vazio"
        erro += 1;

    }
    else {
    }

    if (erro == 0) {

    }

    if (nome_evento.trim() == "") {

        document.querySelector('.err_nome_evento').classList.remove('model')
        document.querySelector('.err_nome_evento').innerHTML = " - *Nome Vazio"
        erro += 1;

    }

    if (endereco_evento.trim() == "") {

        document.querySelector('.err_endereco_evento').classList.remove('model')
        document.querySelector('.err_endereco_evento').innerHTML = " - *Endereço Vazio"
        erro += 1;

    }

    if (descricao_evento.trim() == "") {

        document.querySelector('.err_descricao_evento').classList.remove('model')
        document.querySelector('.err_descricao_evento').innerHTML = " - *Descrição Vazia"
        erro += 1;

    }

    if (tipo_evento.trim() == "") {

        document.querySelector('.err_tipo_evento').classList.remove('model')
        document.querySelector('.err_tipo_evento').innerHTML = " - *Tipo Evento Vazio"

        erro += 1;
    }

    // ConferirCpfParceria()

    erroConferirCFP

    if (erro == 0 && erroConferirCFP == false) {

        var novoEvento = {
            "idUsuario": id_user,
            "cnpjProdutor": cnpj_promotor,
            "tipo_evento": tipo_evento,
            "descricao": descricao_evento,
            "nome_evento": nome_evento,
            "endereco_evento": endereco_evento,
            "data_hora_inicio": null,
            "data_hora_fim": null,
            "status": "Aberto",
        }

        evento = novoEvento;

        document.querySelector('.section_0').classList.add('model')
        document.querySelector('.section_1').classList.add('model')
        document.querySelector('.section_2').classList.remove('model')
    }

}

function ConferirCpfParceria() {

    document.querySelector('.err_cpf_cliente').classList.add('model')

    var cpf_user = document.querySelector('.cpf_user').value

    var achouParcerias = false

    erroConferirCFP = false;
    var id_produtor = userinfo.id_user
    var strCPF = cpf_user
    var Soma;
    var Resto;
    Soma = 0;

    strCPF = cpf_user.replace(/\D/g, '');


    if (strCPF == "00000000000" || strCPF == "11111111111" || strCPF == "22222222222" || strCPF == "33333333333" || strCPF == "44444444444" || strCPF == "55555555555" || strCPF == "6666666666" || strCPF == "77777777777" || strCPF == "88888888888" || strCPF == "99999999999") {
        document.querySelector('.err_cpf_cliente').classList.remove('model')
        document.querySelector('.err_cpf_cliente').innerHTML = 'CPF Inválido'
        erroConferirCFP = true;


    }

    for (i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10))) {

        document.querySelector('.err_cpf_cliente').classList.remove('model')
        document.querySelector('.err_cpf_cliente').innerHTML = 'CPF Inválido'
        erroConferirCFP = true;


    }
    Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11))) {

        document.querySelector('.err_cpf_cliente').classList.remove('model')
        document.querySelector('.err_cpf_cliente').innerHTML = 'CPF Inválido'
        erroConferirCFP = true;

    }

    if (erroConferirCFP == false) {

        listaParcerias.forEach(lp => {

            listaUsuarios.forEach(lu => {

                if (lu.id_usuario == lp.idCliente) {

                    cpf_user = cpf_user.replace(/\D/g, '');
                    if (lu.cpf == cpf_user && id_produtor == lp.idProdutor) {

                        achouParcerias = true;

                        id_user = lp.idCliente
                        document.querySelector('.err_cpf_cliente').classList.add('model')

                        erroConferirCFP = false;
                    }
                    else {
                        id_user = 0;

                    }
                }
            })

        })

        if (!achouParcerias) {
            document.querySelector('.err_cpf_cliente').classList.remove('model')
            document.querySelector('.err_cpf_cliente').innerHTML = " - *Parceria não encontrada"
        }
    }

}

var erroDataHora = 0
function ConfirmarDataHoraEvento() {

    document.querySelector('.err_data_hora_inicio_evento').classList.add('model')
    document.querySelector('.err_data_hora_fim_evento').classList.add('model')
    var erro = 0;

    var data_hora_inicio = document.querySelector('.data_hora_inicio').value
    var data_hora_fim = document.querySelector('.data_hora_fim').value

    console.log(data_hora_inicio);
    if (data_hora_inicio.trim() == "") {

        document.querySelector('.err_data_hora_inicio_evento').classList.remove('model')
        document.querySelector('.err_data_hora_inicio_evento').innerHTML = " - *Data Hora Inicio Vazia"
        erro += 1;

    }


    if (data_hora_fim.trim() == "") {

        document.querySelector('.err_data_hora_fim_evento').classList.remove('model')
        document.querySelector('.err_data_hora_fim_evento').innerHTML = " - *Data Hora Fim Vazia"
        erro += 1;

    }

    if (erro == 0) {

        var novoEvento = {
            "idUsuario": evento.idUsuario,
            "cnpjProdutor": evento.cnpjProdutor,
            "tipo_evento": evento.tipo_evento,
            "descricao": evento.descricao,
            "nome_evento": evento.nome_evento,
            "endereco_evento": evento.endereco_evento,
            "data_hora_inicio": data_hora_inicio,
            "data_hora_fim": data_hora_fim,
            "status": "Aberto",
        }
        evento = novoEvento

        document.querySelector('.section_0').classList.add('model')
        document.querySelector('.section_1').classList.add('model')
        document.querySelector('.section_2').classList.add('model')
        document.querySelector('.section_3').classList.remove('model')
    }

}

function ConfirmarListaConvidado() {
    document.querySelector('.section_0').classList.add('model')
    document.querySelector('.section_1').classList.add('model')
    document.querySelector('.section_2').classList.add('model')
    document.querySelector('.section_3').classList.add('model')
    document.querySelector('.section_4').classList.remove('model')
}

function ConfirmarListaLocacao() {
    document.querySelector('.section_0').classList.add('model')
    document.querySelector('.section_1').classList.add('model')
    document.querySelector('.section_2').classList.add('model')
    document.querySelector('.section_3').classList.add('model')
    document.querySelector('.section_4').classList.add('model')
    document.querySelector('.section_5').classList.remove('model')
}

function ReceberUltimoEvento() {
    const options = { method: 'GET' };

    fetch(uriCard_Eventos, options)
        .then(res => res.json())
        .then(res => {
            listaEventos = res;
        }
        )
        .catch(err => console.error(err));
}

function BtnEditarEvento() {

    var options = JSON.stringify({
        "idUsuario": evento.idUsuario,
        "cnpjProdutor": evento.cnpjProdutor,
        "tipo_evento": evento.tipo_evento,
        "descricao": evento.descricao,
        "nome_evento": evento.nome_evento,
        "endereco_evento": evento.endereco_evento,
        "data_hora_inicio": evento.data_hora_inicio,
        "data_hora_fim": evento.data_hora_fim,
        "codigo": codigo_evento_editar,
        "status": "Aberto"
    })

    console.log(options);
    fetch("http://localhost:3000/eventos/id/" + operacao_evento.id_evento, {
        "method": "PUT",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": options
    })
        .then(res => {
            if (res.status == 200) {
            }
        })


    if (locacoes != null) {

        locacoes.forEach(l => {

            if (l.id_locacaoEventos == "") {

                let options = JSON.stringify({
                    "id_locacoes": Number(l.id_locacao),
                    "tipo": "",
                    "nome": l.nome,
                    "endereco": l.endereco,
                    "descricao": "",
                    "telefone": "",
                    "email": "",
                    "valor": 0.0,
                    "idEvento": Number(operacao_evento.id_evento),
                    "status": true
                })

                fetch("http://localhost:3000/locacoesEvento/criar", {
                    "method": "POST",
                    "headers": {
                        "Content-Type": "application/json"
                    },
                    "body": options
                })
                    .then(res => {
                        if (res.status == 200) {

                            console.log('cadastrou locacao');

                        }
                    })

            }

        })

    }

    if (convidado.length != 0) {

        convidado.forEach(c => {

            if (c.id_convidado == null || c.id_convidado == "") {

                let options = JSON.stringify({
                    "nome": c.nome,
                    "telefone": c.telefone,
                    "idEvento": Number(operacao_evento.id_evento),
                })

                fetch("http://localhost:3000/convidados", {
                    "method": "POST",
                    "headers": {
                        "Content-Type": "application/json"
                    },
                    "body": options
                })
                    .then(res => {
                        if (res.status == 200) {
                            DeletarConvidadosRemovidos()
                        }
                    })
            }

        })
    }

    DeletarConvidadosRemovidos()
    DeletarLocacoesRemovidos()

    window.location.href = "../index.html"



}

function DeletarConvidadosRemovidos() {

    if (convidadosRemovidos != null) {

        convidadosRemovidos.forEach(c => {

            fetch("http://localhost:3000/convidados/id/" + c.id_convidado, {
                "method": "DELETE",
                "headers": {
                    "Content-Type": "application/json"
                }
            })
                .then(res => {
                    if (res.status == 200) {

                    }
                })

        })
    }


}

function DeletarLocacoesRemovidos() {

    if (locacoesRemovidas.length > 0) {

        locacoesRemovidas.forEach(l => {

            fetch("http://localhost:3000/locacoesEvento/id/" + l.id_locacoes, {
                "method": "DELETE",
                "headers": {
                    "Content-Type": "application/json"
                }
            })
                .then(res => {
                    if (res.status == 200) {

                    }
                })

        })
    }


}

function gerarCodigo(tamanho) {
    var caracteres = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var codigo = '';

    for (var i = 0; i < tamanho; i++) {
        var indice = Math.floor(Math.random() * caracteres.length);
        codigo += caracteres.charAt(indice);
        caracteres = caracteres.slice(0, indice) + caracteres.slice(indice + 1);
    }

    return codigo;
}
