import { Button } from "@/components/ui/button";
import { ArrowRight, Gift, Heart } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-linear-to-br from-accent via-background to-background">
      <div className="absolute top-20 right-20 animate-float opacity-20">
        <Gift size={80} className="text-surprise-purple" />
      </div>
      <div
        className="absolute bottom-20 left-10 animate-float opacity-20"
        style={{ animationDelay: "1s" }}
      >
        <Heart size={60} className="text-surprise-pink" />
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-12 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Make Someones Day{" "}
              <span className="gradient-text font-display">Special</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 text-muted-foreground">
              Surprise your loved ones with unique, personalized gifts delivered
              at the perfect moment. Create unforgettable memories with our
              special surprise services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-linear-to-r from-surprise-pink to-surprise-purple hover:opacity-90 btn-bounce"
              >
                Browse Surprises <ArrowRight size={16} className="ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-surprise-purple text-surprise-purple hover:bg-surprise-purple/10 btn-bounce"
              >
                How It Works
              </Button>
            </div>
          </div>

          <div className="md:w-1/2 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-4 rounded-full bg-linear-to-r from-surprise-pink to-surprise-purple opacity-30 blur-xl animate-pulse"></div>
              <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden border border-muted animate-bounce-slight">
                <div className="aspect-4/3 max-w-lg overflow-hidden">
                  <div className="w-full h-full">
                    <Image
                      height={600}
                      width={600}
                      src="/images/hero-cover.PNG"
                      alt="Surprise gift box"
                      className=" object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
