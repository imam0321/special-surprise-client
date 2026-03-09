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
import { Gift, Heart } from "lucide-react";
import LogoWithTitle from "@/components/shared/LogoWithTitle";
import ForgotPasswordForm from "@/components/modules/Auth/ForgotPasswordForm";

export default function ForgotPasswordPage() {
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

      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-center font-semibold">
            Forgot Password
          </CardTitle>
          <CardDescription className="text-center">
            Enter your registered email address to reset your password
          </CardDescription>
        </CardHeader>

        <CardContent>
          <ForgotPasswordForm />
        </CardContent>

        <CardFooter className="flex justify-center">
          <Link href="/login" className="w-full">
            <Button variant="link" className="w-full hover:text-surprise-pink">
              Remembered your password? Login
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
