import { type User } from '@prisma/client'
import { type ColumnDef } from '@tanstack/react-table'

import { DataTableRowActions } from '@/components/data-table/row-actions'
import { DataTableColumnHeader } from '@/components/data-table/column-header'

export type UserColumnsProps = {
  onView?: (row: User) => void
  onEdit?: (row: User) => void
  onDelete?: (row: User) => void
}

export const userColumns = ({
  onView,
  onEdit,
  onDelete,
}: UserColumnsProps): ColumnDef<User>[] => [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Full Name' />
    ),
  },
  {
    accessorKey: 'username',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Username' />
    ),
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Email' />
    ),
  },
  {
    accessorKey: 'phone',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Phone' />
    ),
    enableSorting: false,
  },
  {
    accessorKey: 'role.name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Role' />
    ),
    size: 150,
    enableSorting: false,
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <div className='flex items-center justify-center gap-2'>
        <DataTableRowActions
          row={row}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </div>
    ),
    size: 50,
  },
]
