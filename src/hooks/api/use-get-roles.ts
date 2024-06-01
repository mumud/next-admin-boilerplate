import { type Role } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import { type AxiosError } from 'axios'
import api from '@/lib/api'

const getRolesFn: () => Promise<Role[]> = async () => {
  const res = await api.get<Role[]>('/roles')

  return res.data
}

export const useRoles = () => {
  const { data, isLoading } = useQuery<Role[], AxiosError>({
    queryKey: ['roles'],
    queryFn: () => getRolesFn(),
  })

  return { data, isLoading }
}
