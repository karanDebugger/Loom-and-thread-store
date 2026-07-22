import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import { useCart } from "../hooks/useCart";
import { createOrder } from "../services/orderService";

import AddressForm from "../components/checkout/AddressForm";
import CheckoutItems from "../components/checkout/CheckoutItems";
import OrderSummary from "../components/checkout/OrderSummary";

function Checkout() {
  const navigate = useNavigate();

  const {
    cartItems,
    totalItems,
    totalPrice,
    clearCart,
  } = useCart();

  if (cartItems.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  const shipping = totalPrice >= 2000 ? 0 : 99;
  const gst = Math.round(totalPrice * 0.18);
  const grandTotal = totalPrice + shipping + gst;

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    pinCode: "",
    country: "India",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = "Enter a valid 10-digit mobile number";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.address1.trim()) {
      newErrors.address1 = "Address is required";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!formData.state.trim()) {
      newErrors.state = "State is required";
    }

    if (!/^\d{6}$/.test(formData.pinCode)) {
      newErrors.pinCode = "PIN Code must be 6 digits";
    }

    if (!formData.country.trim()) {
      newErrors.country = "Country is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);

      const orderData = {
        orderItems: cartItems.map((item) => ({
          product: item._id,
          title: item.title,
          image: item.images?.[0] || "",
          quantity: item.quantity,
          price: item.price,
        })),

        shippingAddress: formData,

        paymentMethod: "COD",

        subtotal: totalPrice,

        shippingPrice: shipping,

        taxPrice: gst,

        totalPrice: grandTotal,
      };

      const response = await createOrder(orderData);

      console.log(response);

      clearCart();

      navigate("/order-success");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to place order."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <h1 className="text-5xl font-bold mb-12">
        Checkout
      </h1>

      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <AddressForm
            formData={formData}
            setFormData={setFormData}
            errors={errors}
          />

          <CheckoutItems />
        </div>

        <OrderSummary
          totalItems={totalItems}
          totalPrice={totalPrice}
          shipping={shipping}
          gst={gst}
          grandTotal={grandTotal}
          onContinue={handleContinue}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default Checkout;