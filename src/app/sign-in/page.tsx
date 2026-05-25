import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #7C3AED, #4F46E5)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 24,
      padding: 20,
    }}>
      <div style={{ textAlign: "center", color: "#fff" }}>
        <div style={{ fontSize: 48, marginBottom: 8 }}>📋</div>
        <h1 style={{ fontWeight: 800, fontSize: 24, margin: "0 0 4px" }}>Plataforma PDI</h1>
        <p style={{ opacity: 0.8, fontSize: 14, margin: 0 }}>FYI — Korn Ferry · 38 Competências</p>
      </div>
      <SignIn afterSignInUrl="/dashboard" />
    </div>
  );
}
