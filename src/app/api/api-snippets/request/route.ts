import { NextResponse } from "next/server";
import sequelize from "@/lib/db";
import Snippet from "../../../model/Snippet";

export async function POST(req: Request) {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });

    const { code } = await req.json();
    if (!code) {
      return NextResponse.json({ error: "Code is required" }, { status: 400 });
    }

    const snippet = await Snippet.create({ code });

    return NextResponse.json({ id: snippet.id });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  const snippet = await Snippet.findByPk(id);

  if (!snippet) {
    return NextResponse.json({ error: "Snippet not found" }, { status: 404 });
  }

  return NextResponse.json(snippet);
}
