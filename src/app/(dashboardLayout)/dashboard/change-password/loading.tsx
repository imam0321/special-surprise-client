import { Skeleton } from "@/components/ui/skeleton";

export default function ChangePasswordLoading() {
	return (
		<div className="space-y-6">
			{/* Header Skeleton */}
			<div className="space-y-2">
				<Skeleton className="h-8 w-64 bg-linear-to-r from-surprise-pink/20 to-surprise-purple/20 animate-pulse rounded-md" />
				<Skeleton className="h-4 w-48 bg-linear-to-r from-surprise-pink/20 to-surprise-purple/20 animate-pulse rounded-md" />
			</div>

			{/* Form Skeleton */}
			<div className="space-y-4">
				{/* Old Password Field */}
				<div className="space-y-2">
					<Skeleton className="h-4 w-28 bg-linear-to-r from-surprise-pink/20 to-surprise-purple/20 animate-pulse rounded-md" />
					<div className="relative">
						<Skeleton className="h-10 w-full rounded-md bg-linear-to-r from-surprise-pink/20 to-surprise-purple/20 animate-pulse" />
					</div>
				</div>

				{/* New Password Field */}
				<div className="space-y-2">
					<Skeleton className="h-4 w-28 bg-linear-to-r from-surprise-pink/20 to-surprise-purple/20 animate-pulse rounded-md" />
					<div className="relative">
						<Skeleton className="h-10 w-full rounded-md bg-linear-to-r from-surprise-pink/20 to-surprise-purple/20 animate-pulse" />
					</div>
				</div>

				{/* Submit Button */}
				<Skeleton className="h-10 w-full rounded-md bg-linear-to-r from-surprise-pink/20 to-surprise-purple/20 animate-pulse" />
			</div>
		</div>
	);
}
