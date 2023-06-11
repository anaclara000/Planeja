const express = require('express');
const cors = require('cors');
const WebSocket = require('ws');
const { PrismaClient } = require('@prisma/client');
const router = require('./src/routes/routes')
const app = express();
const server = require('http').createServer(app);
const wss = new WebSocket.Server({ server });
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());
app.use(router)


wss.on('connection', (ws) => {
    ws.on('message', async (message) => {
        const { remetenteId, destinatarioId, conteudo } = JSON.parse(message);

        try {
            let conversa = await prisma.conversa.findFirst({
                where: {
                    participantes: {
                        every: {
                            id_usuario: {
                                in: [remetenteId, destinatarioId],
                            },
                        },
                    },
                },
            });

            if (!conversa) {
                conversa = await prisma.conversa.create({
                    data: {
                        participantes: {
                            connect: [
                                { id_usuario: remetenteId },
                                { id_usuario: destinatarioId },
                            ],
                        },
                    },
                });
            }

            const novaMensagem = await prisma.mensagem.create({
                data: {
                    conteudo,
                    remetente: { connect: { id_usuario: remetenteId } },
                    destinatario: { connect: { id_usuario: destinatarioId } },
                    conversa: { connect: { id_conversa: conversa.id_conversa } },
                },
            });

            wss.clients.forEach((client) => {
                client.send(JSON.stringify(novaMensagem));
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify(novaMensagem));
                }
            });
        } catch (error) {
            console.error(error);
        }
    });
});


server.listen(3000, () => {
    console.log('Servidor está rodando na porta 3000');
});
