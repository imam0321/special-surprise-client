import CallToAction from "@/components/modules/Home/CallToAction";
import Categories from "@/components/modules/Home/Categories";
import FeaturedSurprises from "@/components/modules/Home/FeaturedSurprises";
import Hero from "@/components/modules/Home/Hero";
import HowItWorks from "@/components/modules/Home/HowItWorks";
import { getAllCategories } from "@/services/product/categories";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home - Special Surprise Gift Store",
  description:
    "Discover amazing surprise gifts for your loved ones. Browse our collection of unique gifts, personalized surprises, and special occasions gifts.",
  keywords: [
    "surprise gifts",
    "special gifts",
    "personalized gifts",
    "gift store",
    "unique gifts",
  ],
  openGraph: {
    title: "Special Surprise Gift Store",
    description: "Discover amazing surprise gifts for your loved ones",
    type: "website",
  },
};

export const revalidate = 60;

export default async function HomePage() {
  const categories = await getAllCategories("");
  return (
    <>
      <Hero />
      <Categories categories={categories?.data} />
      <FeaturedSurprises />
      <HowItWorks />
      <CallToAction />
    </>
  );
}
