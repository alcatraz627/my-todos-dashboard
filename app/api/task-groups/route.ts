import { listTodoGroups } from "@/src/data/todo-group";
import { NextResponse } from "next/server";

export async function GET() {
  const todoGroups = await listTodoGroups();
  return NextResponse.json(todoGroups);
}
