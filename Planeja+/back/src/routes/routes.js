const express = require('express');

const router = express.Router();


const Usuario = require('../controller/usuario')

router.get('/usuarios', Usuario.read)
router.get('/usuarios/id/:id_usuario', Usuario.readOne)
router.post('/usuarios', Usuario.create)
router.post('/enviar/:id_usuario', Usuario.enviarArquivo)
// router.post('/pasta', Usuario.upload)
router.post('/usuarios/criar', Usuario.createItems)
router.post('/usuarios/login', Usuario.login)
router.post('/usuarios/verificarCNPJ', Usuario.verificarCNPJ)
router.put('/usuarios/id/:id_usuario', Usuario.update)
router.delete('/usuarios/id/:id_usuario', Usuario.remove)

const Eventos = require('../controller/eventos')
router.get('/eventos', Eventos.read)
router.get('/eventos/id/:id_eventos', Eventos.readOne)
router.post('/eventos/criar', Eventos.createItems)
router.post('/eventos', Eventos.create)
router.put('/eventos/id/:id_eventos', Eventos.update)
router.delete('/eventos/id/:id_eventos', Eventos.remove)
router.post('/enviarEventos/:id_eventos', Eventos.enviarArquivo)

const TipoEvento = require('../controller/tiposEvento')
router.get('/tipos', TipoEvento.read)
router.get('/tipos/id/:id_tiposEvento', TipoEvento.readOne)
router.post('/tipos/criar', TipoEvento.createItems)
router.post('/tipos', TipoEvento.create)
router.put('/tipos/id/:id_tiposEvento', TipoEvento.update)
router.delete('/tipos/id/:id_tiposEvento', TipoEvento.remove)

const Locacoes = require('../controller/locacoes')
router.get('/locacoes', Locacoes.read)
router.get('/locacoes/id/:id_locacoes', Locacoes.readOne)
router.post('/locacoes/criar', Locacoes.createItems)
router.post('/locacoes', Locacoes.create)
router.put('/locacoes/id/:id_locacoes', Locacoes.update)
router.delete('/locacoes/id/:id_locacoes', Locacoes.remove)


const Fornecedor = require('../controller/fornecedor')
router.get('/fornecedor', Fornecedor.read)
router.get('/fornecedor/id/:id_fornecedor', Fornecedor.readOne)
router.post('/fornecedor/criar', Fornecedor.createItems)
router.post('/fornecedor', Fornecedor.create)
router.put('/fornecedor/id/:id_fornecedor', Fornecedor.update)
router.delete('/fornecedor/id/:id_fornecedor', Fornecedor.remove)


const listaConvidados = require('../controller/listaConvidados')
router.get('/convidados', listaConvidados.read)
router.get('/convidados/id/:id_convidado', listaConvidados.readOne)
router.get('/convidados/idEvento/:idEvento', listaConvidados.readEvent)
router.post('/convidados/criar', listaConvidados.createItems)
router.post('/convidados', listaConvidados.create)
router.put('/convidados/id/:id_convidado', listaConvidados.update)
router.delete('/convidados/id/:id_convidado', listaConvidados.remove)

const Servicos = require('../controller/servicos')
router.get('/servicos', Servicos.read)
router.get('/servicos/id/:id_servicos', Servicos.readOne)
router.post('/servicos/criar', Servicos.createItems)
router.post('/servicos', Servicos.create)
router.put('/servicos/id/:id_servicos', Servicos.update)
router.delete('/servicos/id/:id_servicos', Servicos.remove)

const Mensagens = require('../controller/messagens')
router.get('/messagens', Mensagens.read)
router.get('/messagens/idD/:destinatarioId', Mensagens.readDestinatario)
router.get('/messagens/idR/:remetenteId', Mensagens.readRemetente)
router.get('/conversa', Mensagens.readcON)

module.exports = router;