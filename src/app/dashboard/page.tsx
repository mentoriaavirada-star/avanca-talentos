"use client";
import { useState, useEffect } from "react";

const COMPETENCIAS = [
  { id:1, fator:"Pensamento", nome:"Visão de negócio", desc:"Aplica conhecimento do negócio e mercado para avançar os objetivos da organização", acoes:["Leia relatórios setoriais mensalmente e analise tendências do mercado","Participe de reuniões estratégicas observando como decisões são tomadas","Converse com clientes internos e externos para entender necessidades reais","Mapeie os principais indicadores financeiros da sua área e acompanhe-os","Conecte suas decisões operacionais ao impacto no negócio"], tecnicas:["Análise SWOT do seu departamento","Mapeamento de stakeholders e suas expectativas"], leituras:["Estratégia Competitiva – Michael Porter","O Lado Difícil das Situações Difíceis – Ben Horowitz"] },
  { id:2, fator:"Pensamento", nome:"Qualidade da decisão", desc:"Toma boas decisões mesmo com informações incompletas", acoes:["Use frameworks de decisão como Matriz de Eisenhower","Documente suas decisões e revise os resultados após 30 dias","Busque perspectivas diversas antes de decidir","Estabeleça critérios claros de sucesso antes de decidir","Pratique decidir com 70% das informações disponíveis"], tecnicas:["Análise de prós e contras estruturada","Técnica dos 6 chapéus do pensamento"], leituras:["Pensando Devagar e Depressa – Daniel Kahneman","Decisive – Chip Heath & Dan Heath"] },
  { id:3, fator:"Pensamento", nome:"Mentalidade estratégica", desc:"Antecipa tendências futuras e posiciona a organização para o sucesso", acoes:["Conecte ações do dia a dia aos objetivos estratégicos","Facilite conversas sobre visão de futuro trimestralmente","Traduza estratégia em metas operacionais mensuráveis","Revise o planejamento com dados atualizados","Leia sobre tendências do setor mensalmente"], tecnicas:["Cenários futuros — planejamento por cenários","OKRs — Objectives and Key Results"], leituras:["Boa Estratégia, Má Estratégia – Richard Rumelt","Playing to Win – A.G. Lafley"] },
  { id:4, fator:"Pensamento", nome:"Gestão da ambiguidade", desc:"Age efetivamente mesmo sem todas as certezas", acoes:["Pratique tomar decisões sem buscar toda informação disponível","Trabalhe em projetos com escopo propositalmente aberto","Desenvolva planos com cenários alternativos","Reflita sobre situações passadas de incerteza e o que funcionou","Foque no próximo passo concreto possível"], tecnicas:["Planejamento por cenários: otimista, provável e pessimista","Prototipagem rápida de soluções"], leituras:["Antifrágil – Nassim Taleb","Liderança em Tempos de Crise – Ronald Heifetz"] },
  { id:5, fator:"Pensamento", nome:"Cultiva a inovação", desc:"Cria ideias novas e encontra soluções criativas para problemas", acoes:["Reserve 30 min por semana para explorar ideias sem julgamento","Aplique brainstorming reverso: como piorar o problema?","Observe práticas de outras indústrias e adapte à sua realidade","Crie ambiente seguro para a equipe propor ideias","Implemente pelo menos uma ideia nova por mês"], tecnicas:["Design Thinking aplicado ao problema","SCAMPER para geração de ideias"], leituras:["De Onde Vêm as Boas Ideias – Steven Johnson","Sprint – Jake Knapp"] },
  { id:6, fator:"Resultados", nome:"Orientação para ação", desc:"Age rapidamente aproveitando oportunidades sem esperar autorização", acoes:["Defina uma ação concreta para cada reunião que participar","Adote feito é melhor que perfeito para tarefas de baixo risco","Crie ritual matinal de definir as 3 prioridades do dia","Reduza ciclos de planejamento: teste, aprenda e ajuste","Elimine uma atividade que não gera valor por semana"], tecnicas:["Método GTD — Getting Things Done","Técnica Pomodoro para execução focada"], leituras:["Getting Things Done – David Allen","Essentialism – Greg McKeown"] },
  { id:7, fator:"Resultados", nome:"Planejamento e alinhamento", desc:"Planeja e prioriza o trabalho para atingir metas organizacionais", acoes:["Use roadmap trimestral com milestones mensais visíveis para a equipe","Aprenda e use ferramentas de gestão de projetos","Pratique delegar tarefas com critérios claros de qualidade e prazo","Realize retrospectivas mensais com lições aprendidas documentadas","Revise prioridades explicitamente toda semana com a equipe"], tecnicas:["Método Kanban para gestão visual do trabalho","OKRs para alinhamento de metas com a estratégia"], leituras:["Execution – Larry Bossidy","Sprint – Jake Knapp"] },
  { id:8, fator:"Resultados", nome:"Orientação a resultados", desc:"Consistentemente entrega resultados excepcionais mesmo em adversidade", acoes:["Estabeleça metas SMART com indicadores claros de acompanhamento","Faça check-ins semanais de progresso com sua equipe","Identifique e remova os 2 maiores obstáculos de entrega da equipe","Celebre conquistas intermediárias para manter a motivação","Revise métricas de desempenho abertamente com a equipe"], tecnicas:["Dashboard de indicadores de desempenho","Weekly Review — revisão semanal de metas"], leituras:["High Output Management – Andy Grove","Measure What Matters – John Doerr"] },
  { id:9, fator:"Resultados", nome:"Promove responsabilização", desc:"Mantém a si mesmo e outros responsáveis pelos resultados acordados", acoes:["Implante 1:1 semanais com cada liderado","Dê feedback direto e imediato quando acordos não são cumpridos","Documente compromissos em reuniões e compartilhe com todos","Revise métricas de desempenho abertamente com a equipe","Crie acordos claros de entrega com prazos bem definidos"], tecnicas:["Reuniões de accountability estruturadas","Contratos de performance individuais"], leituras:["Radical Candor – Kim Scott","O Poder da Responsabilidade – Mark Samuel"] },
  { id:10, fator:"Resultados", nome:"Empreendedorismo", desc:"Identifica e explora oportunidades de negócio com ousadia", acoes:["Mapeie oportunidades inexploradas na sua área ou mercado","Proponha projetos novos com business case estruturado","Valide ideias rapidamente com protótipos de baixo custo","Conecte-se com empreendedores para trocar experiências","Implemente um piloto antes de escalar qualquer ideia nova"], tecnicas:["Lean Canvas para validação de ideias de negócio","Análise de mercado e mapeamento de concorrentes"], leituras:["The Lean Startup – Eric Ries","Zero to One – Peter Thiel"] },
  { id:11, fator:"Pessoas", nome:"Comunicação eficaz", desc:"Comunica-se de forma clara, convincente e adaptada ao público", acoes:["Adapte seu estilo de comunicação ao público: técnico ou estratégico","Pratique a estrutura PREP: Ponto, Razão, Exemplo, Ponto","Grave-se em apresentações para identificar oportunidades de melhoria","Simplifique documentos eliminando jargões desnecessários","Confirme entendimento após comunicações importantes"], tecnicas:["Storytelling para apresentações de impacto","Comunicação Não-Violenta — CNV"], leituras:["Falar em Público – Dale Carnegie","Made to Stick – Chip Heath & Dan Heath"] },
  { id:12, fator:"Pessoas", nome:"Colabora", desc:"Constrói parcerias genuínas e trabalha bem com diferentes tipos de pessoas", acoes:["Mapeie as interdependências do seu trabalho e fortaleça essas relações","Participe de iniciativas cross-funcionais fora da sua área","Pratique ouvir ativamente sem interromper em reuniões","Ofereça ajuda proativa a colegas antes de serem solicitados","Reconheça publicamente a contribuição de outros"], tecnicas:["Mapa de stakeholders e colaboradores estratégicos","Dinâmicas de team building com a equipe"], leituras:["O Poder da Colaboração – Morten Hansen","Team of Teams – Stanley McChrystal"] },
  { id:13, fator:"Pessoas", nome:"Desenvolve talentos", desc:"Desenvolve intencionalmente pessoas para o futuro da organização", acoes:["Realize PDIs formais com cada membro da equipe trimestralmente","Delegue tarefas de desenvolvimento, não apenas operacionais","Ofereça feedback de desenvolvimento toda semana — não só corretivo","Conecte cada liderado com um mentor interno relevante","Identifique e explore os pontos fortes individuais de cada pessoa"], tecnicas:["Modelo 70-20-10 para desenvolvimento de talentos","Feedback SBI: Situação, Comportamento, Impacto"], leituras:["FYI: For Your Improvement – Korn Ferry","O Gerente Minuto – Ken Blanchard"] },
  { id:14, fator:"Pessoas", nome:"Gestão da equipe", desc:"Cria e mantém equipes de alto desempenho com foco em resultados coletivos", acoes:["Defina papéis, responsabilidades e metas claras para cada membro","Promova rituais de equipe: reuniões de alinhamento e celebrações","Identifique e desenvolva os pontos fortes individuais de cada pessoa","Crie ambiente psicologicamente seguro onde erros são aprendizados","Gerencie conflitos de forma construtiva e direta"], tecnicas:["Modelo de equipes de alta performance de Lencioni","Retrospectivas ágeis mensais com a equipe"], leituras:["The Five Dysfunctions of a Team – Patrick Lencioni","Equipes Brilhantes – Daniel Coyle"] },
  { id:15, fator:"Pessoas", nome:"Influência", desc:"Usa argumentos, dados e relacionamentos para influenciar sem autoridade formal", acoes:["Aprenda os princípios de persuasão de Cialdini e aplique no dia a dia","Construa argumentos baseados em dados e histórias reais","Entenda o que motiva cada stakeholder antes de apresentar uma proposta","Pratique apresentar ideias em 2 minutos — elevator pitch","Antecipe resistências e prepare argumentos antes de propor mudanças"], tecnicas:["Mapa de influência e poder organizacional","Técnica de negociação baseada em interesses comuns"], leituras:["As Armas da Persuasão – Robert Cialdini","Influence Without Authority – Allan Cohen"] },
  { id:16, fator:"Pessoas", nome:"Gestão de conflitos", desc:"Lida com situações de conflito de forma hábil e construtiva", acoes:["Nomeie o conflito explicitamente ao invés de evitá-lo","Ouça ativamente a perspectiva do outro antes de apresentar a sua","Busque interesses comuns por trás das posições opostas","Estabeleça acordos claros de comportamento na equipe","Envolva um terceiro neutro quando necessário"], tecnicas:["Modelo Thomas-Kilmann de resolução de conflitos","Comunicação Não-Violenta — CNV"], leituras:["Como Chegar ao Sim – Roger Fisher","Difficult Conversations – Douglas Stone"] },
  { id:17, fator:"Eu", nome:"Autoconhecimento", desc:"Conhece seus pontos fortes e limitações com clareza e humildade", acoes:["Solicite feedback 360° estruturado ao menos uma vez por ano","Mantenha diário de liderança: registre decisões e reflexões semanalmente","Trabalhe com coach executivo ou mentor para desenvolvimento pessoal","Compare sua autopercepção com a percepção dos outros regularmente","Reflita semanalmente sobre suas reações e decisões mais difíceis"], tecnicas:["Assessment de perfil comportamental","Janela de Johari para mapear autoconhecimento"], leituras:["Insight – Tasha Eurich","Liderança e Autoengano – Arbinger Institute"] },
  { id:18, fator:"Eu", nome:"Integridade e confiança", desc:"É visto como honesto, íntegro e confiável por todos ao redor", acoes:["Cumpra sempre o que prometeu ou comunique proativamente quando não conseguir","Seja transparente sobre erros cometidos e o que fará diferente","Alinhe consistentemente o que diz com o que faz no dia a dia","Não fale de pessoas de forma diferente na ausência delas","Assuma responsabilidade pelos resultados da sua equipe"], tecnicas:["Autoavaliação regular de valores e comportamentos","Contrato de integridade pessoal com metas de comportamento"], leituras:["A Velocidade da Confiança – Stephen M.R. Covey","Dare to Lead – Brené Brown"] },
  { id:19, fator:"Eu", nome:"Aprende ativamente", desc:"Busca ativamente aprender e crescer continuamente com novas experiências", acoes:["Crie plano de aprendizado pessoal com metas trimestrais mensuráveis","Dedique ao menos 1h por semana para aprendizado fora das demandas do trabalho","Compartilhe com a equipe o que está aprendendo para consolidar o conhecimento","Solicite desafios de desenvolvimento ao seu gestor regularmente","Aplique imediatamente o que aprendeu em situações reais de trabalho"], tecnicas:["Método Feynman para aprendizado profundo e acelerado","Mapa mental para consolidar e organizar novos conhecimentos"], leituras:["Mindset – Carol Dweck","Ultralearning – Scott Young"] },
  { id:20, fator:"Eu", nome:"Agilidade de aprendizado", desc:"Aprende rapidamente com a experiência e aplica o aprendizado em situações novas", acoes:["Após cada projeto faça revisão pessoal: o que aprendi? O que faria diferente?","Busque propositalmente experiências fora da sua zona de conforto profissional","Leia sobre áreas fora da sua especialidade para ampliar repertório","Observe como pessoas de alta performance aprendem e modele comportamentos","Peça para ser colocado em projetos desafiadores e novos"], tecnicas:["After Action Review — AAR para aprendizado pós-projeto","Portfólio de experiências diversas para ampliar perspectiva"], leituras:["Learning Agility – George Hallenbeck","The Growth Mindset Coach – Annie Brock"] },
];

