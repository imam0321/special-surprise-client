import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground text-center mb-12">
            Last updated: December 2024
          </p>
          <Accordion
            type="single"
            collapsible
            defaultValue="item-1"
            className="space-y-4"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger className="hover:underline-none">
                1. Information We Collect
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  We collect information you provide directly to us, including:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4">
                  <li>
                    Name, email address, phone number, and delivery address
                  </li>
                  <li>Payment information (processed securely)</li>
                  <li>Order details and preferences</li>
                  <li>Communications with customer support</li>
                  <li>Account information (if you create one)</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>
                2. How We Use Your Information
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground mb-4">
                  We use your information to:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Process and deliver your orders</li>
                  <li>Communicate about orders & services</li>
                  <li>Send promotional emails (with consent)</li>
                  <li>Improve our services and experience</li>
                  <li>Prevent fraud and ensure security</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>3. Information Sharing</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  We do not sell or rent your personal information. We only
                  share with:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4">
                  <li>Delivery partners</li>
                  <li>Payment processors</li>
                  <li>Service providers assisting operations</li>
                  <li>Law enforcement when required</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>4. Data Security</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  We use encryption, secure servers, and regular security audits
                  to protect your data.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>5. Cookies</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  We use cookies to improve browsing experience, analyze
                  traffic, and understand visitor behavior. You can control
                  cookies from browser settings.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
              <AccordionTrigger>6. Your Rights</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground mb-4">
                  You have the right to:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Access your data</li>
                  <li>Correct inaccurate information</li>
                  <li>Request data deletion</li>
                  <li>Opt-out of marketing</li>
                  <li>Withdraw consent anytime</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7">
              <AccordionTrigger>7. Contact Us</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  If you have any questions, contact us:
                </p>
                <ul className="text-muted-foreground mt-4 space-y-2">
                  <li>Email: privacy@specialsurprise.com</li>
                  <li>Phone: +880 1712-345678</li>
                  <li>
                    Address: 123 Surprise Street, Gulshan-2, Dhaka 1212,
                    Bangladesh
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
