"use client";

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation';

export default function ForbiddenError() {
  const router = useRouter();
  return (
    <div className='h-svh'>
      <div className='m-auto flex h-full w-full flex-col items-center justify-center gap-2'>
        <h1 className='text-[7rem] font-bold leading-tight'>403</h1>
        <span className='font-medium'>Chặn quyền truy cập</span>
        <p className='text-center text-muted-foreground'>
          Bạn không có quyền cần thiết <br />
          để xem tài nguyên này.
        </p>
        <div className='mt-6 flex gap-4'>
          <Button variant='outline' onClick={() => router.back()}>
            Quay lại
          </Button>
          <Button onClick={() => router.replace("/")}>Về trang chủ</Button>
        </div>
      </div>
    </div>
  )
}