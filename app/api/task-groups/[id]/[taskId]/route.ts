import { IdQueryParam, handlePrismaError } from "@/app/api/api-utils";
import { assignTodoToGroupDb } from "@/src/data/todo-group.db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params: { id, taskId } }: IdQueryParam<"id" | "taskId">
) {
  return handlePrismaError(async () => {
    const response = await assignTodoToGroupDb({
      groupId: id,
      todoId: taskId,
    });
    return NextResponse.json(response);
  });
}
