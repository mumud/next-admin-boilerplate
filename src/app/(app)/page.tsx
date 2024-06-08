import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  IconActivity,
  IconCreditCard,
  IconCurrencyDollar,
  IconUsers,
} from '@tabler/icons-react'

export default function HomePage() {
  return (
    <main className='flex flex-1 flex-col gap-4 space-y-2'>
      <div className='grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4'>
        <Card x-chunk='dashboard-01-chunk-0'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Revenue</CardTitle>
            <IconCurrencyDollar className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>$45,231.89</div>
            <p className='text-xs text-muted-foreground'>
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card x-chunk='dashboard-01-chunk-1'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Subscriptions</CardTitle>
            <IconUsers className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>+2350</div>
            <p className='text-xs text-muted-foreground'>
              +180.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card x-chunk='dashboard-01-chunk-2'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Sales</CardTitle>
            <IconCreditCard className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>+12,234</div>
            <p className='text-xs text-muted-foreground'>
              +19% from last month
            </p>
          </CardContent>
        </Card>
        <Card x-chunk='dashboard-01-chunk-3'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Active Now</CardTitle>
            <IconActivity className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>+573</div>
            <p className='text-xs text-muted-foreground'>
              +201 since last hour
            </p>
          </CardContent>
        </Card>
      </div>
      <div className='grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3'></div>
    </main>
  )
}
