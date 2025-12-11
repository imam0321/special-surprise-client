import { Product } from "@/types/product.interface";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import HeartButton from "@/components/shared/HeartButton";
import Link from "next/link";

export default function SurpriseCard({ surprise }: { surprise: Product }) {
  return (
    <Card className="group p-2 transition-all duration-300 overflow-hidden hover:shadow-xl hover:shadow-blue-400/10 rounded-sm">
      <div className="relative">
        <div className="aspect-3/2 overflow-hidden w-full h-56 rounded-md">
          <Image
            src={surprise.thumbnail}
            fill
            alt={surprise.title}
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* Discount Badge - only show if there's a discount */}
        {surprise.discountedPrice && surprise.discountedPrice > 0 && (
          <Badge className="absolute top-3 right-3 bg-surprise-pink hover:bg-surprise-pink h-10 w-10 rounded-full flex items-center justify-center text-white font-semibold shadow-lg">
            {surprise.discountedPrice}%
          </Badge>
        )}
        
        <HeartButton />
      </div>

      <CardHeader className="px-3 pt-4">
        <h3 className="font-semibold text-lg line-clamp-1">
          {surprise.title}
        </h3>
      </CardHeader>

      <CardContent className="px-3 -mt-6 space-y-3">
        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-3">
          {surprise.description || "No description available."}
          {surprise.description && surprise.description.length > 80 && (
            <Link
              href={`/surprises/${surprise.productCode}`}
              className="text-surprise-purple hover:underline ml-1"
            >
              see more
            </Link>
          )}
        </p>

        {/* Price and Category */}
        <div className="flex justify-between items-center">
          <div className="font-bold text-lg">৳{surprise.price}</div>
          {surprise.category?.name && (
            <Badge className="bg-surprise-pink hover:bg-surprise-pink/90">
              {surprise.category.name}
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="px-3 pb-4 mt-auto">
        <Button
          size="sm"
          className="bg-surprise-purple hover:bg-surprise-purple/90 btn-bounce w-full"
          asChild
        >
          <Link href={`/surprises/${surprise.productCode}`}>
            View Details
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}