import CallToAction from "@/components/modules/Home/CallToAction";
import Categories from "@/components/modules/Home/Categories";
import FeaturedSurprises from "@/components/modules/Home/FeaturedSurprises";
import Hero from "@/components/modules/Home/Hero";
import HowItWorks from "@/components/modules/Home/HowItWorks";
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

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Categories />
      <FeaturedSurprises />
      <HowItWorks />
      <CallToAction />
    </>
  );
}
