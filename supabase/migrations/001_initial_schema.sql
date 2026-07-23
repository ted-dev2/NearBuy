-- NearBuy MVP schema: venues, products, orders

CREATE TYPE public.fulfillment_type AS ENUM ('pickup', 'ship');

CREATE TYPE public.order_status AS ENUM (
  'pending',
  'paid',
  'fulfilled',
  'cancelled'
);

CREATE TABLE public.venues (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  logo_url TEXT,
  header_image_url TEXT,
  brand_color_hex TEXT NOT NULL DEFAULT '#2563eb',
  notification_email TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT venues_slug_format CHECK (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  CONSTRAINT venues_brand_color_hex_format CHECK (brand_color_hex ~ '^#[0-9A-Fa-f]{6}$')
);

CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  venue_id UUID NOT NULL REFERENCES public.venues (id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  price INTEGER NOT NULL CHECK (price >= 0),
  image_url TEXT,
  is_available BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  venue_id UUID NOT NULL REFERENCES public.venues (id) ON DELETE RESTRICT,
  customer_email TEXT NOT NULL,
  total_amount INTEGER NOT NULL CHECK (total_amount >= 0),
  fulfillment_type public.fulfillment_type NOT NULL,
  status public.order_status NOT NULL DEFAULT 'pending',
  shipping_address JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT orders_shipping_address_required_for_ship CHECK (
    fulfillment_type = 'pickup' OR shipping_address IS NOT NULL
  )
);

COMMENT ON COLUMN public.products.price IS 'Unit price in cents (USD).';
COMMENT ON COLUMN public.orders.total_amount IS 'Order total in cents (USD).';
COMMENT ON COLUMN public.orders.shipping_address IS
  'Nullable for pickup. Example: {"line1","line2","city","state","postal_code","country"}.';

CREATE INDEX idx_venues_slug ON public.venues (slug);
CREATE INDEX idx_products_venue_id ON public.products (venue_id);
CREATE INDEX idx_products_venue_available ON public.products (venue_id, is_available)
  WHERE is_available = true;
CREATE INDEX idx_orders_venue_id ON public.orders (venue_id);
CREATE INDEX idx_orders_status ON public.orders (status);
CREATE INDEX idx_orders_created_at ON public.orders (created_at DESC);

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER venues_set_updated_at
  BEFORE UPDATE ON public.venues
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER products_set_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER orders_set_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.venues ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read venues"
  ON public.venues
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public can read available products"
  ON public.products
  FOR SELECT
  TO anon, authenticated
  USING (is_available = true);
