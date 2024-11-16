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

async function mostraUsuario(usuario) {
    let conn = await conecta()
    let sql = "select usuario from usuarios where usuario = ?"
    let resposta = await conexao.query(sql, [usuario]);
    //console.log(resposta);
	//o retorno tem 2 arrays (um dentro do outro). Queremos o primeiro deles.
    return resposta[0];
}

async function insereUsuario(usuario, senha){
    let conn = await conecta()
    let sql = "insert into usuarios(usuario, senha) values(?,?)"
    return await conn.query(sql, [usuario, senha])
}

async function deletaUsuario(id) {
    let conn = await conecta()
    let sql = "delete from usuarios where id = ?"
    return await conn.query(sql, [id])
}

module.exports = {insereUsuario, deletaUsuario, mostraUsuario}