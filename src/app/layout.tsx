import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Avança Talentos",
  description: "Sua ferramenta de avaliação e desenvolvimento de talentos",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="pt-BR">
        <body style={{ margin: 0, fontFamily: "system-ui, sans-serif", background: "#0a1628" }}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}

