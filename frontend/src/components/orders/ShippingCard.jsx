function ShippingCard({ address }) {
  return (
    <div className="bg-[#111] rounded-2xl p-6 border border-zinc-800">
      <h2 className="text-2xl font-bold mb-6">
        Shipping Address
      </h2>

      <div className="space-y-2 text-zinc-300">
        <p>{address.fullName}</p>

        <p>{address.phone}</p>

        <p>{address.email}</p>

        <p>{address.address1}</p>

        {address.address2 && (
          <p>{address.address2}</p>
        )}

        <p>
          {address.city}, {address.state}
        </p>

        <p>
          {address.pinCode}
        </p>

        <p>{address.country}</p>
      </div>
    </div>
  );
}

export default ShippingCard;