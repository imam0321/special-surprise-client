import { Product } from "@/types/product.interface";
import { ShoppingCart } from "lucide-react";
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

export default function FeaturedSurpriseCard({
  surprise,
}: {
  surprise: Product;
}) {
  return (
    <Card className="group -p-2 transition-all duration-300 overflow-hidden hover:shadow-xl hover:shadow-blue-400/10 rounded-sm">
      <div className="relative">
        <div className="aspect-3/2 overflow-hidden w-full h-36 md:h-52 lg:h-60">
          <Image
            src={surprise?.thumbnail}
            fill
            alt={surprise?.title}
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        <Badge className="absolute top-3 right-3 bg-surprise-pink hover:bg-surprise-pink">
          Popular
        </Badge>
        <HeartButton />
      </div>

      <CardHeader className="px-3">
        <h3 className="font-semibold text-lg">
          {surprise?.title.length > 26
            ? surprise?.title.slice(0, 26) + ".."
            : surprise?.title}
        </h3>
        <div className="flex justify-between items-start"></div>
      </CardHeader>

      <CardContent className="px-3 -mt-4">
        <p className="text-sm text-muted-foreground">
          {surprise?.description
            ? surprise?.description.length > 80
              ? `${surprise?.description.slice(0, 80)}... `
              : surprise?.description
            : "No description available."}
          {surprise?.description && surprise?.description.length > 80 && (
            <span className="text-surprise-purple cursor-pointer">
              see more
            </span>
          )}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between items-center px-3 pb-4 mt-auto">
        <div className="font-bold">৳{surprise?.price}</div>
        <Button
          size="sm"
          className="bg-surprise-purple hover:bg-surprise-purple/90 btn-bounce"
          asChild
        >
          <Link href={`/product/${surprise.productCode}`}>
            <ShoppingCart size={16} className="mr-1" /> Buy
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
