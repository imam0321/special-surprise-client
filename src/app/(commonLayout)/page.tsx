import CallToAction from "@/components/modules/Home/CallToAction";
import Categories from "@/components/modules/Home/Categories";
import FeaturedSurprises from "@/components/modules/Home/FeaturedSurprises";
import Hero from "@/components/modules/Home/Hero";
import HowItWorks from "@/components/modules/Home/HowItWorks";
import { getAllProduct } from "@/services/product/getAllProduct";

export default async function HomePage() {
  const surprises = await getAllProduct();
  console.log(surprises)
  return (
    <>
      <Hero />
      <Categories />
      <FeaturedSurprises surprises={surprises.data}/>
      <HowItWorks />
      <CallToAction />

    </>
  );
}
