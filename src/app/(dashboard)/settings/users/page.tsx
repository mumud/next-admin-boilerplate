import { Button } from '@/components/custom/button'
import { DataTable } from '@/components/data-table'
import { IconPlus } from '@tabler/icons-react'

import { users } from './data/users'
import { columns } from './columns'

export default function UserPage() {
  return (
    <>
      <div className='flex items-center justify-between space-y-2'>
        <div className='space-y-0.5'>
          <h1 className='text-2xl font-bold tracking-tight'>User Management</h1>
          <p className='text-muted-foreground'>
            Manage your users and their permissions.
          </p>
        </div>
        <div className='flex items-center space-x-2'>
          <Button size='sm' leftSection={<IconPlus size={16} />}>
            Add User
          </Button>
        </div>
      </div>
      <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
        <DataTable data={users} columns={columns} />
      </div>
    </>
  )
}
