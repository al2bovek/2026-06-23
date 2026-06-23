INSERT INTO categories (name) VALUES
  ('Group A'),
  ('Group B'),
  ('Group C')
ON CONFLICT (name) DO NOTHING;

INSERT INTO items (name, type, description, image_url, address, rating, is_free, category_id)
SELECT 'Sample Item One',  'type a',  'Short description of sample item one.',   'https://picsum.photos/data/one/600/400',   '123 Sample',  4.5, TRUE,  c.id FROM categories c WHERE c.name = 'Group A'
ON CONFLICT DO NOTHING;

INSERT INTO items (name, type, description, image_url, address, rating, is_free, category_id)
SELECT 'Sample Item Two',  'type b',    'Short description of sample item two.',   'https://picsum.photos/data/two/600/400',   '45 Sample',   4.2, TRUE,  c.id FROM categories c WHERE c.name = 'Group A'
ON CONFLICT DO NOTHING;

INSERT INTO items (name, type, description, image_url, address, rating, is_free, category_id)
SELECT 'Sample Item Three','type c',  'Short description of sample item three.', 'https://picsum.photos/data/three/600/400', '7 Sample',      4.8, FALSE, c.id FROM categories c WHERE c.name = 'Group B'
ON CONFLICT DO NOTHING;

INSERT INTO items (name, type, description, image_url, address, rating, is_free, category_id)
SELECT 'Sample Item Four', 'type a', 'Short description of sample item four.',  'https://picsum.photos/data/four/600/400',  '99 Sample',3.9, FALSE, c.id FROM categories c WHERE c.name = 'Group C'
ON CONFLICT DO NOTHING;