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

export type IdQueryParam = { params: { id: string } };

export type PatchPayload<
  T,
  I extends string = "id" | "created_at" | "updated_at"
> = Omit<Partial<T>, I>;

export type PatchPayloadWithId<T> = PatchPayload<T> & {
  id: string;
};
