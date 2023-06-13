-- CreateTable
CREATE TABLE `Usuario` (
    `id_usuario` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,
    `raz` VARCHAR(191) NULL,
    `nomeFantasia` VARCHAR(191) NULL,
    `cnpj` VARCHAR(191) NULL,
    `cpf` VARCHAR(191) NULL,
    `tipo` VARCHAR(191) NOT NULL,
    `telefone` VARCHAR(191) NOT NULL,
    `caminhoImagem` VARCHAR(191) NULL,

    UNIQUE INDEX `Usuario_email_key`(`email`),
    UNIQUE INDEX `Usuario_cnpj_key`(`cnpj`),
    PRIMARY KEY (`id_usuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Conversa` (
    `id_conversa` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`id_conversa`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Mensagem` (
    `id_mensagem` INTEGER NOT NULL AUTO_INCREMENT,
    `conteudo` VARCHAR(191) NOT NULL,
    `remetenteId` INTEGER NOT NULL,
    `destinatarioId` INTEGER NOT NULL,
    `conversaId` INTEGER NOT NULL,

    PRIMARY KEY (`id_mensagem`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Parcerias` (
    `id_parceria` INTEGER NOT NULL AUTO_INCREMENT,
    `idProdutor` VARCHAR(191) NOT NULL,
    `idCliente` INTEGER NOT NULL,
    `tipoEvento` VARCHAR(191) NOT NULL,
    `data_evento` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_parceria`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tiposEventos` (
    `id_tiposEvento` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `id_usuario` INTEGER NOT NULL,

    PRIMARY KEY (`id_tiposEvento`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `servicos` (
    `id_servicos` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `id_usuario` INTEGER NOT NULL,

    PRIMARY KEY (`id_servicos`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Eventos` (
    `id_eventos` INTEGER NOT NULL AUTO_INCREMENT,
    `idUsuario` INTEGER NOT NULL,
    `cnpjProdutor` VARCHAR(191) NULL,
    `tipo_evento` VARCHAR(191) NULL,
    `descricao` VARCHAR(191) NULL,
    `nome_evento` VARCHAR(191) NULL,
    `endereco_evento` VARCHAR(191) NULL,
    `data_hora_inicio` VARCHAR(191) NULL,
    `data_hora_fim` VARCHAR(191) NULL,
    `status` VARCHAR(191) NULL,
    `codigo` VARCHAR(191) NULL,

    PRIMARY KEY (`id_eventos`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `listaConvidados` (
    `id_convidado` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `telefone` VARCHAR(191) NOT NULL,
    `idEvento` INTEGER NOT NULL,

    PRIMARY KEY (`id_convidado`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Locacoes` (
    `id_locacoes` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `endereco` VARCHAR(191) NULL,
    `descricao` VARCHAR(191) NULL,
    `idUsuario` INTEGER NOT NULL,
    `status` BOOLEAN NOT NULL,

    PRIMARY KEY (`id_locacoes`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Fornecedor` (
    `id_fornecedor` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(191) NULL,
    `tipo` VARCHAR(191) NOT NULL,
    `telefone` VARCHAR(191) NOT NULL,
    `valor` DOUBLE NOT NULL,
    `idEvento` INTEGER NOT NULL,

    PRIMARY KEY (`id_fornecedor`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LocacoesEvento` (
    `id_locacoesEvento` INTEGER NOT NULL AUTO_INCREMENT,
    `id_locacoes` INTEGER NOT NULL,
    `tipo` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `endereco` VARCHAR(191) NULL,
    `descricao` VARCHAR(191) NULL,
    `telefone` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `valor` DOUBLE NOT NULL,
    `idEvento` INTEGER NOT NULL,
    `status` BOOLEAN NOT NULL,

    PRIMARY KEY (`id_locacoesEvento`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_participantes` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_participantes_AB_unique`(`A`, `B`),
    INDEX `_participantes_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Mensagem` ADD CONSTRAINT `Mensagem_remetenteId_fkey` FOREIGN KEY (`remetenteId`) REFERENCES `Usuario`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mensagem` ADD CONSTRAINT `Mensagem_destinatarioId_fkey` FOREIGN KEY (`destinatarioId`) REFERENCES `Usuario`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mensagem` ADD CONSTRAINT `Mensagem_conversaId_fkey` FOREIGN KEY (`conversaId`) REFERENCES `Conversa`(`id_conversa`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Parcerias` ADD CONSTRAINT `Parcerias_idCliente_fkey` FOREIGN KEY (`idCliente`) REFERENCES `Usuario`(`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tiposEventos` ADD CONSTRAINT `tiposEventos_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `Usuario`(`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `servicos` ADD CONSTRAINT `servicos_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `Usuario`(`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Eventos` ADD CONSTRAINT `Eventos_idUsuario_fkey` FOREIGN KEY (`idUsuario`) REFERENCES `Usuario`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `listaConvidados` ADD CONSTRAINT `listaConvidados_idEvento_fkey` FOREIGN KEY (`idEvento`) REFERENCES `Eventos`(`id_eventos`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Locacoes` ADD CONSTRAINT `Locacoes_idUsuario_fkey` FOREIGN KEY (`idUsuario`) REFERENCES `Usuario`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Fornecedor` ADD CONSTRAINT `Fornecedor_idEvento_fkey` FOREIGN KEY (`idEvento`) REFERENCES `Eventos`(`id_eventos`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LocacoesEvento` ADD CONSTRAINT `LocacoesEvento_idEvento_fkey` FOREIGN KEY (`idEvento`) REFERENCES `Eventos`(`id_eventos`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_participantes` ADD CONSTRAINT `_participantes_A_fkey` FOREIGN KEY (`A`) REFERENCES `Conversa`(`id_conversa`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_participantes` ADD CONSTRAINT `_participantes_B_fkey` FOREIGN KEY (`B`) REFERENCES `Usuario`(`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;
