const db = require('../config/db');

const Order = {
    create: async (pharmacy_id, wholesaler_id, items) => {
        const connection = await db.getConnection();
        try {
            await connection.beginTransaction();
            // ትዕዛዝ ፍጠር
            const [orderResult] = await connection.query(
                'INSERT INTO orders (pharmacy_id, wholesaler_id) VALUES (?, ?)',
                [pharmacy_id, wholesaler_id]
            );
            const orderId = orderResult.insertId;

            let total = 0;
            for (const item of items) {
                const { inventory_item_id, quantity_ordered, negotiated_price } = item;
                await connection.query(
                    'INSERT INTO order_items (order_id, inventory_item_id, quantity_ordered, negotiated_price) VALUES (?, ?, ?, ?)',
                    [orderId, inventory_item_id, quantity_ordered, negotiated_price || 0]
                );
                const [inv] = await connection.query('SELECT unit_price FROM inventory WHERE id = ?', [inventory_item_id]);
                total += (inv[0]?.unit_price || 0) * quantity_ordered;
            }
            await connection.query('UPDATE orders SET total_amount = ? WHERE id = ?', [total, orderId]);
            await connection.commit();
            return orderId;
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    },
    findByUser: async (userId, role) => {
        const column = role === 'pharmacy' ? 'pharmacy_id' : 'wholesaler_id';
        const [rows] = await db.query(`SELECT * FROM orders WHERE ${column} = ? ORDER BY created_at DESC`, [userId]);
        return rows;
    },
    findById: async (orderId) => {
        const [rows] = await db.query('SELECT * FROM orders WHERE id = ?', [orderId]);
        return rows[0];
    },
    updateStatus: async (orderId, status) => {
        const [result] = await db.query('UPDATE orders SET status = ? WHERE id = ?', [status, orderId]);
        return result.affectedRows;
    }
};

module.exports = Order;