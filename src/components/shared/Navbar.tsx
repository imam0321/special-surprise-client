import Link from "next/link";
import { Gift } from "lucide-react";
import { Button } from "../ui/button";
import MobileNavMenu from "./MobileNavMenu";
// import { getCookie } from "@/services/auth/tokenHandlers";
// import { getDefaultDashboardRoute } from "@/lib/auth.utils";
// import { getUserInfo } from "@/services/auth/getUserInfo";

export default async function Navbar() {
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Surprises", href: "/surprises" },
    { name: "About Us", href: "/about-us" },
    { name: "Contact", href: "/contact" },
    { name: "Dashboard", href: "/dashboard/admin" },
  ];

  // const accessToken = await getCookie("accessToken");
  // const userInfo = accessToken ? await getUserInfo() : null;
  // console.log(userInfo)
  // const dashboardRoute = userInfo
  //   ? getDefaultDashboardRoute(userInfo.role)
  //   : "/";
  // console.log(dashboardRoute)

  return (
    <nav className="backdrop-blur-3xl sticky top-0 z-50 w-full py-1">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Gift className="h-8 w-8 text-surprise-pink" />
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
              className="text-foreground hover:text-surprise-pink transition-colors"
            >
              {link.name}
            </Link>
          ))}

          <Button className="text-white bg-linear-to-r from-surprise-pink to-surprise-purple hover:opacity-90 btn-bounce">
            Login
          </Button>
        </div>

        {/* Mobile Navigation Trigger */}
        <MobileNavMenu
          navLinks={navLinks}
          // initialHasToken={!!accessToken}
          // initialUserInfo={userInfo}
          // initialDashboardRoute={dashboardRoute}
        />
      </div>
    </nav>
  );
}
