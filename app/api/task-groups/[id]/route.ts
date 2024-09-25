import { deleteTodoGroupDb, updateTodoGroupDb } from "@/src/data/todo-group.db";
import { TodoGroup } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { handlePrismaError, IdQueryParam } from "../../api-utils";

// PATCH for update
export async function PATCH(
  req: NextRequest,
  { params: { id } }: IdQueryParam
) {
  return handlePrismaError(async () => {
    const data = (await req.json()) as TodoGroup;
    const todoGroups = await updateTodoGroupDb(id, data);
    return NextResponse.json(todoGroups);
  });
}

// DELETE for delete
export async function DELETE(
  _req: NextRequest,
  { params: { id } }: IdQueryParam
) {
  return handlePrismaError(async () => {
    const todoGroup = await deleteTodoGroupDb(`${id}`);
    return NextResponse.json(todoGroup);
  });
}
