"use client";
import { useUser, useClerk } from "@clerk/nextjs";
import { useState, useEffect } from "react";

const FACTORS = [
  { name:"Pensamento", key:"thought", color:"#7C3AED", light:"#EDE9FE", text:"#5B21B6",
    clusters:[
      { name:"Entendendo o negócio", comps:[
        {id:1,name:"Visão de negócio",desc:"Aplica conhecimento do negócio e mercado para avançar os objetivos da organização",remedies:["Leia relatórios setoriais mensalmente","Participe de reuniões estratégicas","Converse com clientes internos e externos","Mapeie os principais indicadores financeiros"],readings:["Estratégia Competitiva – Michael Porter","O Lado Difícil das Situações Difíceis – Ben Horowitz"]},
        {id:2,name:"Perspectiva financeira",desc:"Entende a linguagem e os fundamentos das finanças do negócio",remedies:["Estude os demonstrativos financeiros da empresa","Faça um curso de finanças para não-financeiros","Acompanhe o orçamento da sua área","Conecte decisões operacionais ao impacto financeiro"],readings:["Finanças para Executivos – Richard Brealey","O Jeito Certo de Fazer a Coisa Certa – Robert Kaplan"]},
        {id:3,name:"Expertise técnica",desc:"Possui profundo conhecimento técnico e especializado na sua área",remedies:["Dedique tempo semanal para atualização técnica","Participe de comunidades profissionais","Mentore outras pessoas","Busque certificações relevantes"],readings:["Peak – Anders Ericsson","Ultralearning – Scott Young"]},
      ]},
      { name:"Tomando decisões complexas", comps:[
        {id:4,name:"Qualidade da decisão",desc:"Toma boas decisões mesmo com informações incompletas",remedies:["Use frameworks de decisão como a Matriz de Eisenhower","Documente suas decisões e revise após 30 dias","Busque perspectivas diversas antes de decidir","Estabeleça critérios claros de sucesso"],readings:["Pensando Devagar e Depressa – Daniel Kahneman","Decisive – Chip Heath & Dan Heath"]},
        {id:5,name:"Gestão da complexidade",desc:"Lida efetivamente com problemas de alta complexidade",remedies:["Decomponha problemas complexos em partes menores","Crie mapas mentais para visualizar interdependências","Use blocos de tempo protegidos","Revise e ajuste prioridades toda semana"],readings:["Sistemas de Pensamento – Donella Meadows","The Art of Thinking Clearly – Rolf Dobelli"]},
        {id:6,name:"Gestão da ambiguidade",desc:"Age efetivamente mesmo sem todas as certezas",remedies:["Pratique tomar decisões sem buscar toda informação","Trabalhe em projetos com escopo aberto","Desenvolva planos com cenários alternativos","Reflita sobre situações passadas de incerteza"],readings:["Antifrágil – Nassim Taleb","Liderança em Tempos de Crise – Ronald Heifetz"]},
      ]},
      { name:"Criando o novo", comps:[
        {id:7,name:"Coragem",desc:"Diz o que pensa e age mesmo diante de oposição ou risco",remedies:["Pratique compartilhar opiniões divergentes","Tome decisões impopulares mas necessárias","Busque situações além da zona de conforto","Reflita sobre decisões evitadas por medo"],readings:["Dare to Lead – Brené Brown","O Poder da Vulnerabilidade – Brené Brown"]},
        {id:8,name:"Cultiva a inovação",desc:"Cria ideias novas e encontra soluções criativas",remedies:["Reserve 30 min por semana para explorar ideias","Aplique brainstorming reverso","Observe práticas de outras indústrias","Crie ambiente seguro para propor ideias"],readings:["De Onde Vêm as Boas Ideias – Steven Johnson","Sprint – Jake Knapp"]},
        {id:9,name:"Mentalidade estratégica",desc:"Antecipa tendências futuras e posiciona a organização para o sucesso",remedies:["Conecte ações do dia a dia aos objetivos estratégicos","Facilite conversas sobre visão de futuro trimestralmente","Traduza estratégia em metas operacionais","Revise o planejamento com dados atualizados"],readings:["Boa Estratégia, Má Estratégia – Richard Rumelt","Playing to Win – A.G. Lafley"]},
      ]},
    ]
  },
  { name:"Resultados", key:"results", color:"#D97706", light:"#FEF3C7", text:"#92400E",
    clusters:[
      { name:"Tomando iniciativa", comps:[
        {id:10,name:"Orientação para ação",desc:"Age rapidamente aproveitando oportunidades",remedies:["Defina uma ação concreta para cada reunião","Adote feito é melhor que perfeito","Crie ritual matinal de 3 prioridades","Reduza ciclos de planejamento"],readings:["Getting Things Done – David Allen","Essentialism – Greg McKeown"]},
        {id:11,name:"Empreendedorismo",desc:"Identifica e explora oportunidades de negócio com ousadia",remedies:["Mapeie oportunidades inexploradas","Proponha projetos com business case","Conecte-se com empreendedores","Valide ideias com protótipos de baixo custo"],readings:["The Lean Startup – Eric Ries","Zero to One – Peter Thiel"]},
        {id:12,name:"Engajamento",desc:"Demonstra energia e comprometimento com o trabalho",remedies:["Conecte tarefas ao propósito maior","Compartilhe o que te motiva","Reduza atividades que drenam energia","Celebre conquistas regularmente"],readings:["Drive – Daniel Pink","Trabalho Rico em Sentido – Barry Schwartz"]},
      ]},
      { name:"Gerenciando a execução", comps:[
        {id:13,name:"Opera em ambiguidade",desc:"Opera eficientemente mesmo em cenários incertos",remedies:["Crie estrutura em situações pouco definidas","Comunique o que é conhecido","Ajuste planos rapidamente","Foque no próximo passo concreto"],readings:["Liderança em Tempos Difíceis – Doris Kearns","Volatility – Nathan Bennett"]},
        {id:14,name:"Planejamento e alinhamento",desc:"Planeja e prioriza o trabalho para atingir metas",remedies:["Use roadmap trimestral com milestones mensais","Aprenda ferramentas de gestão de projetos","Delegue tarefas com critérios claros","Realize retrospectivas mensais"],readings:["Execution – Larry Bossidy","Sprint – Jake Knapp"]},
        {id:15,name:"Promove responsabilização",desc:"Mantém a si mesmo e outros responsáveis pelos resultados",remedies:["Implante 1:1 semanais com cada liderado","Dê feedback direto quando acordos não são cumpridos","Documente compromissos em reuniões","Revise métricas de desempenho com a equipe"],readings:["Radical Candor – Kim Scott","O Poder da Responsabilidade – Mark Samuel"]},
        {id:16,name:"Desenvolve processos",desc:"Cria e melhora processos eficientes para sustentar resultados",remedies:["Mapeie os processos principais e gargalos","Implemente indicadores de eficiência","Envolva a equipe na melhoria de processos","Documente processos para continuidade"],readings:["Tração – Gino Wickman","A Meta – Eliyahu Goldratt"]},
      ]},
      { name:"Foco em desempenho", comps:[
        {id:17,name:"Orientação a resultados",desc:"Consistentemente entrega resultados excepcionais",remedies:["Estabeleça metas SMART com indicadores claros","Faça check-ins semanais de progresso","Identifique e remova os 2 maiores obstáculos","Celebre conquistas intermediárias"],readings:["Objectives and Key Results – Paul Niven","High Output Management – Andy Grove"]},
        {id:18,name:"Otimismo",desc:"Mantém visão positiva mesmo diante de desafios",remedies:["Reencadre problemas como oportunidades","Compartilhe histórias de superação","Foque no que pode ser controlado","Crie rituais de reconhecimento de progresso"],readings:["Aprenda Otimismo – Martin Seligman","Mindset – Carol Dweck"]},
        {id:19,name:"Capacidade de recursos",desc:"Encontra formas criativas de superar obstáculos",remedies:["Mapeie recursos além do orçamento direto","Resolva problemas com restrições propositais","Crie rede de contatos para desafios específicos","Documente soluções criativas"],readings:["Scarcity – Sendhil Mullainathan","A Arte da Improvisação – Keith Johnstone"]},
      ]},
    ]
  },
  { name:"Pessoas", key:"people", color:"#059669", light:"#D1FAE5", text:"#065F46",
    clusters:[
      { name:"Construindo relacionamentos", comps:[
        {id:20,name:"Colabora",desc:"Constrói parcerias genuínas e trabalha bem com diferentes pessoas",remedies:["Mapeie as interdependências do seu trabalho","Participe de iniciativas cross-funcionais","Pratique ouvir ativamente","Ofereça ajuda proativa a colegas"],readings:["O Poder da Colaboração – Morten Hansen","Team of Teams – Stanley McChrystal"]},
        {id:21,name:"Gestão de conflitos",desc:"Lida com situações de conflito de forma construtiva",remedies:["Nomeie o conflito ao invés de evitá-lo","Ouça a perspectiva do outro primeiro","Busque interesses comuns","Estabeleça acordos claros de comportamento"],readings:["Como Chegar ao Sim – Roger Fisher","Difficult Conversations – Douglas Stone"]},
        {id:22,name:"Foco no cliente",desc:"Constrói relações sólidas e entrega soluções centradas no cliente",remedies:["Realize entrevistas regulares com clientes","Mapeie a jornada do cliente","Crie métricas de satisfação","Envolva a equipe em visitas a clientes"],readings:["Satisfação Garantida – Tony Hsieh","The Effortless Experience – Matthew Dixon"]},
        {id:23,name:"Valoriza diferenças",desc:"Reconhece o valor de perspectivas e culturas diferentes",remedies:["Busque perspectivas de pessoas com backgrounds diferentes","Estude vieses inconscientes","Inclua vozes diversas nas decisões","Participe de programas de diversidade"],readings:["Unconscious Bias – Francesca Gino","A Coragem de Ser Imperfeito – Brené Brown"]},
      ]},
      { name:"Otimizando talentos", comps:[
        {id:24,name:"Gestão da equipe",desc:"Cria e mantém equipes de alto desempenho",remedies:["Defina papéis, responsabilidades e metas claras","Promova rituais de equipe","Identifique e desenvolva pontos fortes individuais","Crie ambiente psicologicamente seguro"],readings:["The Five Dysfunctions of a Team – Patrick Lencioni","Equipes Brilhantes – Daniel Coyle"]},
        {id:25,name:"Desenvolve talentos",desc:"Desenvolve intencionalmente pessoas para o futuro",remedies:["Realize PDIs formais com cada membro trimestralmente","Delegue tarefas de desenvolvimento","Ofereça feedback de desenvolvimento toda semana","Conecte cada liderado com um mentor"],readings:["FYI: For Your Improvement – Korn Ferry","O Gerente Minuto – Ken Blanchard"]},
        {id:26,name:"Atrai talentos",desc:"Identifica e atrai pessoas de alto potencial",remedies:["Desenvolva proposta de valor para atrair talentos","Mantenha relacionamentos com talentos","Envolva-se no recrutamento","Construa reputação como líder que desenvolve pessoas"],readings:["Trabalhe com as Melhores Pessoas – Geoff Smart","Who – Geoff Smart & Randy Street"]},
        {id:27,name:"Engaja e inspira",desc:"Cria clima que engaja e motiva as pessoas ao redor",remedies:["Conecte o trabalho ao propósito maior","Reconheça contribuições individuais","Crie oportunidades de crescimento","Ouça ativamente as aspirações dos colaboradores"],readings:["Drive – Daniel Pink","O Líder Que Não Tinha Cargo – Robin Sharma"]},
      ]},
      { name:"Influenciando pessoas", comps:[
        {id:28,name:"Comunicação eficaz",desc:"Comunica-se de forma clara e convincente",remedies:["Adapte seu estilo de comunicação ao público","Pratique a estrutura PREP","Grave-se em apresentações","Simplifique documentos eliminando jargões"],readings:["Falar em Público – Dale Carnegie","Made to Stick – Chip Heath & Dan Heath"]},
        {id:29,name:"Influência",desc:"Usa argumentos para influenciar sem autoridade formal",remedies:["Aprenda os princípios de persuasão de Cialdini","Construa argumentos baseados em dados e histórias","Entenda o que motiva cada stakeholder","Pratique o elevator pitch"],readings:["As Armas da Persuasão – Robert Cialdini","Influence Without Authority – Allan Cohen"]},
        {id:30,name:"Habilidade organizacional",desc:"Navega com habilidade pela política organizacional",remedies:["Mapeie os stakeholders-chave e suas motivações","Observe como decisões realmente acontecem","Construa aliados em diferentes níveis","Antecipe resistências antes de propor mudanças"],readings:["Power – Jeffrey Pfeffer","O Homem que Mudou Tudo – Michael Lewis"]},
        {id:31,name:"Constrói redes",desc:"Cria e mantém redes de contato relevantes",remedies:["Estabeleça meta: 2 novos contatos por mês","Mantenha contato regular com sua rede","Participe de eventos do setor","Ofereça valor à sua rede antes de pedir ajuda"],readings:["Never Eat Alone – Keith Ferrazzi","A Arte de Fazer Conexões – Herminia Ibarra"]},
      ]},
    ]
  },
  { name:"Eu", key:"self", color:"#DB2777", light:"#FCE7F3", text:"#9D174D",
    clusters:[
      { name:"Sendo autêntico", comps:[
        {id:32,name:"Autoconhecimento",desc:"Conhece seus pontos fortes e limitações com clareza",remedies:["Solicite feedback 360° ao menos uma vez por ano","Mantenha diário de liderança semanal","Trabalhe com coach executivo ou mentor","Compare sua autopercepção com a dos outros"],readings:["Insight – Tasha Eurich","Liderança e Autoengano – Arbinger Institute"]},
        {id:33,name:"Integridade e confiança",desc:"É visto como honesto, íntegro e confiável",remedies:["Cumpra sempre o que prometeu","Seja transparente sobre erros cometidos","Não fale de pessoas diferente na ausência delas","Alinhe o que diz com o que faz"],readings:["A Velocidade da Confiança – Stephen M.R. Covey","Dare to Lead – Brené Brown"]},
        {id:34,name:"Equanimidade",desc:"Mantém-se composto e estável mesmo sob pressão",remedies:["Desenvolva rituais de recuperação: exercício e sono","Reencadre situações difíceis buscando aprendizado","Construa rede de suporte emocional","Identifique seus gatilhos de estresse"],readings:["Grit – Angela Duckworth","Antifrágil – Nassim Taleb"]},
      ]},
      { name:"Sendo aberto", comps:[
        {id:35,name:"Aprende ativamente",desc:"Busca ativamente aprender e crescer continuamente",remedies:["Crie plano de aprendizado pessoal trimestral","Dedique 1h por semana para aprendizado","Compartilhe com a equipe o que está aprendendo","Solicite desafios de desenvolvimento ao gestor"],readings:["Mindset – Carol Dweck","Ultralearning – Scott Young"]},
        {id:36,name:"Agilidade na mudança",desc:"Adapta-se rapidamente em ambientes de constante mudança",remedies:["Volunteere-se para projetos de transformação","Pratique desaprender processos antigos","Reflita sobre mudanças passadas bem-sucedidas","Construa flexibilidade no seu estilo de trabalho"],readings:["Quem Mexeu no Meu Queijo? – Spencer Johnson","Leading Change – John Kotter"]},
        {id:37,name:"Autodesenvolvimento",desc:"Assume responsabilidade pelo próprio desenvolvimento",remedies:["Defina onde quer estar em 3 anos","Busque feedbacks desafiadores","Crie portfólio de experiências diversas","Revise seu plano de carreira semestralmente"],readings:["O Plano de Desenvolvimento – Dave Ulrich","Working Identity – Herminia Ibarra"]},
      ]},
      { name:"Sendo flexível", comps:[
        {id:38,name:"Agilidade de aprendizado",desc:"Aprende rapidamente com a experiência e aplica em situações novas",remedies:["Após cada projeto faça revisão pessoal","Busque experiências fora da zona de conforto","Leia sobre áreas fora da sua especialidade","Observe como pessoas de alta performance aprendem"],readings:["Learning Agility – George Hallenbeck","The Growth Mindset Coach – Annie Brock"]},
      ]},
    ]
  }
];

