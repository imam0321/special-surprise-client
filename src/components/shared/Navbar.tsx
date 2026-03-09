import Link from "next/link";
import { Button } from "../ui/button";
import MobileNavMenu from "./MobileNavMenu";
import { getCookie } from "@/services/auth/tokenHandlers";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { getDefaultDashboardRoute } from "@/lib/auth.utils";
import LogoutButton from "./LogoutButton";
import Image from "next/image";

export default async function Navbar() {
  const accessToken = await getCookie("accessToken");
  const userInfo = accessToken ? await getUserInfo() : null;
  const dashboardRoute = userInfo
    ? getDefaultDashboardRoute(userInfo.role)
    : "/";

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Surprises", href: "/surprises" },
    { name: "About Us", href: "/about-us" },
    { name: "Contact", href: "/contact" },
    ...(accessToken && userInfo
      ? [{ name: "Dashboard", href: dashboardRoute || "/" }]
      : []),
  ];

  return (
    <nav className="glass-effect sticky top-0 z-50 w-full py-1">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/images/special-surprise-logo.png" alt="Logo" width={40} height={40} />
          <span className="font-display text-2xl gradient-text">
            Special Surprise
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-foreground hover:text-primary transition-colors"
            >
              {link.name}
            </Link>
          ))}

          {accessToken && userInfo ? (
            <LogoutButton />
          ) : (
            <Button
              className="text-white bg-primary hover:bg-primary/90 btn-bounce"
              asChild
            >
              <Link href="/login">Login</Link>
            </Button>
          )}
        </div>

        {/* Mobile Navigation Trigger */}
        <MobileNavMenu
          navLinks={navLinks}
          hasAccessToken={!!accessToken}
          userInfo={userInfo}
        />
      </div>
    </nav>
  );
}
