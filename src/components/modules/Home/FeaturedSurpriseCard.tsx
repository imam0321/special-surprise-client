"use client";

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

interface FeaturedSurpriseCardProps {
  surprise: Product;
}

export default function FeaturedSurpriseCard({
  surprise,
}: FeaturedSurpriseCardProps) {
  const hasDiscount = surprise.discountedPrice && surprise.discountedPrice > 0;
  const hasLongDescription =
    surprise.description && surprise.description.length > 80;

  return (
    <Card className="group p-2 transition-all duration-300 overflow-hidden hover:shadow-xl hover:shadow-blue-400/10 rounded-sm">
      {/* Image Section */}
      <div className="relative">
        <div className="aspect-3/2 overflow-hidden w-full h-60 rounded-md">
          <Image
            src={surprise.thumbnail}
            fill
            alt={surprise.title}
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
          />
        </div>

        {/* Discount Badge */}
        {hasDiscount && (
          <Badge
            className="absolute top-3 right-3 bg-surprise-pink hover:bg-surprise-pink h-10 w-10 rounded-full flex items-center justify-center text-white font-semibold shadow-lg"
            aria-label={`${surprise.discountedPrice}% discount`}
          >
            {surprise.discountedPrice}%
          </Badge>
        )}

        {/* Heart Button */}
        <HeartButton />
      </div>

      {/* Title */}
      <CardHeader className="px-3 pt-4">
        <h3
          className="font-semibold text-lg line-clamp-1"
          title={surprise.title}
        >
          {surprise.title}
        </h3>
      </CardHeader>

      {/* Description */}
      <CardContent className="px-3 -mt-4">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {surprise.description}
        </p>

        {hasLongDescription && (
          <Link
            href={`/surprises/${surprise.productCode}`}
            className="text-surprise-purple hover:underline text-sm mt-1 inline-block"
            aria-label={`Read more about ${surprise.title}`}
          >
            see more
          </Link>
        )}
      </CardContent>

      {/* Footer */}
      <CardFooter className="flex justify-between items-center px-3 pb-4 mt-auto">
        <div
          className="font-bold text-lg"
          aria-label={`Price: ${surprise.price} Taka`}
        >
          ৳{surprise.price}
        </div>
        <Button
          size="sm"
          className="bg-surprise-purple hover:bg-surprise-purple/90 btn-bounce"
          asChild
        >
          <Link
            href={`/surprises/${surprise.productCode}`}
            aria-label={`View details of ${surprise.title}`}
          >
            View Details
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
