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

export default async function LoginPage({
  searchParams,
}: {
  searchParams?: Promise<{ redirect?: string }>;
}) {
  const params = (await searchParams) || {};

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
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
