import { Shirt, Footprints, Watch, Gem } from "lucide-react";

const categories = [
  {
    title: "Clothing",
    icon: <Shirt size={40} />,
  },
  {
    title: "Shoes",
    icon: <Footprints size={40} />,
  },
  {
    title: "Accessories",
    icon: <Watch size={40} />,
  },
  {
    title: "Luxury",
    icon: <Gem size={40} />,
  },
];

function Categories() {
  return (
    <section className="bg-black py-20">
      <div className="max-w-7xl mx-auto px-8">

        <h2 className="text-white text-4xl font-bold mb-12">
          Shop By Category
        </h2>

        <div className="grid md:grid-cols-4 gap-8">

          {categories.map((item) => (
            <div
              key={item.title}
              className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10 hover:border-white transition duration-300 cursor-pointer"
            >
              <div className="text-white mb-6">
                {item.icon}
              </div>

              <h3 className="text-2xl text-white font-semibold">
                {item.title}
              </h3>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}

export default Categories; 