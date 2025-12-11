import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@/types/product.interface";
import Image from "next/image";
import Link from "next/link";

export default function RecommendSurprises({
  surprises,
}: {
  surprises: Product[];
}) {
  return (
    <div>
      <h3 className="text-2xl font-bold mb-6">You May Also Like</h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {surprises &&
          surprises.slice(0, 4)?.map((product: Product) => (
            <Card
              key={product.id}
              className="overflow-hidden -p-2 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
            >
              {/* Image */}
              <div className="aspect-square h-60 overflow-hidden">
                <Image
                  src={product.thumbnail}
                  alt={product.title}
                  width={200}
                  height={200}
                  className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                />
              </div>

              {/* Content */}
              <CardContent className="p-2">
                <h4 className="font-semibold text-base mb-1 line-clamp-1">
                  {product.title}
                </h4>

                <p className="text-sm text-gray-500 mb-2">
                  {product?.category?.name}
                </p>

                <div className="flex justify-between items-center">
                  <div className="font-bold text-lg text-primary">
                    ৳ {product?.price}
                  </div>
                  <Button
                    size="sm"
                    className="bg-surprise-purple hover:bg-surprise-purple/90 btn-bounce"
                    asChild
                  >
                    <Link href={`/product/${product.productCode}`}>
                      View Details
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
}
