const db = require('../config/db');

const createUser = async(name, email , hashedPassword)=>{
    const [result] = await db.query(
        'insert into users (name, email, password) values (?,?,?)',
        [name,email,hashedPassword]
    );
    return result.insertId; //it gives id of the newly inserted row,


};

const findUserByEmail = async(email) =>{
    const [rows] = await db.query(
        'select *from users where email = ?',
        [email]
    );
    return rows[0];
}

const findUserById = async (id) =>{
    const [rows] = await db.query(
        'select *from users where id = ?',
        [id]
    );
    return rows[0];
}

module.exports = {createUser,findUserByEmail,findUserById};