const ESCALA = [
  { v:1, label:"Muito abaixo do esperado", cor:"#dc2626" },
  { v:2, label:"Abaixo do esperado", cor:"#ea580c" },
  { v:3, label:"Dentro do esperado", cor:"#ca8a04" },
  { v:4, label:"Acima do esperado", cor:"#16a34a" },
  { v:5, label:"Muito acima do esperado", cor:"#15803d" },
];

const NAVY="#0a1628", TEAL="#00b4d8", LIME="#84cc16", LIME_D="#65a30d", WHITE="#ffffff", GRAY="#64748b", GRAY_L="#f1f5f9", GRAY_B="#e2e8f0";

async function apiCall(action: string, extra: object = {}) {
  const res = await fetch("/api/notion", { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({action,...extra}) });
  if (!res.ok) throw new Error("API error "+res.status);
  return res.json();
}

function Avatar({ name, size=40 }: { name:string; size?:number }) {
  const ini = (name||"?").split(" ").slice(0,2).map((w:string)=>w[0]).join("").toUpperCase();
  return <div style={{width:size,height:size,borderRadius:"50%",background:TEAL+"33",display:"flex",alignItems:"center",justifyContent:"center",fontSize:size*.35,fontWeight:700,color:TEAL,flexShrink:0}}>{ini}</div>;
}

