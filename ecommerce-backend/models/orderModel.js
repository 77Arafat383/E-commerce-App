const db = require('../config/db');


const createOrder = async(userId, totalPrice, items) =>{
    const conn = await db.getConnection();
    try {
        await conn.beginTransaction();
        
        const [orderResult] = await conn.query(
             'insert into orders (user_id, total_price) values (?,?)',
             [userId,totalPrice]
        );
        const orderId = orderResult.insertId;

        for(const item of items){
            await conn.query(
                'insert into order_items (order_id, product_id, quantity, price) values (?,?,?,?)',
                [orderId, item.product_id,item.quantity, item.price]
            );
        }

        await conn.commit();
        return orderId;
    } catch(err){
        await conn.rollback();
        throw err;
    }finally{
        conn.release();
    }
};



const getOrdersByUser = async (userId) =>{
    const [rows] = await db.query(
        'select *from orders where user_id =? order by created_at DESC',
        [userId]
    );
    return rows;
};

const getOrderDetails = async(orderId) =>{
    const [order] = await db.query(
        'select *from orders where id= ?',
        [orderId]
    );
    const [items] = await db.query(
        'select *from order_items where order_id = ?',
        [orderId]
    );
    return {order:order[0],items};
};

module.exports = {
    createOrder,
    getOrdersByUser,
    getOrderDetails
};


