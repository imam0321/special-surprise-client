import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">
            Terms of Service
          </h1>
          <p className="text-muted-foreground text-center mb-12">
            Last updated: December 2024
          </p>

          <div className="space-y-8">
            <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>1. Acceptance of Terms</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  By accessing and using Special Surprise&rsquo;s website and
                  services, you accept and agree to be bound by these Terms of
                  Service. If you do not agree to these terms, please do not use
                  our services.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>2. Services Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Special Surprise provides surprise gift planning,
                  customization, and delivery services. Our services include but
                  are not limited to gift boxes, balloon arrangements, room
                  decorations, and personalized surprise packages.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>3. Orders and Payments</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>
                    All orders are subject to availability and confirmation
                  </li>
                  <li>
                    Prices are displayed in Bangladeshi Taka (BDT) and include
                    applicable taxes
                  </li>
                  <li>
                    Payment must be completed before order processing (except
                    Cash on Delivery)
                  </li>
                  <li>We accept SSLCommerz, and Cash on Delivery</li>
                  <li>Orders may be canceled if payment verification fails</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>4. Delivery Policy</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Delivery times are estimated and not guaranteed</li>
                  <li>
                    We deliver within Dhaka city and select areas of Bangladesh
                  </li>
                  <li>Additional charges may apply for remote locations</li>
                  <li>
                    The recipient must be available to receive the delivery
                  </li>
                  <li>
                    We are not responsible for delays due to unforeseen
                    circumstances
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>5. Cancellation and Refund</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>
                    Orders can be canceled up to 24 hours before scheduled
                    delivery
                  </li>
                  <li>Customized items may not be eligible for cancellation</li>
                  <li>Refunds will be processed within 7-10 business days</li>
                  <li>Delivery charges are non-refundable</li>
                  <li>
                    Damaged items must be reported within 24 hours of delivery
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>6. User Responsibilities</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  As a user, you agree to:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Provide accurate and complete information</li>
                  <li>Use our services for lawful purposes only</li>
                  <li>Not engage in fraudulent activities</li>
                  <li>Respect intellectual property rights</li>
                  <li>Not misuse or attempt to hack our systems</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>7. Limitation of Liability</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Special Surprise shall not be liable for any indirect,
                  incidental, or consequential damages arising from the use of
                  our services. Our maximum liability shall not exceed the
                  amount paid for the specific service in question.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>8. Changes to Terms</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We reserve the right to modify these terms at any time.
                  Changes will be effective immediately upon posting on our
                  website. Continued use of our services after changes
                  constitutes acceptance of the modified terms.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>9. Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  For questions regarding these Terms of Service, please contact
                  us at:
                </p>
                <ul className="text-muted-foreground mt-4 space-y-2">
                  <li>Email: legal@specialsurprise.com</li>
                  <li>Phone: +880 1712-345678</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
