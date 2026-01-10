import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import {
  Gift,
  Cake,
  Heart,
  Sparkles,
  Flower,
  Baby,
  Award,
  PartyPopper,
} from "lucide-react";
import { Category } from "@/types/product.interface";
import { JSX } from "react";

export default function Categories({ categories }: { categories: Category[] }) {
  const categoryIcons: Record<string, JSX.Element> = {
    Birthday: <Cake size={32} className="text-surprise-pink" />,
    Anniversary: <Heart size={32} className="text-red-500" />,
    Congratulations: <Award size={32} className="text-amber-500" />,
    Romance: <Flower size={32} className="text-surprise-purple" />,
    "Baby Shower": <Baby size={32} className="text-blue-400" />,
    Festivals: <PartyPopper size={32} className="text-green-500" />,
    "Just Because": <Sparkles size={32} className="text-surprise-teal" />,
    Custom: <Gift size={32} className="text-surprise-coral" />,
  };

  const categoryColors: Record<string, string> = {
    Birthday: "bg-surprise-pink/10 hover:bg-surprise-pink/20",
    Anniversary: "bg-red-100 hover:bg-red-200",
    Congratulations: "bg-amber-100 hover:bg-amber-200",
    Romance: "bg-surprise-purple/10 hover:bg-surprise-purple/20",
    "Baby Shower": "bg-blue-100 hover:bg-blue-200",
    Festivals: "bg-green-100 hover:bg-green-200",
    "Just Because": "bg-teal-100 hover:bg-teal-200",
    Custom: "bg-surprise-coral/10 hover:bg-surprise-coral/20",
  };

  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Browse by Occasion
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find the perfect surprise for any occasion. We offer a wide range of
            options for every special moment.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {categories && categories.map((category, index) => (
            <Link href={`/surprises?category=${category.name}`} key={index}>
              <Card
                className={`border-none shadow-sm hover:shadow-md transition-shadow ${
                  categoryColors[category.name] || "bg-gray-100"
                } h-full`}
              >
                <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                  <div className="bg-white rounded-full p-3 shadow-sm mb-4">
                    {categoryIcons[category.name] || <Gift size={32} />}
                  </div>
                  <h3 className="font-semibold md:text-lg text-sm mb-1">
                    {category.name}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {category?._count?.products ?? 0} surprises
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
