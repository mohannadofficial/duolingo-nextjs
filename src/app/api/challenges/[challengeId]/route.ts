import db from "@/db/drizzle";
import { getIsAdmin } from "@/db/queries";
import { challenges } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params: { challengeId } }: { params: { challengeId: number } },
) {
  const isAdmin = await getIsAdmin();

  if (!isAdmin) {
    return new NextResponse("unAuthorized", { status: 401 });
  }

  const data = await db.query.challenges.findFirst({
    where: eq(challenges.id, challengeId),
  });
  return NextResponse.json(data);
}

export async function PUT(
  req: Request,
  { params: { challengeId } }: { params: { challengeId: number } },
) {
  const isAdmin = await getIsAdmin();

  if (!isAdmin) {
    return new NextResponse("unAuthorized", { status: 401 });
  }

  const body = await req.json();

  const data = await db
    .update(challenges)
    .set({
      ...body,
    })
    .where(eq(challenges.id, challengeId))
    .returning();

  return NextResponse.json(data[0]);
}

export async function DELETE(
  req: Request,
  { params: { challengeId } }: { params: { challengeId: number } },
) {
  const isAdmin = await getIsAdmin();

  if (!isAdmin) {
    return new NextResponse("unAuthorized", { status: 401 });
  }

  const data = await db
    .delete(challenges)
    .where(eq(challenges.id, challengeId))
    .returning();

  return NextResponse.json(data[0]);
}