const ALL_COMPS = FACTORS.flatMap(f => f.clusters.flatMap(c => c.comps));
const FACTOR_OF: Record<number, typeof FACTORS[0]> = {};
ALL_COMPS.forEach(c => {
  const f = FACTORS.find(fac => fac.clusters.flatMap(cl => cl.comps).some(x => x.id === c.id));
  if (f) FACTOR_OF[c.id] = f;
});

const NIVEL_OPTS = [
  {key:"1",label:"Iniciante",color:"#EF4444"},
  {key:"2",label:"Em desenvolvimento",color:"#F97316"},
  {key:"3",label:"Adequado",color:"#EAB308"},
  {key:"4",label:"Avançado",color:"#22C55E"},
  {key:"5",label:"Referência",color:"#7C3AED"},
];

async function apiCall(action: string, extra: object = {}) {
  const res = await fetch("/api/notion", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action, ...extra }),
  });
  if (!res.ok) throw new Error("API error " + res.status);
  return res.json();
}

function Avatar({ name, size = 40, color = "#7C3AED" }: { name: string; size?: number; color?: string }) {
  const ini = (name || "?").split(" ").slice(0, 2).map((w: string) => w[0]).join("").toUpperCase();
  return <div style={{ width: size, height: size, borderRadius: "50%", background: color + "22", display: "flex", alignItems: "center", justifyContent: "center", fontSize: size * .36, fontWeight: 700, color, flexShrink: 0 }}>{ini}</div>;
}

