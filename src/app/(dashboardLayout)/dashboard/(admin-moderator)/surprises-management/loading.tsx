import { ManagementPageLoading } from "@/components/shared/ManagementPageLoading";


export default function SurpriseManagementLoading() {
  return (
    <ManagementPageLoading
      columns={8}
      hasActionButton
      filterCount={2}
      filterWidths={["w-48", "w-32", "w-40", "w-24", "w-36"]}
    />
  )
}
