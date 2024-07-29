export function formatDate(dateString: string | number | Date) {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return "Invalid date";
  } else {
    const timezoneOffset = date.getTimezoneOffset() * 60000;
    const localTime = date.getTime() - timezoneOffset;
    const localDate = new Date(localTime);

    const year = localDate.getFullYear();
    const month = (localDate.getMonth() + 1).toString().padStart(2, "0");
    const day = localDate.getDate().toString().padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }
}

export const formatDateFromString = (dateString: string | undefined) => {
  const year = dateString?.slice(0, 4);
  const month = dateString?.slice(4, 6);
  const day = dateString?.slice(6, 8);
  const hours = dateString?.slice(8, 10);
  const minutes = dateString?.slice(10, 12);
  const seconds = dateString?.slice(12, 14);

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};

export const PriceFormat = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

export const validatePhoneNumber = (_: unknown, value: string) => {
  const phoneNumberPattern = /^[0-9]{10}$/;
  if (value && !phoneNumberPattern.test(value)) {
    return Promise.reject(new Error("Số điện thoại phải có 10 số"));
  }
  return Promise.resolve();
};

export function convertToDDMMYYYY(dateString: string | number | Date) {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}
