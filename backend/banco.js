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

//receitas
async function mostrarReceitas() {
    let conn = await conecta()
    let sql = "select * from receitas"
    let resp = await conn.query(sql)
    
    return resp[0]
}

async function mostrarReceitasPorUsuario(id) {
    let conn = await conecta()
    let sql = "select * from receitas where id_usuario = ?"
    let resp = await conn.query(sql, [id])
    console.log(resp[0])
    return resp[0]
}

async function inserirReceita(receita) {
    let conn = await conecta()
    let sql = "insert into receitas(id_usuario, nome, categoria, modo_preparo, tempo) values (?, ?, ?, ?, ?)"
    let resp = await conn.query(sql, [receita.id_usuario, receita.nome, receita.categoria, receita.modo_preparo, receita.tempo])
    console.log(resp[0])
    return resp[0]
}

async function deletarReceita(id) {
    let conn = await conecta()
    let sql = "delete from receitas where id = ?"
    let resp = await conn.query(sql, [id])
    console.log(resp[0])
    return resp[0].affectedRows
}

async function atualizarReceita(receita, id) {
    let conn = await conecta()
    let sql = "update receitas set modo_preparo = ?, tempo = ? where id = ?"
    let resp = await conn.query(sql, [receita.modo_preparo, receita.tempo, id])
    console.log(resp[0])
    return resp[0].affectedRows
}

async function atualizaLikes(id, likes){
    let conn = await conecta()
    let sql = "update receitas set likes = ? where id = ?"
    let resp = await conn.query(sql, [likes, id])
    console.log(resp[0])
    return resp[0].affectedRows
}

async function atualizaDislikes(id, dislikes){
    let conn = await conecta()
    let sql = "update receitas set dislikes = ? where id = ?"
    let resp = await conn.query(sql, [dislikes, id])
    console.log(resp[0])
    return resp[0].affectedRows
}

//receita_ingredientes
async function mostraReceitaIngredientes(){
    let conn = await conecta()
    let sql = "select * from receita_ingredientes"
    let resp = await conn.query(sql)
    console.log(resp[0])
    return resp[0]
}

async function mostraIngredientesPorReceita(id_receita) {
    let conn = await conecta()
    let sql = " select * from ingredientes where id = (select id_ingredientes from receita_ingredientes where id_receitas = ?)"
    let resp = await conn.query(sql, [id_receita])
    console.log(resp[0])
    return resp[0]
}

async function insereReceitaIngrediente(resIng){
    let conn = await conecta()
    let sql = "insert into receita_ingredientes(id_receitas, id_ingredientes, quantidade, unidade) values(?,?,?,?)"
    let resp = await conn.query(sql, [resIng.id_receitas, resIng.id_ingredientes, resIng.quantidade, resIng.unidade])
    console.log(resp[0])
    return resp[0].affectedRows
}

async function deletaReceitaIngrediente(id_receitas, id_ingredientes) {
    let conn = await conecta()
    let sql = "delete from receita_ingredientes where id_receitas = ? and id_ingredientes = ?"
    let resp = await conn.query(sql, [id_receitas, id_ingredientes])
    console.log(resp[0])
    return resp[0].affectedRows
}

async function deletaReceitaIngredientePorReceita(id_receitas) {
    let conn = await conecta()
    let sql = "delete from receita_ingredientes where id_receitas = ?"
    let resp = await conn.query(sql, [id_receitas])
    console.log(resp[0])
    return resp[0].affectedRows
}

async function atualizaReceitaIngrediente(id_receitas, id_ingredientes, resIng) {
    let conn = await conecta()
    let sql = "update receita_ingredientes set  unidade = ? where id_receitas = ? and id_ingredientes = ?"
    let resp = await conn.query(sql, [resIng.unidade, id_receitas, id_ingredientes])
    //tambem tinha como atualizar a quantidade mas o tipo de dados complica pois ele tem que ter duas casas decimais
    console.log(resIng)
    return resp[0].affectedRows
}

//busca
async function buscaPorNome(nome) {
    let conn = await conecta()
    let sql = "select * from receitas where nome = ?"
    let resp = await conn.query(sql, [nome])
    console.log(resp[0])
    return resp[0]
}

async function buscaPorCategoria(cat) {
    let conn = await conecta()
    let sql = "select * from receitas where categoria = ?"
    let resp = await conn.query(sql, [cat])
    console.log(resp[0])
    return resp[0]
}

async function buscaPorIngrediente(id_ing) {
    let conn = await conecta()
    let sql = "select * from receitas where id = (select id_receitas from receita_ingredientes where id_ingredientes = ?)"
    let resp = await conn.query(sql, [id_ing])
    console.log(resp[0])
    return resp[0]
}

async function buscaPorEspecificacoes(esp, op) {
    let conn = await conecta()
    let sql = "select * from receitas where id = (select id_receitas from receita_ingredientes where id_ingredientes = (select id from ingredientes where ? = ?))"
    let resp = await conn.query(sql, [esp, op])
    console.log(resp[0])
    return resp[0]
}

async function buscaPorIngredientes(ingredientes) {
    let conn = await conecta()
    let sql = "select * from receitas where id = (select id_receitas from receita_ingredientes where id_ingredientes in ?)"
    let resp = await conn.query(sql, [ingredientes])
    console.log(resp[0])
    return resp[0]
}

module.exports = {insereUsuario, deletaUsuario, mostraUsuario, mostraUsuarioSenha, alterarSenha, mostrarIngredientes, 
mostrarReceitas, mostrarReceitasPorUsuario, inserirReceita, deletarReceita, atualizarReceita,
atualizaLikes, atualizaDislikes, mostraReceitaIngredientes, insereReceitaIngrediente,
mostraIngredientesPorReceita, deletaReceitaIngrediente, atualizaReceitaIngrediente,
buscaPorNome, buscaPorCategoria, buscaPorIngrediente, buscaPorEspecificacoes, buscaPorIngredientes, deletaReceitaIngredientePorReceita}