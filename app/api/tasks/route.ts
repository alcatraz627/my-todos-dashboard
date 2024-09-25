import { createTodoDb, listTodosDb } from "@/src/data/todos.db";
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
