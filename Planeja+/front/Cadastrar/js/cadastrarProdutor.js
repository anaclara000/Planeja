var uriCard_Usuarios = 'http://localhost:3000/usuarios'

var usuarios = []
var servicos = []
var eventos_realizados = []

var info = {}

const options = { method: 'GET' };

fetch(uriCard_Usuarios, options)
    .then(res => res.json())
    .then(res => {
        usuarios = res;

    }
    )
    .catch(err => console.error(err));


function SelecionarOpcao(e) {

    var tipo = e.querySelector('.title').innerHTML


    if (tipo == "Produtor") {
        var produtor = document.querySelector('.produtor')
        var select = document.querySelector('.select')
        var cnpj = document.querySelector('.cnpj')
        var login_cont = document.querySelector('.login-cont')
        var cont_select_options = document.querySelector('.cont_select_options')
        var cnpj_cont = document.querySelector('.cnpj_cont')
        var teste = document.querySelector('.teste')


        select.classList.add('model')
        cont_select_options.classList.add('model')
        cnpj.classList.remove('model')
        cnpj.classList.remove('model')
        login_cont.classList.add('model')
        teste.classList.add('model')
    }

    if (tipo == "Usuario") {

        var usuario = document.querySelector('.usuario')
        var select = document.querySelector('.select')
        var cnpj = document.querySelector('.cnpj')
        var login_cont = document.querySelector('.login-cont')
        var cont_select_options = document.querySelector('.cont_select_options')
        var teste = document.querySelector('.teste')

        select.classList.add('model')
        cont_select_options.classList.add('model')
        login_cont.classList.remove('model')
        usuario.classList.remove('model')

    }
}


function VerificarCNPJ(cnpj) {

    var erroCnpj = document.querySelector('.erro_cnpj')

    erroCnpj.classList.add('err')

    var cnpj = document.querySelector('#cnpj_inp').value

    var produtor = document.querySelector('.produtor')
    var select = document.querySelector('.select')
    var cont_cnpj = document.querySelector('.cnpj')
    var login_cont = document.querySelector('.login-cont')
    var cont_select_options = document.querySelector('.cont_select_options')
    var cnpj_cont = document.querySelector('.cnpj_cont')
    var teste = document.querySelector('.teste')

    // select.classList.add('model')
    // cont_select_options.classList.add('model')
    // cont_cnpj.classList.add('model')
    // login_cont.classList.remove('model')
    // teste.classList.add('model')
    // produtor.classList.remove('model')
    // return;

    if (cnpj.trim() == "") {

        erroCnpj.classList.remove('err')
        erroCnpj.innerHTML = "CNPJ Vazio"

        console.log(erroCnpj);

        return false;
    }

    cnpj = cnpj.replace(/[^\d]+/g, '');

    if (cnpj == '') return false;

    if (cnpj.length != 14) {

        erroCnpj.classList.remove('err')
        erroCnpj.innerHTML = "CNPJ Inválido"

        return false;

    }

    // Elimina CNPJs invalidos conhecidos
    if (cnpj == "00000000000000" ||
        cnpj == "11111111111111" ||
        cnpj == "22222222222222" ||
        cnpj == "33333333333333" ||
        cnpj == "44444444444444" ||
        cnpj == "55555555555555" ||
        cnpj == "66666666666666" ||
        cnpj == "77777777777777" ||
        cnpj == "88888888888888" ||
        cnpj == "99999999999999") {

        erroCnpj.classList.remove('err')
        erroCnpj.innerHTML = "CNPJ Inválido"

        return false;
    }

    // Valida DVs
    tamanho = cnpj.length - 2
    numeros = cnpj.substring(0, tamanho);
    digitos = cnpj.substring(tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0)) {
        erroCnpj.classList.remove('err')
        erroCnpj.innerHTML = "CNPJ Inválido"
        return false;
    }

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1)) {
        erroCnpj.classList.remove('err')
        erroCnpj.innerHTML = "CNPJ Inválido"
        return false;

    }

    let data = {
        "cnpj": cnpj,
    }

    fetch("http://localhost:3000/usuarios/verificarCNPJ ", {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify(data)
    })
        .then(res => { return res.json() })
        .then(data => {

            if (data.status == 404) {
                erroCnpj.classList.remove('err')
                erroCnpj.innerHTML = "CNPJ não encontrado"
                return;
            }

            if (data.erro === undefined) {

                select.classList.add('model')
                cont_select_options.classList.add('model')
                cont_cnpj.classList.add('model')
                login_cont.classList.remove('model')
                teste.classList.add('model')
                produtor.classList.remove('model')

                document.querySelector('#razao').value = data.nome
                document.querySelector('#cnpj').value = data.cnpj

            }


        })

}

