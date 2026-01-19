import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function SurpriseCardSkeleton() {
  return (
    <Card className="group flex flex-col h-full p-2 overflow-hidden rounded-sm">
      {/* Image Section Skeleton */}
      <div className="relative shrink-0 w-full h-[200px] overflow-hidden rounded-sm mb-4">
        <Skeleton className="w-full h-full bg-linear-to-r from-surprise-pink/20 to-surprise-purple/20" />
        {/* Discount Badge Position */}
        <Skeleton className="absolute top-3 right-3 h-10 w-10 rounded-full bg-linear-to-r from-surprise-pink/30 to-surprise-purple/30" />
      </div>

      <CardHeader className="px-3 pt-0 space-y-2 shrink-0">
        <Skeleton className="h-6 w-3/4 bg-linear-to-r from-surprise-pink/20 to-surprise-purple/20" />
      </CardHeader>

      <CardContent className="px-3 -mt-2 flex-1 flex flex-col">
        {/* Description Lines */}
        <div className="space-y-2 mb-4">
          <Skeleton className="h-3 w-full bg-linear-to-r from-surprise-pink/20 to-surprise-purple/20" />
          <Skeleton className="h-3 w-5/6 bg-linear-to-r from-surprise-pink/20 to-surprise-purple/20" />
        </div>

        {/* Price and Category Row */}
        <div className="flex justify-between items-center mt-auto pt-3">
          <Skeleton className="h-6 w-20 bg-linear-to-r from-surprise-pink/20 to-surprise-purple/20" />
          <Skeleton className="h-6 w-24 rounded-full bg-linear-to-r from-surprise-pink/20 to-surprise-purple/20" />
        </div>
      </CardContent>

      <CardFooter className="px-3 pb-4 mt-4 shrink-0">
        <Skeleton className="h-9 w-full rounded-md bg-linear-to-r from-surprise-pink/20 to-surprise-purple/20" />
      </CardFooter>
    </Card>
  );
}
