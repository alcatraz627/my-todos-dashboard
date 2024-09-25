import { createTodoGroupDb, listTodoGroupsDb } from "@/src/data/todo-group.db";
import { TodoGroup } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { handlePrismaError } from "../api-utils";

// GET for list
export async function GET() {
  return handlePrismaError(async () => {
    const todoGroups = await listTodoGroupsDb();
    return NextResponse.json(todoGroups);
  });
}

// POST for create
export async function POST(req: NextRequest) {
  return handlePrismaError(async () => {
    const data = (await req.json()) as TodoGroup;
    const todoGroups = await createTodoGroupDb(data);

    return NextResponse.json(todoGroups);
  });
}
