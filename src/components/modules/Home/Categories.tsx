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

export default function Categories() {
  const categories = [
    {
      icon: <Cake size={32} className="text-surprise-pink" />,
      name: "Birthday",
      count: 24,
      color: "bg-surprise-pink/10 hover:bg-surprise-pink/20",
    },
    {
      icon: <Heart size={32} className="text-red-500" />,
      name: "Anniversary",
      count: 18,
      color: "bg-red-100 hover:bg-red-200",
    },
    {
      icon: <Award size={32} className="text-amber-500" />,
      name: "Congratulations",
      count: 12,
      color: "bg-amber-100 hover:bg-amber-200",
    },
    {
      icon: <Flower size={32} className="text-surprise-purple" />,
      name: "Romance",
      count: 15,
      color: "bg-surprise-purple/10 hover:bg-surprise-purple/20",
    },
    {
      icon: <Baby size={32} className="text-blue-400" />,
      name: "Baby Shower",
      count: 9,
      color: "bg-blue-100 hover:bg-blue-200",
    },
    {
      icon: <PartyPopper size={32} className="text-green-500" />,
      name: "Festivals",
      count: 14,
      color: "bg-green-100 hover:bg-green-200",
    },
    {
      icon: <Sparkles size={32} className="text-surprise-teal" />,
      name: "Just Because",
      count: 21,
      color: "bg-teal-100 hover:bg-teal-200",
    },
    {
      icon: <Gift size={32} className="text-surprise-coral" />,
      name: "Custom",
      count: 30,
      color: "bg-surprise-coral/10 hover:bg-surprise-coral/20",
    },
  ];
  
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
          {categories.map((category, index) => (
            <Link href={`/surprises/category/${category.name.toLowerCase()}`} key={index}>
              <Card
                className={`border-none shadow-sm hover:shadow-md transition-shadow ${category.color} h-full`}
              >
                <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                  <div className="bg-white rounded-full p-3 shadow-sm mb-4">
                    {category.icon}
                  </div>
                  <h3 className="font-semibold md:text-lg text-sm mb-1">
                    {category.name}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {category.count} surprises
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
