"use client";

import { PersonalInformation, PersonalLocation } from "./components";

import { Skeleton } from "@/components/ui/skeleton";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then(res => res.json()).then(payload => payload.data);

export default function UserPage() {
  const { data, isLoading, error } = useSWR('/api/users/me', fetcher);

  return isLoading || error ? (
    <>
      <Skeleton />
      <Skeleton />
    </>
  ) : (
    <>
      <PersonalInformation data={data} />
      <PersonalLocation data={data} />
    </>
  )
}