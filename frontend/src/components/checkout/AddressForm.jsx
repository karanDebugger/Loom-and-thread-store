function AddressForm({
  formData,
  setFormData,
  errors,
}) {
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const inputClass = (field) =>
    `w-full bg-zinc-900 rounded-xl px-4 py-3 outline-none transition border ${
      errors[field]
        ? "border-red-500"
        : "border-zinc-700 focus:border-white"
    }`;

  return (
    <div className="bg-[#111] rounded-2xl p-8">

      <h2 className="text-3xl font-semibold mb-8">
        Shipping Address
      </h2>

      <form className="space-y-6">

        {/* Full Name */}
        <div>
          <label className="block mb-2 font-medium">
            Full Name *
          </label>

          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            className={inputClass("fullName")}
          />

          {errors.fullName && (
            <p className="text-red-500 text-sm mt-2">
              {errors.fullName}
            </p>
          )}
        </div>

        {/* Phone & Email */}
        <div className="grid md:grid-cols-2 gap-6">

          <div>
            <label className="block mb-2 font-medium">
              Phone Number *
            </label>

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="9876543210"
              className={inputClass("phone")}
            />

            {errors.phone && (
              <p className="text-red-500 text-sm mt-2">
                {errors.phone}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Email *
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@email.com"
              className={inputClass("email")}
            />

            {errors.email && (
              <p className="text-red-500 text-sm mt-2">
                {errors.email}
              </p>
            )}
          </div>

        </div>

        {/* Address Line 1 */}
        <div>
          <label className="block mb-2 font-medium">
            Address Line 1 *
          </label>

          <input
            type="text"
            name="address1"
            value={formData.address1}
            onChange={handleChange}
            placeholder="House No., Street, Area"
            className={inputClass("address1")}
          />

          {errors.address1 && (
            <p className="text-red-500 text-sm mt-2">
              {errors.address1}
            </p>
          )}
        </div>

        {/* Address Line 2 */}
        <div>
          <label className="block mb-2 font-medium">
            Address Line 2
          </label>

          <input
            type="text"
            name="address2"
            value={formData.address2}
            onChange={handleChange}
            placeholder="Apartment, Landmark (Optional)"
            className={inputClass("address2")}
          />
        </div>

        {/* City & State */}
        <div className="grid md:grid-cols-2 gap-6">

          <div>
            <label className="block mb-2 font-medium">
              City *
            </label>

            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Delhi"
              className={inputClass("city")}
            />

            {errors.city && (
              <p className="text-red-500 text-sm mt-2">
                {errors.city}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-2 font-medium">
              State *
            </label>

            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="Delhi"
              className={inputClass("state")}
            />

            {errors.state && (
              <p className="text-red-500 text-sm mt-2">
                {errors.state}
              </p>
            )}
          </div>

        </div>

        {/* PIN & Country */}
        <div className="grid md:grid-cols-2 gap-6">

          <div>
            <label className="block mb-2 font-medium">
              PIN Code *
            </label>

            <input
              type="text"
              name="pinCode"
              value={formData.pinCode}
              onChange={handleChange}
              placeholder="110001"
              className={inputClass("pinCode")}
            />

            {errors.pinCode && (
              <p className="text-red-500 text-sm mt-2">
                {errors.pinCode}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Country *
            </label>

            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className={inputClass("country")}
            />

            {errors.country && (
              <p className="text-red-500 text-sm mt-2">
                {errors.country}
              </p>
            )}
          </div>

        </div>

      </form>

    </div>
  );
}

export default AddressForm;