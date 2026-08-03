-- Create tables based on PRD.md

-- Enums for fulfillment_type and order_status
CREATE TYPE fulfillment_type AS ENUM ('pickup', 'ship');
CREATE TYPE order_status AS ENUM ('pending', 'paid', 'fulfilled', 'cancelled');

-- 1. Venue Table
CREATE TABLE IF NOT EXISTS venues (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    logo_url TEXT,
    header_image_url TEXT,
    brand_color_hex TEXT NOT NULL DEFAULT '#10b981',
    notification_email TEXT NOT NULL,
    location TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Product Table
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    venue_id UUID NOT NULL REFERENCES venues(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    price INTEGER NOT NULL, -- in cents
    image_url TEXT,
    is_available BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Order Table
CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    venue_id UUID NOT NULL REFERENCES venues(id) ON DELETE CASCADE,
    customer_email TEXT NOT NULL,
    total_amount INTEGER NOT NULL, -- in cents
    venue_commission INTEGER DEFAULT 0, -- in cents
    total_items INTEGER DEFAULT 1,
    fulfillment_type fulfillment_type NOT NULL,
    status order_status NOT NULL DEFAULT 'pending',
    shipping_address JSONB, -- store structured address
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Dummy Data for Emerald Roastery
INSERT INTO venues (id, slug, name, logo_url, header_image_url, brand_color_hex, notification_email, location)
VALUES (
    '550e8400-e29b-41d4-a716-446655440000', 
    'emerald-roastery', 
    'Emerald Roastery', 
    'https://placehold.co/160x160/10b981/ffffff/png?text=ER', 
    'https://placehold.co/1200x480/064e3b/ffffff/png?text=Emerald+Roastery', 
    '#10b981', 
    'orders@emeraldroastery.example',
    'Seattle, WA'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (venue_id, title, description, price, image_url, is_available)
VALUES 
(
    '550e8400-e29b-41d4-a716-446655440000', 
    'House Blend Coffee', 
    '12oz bag of our signature medium roast.', 
    1899, 
    'https://placehold.co/600x600/f0fdf4/10b981/png?text=Coffee', 
    true
),
(
    '550e8400-e29b-41d4-a716-446655440000', 
    'Ceramic Mug', 
    'Hand-glazed mug with the roastery emblem.', 
    2200, 
    'https://placehold.co/600x600/ecfdf5/10b981/png?text=Mug', 
    true
),
(
    '550e8400-e29b-41d4-a716-446655440000', 
    'Canvas Tote', 
    'Reusable tote for beans, books, or market runs.', 
    1599, 
    'https://placehold.co/600x600/d1fae5/10b981/png?text=Tote', 
    true
) ON CONFLICT DO NOTHING;
