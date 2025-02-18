import { pool } from "../config/config.js"

class User {
    static async create({ email, password }) {
        const query = 'INSERT INTO users (email, password) VALUES (?, ?)';
        const [rows] = await pool.query(query, [email, password]);
        return rows;
    }

    static async findByEmail(email) {
        const query = 'SELECT * FROM users WHERE email = ?';
        const [rows] = await pool.query(query, [email]);
        return rows[0]; // Return the first user found
    }
}

export default User;