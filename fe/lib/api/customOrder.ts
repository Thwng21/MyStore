const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const createCustomOrder = async (data: {
  email: string;
  phone?: string;
  customerName?: string;
  orderDetails: string;
  receiveDate?: string;
}) => {
  const res = await fetch(`${API_BASE_URL}/api/custom-orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Gửi yêu cầu thất bại");
  }

  return result;
};
