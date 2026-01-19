import { getAllProduct } from "@/services/product/product";
import FeaturedSurpriseCard from "./FeaturedSurpriseCard";
import { Product } from "@/types/product.interface";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function FeaturedSurprises() {
  const { data: surprises } = await getAllProduct();
  if (!surprises) {
    return
  }
  
  return (
    <section className="bg-linear-to-b from-background to-accent/30 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured Surprises
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our most popular surprise options loved by customers.
            Perfect for any occasion and guaranteed to bring joy.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {surprises &&
            surprises
              .slice(0, 4)
              .map((surprise: Product) => (
                <FeaturedSurpriseCard key={surprise.id} surprise={surprise} />
              ))}
        </div>

        <div className="text-center mt-6">
          <Button
            variant="outline"
            className="border-surprise-purple text-surprise-purple hover:bg-surprise-purple/10 btn-bounce"
            asChild
          >
            <Link href="/surprises">View All Surprises</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
