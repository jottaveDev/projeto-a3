(async ()=> {
    
    const db=require('./dbCrud')
    
    //ATRIBUTOS OBRIGATÓRIOS PARA AS OPERAÇÕES DO CRUD
    const nome = "Chico"
    const senha= "123456"
    const id = 3


    //Chamada da função para inseir usuario, sem retorno
    //await db.insertUser({nome: nome, senha: senha})

    //Chamada da função para atualizar usuario, sem retorno 
    //await db.atualizaUser(id,{nome: nome, senha: senha})

    //Chamada da função para deletar usuario, sem retorno
    //await db.deletaUser(id)

    console.log('Select de todos os clientes')
    const usuarios = await db.receberUser() // Chamada de função para receber todos os usuarios
    console.log(usuarios)

})()    