import { listTodos } from "@/src/data/todos";
import { NextResponse } from "next/server";

export async function GET() {
  const todos = await listTodos();
  return NextResponse.json(todos);
}
