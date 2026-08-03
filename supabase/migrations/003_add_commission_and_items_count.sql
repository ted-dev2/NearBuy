ALTER TABLE orders ADD COLUMN IF NOT EXISTS venue_commission INTEGER DEFAULT 0;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS total_items INTEGER DEFAULT 1;

-- Update existing orders with some dummy data for commission (15% of total_amount)
UPDATE orders SET venue_commission = ROUND(total_amount * 0.15) WHERE venue_commission = 0;
