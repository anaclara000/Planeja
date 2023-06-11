const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const read = async (req, res) => {
    let Message = await prisma.Mensagem.findMany();

    res.status(200).json(Message).end();
}

const readcON = async (req, res) => {
    let conversa = await prisma.conversa.findMany();

    res.status(200).json(conversa).end();
}

const readDestinatario = async (req, res) => {
    const { destinatarioId } = req.params;

    try {
        const messages = await prisma.mensagem.findMany({
            where: {
                destinatarioId: Number(destinatarioId)
            },
            select: {
                // id_mensagem: true,
                conteudo: true,
                // remetente: true,
                // destinatario: true,
                remetenteId: true,
                // destinatarioId: true,
                // conversa: true,
                conversaId: true,
            }
        });

        res.status(200).json(messages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar as mensagens.' });
    }
};

const readRemetente = async (req, res) => {
    const { remetenteId } = req.params;

    try {
        const messages = await prisma.mensagem.findMany({
            where: {
                remetenteId: Number(remetenteId)
            },
            select: {
                // id_mensagem: true,
                conteudo: true,
                // remetente: true,
                // destinatario: true,
                // remetenteId: true,
                destinatarioId: true,
                // conversa: true,
                conversaId: true,
            }
        });

        res.status(200).json(messages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar as mensagens.' });
    }
};

module.exports = {
    read,
    readDestinatario,
    readRemetente,
    readcON
}