import { NextResponse } from "next/server";

export const handlePrismaError = <T = unknown>(
  callback: () => Promise<NextResponse<T>>
) => {
  try {
    return callback();
  } catch (error) {
    console.log(error);
    return NextResponse.json(Object(error as Error), { status: 400 });
  }
};
