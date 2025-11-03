import { useState } from "react";

function App() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const isValidGoogleMapsUrl = (str) => {
    return /https?:\/\/(www\.)?google\.[a-z.]+\/maps\/place\//i.test(str);
  };

  const handleAudit = async () => {
    setError("");
    setResult(null);

    if (!isValidGoogleMapsUrl(url)) {
      setError("Pegá una URL válida de Google Maps (debe contener /maps/place/).");
      return;
    }

    setLoading(true);

    // Simulación por ahora (después esto llama al backend n8n)
    setTimeout(() => {
      setResult({
        businessName: "Pizzería Los Amigos",
        score: 82,
        actions: [
          "Agregá fotos nuevas del local y productos.",
          "Respondé las reseñas negativas de los últimos 30 días.",
          "Actualizá la descripción agregando tu barrio y especialidad."
        ],
        sentiment: { positive: 68, neutral: 18, negative: 14 }
      });
      setLoading(false);
    }, 1000);
  };

  // estilos helpers
  const cardStyle = {
    width: "100%",
    maxWidth: "520px",
    backgroundColor: "#1a1a1a",
    border: "1px solid #333",
    borderRadius: "16px",
    padding: "1.5rem",
    boxShadow: "0 30px 80px rgba(0,0,0,0.9)",
  };

  const inputStyle = {
    width: "100%",
    boxSizing: "border-box", // <--- FIX desborde
    padding: "0.75rem 0.9rem",
    borderRadius: "8px",
    border: "1px solid #444",
    backgroundColor: "#0f0f0f",
    color: "#fff",
    fontSize: "0.9rem",
    marginBottom: "0.5rem",
    outline: "none",
  };

  const buttonStyle = {
    width: "100%",
    boxSizing: "border-box",
    backgroundColor: loading ? "#444" : "#4ade80",
    color: "#000",
    fontWeight: "600",
    border: "0",
    borderRadius: "8px",
    padding: "0.75rem 1rem",
    fontSize: "0.9rem",
    cursor: loading ? "default" : "pointer",
    marginTop: "0.5rem",
    marginBottom: "1rem",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",              // <--- fondo negro ocupa todo el viewport horizontal
        backgroundColor: "#0a0a0a",
        color: "#fafafa",
        display: "flex",
        flexDirection: "column",
        // centramos el card en desktop
        alignItems: "center",
        justifyContent: "flex-start",
        padding: "3rem 1rem 4rem 1rem",
      }}
    >
      <div style={cardStyle}>
        <h1
          style={{
            fontSize: "1.1rem",
            fontWeight: "600",
            marginBottom: "0.5rem",
            lineHeight: 1.3,
            color: "#fff",
          }}
        >
          Auditoría de Perfil de Google Maps
        </h1>

        <div
          style={{
            fontSize: "0.8rem",
            color: "#aaa",
            marginBottom: "1rem",
            lineHeight: 1.4,
          }}
        >
          Pegá la URL pública de tu negocio en Google Maps y te mostramos un
          puntaje y mejoras accionables. Gratis.
        </div>

        {/* INPUT */}
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://www.google.com/maps/place/Tu+Negocio"
          style={inputStyle}
        />

        {error && (
          <div
            style={{
              color: "#f87171",
              fontSize: "0.8rem",
              marginBottom: "0.5rem",
              lineHeight: 1.4,
            }}
          >
            {error}
          </div>
        )}

        {/* BOTÓN */}
        <button onClick={handleAudit} disabled={loading} style={buttonStyle}>
          {loading ? "Auditando..." : "Auditar perfil"}
        </button>

        {!result && !loading && (
          <div
            style={{
              fontSize: "0.7rem",
              color: "#888",
              marginBottom: "1rem",
              lineHeight: 1.4,
              wordBreak: "break-all",
            }}
          >
            Ejemplo: https://www.google.com/maps/place/Pizzeria+Los+Amigos
          </div>
        )}

        {/* RESULTADO SIMULADO */}
        {result && (
          <div
            style={{
              backgroundColor: "#0f0f0f",
              border: "1px solid #333",
              borderRadius: "12px",
              padding: "1rem",
            }}
          >
            {/* header resultado */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                marginBottom: "1rem",
                flexWrap: "wrap",
                rowGap: "0.75rem",
              }}
            >
              <div style={{ minWidth: "60%" }}>
                <div
                  style={{
                    fontSize: "0.7rem",
                    color: "#888",
                    marginBottom: "0.25rem",
                  }}
                >
                  Negocio
                </div>
                <div
                  style={{
                    fontSize: "1rem",
                    fontWeight: "600",
                    lineHeight: 1.3,
                    color: "#fff",
                    wordBreak: "break-word",
                  }}
                >
                  {result.businessName}
                </div>
              </div>

              <div style={{ textAlign: "right" }}>
                <div
                  style={{
                    fontSize: "0.7rem",
                    color: "#888",
                    marginBottom: "0.25rem",
                  }}
                >
                  Score
                </div>
                <div
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "700",
                    lineHeight: 1,
                    color: "#4ade80",
                  }}
                >
                  {result.score}/100
                </div>
              </div>
            </div>

            {/* Acciones */}
            <div
              style={{
                fontSize: "0.75rem",
                color: "#aaa",
                marginBottom: "0.5rem",
                lineHeight: 1.4,
              }}
            >
              Acciones recomendadas:
            </div>

            <ul
              style={{
                fontSize: "0.9rem",
                color: "#fff",
                paddingLeft: "1rem",
                marginBottom: "1rem",
                lineHeight: 1.4,
              }}
            >
              {result.actions.map((a, i) => (
                <li key={i} style={{ marginBottom: "0.5rem" }}>
                  {a}
                </li>
              ))}
            </ul>

            {/* Sentiment */}
            <div
              style={{
                fontSize: "0.75rem",
                color: "#aaa",
                marginBottom: "0.5rem",
              }}
            >
              Reseñas últimas (estimación %):
            </div>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                rowGap: "0.5rem",
                columnGap: "1rem",
                fontSize: "0.8rem",
                lineHeight: 1.4,
                color: "#fff",
              }}
            >
              <div style={{ color: "#4ade80" }}>
                Positivas: {result.sentiment.positive}%
              </div>
              <div style={{ color: "#eab308" }}>
                Neutras: {result.sentiment.neutral}%
              </div>
              <div style={{ color: "#f87171" }}>
                Negativas: {result.sentiment.negative}%
              </div>
            </div>
          </div>
        )}

        {/* aviso demo */}
        <div
          style={{
            fontSize: "0.7rem",
            color: "#777",
            textAlign: "center",
            marginTop: "1rem",
            lineHeight: 1.4,
          }}
        >
          Esta es una demo. Todavía no analizamos tu negocio real.
        </div>
      </div>

      {/* footer global */}
      <div
        style={{
          fontSize: "0.7rem",
          color: "#555",
          marginTop: "2rem",
          textAlign: "center",
          maxWidth: "520px",
          lineHeight: 1.4,
        }}
      >
        Próximamente: análisis real de reseñas, descripción, fotos y actividad
        usando IA. Gratis en el MVP.
      </div>
    </div>
  );
}

export default App;
