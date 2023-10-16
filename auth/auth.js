const { getClient } = require('../config/db');

async function autenticarUsuario(email, senha) {
  console.log('Email recebido:', email);
  console.log('Senha recebida:', senha);

  const client = getClient();

  try {
    await client.connect();
    const query = 'SELECT * FROM usuarios WHERE email = $1 AND senha = $2';
    const usuario = await client.query(query, [email, senha]);

    if (usuario.rows.length > 0) {
      console.log('Usuário autenticado:', usuario.rows[0]);
      return { autenticado: true, mensagem: 'Usuário autenticado com sucesso.', usuario: usuario.rows[0] };
    } else {
      console.log('Credenciais inválidas.');
      return { autenticado: false, mensagem: 'Credenciais inválidas' };
    }
  } catch (error) {
    console.error('Erro ao autenticar usuário:', error);
    return { autenticado: false, mensagem: 'Erro ao autenticar usuário.' };
  } finally {
    await client.end();
  }
}

module.exports = { autenticarUsuario };