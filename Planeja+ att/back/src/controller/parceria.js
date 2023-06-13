const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const create = async (req, res) => {
    let parcerias = await prisma.parcerias.create({
        data: req.body
    });

    res.status(200).json(parcerias).end();
}

const read = async (req, res) => {
    let parcerias = await prisma.parcerias.findMany();

    res.status(200).json(parcerias).end();
}

const update = async (req, res) => {
    const parcerias = await prisma.parcerias.update({
        where: {
            id_parceria: Number(req.params.id_parceria)
        },
        data: req.body
    })

    res.status(200).json(parcerias).end();
}

module.exports = {
    read,
    update,
    create

}