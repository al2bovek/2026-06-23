import sql from '../config/db.js';

export const ItemModel = {
  async findAll(filters = {}) {
    const {
      q,
      categoryId,
      type,
      isFree,
      ratingMin,
      ratingMax,
    } = filters;

    return await sql`
      SELECT i.*, c.name AS category_name
      FROM items i
      JOIN categories c ON c.id = i.category_id
      WHERE 1 = 1
        ${q          ? sql`AND i.name ILIKE ${'%' + q + '%'}` : sql``}
        ${categoryId ? sql`AND i.category_id = ${Number(categoryId)}` : sql``}
        ${type       ? sql`AND i.type = ${type}` : sql``}
        ${isFree !== undefined && isFree !== '' ? sql`AND i.is_free = ${isFree === 'true' || isFree === true}` : sql``}
        ${ratingMin !== undefined && ratingMin !== '' ? sql`AND i.rating >= ${Number(ratingMin)}` : sql``}
        ${ratingMax !== undefined && ratingMax !== '' ? sql`AND i.rating <= ${Number(ratingMax)}` : sql``}
      ORDER BY i.id DESC
    `;
  },

  async findById(id) {
    const [row] = await sql`
      SELECT i.*, c.name AS category_name
      FROM items i
      JOIN categories c ON c.id = i.category_id
      WHERE i.id = ${id}
    `;
    return row || null;
  },

  async create(data) {
    const [row] = await sql`
      INSERT INTO items (name, type, description, image_url, address, rating, is_free, category_id)
      VALUES (
        ${data.name},
        ${data.type},
        ${data.description ?? ''},
        ${data.image_url ?? ''},
        ${data.address ?? ''},
        ${data.rating ?? 0},
        ${data.is_free ?? false},
        ${data.category_id}
      )
      RETURNING *
    `;
    return row;
  },

  async update(id, data) {
    const [row] = await sql`
      UPDATE items SET
        name        = ${data.name},
        type        = ${data.type},
        description = ${data.description ?? ''},
        image_url   = ${data.image_url ?? ''},
        address     = ${data.address ?? ''},
        rating      = ${data.rating ?? 0},
        is_free     = ${data.is_free ?? false},
        category_id = ${data.category_id}
      WHERE id = ${id}
      RETURNING *
    `;
    return row || null;
  },

  async remove(id) {
    const [row] = await sql`DELETE FROM items WHERE id = ${id} RETURNING id`;
    return row || null;
  },
};