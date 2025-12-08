import CallToAction from "@/components/modules/Home/CallToAction";
import Categories from "@/components/modules/Home/Categories";
import Hero from "@/components/modules/Home/Hero";
import HowItWorks from "@/components/modules/Home/HowItWorks";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Categories />
      <HowItWorks />
      <CallToAction />
    </>
  );
}
