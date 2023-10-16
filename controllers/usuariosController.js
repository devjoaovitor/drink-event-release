const registrarUsuario = (req, res) => {
    const { nome, email, senha, tipoUsuario } = req.body;
    // Implemente a lógica para salvar os dados do usuário no banco de dados
    // Por enquanto, vamos apenas responder com os dados recebidos
    res.json({ nome, email, senha, tipoUsuario });
  };
  
  module.exports = {
    registrarUsuario
  };