const db = require('../config/db');

const Inventory = {
    create: async (data) => {
        const { user_id, medicine_name, batch_number, quantity, unit_price, expiry_date } = data;
        const [result] = await db.query(
            `INSERT INTO inventory (user_id, medicine_name, batch_number, quantity, unit_price, expiry_date)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [user_id, medicine_name, batch_number, quantity, unit_price, expiry_date]
        );
        return result.insertId;
    },
    findByUser: async (userId, searchTerm = '') => {
        let query = 'SELECT * FROM inventory WHERE user_id = ?';
        const params = [userId];
        if (searchTerm) {
            query += ' AND medicine_name LIKE ?';
            params.push(`%${searchTerm}%`);
        }
        const [rows] = await db.query(query, params);
        return rows;
    },
    findById: async (id) => {
        const [rows] = await db.query('SELECT * FROM inventory WHERE id = ?', [id]);
        return rows[0];
    },
    update: async (id, data) => {
        const { medicine_name, batch_number, quantity, unit_price, expiry_date } = data;
        const [result] = await db.query(
            `UPDATE inventory SET medicine_name = ?, batch_number = ?, quantity = ?, unit_price = ?, expiry_date = ?
             WHERE id = ?`,
            [medicine_name, batch_number, quantity, unit_price, expiry_date, id]
        );
        return result.affectedRows;
    },
    delete: async (id) => {
        const [result] = await db.query('DELETE FROM inventory WHERE id = ?', [id]);
        return result.affectedRows;
    },
    getExpiryAlerts: async (userId) => {
        const today = new Date();
        const sixMonthsLater = new Date();
        sixMonthsLater.setMonth(today.getMonth() + 6);
        const [rows] = await db.query(
            `SELECT * FROM inventory 
             WHERE user_id = ? 
               AND expiry_date BETWEEN ? AND ? 
               AND quantity > 0
             ORDER BY expiry_date ASC`,
            [userId, today, sixMonthsLater]
        );
        return rows;
    }
};

module.exports = Inventory;