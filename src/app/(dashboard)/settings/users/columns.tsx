'use client'

import { type ColumnDef } from '@tanstack/react-table'

import { DataTableColumnHeader } from '@/components/data-table/column-header'
import { DataTableRowActions } from '@/components/data-table/row-actions'

import { type User } from './data/schema'

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Full Name' />
    ),
    cell: ({ row }) => (
      <span className='max-w-32 truncate'>{row.getValue('name')}</span>
    ),
  },
  {
    accessorKey: 'username',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Username' />
    ),
    cell: ({ row }) => {
      return (
        <span className='max-w-32 truncate sm:max-w-72 md:max-w-[31rem]'>
          {row.getValue('username')}
        </span>
      )
    },
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Email' />
    ),
    cell: ({ row }) => {
      return (
        <span className='max-w-32 truncate sm:max-w-72 md:max-w-[31rem]'>
          {row.getValue('email')}
        </span>
      )
    },
  },
  {
    accessorKey: 'role',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Role' />
    ),
    cell: ({ row }) => {
      return (
        <span className='max-w-32 truncate sm:max-w-72 md:max-w-[31rem]'>
          {row.getValue('role')}
        </span>
      )
    },
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
