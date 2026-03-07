import { ManagementPageLoading } from '@/components/shared/ManagementPageLoading'


export default function CategoriesManagementLoading() {
  return (
    <ManagementPageLoading
      columns={3}
      hasActionButton
      filterWidths={["w-48", "w-32", "w-40"]}
    />
  )
}
