const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()


const create = async (req, res) => {
    let convidados = await prisma.listaConvidados.create({
        data: req.body
    });

    res.status(200).json(convidados).end();
}

const createItems = async (req, res) => {
    let convidados = await prisma.listaConvidados.createMany({
        data: [
            {
                nome: "Bufê",
                telefone: "(19) 4343-3543",
                idEvento: 1
            },
            {
                nome: "Locacoes",
                telefone: "(19) 4343-3543",
                idEvento: 1
            },
            {
                nome: "Locacoes",
                telefone: "(19) 4343-3543",
                idEvento: 1
            },
        ],
        skipDuplicates: true, // Skip 'Bobo'

    });
    res.status(200).json(convidados).end();

}

const read = async (req, res) => {
    let listaConvidados = await prisma.listaConvidados.findMany();

    res.status(200).json(listaConvidados).end();
}


const readOne = async (req, res) => {
    let convidados = await prisma.listaConvidados.findUnique({
        where: {
            id_convidado: Number(req.params.id_convidado)
        },
        select: {
            nome: true,
            telefone: true,
            idEvento: true,
        }
    });

    res.status(200).json(convidados).end();
}

const readEvent = async (req, res) => {
    let convidados = await prisma.listaConvidados.findUnique({
        where: {
            idEvento: Number(req.params.idEvento)
        },
        select: {
            id_convidado: true,
            nome: true,
            telefone: true,
        }
    });

    res.status(200).json(convidados).end();
}

const update = async (req, res) => {
    const convidados = await prisma.listaConvidados.update({
        where: {
            id_convidado: Number(req.params.id_convidado)
        },
        data: req.body
    })

    res.status(200).json(convidados).end();
}

const remove = async (req, res) => {
    const convidados = await prisma.listaConvidados.delete({
        where: {
            id_convidado: Number(req.params.id_convidado)
        }
    })

    res.status(200).json(convidados).end();
}

module.exports = {
    read,
    readOne,
    readEvent,
    update,
    remove,
    createItems,
    create

}