"use client";

import { useEffect, useState } from "react";

// ─── Helpers ────────────────────────────────────────────────────────────────

function StatCard({ title, children, accent = "#7c6fff" }) {
  return (
    <div
      style={{
        background: "#13131a",
        border: `1px solid #2a2a3a`,
        borderTop: `3px solid ${accent}`,
        borderRadius: "12px",
        padding: "1.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
      }}
    >
      <h2
        style={{
          margin: 0,
          fontSize: "0.7rem",
          fontWeight: 700,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: accent,
        }}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}

function BigNumber({ value, label }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
      <span style={{ fontSize: "3rem", fontWeight: 800, lineHeight: 1, color: "#fff" }}>
        {value}
      </span>
      {label && (
        <span style={{ fontSize: "0.85rem", color: "#666" }}>{label}</span>
      )}
    </div>
  );
}

function Bar({ label, value, max, color = "#7c6fff" }) {
  const pct = max > 0 ? (value / max) * 100 : 0;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: "0.82rem",
          color: "#ccc",
        }}
      >
        <span>{label}</span>
        <span style={{ color: "#fff", fontWeight: 700 }}>{value}</span>
      </div>
      <div
        style={{
          background: "#2a2a3a",
          borderRadius: "4px",
          height: "6px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${pct}%`,
            height: "100%",
            background: color,
            borderRadius: "4px",
            transition: "width 0.8s ease",
          }}
        />
      </div>
    </div>
  );
}

function Pill({ label }) {
  return (
    <span
      style={{
        background: "#1e1e2e",
        border: "1px solid #3a3a5a",
        borderRadius: "999px",
        padding: "0.25rem 0.75rem",
        fontSize: "0.8rem",
        color: "#aaa",
      }}
    >
      {label}
    </span>
  );
}

