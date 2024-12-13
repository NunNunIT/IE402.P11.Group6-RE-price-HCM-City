import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ENUM_GENDER, MAPPING_GENDER, parseObjectToFormData } from "@/utils";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCallback, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import useSWRMutation from 'swr/mutation'
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import PersonalAvatar from "./personal-avatar";
import { useSWRConfig } from "swr";

const formSchema = z.object({
  username: z.string().min(3, "Tên phải có ít nhất 3 ký tự"),
  phone: z.string().optional(),
  gender: z.nativeEnum(ENUM_GENDER),
})

const putPersonalInformation = async (
  url: string,
  { arg }: { arg: z.infer<typeof formSchema> }
) => {
  const formData = parseObjectToFormData(arg);
  const res = await fetch('/api/users/me', {
    method: 'POST',
    body: formData,
  })
  if (!res.ok) throw new Error("Failed to update personal information");
  const payload = await res.json();
  return payload.data;
};

export default function PersonalInformation({ data }: { data: any }) {
  const [isEditing, setIsEditing] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: data,
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

    toast.promise(trigger(dirtyValues), {
      loading: 'Đang cập nhật...',
      success: () => {
        mutate('/api/users/me', (prev: object) => ({ ...prev, ...dirtyValues }));
        form.reset(dirtyValues);
        return 'Cập nhật thông tin thành công'
      },
      error: 'Cập nhật thông tin thất bại'
    })
  }, [form, mutate, trigger]);

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Thông tin cá nhân</span>
          <Button variant={isEditing ? "destructive" : "secondary"} onClick={toggleEditing}>{!isEditing ? "Sửa" : "Hủy"}</Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex gap-4 max-sm:flex-col max-sm:items-center">
        <PersonalAvatar data={data} className="relative" />
        {!isEditing ? (
          <div className="flex flex-col gap-2 w-full">
            <p>Tên: {data?.username}</p>
            <p>Email: {data?.email}</p>
            <p>Số điện thoại: {data?.phone ?? "Chưa thiết lập"}</p>
            <p>Giới tính: {MAPPING_GENDER[(data?.gender as unknown as ENUM_GENDER) ?? ENUM_GENDER.Unknown]}</p>
          </div>
        ) : (
          <Form {...form}>
            <form className="flex flex-col gap-2 w-full" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isMutating} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormItem>
                <FormLabel>Email</FormLabel>
                <Input defaultValue={data?.email} disabled />
              </FormItem>

              <FormField
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Số điện thoại</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isMutating} placeholder="Thêm số điện thoại" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Giới tính</FormLabel>
                    <FormControl>
                      {/* <Input {...field} /> */}
                      <Select defaultValue={field.value} onValueChange={field.onChange} disabled={isMutating}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.values(ENUM_GENDER).map((value) => (
                            <SelectItem key={value} value={value}>
                              {MAPPING_GENDER[value as keyof typeof MAPPING_GENDER]}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full" disabled={!Object.keys(form.formState.dirtyFields).length || isMutating}>
                Lưu thay đổi
              </Button>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>

  )
}