import api from '@/lib/api'
import { useQuery } from '@tanstack/react-query'
import { type AxiosError } from 'axios'

export interface UseMenuResponse {
  id: string
  name: string
  icon: string
  path: string
  children?: UseMenuResponse[]
}

const getMenuFn: () => Promise<UseMenuResponse[]> = async () => {
  const res = await api.get<UseMenuResponse[]>('/menus')

  return res.data
}

export const useMenu = () => {
  const { data, isLoading } = useQuery<UseMenuResponse[], AxiosError>({
    queryKey: ['menus'],
    queryFn: () => getMenuFn(),
  })

  return { data, isLoading }
}
