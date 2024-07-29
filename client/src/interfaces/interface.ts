import { Dayjs } from "dayjs";

export interface UserInfo {
  username?: string | undefined;
  email?: string | undefined;
  name?: string | undefined;
  role?: string | undefined;
  dob?: string | number | Date | Dayjs | null | undefined;
  phone?: string | undefined;
  address?: string | undefined;
  _id?: string | undefined;
}

export interface ChangePasswordForm {
  oldPassword: string;
  newPassword: string;
}

export interface ProductInfo {
  _id: string;
  name?: string;
  image?: string;
  description?: string;
  quantity?: number;
  price?: number;
  rating?: number;
  brand?: {
    origin: string;
    brandName: string;
  };
}

export interface AuthState {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  // fetchUserInfo: () => void;
}

export interface ScrollToTopProps {
  children: React.ReactNode;
}

export interface LayoutProps {
  children: React.ReactNode;
}

export interface MenuItem {
  key: string;
  icon?: React.ReactNode;
  label?: string;
  path?: string;
  children?: MenuItem[];
}

export interface ForgotPasswordProps {
  isShowRegister: boolean;
  setIsShowRegister: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface SigninValues {
  username: string;
  password: string;
}

export interface SignupValues {
  username: string;
  name: string;
  email: string;
  password: string;
}

export interface ErrorProps {
  text: string;
  href: string;
}

export interface SignupProps {
  isShowRegister: boolean;
  setIsShowRegister: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface responseTokenProps {
  accessToken: string;
}

export interface CustomError extends Error {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export interface EditModalProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  userInfo?: UserInfo;
}

export interface AddModalProps {
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
  isShow: boolean;
  userInfo?: UserInfo;
}

export interface AddNewUserProps {
  username: string;
  password: string;
  address: string;
  email: string;
  role: string;
  phone: string;
  name: string;
}

export interface PostInfo {
  _id: string;
  product: ProductInfo;
  title?: string;
  description?: string;
  image?: string;
}

export interface PriceFormatProps {
  price: number;
}

export interface CartItem extends ProductInfo {
  quantity: number;
  totalProductPrice: number;
}

export interface CartState {
  cart: CartItem[];
  itemsPrice: number;
  addToCart: (item: ProductInfo) => void;
  removeCart: (itemId: string) => void;
  clearCart: () => void;
}

export interface CartProduct {
  _id: string;
  brand: string;
  comments: unknown[];
  createdAt: string;
  description: string;
  expireDate: string;
  image: string;
  name: string;
  origin: string;
  price: number;
  quantity: number;
  status: string;
  totalProductPrice: number;
  updatedAt: string;
}

export interface PaymentData {
  vnp_Amount?: number;
  vnp_BankCode?: string;
  vnp_BankTranNo?: string;
  vnp_CardType?: string;
  vnp_OrderInfo?: string;
  vnp_PayDate?: string;
  vnp_ResponseCode?: string;
  vnp_TmnCode?: string;
  vnp_TransactionNo?: string;
  vnp_TransactionStatus?: string;
  vnp_TxnRef?: string;
}

export interface BrandData {
  brandName: string;
  origin: string;
}

export interface FeedBack {
  _id: string;
  rating: number;
  content: string;
}

export interface Comment {
  author: {
    _id: string;
    name: string;
  };
  createdAt: string;
  rating: number;
  content: string;
  _id: string;
}

export interface OrderProduct {
  image: string;
  name: string;
  amount: number;
  price: number;
}

export interface Order {
  _id: string;
  createdAt: string;
  transactions: {
    status: string;
  }[];
  orderProducts: OrderProduct[];
  transferPrice: number;
  totalPrice: number;
}

interface Address {
  fullName?: string;
  address?: string;
  phone?: string;
}

export interface CreateOrderProduct {
  productId: string;
  amount: number;
}

export interface CreateOrder {
  transferAddress: Address;
  orderProducts: CreateOrderProduct[];
  userId?: string;
  paymentMethod: string;
  itemsPrice: number;
  transferPrice: number;
  totalPrice: number;
}
