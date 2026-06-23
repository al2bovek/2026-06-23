import sql from '../config/db.js';

export const UserModel = {
  async findByEmail(email) {
    const [row] = await sql`SELECT * FROM users WHERE email = ${email}`;
    return row || null;
  },

  async findById(id) {
    const [row] = await sql`SELECT id, email, created_at FROM users WHERE id = ${id}`;
    return row || null;
  },

  async create({ email, passwordHash }) {
    const [row] = await sql`
      INSERT INTO users (email, password_hash)
      VALUES (${email}, ${passwordHash})
      RETURNING id, email, created_at
    `;
    return row;
  },

  async update(id, { email, passwordHash }) {
    const [row] = await sql`
      UPDATE users
      SET 
        email = COALESCE(${email}, email),
        password_hash = COALESCE(${passwordHash}, password_hash)
      WHERE id = ${id}
      RETURNING id, email, created_at
    `;
    return row || null;
  },

  async remove(id) {
    const [row] = await sql`
      DELETE FROM users
      WHERE id = ${id}
      RETURNING id, email, created_at
    `;
    return row || null;
  },
};