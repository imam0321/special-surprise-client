import { Button } from "@/components/ui/button";
import { Truck, Gift, Package, Calendar, ShoppingCart } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { getAllProduct, getProductByCode } from "@/services/product/product";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/types/product.interface";

export default async function ProductDetailPage({
  params,
}: {
  params: { productCode: string };
}) {
  const { productCode } = await params;
  const { data: product } = await getProductByCode(productCode);

  if (!product) {
    return null;
  }
  const { data: surprises } = await getAllProduct({
    category: product?.category?.name,
  });
  console.log(surprises);
  console.log(product);
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
                <Link href={`/product/${product.productCode}/check-out`}>
                  Check Out
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

                    {/* <div className="space-y-6">
                      {product.items.map((review) => (
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
                          <div className="flex items-center mb-2">0</div>
                          <p>{review.comment}</p>
                        </div>
                      ))}
                    </div> */}
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
        </Card>

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
                  <div className="aspect-square overflow-hidden">
                    <Image
                      src={product.thumbnail}
                      alt={product.title}
                      width={200}
                      height={200}
                      className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                    />
                  </div>

                  {/* Content */}
                  <CardContent className="p-4">
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
                          <ShoppingCart size={16} className="mr-1" /> Buy
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
