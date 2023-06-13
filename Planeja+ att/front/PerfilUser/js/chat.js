
var user = JSON.parse(localStorage.getItem("info"));

//Seleciona os itens clicados
var menuItem = document.querySelectorAll('.item-menu');
var title_menu = document.querySelector('.title_menu');
var userinfo = JSON.parse(localStorage.getItem("info"));

function selectLink() {
    menuItem.forEach((item) => item.classList.remove('ativo'));
    this.classList.add('ativo');
}

menuItem.forEach((item) =>
    item.addEventListener('click', selectLink)
);
title_menu.classList.add('model');

//Expandir o menu


// BACKGROUND
const contInfos = document.querySelector(".cont-info-dest");
const contMsg = document.querySelector(".cont-do-user");
const chatElement = document.getElementById('chat');
const colorPickerButton = document.getElementById('color-picker');
const iconCamera = document.getElementById('teste');
const iconSend = document.getElementById('teste4');
const iconPlus = document.getElementById('teste5');

colorPickerButton.addEventListener('click', openColorPicker);

// VERIFICA SE TEM ALGUMA COR NO LOCALSTORAGE
const savedBgColor = localStorage.getItem('chatBgColor');
if (savedBgColor) {
    chatElement.style.background = savedBgColor;
    colorPickerButton.style.color = savedBgColor;
}

contInfos.addEventListener('mouseenter', () => {
    contInfos.style.background = chatElement.style.background;
});

iconCamera.addEventListener('mouseenter', () => {
    iconCamera.style.background = chatElement.style.background;
});

contInfos.addEventListener('mouseleave', () => {
    contInfos.style.background = 'transparent';
});

iconCamera.addEventListener('mouseleave', () => {
    iconCamera.style.background = 'transparent';
});

iconSend.addEventListener('mouseenter', () => {
    iconSend.style.background = chatElement.style.background;
    iconSend.style.color = 'white';
});

iconSend.addEventListener('mouseleave', () => {
    iconSend.style.background = 'transparent';
    iconSend.style.color = 'black';
});

iconPlus.addEventListener('mouseenter', () => {
    iconPlus.style.background = chatElement.style.background;
});

iconPlus.addEventListener('mouseleave', () => {
    iconPlus.style.background = 'transparent';
});

function openColorPicker() {
    const input = document.createElement('input');
    input.type = 'color';
    input.addEventListener('change', changeBackground);

    // FINGE QUE É UM CLICK NO INPUT
    input.click();
}

// MUDA A COR 
function changeBackground(event) {
    const selectedColor = event.target.value;
    chatElement.style.background = selectedColor;
    colorPickerButton.style.color = selectedColor;
    localStorage.setItem('chatBgColor', selectedColor);
}

const mensagemInput = document.getElementById('mensagem-input');
const iconeEnviar = document.getElementById('icone-send');

mensagemInput.addEventListener('input', () => {
    if (mensagemInput.value.trim() !== '') {
        iconeEnviar.style.background = chatElement.style.background;
        iconeEnviar.style.color = 'white';
        iconeEnviar.style.padding = '2%';
        iconeEnviar.style.borderRadius = '5px';
    } else {
        iconeEnviar.style.background = 'transparent';
        iconeEnviar.style.color = 'black';
    }
});


// FUNCIONALIDADES

//----------- CARREGA AS CONVERSAS DO USUARIO LOGADO -------------
var promotores = [];
var mensagens = [];

function carregar() {
    const options = { method: 'GET' };

    fetch('http://localhost:3000/usuarios/id/' + userinfo.id_user, options)
        .then(response => response.json())
        .then(response => {
            response.conversas.forEach(c => {
                var p
                c.participantes.forEach(par => {
                    if (par.id_usuario !== userinfo.id_user) {
                        p = par
                    }
                    console.log(par)
                })
                var lista = contInfos.cloneNode(true)
                lista.style.display = "flex"
                if (lista.querySelector('.img-cont-info').src = "../../back/src/" + p.caminhoImagem == "../../back/src/" + null) {
                    lista.querySelector('.img-cont-info').src = "https://cdn-icons-png.flaticon.com/512/1946/1946429.png"
                } else {
                    lista.querySelector('.img-cont-info').src = "../../back/src/" + p.caminhoImagem
                }

                lista.querySelector('.id-promotor').innerHTML = p.id_usuario
                console.log(p.id_usuario)
                lista.querySelector('.nome-promotor').innerHTML = p.raz
                lista.querySelector('.cont-ultima-msg').innerHTML = p.desc
                if (p.raz == null) {
                    lista.querySelector('.nome-promotor').innerHTML = p.nome
                }
                lista.id = "c" + c.id_conversa

                contMsg.appendChild(lista)
            })
        })
        .catch(err => console.error(err));

    fetch("http://localhost:3000/messagens/idR/" + userinfo.id_user)
        .then(resp => { return resp.json() })
        .then(men => {
            mensagens = men;

        });


}


var conversas


