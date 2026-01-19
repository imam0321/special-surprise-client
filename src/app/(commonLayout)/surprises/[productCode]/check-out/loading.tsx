import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin, Package } from "lucide-react";

export default function CheckoutSkeleton() {
  return (
    <div className="bg-background animate-pulse">
      <div className="container mx-auto px-4 py-8 space-y-8">
        <div className="mb-6 rounded-lg border p-4 flex gap-3">
          <Skeleton className="h-5 w-5 rounded-full bg-linear-to-r from-surprise-pink/20 to-surprise-purple/20" />
          <div className="space-y-2 w-full">
            <Skeleton className="h-4 w-1/3 bg-linear-to-r from-surprise-pink/20 to-surprise-purple/20" />
            <Skeleton className="h-3 w-full bg-linear-to-r from-surprise-pink/20 to-surprise-purple/20" />
            <Skeleton className="h-3 w-5/6 bg-linear-to-r from-surprise-pink/20 to-surprise-purple/20" />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-1 text-xl">
                  <MapPin className="h-5 w-5" /> Delivery Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Skeleton className="h-10 w-full rounded-md bg-linear-to-r from-surprise-pink/20 to-surprise-purple/20" />
                  <Skeleton className="h-10 w-full rounded-md bg-linear-to-r from-surprise-pink/20 to-surprise-purple/20" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Skeleton className="h-10 w-full rounded-md bg-linear-to-r from-surprise-pink/20 to-surprise-purple/20" />
                  <Skeleton className="h-10 w-full rounded-md bg-linear-to-r from-surprise-pink/20 to-surprise-purple/20" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Skeleton className="h-10 w-full rounded-md bg-linear-to-r from-surprise-pink/20 to-surprise-purple/20" />
                  <Skeleton className="h-10 w-full rounded-md bg-linear-to-r from-surprise-pink/20 to-surprise-purple/20" />
                </div>
                <Skeleton className="h-24 w-full rounded-md bg-linear-to-r from-surprise-pink/20 to-surprise-purple/20" />
              </CardContent>
            </Card>
          </div>

          {/* Order Summary Skeleton */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" /> Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Skeleton className="h-6 w-3/4 rounded-md bg-linear-to-r from-surprise-pink/20 to-surprise-purple/20" />
                <Skeleton className="h-4 w-full rounded-md bg-linear-to-r from-surprise-pink/20 to-surprise-purple/20" />
                <Skeleton className="h-4 w-5/6 rounded-md bg-linear-to-r from-surprise-pink/20 to-surprise-purple/20" />
                <Skeleton className="h-4 w-2/3 rounded-md bg-linear-to-r from-surprise-pink/20 to-surprise-purple/20" />
                <Skeleton className="h-10 w-full rounded-md bg-linear-to-r from-surprise-pink/20 to-surprise-purple/20" />
                <Skeleton className="h-12 w-full rounded-md bg-linear-to-r from-surprise-pink/20 to-surprise-purple/20" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