var ultimoUsuario = null

function CadastrarProdutor() {

    var valor = 0

    var erro_adicionar_tipos_eventos_vazios = document.querySelector('.erro_adicionar_tipos_eventos_vazios')
    var erro_servicoes_prestados = document.querySelector('.erro_servicoes_prestados')

    erro_adicionar_tipos_eventos_vazios.classList.add('err')
    erro_servicoes_prestados.classList.add('err')

    var tipos_eventos_realizados = document.querySelector('.tipos_eventos_realizados')
    var servicoes_prestados = document.querySelector('.servicoes_prestados')

    if (tipos_eventos_realizados.childElementCount == 0) {
        erro_adicionar_tipos_eventos_vazios.classList.remove('err')
        erro_adicionar_tipos_eventos_vazios.innerHTML = "Adicione pelo menos 1 evento realizado"
        valor += 1
    }

    if (servicoes_prestados.childElementCount == 0) {
        erro_servicoes_prestados.classList.remove('err')
        erro_servicoes_prestados.innerHTML = "Adicione pelo menos 1 serviço fornecido"
        valor += 1
    }

    if (valor == 0) {

        // var teste = servicos.json.stringify
        // var test2 = eventos_realizados.json.stringify

        let produtor = JSON.stringify({
            "nome": "",
            "email": info.email,
            "senha": info.senha,
            "raz": info.raz,
            "cnpj": info.cnpj,
            "cpf": null,
            "nomeFantasia": info.nomeFantasia,
            "telefone": info.telefone,
            "tipo": "Produtor"
        })

        console.log(produtor);


        fetch("http://localhost:3000/usuarios", {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json"
            },
            "body": produtor
        })
            .then(res => {
                if (res.status == 200) {

                    console.log('Criou krl');
                    FetchCadastrarServicos();
                }
            })



    }


}

function FetchCadastrarServicos() {

    usuarios.forEach(u => {
        ultimoUsuario = u.id_usuario
    })

    var soma = 0;

    localStorage.setItem("info_produtor", JSON.stringify({ "id_usuario": info.ultimoUsuario, "cnpj": info.cnpj }));


    servicos.forEach(s => {

        var options = JSON.stringify(
            {
                "id_usuario": ultimoUsuario,
                "nome": s.nome
            }
        )

        console.log(options);

        fetch("http://localhost:3000/servicos", {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json"
            },
            "body": options
        })
            .then(res => {
                if (res.status == 200) {

                    console.log('Criou krl produtor');

                    soma += 1
                }
            })

    })

    eventos_realizados.forEach(e => {

        var options = JSON.stringify(
            {
                "id_usuario": ultimoUsuario,
                "nome": e.nome,
                // "descricao": ""
            }
        )

        console.log(options);

        fetch("http://localhost:3000/tipos", {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json"
            },
            "body": options
        })
            .then(res => {
                if (res.status == 200) {

                    console.log('Criou krl eventos');

                    window.location.href = "../Home/home.html"

                }
            })
    })
}

