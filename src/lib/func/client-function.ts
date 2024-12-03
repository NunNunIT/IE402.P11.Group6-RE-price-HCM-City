"use client";

import { MouseEvent } from 'react';

interface ILoveLocationProps {
  locationId: string;
  isLoved: boolean;
}

const toggleLoveLocation = async ({ locationId, isLoved }: ILoveLocationProps) => {
  try {
    const res = await fetch(`/api/users/me/locations/${locationId}`, {
      method: "POST",
      body: JSON.stringify({ isLoved }),
    });
    if (!res.ok) throw new Error("An error occurred while toggling love the location");

    return undefined;
  } catch (error) {
    return error.message;
  }
};

interface ILoveEventProps {
  eventId: string;
  isLoved: boolean;
}

const toggleLoveEvent = async ({ eventId, isLoved }: ILoveEventProps) => {
  try {
    const res = await fetch(`/api/users/me/events/${eventId}`, {
      method: "POST",
      body: JSON.stringify({ isLoved }),
    });
    if (!res.ok) throw new Error("An error occurred while loving the location");

    return undefined;
  } catch (error) {
    return error.message;
  }
};

interface IToggleAttendEventGroupProps {
  _id: string;
  _eventGroupId: string;
  action: "join" | "leave";
}

const toggleAttendEventGroup = async ({ _id, _eventGroupId, action }: IToggleAttendEventGroupProps) => {
  const res = await fetch(`/api/users/me/groups/${_id}/event-groups/${_eventGroupId}`, {
    method: "POST",
    body: JSON.stringify({ action }),
  });
  if (!res.ok) throw new Error("An error occurred while toggle attending the event group");

  return action;
}

const joinGroup = async (event: MouseEvent<HTMLButtonElement>, props: any) => {
  const res = await fetch(`/api/users/me/groups/${props._id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "join" }),
  });
  if (!res.ok) throw new Error("Có lỗi xảy ra");
  await props?.onClick(event);
}

const parseUrlsToImgFilesOrUrls = async (
  imageUrls: string[],
  fileName: string
): Promise<(string | File)[]> =>
  Promise.all(
    imageUrls.map((imageUrl, index) => {
      if (!imageUrl.startsWith("blob")) {
        return imageUrl; // Return the original URL if it's not a blob
      }

      return fetch(imageUrl)
        .then((response) => response.blob())
        .then((blob) => new File([blob], `${fileName}_${index}.webp`, { type: "image/webp" }));
    })
  );

const convertBlobUrlsToImgFiles = async (imageUrls: string[], fileName: string): Promise<File[]> =>
  Promise.all(
    imageUrls.map((imageUrl, index) => {
      if (!imageUrl.startsWith("blob")) {
        throw new Error("The URL is not a blob");
      }

      return fetch(imageUrl)
        .then((response) => response.blob())
        .then((blob) => new File([blob], `${fileName}_${index}.webp`, { type: "image/webp" }));
    })
  );

const POSTGroupEdit = async (data: FormData, _id: string) => {
  const res = await fetch(`/api/users/me/groups/${_id}/edit`, {
    method: "POST",
    body: data,
  });

  if (!res.ok)
    throw new Error("Failed to update group");

  const payload = await res.json();
  return payload.data;
}

function getCldPublicIdFromUrl(url: string): string | undefined {
  try {
    const startIndex = url.indexOf("upload/") + "upload/".length;
    const str = url.slice(startIndex).split("/").slice(1).join("/");
    const endIndex = str.lastIndexOf(".");
    const publicId = str.substring(0, endIndex);
    return publicId;
  } catch (error) {
    console.error(">> Error in getCldPublicIdFromUrl:", error.message);
    return undefined;
  }
}

export {
  toggleLoveLocation,
  toggleLoveEvent,
  toggleAttendEventGroup,
  parseUrlsToImgFilesOrUrls,
  convertBlobUrlsToImgFiles,
  joinGroup,
  POSTGroupEdit,
  getCldPublicIdFromUrl
};
