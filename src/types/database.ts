export type FulfillmentType = "pickup" | "ship";

export type OrderStatus = "pending" | "paid" | "fulfilled" | "cancelled";

export type ShippingAddress = {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
};

export type Venue = {
  id: string;
  slug: string;
  name: string;
  logo_url: string | null;
  header_image_url: string | null;
  brand_color_hex: string;
  notification_email: string;
  location: string | null;
  created_at: string;
  updated_at: string;
};

export type Product = {
  id: string;
  venue_id: string;
  title: string;
  description: string | null;
  price: number;
  image_url: string | null;
  is_available: boolean;
  created_at: string;
  updated_at: string;
};

export type Order = {
  id: string;
  venue_id: string;
  customer_email: string;
  total_amount: number;
  fulfillment_type: FulfillmentType;
  status: OrderStatus;
  shipping_address: ShippingAddress | null;
  created_at: string;
  updated_at: string;
};

export type Database = {
  public: {
    Tables: {
      venues: {
        Row: Venue;
        Insert: Omit<Venue, "id" | "created_at" | "updated_at"> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Venue>;
      };
      products: {
        Row: Product;
        Insert: Omit<Product, "id" | "created_at" | "updated_at"> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Product>;
      };
      orders: {
        Row: Order;
        Insert: Omit<Order, "id" | "created_at" | "updated_at"> & {
          id?: string;
          status?: OrderStatus;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Order>;
      };
    };
    Enums: {
      fulfillment_type: FulfillmentType;
      order_status: OrderStatus;
    };
  };
};
