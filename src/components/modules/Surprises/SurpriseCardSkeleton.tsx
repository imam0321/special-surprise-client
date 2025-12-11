import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function SurpriseCardSkeleton() {
  return (
    <Card className="group -p-2 overflow-hidden rounded-sm">
      <div className="relative">
        <Skeleton className="aspect-3/2 w-full h-60 bg-linear-to-r from-surprise-pink/20 to-surprise-purple/20" />
        <Skeleton className="absolute top-3 right-3 h-6 w-16 rounded-full bg-linear-to-r from-surprise-pink/30 to-surprise-purple/30" />
        <Skeleton className="absolute top-3 left-3 h-8 w-8 rounded-full bg-linear-to-r from-surprise-pink/30 to-surprise-purple/30" />
      </div>

      <CardHeader className="px-3 space-y-2">
        <Skeleton className="h-5 w-3/4 bg-linear-to-r from-surprise-pink/20 to-surprise-purple/20" />
      </CardHeader>

      <CardContent className="px-3 -mt-4">
        <div className="space-y-2">
          <Skeleton className="h-3 w-full bg-linear-to-r from-surprise-pink/20 to-surprise-purple/20" />
          <Skeleton className="h-3 w-5/6 bg-linear-to-r from-surprise-pink/20 to-surprise-purple/20" />
          <Skeleton className="h-3 w-4/6 bg-linear-to-r from-surprise-pink/20 to-surprise-purple/20" />
        </div>
      </CardContent>

      <CardFooter className="flex justify-between items-center px-3 pb-4 mt-auto">
        <Skeleton className="h-5 w-16 bg-linear-to-r from-surprise-pink/20 to-surprise-purple/20" />
        <Skeleton className="h-8 w-20 rounded-md bg-linear-to-r from-surprise-pink/20 to-surprise-purple/20" />
      </CardFooter>
    </Card>
  );
}
