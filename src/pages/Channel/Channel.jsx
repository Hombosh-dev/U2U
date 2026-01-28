import React, { useMemo, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './Channel.css';
import db from '../../../db.json';
import ChannelCard from '../../components/ChannelCard/ChannelCard';
import Pagination from '../../components/Pagination/Pagination';
import RecommendedVideos from '../../components/RecommendedVideos/RecommendedVideos';
import Comments from '../../components/Comments/Comments';

const Channel = () => {
  const { id } = useParams();
  const channel = useMemo(() => db.channels.find(c => String(c.id) === String(id)), [id]);

  if (!channel) {
    return (
      <div style={{ padding: 24 }}>
        <p>Канал не знайдено.</p>
        <Link to="/">Повернутись на головну</Link>
      </div>
    );
  }

  const recommended = channel.recommendedVideos || [];
  const comments = channel.comments || [];
  const similarChannels = db.channels.filter(c => String(c.id) !== String(channel.id));
  const perPage = 3;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(similarChannels.length / perPage));
  const start = (currentPage - 1) * perPage;
  const pageItems = similarChannels.slice(start, start + perPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [channel.id]);

  return (
    <div className="channel-page">
      <div className="channel-breadcrumbs">
        <Link to="/">Головна</Link> / <Link to="/compilations">Добірки</Link> / <span>{channel.name}</span>
      </div>

      <div className="channel-header">
        <div className="channel-avatar">
          <img src={channel.avatar} alt={channel.name} />
        </div>
        <div className="channel-meta">
          <h1>{channel.name}</h1>
          <div className="channel-cats">{channel.category}</div>
          <a className="youtube-cta" href={channel.youtubeLink || '#'} target="_blank" rel="noreferrer">Перейти на канал</a>
          <div className="channel-stats">
            <div className="stat">
              <div className="label">Підписники</div>
              <div className="value">{channel.subscribers}</div>
            </div>
            <div className="stat">
              <div className="label">Відео</div>
              <div className="value">{channel.videos}</div>
            </div>
            <div className="stat">
              <div className="label">Оцінка</div>
              <div className="value">{channel.rating}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="channel-body">
        <div className="channel-main">
          <section className="channel-description">
            <h2>Опис</h2>
            <p>{channel.fullDescription || channel.description}</p>
          </section>

          <RecommendedVideos channels={[channel]} />

          <Comments currentChannel={channel} currentUser={db.user} />
        </div>

        <aside className="channel-aside">
          <h3>Подібні канали</h3>
          <div className="aside-list">
            {pageItems.map(c => (
              <div key={c.id} style={{ marginBottom: 12 }}>
                <ChannelCard channel={c} />
              </div>
            ))}

            {totalPages > 1 && (
              <div style={{ marginTop: 8 }}>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={(p) => setCurrentPage(p)}
                />
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Channel;
