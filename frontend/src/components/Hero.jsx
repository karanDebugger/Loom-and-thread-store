import { ArrowRight } from "lucide-react";
import heroImage from "../assets/images/hero.jpg";

function Hero() {
  return (
    <section className="pt-24 min-h-screen bg-black text-white flex items-center">
      <div className="max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-20 items-center">

        {/* Left Content */}
        <div>
          <p className="uppercase tracking-[8px] text-gray-500 mb-6">
            Premium Collection
          </p>

          <h1 className="text-7xl font-extrabold leading-tight">
            Luxury
            <br />
            Redefined.
          </h1>

          <p className="text-gray-400 mt-8 text-xl leading-9 max-w-lg">
            Crafted for those who demand timeless elegance,
            premium fabrics, and luxury that speaks without words.
          </p>

          <button className="mt-12 bg-white text-black px-10 py-4 rounded-xl font-semibold flex items-center gap-3 hover:bg-gray-200 transition-all duration-300">
            Shop Now
            <ArrowRight size={22} />
          </button>
        </div>

        {/* Right Image */}
        <div className="flex justify-center">
          <img
            src={heroImage}
            alt="Luxury Fashion"
            className="w-[520px] h-[720px] object-cover rounded-[30px] shadow-2xl"
          />
        </div>

      </div>
    </section>
  );
}

export default Hero; 