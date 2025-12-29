"use client";

import { DateCell } from "@/components/shared/Cell/DateCell";
import { StatusBadgeCell } from "@/components/shared/Cell/StatusBadgeCell";
import { UserInfoCell } from "@/components/shared/Cell/UserInfoCell";
import { Column } from "@/components/shared/ManagementTable";
import { UserInfo } from "@/types/user.interface";

export const customersColumns: Column<UserInfo>[] = [
  {
    header: "Customer",
    accessor: (customer) => (
      <UserInfoCell
        name={customer.name}
        email={customer.email}
        photo={customer.profile}
      />
    ),
  },
  {
    header: "Contact",
    accessor: (customer) => (
      <div className="flex flex-col">
        <span className="text-sm">{customer.phone}</span>
      </div>
    ),
  },
  {
    header: "Status",
    accessor: (customer) => (
      <StatusBadgeCell isDeleted={customer.isDeleted} />
    ),
  },
  {
    header: "Joined",
    accessor: (customer) => <DateCell date={customer.createdAt} />,
  },
];
