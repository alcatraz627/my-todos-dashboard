import { deleteTodoDb, updateTodoDb } from "@/src/data/todos.db";
import { Todo } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { handlePrismaError, IdQueryParam, PatchPayload } from "../../api-utils";

// PATCH for update
export async function PATCH(
  req: NextRequest,
  { params: { id } }: IdQueryParam
) {
  return handlePrismaError(async () => {
    const data = (await req.json()) as PatchPayload<Todo>;
    const todo = await updateTodoDb(id, data);

    return NextResponse.json(todo);
  });
}

// DELETE for delete
export async function DELETE(
  _req: NextRequest,
  { params: { id } }: IdQueryParam
) {
  return handlePrismaError(async () => {
    const todo = await deleteTodoDb(`${id}`);
    return NextResponse.json(todo);
  });
}
