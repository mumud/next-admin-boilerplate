'use client'

import { useState } from 'react'
import {
  type ColumnDef,
  type ColumnFiltersState,
  type PaginationState,
  type SortingState,
} from '@tanstack/react-table'
import { type User } from '@prisma/client'
import { IconPlus } from '@tabler/icons-react'

import { Button } from '@/components/custom/button'
import { DataTable } from '@/components/data-table'
import { DataTableRowActions } from '@/components/data-table/row-actions'
import { useDebounce } from '@/hooks/use-debounce'
import { DataTableColumnHeader } from '@/components/data-table/column-header'
import { useGetUsers } from '@/api/useGetUsers'

export default function UserPage() {
  // sorting state of the table
  const [sorting, setSorting] = useState<SortingState>([])

  // column filters state of the table
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const debouncedColumnFilters: ColumnFiltersState = useDebounce(
    columnFilters,
    1000
  )

  // pagination state of the table
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0, //initial page index
    pageSize: 10, //default page size
  })

  const { data, isLoading } = useGetUsers({
    sorting,
    columnFilters: debouncedColumnFilters,
    pagination,
  })

  const userColumns: ColumnDef<User>[] = [
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
      accessorKey: 'role.name',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Role' />
      ),
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <div className='flex items-center justify-center gap-2'>
          <DataTableRowActions row={row} />
        </div>
      ),
    },
  ]

  return (
    <>
      <div className='flex items-center justify-between space-y-2'>
        <div className='space-y-0.5'>
          <h1 className='text-2xl font-bold tracking-tight'>User Management</h1>
          <p className='text-muted-foreground'>
            Manage your users and their permissions.
          </p>
        </div>
        <div className='flex items-center space-x-2'>
          <Button size='sm' leftSection={<IconPlus size={16} />}>
            Add User
          </Button>
        </div>
      </div>
      <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
        <DataTable
          isLoading={isLoading}
          data={data}
          columns={userColumns}
          pagination={pagination}
          setPagination={setPagination}
          sorting={sorting}
          setSorting={setSorting}
          columnFilters={columnFilters}
          setColumnFilters={setColumnFilters}
        />
      </div>
    </>
  )
}
