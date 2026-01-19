import { ManagementPageLoading } from '@/components/shared/ManagementPageLoading'


export default function ModeratorsManagementLoading() {
  return (
    <ManagementPageLoading
      columns={5}
      hasActionButton
      filterCount={1}
      filterWidths={["w-48", "w-32", "w-40", "w-24", "w-36"]}
    />
  )
}
