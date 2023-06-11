const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()


const create = async (req, res) => {
    let servico = await prisma.servicos.create({
        data: req.body
    });

    res.status(200).json(servico).end();
}

const createItems = async (req, res) => {
    let servico = await prisma.servicos.createMany({
        data: [
            {
                nome: "Bufê",
                id_usuario: 1
            },
            {
                nome: "Locacoes",
                id_usuario: 1
            },
        ],
        skipDuplicates: true, // Skip 'Bobo'

    });
    res.status(200).json(servico).end();

}

const read = async (req, res) => {
    let servicos = await prisma.servicos.findMany();

    res.status(200).json(servicos).end();
}


const readOne = async (req, res) => {
    let servico = await prisma.servicos.findUnique({
        where: {
            id_servicos: Number(req.params.id_servicos)
        },
        select: {
            nome: true,
        }
    });

    res.status(200).json(servico).end();
}

const update = async (req, res) => {
    const servico = await prisma.servicos.update({
        where: {
            id_servicos: Number(req.params.id_servicos)
        },
        data: req.body
    })

    res.status(200).json(servico).end();
}

const remove = async (req, res) => {
    const servico = await prisma.servicos.delete({
        where: {
            id_servicos: Number(req.params.id_servicos)
        }
    })

    res.status(200).json(servico).end();
}

module.exports = {
    read,
    readOne,
    update,
    remove,
    createItems,
    create

}