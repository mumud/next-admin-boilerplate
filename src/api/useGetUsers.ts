import { type User } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import { type PaginationState, type SortingState } from '@tanstack/react-table'
import axios, { type AxiosError } from 'axios'

export interface UseUsersInput {
  sorting: SortingState
  filter: string
  pagination: PaginationState
}

export interface UseUsersResponse {
  limit: number
  page: number
  total: number
  totalFiltered: number
  data: User[]
}

const getAllUsersFn: ({
  sorting,
  filter,
  pagination,
}: UseUsersInput) => Promise<UseUsersResponse> = async ({
  sorting,
  filter,
  pagination,
}: UseUsersInput) => {
  // set pagingation
  const page = pagination.pageIndex + 1,
    perPage = pagination.pageSize

  // set filter & sorting
  let sortingParam = ''
  for (let i = 0; i < sorting.length; i++) {
    const id = sorting[i]?.id,
      direction = sorting[i]?.desc ? 'desc' : 'asc'
    sortingParam += id + ':' + direction

    if (i !== sorting.length - 1) {
      sortingParam += ','
    }
  }

  const res = await axios.get<UseUsersResponse>(
    `/api/users?q=${filter}&${
      sortingParam !== '' ? `sortBy=${sortingParam}&` : ''
    }page=${page}&limit=${perPage}`
  )

  return res.data
}

export const useGetUsers = ({ sorting, filter, pagination }: UseUsersInput) => {
  const { data, isLoading } = useQuery<UseUsersResponse, AxiosError>({
    queryKey: ['users', sorting, filter, pagination],
    queryFn: () =>
      getAllUsersFn({
        sorting,
        filter,
        pagination,
      }),
  })

  return { data, isLoading }
}
