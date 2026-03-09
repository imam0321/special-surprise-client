import Image from "next/image";
import Link from "next/link";

export default function LogoWithTitle() {
  return (
    <Link
      href="/"
      className="absolute top-4 left-4 flex items-center space-x-2"
    >
      <Image src="/images/special-surprise-logo.png" alt="Logo" width={40} height={40} />
      <span className="font-display text-2xl gradient-text">
        Special Surprise
      </span>
    </Link>
  );
}
