import { Client } from "@notionhq/client";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

const notion = new Client({ auth: process.env.NOTION_TOKEN });

function textContent(blocks: any[]): string {
  return blocks.map((b: any) => b.plain_text || "").join("");
}

function paragraph(text: string) {
  return {
    object: "block" as const,
    type: "paragraph" as const,
    paragraph: { rich_text: [{ type: "text" as const, text: { content: text } }] },
  };
}

let rootPageCache: string | null = null;

async function getOrCreateRootPage(): Promise<string> {
  if (rootPageCache) return rootPageCache;
  const search = await notion.search({ query: "PDI App — Plataforma", filter: { property: "object", value: "page" } });
  if (search.results.length > 0) {
    rootPageCache = search.results[0].id;
    return rootPageCache;
  }
  const page = await notion.pages.create({
    parent: { type: "workspace", workspace: true } as any,
    properties: { title: { title: [{ text: { content: "PDI App — Plataforma" } }] } }
  });
  rootPageCache = page.id;
  return rootPageCache;
}

async function createPDI(body: any) {
  const { pdi } = body;
  const page = await notion.pages.create({
    parent: { type: "page_id", page_id: await getOrCreateRootPage() },
    properties: { title: { title: [{ text: { content: "PDI — " + pdi.nome
