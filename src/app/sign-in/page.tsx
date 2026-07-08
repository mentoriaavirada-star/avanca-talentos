import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #0a1628 0%, #112240 60%, #1d3461 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 24,
      padding: 20,
    }}>
      <div style={{ textAlign: "center" }}>
        <div style={{
          display: "inline-block",
          background: "rgba(132,204,22,0.15)",
          border: "1px solid rgba(132,204,22,0.3)",
          color: "#84cc16",
          padding: "6px 20px",
          borderRadius: 99,
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          marginBottom: 20,
        }}>Plataforma de Avaliação e Desenvolvimento</div>
        <h1 style={{ color: "#ffffff", fontSize: 36, fontWeight: 800, margin: "0 0 8px" }}>
          Avança <span style={{ color: "#84cc16" }}>Talentos</span>
        </h1>
        <p style={{ color: "#90e0ef", fontSize: 15, margin: 0 }}>
          Sua ferramenta de avaliação e desenvolvimento de talentos
        </p>
      </div>
      <SignIn fallbackRedirectUrl="/dashboard" />
    </div>
  );
}
