const bcrypt = require('bcrypt')
const { PrismaClient } = require('@prisma/client')
const jwt = require("jsonwebtoken")
const fs = require('fs')


const prisma = new PrismaClient()

const createItems = async (req, res) => {
  let usuario = await prisma.usuario.createMany({
    data: [
      {
        nome: "Jessica",
        email: "jessica@gmail.com",
        senha: "je",
        raz: "COCA COLA",
        nomeFantasia: "COCA",
        cnpj: "45997418000153",
        cpf: null,
        tipo: "Produtor",
        telefone: "(19) 992905-6789",
      },

    ],
    skipDuplicates: true, // Skip 'Bobo'

  });
  res.status(200).json(usuario).end();

}


const login = async (req, res) => {
  const usuario = await prisma.usuario.findFirstOrThrow({
    where: {
      email: req.body.email
    }
  }).then((value) => { return (value) })
    .catch((err) => { return { "erro": "Usuário não encontrado", "validation": false } })

  if (usuario.erro == null) {
    bcrypt.compare(req.body.senha, usuario.senha).then((value) => {
      if (value) {
        let data = { "uid": usuario.id, "role": usuario.tipo }
        jwt.sign(data, process.env.KEY, { expiresIn: '1m' }, function (err2, token) {
          console.log(err2)
          if (err2 == null) {
            res.status(200).json({ "token": token, "uid": usuario.id_usuario, "uname": usuario.nome, "validation": true }).end()
          } else {
            res.status(500).json(err2).end()
          }

        })
      } else {
        res.status(201).json({ "erro": "Senha inválida", "validation": false }).end()
      }
    })
  } else {
    res.status(404).json(usuario).end()
  }


}

const read = async (req, res) => {
  let usuarios = await prisma.usuario.findMany();

  res.status(200).json(usuarios).end();
}

const readOne = async (req, res) => {
  let usuario = await prisma.usuario.findUnique({
    where: {
      id_usuario: Number(req.params.id_usuario)
    },
    select: {
      nome: true,
      email: true,
      senha: true,
      raz: true,
      nomeFantasia: true,
      cnpj: true,
      cpf: true,
      tiposEventos: {
        select:
        {
          nome: true,
        }
      },
      servicosPrestados: {
        select:
        {
          nome: true,
        }
      },
      tipo: true,
      telefone: true,
      eventos: {
        select:
        {
          id_eventos: true,
        }
      },
    }
  });

  res.status(200).json(usuario).end();
}

const update = async (req, res) => {
  const usuario = await prisma.usuario.update({
    where: {
      id_usuario: Number(req.params.id_usuario)
    },
    data: req.body
  })

  res.status(200).json(usuario).end();
}

const remove = async (req, res) => {
  const usuario = await prisma.usuario.delete({
    where: {
      id_usuario: Number(req.params.id_usuario)
    }
  })

  res.status(200).json(usuario).end();
}

const verificarCNPJ = async (req, res) => {

  const axios = require('axios');

  // const cnpj = '45997418000153';
  const url = `https://www.receitaws.com.br/v1/cnpj/${req.body.cnpj}`;

  console.log(url);

  axios.get(url)
    .then(response => {
      res.status(200).json(response.data).end();
    })
    .catch(error => {
      console.error(error);
    });
}
const create = async (req, res) => {
  bcrypt.genSalt(10, function (err, salt) {
    if (err == null) {

      console.log("asadadadada" + req.body.senha);

      bcrypt.hash(req.body.senha, salt, async function (errCrypto, hash) {
        if (errCrypto == null) {
          req.body.senha = hash

          try {
            const usuario = await prisma.usuario.create({
              data: {
                nome: req.body.nome,
                email: req.body.email,
                senha: req.body.senha,
                raz: req.body.raz,
                nomeFantasia: req.body.nomeFantasia,
                cnpj: req.body.cnpj,
                cpf: req.body.cpf,
                tipo: req.body.tipo,
                telefone: req.body.telefone,
              },


            });
            const path = require('path');
            const userId = "user " + usuario.id_usuario;
            const uploadPath = path.join(__dirname, '../uploads/Usuarios', userId.toString());
            if (!fs.existsSync(uploadPath)) {
              try {
                fs.mkdirSync(uploadPath);
                res.status(200).json(usuario).end();
              } catch (erro) {
                console.error(erro);
                res.status(500).json({ error: 'Erro aq' });
                return;
              }

            } else {
              res.status(200).json(usuario).end();
            }

          } catch (err) {
            console.error('Erro ao criar pasta de upload:', err);
            res.status(500).json({ error: 'Erro ao criar pasta de upload' });
            return;
          }


          // res.status(200).json(usuario).end()
        } else {
          res.status(500).json(errCrypto).end()

          console.log(res.status(500).json(errCrypto).end());
        }
      });
    } else {
      res.status(500).json(err).end()
    }
  })




};

const multer = require('multer');
const path = require('path');

// Configuração de armazenamento
const storage = multer.diskStorage({


  //Diretório de destino
  destination: function (req, file, cb) {
    const usuarioId = req.params.id_usuario; // obtém o ID do usuário da URL da requisição
    const uploadPath = path.join(__dirname, `../uploads/Usuarios/${"user " + usuarioId}`);
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
  parser.array('img')(req, res, err => {
    if (err) {
      res.status(500).json({ error: 1, payload: err }).end();
    } else if (!req.files) {
      res.status(400).json({ error: 1, payload: 'Arquivos não enviados.' }).end();
    } else {
      const usuarioId = parseInt(req.params.id_usuario);
      const filenames = req.files.forEach(async (file) => {
        const caminhoImagem = `/uploads/Usuarios/${"user " + usuarioId}/${file.originalname}`;
        try {
          await prisma.usuario.update({
            where: { id_usuario: usuarioId },
            data: { caminhoImagem },
          });
        } catch (error) {
          console.error('Erro ao salvar o caminho da imagem:', error);
          res.status(500).json({ error: 1, payload: 'Erro ao salvar o caminho da imagem.' }).end();
        }
      });
      res.status(200).json(filenames).end();
    }
  });
}

module.exports = {
  create,
  read,
  login,
  verificarCNPJ,
  readOne,
  update,
  remove,
  createItems,
  enviarArquivo

}