const bd = require("mysql2/promise")

async function conecta() {
    const conexao = await bd.createConnection({
        host: "localhost",
        port: 3306,
        database: "receitas",
        user:"root",
        password:"Nhonhoemartemi6!"
    })
    return conexao
}

//usuarios
async function mostraUsuario(usuario){
    let conn = await conecta()
    let sql = "select usuario from usuarios where usuario = ?"
    let resposta = await conn.query(sql, [usuario])
    console.log(resposta[0][0]);
  //o retorno tem 2 arrays (um dentro do outro). Queremos o primeiro deles.
    return resposta[0][0]
}

async function mostraUsuarioSenha(usuario){
    let conn = await conecta()
    let sql = "select senha from usuarios where usuario = ?"
    let resposta = await conn.query(sql, [usuario])
    console.log(resposta[0][0].senha)
    return resposta[0][0].senha
}

async function insereUsuario(usuario, senha){
    let conn = await conecta()
    let sql = "insert into usuarios(usuario, senha) values(?,?)"
    let resp = await conn.query(sql, [usuario, senha])
    console.log(resp[0].affectedRows)
    return resp[0].affectedRows
    /* 
    retorno:
    [
        ResultSetHeader {
            fieldCount: 0,
            affectedRows: 1,
            insertId: 3,
            info: '',
            serverStatus: 2,
            warningStatus: 0,
            changedRows: 0
        },
         undefined
    ]
    */
}

async function deletaUsuario(id) {
    let conn = await conecta()
    let sql = "delete from usuarios where id = ?"
    let resp = await conn.query(sql, [id])
    console.log(resp)
    return resp[0].affectedRows
}

async function alterarSenha(usuario, senha) {
    let conn = await conecta()
    let sql = "update usuarios set senha = ? where usuario = ?"
    let resp = await conn.query(sql, [senha, usuario])
    console.log(resp)
    return resp[0].affectedRows
}

//ingredientes
async function mostrarIngredientes() {
    let conn = await conecta()
    let sql = "select * from ingredientes"
    let resp = await conn.query(sql)
    console.log(resp[0])
    return resp[0]
}

module.exports = {insereUsuario, deletaUsuario, mostraUsuario, mostraUsuarioSenha, alterarSenha, mostrarIngredientes}