function RadarChart({ names, gestor, auto, consenso, size=260 }: any) {
  if (!names||names.length<3) return null;
  const cx=size/2,cy=size/2,r=size*.33,n=names.length;
  const ang=(i:number)=>(Math.PI*2*i)/n-Math.PI/2;
  const pt=(val:number,i:number)=>{const a=ang(i),d=(val/5)*r;return[cx+d*Math.cos(a),cy+d*Math.sin(a)];};
  return (
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} style={{display:"block",margin:"0 auto"}}>
      {[1,2,3,4,5].map(ring=>{const pts=Array.from({length:n},(_,i)=>{const a=ang(i),d=(ring/5)*r;return`${cx+d*Math.cos(a)},${cy+d*Math.sin(a)}`;});return<polygon key={ring} points={pts.join(" ")} fill="none" stroke={ring===3?"#84cc1644":"#e2e8f0"} strokeWidth={ring===3?1.5:.7}/>;  })}
      {Array.from({length:n},(_,i)=>{const[x,y]=pt(5,i);return<line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="#e2e8f0" strokeWidth=".7"/>;  })}
      {gestor&&<polygon points={names.map((_:any,i:number)=>pt(gestor[i]||0,i).join(",")).join(" ")} fill={NAVY+"22"} stroke={NAVY} strokeWidth="2"/>}
      {auto&&<polygon points={names.map((_:any,i:number)=>pt(auto[i]||0,i).join(",")).join(" ")} fill={TEAL+"22"} stroke={TEAL} strokeWidth="2" strokeDasharray="5 3"/>}
      {consenso&&<polygon points={names.map((_:any,i:number)=>pt(consenso[i]||0,i).join(",")).join(" ")} fill={LIME+"22"} stroke={LIME} strokeWidth="2"/>}
      {names.map((c:string,i:number)=>{const a=ang(i),lx=cx+(r+24)*Math.cos(a),ly=cy+(r+24)*Math.sin(a),anchor=lx<cx-5?"end":lx>cx+5?"start":"middle";return<text key={i} x={lx} y={ly} textAnchor={anchor} fontSize="9" fill={GRAY} dominantBaseline="middle">{c.length>13?c.slice(0,12)+"…":c}</text>;})}
    </svg>
  );
}

function Toast({ msg, type="ok" }: { msg:string; type?:string }) {
  return <div style={{position:"fixed",bottom:24,left:"50%",transform:"translateX(-50%)",background:type==="err"?"#dc2626":LIME,color:type==="err"?WHITE:NAVY,padding:"12px 24px",borderRadius:12,fontWeight:600,fontSize:14,zIndex:9999,boxShadow:"0 4px 20px rgba(0,0,0,.3)"}}>{msg}</div>;
}

function Spinner({color=LIME}:{color?:string}) {
  return <div style={{width:18,height:18,border:`2px solid ${color}33`,borderTop:`2px solid ${color}`,borderRadius:"50%",animation:"spin .7s linear infinite",display:"inline-block"}}><style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style></div>;
}

function Btn({ children, onClick, color=LIME, outline=false, disabled=false, size="md" }: any) {
  return <button onClick={onClick} disabled={disabled} style={{background:outline?"transparent":(disabled?GRAY_B:color),color:outline?color:(disabled?GRAY:NAVY),border:outline?`2px solid ${color}`:"none",borderRadius:10,padding:size==="sm"?"7px 14px":"12px 24px",fontSize:size==="sm"?12:14,fontWeight:700,cursor:disabled?"default":"pointer"}}>{children}</button>;
}

function ScaleBtn({ value, onChange }: { value:number|null; onChange:(v:number)=>void }) {
  return (
    <div>
      <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:4}}>
        {ESCALA.map(e=><button key={e.v} onClick={()=>onChange(e.v)} style={{padding:"8px 16px",borderRadius:8,border:"none",cursor:"pointer",fontSize:12,fontWeight:700,background:value===e.v?e.cor:GRAY_L,color:value===e.v?WHITE:GRAY}}>{e.v}</button>)}
      </div>
      {value&&<p style={{fontSize:11,color:ESCALA[value-1].cor,fontWeight:600,margin:"4px 0 0"}}>{value} — {ESCALA[value-1].label}</p>}
      {!value&&<p style={{fontSize:11,color:GRAY,margin:"4px 0 0"}}>1 = Muito abaixo · 3 = Dentro do esperado · 5 = Muito acima</p>}
    </div>
  );
}

