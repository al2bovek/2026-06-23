import sql from '../config/db.js';

export const CategoryModel = {
  async findAll() {
    return await sql`SELECT * FROM categories ORDER BY name ASC`;
  },

  async findById(id) {
    const [row] = await sql`SELECT * FROM categories WHERE id = ${id}`;
    return row || null;
  },

  async create({ name }) {
    const [row] = await sql`
      INSERT INTO categories (name)
      VALUES (${name})
      RETURNING *
    `;
    return row;
  },

  async update(id, { name }) {
    const [row] = await sql`
      UPDATE categories
      SET name = ${name}
      WHERE id = ${id}
      RETURNING *
    `;
    return row || null;
  },

  async remove(id) {
    const [row] = await sql`
      DELETE FROM categories WHERE id = ${id} RETURNING id
    `;
    return row || null;
  },
};