import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import LoginForm from "@/components/modules/Auth/LoginForm";
import { Gift, Heart } from "lucide-react";
import LogoWithTitle from "@/components/shared/LogoWithTitle";

export default async function LoginPage({
  searchParams,
}: {
  searchParams?: Promise<{ redirect?: string }>;
}) {
  const params = (await searchParams) || {};

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-linear-to-br from-accent via-background to-background px-4">
      <LogoWithTitle />
      <div className="absolute top-20 right-20 animate-float opacity-20">
        <Gift size={80} className="text-surprise-purple" />
      </div>
      <div
        className="absolute bottom-20 left-10 animate-float opacity-20"
        style={{ animationDelay: "1s" }}
      >
        <Heart size={60} className="text-surprise-pink" />
      </div>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Log In</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <LoginForm redirectPath={params?.redirect} />
        </CardContent>

        <CardFooter className="flex justify-center">
          <Link href="/register" className="w-full">
            <Button variant="link" className="w-full hover:text-surprise-pink">
              Don’t have an account? Register
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
