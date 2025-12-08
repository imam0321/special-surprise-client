import { Card, CardContent } from "@/components/ui/card";
import { Gift, Heart, Users, Star, Award, Target } from "lucide-react";
import Image from "next/image";

export default function AboutUsPage() {
  const stats = [
    { label: "Happy Customers", value: "10,000+", icon: Users },
    { label: "Surprises Delivered", value: "25,000+", icon: Gift },
    { label: "5-Star Reviews", value: "4,500+", icon: Star },
    { label: "Years of Experience", value: "5+", icon: Award },
  ];

  const team = [
    {
      name: "Rahul Ahmed",
      role: "Founder & CEO",
      image: "/images/members/member-1.avif",
    },
    {
      name: "Fatima Khan",
      role: "Creative Director",
      image: "/images/members/member-2.avif",
    },
    {
      name: "Karim Hassan",
      role: "Operations Manager",
      image: "/images/members/member-3.avif",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-linear-to-r from-surprise-pink/10 to-surprise-purple/10 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About Special Surprise
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We&rsquo;re passionate about creating unforgettable moments and
            bringing joy to people&rsquo;s lives through thoughtfully curated
            surprises.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Our Story */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-muted-foreground mb-4">
                Special Surprise was born out of a simple idea: everyone
                deserves to feel special. Founded in 2019, we started as a small
                team with big dreams of transforming how people celebrate
                life&rsquo;s precious moments.
              </p>
              <p className="text-muted-foreground mb-4">
                What began as a local gift delivery service in Dhaka has grown
                into Bangladesh&rsquo;s most trusted surprise planning platform.
                We&rsquo;ve helped thousands of families, friends, and couples
                create memories that last a lifetime.
              </p>
              <p className="text-muted-foreground">
                Today, we offer a wide range of surprise packages, from intimate
                celebrations to grand gestures, all designed with love,
                creativity, and attention to detail.
              </p>
            </div>
            <div className="bg-linear-to-br from-surprise-pink/20 to-surprise-purple/20 rounded-2xl p-8">
              <div className="aspect-video bg-white/50 rounded-lg flex items-center justify-center">
                <Gift className="h-20 w-20 text-surprise-pink" />
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:gap-6 gap-4">
            {stats.map((stat, index) => (
              <Card key={index} className="">
                <CardContent className="p-6 text-center">
                  <stat.icon className="h-10 w-10 mx-auto mb-3 text-surprise-pink" />
                  <p className="lg:text-3xl text-xl font-bold text-surprise-purple">
                    {stat.value}
                  </p>
                  <p className="text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-linear-to-br from-surprise-pink/5 to-surprise-pink/10">
              <CardContent className="p-8">
                <Target className="h-12 w-12 text-surprise-pink mb-4" />
                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                <p className="text-muted-foreground">
                  To make every celebration extraordinary by delivering
                  personalized, memorable surprises that strengthen bonds and
                  create lasting happiness.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-linear-to-br from-surprise-purple/5 to-surprise-purple/10">
              <CardContent className="p-8">
                <Heart className="h-12 w-12 text-surprise-purple mb-4" />
                <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                <p className="text-muted-foreground">
                  To become the most loved surprise and celebration platform in
                  South Asia, known for exceptional quality, creativity, and
                  customer satisfaction.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Team */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-10">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center ">
                <CardContent className="p-6">
                  <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
                    <Image
                      height={200}
                      width={200}
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <p className="text-muted-foreground">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
