import { NextRequest, NextResponse } from "next/server";
import { getClientIp, toggleLike } from "@/lib/likes";

export async function POST(request: NextRequest, { params }: { params: Promise<{ name: string }> }) {
    const { name } = await params;
    const ip = getClientIp(request.headers);

    const result = await toggleLike(decodeURIComponent(name), ip);
    return NextResponse.json(result);
}
