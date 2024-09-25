import {
  createTodoGroupDb,
  deleteTodoGroupDb,
  listTodoGroupsDb,
  updateTodoGroupDb,
} from "@/src/data/todo-group";
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

// PATCH for update
export async function PATCH(req: NextRequest) {
  return handlePrismaError(async () => {
    const data = (await req.json()) as TodoGroup;
    const todoGroups = await updateTodoGroupDb(data);

    return NextResponse.json(todoGroups);
  });
}

// DELETE for delete
export async function DELETE(req: NextRequest) {
  return handlePrismaError(async () => {
    const { id } = (await req.json()) as { id: string };
    const todoGroup = await deleteTodoGroupDb(`${id}`);
    return NextResponse.json(todoGroup);
  });
}
