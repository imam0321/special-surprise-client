import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Have questions or need help planning the perfect surprise?
            We&rsquo;re here to help!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card className="bg-surprise-purple/20 hover:bg-surprise-purple/20">
            <CardHeader className="mb-2">
              <CardTitle>Send us a Message</CardTitle>
              <CardDescription>
                Fill out the form and we&rsquo;ll respond within 24 hours
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      className="border-white"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      className="border-white"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    placeholder="+880 1XXX-XXXXXX"
                    className="border-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="How can we help?"
                    className="border-white"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us more about your inquiry..."
                    rows={5}
                    className="h-36 border-white"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-linear-to-r from-surprise-pink to-surprise-purple hover:opacity-90"
                >
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-2">
            <Card className="bg-blue-100 hover:bg-blue-200">
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className="bg-surprise-pink/10 p-3 rounded-lg">
                    <Phone className="h-6 w-6 text-surprise-pink" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Phone</h3>
                    <p className="text-muted-foreground">+880 1712-345678</p>
                    <p className="text-muted-foreground">+880 1812-345678</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-green-100 hover:bg-green-200">
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className="bg-surprise-purple/10 p-3 rounded-lg">
                    <Mail className="h-6 w-6 text-surprise-purple" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-muted-foreground">
                      info@specialsurprise.com
                    </p>
                    <p className="text-muted-foreground">
                      support@specialsurprise.com
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-teal-100 hover:bg-teal-200">
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <MapPin className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Address</h3>
                    <p className="text-muted-foreground">
                      123 Surprise Street, Gulshan-2
                      <br />
                      Dhaka 1212, Bangladesh
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-surprise-coral/10 hover:bg-surprise-coral/20">
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className="bg-amber-100 p-3 rounded-lg">
                    <Clock className="h-6 w-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Business Hours</h3>
                    <p className="text-muted-foreground">
                      Saturday - Thursday: 10:00 AM - 8:00 PM
                    </p>
                    <p className="text-muted-foreground">Friday: Closed</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
