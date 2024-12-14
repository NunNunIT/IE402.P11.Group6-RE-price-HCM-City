import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useCallback, useState } from "react";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import useSWRMutation from 'swr/mutation'
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from 'next/dynamic';
import { ILocation } from "@/components/VNLocationSelector";
import { useSWRConfig } from "swr";
import { parseObjectToFormData } from "@/utils";
const LocationSelect = dynamic(() => import('@/components/VNLocationSelector'), { loading: () => <p>Loading...</p> });

const formSchema = z.object({
  address: z.object({
    province: z.string().nullable().optional(),
    district: z.string().nullable().optional(),
    ward: z.string().nullable().optional(),
    street: z.string().nullable().optional(),
  }).superRefine((data, ctx) => {
    if (!data.province) {
      return ctx.addIssue({
        path: [],
        code: "custom",
        message: "Tỉnh không được để trống",
      });
    }

    if (!data.district) {
      ctx.addIssue({
        path: [],
        code: "custom",
        message: "Huyện không được để trống",
      });
    }
    if (!data.ward) {
      ctx.addIssue({
        path: [],
        code: "custom",
        message: "Xã không được để trống",
      });
    }
    if (!data.street) {
      ctx.addIssue({
        path: [],
        code: "custom",
        message: "Đường không được để trống",
      });
    }
  }),
})

const putPersonalInformation = async (
  url: string,
  { arg }: { arg: z.infer<typeof formSchema> }
) => {
  const formData = parseObjectToFormData(arg);
  const res = await fetch('/api/users/me', {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) throw new Error("Failed to update personal information");
  const payload = await res.json();
  return payload.data;
};

export default function PersonalInformation({ data }: { data: any }) {
  const [isEditing, setIsEditing] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { address: data?.address },
  });

  const toggleEditing = useCallback(() => setIsEditing(prev => {
    if (prev) form.reset();
    return !prev;
  }), [form]);

  const { trigger, isMutating } = useSWRMutation('/api/users/me', putPersonalInformation);
  const { mutate } = useSWRConfig();

  const onSubmit = useCallback((values: z.infer<typeof formSchema>) => {
    const dirtyFields = form.formState.dirtyFields;
    const dirtyValues = Object.keys(dirtyFields).reduce((acc, field: keyof z.infer<typeof formSchema>) => {
      if (dirtyFields[field]) {
        (acc as any)[field] = values[field];
      }
      return acc;
    }, {} as z.infer<typeof formSchema>);
    console.log('Dirty Values:', dirtyValues);

    toast.promise(trigger(values), {
      loading: 'Đang cập nhật...',
      success: () => {
        mutate('/api/users/me', (prev: object) => ({ ...prev, ...dirtyValues }));
        form.reset(dirtyValues);
        return 'Cập nhật thông tin thành công'
      },
      error: 'Cập nhật thông tin thất bại'
    })
  }, [form, mutate, trigger]);

  const isNotDirty = areAddressesEqual(form.getValues().address, data?.address);

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Địa điểm</span>
          <Button variant={isEditing ? "destructive" : "secondary"} onClick={toggleEditing}>{!isEditing ? "Sửa" : "Hủy"}</Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex gap-4 max-sm:flex-col max-sm:items-center">
        {!isEditing ? (
          <div className="flex flex-col gap-2 w-full">
            <p>Tỉnh/Thành phố: {data?.address?.province || "Chưa thiết lập"}</p>
            <p>Quận/Huyện: {data?.address?.district || "Chưa thiết lập"}</p>
            <p>Phường/Xã: {data?.address?.ward || "Chưa thiết lập"}</p>
            <p>Địa chỉ chi tiết: {data?.address?.street || "Chưa thiết lập"}</p>
          </div>
        ) : (
          <Form {...form}>
            <form className="flex flex-col gap-2 w-full" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <LocationSelect {...field} disabled={isMutating} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button className="w-full" disabled={isNotDirty || isMutating}>
                Lưu thay đổi
              </Button>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  )
}

const areFalsyOrEqual = (value1: any, value2: any): boolean => {
  if (!value1 && !value2) return true;
  return value1 === value2;
};

const areAddressesEqual = (address1: ILocation, address2: ILocation): boolean => {
  return (
    areFalsyOrEqual(address1.province, address2.province) &&
    areFalsyOrEqual(address1.district, address2.district) &&
    areFalsyOrEqual(address1.ward, address2.ward) &&
    areFalsyOrEqual(address1.street, address2.street)
  );
};
