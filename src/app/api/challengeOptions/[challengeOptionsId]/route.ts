import db from "@/db/drizzle";
import { getIsAdmin } from "@/db/queries";
import { challengeOptions } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  {
    params: { challengeOptionsId },
  }: { params: { challengeOptionsId: number } },
) {
  const isAdmin = await getIsAdmin();

  if (!isAdmin) {
    return new NextResponse("unAuthorized", { status: 401 });
  }

  const data = await db.query.challengeOptions.findFirst({
    where: eq(challengeOptions.id, challengeOptionsId),
  });
  return NextResponse.json(data);
}

export async function PUT(
  req: Request,
  {
    params: { challengeOptionsId },
  }: { params: { challengeOptionsId: number } },
) {
  const isAdmin = await getIsAdmin();

  if (!isAdmin) {
    return new NextResponse("unAuthorized", { status: 401 });
  }

  const body = await req.json();

  const data = await db
    .update(challengeOptions)
    .set({
      ...body,
    })
    .where(eq(challengeOptions.id, challengeOptionsId))
    .returning();

  return NextResponse.json(data[0]);
}

export async function DELETE(
  req: Request,
  {
    params: { challengeOptionsId },
  }: { params: { challengeOptionsId: number } },
) {
  const isAdmin = await getIsAdmin();

  if (!isAdmin) {
    return new NextResponse("unAuthorized", { status: 401 });
  }

  const data = await db
    .delete(challengeOptions)
    .where(eq(challengeOptions.id, challengeOptionsId))
    .returning();

  return NextResponse.json(data[0]);
}
