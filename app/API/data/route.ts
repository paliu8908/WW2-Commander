import { NextResponse } from "next/server";
import clientPromise from "@/app/database/database.service";

export async function GET() {
    const client = await clientPromise;
    const db = client.db("gamedata");
    const raw = await db.collection("nation").findOne({_id: "nations"} as any);

    if(!raw) return NextResponse.json([]);

    const data = Object.keys(raw).filter((key) => key != "_id").map((key) => raw[key]);

    return NextResponse.json(data);
}

export async function POST(req: Request) {
    const body = await req.json();

    const client = await clientPromise;
    const db = client.db("gamedata");
    const result = await db.collection("nation").insertOne(body);

    return NextResponse.json(result);
}