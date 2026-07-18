const db = require('../config/db');

const User = {
    create: async (userData) => {
        const { company_name, email, password_hash, role, license_number } = userData;
        const [result] = await db.query(
            `INSERT INTO users (company_name, email, password_hash, role, license_number) 
             VALUES (?, ?, ?, ?, ?)`,
            [company_name, email, password_hash, role, license_number]
        );
        return result.insertId;
    },
    findByEmail: async (email) => {
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    },
    findById: async (id) => {
        const [rows] = await db.query(
            'SELECT id, company_name, email, role, license_number FROM users WHERE id = ?',
            [id]
        );
        return rows[0];
    },
    // ሁሉንም አቅራቢዎች (wholesalers) ለማግኘት (ለCreateOrder ጠቃሚ)
    findWholesalers: async () => {
        const [rows] = await db.query('SELECT id, company_name FROM users WHERE role = "wholesaler"');
        return rows;
    }
};

module.exports = User;