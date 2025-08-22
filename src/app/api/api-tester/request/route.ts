// src/app/api/api-tester/request/route.ts
import { NextRequest, NextResponse } from "next/server";
import { trackToolUsage } from "@/lib/toolUsage";

export async function POST(req: NextRequest) {
  const { url, method, headers, body } = await req.json();

  if (!url || !method) {
    return NextResponse.json({ message: "URL and method required" }, { status: 400 });
  }

  try {
    await trackToolUsage("api-tester");

    const response = await fetch(url, {
      method: method.toUpperCase(),
      headers: headers || {},
      body: method.toUpperCase() !== "GET" ? JSON.stringify(body) : undefined,
    });

    let data;
    try {
      data = await response.json();
    } catch {
      data = await response.text();
    }

    return NextResponse.json({ status: response.status, data });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return NextResponse.json({ message: err.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
