import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./Channels.css";

import ChannelCard from "../../components/ChannelCard/ChannelCard";
import Pagination from "../../components/Pagination/Pagination";

import FiltersPanel, { DEFAULT_FILTERS } from "../../components/FiltersWindow/FiltersPanel";

function Channels() {
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);

  const [query, setQuery] = useState("");

  const [sortKey, setSortKey] = useState("subscribers");
  const [sortDir, setSortDir] = useState("desc");

  const [page, setPage] = useState(1);
  const pageSize = 12;

  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch("/db.json");
        const data = await res.json();
        setChannels(data.channels || []);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredAndSorted = useMemo(() => {
    let list = [...channels];

    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter((c) => (c.name || "").toLowerCase().includes(q));
    }

    const toNum = (v) => {
      if (v == null) return 0;
      if (typeof v === "number") return v;

      const s = String(v).toLowerCase().replace(",", ".").replace(/\s/g, "");
      const n = parseFloat(s.replace(/[^\d.]/g, "")) || 0;
      if (s.includes("млн")) return n * 1_000_000;
      if (s.includes("тис")) return n * 1_000;
      return n;
    };

    const getVal = (c) => {
      if (sortKey === "subscribers") return toNum(c.subscribers ?? c.subs ?? c.subscribersCount);
      if (sortKey === "videos") return toNum(c.videos ?? c.videoCount);
      if (sortKey === "rating") return toNum(c.rating ?? c.score);
      return 0;
    };

    list.sort((a, b) => {
      const av = getVal(a);
      const bv = getVal(b);
      return sortDir === "asc" ? av - bv : bv - av;
    });

    return list;
  }, [channels, query, sortKey, sortDir /*, filters */]);

  const totalPages = Math.max(1, Math.ceil(filteredAndSorted.length / pageSize));
  const pageItems = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredAndSorted.slice(start, start + pageSize);
  }, [filteredAndSorted, page]);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [totalPages, page]);

  const toggleSort = (key) => {
    if (sortKey !== key) {
      setSortKey(key);
      setSortDir("desc");
      setPage(1);
      return;
    }
    setSortDir((d) => (d === "desc" ? "asc" : "desc"));
    setPage(1);
  };

  if (loading) return <div className="channels-container">Loading...</div>;

  return (
    <div className="channels-container">
      <div className="channels-breadcrumb">
        <Link className="channels-breadcrumb-link" to="/">
          Головна
        </Link>
        <span className="channels-breadcrumb-sep"> \ </span>
        <span className="channels-breadcrumb-current">Канали</span>
      </div>

      <h1 className="channels-title">Список україномовних ютуб-каналів</h1>

      <div className="channels-searchRow">
        <div className="channels-searchWrap">
          <input
            className="channels-search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder=""
          />

          <span className="channels-searchIcon" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M10.5 18.5C14.6421 18.5 18 15.1421 18 11C18 6.85786 14.6421 3.5 10.5 3.5C6.35786 3.5 3 6.85786 3 11C3 15.1421 6.35786 18.5 10.5 18.5Z"
                stroke="#0F3A61"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M21 21L16.65 16.65"
                stroke="#0F3A61"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>

        <button
          type="button"
          className="channels-filterBtn"
          aria-label="Фільтри"
          onClick={() => setFiltersOpen(true)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M3 5H21L14 13V19L10 21V13L3 5Z"
              stroke="#0F3A61"
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {/* sort pills */}
      <div className="channels-sortRow">
        <button
          type="button"
          className={`channels-sortPill ${sortKey === "subscribers" ? "active" : ""}`}
          onClick={() => toggleSort("subscribers")}
        >
          Підписники <span className="channels-sortArrow">{sortKey === "subscribers" ? (sortDir === "desc" ? "▾" : "▴") : "▾"}</span>
        </button>

        <button
          type="button"
          className={`channels-sortPill ${sortKey === "videos" ? "active" : ""}`}
          onClick={() => toggleSort("videos")}
        >
          Відео <span className="channels-sortArrow">{sortKey === "videos" ? (sortDir === "desc" ? "▾" : "▴") : "▾"}</span>
        </button>

        <button
          type="button"
          className={`channels-sortPill ${sortKey === "rating" ? "active" : ""}`}
          onClick={() => toggleSort("rating")}
        >
          Оцінка <span className="channels-sortArrow">{sortKey === "rating" ? (sortDir === "desc" ? "▾" : "▴") : "▾"}</span>
        </button>
      </div>

      {/* list */}
      <div className="channels-cards">
        {pageItems.map((ch) => (
          <ChannelCard key={ch.id} channel={ch} hasLink={false} />
        ))}
      </div>

      <div className="channels-pagination">
        <Pagination page={page} totalPages={totalPages} onChange={setPage} />
      </div>

      {/* Filters window */}
      <FiltersPanel
        open={filtersOpen}
        value={filters}
        onClose={() => setFiltersOpen(false)}
        onApply={(newFilters) => setFilters(newFilters)}
        onReset={(defaults) => setFilters(defaults)}
        resultsCount={filteredAndSorted.length}
      />
    </div>
  );
}

export default Channels;
