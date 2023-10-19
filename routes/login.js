const express = require('express');
const router = express.Router();
const { getClient } = require('../config/db');
const auth = require('../auth/auth');
const PDFDocument = require('pdfkit');
const fs = require('fs');

router.post('/auth/login', async (req, res) => {
    const { email, senha } = req.body;
  
    try {
      const resultadoAutenticacao = await auth.autenticarUsuario(email, senha); 
  
      if (resultadoAutenticacao.autenticado) {
        res.status(200).json({ message: 'Autenticação bem-sucedida', usuario: resultadoAutenticacao.usuario });
      } else {
        res.status(401).json({ message: 'Credenciais inválidas' });
      }
    } catch (error) {
      console.error('Erro ao autenticar usuário:', error);
      res.status(500).json({ error: 'Erro ao autenticar usuário.' });
    }
  });

module.exports = router;