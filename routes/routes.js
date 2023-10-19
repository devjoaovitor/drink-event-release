// const express = require('express');
// const router = express.Router();
// const { getClient } = require('../config/db');
// const auth = require('../auth/auth');
// const PDFDocument = require('pdfkit');
// const fs = require('fs');

// // router.post('/auth/login', async (req, res) => {
// //     const { email, senha } = req.body;
  
// //     try {
// //       const resultadoAutenticacao = await auth.autenticarUsuario(email, senha); 
  
// //       if (resultadoAutenticacao.autenticado) {
// //         res.status(200).json({ message: 'Autenticação bem-sucedida', usuario: resultadoAutenticacao.usuario });
// //       } else {
// //         res.status(401).json({ message: 'Credenciais inválidas' });
// //       }
// //     } catch (error) {
// //       console.error('Erro ao autenticar usuário:', error);
// //       res.status(500).json({ error: 'Erro ao autenticar usuário.' });
// //     }
// //   });

// //   router.get('/usuarios', async (req, res) => {
// //     const client = getClient();
    
// //     try {
// //       await client.connect();
// //       const result = await client.query('SELECT * FROM usuarios');
// //       res.status(200).json(result.rows);
// //     } catch (error) {
// //       console.error('Erro ao obter usuários:', error);
// //       res.status(500).json({ error: 'Erro ao obter usuários.' });
// //     } finally {
// //       await client.end();
// //     }
// //   });

//   router.get('/usuarios/:id', async (req, res) => {
//     const userId = req.params.id;
  
//     if (!userId) {
//       return res.status(400).json({ error: 'ID do usuário não fornecido.' });
//     }
  
//     const client = getClient();
  
//     try {
//       await client.connect();
//       const result = await client.query('SELECT * FROM usuarios WHERE id = $1', [userId]);
  
//       if (result.rows.length === 0) {
//         return res.status(404).json({ error: 'Usuário não encontrado.' });
//       }
  
//       res.status(200).json(result.rows[0]);
//     } catch (error) {
//       console.error('Erro ao obter usuário por ID:', error);
//       res.status(500).json({ error: 'Erro ao obter usuário por ID.' });
//     } finally {
//       await client.end();
//     }
//   });

//   router.put('/usuarios/:id', async (req, res) => {
//     const { id } = req.params;
//     const { nome, email, senha, permissao } = req.body;
  
//     const client = getClient();
  
//     try {
//       await client.connect();
//       const query = 'UPDATE usuarios SET nome = $1, email = $2, senha = $3, permissao = $4 WHERE id = $5';
//       const values = [nome, email, senha, permissao, id];
//       await client.query(query, values);
  
//       res.status(200).json({ message: 'Usuário atualizado com sucesso.' });
//     } catch (error) {
//       console.error('Erro ao atualizar usuário:', error);
//       res.status(500).json({ error: 'Erro ao atualizar usuário.' });
//     } finally {
//       await client.end();
//     }
//   });

//   router.delete('/usuarios/:id', async (req, res) => {
//     const { id } = req.params;
  
//     const client = getClient();
  
//     try {
//       await client.connect();
//       const query = 'DELETE FROM usuarios WHERE id = $1';
//       const values = [id];
//       await client.query(query, values);
  
//       res.status(200).json({ message: 'Usuário excluído com sucesso.' });
//     } catch (error) {
//       console.error('Erro ao excluir usuário:', error);
//       res.status(500).json({ error: 'Erro ao excluir usuário.' });
//     } finally {
//       await client.end();
//     }
//   });

// router.post('/usuarios', async (req, res) => {
//     console.log('Corpo da Requisição:', req.body); 
//     const { nome, email, senha, permissao } = req.body;

//     console.log('Dados recebidos:', { nome, email, senha, permissao });
    
//     const client = getClient();
    
//     try {
//       await client.connect();
//       const query = 'INSERT INTO usuarios (nome, email, senha, permissao) VALUES ($1, $2, $3, $4)';
//       const values = [nome, email, senha, permissao];
//       await client.query(query, values);
    
//       res.status(200).json({ message: 'Usuário cadastrado com sucesso.' });
//     } catch (error) {
//       console.error('Erro ao cadastrar usuário:', error);
//       res.status(500).json({ error: 'Erro ao cadastrar usuário.' });
//     } finally {
//       await client.end();
//     }    
// });

