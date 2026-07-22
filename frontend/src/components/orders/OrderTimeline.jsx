const steps = [
  "Pending",
  "Processing",
  "Shipped",
  "Delivered",
];

function OrderTimeline({ status }) {

  const isCancelled = status === "Cancelled";

  const currentStep = isCancelled
    ? 0
    : steps.indexOf(status);

  return (
    <div className="bg-[#111] rounded-2xl p-6 border border-zinc-800">

      <h2 className="text-2xl font-bold mb-8">
        Order Status
      </h2>

      <div className="flex items-center justify-between">

        {steps.map((step, index) => (

          <div
            key={step}
            className="flex flex-1 items-center"
          >

            <div className="flex flex-col items-center">

              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition ${
                  isCancelled
                    ? index === 0
                      ? "bg-red-600 text-white"
                      : "bg-zinc-700 text-zinc-400"
                    : index <= currentStep
                    ? "bg-green-600 text-white"
                    : "bg-zinc-700 text-zinc-400"
                }`}
              >
                {isCancelled && index === 0
                  ? "✕"
                  : index + 1}
              </div>

              <p
                className={`mt-3 text-sm font-medium text-center ${
                  isCancelled
                    ? index === 0
                      ? "text-red-500"
                      : "text-zinc-500"
                    : index <= currentStep
                    ? "text-white"
                    : "text-zinc-500"
                }`}
              >
                {step}
              </p>

            </div>

            {index !== steps.length - 1 && (

              <div
                className={`flex-1 h-1 mx-3 rounded ${
                  isCancelled
                    ? "bg-zinc-700"
                    : index < currentStep
                    ? "bg-green-600"
                    : "bg-zinc-700"
                }`}
              />

            )}

          </div>

        ))}

      </div>

    </div>
  );
}

export default OrderTimeline;