import { PaymentData } from "@/interfaces/interface";
import { create } from "zustand";

interface PaymentResultState {
  paymentResult: PaymentData;
  setPaymentResult: (paymentResult: PaymentData) => void;
}

const usePaymentResult = create<PaymentResultState>((set) => ({
  paymentResult: {} as PaymentData,
  setPaymentResult: (paymentResult: PaymentData) => set({ paymentResult }),
}));

export default usePaymentResult;
