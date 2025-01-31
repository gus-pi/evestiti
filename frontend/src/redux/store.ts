import { configureStore } from '@reduxjs/toolkit';

import cartReducer from './features/cart/cartSlice';
import authReducer from './features/auth/authSlice';
import authApi from './features/auth/authApi';
import productsApi from './features/products/productApi';
import reviewApi from './features/reviews/reviewsApi';
import statsApi from './features/stats/statsApi';
import orderApi from './features/orders/orderApi';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [reviewApi.reducerPath]: reviewApi.reducer,
    [statsApi.reducerPath]: statsApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      productsApi.middleware,
      reviewApi.middleware,
      statsApi.middleware,
      orderApi.middleware
    ),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
