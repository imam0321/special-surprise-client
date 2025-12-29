import UserHeader from "@/components/modules/Admin/UsersManagement/UserHeader";
import SearchFilter from "@/components/shared/SearchFilter";
import React from "react";

export default function UsersManagementPage() {
  return (
    <div className="space-y-6">
      <UserHeader />
      <div className="flex items-center gap-2">
        <SearchFilter paramName="searchTerm" placeholder="Search users..." />
        {/* <SelectFilter
              paramName="specialty"
              options={specialtiesResult.data.map((specialty: ISpecialty) => ({
                label: specialty.title,
                value: specialty.title,
              }))}
              placeholder="Filter by specialty"
            /> */}
      </div>
      {/* <Suspense fallback={<TableSkeleton columns={3} rows={10} />}>
            <ModeratorTable moderators={moderators?.data} />
          </Suspense> */}
    </div>
  );
}
