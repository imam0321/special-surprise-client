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
import ResetPasswordForm from "@/components/modules/Auth/ResetPasswordForm";

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams?: Promise<{ redirect?: string; id?: string; token?: string }>;
}) {
  const params = (await searchParams) || {};
  const { redirect, id, token } = params;

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
            Reset Password
          </CardTitle>
          <CardDescription className="text-center">
            Enter your new password to reset your password
          </CardDescription>
        </CardHeader>

        <CardContent>
          <ResetPasswordForm redirect={redirect} id={id} token={token} />
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
