const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()


const create = async (req, res) => {
    let tipo = await prisma.tiposEventos.create({
        data: req.body
    });

    res.status(200).json(tipo).end();
}

const createItems = async (req, res) => {
    let tipo = await prisma.tiposEventos.createMany({
        data: [
            {
                nome: "Aniversário",
                id_usuario: 1
            },
            {
                nome: "Casamento",
                id_usuario: 1
            },
            {
                nome: "Formatura",
                id_usuario: 1
            },
            {
                nome: "Chá de bebê",
                id_usuario: 1
            },
        ],
        skipDuplicates: true, // Skip 'Bobo'

    });
    res.status(200).json(tipo).end();

}

const read = async (req, res) => {
    let tipos = await prisma.tiposEventos.findMany();

    res.status(200).json(tipos).end();
}


const readOne = async (req, res) => {
    let tipo = await prisma.tiposEventos.findUnique({
        where: {
            id_tiposEvento: Number(req.params.id_tiposEvento)
        },
        select: {
            nome: true,
            id_usuario: true,
        }
    });

    res.status(200).json(tipo).end();
}

const update = async (req, res) => {
    const tipo = await prisma.tiposEventos.update({
        where: {
            id_tiposEvento: Number(req.params.id_tiposEvento)
        },
        data: req.body
    })

    res.status(200).json(tipo).end();
}

const remove = async (req, res) => {
    const tipo = await prisma.tiposEventos.delete({
        where: {
            id_tiposEvento: Number(req.params.id_tiposEvento)
        }
    })

    res.status(200).json(tipo).end();
}

module.exports = {
    read,
    readOne,
    update,
    remove,
    createItems,
    create

}