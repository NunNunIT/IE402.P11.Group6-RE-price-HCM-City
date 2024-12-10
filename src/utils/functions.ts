import { LOCATION_API_URL_UNFORMATTED, ROLES } from "./constants";

import { IUser } from "@/lib/model";
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

export const objectToSearchParams = (obj: Record<string, any>): string => {
  return new URLSearchParams(obj).toString();
}
