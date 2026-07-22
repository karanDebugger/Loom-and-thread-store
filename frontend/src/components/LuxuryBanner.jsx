import { ArrowRight } from "lucide-react";

function LuxuryBanner() {
  return (
    <section className="bg-[#080808] py-28">
      <div className="max-w-7xl mx-auto px-6">

        <div className="relative overflow-hidden rounded-[40px]">

          <img
            src="https://images.unsplash.com/photo-1496747611176-843222e1e57f?w=1600"
            alt=""
            className="w-full h-[650px] object-cover brightness-50"
          />

          <div className="absolute inset-0 flex items-center">

            <div className="max-w-xl ml-16">

              <p className="uppercase tracking-[8px] text-gray-300 mb-5">
                Summer 2026
              </p>

              <h2 className="text-white text-6xl font-bold leading-tight">
                Redefining
                <br />
                Modern Luxury.
              </h2>

              <p className="text-gray-300 mt-8 text-lg leading-8">
                Every collection tells a story.
                Crafted with precision.
                Designed for confidence.
              </p>

              <button className="mt-10 bg-white text-black px-8 py-4 rounded-full flex items-center gap-3 font-semibold hover:scale-105 duration-300">

                Explore Collection

                <ArrowRight />

              </button>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default LuxuryBanner; 