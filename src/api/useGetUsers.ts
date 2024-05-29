import { type User } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import {
  type ColumnFiltersState,
  type PaginationState,
  type SortingState,
} from '@tanstack/react-table'
import axios, { type AxiosError } from 'axios'

export interface UseUsersInput {
  sorting: SortingState
  columnFilters: ColumnFiltersState
  pagination: PaginationState
}

export interface UseUsersResponse {
  limit: number
  page: number
  total: number
  total_filtered: number
  data: User[]
}

const getAllUsersFn: ({
  sorting,
  columnFilters,
  pagination,
}: UseUsersInput) => Promise<UseUsersResponse> = async ({
  sorting,
  columnFilters,
  pagination,
}: UseUsersInput) => {
  // set pagingation
  const page = pagination.pageIndex + 1,
    per_page = pagination.pageSize

  // set filter
  let username = '',
    email = '',
    first_name = '',
    last_name = '',
    country = '',
    city = ''

  for (const filter of columnFilters) {
    const id = filter.id,
      value = filter.value
    switch (id) {
      case 'username':
        username = value as string
        break
      case 'email':
        email = value as string
        break
      case 'first_name':
        first_name = value as string
        break
      case 'last_name':
        last_name = value as string
        break
      case 'country':
        country = value as string
        break
      case 'city':
        city = value as string
        break
    }
  }

  // set sorting
  let sorting_param = ''
  for (let i = 0; i < sorting.length; i++) {
    const id = sorting[i]?.id,
      direction = sorting[i]?.desc ? 'desc' : 'asc'
    sorting_param += id + ':' + direction

    if (i !== sorting.length - 1) {
      sorting_param += ','
    }
  }

  const res = await axios.get<UseUsersResponse>(
    `/api/users?${
      first_name !== '' ? `first_name=${first_name}&` : ''
    }${last_name !== '' ? `last_name=${last_name}&` : ''}${
      username !== '' ? `username=${username}&` : ''
    }${email !== '' ? `email=${email}&` : ''}${
      country !== '' ? `country=${country}&` : ''
    }${city !== '' ? `city=${city}&` : ''}${
      sorting_param !== '' ? `sortBy=${sorting_param}&` : ''
    }page=${page}&limit=${per_page}`
  )

  return res.data
}

export const useGetUsers = ({
  sorting,
  columnFilters,
  pagination,
}: UseUsersInput) => {
  const { data, isLoading } = useQuery<UseUsersResponse, AxiosError>({
    queryKey: ['users', sorting, columnFilters, pagination],
    queryFn: () =>
      getAllUsersFn({
        sorting,
        columnFilters,
        pagination,
      }),
  })

  return { data, isLoading }
}
