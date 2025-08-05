const db = require('../config/db');

const getCartByUser = async (userId) => {
    const [row] = await db.query(
       `select cart_items.*,products.name,products.price,products.image
       from cart_items
       join product on cart_items.product_id=products_id
       where cart_items.user_id=?`,
       [userId]
    );
    return rows;

    
};


const addToCart = async (userId, product_id, quantity)=>{
    //check if product already exists
    const [rows] = await db.query(
        'select * from cart_items where user_id=? and product_id=?',
        [userId,product_id]
    );
    if(rows.length>0){
        //product already exist
        await db.query(
            'update cart_items set quantity + ? where user_id = ? and product_id = ?',
            [quantity,userId, product_id]
        );
    }else{
        await db.query(
            'insert into cart_items (user_id, product_id,quantity) values (?,?,?)',
            [userId,product_id,quantity]
        );

    }


}

const removeFromCart = async (userId, product_id) =>{
    await db.query(
        'delete from cart_items where user_id=? and product_id =?',
        [userId,product_id]
    );
};

const clearCart = async (userId)=>{
   await db.query('delete from cart_items where user_id = ?',[userId]);
};

module.exports = {
    getCartByUser,
    addToCart,
    removeFromCart,
    clearCart
};