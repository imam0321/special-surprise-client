import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import RegisterForm from "@/components/modules/Auth/RegisterForm";
import LogoWithTitle from "@/components/shared/LogoWithTitle";
import { Gift, Heart } from "lucide-react";

export default function RegisterPage() {
  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden px-4">
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
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Create an Account
          </CardTitle>
          <CardDescription className="text-center">
            Fill in the form below to create your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <RegisterForm />
        </CardContent>

        <Link href="/login" className="w-full">
          <Button variant="link" className="w-full hover:text-surprise-pink">
            Already have an account? Login
          </Button>
        </Link>
      </Card>
    </div>
  );
}
