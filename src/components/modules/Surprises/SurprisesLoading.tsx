import SurpriseCardSkeleton from "./SurpriseCardSkeleton";

export default function SurprisesLoading() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <SurpriseCardSkeleton key={i} />
      ))}
    </div>
  );
}
