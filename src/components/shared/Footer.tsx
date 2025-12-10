import {
  Facebook,
  Gift,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";

export default function Footer() {
  return (
    <footer className="bg-card text-card-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Gift className="h-6 w-6 text-surprise-pink" />
              <span className="font-display text-xl gradient-text">
                Special Surprise
              </span>
            </div>
            <p className="text-muted-foreground mb-4">
              Creating memorable moments through unique surprise experiences. We
              specialize in customized gifts and surprises for all occasions.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://facebook.com/specialsurprise49"
                className="text-muted-foreground hover:text-surprise-pink transition-colors"
              >
                <Facebook size={20} />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-surprise-pink transition-colors"
              >
                <Instagram size={20} />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-surprise-pink transition-colors"
              >
                <Twitter size={20} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/surprises"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Our Surprises
                </Link>
              </li>
              <li>
                <Link
                  href="#how-it-works"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  href="/testimonials"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Testimonials
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Phone size={18} className="mr-2 text-surprise-pink mt-1" />
                <span className="text-muted-foreground">+880 1712-345678</span>
              </li>
              <li className="flex items-start">
                <Mail size={18} className="mr-2 text-surprise-pink mt-1" />
                <span className="text-muted-foreground">
                  info@specialsurprise.com
                </span>
              </li>
              <li className="flex items-start">
                <MapPin
                  size={18}
                  className="mr-2 text-surprise-pink mt-1 shrink-0"
                />
                <span className="text-muted-foreground">
                  123 Surprise Street, Gulshan, Dhaka, Bangladesh
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-bold text-lg mb-4">Subscribe</h3>
            <p className="text-muted-foreground mb-4">
              Subscribe to our newsletter for special deals and updates.
            </p>
            <div className="flex space-x-2">
              <Input
                type="email"
                placeholder="Your email"
                className="bg-white"
              />
              <Button className="bg-surprise-purple hover:bg-surprise-purple/90">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-4" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Special Surprise. All rights
            reserved.
          </p>
          <div className="flex space-x-6">
            <Link
              href="/privacy"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
