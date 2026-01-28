import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ChannelCard from "../../components/ChannelCard/ChannelCard";
import AddChannelForm from "../../components/AddChannelForm/AddChannelForm";
import "./Account.css";
import penIcon from "../../assets/icons/edit-pen-write-svgrepo-com.svg";

function LogoutIcon() {
  return (
    <svg className="acc-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <path d="M16 17l5-5-5-5" />
      <path d="M21 12H9" />
    </svg>
  );
}

function Account({ onLogout, isAuth = true }) {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [user, setUser] = useState(null);
  const [channels, setChannels] = useState([]);

  const [addedTab, setAddedTab] = useState("moderation"); // moderation | added | rejected

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch("/db.json");
        if (!res.ok) throw new Error("Не вдалося завантажити db.json");

        const data = await res.json();

        setUser(data.user || null);
        setChannels(Array.isArray(data.channels) ? data.channels : []);
      } catch (e) {
        setError(e?.message || "Помилка завантаження");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const channelsById = useMemo(() => {
    const m = new Map();
    (channels || []).forEach((c) => m.set(String(c.id), c));
    return m;
  }, [channels]);

  const savedChannelsList = useMemo(() => {
    const ids = user?.savedChannels || [];
    if (!Array.isArray(ids) || ids.length === 0) return [];

    return ids
      .map((id) => channelsById.get(String(id)))
      .filter(Boolean);
  }, [user, channelsById]);

  const addedChannelsFull = useMemo(() => {
    const items = user?.addedChannels || [];
    if (!Array.isArray(items) || items.length === 0) return [];

    return items.map((it) => {
      const full = channelsById.get(String(it.id));
      return {
        status: it.status || "moderation",
        channel:
          full ||
          {
            id: String(it.id),
            name: it.name || "Unknown",
            category: "",
            subscribers: "-",
            videos: "-",
            rating: "-",
            description: "",
            avatar: "https://placehold.co/60x60",
            youtubeLink: "#",
          },
      };
    });
  }, [user, channelsById]);

  const addedFiltered = useMemo(() => {
    return addedChannelsFull
      .filter((x) => x.status === addedTab)
      .map((x) => x.channel);
  }, [addedChannelsFull, addedTab]);

  if (loading) return <div style={{ padding: 24 }}>Loading...</div>;
  if (error) return <div style={{ padding: 24 }}>Error: {error}</div>;

  const name = user?.name || "Бавовнятко";
  const email = user?.email || "Bavovnyatko@gmail.com";
  const avatar = user?.avatar || "https://placekitten.com/200/200";

  return (
    <div className="acc-page">
      <div className="acc-container">
        {/* TOP PROFILE */}
        <section className="acc-top">
          <div className="acc-profile">
            <img className="acc-avatar" src={avatar} alt={name} />
            <div className="acc-profile-info">
              <div className="acc-name-row">
                <div className="acc-name">{name}</div>
                <button
                type="button"
                className="acc-edit-btn"
                aria-label="edit name"
                onClick={() => console.log("[ACCOUNT] Change nickname clicked")}
                >
                <img src={penIcon} alt="" className="acc-edit-icon" />
                </button>

              </div>
              <div className="acc-email-row">
                <div className="acc-email">{email}</div>
                <button
                type="button"
                className="acc-edit-btn"
                aria-label="edit email"
                onClick={() => console.log("[ACCOUNT] Change email clicked")}
                >
                <img src={penIcon} alt="" className="acc-edit-icon" />
                </button>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="acc-youtube-connected"
            onClick={() => console.log("[ACCOUNT] YouTube connected button clicked")}
          >
            <span className="acc-youtube-play">▶</span>
            YouTube підключено
          </button>

          <button
            type="button"
            className="acc-like-row"
            onClick={() => console.log("[ACCOUNT] Preferences clicked")}
          >
            <span className="acc-like-text">Вподобання</span>
            <span className="acc-like-arrow">›</span>
          </button>
        </section>

        {/* SAVED CHANNELS */}
        <section className="acc-section">
          <div className="acc-section-title">Збережені канали</div>

          <div className="acc-cards-grid">
            {savedChannelsList.length === 0 ? (
              <div className="acc-empty">Немає збережених каналів.</div>
            ) : (
              savedChannelsList.map((ch) => (
                <ChannelCard key={ch.id} channel={ch} hasLink={false} />
              ))
            )}
          </div>
        </section>

        {/* ADD CHANNEL (same block as Home) */}
        <AddChannelForm isAuth={isAuth} />

        {/* ADDED CHANNELS */}
        <section className="acc-section">
          <div className="acc-section-title">Ваші додані ютуб-канали</div>

          <div className="acc-tabs">
            <button
              type="button"
              className={`acc-tab ${addedTab === "moderation" ? "active" : ""}`}
              onClick={() => setAddedTab("moderation")}
            >
              На модерації
            </button>
            <button
              type="button"
              className={`acc-tab ${addedTab === "added" ? "active" : ""}`}
              onClick={() => setAddedTab("added")}
            >
              Додано
            </button>
            <button
              type="button"
              className={`acc-tab ${addedTab === "rejected" ? "active" : ""}`}
              onClick={() => setAddedTab("rejected")}
            >
              Відхилено
            </button>
          </div>

          <div className="acc-cards-grid">
            {addedFiltered.length === 0 ? (
              <div className="acc-empty">Немає каналів у цій вкладці.</div>
            ) : (
              addedFiltered.map((ch) => (
                <ChannelCard key={ch.id} channel={ch} hasLink={true} />
              ))
            )}
          </div>
        </section>

        {/* LOGOUT */}
        <section className="acc-logout">
          <button
            type="button"
            className="acc-logout-btn"
            onClick={() => {
              console.log("[ACCOUNT] Logout clicked");
              if (onLogout) onLogout();
              navigate("/");
            }}
          >
            <span>Вийти</span>
            <LogoutIcon />
          </button>
        </section>
      </div>
    </div>
  );
}

export default Account;
