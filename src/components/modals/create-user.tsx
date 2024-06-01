'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/custom/button'
import { useModal } from '@/hooks/use-modal-store'
import api from '@/lib/api'
import { IconDeviceFloppy } from '@tabler/icons-react'
import { useRoles } from '@/hooks/api/use-get-roles'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { PasswordInput } from '@/components/custom/password-input'

const formSchema = z.object({
  name: z.string().min(1, { message: 'Full name is required' }),
  email: z
    .string()
    .min(1, { message: 'Username is required' })
    .email('Invalid email address'),
  username: z.string().min(1, { message: 'Username is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
  phoneNumber: z.string().optional(),
  image: z.string().optional(),
  roleId: z.string().min(1, { message: 'Role is required' }),
})

export type UserInput = z.infer<typeof formSchema>

export const CreateUserModal = () => {
  const { isOpen, onClose, type } = useModal()
  const { data: roles } = useRoles()
  const router = useRouter()

  const isModalOpen = isOpen && type === 'createUser'

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      username: '',
      password: '',
      phoneNumber: '',
      image: '',
      roleId: '',
    },
  })

  const isLoading = form.formState.isSubmitting

  const onSubmit = async (values: UserInput) => {
    try {
      await api.post('/users', values)

      form.reset()
      router.refresh()
      onClose()
    } catch (error) {
      console.error(error)
    }
  }

  const handleClose = () => {
    form.reset()
    onClose()
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className='overflow-hidden bg-background p-0 sm:max-w-[425px]'>
        <DialogHeader className='bg-gray-100 p-4 dark:bg-background'>
          <DialogTitle>Create New User</DialogTitle>
          <DialogDescription className='text-zinc-500'>
            Give information about user
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <div className='space-y-4 px-4'>
              <div className='flex gap-x-4'>
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem className='w-full'>
                      <FormLabel
                        className='text-xs text-zinc-500'
                        htmlFor='name'
                      >
                        Full Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isLoading}
                          className='bottom-0 focus-visible:ring-1 focus-visible:ring-offset-0'
                          placeholder='Type the person name'
                        />
                      </FormControl>
                      <FormMessage className='text-xs' />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='username'
                  render={({ field }) => (
                    <FormItem className='w-full'>
                      <FormLabel
                        className='text-xs text-zinc-500'
                        htmlFor='username'
                      >
                        Username
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isLoading}
                          className='bottom-0 focus-visible:ring-1 focus-visible:ring-offset-0'
                          placeholder='Type the username'
                        />
                      </FormControl>
                      <FormMessage className='text-xs' />
                    </FormItem>
                  )}
                />
              </div>
              <div className='flex gap-x-4'>
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem className='w-full'>
                      <FormLabel
                        className='text-xs text-zinc-500'
                        htmlFor='email'
                      >
                        Email Address
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isLoading}
                          className='bottom-0 focus-visible:ring-1 focus-visible:ring-offset-0'
                          placeholder='Type the email address'
                          type='email'
                        />
                      </FormControl>
                      <FormMessage className='text-xs' />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem className='w-full'>
                      <FormLabel
                        className='text-xs text-zinc-500'
                        htmlFor='password'
                      >
                        Password
                      </FormLabel>
                      <FormControl>
                        <PasswordInput
                          {...field}
                          disabled={isLoading}
                          className='bottom-0 focus-visible:ring-1 focus-visible:ring-offset-0'
                          placeholder='Type the password'
                        />
                      </FormControl>
                      <FormMessage className='text-xs' />
                    </FormItem>
                  )}
                />
              </div>
              <div className='flex gap-x-4'>
                <FormField
                  control={form.control}
                  name='phoneNumber'
                  render={({ field }) => (
                    <FormItem className='w-full'>
                      <FormLabel
                        className='text-xs text-zinc-500'
                        htmlFor='phoneNumber'
                      >
                        Phone Number
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isLoading}
                          className='bottom-0 focus-visible:ring-1 focus-visible:ring-offset-0'
                          placeholder='Type the phone number'
                        />
                      </FormControl>
                      <FormMessage className='text-xs' />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='roleId'
                  render={({ field }) => (
                    <FormItem className='w-full'>
                      <FormLabel
                        className='text-xs text-zinc-500'
                        htmlFor='roleId'
                      >
                        Role
                      </FormLabel>
                      <Select
                        {...field}
                        disabled={isLoading}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className='bottom-0 focus-visible:ring-1 focus-visible:ring-offset-0'>
                          <SelectValue placeholder='Select role' />
                          <SelectContent className='absolute w-full'>
                            {roles?.length &&
                              roles.map((role) => (
                                <SelectItem key={role.id} value={role.id}>
                                  {role.name}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </SelectTrigger>
                      </Select>
                      <FormMessage className='text-xs' />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter className='bg-gray-100 p-4 dark:bg-background'>
              <Button
                disabled={isLoading}
                variant='default'
                leftSection={<IconDeviceFloppy size={16} />}
              >
                Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
