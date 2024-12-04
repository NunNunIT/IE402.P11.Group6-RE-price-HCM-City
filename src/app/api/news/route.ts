import path from "path";
import { promises as fs } from "fs";

export async function GET() {
  const filePath = path.join(process.cwd(), "src/app/content/news.json");
  const fileData = await fs.readFile(filePath, "utf-8");
  const jsonData = JSON.parse(fileData);
  return new Response(JSON.stringify(jsonData), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