function RadarChart({ names, antes, depois, size = 240 }: any) {
  if (!names || names.length < 3) return null;
  const cx = size/2, cy = size/2, r = size*.35, n = names.length;
  const ang = (i: number) => (Math.PI*2*i)/n - Math.PI/2;
  const pt = (val: number, i: number) => { const a=ang(i), d=(val/5)*r; return [cx+d*Math.cos(a), cy+d*Math.sin(a)]; };
  return (
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} style={{display:"block",margin:"0 auto"}}>
      {[1,2,3,4,5].map(ring => { const pts=Array.from({length:n},(_,i)=>{const a=ang(i),d=(ring/5)*r;return`${cx+d*Math.cos(a)},${cy+d*Math.sin(a)}`;});return <polygon key={ring} points={pts.join(" ")} fill="none" stroke="#e5e7eb" strokeWidth="0.7"/>; })}
      {Array.from({length:n},(_,i)=>{const[x,y]=pt(5,i);return<line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="#e5e7eb" strokeWidth="0.7"/>;  })}
      <polygon points={names.map((_:any,i:number)=>pt(antes[i]||0,i).join(",")).join(" ")} fill="#7C3AED18" stroke="#7C3AED" strokeWidth="2"/>
      {depois&&<polygon points={names.map((_:any,i:number)=>pt(depois[i]||0,i).join(",")).join(" ")} fill="#05966918" stroke="#059669" strokeWidth="2" strokeDasharray="5 3"/>}
      {names.map((c:string,i:number)=>{const a=ang(i),lx=cx+(r+22)*Math.cos(a),ly=cy+(r+22)*Math.sin(a),anchor=lx<cx-5?"end":lx>cx+5?"start":"middle";return<text key={i} x={lx} y={ly} textAnchor={anchor} fontSize="9" fill="#6b7280" dominantBaseline="middle">{c.length>12?c.slice(0,11)+"…":c}</text>;})}
    </svg>
  );
}

