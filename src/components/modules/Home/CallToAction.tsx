import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CallToAction() {
  return (
    <div className="bg-linear-to-r from-surprise-pink to-surprise-purple py-20 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Create a Special Moment?
        </h2>
        <p className="text-white/80 max-w-2xl mx-auto mb-8 text-lg">
          Start planning your perfect surprise today and make unforgettable
          memories with your loved ones.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            size="lg"
            className="bg-white text-surprise-purple hover:bg-white/90 btn-bounce"
            asChild
          >
            <Link href="/surprise" className="flex items-center">
              Browse Surprises <ArrowRight size={16} className="ml-2" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white text-white bg-white/30 hover:bg-white/20 btn-bounce"
          >
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
