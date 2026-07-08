// Avança Talentos — API Notion v3 (sem auth para validação)
import { Client } from "@notionhq/client";
import { NextRequest, NextResponse } from "next/server";

const notion = new Client({ auth: process.env.NOTION_TOKEN });

function paragraph(text: string) {
  return {
    object: "block" as const,
    type: "paragraph" as const,
    paragraph: { rich_text: [{ type: "text" as const, text: { content: text } }] },
  };
}

function textContent(blocks: any[]): string {
  return blocks.map((b: any) => b.plain_text || "").join("");
}

const ROOT_PAGE_ID = "3976f51b106880638396f23f98ee1d31";

async function getOrCreateRootPage(): Promise<string> {
  return ROOT_PAGE_ID;
}

async function createCiclo(body: any) {
  const { ciclo } = body;
  const page = await notion.pages.create({
    parent: { type: "page_id", page_id: await getOrCreateRootPage() },
    properties: { title: { title: [{ text: { content: "Ciclo — " + ciclo.colaborador } }] } },
    children: [
      paragraph("COLABORADOR: " + ciclo.colaborador),
      paragraph("GESTOR: " + ciclo.gestor),
      paragraph("RH: " + ciclo.rh),
      paragraph("CARGO: " + (ciclo.cargo || "—")),
      paragraph("AREA: " + (ciclo.area || "—")),
      paragraph("CRIADO_EM: " + ciclo.criadoEm),
      paragraph("STATUS: Em andamento"),
      paragraph("ID_CICLO: " + ciclo.id),
      paragraph(""),
      paragraph("COMPETENCIAS: " + ciclo.comps.join(",")),
    ],
  });
  return { pageId: page.id };
}

async function saveCicloData(body: any) {
  const { pageId, tipo, dados, fatosGestor, fatosAuto } = body;
  const lines = [
    "",
    "=== " + tipo.toUpperCase() + " ===",
    "Data: " + new Date().toLocaleDateString("pt-BR"),
    ...Object.entries(dados || {}).map(([k, v]: any) => k + ": " + JSON.stringify(v)),
  ];
  if (fatosGestor) {
    lines.push("=== FATOS_GESTOR ===");
    Object.entries(fatosGestor).forEach(([k, v]: any) => lines.push(k + ": " + v));
  }
  if (fatosAuto) {
    lines.push("=== FATOS_AUTO ===");
    Object.entries(fatosAuto).forEach(([k, v]: any) => lines.push(k + ": " + v));
  }
  await notion.blocks.children.append({
    block_id: pageId,
    children: lines.map(t => paragraph(t)),
  });
  return { ok: true };
}

async function listCiclos(rhEmail: string) {
  const rootId = await getOrCreateRootPage();
  const children = await notion.blocks.children.list({ block_id: rootId });
  const ciclos = [];
  for (const block of children.results as any[]) {
    if (block.type !== "child_page") continue;
    if (!block.child_page?.title?.startsWith("Ciclo —")) continue;
    try {
      const blocks = await notion.blocks.children.list({ block_id: block.id });
      const blockList = blocks.results as any[];
      const fullText = blockList
        .filter((b: any) => b.type === "paragraph")
        .map((b: any) => textContent(b.paragraph.rich_text))
        .join("\n");
      if (!fullText.includes("RH: " + rhEmail)) continue;
      const get = (label: string) =>
        fullText.match(new RegExp(label + ":\\s*(.+)"))?.[1]?.trim() || "";
      const compsRaw = get("COMPETENCIAS");
      ciclos.push({
        pageId: block.id,
        colaborador: get("COLABORADOR"),
        gestor: get("GESTOR"),
        rh: get("RH"),
        cargo: get("CARGO"),
        area: get("AREA"),
        criadoEm: get("CRIADO_EM"),
        status: get("STATUS") || "Em andamento",
        comps: compsRaw ? compsRaw.split(",").map(Number) : [],
        temGestor: fullText.includes("=== GESTOR ==="),
        temAuto: fullText.includes("=== AUTO ==="),
        temConsenso: fullText.includes("=== CONSENSO ==="),
      });
    } catch { continue; }
  }
  return ciclos;
}

async function getCicloData(pageId: string) {
  const blocks = await notion.blocks.children.list({ block_id: pageId });
  const blockList = blocks.results as any[];
  const fullText = blockList
    .filter((b: any) => b.type === "paragraph")
    .map((b: any) => textContent(b.paragraph.rich_text))
    .join("\n");
  const get = (label: string) =>
    fullText.match(new RegExp(label + ":\\s*(.+)"))?.[1]?.trim() || "";
  const compsRaw = get("COMPETENCIAS");
  return {
    pageId,
    colaborador: get("COLABORADOR"),
    gestor: get("GESTOR"),
    rh: get("RH"),
    cargo: get("CARGO"),
    area: get("AREA"),
    criadoEm: get("CRIADO_EM"),
    status: get("STATUS"),
    comps: compsRaw ? compsRaw.split(",").map(Number) : [],
  };
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { action } = body;

  try {
    if (action === "create") return NextResponse.json(await createCiclo(body));
    if (action === "list") return NextResponse.json(await listCiclos(body.rhEmail));
    if (action === "get") return NextResponse.json(await getCicloData(body.pageId));
    if (action === "saveGestor") return NextResponse.json(await saveCicloData({ ...body, tipo: "GESTOR" }));
    if (action === "saveAuto") return NextResponse.json(await saveCicloData({ ...body, tipo: "AUTO" }));
    if (action === "saveConsenso") return NextResponse.json(await saveCicloData({ ...body, tipo: "CONSENSO" }));
    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
