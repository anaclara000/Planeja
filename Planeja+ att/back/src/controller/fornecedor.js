const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()


const create = async (req, res) => {
    let fronecedores = await prisma.fornecedor.create({
        data: req.body
    });

    res.status(200).json(fronecedores).end();
}

const createItems = async (req, res) => {
    let fronecedores = await prisma.fornecedor.createMany({
        data: [
            {
                nome: "Carol Coxinhas",
                descricao: "200u de coxinha e 100u bolinha de queijo",
                tipo: "Salgado",
                telefone: "(19) 34532-4454",
                valor: 200.00,
                idEvento: 1,
            },

        ],
        skipDuplicates: true, // Skip 'Bobo'

    });
    res.status(200).json(fronecedores).end();

}

const read = async (req, res) => {
    let fronecedoress = await prisma.fornecedor.findMany();

    res.status(200).json(fronecedoress).end();
}


const readOne = async (req, res) => {
    let fronecedores = await prisma.fornecedor.findUnique({
        where: {
            id_fornecedor: Number(req.params.id_fornecedor)
        },
        select: {
            nome: true,
            descricao: true,
            tipo: true,
            telefone: true,
            valor: true,
            idEvento: true,
        }
    });

    res.status(200).json(fronecedores).end();
}

const update = async (req, res) => {
    const fronecedores = await prisma.fornecedor.update({
        where: {
            id_fornecedor: Number(req.params.id_fornecedor)
        },
        data: req.body
    })

    res.status(200).json(fronecedores).end();
}

const remove = async (req, res) => {
    const fronecedores = await prisma.fornecedor.delete({
        where: {
            id_fornecedor: Number(req.params.id_fornecedor)
        }
    })

    res.status(200).json(fronecedores).end();
}

module.exports = {
    read,
    readOne,
    update,
    remove,
    createItems,
    create

}