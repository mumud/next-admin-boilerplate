'use client'

import { type ChangeEvent } from 'react'
import { type Table } from '@tanstack/react-table'

import { Button } from '@/components/custom/button'
import { Input } from '@/components/ui/input'
import { DataTableViewOptions } from './view-options'
import { IconX } from '@tabler/icons-react'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  filter: string
  onFilterChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export function DataTableToolbar<TData>({
  table,
  filter,
  onFilterChange,
}: DataTableToolbarProps<TData>) {
  const isFiltered = filter?.length > 0

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 items-start gap-x-2'>
        <Input
          placeholder='Filter data...'
          value={filter}
          onChange={onFilterChange}
          className='h-8 w-[200px] lg:w-[250px]'
        />
        {isFiltered && (
          <Button
            variant='ghost'
            onClick={() => table.setGlobalFilter('')}
            className='h-8 px-2 lg:px-3'
          >
            Reset
            <IconX className='ml-2 h-4 w-4' />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}
