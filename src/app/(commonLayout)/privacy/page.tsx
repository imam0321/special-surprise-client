import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function PrivacyPage() {
  const sections = [
    {
      title: "Information We Collect",
      points: [
        "Name, email address, phone number, and delivery address",
        "Payment information (processed securely through payment gateways)",
        "Order details and preferences",
        "Communications with our customer support team",
        "Account information if you create an account",
      ],
    },
    {
      title: "How We Use Your Information",
      points: [
        "Process and deliver your orders",
        "Communicate with you about your orders and services",
        "Send promotional emails (with your consent)",
        "Improve our services and customer experience",
        "Prevent fraud and maintain security",
      ],
    },
    {
      title: "Information Sharing",
      points: [
        "Delivery partners to fulfill your orders",
        "Payment processors for secure transactions",
        "Service providers who assist our operations",
        "Law enforcement when required by law",
      ],
    },
    {
      title: "Data Security",
      desc: "We use encryption, secure servers, and regular audits to protect your personal information from unauthorized access, alteration, or disclosure.",
    },
    {
      title: "Cookies",
      desc: "We use cookies to enhance your browsing experience, analyze site traffic, and understand visitor behavior. You can adjust cookie preferences in your browser.",
    },
    {
      title: "Your Rights",
      points: [
        "Access your personal information",
        "Correct inaccurate information",
        "Request deletion of your data",
        "Opt-out of marketing communications",
        "Withdraw consent at any time",
      ],
    },
    {
      title: "Contact Us",
      desc: (
        <>
          If you have any questions about this Privacy Policy:
          <ul className="mt-4 space-y-2">
            <li>Email: privacy@specialsurprise.com</li>
            <li>Phone: +880 1712-345678</li>
            <li>Address: 123 Surprise Street, Gulshan-2, Dhaka 1212</li>
          </ul>
        </>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-4 bg-surprise-pink/10 rounded-full mb-4">
            <ShieldCheck className="h-10 w-10 text-surprise-pink" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Last updated: December 2024
          </p>
        </div>
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-xl text-surprise-purple">
              Privacy & Data Protection
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion
              type="single"
              collapsible
              defaultValue="item-0"
              className="w-full"
            >
              {sections.map((section, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border-b"
                >
                  <AccordionTrigger className="text-left hover:text-surprise-pink">
                    {index + 1}. {section.title}
                  </AccordionTrigger>

                  <AccordionContent className="text-muted-foreground">
                    {section.points && (
                      <ul className="list-disc list-inside space-y-2 mt-2">
                        {section.points.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    )}

                    {section.desc && <p className="mt-2">{section.desc}</p>}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        <div className="text-center mt-12 p-8 bg-linear-to-r from-surprise-pink/10 to-surprise-purple/10 rounded-2xl">
          <h2 className="text-2xl font-bold mb-4">Need more information?</h2>
          <p className="text-muted-foreground mb-6">
            If you still have concerns about your privacy or data usage, feel
            free to contact us anytime.
          </p>

          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 bg-linear-to-r from-surprise-pink to-surprise-purple text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