function CadastrarUsuario() {

    var valor = 0;

    var erroNome = document.querySelector('.erro_nome_user')
    var erroEmail = document.querySelector('.erro_email_user')
    var erroSenha = document.querySelector('.erro_senha_user')
    var erroCPF = document.querySelector('.erro_cpf')

    erroNome.classList.add('err')
    erroEmail.classList.add('err')
    erroSenha.classList.add('err')
    erroCPF.classList.add('err')

    usuarios.forEach(u => {
        ultimoUsuario = u.id_usuario
    })

    var nomeUser = document.querySelector('#nomeUser').value
    var emailUser = document.querySelector('#emailUser').value
    var senhaUser = document.querySelector('#senhaUser').value
    var cpfUser = document.querySelector('#cpfUser').value

    if (nomeUser.trim() == "") {
        erroNome.classList.remove('err')
        erroNome.innerHTML = 'Nome Vazio'
        valor += 1

        console.log(erroNome);
    }

    if (emailUser.trim() == "") {
        erroEmail.classList.remove('err')
        erroEmail.innerHTML = 'Email Vazio'
        valor += 1
    }
    else {

        var er = new RegExp(/^[A-Za-z0-9_\-\.]+@[A-Za-z0-9_\-\.]{2,}\.[A-Za-z0-9]{2,}(\.[A-Za-z0-9])?/);

        if (!er.test(emailUser)) {
            erroEmail.classList.remove('err');
            erroEmail.innerHTML = "Email Inválido";
            valor += 1
        }

    }

    if (senhaUser.trim() == "") {
        erroSenha.classList.remove('err')
        erroSenha.innerHTML = 'Senha Vazio'
        valor += 1
    }

    if (cpfUser.trim() == "") {
        erroCPF.classList.remove('err')
        erroCPF.innerHTML = 'CPF Vazio'
        valor += 1
    }
    else {

        var strCPF = cpfUser
        var Soma;
        var Resto;
        Soma = 0;
        if (strCPF == "00000000000" || strCPF == "11111111111" || strCPF == "22222222222" || strCPF == "33333333333" || strCPF == "44444444444" || strCPF == "55555555555" || strCPF == "6666666666" || strCPF == "77777777777" || strCPF == "88888888888" || strCPF == "99999999999") {
            erroCPF.classList.remove('err')
            erroCPF.innerHTML = 'CPF Inválido'
            valor += 1
        }

        for (i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
        Resto = (Soma * 10) % 11;

        if ((Resto == 10) || (Resto == 11)) Resto = 0;
        if (Resto != parseInt(strCPF.substring(9, 10))) {

            erroCPF.classList.remove('err')
            erroCPF.innerHTML = 'CPF Inválido'
            valor += 1
        }
        Soma = 0;
        for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
        Resto = (Soma * 10) % 11;

        if ((Resto == 10) || (Resto == 11)) Resto = 0;
        if (Resto != parseInt(strCPF.substring(10, 11))) {
            erroCPF.classList.remove('err')
            erroCPF.innerHTML = 'CPF Inválido'
            valor += 1
        }
    }

    if (valor == 0) {

        let options = JSON.stringify({
            "nome": nomeUser,
            "email": emailUser,
            "senha": senhaUser,
            "raz": "",
            "nomeFantasia": "",
            "cnpj": null,
            "cpf": cpfUser,
            "tipo": "Usuario",
            "telefone": ""
        })

        fetch("http://localhost:3000/usuarios", {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json"
            },
            "body": options
        })
            .then(res => {
                if (res.status == 200) {

                    localStorage.setItem("info_usuario", JSON.stringify({ "id_usuario": ultimoUsuario, "cnpj": cpfUser }));

                    // logar()

                    window.location.href = "../Home/home.html"
                }
            })

    }

}

