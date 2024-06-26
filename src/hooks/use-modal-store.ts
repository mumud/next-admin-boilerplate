import { type User } from '@prisma/client'
import { create } from 'zustand'

export type ModalType = 'createUser' | 'editUser'

interface ModalData {
  user?: User
  apiUrl?: string
  query?: Record<string, unknown>
}

interface ModalStore {
  type: ModalType | null
  data: ModalData
  isOpen: boolean
  onOpen: (type: ModalType, data?: ModalData) => void
  onClose: () => void
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type: ModalType, data = {}) => set({ type, isOpen: true, data }),
  onClose: () => set({ type: null, isOpen: false }),
}))
