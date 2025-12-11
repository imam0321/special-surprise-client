import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductDetailSkeleton() {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 items-center">
          <Skeleton className="lg:h-[500px] h-[250px] w-full rounded-lg bg-linear-to-r from-surprise-pink/20 to-surprise-purple/20" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4 bg-linear-to-r from-surprise-pink/20 to-surprise-purple/20" />{" "}
            <Skeleton className="h-4 w-full bg-linear-to-r from-surprise-pink/20 to-surprise-purple/20" />{" "}
            <Skeleton className="h-4 w-5/6 bg-linear-to-r from-surprise-pink/20 to-surprise-purple/20" />
            <Skeleton className="h-8 w-32 bg-linear-to-r from-surprise-pink/20 to-surprise-purple/20" />{" "}
            <div className="flex items-center gap-2">
              <Skeleton className="h-6 w-24 rounded-full bg-linear-to-r from-surprise-pink/30 to-surprise-purple/30" />
              <Skeleton className="h-6 w-20 rounded-md bg-linear-to-r from-surprise-pink/30 to-surprise-purple/30" />
            </div>
            <div className="space-y-2 mt-4">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton
                  key={i}
                  className="h-6 w-full rounded-md bg-linear-to-r from-surprise-pink/20 to-surprise-purple/20"
                />
              ))}
            </div>
            <Skeleton className="h-10 w-40 mt-4 rounded-md bg-linear-to-r from-surprise-pink/20 to-surprise-purple/20" />
          </div>
        </div>

        <Card className="mb-10">
          <CardContent className="p-0">
            <div className="space-y-4 p-6">
              <Skeleton className="h-8 w-1/3 bg-linear-to-r from-surprise-pink/20 to-surprise-purple/20" />{" "}
              <Skeleton className="h-4 w-full bg-linear-to-r from-surprise-pink/20 to-surprise-purple/20" />
              <Skeleton className="h-4 w-5/6 bg-linear-to-r from-surprise-pink/20 to-surprise-purple/20" />
              <Skeleton className="h-4 w-2/3 bg-linear-to-r from-surprise-pink/20 to-surprise-purple/20" />
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton
              key={i}
              className="aspect-3/2 w-full rounded-md bg-linear-to-r from-surprise-pink/20 to-surprise-purple/20"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
