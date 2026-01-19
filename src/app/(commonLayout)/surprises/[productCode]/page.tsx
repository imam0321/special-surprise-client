import { Button } from "@/components/ui/button";
import { Truck, Gift, Package, Calendar, ShoppingCart } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { getProductByCode } from "@/services/product/product";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Suspense } from "react";
import SurpriseDetailsRecommendation from "@/components/modules/Surprises/SurpriseDetailsRecommendation";
import SurprisesLoading from "@/components/modules/Surprises/SurprisesLoading";

export default async function SurpriseDetailPage({
  params,
}: {
  params: Promise<{ productCode: string }>;
}) {
  const { productCode } = await params;
  const { data: product } = await getProductByCode(productCode);

  /*
  const { data: surprises } = await getAllProduct(
    `category=${product?.category?.name}`
  );
  */

  if (!product) {
    return <div className="container mx-auto py-10 text-center text-xl font-bold">Product not found</div>;
  }

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
                  {product?.category?.name}
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
                <Link href={`/surprises/${product?.productCode}/check-out`}>
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
              </TabsList>
              <div className="p-6">
                <TabsContent value="features">
                  <h3 className="text-lg font-medium mb-4">Package Features</h3>
                  <ul className="space-y-2">
                    {product?.items.map((feature: string, index: number) => (
                      <li key={index} className="flex items-center">
                        <div className="mr-2 h-2 w-2 rounded-full bg-surprise-pink"></div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
        </Card>

        <Suspense fallback={<SurprisesLoading />}>
          {product?.category?.name && (
            <SurpriseDetailsRecommendation categoryName={product.category.name} />
          )}
        </Suspense>
      </div>
    </div>
  );
}