function Toast({ msg, type="success" }: { msg:string; type?:string }) {
  return <div style={{position:"fixed",bottom:24,left:"50%",transform:"translateX(-50%)",background:type==="success"?"#059669":type==="error"?"#DC2626":"#7C3AED",color:"#fff",padding:"12px 20px",borderRadius:12,fontSize:14,fontWeight:500,zIndex:9999,boxShadow:"0 4px 20px rgba(0,0,0,.2)",whiteSpace:"nowrap"}}>{msg}</div>;
}

function Spinner({ color="#7C3AED" }: { color?:string }) {
  return <div style={{display:"inline-block",width:18,height:18,border:`2px solid ${color}33`,borderTop:`2px solid ${color}`,borderRadius:"50%",animation:"spin .7s linear infinite"}}><style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style></div>;
}

export default function Dashboard() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const [screen, setScreen] = useState<"dashboard"|"new1"|"new2"|"new3"|"view"|"update">("dashboard");
  const [pdis, setPdis] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<any>(null);
  const [form, setForm] = useState({ nome:"", cargo:"", area:"", prazo:"" });
  const [selected, setSelected] = useState<Record<number,boolean>>({});
  const [nivelAntes, setNivelAntes] = useState<Record<number,string>>({});
  const [obsAntes, setObsAntes] = useState<Record<number,string>>({});
  const [viewPdi, setViewPdi] = useState<any>(null);
  const [nivelDepois, setNivelDepois] = useState<Record<number,string>>({});
  const [obsDepois, setObsDepois] = useState<Record<number,string>>({});
  const [search, setSearch] = useState("");
  const [filterFactor, setFilterFactor] = useState("all");

  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress) {
      setLoading(true);
      apiCall("list", { gestorEmail: user.primaryEmailAddress.emailAddress })
        .then(data => setPdis(data || []))
        .catch(() => showToast("Erro ao carregar PDIs.", "error"))
        .finally(() => setLoading(false));
    }
  }, [user]);

  function showToast(msg: string, type="success") { setToast({msg,type}); setTimeout(()=>setToast(null),3500); }
  function selCount() { return Object.values(selected).filter(Boolean).length; }
  function toggleComp(id: number) { if(!selected[id]&&selCount()>=5) return; setSelected(p=>({...p,[id]:!p[id]})); }
  function startNew() { setForm({nome:"",cargo:"",area:"",prazo:""}); setSelected({}); setNivelAntes({}); setObsAntes({}); setScreen("new1"); }

  async function handleSavePdi() {
    setSaving(true);
    const comps = ALL_COMPS.filter(c=>selected[c.id]).map(c=>({id:c.id,name:c.name,nivelAntes:parseInt(nivelAntes[c.id]||"1"),nivelDepois:null,obsAntes:obsAntes[c.id]||"",obsDepois:""}));
    const pdi = {id:"pdi_"+Date.now(),gestorEmail:user?.primaryEmailAddress?.emailAddress||"",gestorNome:user?.fullName||"",...form,comps,createdAt:new Date().toISOString(),status:"Em andamento"};
    try { const result=await apiCall("create",{pdi}); setPdis(p=>[{...pdi,pageId:result.pageId},...p]); setScreen("dashboard"); showToast("PDI salvo no Notion! ✓"); }
    catch { showToast("Erro ao salvar no Notion.","error"); }
    setSaving(false);
  }

  async function handleSaveUpdate() {
    setSaving(true);
    const compsAtualizados = viewPdi.comps.map((c:any)=>({...c,nivelDepois:parseInt(nivelDepois[c.id]||String(c.nivelAntes)),obsDepois:obsDepois[c.id]||""}));
    try { await apiCall("update",{pageId:viewPdi.pageId,comps:compsAtualizados}); const updated={...viewPdi,comps:compsAtualizados,status:"Concluído"}; setViewPdi(updated); setPdis(p=>p.map((x:any)=>x.pageId===viewPdi.pageId?updated:x)); setScreen("view"); showToast("Avaliação salva! ✓"); }
    catch { showToast("Erro ao atualizar.","error"); }
    setSaving(false);
  }

  function copyLink(pdi:any) { const url=`${window.location.origin}/pdi/${pdi.pageId}`; navigator.clipboard.writeText(url).then(()=>showToast("Link copiado! 🔗")); }

  const filteredComps = ALL_COMPS.filter(c=>{
    const ms=c.name.toLowerCase().includes(search.toLowerCase());
    const mf=filterFactor==="all"||FACTORS.find(f=>f.key===filterFactor)?.clusters.flatMap(cl=>cl.comps).some(x=>x.id===c.id);
    return ms&&mf;
  });

  const Header = ({title,sub,back}:{title:string;sub:string;back:()=>void}) => (
    <div style={{background:"#fff",borderBottom:"1px solid #f3f4f6",padding:"14px 20px",display:"flex",alignItems:"center",gap:12,position:"sticky",top:0,zIndex:10}}>
      <button onClick={back} style={{background:"none",border:"none",cursor:"pointer",fontSize:22,color:"#6b7280",lineHeight:1}}>←</button>
      <div style={{flex:1}}><p style={{fontWeight:700,fontSize:15,margin:0}}>{title}</p><p style={{fontSize:12,color:"#9ca3af",margin:0}}>{sub}</p></div>
    </div>
  );

  if (screen==="dashboard") return (
    <div style={{minHeight:"100vh",background:"#f9fafb",fontFamily:"system-ui,sans-serif"}}>
      {toast&&<Toast {...toast}/>}
      <div style={{background:"linear-gradient(135deg,#7C3AED,#4F46E5)",padding:"20px 20px 48px"}}>
        <div style={{maxWidth:680,margin:"0 auto",display:"flex",alignItems:"center",gap:12}}>
          <Avatar name={user?.fullName||"G"} size={42} color="#fff"/>
          <div style={{flex:1}}><p style={{color:"#c4b5fd",fontSize:12,margin:0}}>Bem-vindo,</p><p style={{color:"#fff",fontWeight:700,fontSize:17,margin:0}}>{user?.fullName}</p></div>
          <button onClick={()=>signOut()} style={{background:"#ffffff22",border:"none",color:"#c4b5fd",borderRadius:10,padding:"6px 14px",fontSize:12,cursor:"pointer"}}>Sair</button>
        </div>
      </div>
      <div style={{maxWidth:680,margin:"-24px auto 0",padding:"0 16px 40px"}}>
        <button onClick={startNew} style={{width:"100%",background:"#7C3AED",color:"#fff",border:"none",borderRadius:14,padding:15,fontSize:15,fontWeight:700,cursor:"pointer",marginBottom:20,boxShadow:"0 4px 14px #7C3AED44"}}>+ Novo PDI</button>
        {loading?(<div style={{textAlign:"center",padding:48}}><Spinner/><p style={{color:"#9ca3af",fontSize:14,marginTop:12}}>Carregando do Notion…</p></div>)
        :pdis.length===0?(<div style={{textAlign:"center",padding:"48px 20px",color:"#9ca3af"}}><div style={{fontSize:44,marginBottom:12}}>📝</div><p style={{fontSize:15}}>Nenhum PDI criado ainda.</p></div>)
        :pdis.map((pdi:any)=>{
          const avgA=pdi.comps?.reduce((a:number,c:any)=>a+c.nivelAntes,0)/(pdi.comps?.length||1);
          const cd=pdi.comps?.filter((c:any)=>c.nivelDepois!==null)||[];
          const avgD=cd.length>0?cd.reduce((a:number,c:any)=>a+c.nivelDepois,0)/cd.length:null;
          const fc=FACTOR_OF[pdi.comps?.[0]?.id];
          return(
            <div key={pdi.pageId} style={{background:"#fff",borderRadius:16,padding:16,marginBottom:12,border:"1px solid #f3f4f6",boxShadow:"0 1px 4px rgba(0,0,0,.05)"}}>
              <div style={{display:"flex",gap:12,alignItems:"center",marginBottom:12}}>
                <Avatar name={pdi.nome} size={44} color={fc?.color||"#7C3AED"}/>
                <div style={{flex:1,minWidth:0}}><p style={{fontWeight:700,fontSize:15,margin:0,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{pdi.nome}</p><p style={{fontSize:12,color:"#6b7280",margin:"2px 0 0"}}>{pdi.cargo}{pdi.area&&` · ${pdi.area}`}</p></div>
                <span style={{fontSize:11,padding:"3px 10px",borderRadius:99,background:pdi.status==="Concluído"?"#d1fae5":"#ede9fe",color:pdi.status==="Concluído"?"#065f46":"#5b21b6",fontWeight:600,whiteSpace:"nowrap"}}>{pdi.status||"Em andamento"}</span>
              </div>
              {pdi.comps&&<div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:12}}>{pdi.comps.map((c:any)=>{const f=FACTOR_OF[c.id];return<span key={c.id} style={{fontSize:11,background:f?.light||"#f3f4f6",color:f?.text||"#374151",padding:"3px 8px",borderRadius:99,fontWeight:500}}>{c.name}</span>;})}</div>}
              <div style={{display:"flex",gap:8}}>
                <button onClick={()=>{setViewPdi(pdi);setScreen("view");}} style={{flex:1,background:"#f3f4f6",color:"#374151",border:"none",borderRadius:10,padding:"9px",fontSize:13,fontWeight:600,cursor:"pointer"}}>Ver PDI</button>
                <button onClick={()=>copyLink(pdi)} style={{flex:1,background:"#ede9fe",color:"#5b21b6",border:"none",borderRadius:10,padding:"9px",fontSize:13,fontWeight:600,cursor:"pointer"}}>🔗 Copiar link</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  if (screen==="new1") return (
    <div style={{minHeight:"100vh",background:"#f9fafb",fontFamily:"system-ui,sans-serif"}}>
      {toast&&<Toast {...toast}/>}
      <Header title="Novo PDI" sub="Etapa 1 de 3 — Dados do colaborador" back={()=>setScreen("dashboard")}/>
      <div style={{padding:20,maxWidth:540,margin:"0 auto"}}>
        {[["nome","Nome completo","Ex: Ana Paula Ferreira"],["cargo","Cargo","Ex: Analista de RH Sênior"],["area","Área","Ex: Recursos Humanos"]].map(([k,l,ph])=>(
          <div key={k} style={{marginBottom:14}}>
            <label style={{fontSize:13,fontWeight:500,color:"#374151",display:"block",marginBottom:5}}>{l}</label>
            <input value={(form as any)[k]} onChange={e=>setForm(p=>({...p,[k]:e.target.value}))} placeholder={ph} style={{width:"100%",padding:"11px 14px",borderRadius:12,border:"1.5px solid #e5e7eb",fontSize:14,boxSizing:"border-box" as const}}/>
          </div>
        ))}
        <div style={{marginBottom:24}}>
          <label style={{fontSize:13,fontWeight:500,color:"#374151",display:"block",marginBottom:5}}>Prazo do PDI</label>
          <input type="date" value={form.prazo} onChange={e=>setForm(p=>({...p,prazo:e.target.value}))} style={{width:"100%",padding:"11px 14px",borderRadius:12,border:"1.5px solid #e5e7eb",fontSize:14,boxSizing:"border-box" as const}}/>
        </div>
        <button onClick={()=>setScreen("new2")} disabled={!form.nome} style={{width:"100%",background:form.nome?"#7C3AED":"#e5e7eb",color:form.nome?"#fff":"#9ca3af",border:"none",borderRadius:14,padding:15,fontSize:15,fontWeight:700,cursor:form.nome?"pointer":"default"}}>Próximo →</button>
      </div>
    </div>
  );

  if (screen==="new2") return (
    <div style={{minHeight:"100vh",background:"#f9fafb",fontFamily:"system-ui,sans-serif"}}>
      {toast&&<Toast {...toast}/>}
      <Header title="Competências" sub={`Etapa 2 de 3 · ${selCount()}/5 selecionadas`} back={()=>setScreen("new1")}/>
      <div style={{padding:"16px 20px",maxWidth:680,margin:"0 auto"}}>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Buscar competência..." style={{width:"100%",padding:"10px 14px",borderRadius:12,border:"1.5px solid #e5e7eb",fontSize:14,marginBottom:12,boxSizing:"border-box" as const}}/>
        <div style={{display:"flex",gap:8,overflowX:"auto",paddingBottom:8,marginBottom:16}}>
          {[{key:"all",name:"Todas",color:"#6b7280"},...FACTORS.map(f=>({key:f.key,name:f.name,color:f.color}))].map(f=>(
            <button key={f.key} onClick={()=>setFilterFactor(f.key)} style={{flexShrink:0,padding:"6px 14px",borderRadius:99,border:"none",cursor:"pointer",fontSize:12,fontWeight:500,background:filterFactor===f.key?f.color:"#f3f4f6",color:filterFactor===f.key?"#fff":"#6b7280"}}>{f.name}</button>
          ))}
        </div>
        {FACTORS.map(factor=>{
          const cifs=factor.clusters.flatMap(cl=>cl.comps).filter(c=>filteredComps.some(fc=>fc.id===c.id));
          if(!cifs.length) return null;
          return(
            <div key={factor.key} style={{marginBottom:20}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><div style={{width:10,height:10,borderRadius:"50%",background:factor.color}}/><span style={{fontSize:13,fontWeight:700,color:"#374151"}}>{factor.name}</span></div>
              {cifs.map(comp=>(
                <div key={comp.id}>
                  <div onClick={()=>toggleComp(comp.id)} style={{background:"#fff",borderRadius:12,padding:"12px 14px",marginBottom:6,border:selected[comp.id]?`2px solid ${factor.color}`:"1.5px solid #f3f4f6",cursor:"pointer",display:"flex",gap:12,alignItems:"flex-start"}}>
                    <div style={{width:22,height:22,borderRadius:6,border:selected[comp.id]?"none":"1.5px solid #d1d5db",background:selected[comp.id]?factor.color:"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1}}>{selected[comp.id]&&<span style={{color:"#fff",fontSize:13,fontWeight:700}}>✓</span>}</div>
                    <div style={{flex:1}}><p style={{fontWeight:600,fontSize:14,margin:"0 0 2px",color:"#111827"}}>{comp.name}</p><p style={{fontSize:12,color:"#6b7280",margin:0,lineHeight:1.5}}>{comp.desc}</p></div>
                  </div>
                  {selected[comp.id]&&(
                    <div style={{background:factor.light,borderRadius:10,padding:"12px 14px",marginBottom:8,marginTop:-4}}>
                      <p style={{fontSize:12,fontWeight:600,color:factor.text,margin:"0 0 8px"}}>Nível atual:</p>
                      <div style={{display:"flex",gap:5,marginBottom:8}}>{NIVEL_OPTS.map(n=><button key={n.key} onClick={()=>setNivelAntes(p=>({...p,[comp.id]:n.key}))} style={{flex:1,padding:"7px 2px",borderRadius:8,border:"none",cursor:"pointer",fontSize:11,fontWeight:700,background:nivelAntes[comp.id]===n.key?n.color:"#fff",color:nivelAntes[comp.id]===n.key?"#fff":"#6b7280"}}>{n.key}</button>)}</div>
                      {nivelAntes[comp.id]&&<p style={{fontSize:11,color:factor.text,margin:"0 0 10px",textAlign:"center" as const,fontWeight:500}}>{NIVEL_OPTS.find(n=>n.key===nivelAntes[comp.id])?.label}</p>}
                      <textarea value={obsAntes[comp.id]||""} onChange={e=>setObsAntes(p=>({...p,[comp.id]:e.target.value}))} placeholder="Observações iniciais..." rows={2} style={{width:"100%",borderRadius:8,border:"1px solid #e5e7eb",fontSize:12,padding:"8px",boxSizing:"border-box" as const,resize:"vertical" as const,fontFamily:"inherit"}}/>
                    </div>
                  )}
                </div>
              ))}
            </div>
          );
        })}
        {selCount()>0&&<button onClick={()=>setScreen("new3")} style={{position:"sticky",bottom:16,width:"100%",background:"#7C3AED",color:"#fff",border:"none",borderRadius:14,padding:15,fontSize:15,fontWeight:700,cursor:"pointer",boxShadow:"0 4px 14px #7C3AED55"}}>Revisar PDI ({selCount()}) →</button>}
      </div>
    </div>
  );

  if (screen==="new3") {
    const selComps=ALL_COMPS.filter(c=>selected[c.id]);
    return(
      <div style={{minHeight:"100vh",background:"#f9fafb",fontFamily:"system-ui,sans-serif"}}>
        {toast&&<Toast {...toast}/>}
        <Header title="Revisar PDI" sub="Etapa 3 de 3" back={()=>setScreen("new2")}/>
        <div style={{padding:20,maxWidth:640,margin:"0 auto"}}>
          <div style={{background:"#fff",borderRadius:16,padding:20,marginBottom:16,border:"1px solid #f3f4f6"}}>
            <div style={{display:"flex",gap:12,alignItems:"center",marginBottom:16,paddingBottom:16,borderBottom:"1px solid #f9fafb"}}>
              <Avatar name={form.nome} size={50}/><div><p style={{fontWeight:700,fontSize:16,margin:0}}>{form.nome}</p><p style={{fontSize:13,color:"#6b7280",margin:"2px 0 0"}}>{form.cargo}{form.area&&` · ${form.area}`}</p></div>
            </div>
            {selComps.map((comp,idx)=>{
              const f=FACTOR_OF[comp.id];const nivel=NIVEL_OPTS.find(n=>n.key===nivelAntes[comp.id]);
              return(
                <div key={comp.id} style={{marginBottom:16,paddingBottom:idx<selComps.length-1?16:0,borderBottom:idx<selComps.length-1?"1px solid #f9fafb":"none"}}>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
                    <div style={{width:26,height:26,borderRadius:"50%",background:f?.color,color:"#fff",fontSize:12,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{idx+1}</div>
                    <span style={{fontWeight:700,fontSize:14}}>{comp.name}</span>
                    {nivel&&<span style={{marginLeft:"auto",fontSize:11,padding:"2px 8px",borderRadius:99,background:nivel.color+"22",color:nivel.color,fontWeight:600}}>Nível {nivel.key}</span>}
                  </div>
                  <div style={{paddingLeft:34}}>{comp.remedies.slice(0,2).map((r,i)=><div key={i} style={{display:"flex",gap:8,marginBottom:4}}><div style={{width:5,height:5,borderRadius:"50%",background:f?.color,flexShrink:0,marginTop:6}}/><p style={{fontSize:12,color:"#374151",margin:0,lineHeight:1.5}}>{r}</p></div>)}</div>
                </div>
              );
            })}
          </div>
          <button onClick={handleSavePdi} disabled={saving} style={{width:"100%",background:saving?"#9ca3af":"#7C3AED",color:"#fff",border:"none",borderRadius:14,padding:15,fontSize:15,fontWeight:700,cursor:saving?"default":"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:10}}>
            {saving?<><Spinner color="#fff"/> Salvando…</>:"✓ Salvar PDI"}
          </button>
        </div>
      </div>
    );
  }

  if (screen==="view"&&viewPdi) {
    const hasD=viewPdi.comps?.some((c:any)=>c.nivelDepois!==null);
    const rAntes=viewPdi.comps?.map((c:any)=>c.nivelAntes)||[];
    const rDepois=hasD?viewPdi.comps?.map((c:any)=>c.nivelDepois??c.nivelAntes):null;
    const avgA=rAntes.length?rAntes.reduce((a:number,b:number)=>a+b,0)/rAntes.length:0;
    const avgD=rDepois?rDepois.reduce((a:number,b:number)=>a+b,0)/rDepois.length:null;
    return(
      <div style={{minHeight:"100vh",background:"#f9fafb",fontFamily:"system-ui,sans-serif"}}>
        {toast&&<Toast {...toast}/>}
        <div style={{background:"linear-gradient(135deg,#7C3AED,#4F46E5)",padding:"20px 20px 52px"}}>
          <button onClick={()=>setScreen("dashboard")} style={{background:"#ffffff22",border:"none",color:"#fff",borderRadius:10,padding:"8px 14px",cursor:"pointer",fontSize:14,marginBottom:16}}>← Dashboard</button>
          <div style={{display:"flex",gap:14,alignItems:"center"}}>
            <Avatar name={viewPdi.nome} size={54} color="#fff"/>
            <div><h2 style={{color:"#fff",fontWeight:700,fontSize:20,margin:0}}>{viewPdi.nome}</h2><p style={{color:"#c4b5fd",fontSize:13,margin:"4px 0 0"}}>{viewPdi.cargo}{viewPdi.area&&` · ${viewPdi.area}`}</p></div>
          </div>
        </div>
        <div style={{padding:"0 16px 32px",maxWidth:640,margin:"-30px auto 0"}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:14}}>
            {[["Nível inicial",avgA.toFixed(1)+"/5","#7C3AED"],[avgD?"Nível atual":"Competências",avgD?avgD.toFixed(1)+"/5":viewPdi.comps?.length,"#059669"],["Status",viewPdi.status||"Em andamento","#D97706"]].map(([l,v,c])=>(
              <div key={l as string} style={{background:"#fff",borderRadius:14,padding:"12px 14px",border:"1px solid #f3f4f6"}}>
                <p style={{fontSize:10,color:"#9ca3af",margin:"0 0 3px",textTransform:"uppercase" as const,letterSpacing:".05em"}}>{l}</p>
                <p style={{fontSize:16,fontWeight:700,color:c as string,margin:0,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" as const}}>{v as string}</p>
              </div>
            ))}
          </div>
          {viewPdi.comps?.length>=3&&(
            <div style={{background:"#fff",borderRadius:16,padding:20,marginBottom:14,border:"1px solid #f3f4f6"}}>
              <p style={{fontWeight:700,fontSize:14,margin:"0 0 8px"}}>Gráfico de evolução</p>
              <RadarChart names={viewPdi.comps.map((c:any)=>c.name)} antes={rAntes} depois={rDepois}/>
              {!hasD&&<p style={{fontSize:12,color:"#9ca3af",textAlign:"center" as const,margin:"8px 0 0"}}>Registre a avaliação final para ver a evolução</p>}
            </div>
          )}
          {hasD&&avgD&&<div style={{background:"#d1fae5",borderRadius:14,padding:"14px 18px",marginBottom:14}}><p style={{margin:0,fontWeight:700,color:"#065f46",fontSize:14}}>📈 Evolução média: +{(avgD-avgA).toFixed(1)} pontos · {((avgD-avgA)/avgA*100).toFixed(0)}% de crescimento</p></div>}
          {viewPdi.comps?.map((comp:any,idx:number)=>{
            const full=ALL_COMPS.find(c=>c.id===comp.id);const f=FACTOR_OF[comp.id];
            return(
              <div key={comp.id||idx} style={{background:"#fff",borderRadius:16,padding:18,marginBottom:12,border:"1px solid #f3f4f6"}}>
                <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
                  <div style={{width:26,height:26,borderRadius:"50%",background:f?.color||"#7C3AED",color:"#fff",fontSize:12,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{idx+1}</div>
                  <span style={{fontWeight:700,fontSize:14,flex:1}}>{comp.name}</span>
                  <span style={{fontSize:12,padding:"2px 8px",borderRadius:99,background:"#ede9fe",color:"#5b21b6",fontWeight:700}}>{comp.nivelAntes}/5</span>
                  {comp.nivelDepois!==null&&<><span style={{color:"#9ca3af"}}>→</span><span style={{fontSize:12,padding:"2px 8px",borderRadius:99,background:"#d1fae5",color:"#065f46",fontWeight:700}}>{comp.nivelDepois}/5</span></>}
                </div>
                {full&&<div style={{paddingLeft:36}}>{full.remedies.slice(0,2).map((r,i)=><div key={i} style={{display:"flex",gap:8,marginBottom:4}}><div style={{width:5,height:5,borderRadius:"50%",background:f?.color||"#7C3AED",flexShrink:0,marginTop:6}}/><p style={{fontSize:12,color:"#374151",margin:0,lineHeight:1.5}}>{r}</p></div>)}</div>}
              </div>
            );
          })}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            <button onClick={()=>copyLink(viewPdi)} style={{background:"#ede9fe",color:"#5b21b6",border:"none",borderRadius:14,padding:13,fontSize:13,fontWeight:600,cursor:"pointer"}}>🔗 Link do colaborador</button>
            <button onClick={()=>{const nd:Record<number,string>={},od:Record<number,string>={};viewPdi.comps?.forEach((c:any)=>{nd[c.id]=String(c.nivelDepois||c.nivelAntes);od[c.id]=c.obsDepois||"";});setNivelDepois(nd);setObsDepois(od);setScreen("update");}} style={{background:"#059669",color:"#fff",border:"none",borderRadius:14,padding:13,fontSize:13,fontWeight:600,cursor:"pointer"}}>📊 Avaliação final</button>
          </div>
        </div>
      </div>
    );
  }

  if (screen==="update"&&viewPdi) return(
    <div style={{minHeight:"100vh",background:"#f9fafb",fontFamily:"system-ui,sans-serif"}}>
      {toast&&<Toast {...toast}/>}
      <Header title="Avaliação final" sub={viewPdi.nome} back={()=>setScreen("view")}/>
      <div style={{padding:20,maxWidth:540,margin:"0 auto"}}>
        <div style={{background:"#f0fdf4",borderRadius:12,padding:"12px 16px",marginBottom:20}}><p style={{fontSize:13,color:"#065f46",margin:0}}>📊 Após salvar, o gráfico antes/depois será atualizado no Notion.</p></div>
        {viewPdi.comps?.map((comp:any)=>{
          const f=FACTOR_OF[comp.id];
          return(
            <div key={comp.id} style={{background:"#fff",borderRadius:14,padding:16,marginBottom:12,border:"1px solid #f3f4f6"}}>
              <p style={{fontWeight:700,fontSize:14,margin:"0 0 2px"}}>{comp.name}</p>
              <p style={{fontSize:12,color:"#9ca3af",margin:"0 0 10px"}}>Nível inicial: {comp.nivelAntes}/5 — {NIVEL_OPTS.find(n=>n.key===String(comp.nivelAntes))?.label}</p>
              <div style={{display:"flex",gap:5,marginBottom:8}}>{NIVEL_OPTS.map(n=><button key={n.key} onClick={()=>setNivelDepois(p=>({...p,[comp.id]:n.key}))} style={{flex:1,padding:"8px 2px",borderRadius:10,border:"none",cursor:"pointer",fontSize:12,fontWeight:700,background:nivelDepois[comp.id]===n.key?n.color:"#f3f4f6",color:nivelDepois[comp.id]===n.key?"#fff":"#6b7280"}}>{n.key}</button>)}</div>
              {nivelDepois[comp.id]&&<p style={{fontSize:11,color:f?.color,margin:"0 0 8px",textAlign:"center" as const,fontWeight:600}}>{NIVEL_OPTS.find(n=>n.key===nivelDepois[comp.id])?.label}{parseInt(nivelDepois[comp.id])>comp.nivelAntes?" ↑ Evoluiu!":parseInt(nivelDepois[comp.id])<comp.nivelAntes?" ↓":""}</p>}
              <textarea value={obsDepois[comp.id]||""} onChange={e=>setObsDepois(p=>({...p,[comp.id]:e.target.value}))} placeholder="Observações sobre a evolução..." rows={2} style={{width:"100%",borderRadius:8,border:"1px solid #e5e7eb",fontSize:12,padding:"8px",boxSizing:"border-box" as const,resize:"vertical" as const,fontFamily:"inherit"}}/>
            </div>
          );
        })}
        <button onClick={handleSaveUpdate} disabled={saving} style={{width:"100%",background:saving?"#9ca3af":"#059669",color:"#fff",border:"none",borderRadius:14,padding:15,fontSize:15,fontWeight:700,cursor:saving?"default":"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:10}}>
          {saving?<><Spinner color="#fff"/> Salvando…</>:"✓ Salvar avaliação"}
        </button>
      </div>
    </div>
  );

  return null;
}
