'use client'

import { type Dispatch, type SetStateAction, useEffect, useState } from 'react'
import Image from 'next/image'
import {
  type ColumnDef,
  type SortingState,
  type VisibilityState,
  type PaginationState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'

import { DataTablePagination } from './pagination'
import { DataTableToolbar } from './toolbar'
import EmptyVector from '@/assets/empty.svg'

export interface DataTableProps<TData, TValue> {
  isLoading: boolean
  data?: UseGetTableResponseType<TData>
  columns: ColumnDef<TData, TValue>[]
  pagination?: PaginationState
  setPagination?: Dispatch<SetStateAction<PaginationState>>
  sorting?: SortingState
  setSorting?: Dispatch<SetStateAction<SortingState>>
  filter: string
  setFilter: Dispatch<SetStateAction<string>>
}

export interface UseGetTableResponseType<TData> {
  limit: number
  page: number
  total: number
  totalFiltered: number
  data: TData[]
}

export function DataTable<TData, TValue>({
  isLoading,
  data,
  columns,
  pagination = {
    pageIndex: 0,
    pageSize: 10,
  },
  sorting = [],
  setSorting,
  setPagination,
  filter,
  setFilter,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({})
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})

  const table = useReactTable({
    data: data?.data ?? [],
    columns,
    state: {
      sorting,
      pagination,
      columnVisibility,
      rowSelection,
      globalFilter: filter,
    },
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    onGlobalFilterChange: setFilter,
    onPaginationChange: setPagination,
    pageCount: Math.ceil((data?.totalFiltered ?? 0) / (data?.limit ?? 1)),
  })

  // to reset page index to first page
  useEffect(() => {
    if (setPagination) {
      setPagination((pagination) => ({
        pageIndex: 0,
        pageSize: pagination.pageSize,
      }))
    }
  }, [setPagination])

  return (
    <div className='space-y-4'>
      <DataTableToolbar
        table={table}
        filter={filter}
        onFilterChange={(e) => {
          setFilter(e.target.value)
        }}
      />
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <>
                {Array(10)
                  .fill({})
                  .map((_, s) => (
                    <TableRow key={s}>
                      {columns.map((_, c) => (
                        <TableCell key={c} className='text-center'>
                          <Skeleton className='h-[32px] px-3 py-2' />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
              </>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-[500px] text-center sm:h-[300px]'
                >
                  <div>
                    <Image
                      src={EmptyVector as string}
                      className='relative m-auto mb-3'
                      width={200}
                      height={60}
                      alt='No results found.'
                      priority
                    />
                    <span>No results found.</span>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  )
}