// router.put('/usuarios/alterar-senha/:id', async (req, res) => {
//   const userId = req.params.id;
//   const { novaSenha } = req.body;

//   if (!novaSenha) {
//     return res.status(400).json({ error: 'A nova senha é obrigatória.' });
//   }

//   const client = getClient();

//   try {
//     await client.connect();

//     const query = `
//       UPDATE usuarios
//       SET senha = $1
//       WHERE id = $2
//     `;

//     const values = [novaSenha, userId];
//     await client.query(query, values);

//     res.status(200).json({ message: 'Senha alterada com sucesso.' });
//   } catch (error) {
//     console.error('Erro ao alterar a senha:', error);
//     res.status(500).json({ error: 'Erro ao alterar a senha.' });
//   } finally {
//     await client.end();
//   }
// });

// router.post('/bebidas', async (req, res) => {
//   console.log('Corpo da Requisição:', req.body); 
//   const { quantidadeBebida, teorAlcoolico, valorUnitario, descricao, tipoBebida, nomeBebida } = req.body;

//   console.log('Dados recebidos:', { quantidadeBebida, teorAlcoolico, valorUnitario, descricao, tipoBebida, nomeBebida });
  
//   const client = getClient();
  
//   try {
//     await client.connect();
//     const query = 'INSERT INTO bebidas (quantidadeBebida, teorAlcoolico, valorUnitario, descricao, tipoBebida, nomeBebida) VALUES ($1, $2, $3, $4, $5, $6)';
//     const values = [quantidadeBebida, teorAlcoolico, valorUnitario, descricao, tipoBebida, nomeBebida];
//     await client.query(query, values);
  
//     res.status(200).json({ message: 'Bebida registrada com sucesso.' });
//   } catch (error) {
//     console.error('Erro ao registrar a bebida:', error);
//     res.status(500).json({ error: 'Erro ao registrar a bebida.' });
//   } finally {
//     await client.end();
//   }    
// });

// router.put('/bebidas/:id', async (req, res) => {
//   const { quantidadeBebida, teorAlcoolico, valorUnitario, descricao, tipoBebida, nomeBebida } = req.body;
//   const bebidaId = req.params.id;

//   const client = getClient();

//   try {
//     await client.connect();
//     const query = `
//       UPDATE bebidas
//       SET quantidadeBebida = $1, teorAlcoolico = $2, valorUnitario = $3, descricao = $4, tipoBebida = $5, nomeBebida = $6
//       WHERE id = $7
//     `;
//     const values = [quantidadeBebida, teorAlcoolico, valorUnitario, descricao, tipoBebida, nomeBebida, bebidaId];
//     await client.query(query, values);

//     res.status(200).json({ message: 'Bebida atualizada com sucesso.' });
//   } catch (error) {
//     console.error('Erro ao atualizar a bebida:', error);
//     res.status(500).json({ error: 'Erro ao atualizar a bebida.' });
//   } finally {
//     await client.end();
//   }
// });

// router.get('/bebidas/:id', async (req, res) => {
//   const { id } = req.params;
//   const client = getClient();

//   try {
//     await client.connect();
//     const query = 'SELECT * FROM bebidas WHERE id = $1';
//     const result = await client.query(query, [id]);

//     if (result.rows.length === 0) {
//       res.status(404).json({ message: 'Bebida não encontrada.' });
//     } else {
//       res.status(200).json(result.rows[0]);
//     }
//   } catch (error) {
//     console.error('Erro ao obter bebida:', error);
//     res.status(500).json({ error: 'Erro ao obter bebida.' });
//   } finally {
//     await client.end();
//   }
// });


// router.get('/bebidas', async (req, res) => {
//   const client = getClient();

//   try {
//     await client.connect();
//     const result = await client.query('SELECT * FROM bebidas');
//     res.status(200).json(result.rows);
//   } catch (error) {
//     console.error('Erro ao obter bebidas:', error);
//     res.status(500).json({ error: 'Erro ao obter bebidas.' });
//   } finally {
//     await client.end();
//   }
// });

// router.get('/bebida/relatorio', async (req, res) => {
//   const client = getClient();

//   try {
//     await client.connect();
//     const result = await client.query('SELECT * FROM bebidas');
//     const bebidas = result.rows;

//     const doc = new PDFDocument();
//     const stream = doc.pipe(fs.createWriteStream('relatorio_bebidas.pdf'));

