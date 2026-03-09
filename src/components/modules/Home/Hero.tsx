import { Button } from "@/components/ui/button";
import { ArrowRight, Gift, Heart, Sparkles, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden min-h-[60vh] flex items-center">
      {/* Background gradient blobs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-orange-200/40 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-100/60 rounded-full blur-3xl" />
        <div className="absolute top-1/4 right-0 w-[300px] h-[300px] bg-orange-300/30 rounded-full blur-3xl" />
      </div>

      {/* Floating decorative icons */}
      <div className="absolute top-16 left-[8%] animate-float opacity-30">
        <Gift size={36} className="text-orange-500" />
      </div>
      <div
        className="absolute top-24 right-[10%] animate-float opacity-25"
        style={{ animationDelay: "1.2s" }}
      >
        <Star size={28} className="text-orange-400 fill-orange-400" />
      </div>
      <div
        className="absolute bottom-24 left-[12%] animate-float opacity-25"
        style={{ animationDelay: "0.6s" }}
      >
        <Heart size={30} className="text-orange-500 fill-orange-400" />
      </div>
      <div
        className="absolute bottom-16 right-[14%] animate-float opacity-20"
        style={{ animationDelay: "2s" }}
      >
        <Sparkles size={32} className="text-orange-400" />
      </div>

      <div className="container mx-auto px-4 py-20 md:py-28">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* Left: Text Content */}
          <div className="lg:w-1/2 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 rounded-full px-4 py-1.5 text-sm font-semibold mb-6">
              <Sparkles size={14} />
              <span>Premium Gift Experience</span>
            </div>

            <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold leading-tight mb-5 text-foreground">
              Make Someone&apos;s Day{" "}
              <span className="relative inline-block">
                <span className="gradient-text font-display">Truly Special</span>
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 200 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 6 Q50 2 100 5 Q150 8 198 3"
                    stroke="#ff8c00"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    fill="none"
                    opacity="0.6"
                  />
                </svg>
              </span>
            </h1>

            <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Surprise your loved ones with unique, personalized gifts delivered
              at the perfect moment. Create unforgettable memories they&apos;ll
              cherish forever.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white btn-bounce shadow-lg shadow-orange-300/40 px-7"
                asChild
              >
                <Link href="/surprises" className="flex items-center gap-2">
                  Browse Surprises <ArrowRight size={16} />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10 btn-bounce px-7"
                asChild
              >
                <Link href="#how-it-works">How It Works</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6">
              {[
                { value: "10k+", label: "Happy Customers" },
                { value: "500+", label: "Gift Options" },
                { value: "4.9★", label: "Avg. Rating" },
              ].map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <p className="text-2xl font-bold text-primary">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Image */}
          <div className="lg:w-1/2 flex justify-center relative">
            {/* Outer glow ring */}
            <div className="absolute -inset-6 rounded-full bg-gradient-to-br from-orange-300/30 to-orange-100/10 blur-2xl" />

            {/* Rotating dashed ring */}
            <div className="absolute inset-0 m-auto w-[340px] h-[340px] md:w-[420px] md:h-[420px] rounded-full border-2 border-dashed border-orange-300/50 animate-[spin_20s_linear_infinite]" />

            {/* Image card */}
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl shadow-orange-200/60 border border-orange-100 animate-bounce-slight bg-white">
              <Image
                height={520}
                width={520}
                src="/images/special-surprise-logo.png"
                alt="Special Surprise gift experience"
                className="object-cover w-full h-full"
                loading="eager"
                sizes="(max-width: 768px) 80vw, 45vw"
              />
              {/* Overlay shimmer */}
              <div className="absolute inset-0 bg-gradient-to-t from-orange-500/10 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Floating badge – top left of image */}
            <div className="absolute top-6 -left-4 z-20 bg-white rounded-2xl shadow-lg px-4 py-2 flex items-center gap-2 border border-orange-100">
              <Heart size={16} className="text-orange-500 fill-orange-400" />
              <span className="text-xs font-semibold text-foreground whitespace-nowrap">
                Made with love
              </span>
            </div>

            {/* Floating badge – bottom right of image */}
            <div className="absolute bottom-6 -right-4 z-20 bg-white rounded-2xl shadow-lg px-4 py-2 flex items-center gap-2 border border-orange-100">
              <Gift size={16} className="text-orange-500" />
              <span className="text-xs font-semibold text-foreground whitespace-nowrap">
                500+ Gifts
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