//----------- EXIBIR MENSAGENS --------------

const messages = document.querySelector('#messages')
const contMessages = document.querySelector('.cont-chat')

var globalId
function exibirMensagem(e) {
    var img = e.querySelector('.img-cont-info').src
    var idPromotor = e.querySelector('.id-promotor').innerHTML
    globalId = idPromotor
    var nomePromotor = e.querySelector('.nome-promotor').innerHTML
    var idConversa = e.id.replace('c', '')

    document.querySelector('.nome-perfil').innerHTML = nomePromotor
    document.querySelector('.img-perfil').src = img
    const options = { method: 'GET' }


    fetch('http://localhost:3000/usuarios/id/' + userinfo.id_user, options)
        .then(response => response.json())
        .then(response => {
            messages.innerHTML = ""
            // console.log(response)
            response.conversas.forEach(c => {
                if (c.id_conversa == idConversa) {
                    c.mensagens.forEach(p => {
                        console.log(idPromotor)
                        console.log(p.destinatarioId)
                        console.log(p.remetenteId)
                        if (p.remetenteId != userinfo.id_user) {
                            var lista = document.createElement('span')
                            lista.classList.add('conteudo')
                            lista.innerHTML = p.conteudo
                            document.querySelector('.nome-perfil').innerHTML = nomePromotor
                            document.querySelector('.img-perfil').src = img
                            messages.appendChild(lista)
                        } else {
                            var lista = document.createElement('span')
                            lista.classList.add('conteudoRemetente')
                            lista.innerHTML = p.conteudo

                            messages.appendChild(lista)
                        }

                    })
                }
            })

        })
        .catch(err => console.error(err));

}

//---------------- WEBSOCKET -> ENVIAR AS MENSAGENS ---------------

const ws = new WebSocket('ws://localhost:3000/chat');

ws.onopen = () => {
    console.log('Conexão estabelecida.');
};

const receivedMessages = new Set();

ws.onmessage = (event) => {
    const messagesDiv = document.getElementById('messages');
    const mensagem = JSON.parse(event.data);
    const remetenteId = mensagem.remetenteId;

    if (receivedMessages.has(mensagem.id_mensagem)) {
        return; // Ignorar a mensagem duplicada
    }

    receivedMessages.add(mensagem.id_mensagem);

    const conteudoSpan = document.createElement('span');
    conteudoSpan.textContent = mensagem.conteudo;

    if (remetenteId != userinfo.id_user) {
        conteudoSpan.classList.add('conteudo');
        conteudoSpan.style.display = "flex"
        console.log(remetenteId)
    } else {
        conteudoSpan.classList.add('conteudoRemetente');
        conteudoSpan.style.display = "flex"
    }

    messagesDiv.appendChild(conteudoSpan);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
};

ws.onclose = () => {
    console.log('Conexão encerrada.');
};

function sendMessage() {

    const input = document.getElementById('mensagem-input');
    const remetenteId = userinfo.id_user;
    var destinatarioId
    if (destinatarioId = parseInt(globalId) == undefined) {
        destinatarioId = document.querySelector('.op-id-produtor').innerHTML
    } else {
        destinatarioId = parseInt(globalId)
    }

    console.log(remetenteId)
    console.log(destinatarioId)
    const conteudo = input.value;
    const data = new Date().toISOString(); // Obtém a data atual em formato ISO string

    const message = {
        remetenteId,
        destinatarioId,
        conteudo,
        data, // Adiciona a propriedade 'data' com a data atual
    };

    console.log(message);
    ws.send(JSON.stringify(message));
    input.value = '';
}

// Adicionar evento de teclado para o campo de entrada
const input = document.getElementById('mensagem-input');
input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && input.value != '') {
        sendMessage();
    } else {
        console.log('nada');
    }
});

function escolherUser() {
    var selecionarPromotor = document.querySelector('.selecionar-promotor')
    selecionarPromotor.classList.remove('model')
    const options = { method: 'GET' };

    fetch('http://localhost:3000/parcerias', options)
        .then(response => response.json())
        .then(response => {
            var op = document.createElement("option")

            if (response.idProdutor !== undefined) {
                fetch('http://localhost:3000/usuarios/id/' + response.idProdutor, options)
                    .then(response => response.json())
                    .then(resp => {
                        op.value = response.idProdutor
                        op.classList.add('op-id-produtor')
                        op.innerHTML = resp.nomeFantasia
                        document.querySelector(".select_promo").appendChild(op)
                    })
                var btn = document.querySelector('.confirm')
                btn.classList.remove('model')
            } else {
                var parceria = document.querySelector('.parceria')
                parceria.classList.remove('model')
                var seletc = document.querySelector('.select_promo')
                seletc.classList.add('model')

                // op.innerHTML = "Você não tem parcerias"
                // document.querySelector(".select_promo").appendChild(op)

            }

        })

}

function fecharModel() {
    var selecionarPromotor = document.querySelector('.selecionar-promotor')
    selecionarPromotor.classList.add('model')
}