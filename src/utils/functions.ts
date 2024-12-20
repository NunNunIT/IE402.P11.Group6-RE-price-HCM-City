import { LOCATION_API_URL_UNFORMATTED, ROLES, SORT_VALUE_MAPPING } from "./constants";

import { ENUM_ROLE } from "./enums";
import { IUser } from "@/lib/model";
import { Session } from "next-auth";
import { TPermission } from "@/types/types-import";

export function checkIncludeByAscii(
  str: string | null,
  searchStr: string | null
): boolean {
  if (typeof str !== "string" || typeof searchStr !== "string") {
    return false;
  }

  return unicodeToAscii(str.trim().toLowerCase()).includes(
    unicodeToAscii(searchStr.trim().toLowerCase())
  );
}

export function unicodeToAscii(str?: string | null): string {
  if (typeof str !== "string") return "";

  // Define mappings of special characters to ASCII
  const a =
    "àáäâãåăæąçćčđďèéěėëêęğǵḧìíïîįłḿǹńňñòóöôœøṕŕřßşśšșťțùúüûǘůűūųẃẍÿýźžż·/_,:;";
  const b =
    "aaaaaaaaacccddeeeeeeegghiiiiilmnnnnooooooprrsssssttuuuuuuuuuwxyyzzz------";

  // Create a regular expression for special characters
  const p = new RegExp(a.split("").join("|"), "g");

  return str
    .toLowerCase() // Convert to lowercase
    .replace(/[áàảạãăắằẳẵặâấầẩẫậ]/gi, "a")
    .replace(/[éèẻẽẹêếềểễệ]/gi, "e")
    .replace(/[iíìỉĩị]/gi, "i")
    .replace(/[óòỏõọôốồổỗộơớờởỡợ]/gi, "o")
    .replace(/[úùủũụưứừửữự]/gi, "u")
    .replace(/[ýỳỷỹỵ]/gi, "y")
    .replace(/đ/gi, "d")
    .replace(p, (c) => b.charAt(a.indexOf(c)));
}

export function checkByAscii(str: string, searchStr: string): boolean {
  return (
    unicodeToAscii(str.trim().toLowerCase()) ===
    unicodeToAscii(searchStr.trim().toLowerCase())
  );
}

export async function getRelativeLocation(location: TPosition): Promise<any> {
  const LOCATION_API_URL: string =
    LOCATION_API_URL_UNFORMATTED.replace("{}", location.lat.toString()).replace(
      "{}",
      location.long.toString()
    ) + "&zoom=13";

  try {
    const payload = await fetch(LOCATION_API_URL).then((res) => res.json());

    return payload;
  } catch (error) {
    console.error(">> Error in getRelativeLocation", error.message);
    return null;
  }
}

export const hasPermission = (
  user: Pick<Partial<IUser>, "role">,
  permission: TPermission
) => {
  return ((ROLES[user.role] ?? []) as readonly TPermission[]).includes(
    permission
  );
};

export const parseObjectToSearchParams = (obj: Record<string, any>): string => {
  const filteredObj = Object.fromEntries(
    Object.entries(obj).filter(([, value]) =>
      value !== null && value !== undefined)
  );
  return new URLSearchParams(filteredObj).toString();
};

export const isVisibleContext = (
  session: Session,
  data: { isNeedAuth?: boolean; isNeedHighPermission?: boolean }
) => {
  return (
    (!data.isNeedAuth || session?.user) &&
    (!data.isNeedHighPermission ||
      [ENUM_ROLE.Admin, ENUM_ROLE.Staff].includes(session?.user.role))
  );
};

export const parseFormDataToObject = (
  formData: FormData
): Record<string, any> => {
  const obj: Record<string, any> = {};

  formData.forEach((value, key) => {
    let parsedValue;

    // Try to parse the value as JSON if it's a string
    if (typeof value === "string") {
      try {
        parsedValue = JSON.parse(value);
      } catch {
        // If parsing fails, leave the value as a string
        parsedValue = value;
      }
    } else {
      parsedValue = value;
    }

    // Handle multiple values for the same key
    if (obj[key]) {
      if (!Array.isArray(obj[key])) {
        obj[key] = [obj[key]]; // Convert to array if not already
      }
      obj[key].push(parsedValue);
    } else {
      obj[key] = parsedValue;
    }
  });

  return obj;
};

