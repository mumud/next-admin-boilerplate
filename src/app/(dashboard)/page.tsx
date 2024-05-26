import { Button } from '@/components/custom/button'

export default function HomePage() {
  return (
    <>
      <div className='flex items-center justify-between space-y-2'>
        <h1 className='text-2xl font-bold tracking-tight md:text-3xl'>
          Dashboard
        </h1>
        <div className='flex items-center space-x-2'>
          <Button>Download</Button>
        </div>
      </div>
    </>
  )
}
