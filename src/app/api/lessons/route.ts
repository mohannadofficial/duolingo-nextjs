import { NextResponse } from "next/server";
import db from "@/db/drizzle";
import { getIsAdmin } from "@/db/queries";
import { lessons } from "@/db/schema";

export async function GET(req: Request) {
  const isAdmin = await getIsAdmin();
  if (!isAdmin) {
    return new NextResponse("unAuthorized", { status: 401 });
  }
  const data = await db.query.lessons.findMany();

  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const isAdmin = await getIsAdmin();
  if (!isAdmin) {
    return new NextResponse("unAuthorized", { status: 401 });
  }
  const body = await req.json();

  const data = await db
    .insert(lessons)
    .values({
      ...body,
    })
    .returning();

  return NextResponse.json(data[0]);
}
