import { Button } from "@/components/ui/button";
import { Truck, Gift, Package, Calendar, ShoppingCart } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { getAllProduct, getProductByCode } from "@/services/product/product";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import RecommendProduct from "@/components/modules/Products/RecommendProduct";

const reviews = [
  {
    id: 1,
    user: "Alice",
    date: "2025-12-10",
    comment: "Amazing product! Highly recommend.",
  },
  {
    id: 2,
    user: "Bob",
    date: "2025-12-09",
    comment: "Good quality, but delivery was slow.",
  },
  {
    id: 3,
    user: "Charlie",
    date: "2025-12-08",
    comment: "Not satisfied, expected better packaging.",
  },
  {
    id: 4,
    user: "Diana",
    date: "2025-12-07",
    comment: "Value for money. Will buy again.",
  },
];

export default async function ProductDetailPage({
  params,
}: {
  params: { productCode: string };
}) {
  const { productCode } = await params;
  const { data: product } = await getProductByCode(productCode);
  const { data: surprises } = await getAllProduct({
    category: product?.category?.name,
  });

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 items-center">
          {/* Product Images */}
          <div>
            <div className="lg:h-[500px] h-[250px] overflow-hidden rounded-lg relative">
              <Image
                src={product?.thumbnail}
                alt={product?.title}
                fill
                loading="eager"
                priority
                className="object-cover"
                sizes="(max-width: 640px) 100vw,(max-width: 1024px) 50vw,25vw"
              />
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold mb-2">{product?.title}</h1>
            <p className="text-muted-foreground mb-6">{product?.description}</p>
            <div className="space-y-4 mb-6">
              <div className="text-2xl font-bold">৳ {product?.price}</div>
              <div className="flex justify-start items-center gap-x-2 mb-6">
                <Badge className="bg-surprise-purple hover:bg-surprise-purple/90">
                  {product.category.name}
                </Badge>
                <div className="font-bold">Code: {product?.productCode}</div>
              </div>

              <div className="flex items-center">
                <Truck size={20} className="text-surprise-pink mr-2" />
                <span>Delivery On Time</span>
              </div>
              <div className="flex items-center">
                <Gift size={20} className="text-surprise-pink mr-2" />
                <span>Free gift wrapping</span>
              </div>
              <div className="flex items-center">
                <Package size={20} className="text-surprise-pink mr-2" />
                <span>Discreet packaging</span>
              </div>
              <div className="flex items-center">
                <Calendar size={20} className="text-surprise-pink mr-2" />
                <span>Schedule delivery for a specific date</span>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <Button
                className="bg-linear-to-r from-surprise-pink to-surprise-purple hover:opacity-90 flex-1"
                asChild
              >
                <Link href={`/product/check-out/${product.productCode}`}>
                  <ShoppingCart size={16} className="mr-1" /> Check Out
                </Link>
              </Button>
            </div>
          </div>
        </div>
        {/* Product Details Tabs */}
        <Card className="mb-10">
          <CardContent className="p-0">
            <Tabs defaultValue="features">
              <TabsList className="bg-muted/50 w-full grid grid-cols-3">
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              <div className="p-6">
                <TabsContent value="features">
                  <h3 className="text-lg font-medium mb-4">Package Features</h3>
                  <ul className="space-y-2">
                    {product.items.map((feature: string, index: number) => (
                      <li key={index} className="flex items-center">
                        <div className="mr-2 h-2 w-2 rounded-full bg-surprise-pink"></div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </TabsContent>
                <TabsContent value="reviews">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-medium">Customer Reviews</h3>
                      <Button>Write a Review</Button>
                    </div>

                    <div className="space-y-6">
                      {reviews.map((review) => (
                        <div
                          key={review.id}
                          className="border-b border-border pb-4 last:border-0"
                        >
                          <div className="flex justify-between mb-2">
                            <span className="font-medium">{review.user}</span>
                            <span className="text-sm text-muted-foreground">
                              {review.date}
                            </span>
                          </div>
                          <p>{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
        </Card>
        <RecommendProduct surprises={surprises} />
      </div>
    </div>
  );
}