//     doc.fontSize(14).text('Relatório de Bebidas\n\n');
//     bebidas.forEach((bebida, index) => {
//       doc.fontSize(12).text(`Bebida ${index + 1}:`);
//       doc.fontSize(10).text(`Nome: ${bebida.nomebebida}`);
//       doc.fontSize(10).text(`Quantidade: ${bebida.quantidadebebida}`);
//       doc.fontSize(10).text(`Descrição: ${bebida.descricao}\n\n`);
//     });

//     doc.end();

//     stream.on('finish', () => {
//       res.download('relatorio_bebidas.pdf');
//     });
//   } catch (error) {
//     console.error('Erro ao obter bebidas:', error);
//     res.status(500).json({ error: 'Erro ao obter bebidas.' });
//   } finally {
//     await client.end();
//   }
// });

// router.get('/vendas/relatorio', async (req, res) => {
//   const client = getClient();

//   try {
//     await client.connect();
//     const result = await client.query('SELECT * FROM vendas');
//     const vendas = result.rows;

//     const doc = new PDFDocument();
//     const stream = doc.pipe(fs.createWriteStream('relatorio_vendas.pdf'));

//     doc.fontSize(14).text('Relatório de Vendas\n\n');
//     vendas.forEach((venda, index) => {
//       doc.fontSize(12).text(`Venda ${index + 1}:`);
//       doc.fontSize(10).text(`Bebida: ${venda.bebida}`);
//       doc.fontSize(10).text(`Quantidade: ${venda.quantidade}`);
//       doc.fontSize(10).text(`Forma de Pagamento: ${venda.formapagamento}`);
//       doc.moveDown();
//     });

//     doc.end();

//     stream.on('finish', () => {
//       res.download('relatorio_vendas.pdf');
//     });
//   } catch (error) {
//     console.error('Erro ao obter vendas:', error);
//     res.status(500).json({ error: 'Erro ao obter vendas.' });
//   } finally {
//     await client.end();
//   }
// });

// router.delete('/bebidas/:id', async (req, res) => {
//   const { id } = req.params;
//   const client = getClient();

//   try {
//     await client.connect();
//     const query = 'DELETE FROM bebidas WHERE id = $1';
//     const values = [id];
//     await client.query(query, values);
//     res.status(200).json({ message: 'Bebida excluída com sucesso.' });
//   } catch (error) {
//     console.error('Erro ao excluir a bebida:', error);
//     res.status(500).json({ error: 'Erro ao excluir a bebida.' });
//   } finally {
//     await client.end();
//   }
// });

// router.post('/vendas', async (req, res) => {
//   const { bebida, quantidade, formaPagamento, valorVenda } = req.body;

//   const client = getClient();

//   try {
//     await client.connect();

//     const queryInsertVenda = 'INSERT INTO vendas (bebida, quantidade, formaPagamento, valorVenda) VALUES ($1, $2, $3, $4) RETURNING *';
//     const valuesInsertVenda = [bebida, quantidade, formaPagamento, valorVenda];
//     const resultVenda = await client.query(queryInsertVenda, valuesInsertVenda);

//     const queryUpdateBebidas = 'UPDATE bebidas SET quantidadeBebida = quantidadeBebida - $1 WHERE nomeBebida = $2';
//     const valuesUpdateBebidas = [quantidade, bebida];
//     await client.query(queryUpdateBebidas, valuesUpdateBebidas);

//     res.status(200).json({ message: 'Venda registrada com sucesso.', venda: resultVenda.rows[0] });
//   } catch (error) {
//     console.error('Erro ao registrar a venda:', error);
//     res.status(500).json({ error: 'Erro ao registrar a venda.' });
//   } finally {
//     await client.end();
//   }    
// });

// router.get('/vendas', async (req, res) => {
//   const client = getClient();

//   try {
//     await client.connect();

//     const query = 'SELECT * FROM vendas';
//     const result = await client.query(query);

//     res.status(200).json(result.rows);
//   } catch (error) {
//     console.error('Erro ao obter vendas:', error);
//     res.status(500).json({ error: 'Erro ao obter vendas.' });
//   } finally {
//     await client.end();
//   }
// });


// router.post('/eventos', async (req, res) => {
//   const { nomeEvento, dataEvento, localEvento, bebidas } = req.body;

//   if (!nomeEvento || !dataEvento || !localEvento || !bebidas) {
//     return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
//   }

//   const client = getClient();

