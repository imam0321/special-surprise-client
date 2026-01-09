import { ManagementPageLoading } from '@/components/shared/ManagementPageLoading'


export default function loading() {
  return (
    <ManagementPageLoading
      columns={5}
      filterCount={1}
      filterWidths={["w-48", "w-32", "w-40", "w-24", "w-36"]}
    />
  )
}
