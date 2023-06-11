const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()


const create = async (req, res) => {
    let locacao = await prisma.locacoes.create({
        data: req.body
    });

    res.status(200).json(locacao).end();
}

const createItems = async (req, res) => {
    let locacao = await prisma.locacoes.createMany({
        data: [
            {
                tipo: "DJ",
                nome: "Marcos Andrade",
                descricao: "-",
                telefone: "(19) 83294-2978 ",
                email: "marcos@gmail.com",
                valor: 200.00,
                idEvento: 1,
            },

        ],
        skipDuplicates: true, // Skip 'Bobo'

    });
    res.status(200).json(locacao).end();

}

const read = async (req, res) => {
    let locacaos = await prisma.locacoes.findMany();

    res.status(200).json(locacaos).end();
}


const readOne = async (req, res) => {
    let locacao = await prisma.locacoes.findUnique({
        where: {
            id_locacoes: Number(req.params.id_locacoes)
        },
        select: {
            tipo: true,
            nome: true,
            endereco: true,
            descricao: true,
            telefone: true,
            email: true,
            valor: true,
            idEvento: true,
        }
    });

    res.status(200).json(locacao).end();
}

const update = async (req, res) => {
    const locacao = await prisma.locacoes.update({
        where: {
            id_locacoes: Number(req.params.id_locacoes)
        },
        data: req.body
    })

    res.status(200).json(locacao).end();
}

const remove = async (req, res) => {
    const locacao = await prisma.locacoes.delete({
        where: {
            id_locacoes: Number(req.params.id_locacoes)
        }
    })

    res.status(200).json(locacao).end();
}

module.exports = {
    read,
    readOne,
    update,
    remove,
    createItems,
    create

}