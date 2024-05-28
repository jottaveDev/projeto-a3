(async ()=> {
    
    const db=require('./dbCrud')
    
    //ATRIBUTOS OBRIGATÓRIOS PARA AS OPERAÇÕES DO CRUD
    const nome = "Chico"
    const senha= "123456"
    const id = 3
    const txtTask = 'fazendo teste'

    //Chamada da função para inseir usuario, sem retorno
    //await db.insertUser({nome: nome, senha: senha})

    //Chamada da função para atualizar usuario, sem retorno 
    //await db.atualizaUser(id,{nome: nome, senha: senha})

    //Chamada da função para deletar usuario, sem retorno
    //await db.deletaUser(id)
    //await db.atualizaTaskUser({txt:txtTask,id:3}) 
    // console.log('Select de todas as tarefas do usuario')
    // const task = await db.receberTaskUser({id:2})
    // console.log(task)

    console.log('Select de todos os clientes')
    const usuarios = await db.receberUser() // Chamada de função para receber todos os usuarios
    console.log(usuarios)

})()    