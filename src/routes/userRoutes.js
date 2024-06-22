const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // Verifique se o caminho está correto

// Exemplo de rota POST para criar um usuário
router.post('/register', userController.createUser);

// Outras rotas para atualizar, listar, editar e excluir usuários
router.get('/', userController.listUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
