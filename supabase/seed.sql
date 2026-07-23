-- Example seed data for local development / manual admin seeding.
-- Run after 001_initial_schema.sql in the Supabase SQL editor.

INSERT INTO public.venues (
  slug,
  name,
  logo_url,
  header_image_url,
  brand_color_hex,
  notification_email
)
VALUES (
  'the-local-pub',
  'The Local Pub',
  'https://placehold.co/120x120/png',
  'https://placehold.co/800x300/png',
  '#1d4ed8',
  'orders@thelocalpub.example'
);

INSERT INTO public.products (venue_id, title, description, price, image_url, is_available)
SELECT
  v.id,
  p.title,
  p.description,
  p.price,
  p.image_url,
  true
FROM public.venues v
CROSS JOIN (
  VALUES
    (
      'House T-Shirt',
      'Soft cotton tee with the pub logo.',
      2499,
      'https://placehold.co/600x600/png'
    ),
    (
      'Enamel Mug',
      '12oz mug for coffee or beer at home.',
      1899,
      'https://placehold.co/600x600/png'
    )
) AS p (title, description, price, image_url)
WHERE v.slug = 'the-local-pub';
