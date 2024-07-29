import React, { useEffect } from "react";
import successIcon from "@/assets/images/success-icon.png";
import { formatDateFromString, PriceFormat } from "@/util/validate";
import usePaymentResult from "@/hooks/usePaymentResult";
import useAuthService from "@/services/authService";
import useCartStore from "@/hooks/useCartStore";

const PaymentSuccess: React.FC = () => {
  const paymentResult = usePaymentResult((state) => state.paymentResult);
  const clearCart = useCartStore((state) => state.clearCart);

  const { infoUser } = useAuthService();

  const formattedCurrency = PriceFormat.format(
    paymentResult?.["vnp_Amount"] ?? 0,
  );

  useEffect(() => {
    clearCart();
  }, []);

  return (
    <>
      <div className="bg-[#f5f5f5] pt-[70px]">
        <div className="mx-auto my-0 min-h-[100px] w-[573px] px-0 py-[50px]  ">
          <div className="border-1 relative border-2 border-[#5D9C59] bg-[#fff]">
            <div className="bg-[#5D9C59] p-[10px] text-center text-[#fff]">
              <h6 className="text-center font-bold">THÔNG TIN THANH TOÁN</h6>
            </div>

            <div className="mt-[10px] flex flex-col items-center justify-center">
              <img
                src={successIcon}
                alt="Lỗi"
                width="90px"
                className="text-center"
              />
              <h5 className="my-[20px] text-xl font-bold">
                Thanh toán thành công
              </h5>
            </div>
            <div className="px-[30px] py-0 leading-8">
              <table>
                <tbody>
                  <tr>
                    <th className="text-left">Khách hàng:</th>
                    <td className="absolute right-[30px]">{infoUser?.name}</td>
                  </tr>
                  <tr>
                    <th className="text-left">Email:</th>
                    <td className="absolute right-[30px]">{infoUser?.email}</td>
                  </tr>
                  <tr>
                    <th className="text-left">Mã đơn hàng:</th>
                    <td className="absolute right-[30px]">
                      {paymentResult?.["vnp_TxnRef"]}
                    </td>
                  </tr>
                  <tr>
                    <th className="text-left">Số tiền:</th>
                    <td className="absolute right-[30px]">
                      {formattedCurrency}
                    </td>
                  </tr>
                  <tr>
                    <th className="text-left">Mã giao dịch:</th>
                    <td className="absolute right-[30px]">
                      {paymentResult?.["vnp_TransactionNo"]}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mx-auto my-[10px] flex items-center px-[30px] py-0">
              <div className="h-[1px] w-full flex-1 bg-[#dbdbdb]" />
              <span className="px-2">Chi tiết</span>
              <div className="h-[1px] w-full flex-1 bg-[#dbdbdb]" />
            </div>
            <div className="px-[30px] py-0 leading-8">
              <table>
                <tbody>
                  <tr>
                    <th className="text-left">Nội dung:</th>
                    <td className="absolute right-[30px]">
                      {paymentResult?.["vnp_OrderInfo"]}
                    </td>
                  </tr>
                  <tr>
                    <th className="text-left">Mã ngân hàng:</th>
                    <td className="absolute right-[30px]">
                      {paymentResult?.["vnp_BankCode"]}
                    </td>
                  </tr>
                  <tr>
                    <th className="text-left">Loại thanh toán:</th>
                    <td className="absolute right-[30px]">VNPAY</td>
                  </tr>
                  <tr>
                    <th className="text-left">Mã giao dịch ngân hàng:</th>
                    <td className="absolute right-[30px]">
                      {paymentResult?.["vnp_BankTranNo"]}
                    </td>
                  </tr>
                  <tr>
                    <th className="text-left">Ngày thanh toán:</th>
                    <td className="absolute right-[30px]">
                      {formatDateFromString(paymentResult?.["vnp_PayDate"])}
                    </td>
                  </tr>
                  <tr>
                    <th className="text-left">Trạng thái:</th>
                    <td className="absolute right-[30px]">Thành công</td>
                  </tr>
                </tbody>
              </table>
              <div className="mt-[50px] text-center font-bold">
                <p className="mb-0">
                  Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi
                </p>
                <p className="mb-0">Hẹn gặp lại!</p>
              </div>
              <div className="mt-[20px] flex justify-between pb-[10px]">
                <p>
                  <a href="/" className="text-[#50d6ff] hover:underline">
                    Trang chủ
                  </a>
                </p>
                <p>
                  Cung cấp bởi{" "}
                  <a
                    href="https://vnpay.vn/"
                    target="_blank"
                    className="text-[#50d6ff] hover:underline"
                  >
                    VNPAY
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentSuccess;