//   try {
//     await client.connect();

//     await client.query('BEGIN');

//     const queryEvento = `
//       INSERT INTO eventos (nomeEvento, dataEvento, localEvento, bebidas)
//       VALUES ($1, $2, $3, $4)
//       RETURNING id`;

//     const valuesEvento = [nomeEvento, dataEvento, localEvento, JSON.stringify(bebidas)];

//     const resultEvento = await client.query(queryEvento, valuesEvento);

//     const eventoId = resultEvento.rows[0].id;

//     for (const bebida of bebidas) {
//       const { nome, quantidade } = bebida;

//       const queryUpdateBebidas = `
//         UPDATE bebidas
//         SET quantidadeBebida = quantidadeBebida - $1
//         WHERE nomeBebida = $2`;

//       const valuesUpdateBebidas = [quantidade, nome];

//       await client.query(queryUpdateBebidas, valuesUpdateBebidas);
//     }

//     await client.query('COMMIT');

//     res.status(200).json({ message: 'Evento adicionado com sucesso.', eventoId });
//   } catch (error) {
//     await client.query('ROLLBACK');
//     console.error('Erro ao adicionar evento:', error);
//     res.status(500).json({ error: 'Erro ao adicionar evento.' });
//   } finally {
//     await client.end();
//   }
// });

// router.put('/eventos/:id', async (req, res) => {
//   const eventId = req.params.id;
//   const { nomeevento, dataevento, localevento } = req.body;

//   if (!nomeevento || !dataevento || !localevento) {
//     return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
//   }

//   const client = getClient();

//   try {
//     await client.connect();

//     const query = `
//       UPDATE eventos
//       SET nomeevento = $1, dataevento = $2, localevento = $3
//       WHERE id = $4
//     `;

//     const values = [nomeevento, dataevento, localevento, eventId];
//     await client.query(query, values);

//     res.status(200).json({ message: 'Evento atualizado com sucesso.' });
//   } catch (error) {
//     console.error('Erro ao atualizar o evento:', error);
//     res.status(500).json({ error: 'Erro ao atualizar o evento.' });
//   } finally {
//     await client.end();
//   }
// });


// router.get('/eventos', async (req, res) => {
//   const client = getClient();  

//   try {
//     await client.connect();
//     const result = await client.query('SELECT * FROM eventos');
//     const eventos = result.rows;
//     res.json(eventos);
//   } catch (error) {
//     console.error('Erro ao obter eventos:', error);
//     res.status(500).json({ error: 'Erro ao obter eventos.' });
//   } finally {
//     await client.end();
//   }
// });

// router.get('/eventos/relatorio', async (req, res) => {
//   const client = getClient();  

//   try {
//     await client.connect();
//     const result = await client.query('SELECT * FROM eventos');
//     const eventos = result.rows;

//     const doc = new PDFDocument();
//     const stream = doc.pipe(fs.createWriteStream('relatorio_eventos.pdf'));

//     doc.fontSize(14).text('Relatório de Eventos\n\n');
//     eventos.forEach((evento, index) => {
//       doc.fontSize(12).text(`Evento ${index + 1}:`);
//       doc.fontSize(10).text(`Nome: ${evento.nomeevento}`);
//       doc.fontSize(10).text(`Data: ${evento.dataevento}`);
//       doc.fontSize(10).text(`Local: ${evento.localevento}\n\n`);
//     });

//     doc.end();

//     stream.on('finish', () => {
//       res.download('relatorio_eventos.pdf');
//     });
//   } catch (error) {
//     console.error('Erro ao obter eventos:', error);
//     res.status(500).json({ error: 'Erro ao obter eventos.' });
//   } finally {
//     await client.end();
//   }
// });

// router.get('/eventos/:id', async (req, res) => {
//   const eventId = req.params.id;

//   const client = getClient();

//   try {
//     await client.connect();

//     const query = 'SELECT * FROM eventos WHERE id = $1';
//     const values = [eventId];

//     const result = await client.query(query, values);

//     if (result.rows.length === 0) {
//       return res.status(404).json({ error: 'Evento não encontrado.' });
//     }

//     res.json(result.rows[0]);
//   } catch (error) {
//     console.error('Erro ao obter evento por ID:', error);
//     res.status(500).json({ error: 'Erro ao obter evento por ID.' });
//   } finally {
//     await client.end();
//   }
// });

// module.exports = router;