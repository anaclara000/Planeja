const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
const fs = require('fs')

const create = async (req, res) => {
    try {
        const evento = await prisma.eventos.create({
            data: req.body
        });

        // res.status(200).json(evento).end();

        const path = require('path');
        const userId = evento.idUsuario;
        const userEvento = "evento " + evento.id_eventos;
        const uploadPath = path.join(__dirname, `../uploads/Eventos/`, userEvento.toString());
        console.log(userId)
        console.log(uploadPath)
        if (!fs.existsSync(uploadPath)) {
            try {
                fs.mkdirSync(uploadPath);
                res.status(200).json(evento).end();
            } catch (erro) {
                console.error(erro);
                res.status(500).json({ error: 'Erro aq' });
                return;
            }

        } else {
            res.status(200).json(evento).end();
        }
    }

    catch {
        console.error('Erro ao criar pasta de upload:', err);
        res.status(500).json({ error: 'Erro ao criar pasta de upload' });
        return;
    }

}

const createItems = async (req, res) => {
    let evento = await prisma.eventos.createMany({
        data: [
            {
                idProdutor: 1,
                tipo_evento: "Aniversário",
            },
        ],
        skipDuplicates: true, // Skip 'Bobo'

    });
    res.status(200).json(evento).end();

}

const read = async (req, res) => {
    let eventos = await prisma.eventos.findMany();

    res.status(200).json(eventos).end();
}


const readOne = async (req, res) => {
    let evento = await prisma.eventos.findUnique({
        where: {
            id_eventos: Number(req.params.id_eventos)
        },
        select: {
            id_eventos: true,
            idProdutor: true,
            produtor: true,
            lista: {
                select:
                {
                    nome: true,
                }
            },
            locacao: {
                select:
                {
                    tipo: true,
                    nome: true,
                    descricao: true,
                    telefone: true,
                    email: true,
                    valor: true,
                }
            },

            fornecedor: true,
        }
    });

    res.status(200).json(evento).end();
}

const update = async (req, res) => {
    const evento = await prisma.eventos.update({
        where: {
            id_eventos: Number(req.params.id_eventos)
        },
        data: req.body
    })

    res.status(200).json(evento).end();
}

const remove = async (req, res) => {
    const evento = await prisma.eventos.delete({
        where: {
            id_eventos: Number(req.params.id_eventos)
        }
    })

    res.status(200).json(evento).end();
}
const multer = require('multer');
const path = require('path');
// Configuração de armazenamento
const storage = multer.diskStorage({


    //Diretório de destino
    destination: function (req, file, cb) {
        const eventoId = req.params.id_eventos; // obtém o ID do usuário da URL da requisição
        const uploadPath = path.join(__dirname, `../uploads/Eventos/${"evento " + eventoId}`);
        cb(null, uploadPath);
        console.log(uploadPath)
    },
    //Nome do arquivo
    filename: function (req, file, cb) {
        cb(null, `${file.originalname}`)
    }
});
// Passa as configurações para gravar o arquivo
const parser = multer({ storage });
// Grava o arquivo no diretório de destino assincronamente ao receber a requisição
const enviarArquivo = async (req, res) => {
    parser.single('img')(req, res, err => {
        if (err)
            res.status(500).json({ error: 1, payload: err }).end();
        else {
            res.status(200).json(req.file.filename).end();
        }
    });
}

module.exports = {
    read,
    readOne,
    update,
    remove,
    createItems,
    create,
    enviarArquivo

}