export const parseObjectToFormData = (
  obj: Record<string, any>,
  parentKey?: string
): FormData => {
  const formData = new FormData();

  const appendValue = (key: string, value: any) => {
    if (Array.isArray(value)) {
      value.forEach((item) => {
        formData.append(key, item);
      });
    } else if (typeof value === "object" && value !== null) {
      formData.append(key, JSON.stringify(value));
    } else {
      formData.append(key, value);
    }
  };

  if (parentKey) {
    formData.append(parentKey, JSON.stringify(obj));
  } else {
    Object.keys(obj).forEach((key) => appendValue(key, obj[key]));
  }

  return formData;
};

export const sortHandler = <T>(sort: string | string[] | null) => {
  const sortCriteria = Array.isArray(sort) ? sort : [sort];
  let useHaversine = false;
  let lat = 0, long = 0;
  const mongooseSort = { createdAt: -1 } as Record<keyof T, 1 | -1>;

  for (const sortParam of sortCriteria) {
    if (sortParam) {
      const [sortField, sortValue = "-1"] = sortParam.split(":");

      if (sortField === "locate") {
        const [latStr, lonStr] = sortValue.split(",");
        lat = parseFloat(latStr);
        long = parseFloat(lonStr);

        if (isNaN(lat) || isNaN(long)) {
          throw new Error(`Invalid latitude or longitude: ${latStr}, ${lonStr}`);
        }

        useHaversine = true;
        continue;
      }

      if (!isValidSortValue(sortValue)) throw new Error(`Invalid sort value: ${sortValue}`);
      mongooseSort[sortField as keyof T] = SORT_VALUE_MAPPING[sortValue];
    }
  }

  return { locateSort: { useHaversine, lat, long }, mongooseSort };
};

export const isValidSortValue = (value: string): value is keyof typeof SORT_VALUE_MAPPING => {
  return Object.keys(SORT_VALUE_MAPPING).includes(value);
};

export function haversineDistance(
  loc1?: Partial<TPosition>,
  loc2?: Partial<TPosition>
): number | undefined {
  if (
    !isNotNullAndUndefined(loc1?.lat) ||
    !isNotNullAndUndefined(loc1?.long) ||
    !isNotNullAndUndefined(loc2?.lat) ||
    !isNotNullAndUndefined(loc2?.long)
  ) return undefined;

  const R = 6371; // Earth's radius in kilometers
  const dLat = ((loc1.lat - loc2.lat) * Math.PI) / 180;
  const dLon = ((loc1.long - loc2.long) * Math.PI) / 180;
  const a =
    Math.cos((loc1.lat * Math.PI) / 180) *
    Math.cos((loc2.lat * Math.PI) / 180) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2) +
    Math.sin(dLat / 2) * Math.sin(dLat / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function isNotNullAndUndefined<T>(value: T | null | undefined): value is T {
  return typeof value !== "undefined" && value !== null;
}

export function isInclude<T>(value: any, list: T[]): value is T {
  return list.includes(value)
}

export const retry = async <T>(fn: () => Promise<T>, retries = 3, delay = 1000): Promise<T> => {
  let attempts = 0;

  while (attempts < retries) {
    try {
      return await fn(); // Execute the function and return its result if successful
    } catch (error) {
      attempts++;
      console.error(`>> Attempt ${attempts} failed: ${error.message}`);
      if (attempts >= retries) {
        throw new Error('Max retries reached.');
      }

      const randomWaitingTime = Math.random();
      // Delay before the next attempt
      await new Promise(resolve => setTimeout(resolve, delay + randomWaitingTime));
    }
  }
}