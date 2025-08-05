const db = require('../config/db');

const getAllProducts = async ()=>{
    const [rows] = await db.query(
        'select *from products'
    );
    return rows;
};

const getProductById = async (id)=>{
    const [rows] = await db.query(
        'select *from products where id = ?',
       [id]
    );
    return rows[0];
};

const createProduct = async (product)=>{
    const {name,description,price,image,category_id} = product;
    const [result] = await db.query(
        'insert into products (name,description,price,image,category_id) values (?,?,?,?,?)',
        [name,description,price,image,category_id]
    );
    return result.insertId; //return created newly product
};

const updateProduct = async (id, product)=>{
    const {name, description, price, image,category_id} = product;
    await db.query(
        'update products set name = ?, description=?, price = ? , image=?, category_id = ?, where id=?',
        [name, description, price, image, category_id, id]
    );
};

const deleteProduct = async (id) =>{
    await db.query('delete from products where id=?',[id]);
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};