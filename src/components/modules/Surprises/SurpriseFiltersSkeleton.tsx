import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export default function SurpriseFiltersSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* PRICE RANGE */}
        <div>
          <Skeleton className="h-5 w-24 mb-4 bg-linear-to-r from-surprise-pink/20 to-surprise-purple/20" />
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Skeleton className="h-3 w-8 mb-1 bg-linear-to-r from-surprise-pink/20 to-surprise-purple/20" />
              <Skeleton className="h-10 w-full rounded-md bg-linear-to-r from-surprise-pink/20 to-surprise-purple/20" />
            </div>
            <div>
              <Skeleton className="h-3 w-8 mb-1 bg-linear-to-r from-surprise-pink/20 to-surprise-purple/20" />
              <Skeleton className="h-10 w-full rounded-md bg-linear-to-r from-surprise-pink/20 to-surprise-purple/20" />
            </div>
          </div>

          <Skeleton className="h-9 w-full mt-3 rounded-md bg-linear-to-r from-surprise-pink/20 to-surprise-purple/20" />
        </div>

        <Separator />

        {/* CATEGORY SELECT */}
        <div>
          <Skeleton className="h-4 w-20 mb-1 bg-linear-to-r from-surprise-pink/20 to-surprise-purple/20" />
          <Skeleton className="h-10 w-full rounded-md bg-linear-to-r from-surprise-pink/20 to-surprise-purple/20" />
        </div>

        <Separator />

        {/* RESET */}
        <Skeleton className="h-9 w-full rounded-md bg-linear-to-r from-surprise-pink/20 to-surprise-purple/20" />
      </CardContent>
    </Card>
  );
}
