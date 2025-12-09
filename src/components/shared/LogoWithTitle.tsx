import { Gift } from "lucide-react";
import Link from "next/link";

export default function LogoWithTitle() {
  return (
    <Link
      href="/"
      className="absolute top-4 left-4 flex items-center space-x-2"
    >
      <Gift className="h-8 w-8 text-surprise-pink" />
      <span className="font-display text-2xl gradient-text">
        Special Surprise
      </span>
    </Link>
  );
}
