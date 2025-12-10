import { CheckCircle, Package, Calendar, Gift } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: <Gift size={36} className="text-surprise-pink" />,
      title: "Choose a Surprise",
      description:
        "Browse our collection of surprise options and select the perfect one for your occasion.",
    },
    {
      icon: <Calendar size={36} className="text-surprise-purple" />,
      title: "Schedule Delivery",
      description:
        "Select the date and time you want the surprise to be delivered.",
    },
    {
      icon: <Package size={36} className="text-surprise-teal" />,
      title: "We Prepare & Deliver",
      description:
        "Our team prepares your surprise with care and delivers it at the scheduled time.",
    },
    {
      icon: <CheckCircle size={36} className="text-surprise-coral" />,
      title: "Create Memories",
      description:
        "Enjoy the moment as your loved ones experience the joy of your special surprise.",
    },
  ];
  return (
    <div id="how-it-works" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Creating the perfect surprise is easy with our simple four-step
            process.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 bg-surprise-purple/15 rounded-xl hover:bg-surprise-purple/20 transition-colors relative group"
            >
              {/* Connecting line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 left-full w-8 h-0.5 bg-muted-foreground/20 -translate-y-1/2 z-0 transform translate-x-[-50%]"></div>
              )}

              {/* Step number */}
              <div className="absolute -top-4 -left-2 bg-surprise-purple text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                {index + 1}
              </div>

              {/* Icon container */}
              <div className="bg-white p-4 rounded-full mb-6 shadow-md group-hover:shadow-lg transition-shadow">
                {step.icon}
              </div>

              <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
