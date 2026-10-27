import { NextRequest, NextResponse } from "next/server";
import { getClientIp, getLikeState, toggleLike } from "@/lib/likes";

export async function GET(request: NextRequest, { params }: { params: Promise<{ name: string }> }) {
    const { name } = await params;
    const ip = getClientIp(request.headers);

    const result = await getLikeState(decodeURIComponent(name), ip);
    return NextResponse.json(result);
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ name: string }> }) {
    const { name } = await params;
    const ip = getClientIp(request.headers);

    const result = await toggleLike(decodeURIComponent(name), ip);
    return NextResponse.json(result);
}
