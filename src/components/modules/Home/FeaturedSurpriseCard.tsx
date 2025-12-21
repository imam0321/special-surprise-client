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
    <Card className="group flex flex-col h-full -p-2 transition-all duration-300 overflow-hidden hover:shadow-xl hover:shadow-blue-400/10 rounded-sm">
      {/* Image Section */}
      <div className="relative shrink-0 w-full h-[200px] overflow-hidden">
        <Image
          src={surprise.thumbnail || "/images/hero-cover.PNG"}
          fill
          alt={surprise.title}
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
        />

        {/* Discount Badge */}
        {hasDiscount && (
          <Badge className="absolute top-3 right-3 bg-surprise-pink hover:bg-surprise-pink h-10 w-10 rounded-full flex items-center justify-center text-white font-semibold shadow-lg">
            {surprise.discountedPrice}%
          </Badge>
        )}

        {/* Heart Button */}
        <HeartButton />
      </div>

      {/* Title */}
      <CardHeader className="px-3 pt-0 shrink-0">
        <h3 className="font-semibold text-lg line-clamp-1">{surprise.title}</h3>
      </CardHeader>

      {/* Description */}
      <CardContent className="px-3 -mt-4 flex-1 flex flex-col">
        <p className="text-sm text-muted-foreground">
          {hasLongDescription
            ? surprise.description.slice(0, 80)
            : surprise.description}
          {hasLongDescription && (
            <Link
              href={`/surprises/${surprise.productCode}`}
              className="text-surprise-purple underline text-sm ml-1"
            >
              see more
            </Link>
          )}
        </p>
      </CardContent>

      {/* Footer */}
      <CardFooter className="flex justify-between items-center px-3 pb-4 mt-auto shrink-0">
        <div className="font-bold text-lg">৳{surprise.price}</div>
        <Button
          size="sm"
          className="bg-surprise-purple hover:bg-surprise-purple/90 btn-bounce"
          asChild
        >
          <Link href={`/surprises/${surprise.productCode}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
