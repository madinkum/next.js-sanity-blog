// ./src/app/api/comments/submit/route.js


import { NextResponse } from "next/server";
import { supabase } from "../../library/server";

export async function POST(req:any) {
  const body = await req.json();

  const { post_id, email, comment, nickname, uid } = body;

  const { data, error } = await supabase
    .from("comments1")
    .insert({
      post_id,
      email,
      nickname,
      payload: comment,
    })
    .select("id");

  if (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }

  return new NextResponse(JSON.stringify({ success: true }), {
    status: 200,
  });
}