export default function Dashboard() {
  const [screen, setScreen] = useState<"dash"|"criar"|"ciclo"|"gestor"|"auto"|"analise">("dash");
  const [ciclos, setCiclos] = useState<any[]>([]);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<any>(null);
  const [cicloAtual, setCicloAtual] = useState<any>(null);
  const [compsSel, setCompsSel] = useState<number[]>([]);
  const [form, setForm] = useState({colaborador:"",gestor:"",rh:"",cargo:"",area:""});
  const [avalG, setAvalG] = useState<Record<number,number>>({});
  const [fatosG, setFatosG] = useState<Record<number,string>>({});
  const [avalA, setAvalA] = useState<Record<number,number>>({});
  const [fatosA, setFatosA] = useState<Record<number,string>>({});
  const [consenso, setConsenso] = useState<Record<number,number>>({});
  const [impacto, setImpacto] = useState<Record<number,string>>({});
  const [expect, setExpect] = useState<Record<number,string>>({});
  const [metodo, setMetodo] = useState<"media"|"consenso">("media");

  function showToast(msg:string, type="ok") { setToast({msg,type}); setTimeout(()=>setToast(null),3000); }

  const compsDociclo = COMPETENCIAS.filter(c=>cicloAtual?.comps?.includes(c.id));

  function getMediaOuConsenso(id:number) {
    if(metodo==="consenso"&&consenso[id]) return consenso[id];
    const g=avalG[id],a=avalA[id];
    if(g&&a) return Math.round(((g+a)/2)*10)/10;
    return g||a||null;
  }

  function get3Piores() {
    return compsDociclo.map(c=>({...c,nota:getMediaOuConsenso(c.id)})).filter(c=>c.nota!==null).sort((a:any,b:any)=>a.nota-b.nota).slice(0,3);
  }

  async function criarCiclo() {
    if(compsSel.length<6||compsSel.length>15){showToast("Selecione entre 6 e 15 competências","err");return;}
    if(!form.colaborador||!form.gestor||!form.rh){showToast("Preencha todos os campos obrigatórios","err");return;}
    setSaving(true);
    const ciclo={id:"ciclo_"+Date.now(),...form,comps:compsSel,criadoEm:new Date().toLocaleDateString("pt-BR")};
    try {
      const res=await apiCall("create",{ciclo});
      const novo={...ciclo,pageId:res.pageId};
      setCiclos(p=>[novo,...p]);
      setCicloAtual(novo);
      setScreen("ciclo");
      showToast("Ciclo criado! Links gerados.");
    } catch { showToast("Erro ao criar ciclo","err"); }
    setSaving(false);
  }

  async function salvarGestor() {
    setSaving(true);
    try {
      await apiCall("saveGestor",{pageId:cicloAtual.pageId,dados:avalG,fatosGestor:fatosG});
      showToast("Avaliação do gestor salva!");
      setScreen("ciclo");
    } catch { showToast("Erro ao salvar","err"); }
    setSaving(false);
  }

  async function salvarAuto() {
    setSaving(true);
    try {
      await apiCall("saveAuto",{pageId:cicloAtual.pageId,dados:avalA,fatosAuto:fatosA});
      showToast("Autoavaliação salva!");
      setScreen("ciclo");
    } catch { showToast("Erro ao salvar","err"); }
    setSaving(false);
  }

  function exportPDF() {
    const piores=get3Piores();
    const win=window.open("","_blank");
    win!.document.write(`<!DOCTYPE html><html><head><meta charset="utf-8"><title>Avança Talentos — ${cicloAtual?.colaborador}</title>
    <style>body{font-family:system-ui,sans-serif;padding:40px;color:#0a1628;max-width:780px;margin:0 auto}h2{color:#0a1628;border-bottom:2px solid #84cc16;padding-bottom:6px;margin-top:32px}table{width:100%;border-collapse:collapse;font-size:13px;margin:16px 0}th{background:#0a1628;color:#fff;padding:10px}td{padding:10px;border-bottom:1px solid #e2e8f0;font-size:12px}.ass{display:grid;grid-template-columns:1fr 1fr 1fr;gap:40px;margin-top:60px}.ass-item{border-top:2px solid #0a1628;padding-top:10px;font-size:13px}@media print{body{padding:20px}}</style></head><body>
    <div style="background:linear-gradient(135deg,#0a1628,#112240);color:#fff;padding:32px;border-radius:12px;margin-bottom:32px">
      <h1 style="color:#84cc16;margin:0 0 4px;font-size:28px">Avança Talentos</h1>
      <p style="color:#90e0ef;margin:0 0 24px;font-size:14px">Sua ferramenta de avaliação e desenvolvimento de talentos</p>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;font-size:13px">
        <div><p style="color:#90e0ef;margin:0;font-size:11px">COLABORADOR</p><p style="color:#fff;font-weight:700;margin:4px 0 0">${cicloAtual?.colaborador}</p></div>
        <div><p style="color:#90e0ef;margin:0;font-size:11px">CARGO</p><p style="color:#fff;font-weight:700;margin:4px 0 0">${cicloAtual?.cargo||"—"}</p></div>
        <div><p style="color:#90e0ef;margin:0;font-size:11px">ÁREA</p><p style="color:#fff;font-weight:700;margin:4px 0 0">${cicloAtual?.area||"—"}</p></div>
        <div><p style="color:#90e0ef;margin:0;font-size:11px">GESTOR</p><p style="color:#fff;font-weight:700;margin:4px 0 0">${cicloAtual?.gestor}</p></div>
        <div><p style="color:#90e0ef;margin:0;font-size:11px">RH/CONSULTOR</p><p style="color:#fff;font-weight:700;margin:4px 0 0">${cicloAtual?.rh}</p></div>
        <div><p style="color:#90e0ef;margin:0;font-size:11px">DATA</p><p style="color:#fff;font-weight:700;margin:4px 0 0">${cicloAtual?.criadoEm}</p></div>
      </div>
    </div>
    <h2>Resultado da Avaliação</h2>
    <table><tr><th>Competência</th><th>Gestor</th><th>Autoavaliação</th><th>Resultado Final</th><th>Fatos Gestor</th><th>Fatos Colaborador</th></tr>
    ${compsDociclo.map(c=>`<tr><td><strong>${c.nome}</strong></td><td style="text-align:center">${avalG[c.id]||"—"}</td><td style="text-align:center">${avalA[c.id]||"—"}</td><td style="text-align:center;font-weight:700">${getMediaOuConsenso(c.id)||"—"}</td><td>${fatosG[c.id]||"—"}</td><td>${fatosA[c.id]||"—"}</td></tr>`).join("")}
    </table>
    ${piores.length>0?`<h2>Plano de Desenvolvimento — 3 Prioridades</h2>${piores.map((c:any,i:number)=>`
    <div style="margin-bottom:24px;padding:20px;background:#f8fafc;border-radius:10px;border-left:4px solid #84cc16">
      <h3 style="margin:0 0 4px;color:#0a1628">${i+1}. ${c.nome} — Nota: ${c.nota}</h3>
      ${impacto[c.id]?`<p style="font-size:13px"><strong>Impacto atual:</strong> ${impacto[c.id]}</p>`:""}
      ${expect[c.id]?`<p style="font-size:13px"><strong>Expectativa:</strong> ${expect[c.id]}</p>`:""}
      <p style="font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;margin:12px 0 6px">5 Ações</p>
      ${c.acoes.map((a:string)=>`<p style="font-size:13px;margin:3px 0">• ${a}</p>`).join("")}
      <p style="font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;margin:12px 0 6px">2 Técnicas</p>
      ${c.tecnicas.map((t:string)=>`<p style="font-size:13px;margin:3px 0">• ${t}</p>`).join("")}
      <p style="font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;margin:12px 0 6px">2 Leituras</p>
      ${c.leituras.map((l:string)=>`<p style="font-size:13px;margin:3px 0">📖 ${l}</p>`).join("")}
    </div>`).join("")}`:""}
    <h2>Compromisso de Desenvolvimento</h2>
    <div class="ass">
      <div class="ass-item"><div style="height:50px"></div><strong>${cicloAtual?.colaborador}</strong><br><span style="color:#64748b;font-size:12px">Colaborador(a)</span><br><br><span style="color:#64748b;font-size:11px">Data: ___/___/______</span></div>
      <div class="ass-item"><div style="height:50px"></div><strong>${cicloAtual?.gestor}</strong><br><span style="color:#64748b;font-size:12px">Gestor(a)</span><br><br><span style="color:#64748b;font-size:11px">Data: ___/___/______</span></div>
      <div class="ass-item"><div style="height:50px"></div><strong>${cicloAtual?.rh}</strong><br><span style="color:#64748b;font-size:12px">RH / Consultor(a)</span><br><br><span style="color:#64748b;font-size:11px">Data: ___/___/______</span></div>
    </div>
    <script>window.print();<\/script></body></html>`);
    win!.document.close();
  }

  const Header = ({title,sub,back}:{title:string;sub?:string;back?:()=>void}) => (
    <div style={{background:NAVY,padding:"16px 24px",display:"flex",alignItems:"center",gap:12}}>
      {back&&<button onClick={back} style={{background:"none",border:"none",color:"#90e0ef",cursor:"pointer",fontSize:22,lineHeight:1}}>←</button>}
      <div style={{flex:1}}>
        <p style={{color:LIME,fontSize:10,fontWeight:700,letterSpacing:"0.15em",textTransform:"uppercase" as const,margin:0}}>Avança Talentos</p>
        <p style={{color:WHITE,fontWeight:700,fontSize:16,margin:0}}>{title}</p>
        {sub&&<p style={{color:"#90e0ef",fontSize:12,margin:"2px 0 0"}}>{sub}</p>}
      </div>
    </div>
  );

  if(screen==="dash") return (
    <div style={{minHeight:"100vh",background:GRAY_L,fontFamily:"system-ui,sans-serif"}}>
      {toast&&<Toast {...toast}/>}
      <Header title="Painel de Avaliação"/>
      <div style={{maxWidth:800,margin:"0 auto",padding:"32px 24px"}}>
        <div style={{background:NAVY,borderRadius:16,padding:28,marginBottom:24,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div>
            <h2 style={{color:WHITE,fontSize:22,fontWeight:800,margin:"0 0 6px"}}>Avança <span style={{color:LIME}}>Talentos</span></h2>
            <p style={{color:"#90e0ef",fontSize:14,margin:0}}>Sua ferramenta de avaliação e desenvolvimento de talentos</p>
          </div>
          <Btn onClick={()=>{setForm({colaborador:"",gestor:"",rh:"",cargo:"",area:""});setCompsSel([]);setScreen("criar");}}>+ Novo ciclo</Btn>
        </div>
        {ciclos.length===0?(
          <div style={{textAlign:"center",padding:48,color:GRAY}}>
            <p style={{fontSize:15,fontWeight:600}}>Nenhum ciclo criado ainda.</p>
            <p style={{fontSize:13}}>Clique em "+ Novo ciclo" para começar.</p>
          </div>
        ):ciclos.map((c:any)=>(
          <div key={c.pageId||c.id} onClick={()=>{setCicloAtual(c);setScreen("ciclo");}} style={{background:WHITE,borderRadius:14,padding:18,marginBottom:12,border:`1px solid ${GRAY_B}`,cursor:"pointer"}}>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:10}}>
              <Avatar name={c.colaborador} size={42}/>
              <div style={{flex:1}}>
                <p style={{fontWeight:700,fontSize:15,margin:0,color:NAVY}}>{c.colaborador}</p>
                <p style={{fontSize:12,color:GRAY,margin:"2px 0 0"}}>{c.cargo}{c.area&&` · ${c.area}`} · Gestor: {c.gestor}</p>
              </div>
              <span style={{fontSize:11,padding:"3px 10px",borderRadius:99,background:"#f1f5f9",color:GRAY,fontWeight:600}}>Em andamento</span>
            </div>
            <div style={{display:"flex",gap:6,flexWrap:"wrap" as const}}>
              {(c.comps||[]).slice(0,5).map((id:number)=>{const comp=COMPETENCIAS.find(x=>x.id===id);return comp?<span key={id} style={{fontSize:11,background:NAVY+"11",color:NAVY,padding:"3px 8px",borderRadius:99,fontWeight:500}}>{comp.nome}</span>:null;})}
              {(c.comps||[]).length>5&&<span style={{fontSize:11,color:GRAY}}>+{c.comps.length-5} mais</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  if(screen==="criar") return (
    <div style={{minHeight:"100vh",background:GRAY_L,fontFamily:"system-ui,sans-serif"}}>
      {toast&&<Toast {...toast}/>}
      <Header title="Novo ciclo de avaliação" back={()=>setScreen("dash")}/>
      <div style={{maxWidth:720,margin:"0 auto",padding:"32px 24px"}}>
        <div style={{background:WHITE,borderRadius:16,padding:24,marginBottom:20,border:`1px solid ${GRAY_B}`}}>
          <h3 style={{color:NAVY,fontSize:15,fontWeight:700,paddingLeft:12,borderLeft:`3px solid ${LIME}`,margin:"0 0 20px"}}>Dados do ciclo</h3>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
            {([["colaborador","Nome do colaborador *","Ex: Ana Paula Ferreira"],["gestor","Nome do gestor *","Ex: Carlos Mendes"],["cargo","Cargo","Ex: Analista de RH Sênior"],["area","Área","Ex: Recursos Humanos"]] as [string,string,string][]).map(([k,l,ph])=>(
              <div key={k}>
                <label style={{fontSize:12,fontWeight:600,color:GRAY,display:"block",marginBottom:5}}>{l}</label>
                <input value={(form as any)[k]} onChange={e=>setForm(p=>({...p,[k]:e.target.value}))} placeholder={ph} style={{width:"100%",padding:"10px 14px",borderRadius:10,border:`1.5px solid ${GRAY_B}`,fontSize:14,boxSizing:"border-box" as const}}/>
              </div>
            ))}
            <div style={{gridColumn:"1/-1"}}>
              <label style={{fontSize:12,fontWeight:600,color:GRAY,display:"block",marginBottom:5}}>Nome do RH / Consultor *</label>
              <input value={form.rh} onChange={e=>setForm(p=>({...p,rh:e.target.value}))} placeholder="Ex: Maria Silva" style={{width:"100%",padding:"10px 14px",borderRadius:10,border:`1.5px solid ${GRAY_B}`,fontSize:14,boxSizing:"border-box" as const}}/>
            </div>
          </div>
        </div>
        <div style={{background:WHITE,borderRadius:16,padding:24,marginBottom:20,border:`1px solid ${GRAY_B}`}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
            <h3 style={{color:NAVY,fontSize:15,fontWeight:700,paddingLeft:12,borderLeft:`3px solid ${LIME}`,margin:0}}>Competências</h3>
            <span style={{fontSize:12,fontWeight:700,color:compsSel.length>=6?LIME:GRAY}}>{compsSel.length}/15 {compsSel.length<6?"(mín. 6)":"✓"}</span>
          </div>
          {["Pensamento","Resultados","Pessoas","Eu"].map(fator=>(
            <div key={fator} style={{marginBottom:18}}>
              <p style={{fontSize:10,fontWeight:700,color:TEAL,textTransform:"uppercase" as const,letterSpacing:"0.12em",margin:"0 0 10px",display:"flex",alignItems:"center",gap:6}}><span style={{width:16,height:2,background:TEAL,display:"inline-block"}}></span>{fator}</p>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                {COMPETENCIAS.filter(c=>c.fator===fator).map(c=>{
                  const sel=compsSel.includes(c.id);
                  return <div key={c.id} onClick={()=>{if(sel){setCompsSel(p=>p.filter(x=>x!==c.id));}else if(compsSel.length<15){setCompsSel(p=>[...p,c.id]);}else{showToast("Máximo 15 competências","err");}}} style={{padding:"10px 14px",borderRadius:10,border:`2px solid ${sel?LIME:GRAY_B}`,background:sel?LIME+"11":WHITE,cursor:"pointer",display:"flex",gap:10,alignItems:"flex-start"}}>
                    <div style={{width:18,height:18,borderRadius:4,border:`2px solid ${sel?LIME:GRAY_B}`,background:sel?LIME:"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1}}>{sel&&<span style={{color:NAVY,fontSize:11,fontWeight:800}}>✓</span>}</div>
                    <div><p style={{fontSize:13,fontWeight:600,color:NAVY,margin:0}}>{c.nome}</p><p style={{fontSize:11,color:GRAY,margin:"2px 0 0",lineHeight:1.4}}>{c.desc}</p></div>
                  </div>;
                })}
              </div>
            </div>
          ))}
        </div>
        <Btn onClick={criarCiclo} disabled={saving}>{saving?<Spinner/>:"Criar ciclo e gerar links"}</Btn>
      </div>
    </div>
  );

  if(screen==="ciclo"&&cicloAtual) return (
    <div style={{minHeight:"100vh",background:GRAY_L,fontFamily:"system-ui,sans-serif"}}>
      {toast&&<Toast {...toast}/>}
      <Header title={cicloAtual.colaborador} sub={`Ciclo · ${cicloAtual.criadoEm}`} back={()=>setScreen("dash")}/>
      <div style={{maxWidth:720,margin:"0 auto",padding:"32px 24px"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:20}}>
          <div style={{background:WHITE,borderRadius:14,padding:20,border:`1px solid ${GRAY_B}`}}>
            <div style={{width:3,height:20,background:NAVY,borderRadius:2,marginBottom:10}}></div>
            <h4 style={{fontSize:14,fontWeight:700,color:NAVY,marginBottom:4}}>Avaliação do Gestor</h4>
            <p style={{fontSize:12,color:GRAY,marginBottom:14}}>Confidencial até o feedback</p>
            <Btn size="sm" onClick={()=>{setAvalG({});setFatosG({});setScreen("gestor");}}>Abrir avaliação</Btn>
          </div>
          <div style={{background:WHITE,borderRadius:14,padding:20,border:`1px solid ${GRAY_B}`}}>
            <div style={{width:3,height:20,background:TEAL,borderRadius:2,marginBottom:10}}></div>
            <h4 style={{fontSize:14,fontWeight:700,color:NAVY,marginBottom:4}}>Autoavaliação</h4>
            <p style={{fontSize:12,color:GRAY,marginBottom:14}}>Link do colaborador</p>
            <Btn size="sm" color={TEAL} onClick={()=>{setAvalA({});setFatosA({});setScreen("auto");}}>Abrir autoavaliação</Btn>
          </div>
        </div>
        <div style={{background:WHITE,borderRadius:14,padding:20,border:`1px solid ${GRAY_B}`,marginBottom:14}}>
          <h4 style={{fontSize:14,fontWeight:700,color:NAVY,marginBottom:4}}>Análise Cruzada</h4>
          <p style={{fontSize:12,color:GRAY,marginBottom:14}}>Comparativo entre gestor e colaborador</p>
          <Btn size="sm" onClick={()=>setScreen("analise")}>Ver análise cruzada</Btn>
        </div>
        <div style={{background:WHITE,borderRadius:14,padding:20,border:`1px solid ${GRAY_B}`}}>
          <h4 style={{fontSize:14,fontWeight:700,color:NAVY,marginBottom:12}}>Competências do ciclo ({compsDociclo.length})</h4>
          <div style={{display:"flex",gap:6,flexWrap:"wrap" as const}}>{compsDociclo.map(c=><span key={c.id} style={{fontSize:11,background:GRAY_L,color:NAVY,padding:"4px 10px",borderRadius:99,fontWeight:500}}>{c.nome}</span>)}</div>
        </div>
      </div>
    </div>
  );

  if(screen==="gestor"&&cicloAtual) return (
    <div style={{minHeight:"100vh",background:GRAY_L,fontFamily:"system-ui,sans-serif"}}>
      {toast&&<Toast {...toast}/>}
      <Header title="Avaliação do Colaborador" sub={`${cicloAtual.colaborador} · Confidencial`} back={()=>setScreen("ciclo")}/>
      <div style={{maxWidth:720,margin:"0 auto",padding:"32px 24px"}}>
        <div style={{background:"#fef9c3",borderRadius:12,padding:"14px 18px",marginBottom:20,border:"1px solid #ca8a04"}}>
          <p style={{fontSize:13,color:"#713f12",margin:0}}>Avaliação <strong>sigilosa</strong>. O colaborador não terá acesso até o feedback. Baseie-se em fatos observáveis.</p>
        </div>
        <div style={{background:WHITE,borderRadius:12,padding:"12px 16px",marginBottom:20,border:`1px solid ${GRAY_B}`}}>
          <p style={{fontSize:11,fontWeight:600,color:GRAY,margin:0}}>1 = Muito abaixo do esperado · 2 = Abaixo · 3 = Dentro do esperado · 4 = Acima · 5 = Muito acima</p>
        </div>
        {compsDociclo.map((c,i)=>(
          <div key={c.id} style={{background:WHITE,borderRadius:14,padding:20,marginBottom:14,border:`1px solid ${GRAY_B}`}}>
            <div style={{display:"flex",gap:10,alignItems:"flex-start",marginBottom:14}}>
              <div style={{width:28,height:28,borderRadius:8,background:NAVY,color:LIME,fontSize:12,fontWeight:800,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{i+1}</div>
              <div><p style={{fontWeight:700,fontSize:14,color:NAVY,margin:0}}>{c.nome}</p><p style={{fontSize:12,color:GRAY,margin:"2px 0 0"}}>{c.desc}</p></div>
            </div>
            <ScaleBtn value={avalG[c.id]||null} onChange={v=>setAvalG(p=>({...p,[c.id]:v}))}/>
            <div style={{marginTop:14}}>
              <label style={{fontSize:12,fontWeight:600,color:GRAY,display:"block",marginBottom:6}}>Fatos e dados que embasam esta avaliação:</label>
              <textarea value={fatosG[c.id]||""} onChange={e=>setFatosG(p=>({...p,[c.id]:e.target.value}))} placeholder="Descreva situações, comportamentos ou resultados concretos..." rows={3} style={{width:"100%",borderRadius:8,border:`1.5px solid ${GRAY_B}`,fontSize:13,padding:"10px",boxSizing:"border-box" as const,resize:"vertical" as const,fontFamily:"inherit"}}/>
            </div>
          </div>
        ))}
        <Btn onClick={salvarGestor} disabled={saving}>{saving?<><Spinner/> Salvando...</>:"Salvar avaliação"}</Btn>
      </div>
    </div>
  );

  if(screen==="auto"&&cicloAtual) return (
    <div style={{minHeight:"100vh",background:GRAY_L,fontFamily:"system-ui,sans-serif"}}>
      {toast&&<Toast {...toast}/>}
      <Header title="Autoavaliação" sub={`${cicloAtual.colaborador} · Confidencial`} back={()=>setScreen("ciclo")}/>
      <div style={{maxWidth:720,margin:"0 auto",padding:"32px 24px"}}>
        <div style={{background:"#dbeafe",borderRadius:12,padding:"14px 18px",marginBottom:20,border:"1px solid #3b82f6"}}>
          <p style={{fontSize:13,color:"#1e40af",margin:0}}>Avalie com base no seu desempenho <strong>real e observável</strong>. Sua avaliação é sigilosa até o feedback.</p>
        </div>
        <div style={{background:WHITE,borderRadius:12,padding:"12px 16px",marginBottom:20,border:`1px solid ${GRAY_B}`}}>
          <p style={{fontSize:11,fontWeight:600,color:GRAY,margin:0}}>1 = Muito abaixo do esperado · 2 = Abaixo · 3 = Dentro do esperado · 4 = Acima · 5 = Muito acima</p>
        </div>
        {compsDociclo.map((c,i)=>(
          <div key={c.id} style={{background:WHITE,borderRadius:14,padding:20,marginBottom:14,border:`1px solid ${GRAY_B}`}}>
            <div style={{display:"flex",gap:10,alignItems:"flex-start",marginBottom:14}}>
              <div style={{width:28,height:28,borderRadius:8,background:TEAL+"33",color:TEAL,fontSize:12,fontWeight:800,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{i+1}</div>
              <div><p style={{fontWeight:700,fontSize:14,color:NAVY,margin:0}}>{c.nome}</p><p style={{fontSize:12,color:GRAY,margin:"2px 0 0"}}>{c.desc}</p></div>
            </div>
            <ScaleBtn value={avalA[c.id]||null} onChange={v=>setAvalA(p=>({...p,[c.id]:v}))}/>
            <div style={{marginTop:14}}>
              <label style={{fontSize:12,fontWeight:600,color:GRAY,display:"block",marginBottom:6}}>Fatos e dados que embasam sua avaliação:</label>
              <textarea value={fatosA[c.id]||""} onChange={e=>setFatosA(p=>({...p,[c.id]:e.target.value}))} placeholder="Descreva situações, exemplos concretos ou resultados..." rows={3} style={{width:"100%",borderRadius:8,border:`1.5px solid ${GRAY_B}`,fontSize:13,padding:"10px",boxSizing:"border-box" as const,resize:"vertical" as const,fontFamily:"inherit"}}/>
            </div>
          </div>
        ))}
        <Btn color={TEAL} onClick={salvarAuto} disabled={saving}>{saving?<><Spinner color={TEAL}/> Salvando...</>:"Salvar autoavaliação"}</Btn>
      </div>
    </div>
  );

  if(screen==="analise"&&cicloAtual) {
    const piores=get3Piores();
    return (
      <div style={{minHeight:"100vh",background:GRAY_L,fontFamily:"system-ui,sans-serif"}}>
        {toast&&<Toast {...toast}/>}
        <Header title="Análise Cruzada" sub={cicloAtual.colaborador} back={()=>setScreen("ciclo")}/>
        <div style={{maxWidth:800,margin:"0 auto",padding:"32px 24px"}}>
          <div style={{display:"flex",gap:8,marginBottom:20}}>
            <Btn size="sm" color={metodo==="media"?LIME:GRAY_L} onClick={()=>setMetodo("media")}>Média automática</Btn>
            <Btn size="sm" color={metodo==="consenso"?LIME:GRAY_L} onClick={()=>setMetodo("consenso")}>Consenso manual</Btn>
          </div>
          <div style={{background:WHITE,borderRadius:16,padding:24,marginBottom:20,border:`1px solid ${GRAY_B}`}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
              <h3 style={{color:NAVY,fontSize:15,fontWeight:700,margin:0}}>Gráfico comparativo</h3>
              <div style={{display:"flex",gap:16,fontSize:11,color:GRAY}}>
                <span style={{display:"flex",alignItems:"center",gap:5}}><span style={{width:16,height:2,background:NAVY,display:"inline-block"}}></span>Gestor</span>
                <span style={{display:"flex",alignItems:"center",gap:5}}><span style={{width:16,height:2,background:TEAL,display:"inline-block"}}></span>Colaborador</span>
                {metodo==="consenso"&&<span style={{display:"flex",alignItems:"center",gap:5}}><span style={{width:16,height:2,background:LIME,display:"inline-block"}}></span>Consenso</span>}
              </div>
            </div>
            <RadarChart names={compsDociclo.map(c=>c.nome)} gestor={compsDociclo.map(c=>avalG[c.id]||0)} auto={compsDociclo.map(c=>avalA[c.id]||0)} consenso={metodo==="consenso"?compsDociclo.map(c=>consenso[c.id]||0):null}/>
          </div>
          <div style={{background:WHITE,borderRadius:16,padding:24,marginBottom:20,border:`1px solid ${GRAY_B}`}}>
            <h3 style={{color:NAVY,fontSize:15,fontWeight:700,marginBottom:16}}>Comparativo por competência</h3>
            {compsDociclo.map((c,i)=>{
              const g=avalG[c.id],a=avalA[c.id],media=g&&a?Math.round(((g+a)/2)*10)/10:null,diff=g&&a?g-a:null;
              return (
                <div key={c.id} style={{marginBottom:16,paddingBottom:16,borderBottom:i<compsDociclo.length-1?`1px solid ${GRAY_B}`:"none"}}>
                  <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8,flexWrap:"wrap" as const}}>
                    <div style={{width:24,height:24,borderRadius:6,background:NAVY,color:LIME,fontSize:11,fontWeight:800,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{i+1}</div>
                    <span style={{fontWeight:700,fontSize:14,color:NAVY,flex:1}}>{c.nome}</span>
                    <div style={{display:"flex",gap:6,flexWrap:"wrap" as const}}>
                      {g&&<span style={{fontSize:11,padding:"3px 8px",borderRadius:99,background:NAVY+"11",color:NAVY,fontWeight:700}}>G: {g}</span>}
                      {a&&<span style={{fontSize:11,padding:"3px 8px",borderRadius:99,background:TEAL+"22",color:"#0077b6",fontWeight:700}}>C: {a}</span>}
                      {media&&<span style={{fontSize:11,padding:"3px 8px",borderRadius:99,background:LIME+"33",color:LIME_D,fontWeight:700}}>Média: {media}</span>}
                      {diff!==null&&Math.abs(diff)>=2&&<span style={{fontSize:11,padding:"3px 8px",borderRadius:99,background:"#fee2e2",color:"#991b1b",fontWeight:700}}>Divergência</span>}
                    </div>
                  </div>
                  {fatosG[c.id]&&<div style={{background:NAVY+"08",borderRadius:8,padding:"8px 12px",marginBottom:6,fontSize:12,color:NAVY}}><strong>Gestor:</strong> {fatosG[c.id]}</div>}
                  {fatosA[c.id]&&<div style={{background:TEAL+"11",borderRadius:8,padding:"8px 12px",marginBottom:6,fontSize:12,color:NAVY}}><strong>Colaborador:</strong> {fatosA[c.id]}</div>}
                  {metodo==="consenso"&&(
                    <div style={{marginTop:10,background:GRAY_L,borderRadius:10,padding:14}}>
                      <ScaleBtn value={consenso[c.id]||null} onChange={v=>setConsenso(p=>({...p,[c.id]:v}))}/>
                      <input value={impacto[c.id]||""} onChange={e=>setImpacto(p=>({...p,[c.id]:e.target.value}))} placeholder="Impacto atual desta competência nos resultados..." style={{width:"100%",padding:"8px 12px",borderRadius:8,border:`1.5px solid ${GRAY_B}`,fontSize:12,marginTop:10,marginBottom:8,boxSizing:"border-box" as const,background:WHITE}}/>
                      <input value={expect[c.id]||""} onChange={e=>setExpect(p=>({...p,[c.id]:e.target.value}))} placeholder="Expectativa de resultado com o desenvolvimento..." style={{width:"100%",padding:"8px 12px",borderRadius:8,border:`1.5px solid ${GRAY_B}`,fontSize:12,boxSizing:"border-box" as const,background:WHITE}}/>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          {piores.length>0&&(
            <div style={{background:WHITE,borderRadius:16,padding:24,marginBottom:20,border:`2px solid ${LIME}`}}>
              <h3 style={{color:NAVY,fontSize:15,fontWeight:700,marginBottom:4}}>Plano de Desenvolvimento — 3 Prioridades</h3>
              <p style={{fontSize:13,color:GRAY,marginBottom:20}}>Competências com menor resultado — gerado automaticamente</p>
              {piores.map((c:any,i:number)=>(
                <div key={c.id} style={{marginBottom:i<2?24:0,paddingBottom:i<2?24:0,borderBottom:i<2?`1px solid ${GRAY_B}`:"none"}}>
                  <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
                    <div style={{width:32,height:32,borderRadius:8,background:LIME,color:NAVY,fontSize:13,fontWeight:800,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{i+1}</div>
                    <div>
                      <p style={{fontWeight:800,fontSize:15,color:NAVY,margin:0}}>{c.nome}</p>
                      <p style={{fontSize:12,color:GRAY,margin:"2px 0 0"}}>Nota: {c.nota} — {ESCALA[(Math.round(c.nota)||1)-1]?.label}</p>
                    </div>
                  </div>
                  {metodo==="consenso"&&(
                    <div style={{background:GRAY_L,borderRadius:10,padding:14,marginBottom:14}}>
                      <input value={impacto[c.id]||""} onChange={e=>setImpacto(p=>({...p,[c.id]:e.target.value}))} placeholder="Impacto atual desta competência nos resultados..." style={{width:"100%",padding:"8px 12px",borderRadius:8,border:`1.5px solid ${GRAY_B}`,fontSize:12,marginBottom:8,boxSizing:"border-box" as const,background:WHITE}}/>
                      <input value={expect[c.id]||""} onChange={e=>setExpect(p=>({...p,[c.id]:e.target.value}))} placeholder="Expectativa de resultado com o desenvolvimento..." style={{width:"100%",padding:"8px 12px",borderRadius:8,border:`1.5px solid ${GRAY_B}`,fontSize:12,boxSizing:"border-box" as const,background:WHITE}}/>
                    </div>
                  )}
                  <p style={{fontSize:10,fontWeight:700,color:GRAY,textTransform:"uppercase" as const,letterSpacing:"0.1em",margin:"0 0 8px"}}>5 Ações de desenvolvimento</p>
                  {c.acoes.map((a:string,j:number)=><div key={j} style={{display:"flex",gap:8,marginBottom:5}}><div style={{width:5,height:5,borderRadius:"50%",background:LIME,flexShrink:0,marginTop:6}}></div><p style={{fontSize:13,color:"#334155",margin:0,lineHeight:1.5}}>{a}</p></div>)}
                  <p style={{fontSize:10,fontWeight:700,color:GRAY,textTransform:"uppercase" as const,letterSpacing:"0.1em",margin:"14px 0 8px"}}>2 Técnicas</p>
                  {c.tecnicas.map((t:string,j:number)=><div key={j} style={{display:"flex",gap:8,marginBottom:5}}><div style={{width:5,height:5,borderRadius:"50%",background:TEAL,flexShrink:0,marginTop:6}}></div><p style={{fontSize:13,color:"#334155",margin:0}}>{t}</p></div>)}
                  <p style={{fontSize:10,fontWeight:700,color:GRAY,textTransform:"uppercase" as const,letterSpacing:"0.1em",margin:"14px 0 8px"}}>2 Leituras</p>
                  {c.leituras.map((l:string,j:number)=><p key={j} style={{fontSize:13,color:"#1d4ed8",margin:"0 0 4px"}}>📖 {l}</p>)}
                </div>
              ))}
            </div>
          )}
          <div style={{display:"flex",gap:12}}>
            <Btn onClick={exportPDF}>Exportar PDF com assinaturas</Btn>
            <Btn outline color={NAVY} onClick={()=>setScreen("ciclo")}>Voltar ao ciclo</Btn>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
