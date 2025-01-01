"use client";

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation';

export default function NotFoundError() {
  const router = useRouter();

  return (
    <div className='h-svh'>
      <div className='m-auto flex h-full w-full flex-col items-center justify-center gap-2'>
        <h1 className='text-[7rem] font-bold leading-tight'>404</h1>
        <span className='font-medium'>Oops! Không tìm thấy!</span>
        <p className='text-center text-muted-foreground'>
          {/* It seems like the page you&apos;re looking for <br />
          does not exist or might have been removed. */}
          Có vẻ như trang bạn đang tìm kiếm không tồn tại hoặc có thể đã bị xóa.
        </p>
        <div className='mt-6 flex gap-4'>
          <Button variant='outline' onClick={() => router.back()}>
            Trở lại trang trước đó
          </Button>
          <Button onClick={() => router.push("/")}>Về Trang chủ</Button>
        </div>
      </div>
    </div>
  )
}
