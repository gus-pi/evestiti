export type Product = {
  _id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  oldPrice?: number;
  image: string;
  color: string;
  rating: number;
  author?: string;
  quantity: number;
};

type User = {
  username: string;
  email: string;
};

export type Review = {
  productId: string;
  userId: User;
  comment: string;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
};

export type Filter = {
  category: string;
  color: string;
  priceRange: { label: string; min: number; max: number };
};

export type Filters = {
  categories: string[]; // Array of category strings
  colors: string[]; // Array of color strings
  priceRanges: {
    label: string; // A descriptive label for the price range
    min: number; // Minimum price
    max: number; // Maximum price
  }[]; // Array of price range objects
};

export type Order = {
  _id?: string;

  amount: number | 0;

  createdAt?: string;

  email?: string;

  products?: Product[];

  status?: string;

  updatedAt?: string;
};

export type Stats = {
  totalPayments: number,
  totalReviews: number,
  totalPurchasedProducts: number
  totalEarnings: number
  totalOrders: number
  totalUsers: number
  totalProducts: number
}