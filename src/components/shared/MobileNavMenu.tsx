"use client";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "../ui/button";

export type TNavLink = {
  name: string;
  href: string;
};

export default function MobileNavMenu({ navLinks }: { navLinks: TNavLink[] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen && (
        <div className="md:hidden bg-white absolute top-full left-0 w-full border-b border-gray-200 z-50">
          <div className="container mx-auto px-4 py-3 flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-foreground hover:text-surprise-pink transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            <Button className="text-white font-semibold bg-linear-to-r from-surprise-pink to-surprise-purple hover:opacity-90 w-full">
              Order Now
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
