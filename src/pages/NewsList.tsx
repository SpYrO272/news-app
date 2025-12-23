import { useState, useEffect, useMemo } from 'react';
import { useGetPostsQuery, useGetUsersQuery } from '../app/api';
import { useSelector } from 'react-redux';
import type { RootState } from '../app/store';
import { translations } from '../i18n/translations';
import { Link } from 'react-router-dom';
import './NewsList.css';

export default function NewsList() {
  const { data: posts, isLoading } = useGetPostsQuery();
  const { data: users } = useGetUsersQuery();
  const { lang } = useSelector((state: RootState) => state.language);
  const { theme } = useSelector((state: RootState) => state.theme);

  const labels = translations[lang] as any;
  const isAr = lang === 'ar';
  
  const [visibleCount, setVisibleCount] = useState(6);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fallback Image Handler
  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "https://placehold.co/400x250/e0e0e0/666666?text=News+Image";
  };

  const slidePosts = useMemo(() => posts?.slice(0, 5) || [], [posts]);
  const formattedGridPosts = useMemo(() => {
    if (!posts) return [];
    const pool = posts.slice(5); 
    const groupedByAuthor: { [key: number]: any[] } = {};
    pool.forEach(post => {
      if (!groupedByAuthor[post.userId]) groupedByAuthor[post.userId] = [];
      groupedByAuthor[post.userId].push(post);
    });
    const authorIds = Object.keys(groupedByAuthor).map(Number);
    const result: any[] = [];
    let hasMore = true;
    let round = 0;
    while (hasMore) {
      hasMore = false;
      authorIds.forEach(id => {
        if (groupedByAuthor[id][round]) {
          result.push(groupedByAuthor[id][round]);
          hasMore = true;
        }
      });
      round++;
    }
    return result;
  }, [posts]);

  const visibleGridPosts = formattedGridPosts.slice(0, visibleCount);

  useEffect(() => {
    if (slidePosts.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slidePosts.length);
    }, 5000); 
    return () => clearInterval(interval);
  }, [slidePosts.length]);

  return (
    <div className={`page-wrapper pb-5 ${theme === 'dark' ? 'bg-dark text-light' : 'bg-white text-dark'}`} dir={isAr ? 'rtl' : 'ltr'}>
      <div className="container pt-5">
        
        {/* HERO SECTION */}
        <div className={`row align-items-center mb-5 g-0 gx-lg-4 ${isAr ? 'flex-row-reverse' : ''}`}>
          <div className="col-lg-4 mt-4 mt-lg-0">
            <div className={`title-wrapper ${isAr ? 'text-end border-end-accent pe-3' : 'text-start border-start-accent ps-3'}`}>
              <span className="subtitle-text text-uppercase text-muted fw-bold small">
                {labels.browseTitle || (isAr ? 'تصفح وإقرأ أحدث الأخبار' : 'BROWSE AND READ THE LATEST STUFF')}
              </span>
              <h1 className="main-section-title fw-black text-uppercase mt-2">{labels.news}</h1>
            </div>
          </div>

          <div className="col-lg-8">
            {isLoading ? (
              <div className="slider-container shadow rounded-4 skeleton-box"></div>
            ) : (
              slidePosts.length > 0 && (
                <div className="slider-container shadow rounded-4 overflow-hidden">
                  {slidePosts.map((post, index) => (
                    <div key={post.id} className={`slide ${index === currentIndex ? 'active' : ''}`}>
                      <img 
                        src={`https://picsum.photos/1200/600?random=${post.id}`} 
                        className="hero-img" 
                        alt="Slider" 
                        onError={handleImgError}
                      />
                      <div className="hero-caption p-4">
                        <span className="featured-badge">{labels.featured || (isAr ? 'مميز' : 'FEATURED')}</span>
                        <h2 className="mt-2 fw-bold text-white text-uppercase slider-title-text">{post.title}</h2>
                      </div>
                    </div>
                  ))}
                  <div className="slide-indicators-overlay">
                    {slidePosts.map((_, i) => (
                      <span key={i} className={`indicator-dot ${i === currentIndex ? 'active' : ''}`} onClick={() => setCurrentIndex(i)}></span>
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        {/* GRID SECTION */}
        <div className="row g-4 mt-4">
          {isLoading ? (
            // Skeleton Loader Display
            Array(6).fill(0).map((_, i) => (
              <div key={i} className="col-md-4">
                <div className={`news-card-pro h-100 themed-card ${theme} skeleton-card`}>
                  <div className="skeleton-img"></div>
                  <div className="p-3">
                    <div className="skeleton-line title"></div>
                    <div className="skeleton-line meta"></div>
                    <div className="skeleton-line body"></div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            visibleGridPosts.map(post => { 
              const authorName = users?.find(u => u.id === post.userId)?.name || labels.loading;
              return (
                <div key={post.id} className="col-md-4 d-flex align-items-stretch">
                  <article className={`news-card-pro h-100 overflow-hidden themed-card ${theme}`}>
                    <div className="img-wrapper-pro position-relative">
                      <img 
                        src={`https://picsum.photos/400/250?random=${post.id}`} 
                        className="img-fluid w-100" 
                        alt="news" 
                        onError={handleImgError}
                      />
                      <div className="cat-tag-pro">
                        {labels.newsTag || (isAr ? 'أخبار' : 'NEWS')}
                      </div>
                    </div>
                    <div className="content-pro p-3">
                      <h5 className="fw-bold text-uppercase mb-2 card-title-text">
                        <Link to={`/post/${post.id}`} className="text-decoration-none title-hover-red">{post.title}</Link>
                      </h5>
                      <div className="meta-info-pro text-danger fw-bold smaller mb-2 text-uppercase">
                        {labels.author}: {authorName}
                      </div>
                      <p className="description-text small mb-3">{post.body.substring(0, 80)}...</p>
                      <Link to={`/post/${post.id}`} className="read-more-link fw-bold text-uppercase">
                          {labels.readMore} <span className="arrow-icon">{isAr ? '←' : '→'}</span>
                      </Link>
                    </div>
                  </article>
                </div>
              );
            })
          )}
        </div>

        {!isLoading && visibleGridPosts.length < formattedGridPosts.length && (
          <div className="text-center mt-5">
            <button className="pro-btn-red" onClick={() => setVisibleCount(v => v + 6)}>
              {labels.viewMore}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}