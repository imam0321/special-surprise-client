import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function ProfileLoading() {
  return (
    <Card className="overflow-hidden border-none shadow-md bg-white/50 backdrop-blur-sm -mt-10">
      {/* Cover Image Skeleton */}
      <div className="h-48 w-full bg-linear-to-r from-surprise-pink/20 to-surprise-purple/20 animate-pulse" />

      <CardContent className="relative px-4 lg:px-8 pb-8">
        {/* Avatar & Basic Info Skeleton */}
        <div className="relative -mt-16 mb-6 flex flex-col md:flex-row items-end md:items-end gap-6">
          <div className="relative p-1 bg-white rounded-full">
            <div className="w-32 h-32 rounded-full border-4 border-white bg-linear-to-r from-surprise-pink/20 to-surprise-purple/20 animate-pulse shadow-lg" />
          </div>

          <div className="flex-1 mb-2 space-y-2">
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <div className="h-8 w-64 bg-linear-to-r from-surprise-pink/20 to-surprise-purple/20 animate-pulse rounded-md" />
              <div className="h-6 w-24 bg-linear-to-r from-surprise-pink/20 to-surprise-purple/20 animate-pulse rounded-full" />
            </div>
            <div className="h-4 w-48 bg-linear-to-r from-surprise-pink/20 to-surprise-purple/20 animate-pulse rounded-md" />
          </div>
        </div>

        <Separator className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Personal Info Col Skeleton */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-5 h-5 rounded-full bg-linear-to-r from-surprise-pink/20 to-surprise-purple/20 animate-pulse" />
              <div className="h-6 w-48 bg-linear-to-r from-surprise-pink/20 to-surprise-purple/20 animate-pulse rounded-md" />
            </div>

            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-2">
                  <div className="h-4 w-24 bg-linear-to-r from-surprise-pink/20 to-surprise-purple/20 animate-pulse rounded-md" />
                  <div className="h-10 w-full bg-linear-to-r from-surprise-pink/20 to-surprise-purple/20 animate-pulse rounded-md" />
                </div>
              ))}
            </div>
          </div>

          {/* Address Col Skeleton */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-5 h-5 rounded-full bg-linear-to-r from-surprise-pink/20 to-surprise-purple/20 animate-pulse" />
              <div className="h-6 w-48 bg-linear-to-r from-surprise-pink/20 to-surprise-purple/20 animate-pulse rounded-md" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="h-4 w-24 bg-linear-to-r from-surprise-pink/20 to-surprise-purple/20 animate-pulse rounded-md" />
                <div className="h-10 w-full bg-linear-to-r from-surprise-pink/20 to-surprise-purple/20 animate-pulse rounded-md" />
              </div>
              <div className="space-y-2">
                <div className="h-4 w-24 bg-linear-to-r from-surprise-pink/20 to-surprise-purple/20 animate-pulse rounded-md" />
                <div className="h-10 w-full bg-linear-to-r from-surprise-pink/20 to-surprise-purple/20 animate-pulse rounded-md" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="h-4 w-32 bg-linear-to-r from-surprise-pink/20 to-surprise-purple/20 animate-pulse rounded-md" />
              <div className="h-28 w-full bg-linear-to-r from-surprise-pink/20 to-surprise-purple/20 animate-pulse rounded-md" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
