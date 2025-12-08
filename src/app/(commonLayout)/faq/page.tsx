import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";
import Link from "next/link";

export default function FAQPage() {
  const faqs = [
    {
      category: "Orders & Delivery",
      questions: [
        {
          q: "How do I place an order?",
          a: "Simply browse our products, add items to your cart, and proceed to checkout. You'll need to provide delivery details and choose your preferred payment method.",
        },
        {
          q: "What areas do you deliver to?",
          a: "We currently deliver throughout Dhaka city and select areas of Bangladesh. For locations outside Dhaka, additional delivery charges may apply.",
        },
        {
          q: "How long does delivery take?",
          a: "Standard delivery takes 2-3 business days within Dhaka. Express delivery (same day) is available for orders placed before 12 PM for an additional fee.",
        },
        {
          q: "Can I schedule a specific delivery time?",
          a: "Yes! During checkout, you can select your preferred delivery date and time slot. We offer morning (9 AM - 12 PM), afternoon (12 PM - 5 PM), and evening (5 PM - 9 PM) slots.",
        },
        {
          q: "What if the recipient is not available?",
          a: "Our delivery partner will attempt to contact the recipient. If unavailable, we'll coordinate a redelivery. Please ensure the phone number provided is correct.",
        },
      ],
    },
    {
      category: "Payment",
      questions: [
        {
          q: "What payment methods do you accept?",
          a: "We accept bKash, Nagad, SSLCommerz (cards, mobile banking, net banking), and Cash on Delivery within Dhaka.",
        },
        {
          q: "Is online payment secure?",
          a: "Yes, all payments are processed through secure, encrypted payment gateways. We never store your card information on our servers.",
        },
        {
          q: "When will I be charged for my order?",
          a: "For online payments, you'll be charged immediately upon order confirmation. For COD orders, payment is collected at the time of delivery.",
        },
        {
          q: "Do you offer EMI options?",
          a: "Yes, EMI options are available through SSLCommerz for orders above ৳5,000 using supported bank cards.",
        },
      ],
    },
    {
      category: "Products & Customization",
      questions: [
        {
          q: "Can I customize my surprise package?",
          a: "Absolutely! Most of our packages can be customized. You can add personal messages, choose specific items, or request special arrangements.",
        },
        {
          q: "What if I want something not listed on your website?",
          a: "Contact us with your requirements! We love creating custom surprises and will do our best to accommodate your requests.",
        },
        {
          q: "Are the products in the images exactly what I'll receive?",
          a: "We strive to match our product images, but slight variations may occur due to seasonal availability or handmade elements.",
        },
        {
          q: "Can I see a sample before ordering?",
          a: "For large corporate orders or events, we can arrange sample viewing. Contact our team to schedule an appointment.",
        },
      ],
    },
    {
      category: "Cancellation & Refunds",
      questions: [
        {
          q: "How do I cancel my order?",
          a: "Orders can be canceled up to 24 hours before scheduled delivery through your account dashboard or by contacting customer support.",
        },
        {
          q: "What is your refund policy?",
          a: "Refunds are processed within 7-10 business days. For damaged items, please report within 24 hours of delivery with photos.",
        },
        {
          q: "What if my order arrives damaged?",
          a: "Contact us immediately with photos of the damaged items. We'll arrange a replacement or full refund.",
        },
        {
          q: "Can I exchange my order?",
          a: "Exchanges are possible for non-perishable items within 48 hours of delivery, subject to product availability.",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-4 bg-surprise-pink/10 rounded-full mb-4">
            <HelpCircle className="h-10 w-10 text-surprise-pink" />
          </div>
          <h1 className="text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Find answers to common questions about our services, orders, and
            policies.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {faqs.map((category, categoryIndex) => (
            <Card key={categoryIndex}>
              <CardHeader>
                <CardTitle className="text-xl text-surprise-purple">
                  {category.category}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {category.questions.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`item-${categoryIndex}-${index}`}
                    >
                      <AccordionTrigger className="text-left hover:text-surprise-pink">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12 p-8 bg-linear-to-r from-surprise-pink/10 to-surprise-purple/10 rounded-2xl">
          <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
          <p className="text-muted-foreground mb-6">
            Can&rsquo;t find what you&rsquo;re looking for? Our support team is
            here to help!
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
