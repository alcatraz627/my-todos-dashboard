import {
  createTodoDb,
  deleteTodoDb,
  listTodosDb,
  updateTodoDb,
} from "@/src/data/todos";
import { Todo } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { handlePrismaError } from "../api-utils";

// GET for list
export async function GET() {
  return handlePrismaError(async () => {
    const todos = await listTodosDb();
    return NextResponse.json(todos);
  });
}

// POST for create
export async function POST(req: NextRequest) {
  return handlePrismaError(async () => {
    const data = (await req.json()) as Todo;
    const todo = await createTodoDb(data);

    return NextResponse.json(todo);
  });
}

// PATCH for update
export async function PATCH(req: NextRequest) {
  return handlePrismaError(async () => {
    const data = (await req.json()) as Todo;
    const todo = await updateTodoDb(data);

    return NextResponse.json(todo);
  });
}

// DELETE for delete
export async function DELETE(req: NextRequest) {
  return handlePrismaError(async () => {
    const { id } = (await req.json()) as { id: string };

    const todo = await deleteTodoDb(`${id}`);
    return NextResponse.json(todo);
  });
}
