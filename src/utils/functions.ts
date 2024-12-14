import { LOCATION_API_URL_UNFORMATTED, ROLES } from "./constants";

import { ENUM_ROLE } from "./enums";
import { IUser } from "@/lib/model";
import { Session } from "next-auth";
import { TPermission } from "@/types/types-import";

export function checkIncludeByAscii(str: string | null, searchStr: string | null): boolean {
  if (typeof str !== "string" || typeof searchStr !== "string") {
    return false;
  }

  return unicodeToAscii(str.trim().toLowerCase()).includes(
    unicodeToAscii(searchStr.trim().toLowerCase())
  );
}

export function unicodeToAscii(str?: string | null): string {
  if (typeof str !== "string")
    return "";

  // Define mappings of special characters to ASCII
  const a = "àáäâãåăæąçćčđďèéěėëêęğǵḧìíïîįłḿǹńňñòóöôœøṕŕřßşśšșťțùúüûǘůűūųẃẍÿýźžż·/_,:;";
  const b = "aaaaaaaaacccddeeeeeeegghiiiiilmnnnnooooooprrsssssttuuuuuuuuuwxyyzzz------";

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
    unicodeToAscii(str.trim().toLowerCase()) === unicodeToAscii(searchStr.trim().toLowerCase())
  );
}

export async function getRelativeLocation(
  location: TPosition,
): Promise<any> {
  const LOCATION_API_URL: string =
    LOCATION_API_URL_UNFORMATTED.replace("{}", location.lat.toString()).replace(
      "{}",
      location.long.toString()
    ) +
    "&zoom=13";

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
  permission: TPermission,
) => {
  return ((ROLES[user.role] ?? []) as readonly TPermission[]).includes(permission);
}

export const parseObjectToSearchParams = (obj: Record<string, any>): string => {
  return new URLSearchParams(obj).toString();
}

export const isVisibleContext = (session: Session, data: { isNeedAuth?: boolean, isNeedHighPermission?: boolean }) => {
  return (!data.isNeedAuth
    || session?.user)
    && (!data.isNeedHighPermission
      || [ENUM_ROLE.Admin, ENUM_ROLE.Staff].includes(session?.user.role))
}

export const parseFormDataToObject = (formData: FormData): Record<string, any> => {
  const obj: Record<string, any> = {};

  formData.forEach((value, key) => {
    let parsedValue;

    // Try to parse the value as JSON if it's a string
    if (typeof value === 'string') {
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

export const parseObjectToFormData = (obj: Record<string, any>, parentKey?: string): FormData => {
  const formData = new FormData();

  const appendValue = (key: string, value: any) => {
    if (Array.isArray(value)) {
      value.forEach((item) => {
        formData.append(key, item);
      });
    } else if (typeof value === 'object' && value !== null) {
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
