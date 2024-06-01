'use client'

import { useCallback, useMemo, useState } from 'react'
import { type PaginationState, type SortingState } from '@tanstack/react-table'
import { IconPlus } from '@tabler/icons-react'
import { type User } from '@prisma/client'

import { Button } from '@/components/custom/button'
import { DataTable } from '@/components/data-table'
import { useDebounce } from '@/hooks/use-debounce'
import { useGetUsers } from '@/api/useGetUsers'
import { userColumns } from './columns'

export default function UserPage() {
  // sorting state of the table
  const [sorting, setSorting] = useState<SortingState>([])

  // column filters state of the table
  const [filter, setFilter] = useState<string>('')
  const debouncedFilter: string = useDebounce(filter, 1000)

  // pagination state of the table
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0, //initial page index
    pageSize: 10, //default page size
  })

  const { data, isLoading } = useGetUsers({
    sorting,
    filter: debouncedFilter,
    pagination,
  })

  const onView = useCallback((user: User) => {
    console.log('onView id', { user })
  }, [])

  const onEdit = useCallback((user: User) => {
    console.log('onEdit id', { user })
  }, [])

  const onDelete = useCallback((user: User) => {
    console.log('onDelete id', { user })
  }, [])

  const columns = useMemo(
    () => userColumns({ onView, onEdit, onDelete }),
    [onDelete, onEdit, onView]
  )

  return (
    <>
      <div className='flex justify-between space-y-2'>
        <div className='space-y-0.5'>
          <h1 className='text-lg font-bold tracking-tight md:text-2xl'>
            User Management
          </h1>
          <p className='text-sm text-muted-foreground md:text-base'>
            Manage your users and their permissions.
          </p>
        </div>
        <div className='flex space-x-2'>
          <Button size='sm' leftSection={<IconPlus size={16} />}>
            Add User
          </Button>
        </div>
      </div>
      <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
        <DataTable
          isLoading={isLoading}
          data={data}
          columns={columns}
          pagination={pagination}
          setPagination={setPagination}
          sorting={sorting}
          setSorting={setSorting}
          filter={filter}
          setFilter={setFilter}
        />
      </div>
    </>
  )
}