function SeguirEtapa() {

    var valor = 0;

    var erroRaz = document.querySelector(".erro_raz")

    var erro_email = document.querySelector(".erro_email")

    var erro_senha = document.querySelector(".erro_senha")

    var erro_confirmar_senha = document.querySelector(".erro_confirmar_senha")

    var erro_nome_fantasia = document.querySelector(".erro_nome_fantasia")

    var erro_cnpj = document.querySelector(".erro_cnpj")

    var erro_telefone = document.querySelector(".erro_telefone")

    var raz = document.querySelector('#razao').value
    var email = document.querySelector('#email').value
    var senha = document.querySelector("#senha").value
    var confirmar_senha = document.querySelector('#confirmar_senha').value
    var nome_fantasia = document.querySelector("#nome_fantasia").value
    var cnpj = document.querySelector("#cnpj").value
    var telefone = document.querySelector("#telefone").value

    erro_email.classList.add('err');
    erro_confirmar_senha.classList.add('err');
    erro_confirmar_senha.classList.add('err');
    erro_senha.classList.add('err');
    erro_cnpj.classList.add('err');
    erro_telefone.classList.add('err');
    erro_nome_fantasia.classList.add('err');

    var produtor = document.querySelector('.produtor')
    var select = document.querySelector('.select')
    var cont_cnpj = document.querySelector('.cnpj')
    var login_cont = document.querySelector('.login-cont')
    var cont_select_options = document.querySelector('.cont_select_options')
    var options_produtor = document.querySelector('.options_produtor')
    var teste = document.querySelector('.teste')


    // select.classList.add('model')
    // produtor.classList.add('err')
    // cont_select_options.classList.add('model')
    // cont_cnpj.classList.add('model')
    // login_cont.classList.remove('model')
    // teste.classList.add('model')

    // options_produtor.classList.remove('model')

    // return;

    if (raz.trim() == "") { erroRaz.classList.remove('err'); erroRaz.innerHTML = "Razão Social Vazia"; valor += 1 }

    if (email.trim() == "") {
        erro_email.classList.remove('err');
        erro_email.innerHTML = "Email Vazio";
        valor += 1
    }
    else {
        //VALIDANDO EMAIL 
        var er = new RegExp(/^[A-Za-z0-9_\-\.]+@[A-Za-z0-9_\-\.]{2,}\.[A-Za-z0-9]{2,}(\.[A-Za-z0-9])?/);

        if (email.trim() == "" || !er.test(email)) {
            erro_email.classList.remove('err');
            erro_email.innerHTML = "Email Vazio";
            valor += 1
        }
    }

    if (senha.trim() == "") { erro_senha.classList.remove('err'); erro_senha.innerHTML = "Senha Vazia"; valor += 1 }

    if (confirmar_senha.trim() == "") {
        erro_confirmar_senha.classList.remove('err');
        erro_confirmar_senha.innerHTML = "Confirmar Senha Vazia";
        valor += 1
    }
    else {
        if (senha.trim() != confirmar_senha.trim()) {
            erro_confirmar_senha.classList.remove('err');
            erro_confirmar_senha.innerHTML = "Senhas Diferentes";
            valor += 1
        }
    }

    if (nome_fantasia.trim() == "") { erro_nome_fantasia.classList.remove('err'); erro_nome_fantasia.innerHTML = "Nome Fantasia Vazio"; valor += 1 }

    if (nome_fantasia.trim() == "") { erro_nome_fantasia.classList.remove('err'); erro_nome_fantasia.innerHTML = "Nome Fantasia Vazio"; valor += 1 }

    if (cnpj.trim() == "") {
        erro_cnpj.classList.remove('err');
        erro_cnpj.innerHTML = "CNPJ Vazio";
        valor += 1
    }
    else {
        var cnpjVerificado = VerificarCNPJ(cnpj);

        if (cnpjVerificado == false) {
            erro_cnpj.classList.remove('err');
            erro_cnpj.innerHTML = "CNPJ Inválido";
            valor += 1
        }
    }

    if (telefone.trim() == "") {
        erro_telefone.classList.remove('err');
        erro_telefone.innerHTML = "Telefone Vazio";
        valor += 1
    }
    else {
        telefone = telefone.replace(/\D/g, '');

        //verifica se tem a qtde de numero correto
        if (!(telefone.length >= 10 && telefone.length <= 11)) {
            erro_telefone.classList.remove('err');
            erro_telefone.innerHTML = "Telefone Inálido";
            valor += 1;
        }

        //Se tiver 11 caracteres, verificar se começa com 9 o celula
        if (telefone.length == 11 && parseInt(telefone.substring(2, 3)) != 9) {
            erro_telefone.classList.remove('err');
            erro_telefone.innerHTML = "Telefone Inálido";
            valor += 1;
        }

        //verifica se não é nenhum numero digitado errado (propositalmente)
        for (var n = 0; n < 10; n++) {
            //estou utilizando o metodo Array(q+1).join(n) onde "q" é a quantidade e n é o
            //caractere a ser repetido
            if (telefone == new Array(11).join(n) || telefone == new Array(12).join(n)) {
                erro_telefone.classList.remove('err');
                erro_telefone.innerHTML = "Telefone Inálido";
                valor += 1;
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
            erro_telefone.classList.remove('err');
            erro_telefone.innerHTML = "Telefone Inálido";
            valor += 1;
        }

        if (new Date().getFullYear() < 2017) return true;
        if (telefone.length == 10 && [2, 3, 4, 5, 7].indexOf(parseInt(telefone.substring(2, 3))) == -1) {
            erro_telefone.classList.remove('err');
            erro_telefone.innerHTML = "Telefone Inálido";
            valor += 1;
        }

        //se passar por todas as validações acima, então está tudo certo
    }


    if (valor == 0) {

        var produtor = document.querySelector('.produtor')
        var select = document.querySelector('.select')
        var cont_cnpj = document.querySelector('.cnpj')
        var login_cont = document.querySelector('.login-cont')
        var cont_select_options = document.querySelector('.cont_select_options')
        var options_produtor = document.querySelector('.options_produtor')
        var teste = document.querySelector('.teste')

        select.classList.add('model')
        produtor.classList.add('err')
        cont_select_options.classList.add('model')
        cont_cnpj.classList.add('model')
        login_cont.classList.remove('model')
        teste.classList.add('model')

        options_produtor.classList.remove('model')

        info = {
            "nome": null,
            "email": email,
            "senha": senha,
            "raz": raz,
            "cnpj": cnpj,
            "cpf": null,
            "nomeFantasia": nome_fantasia,
            "telefone": telefone,
            "tipo": "Produtor"
        }




        // console.log(options);



    }

}

function InserirEventosRealizados() {

    var card_eventos_realizados = document.querySelector('.eventos_realizados')
    var tipos_eventos = document.querySelector('#adicionar_tipos_eventos').value
    console.log(tipos_eventos);

    var novo_card_eventos_realizados = card_eventos_realizados.cloneNode(true)

    novo_card_eventos_realizados.classList.remove('model')
    novo_card_eventos_realizados.querySelector('.title_eventos_realizados').innerHTML = tipos_eventos

    document.querySelector('.tipos_eventos_realizados').appendChild(novo_card_eventos_realizados)

    document.querySelector('#adicionar_tipos_eventos').value = ""

    var novo_eventos_realizados = {
        "id_usuario": 1,
        "nome": tipos_eventos,
        "descricao": ""
    }

    eventos_realizados.push(novo_eventos_realizados)

}

var i = 0
function AdicionarServicos() {

    var card_servicos = document.querySelector('.servicos')
    var valor_servicos = document.querySelector('#input_servicos').value

    var novo_card_servicos = card_servicos.cloneNode(card_servicos)

    novo_card_servicos.classList.remove('model')
    novo_card_servicos.querySelector('.title_service').innerHTML = valor_servicos

    document.querySelector('.servicoes_prestados').appendChild(novo_card_servicos)

    document.querySelector('#input_servicos').value = ""

    var novo_servicos = {
        "id_usuario": 1,
        "nome": valor_servicos
    }

    servicos.push(novo_servicos)

}



function RemoverServicos(e) {

    var nome_servico = e.parentNode.querySelector('.title_service').innerHTML

    var posicao_servico = servicos.findIndex(s => s.nome == nome_servico)

    if (posicao_servico !== -1) {
        servicos.splice(posicao_servico, 1)

        var div = document.querySelector('.servicoes_prestados')
        var filho = div.children[posicao_servico]

        if (filho !== null) {
            div.removeChild(filho)
        }
    }

}

function RemoverEventosRelizados(e) {

    var nome_eventos = e.parentNode.querySelector('.title_eventos_realizados').innerHTML

    console.log(nome_eventos);

    var posicao_eventos = eventos_realizados.findIndex(s => s.nome == nome_eventos)

    if (posicao_eventos !== -1) {
        eventos_realizados.splice(posicao_eventos, 1)

        var div = document.querySelector('.tipos_eventos_realizados')
        var filho = div.children[posicao_eventos]

        if (filho !== null) {
            div.removeChild(filho)
        }
    }
}

function logar() {

    var emailUser = document.querySelector('#emailUser').value
    var senhaUser = document.querySelector('#senhaUser').value

    let data = {
        "email": emailUser,
        "senha": senhaUser
    }

    console.log(data);
    fetch("http://localhost:3000/usuarios/login", {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify(data)
    })
        .then(res => { return res.json() })
        .then(data => {

            console.log(data.erro);

            if (data.erro === undefined) {


                window.location.href = "../Home/index.html"

            }
        })

}


