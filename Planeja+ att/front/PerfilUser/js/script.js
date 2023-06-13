
//Seleciona os itens clicado
var menuItem = document.querySelectorAll('.item-menu')
var title_menu = document.querySelector('.title_menu')
var userinfo = JSON.parse(localStorage.getItem("info"));


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

var user = JSON.parse(localStorage.getItem("info"));

var btnExp = document.querySelector('#btn-exp')
var menuSide = document.querySelector('.menu-lateral')

btnExp.addEventListener('click', function () {
    menuSide.classList.toggle('expandir')
    title_menu.classList.toggle('model')

})
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
                if (lista.querySelector('.imgProdutores').src = "../../back/src/" + p.caminhoImagem == "../../back/src/" + null) {
                    lista.querySelector('.imgProdutores').src = "assets/addImg.png"
                } else {
                    lista.querySelector('.imgProdutores').src = "../../back/src/" + p.caminhoImagem
                }

                lista.querySelector('.id-promotor').innerHTML = p.id_usuario
                console.log(p.id_usuario)
                lista.querySelector('.nome-promotor').innerHTML = p.raz
                lista.querySelector('.descPromo').innerHTML = p.desc
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


    // if (!user.token) {
    //     console.error('Token de autenticação não encontrado');
    //     return;
    // }

    // fetch('http://localhost:3000/conversas', {
    //     headers: {
    //         Authorization: `Bearer ${user.token}`
    //     }
    // })
    //     .then(response => response.json())
    //     .then(data => {
    //         // Aqui você tem acesso às conversas retornadas pelo backend
    //         // Faça o processamento necessário e exiba as conversas no frontend
    //         exibirConversas(data);
    //     })
    //     .catch(error => {
    //         // Trate erros caso ocorra algum problema na requisição
    //         console.error('Erro ao obter as conversas:', error);
    //     });


}
const contInfos = document.querySelector(".cont-infos");
const contMsg = document.querySelector(".cont-mensagens");

var conversas

// function listarPromotor() {

//     promotores.forEach(p => {
//         var lista = contInfos.cloneNode(true)
//         lista.style.display = "flex"
//         lista.querySelector('.imgProdutores').src = "../../back/src/" + p.caminhoImagem
//         lista.querySelector('.id-promotor').innerHTML = p.id_usuario
//         lista.querySelector('.nome-promotor').innerHTML = p.raz
//         lista.querySelector('.descPromo').innerHTML = p.desc
//         if (p.raz == null) {
//             lista.querySelector('.nome-promotor').innerHTML = p.nome
//         }
//         contMsg.appendChild(lista)
//     })


// }
// function listarUsuariosComConversaAtiva() {
//     const userId = userinfo.id_user; // Substitua pelo ID do usuário atual

//     // 1. Obter as conversas ativas do usuário atual
//     fetch(`http://localhost:3000/messagens/idR/` + userId)
//         .then(conversasRes => conversasRes.json())
//         .then(conversasData => {
//             // Obter os IDs dos participantes das conversas
//             const participantesIds = conversasData.map(conversa => conversa.destinatario);

//             // 2. Obter detalhes dos usuários com base nos IDs dos participantes
//             fetch(`http://localhost:3000/usuarios?ids=${participantesIds.join(",")}`)
//                 .then(usuariosRes => usuariosRes.json())
//                 .then(usuariosData => {
//                     // Filtrar os usuários com os quais o usuário atual teve uma conversa
//                     const usuariosComConversa = usuariosData.filter(usuario =>
//                         participantesIds.includes(usuario.id_usuario)
//                     );

//                     // 3. Renderizar a lista de usuários com conversa ativa
//                     usuariosComConversa.forEach(usuario => {
//                         var lista = contInfos.cloneNode(true);
//                         lista.style.display = "flex";
//                         console.log(usuario.caminhoImagem);
//                         lista.querySelector('.imgProdutor').src = "../../back/src/" + usuario.caminhoImagem;
//                         lista.querySelector('.id-promotor').innerHTML = usuario.id_usuario;
//                         lista.querySelector('.nome-promotor').innerHTML = usuario.raz || usuario.nome;
//                         contMsg.appendChild(lista);
//                     });
//                 })
//                 .catch(error => {
//                     console.error(error);
//                     // Lógica para tratamento de erros
//                 });
//         })
//         .catch(error => {
//             console.error(error);
//             // Lógica para tratamento de erros
//         });
// }


const messages = document.querySelector('#messages')
const contMessages = document.querySelector('.container')

var globalId
function exibirMensagem(e) {
    var img = e.querySelector('.imgProdutores').src
    var idPromotor = e.querySelector('.id-promotor').innerHTML
    globalId = idPromotor
    var nomePromotor = e.querySelector('.nome-promotor').innerHTML
    var idConversa = e.id.replace('c', '')

    document.querySelector('.nomePromotor').innerHTML = nomePromotor
    document.querySelector('.imgProdutor').src = img
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
                            document.querySelector('.nomePromotor').innerHTML = nomePromotor
                            document.querySelector('.imgProdutor').src = img
                            messages.appendChild(lista)
                        } else {
                            var lista = document.createElement('span')
                            lista.classList.add('conteudoRemetente')
                            lista.innerHTML = p.conteudo

                            messages.appendChild(lista)
                        }

                        // if (p.remetenteId == userinfo.id_user) {
                        //     var lista = document.createElement('span')
                        //     lista.classList.add('conteudoRemetente')
                        //     lista.innerHTML = p.conteudo

                        //     messages.appendChild(lista)
                        // }


                    })
                }
            })

        })
        .catch(err => console.error(err));

}
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

    const input = document.getElementById('input');
    const remetenteId = userinfo.id_user;
    const destinatarioId = parseInt(globalId);
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
const input = document.getElementById('input');
input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && input.value != '') {
        sendMessage();
    } else {
        console.log('nada');
    }
});
