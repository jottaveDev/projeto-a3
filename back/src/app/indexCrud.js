(async ()=> {
    
    const db=require('./dbCrud')
    
    //ATRIBUTOS OBRIGATÓRIOS PARA AS OPERAÇÕES DO CRUD
    const nome = "Chico"
    const senha= "123456"
    const idUser = 3    
    const txtTask = 'fazendo teste'
    const idTask = 1

    //Chamada da função para inseir usuario, sem retorno
    //await db.insertUser({nome: nome, senha: senha})

    //Chamada da função para inseir tarefas no usuario, sem retorno
    //await db.insertTaskUser('teste para inserir tarefa',2)

    //Chamada da função para atualizar usuario, sem retorno 
    //await db.atualizaUser(id,{nome: nome, senha: senha})

    //Chamada da função para deletar usuario, sem retorno
    //await db.deletaUser(id)
    //await db.atualizaTaskUser({txt:txtTask,id:3}) 

    //Chamada da função para selecionar tarefas do usuario
    // console.log('Select de todas as tarefas do usuario')
    // const task = await db.receberTaskUser({id:2})
    // console.log(task)

    console.log('Select de todos os usuarios')
    const usuarios = await db.receberUser() // Chamada de função para receber todos os usuarios
    console.log(usuarios)

})()    