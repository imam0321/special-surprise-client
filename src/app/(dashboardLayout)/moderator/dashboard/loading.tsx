
export default function ModeratorDashboardLoading() {
    return (
        <div className="space-y-6">
            {/* Header Skeleton */}
            <div className="space-y-2">
                <div className="h-8 w-64 bg-linear-to-r from-surprise-pink/20 to-surprise-purple/20 animate-pulse rounded-md shadow-sm" />
                <div className="h-4 w-96 bg-linear-to-r from-surprise-pink/20 to-surprise-purple/20 animate-pulse rounded-md shadow-sm" />
            </div>

            {/* Stats Cards Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {[...Array(4)].map((_, i) => (
                    <div
                        key={i}
                        className="bg-background rounded-lg shadow p-6 border border-gray-100"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="h-4 w-24 mb-2 bg-linear-to-r from-surprise-pink/20 to-surprise-purple/20 animate-pulse rounded-md shadow-sm" />
                                <div className="h-8 w-16 bg-linear-to-r from-surprise-pink/20 to-surprise-purple/20 animate-pulse rounded-md shadow-sm" />
                            </div>
                            <div className="h-12 w-12 rounded-lg bg-linear-to-r from-surprise-pink/20 to-surprise-purple/20 animate-pulse rounded-md shadow-sm" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-[400px] w-full rounded-xl bg-linear-to-r from-surprise-pink/20 to-surprise-purple/20 animate-pulse rounded-md shadow-sm" />
                <div className="h-[400px] w-full rounded-xl bg-linear-to-r from-surprise-pink/20 to-surprise-purple/20 animate-pulse rounded-md shadow-sm" />
            </div>
        </div>
    );
}
