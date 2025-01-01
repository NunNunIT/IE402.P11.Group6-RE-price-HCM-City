"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { signIn, useSession } from "next-auth/react";

const FormSchema = z.object({
  email: z.string().min(1, {
    message: "Email không được bỏ trống",
  }).email("Email không hợp lệ"),
  password: z.string().min(1, {
    message: "Mật khẩu không được bỏ trống",
  }),
});

const loginByAdminStaff = async (data: ICredentials) => {
  if (!data.email || !data.password) throw new Error("Missing email or password!");

  try {
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (result.error) throw new Error(result.error);
    return result;
  } catch (err) {
    console.log(err);
    return { error: "Invalid email or password" };
  }
}

export default function AdminLoginForm() {
  const [isPending, setIsPending] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsPending(true);
    const res = await loginByAdminStaff(data as ICredentials);
    if (res?.error) {
      form.setError("email", { message: res.error });
      form.setError("password", { message: res.error });
      setIsPending(false);
      return;
    }

    setIsPending(false);
  }

  return (
    <div className="max-w-3xl w-full mx-auto my-3 md:px-0 px-3">
      <h1 className="md:text-4xl text-2xl font-bold my-3">Đăng nhập</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="abc@gmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mật khẩu</FormLabel>
                <FormControl>
                  <Input placeholder="********" {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isPending}>
            Đăng nhập
          </Button>
        </form>
      </Form>
    </div>
  );
}
