import Image from "next/image";
import Link from "next/link";

export default function AdminWelcomePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        background: "linear-gradient(135deg, #f5f7fa 0%, #e8f0f5 100%)",
      }}
    >
      <section
        style={{
          width: "100%",
          maxWidth: "720px",
          background: "var(--white)",
          border: "1px solid var(--line)",
          borderRadius: "20px",
          padding: "56px 44px",
          boxShadow: "0 10px 40px rgba(13,31,30,0.12)",
          textAlign: "center",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "28px" }}>
          <Image
            src="/techinrent-logo.png.png"
            alt="TechInRent"
            width={420}
            height={105}
            style={{ width: "auto", height: "100px" }}
            priority
          />
        </div>

        <h1
          style={{
            margin: 0,
            fontFamily: "var(--font-heading, sans-serif)",
            fontSize: "40px",
            fontWeight: 800,
            color: "var(--ink)",
            letterSpacing: "-0.02em",
          }}
        >
          Welcome to Admin Panel
        </h1>

        <div style={{ marginTop: "34px" }}>
          <Link
            href="/admin/dashboard"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              height: "52px",
              minWidth: "180px",
              padding: "0 26px",
              borderRadius: "12px",
              textDecoration: "none",
              fontFamily: "var(--font-body, sans-serif)",
              fontSize: "15px",
              fontWeight: 700,
              color: "var(--white)",
              background: "linear-gradient(135deg, var(--teal), #0a98ea)",
              boxShadow: "0 8px 24px rgba(6,124,203,0.28)",
            }}
          >
            Get Started
          </Link>
        </div>
      </section>
    </main>
  );
}
