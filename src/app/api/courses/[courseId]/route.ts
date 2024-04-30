import db from "@/db/drizzle";
import { getIsAdmin } from "@/db/queries";
import { courses } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params: { courseId } }: { params: { courseId: number } },
) {
  const isAdmin = await getIsAdmin();

  if (!isAdmin) {
    return new NextResponse("unAuthorized", { status: 401 });
  }

  const data = await db.query.courses.findFirst({
    where: eq(courses.id, courseId),
  });
  return NextResponse.json(data);
}

export async function PUT(
  req: Request,
  { params: { courseId } }: { params: { courseId: number } },
) {
  const isAdmin = await getIsAdmin();

  if (!isAdmin) {
    return new NextResponse("unAuthorized", { status: 401 });
  }

  const body = await req.json();

  const data = await db
    .update(courses)
    .set({
      ...body,
    })
    .where(eq(courses.id, courseId))
    .returning();

  return NextResponse.json(data[0]);
}

export async function DELETE(
  req: Request,
  { params: { courseId } }: { params: { courseId: number } },
) {
  const isAdmin = await getIsAdmin();

  if (!isAdmin) {
    return new NextResponse("unAuthorized", { status: 401 });
  }

  const data = await db
    .delete(courses)
    .where(eq(courses.id, courseId))
    .returning();

  return NextResponse.json(data[0]);
}