function Skeleton({ height = "1.5rem", width = "100%" }) {
  return (
    <div
      style={{
        height,
        width,
        borderRadius: "6px",
        background: "linear-gradient(90deg, #1e1e2e 25%, #2a2a3a 50%, #1e1e2e 75%)",
        backgroundSize: "200% 100%",
        animation: "shimmer 1.4s infinite",
      }}
    />
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function StatsPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/stats")
      .then((r) => {
        if (!r.ok) throw new Error("Failed to load stats");
        return r.json();
      })
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const overviewItems = data
    ? [
        { label: "Users", value: data.overview.users, color: "#7c6fff" },
        { label: "Posts", value: data.overview.posts, color: "#ff6b6b" },
        { label: "Comments", value: data.overview.comments, color: "#ffd166" },
        { label: "Likes", value: data.overview.likes, color: "#06d6a0" },
        { label: "Follows", value: data.overview.follows, color: "#4cc9f0" },
      ]
    : [];

  const topWords = data?.topWords ?? [];
  const maxWordCount = topWords[0]?.count ?? 1;

  const topPosts = data?.topLikedPosts ?? [];
  const maxLikes = topPosts[0]?._count?.likes ?? 1;

  const mostFollowed = data?.mostFollowed ?? [];
  const maxFollowers = mostFollowed[0]?.followerCount ?? 1;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=JetBrains+Mono:wght@400;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0d0d14; color: #e0e0e0; font-family: 'Syne', sans-serif; }
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .stat-grid { animation: fadeUp 0.5s ease both; }
        .stat-grid:nth-child(2) { animation-delay: 0.05s; }
        .stat-grid:nth-child(3) { animation-delay: 0.1s; }
        .stat-grid:nth-child(4) { animation-delay: 0.15s; }
        .stat-grid:nth-child(5) { animation-delay: 0.2s; }
        .stat-grid:nth-child(6) { animation-delay: 0.25s; }
        .stat-grid:nth-child(7) { animation-delay: 0.3s; }
        .stat-grid:nth-child(8) { animation-delay: 0.35s; }
        mono { font-family: 'JetBrains Mono', monospace; }
      `}</style>

      <div style={{ minHeight: "100vh", background: "#0d0d14", padding: "2rem" }}>
        {/* Header */}
        <header
          style={{
            maxWidth: "1200px",
            margin: "0 auto 2.5rem",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <div>
            <p
              style={{
                fontSize: "0.7rem",
                letterSpacing: "0.2em",
                color: "#7c6fff",
                textTransform: "uppercase",
                fontWeight: 700,
                marginBottom: "0.4rem",
              }}
            >
              TheyChat — Platform Analytics
            </p>
            <h1 style={{ fontSize: "2.5rem", fontWeight: 800, color: "#fff" }}>
              Statistics Dashboard
            </h1>
          </div>
          <a
            href="/feed.html"
            style={{
              fontSize: "0.8rem",
              color: "#666",
              textDecoration: "none",
              border: "1px solid #2a2a3a",
              padding: "0.4rem 0.9rem",
              borderRadius: "6px",
            }}
          >
            ← Back to Feed
          </a>
        </header>

        {error && (
          <div
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
              background: "#2d1a1a",
              border: "1px solid #ff6b6b",
              borderRadius: "10px",
              padding: "1rem 1.5rem",
              color: "#ff6b6b",
            }}
          >
            ⚠ Error loading statistics: {error}
          </div>
        )}

        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {/* ── STAT 1: Platform Overview ── */}
          <div className="stat-grid" style={{ gridColumn: "1 / -1" }}>
            <StatCard title="Platform Overview" accent="#7c6fff">
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
                  gap: "1rem",
                }}
              >
                {loading
                  ? Array(5)
                      .fill(0)
                      .map((_, i) => <Skeleton key={i} height="4rem" />)
                  : overviewItems.map((item) => (
                      <div
                        key={item.label}
                        style={{
                          background: "#0d0d14",
                          borderRadius: "8px",
                          padding: "1rem",
                          border: `1px solid #2a2a3a`,
                          textAlign: "center",
                        }}
                      >
                        <div
                          style={{
                            fontSize: "2rem",
                            fontWeight: 800,
                            color: item.color,
                          }}
                        >
                          {item.value}
                        </div>
                        <div style={{ fontSize: "0.78rem", color: "#777", marginTop: "0.2rem" }}>
                          {item.label}
                        </div>
                      </div>
                    ))}
              </div>
            </StatCard>
          </div>

          {/* ── STAT 2: Avg Followers ── */}
          <div className="stat-grid">
            <StatCard title="Avg. Followers per User" accent="#4cc9f0">
              {loading ? (
                <Skeleton height="3.5rem" />
              ) : (
                <>
                  <BigNumber
                    value={data.avgFollowers.avg}
                    label="average followers"
                  />
                  <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                    <Pill label={`${data.avgFollowers.totalFollows} total follows`} />
                    <Pill label={`${data.avgFollowers.totalUsers} users`} />
                  </div>
                </>
              )}
            </StatCard>
          </div>

          {/* ── STAT 3: Avg Posts ── */}
          <div className="stat-grid">
            <StatCard title="Avg. Posts per User" accent="#ff6b6b">
              {loading ? (
                <Skeleton height="3.5rem" />
              ) : (
                <>
                  <BigNumber
                    value={data.avgPosts.avg}
                    label="average posts"
                  />
                  <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                    <Pill label={`${data.avgPosts.totalPosts} total posts`} />
                    <Pill label={`${data.avgPosts.totalUsers} users`} />
                  </div>
                </>
              )}
            </StatCard>
          </div>

          {/* ── STAT 4: Most Active User ── */}
          <div className="stat-grid">
            <StatCard title="Most Active User (Last 3 Months)" accent="#06d6a0">
              {loading ? (
                <Skeleton height="3.5rem" />
              ) : data.mostActive ? (
                <>
                  <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#fff" }}>
                    @{data.mostActive.user.username}
                  </div>
                  {data.mostActive.user.name && (
                    <div style={{ fontSize: "0.85rem", color: "#666" }}>
                      {data.mostActive.user.name}
                    </div>
                  )}
                  <Pill label={`${data.mostActive.totalActivity} posts + comments`} />
                </>
              ) : (
                <span style={{ color: "#555" }}>No activity recorded</span>
              )}
            </StatCard>
          </div>

          {/* ── STAT 5: Top Liked Posts ── */}
          <div className="stat-grid" style={{ gridColumn: "span 2" }}>
            <StatCard title="Top 5 Most Liked Posts" accent="#ffd166">
              {loading ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                  {Array(5).fill(0).map((_, i) => <Skeleton key={i} />)}
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                  {topPosts.map((post, i) => (
                    <div key={post.id}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: "0.3rem",
                          gap: "1rem",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "0.85rem",
                            color: "#ccc",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            maxWidth: "70%",
                          }}
                        >
                          <span style={{ color: "#ffd166", marginRight: "0.4rem" }}>
                            #{i + 1}
                          </span>
                          {post.content}
                        </span>
                        <span style={{ fontSize: "0.78rem", color: "#777", flexShrink: 0 }}>
                          @{post.postAuthor.username}
                        </span>
                      </div>
                      <Bar
                        label={`${post._count.likes} likes · ${post._count.comments} comments`}
                        value={post._count.likes}
                        max={maxLikes}
                        color="#ffd166"
                      />
                    </div>
                  ))}
                </div>
              )}
            </StatCard>
          </div>

          {/* ── STAT 6: Most Followed Users ── */}
          <div className="stat-grid">
            <StatCard title="Top 5 Most Followed Users" accent="#ff6b6b">
              {loading ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                  {Array(5).fill(0).map((_, i) => <Skeleton key={i} />)}
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                  {mostFollowed.map((item, i) => (
                    <Bar
                      key={item.user?.id ?? i}
                      label={`@${item.user?.username ?? "unknown"}`}
                      value={item.followerCount}
                      max={maxFollowers}
                      color="#ff6b6b"
                    />
                  ))}
                </div>
              )}
            </StatCard>
          </div>

          {/* ── STAT 7: Top Words ── */}
          <div className="stat-grid">
            <StatCard title="Top 10 Most Used Words in Posts" accent="#7c6fff">
              {loading ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {Array(8).fill(0).map((_, i) => <Skeleton key={i} />)}
                </div>
              ) : topWords.length === 0 ? (
                <span style={{ color: "#555" }}>No data</span>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                  {topWords.map((item) => (
                    <Bar
                      key={item.word}
                      label={item.word}
                      value={item.count}
                      max={maxWordCount}
                      color="#7c6fff"
                    />
                  ))}
                </div>
              )}
            </StatCard>
          </div>

          {/* ── STAT 8: Inactive Users ── */}
          <div className="stat-grid">
            <StatCard title="Users with Zero Posts" accent="#4cc9f0">
              {loading ? (
                <Skeleton height="3.5rem" />
              ) : (
                <>
                  <BigNumber
                    value={data.inactiveUsers.length}
                    label="inactive accounts"
                  />
                  {data.inactiveUsers.length > 0 && (
                    <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                      {data.inactiveUsers.map((u) => (
                        <Pill key={u.id} label={`@${u.username}`} />
                      ))}
                    </div>
                  )}
                </>
              )}
            </StatCard>
          </div>
        </div>

        <footer
          style={{
            maxWidth: "1200px",
            margin: "2.5rem auto 0",
            textAlign: "center",
            fontSize: "0.75rem",
            color: "#333",
            paddingBottom: "2rem",
          }}
        >
          TheyChat Analytics · Data served from /api/stats
        </footer>
      </div>
    </>
  );
}
