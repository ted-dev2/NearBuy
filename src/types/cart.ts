export type CartItem = {
  productId: string;
  title: string;
  price: number;
  imageUrl: string | null;
  quantity: number;
};

export type CheckoutCartItem = {
  productId: string;
  quantity: number;
};
