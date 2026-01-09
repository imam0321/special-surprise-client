export interface OrderUser {
  name: string;
  email: string;
  phone: string;
}

export interface OrderProduct {
  productCode: string;
}

export interface OrderAddress {
  city: string;
  country: string;
  address_detail: string;
}

export type PaymentStatus = "PAID" | "UNPAID" | "FAILED" | "CANCELLED";

export interface OrderPayment {
  amount: number;
  status: PaymentStatus;
  transactionId: string;
}

export type OrderStatus = "PENDING" | "PREPARING" | "CANCEL" | "COMPLETE";

export interface Order {
  id: string;
  orderCode: string;

  receiverName: string;
  receiverPhone: string;

  status: OrderStatus;

  userId: string;
  productId: string;

  deliveryDate: string;
  deliveryTime: string;

  createdAt: string;
  updatedAt: string;

  user: OrderUser;
  product: OrderProduct;
  orderAddress: OrderAddress;
  payment: OrderPayment;
}
