import React, { useEffect } from "react";
import { Loading } from "@/components";
import usePaymentResult from "@/hooks/usePaymentResult";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentView: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const setPaymentResult = usePaymentResult((state) => state.setPaymentResult);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const parsedData: Record<string, string> = {};

    queryParams.forEach((value, key) => {
      parsedData[key] = value;
    });

    if (parsedData && parsedData?.vnp_ResponseCode === "00") {
      setPaymentResult(parsedData);
      navigate("/payment/success");
      return;
    } else if (parsedData && parsedData?.vnp_ResponseCode === "24") {
      setPaymentResult(parsedData);
      navigate("/payment/failure");
    } else {
      navigate("/payment/failure");
    }

    // setPaymentData(parsedData);
  }, [location.search, navigate, setPaymentResult]);

  return (
    <>
      <div className="min-h-screen">
        <div className="text-center">
          <Loading />
        </div>
      </div>
    </>
  );
};

export default PaymentView;
