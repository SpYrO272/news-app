import { useParams, Link } from 'react-router-dom';
import { useGetPostQuery, useGetUsersQuery } from '../app/api';
import { useSelector } from 'react-redux';
import type { RootState } from '../app/store';
import { translations } from '../i18n/translations';
import './PostDetails.css';

export default function PostDetails() {
  const { id } = useParams();
  const { data: post, isLoading: postLoading } = useGetPostQuery(Number(id));
  const { data: users, isLoading: usersLoading } = useGetUsersQuery();
  const { lang } = useSelector((state: RootState) => state.language);
  const { theme } = useSelector((state: RootState) => state.theme);
  
  const labels = translations[lang] as any;
  const isAr = lang === 'ar';

  const authorUser = users?.find(u => u.id === post?.userId);
  const authorName = authorUser?.name || labels.loading;

  // Fallback Image Handler
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = "https://placehold.co/1200x600/e0e0e0/666666?text=Image+Unavailable";
  };

  // Skeleton UI while loading
  if (postLoading || usersLoading || !post) {
    return (
      <div className={`post-details-wrapper min-vh-100 ${theme === 'dark' ? 'bg-dark text-light' : 'bg-white text-dark'}`} dir={isAr ? 'rtl' : 'ltr'}>
        <div className="container py-5">
          <div className="row g-5">
            <div className="col-lg-4 order-2 order-lg-1">
              <div className={`skeleton-details-card rounded p-4 ${theme}`}>
                <div className="skeleton-circle mx-auto mb-3"></div>
                <div className="skeleton-line-detail mx-auto w-50 mb-4"></div>
                <div className="skeleton-line-detail w-75 mb-3"></div>
                <div className="skeleton-line-detail w-60 mb-3"></div>
              </div>
            </div>
            <div className="col-lg-8 order-1 order-lg-2">
              <div className="skeleton-line-detail w-25 mb-3"></div>
              <div className="skeleton-line-detail w-100 h-large mb-4"></div>
              <div className="skeleton-rect w-100 mb-4"></div>
              <div className="skeleton-line-detail w-100 mb-2"></div>
              <div className="skeleton-line-detail w-100 mb-2"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`post-details-wrapper min-vh-100 ${theme === 'dark' ? 'bg-dark text-light' : 'bg-white text-dark'}`} 
      dir={isAr ? 'rtl' : 'ltr'}
    >
      <div className="container py-5">
        
        {/* Back Navigation */}
        <nav className="mb-4">
          <Link to="/" className="back-link">
            <span className="arrow">{lang === 'en' ? '←' : '→'}</span> {labels.back}
          </Link>
        </nav>

        <div className="row g-5">
          
          {/* Left side */}
          <div className="col-lg-4 order-2 order-lg-1">
            <aside className="sticky-top" style={{ top: '2rem' }}>
              <section className={`author-sidebar-card p-4 rounded shadow-sm themed-author-card ${theme}`}>
                <div className="text-center mb-4">
                  <div className="author-avatar-large mx-auto mb-3">
                    {authorName[0]}
                  </div>
                  <h4 className="fw-bold mb-1">{authorName}</h4>
                  <p className="text-danger fw-bold small text-uppercase">
                    {authorUser?.company?.name}
                  </p>
                </div>
                
                <hr className={`my-4 ${theme === 'dark' ? 'border-light opacity-25' : ''}`} />
                
                <div className="author-details-list">
                  <div className="detail-item mb-3">
                    <span className="label d-block text-muted text-uppercase fw-bold small">
                      {isAr ? 'البريد الإلكتروني' : 'Email'}
                    </span>
                    <a href={`mailto:${authorUser?.email}`} className="text-decoration-none theme-text-detail">{authorUser?.email}</a>
                  </div>

                  <div className="detail-item mb-3">
                    <span className="label d-block text-muted text-uppercase fw-bold small">
                      {isAr ? 'الهاتف' : 'Phone'}
                    </span>
                    <span className="theme-text-detail">{authorUser?.phone}</span>
                  </div>

                  <div className="detail-item mb-3">
                    <span className="label d-block text-muted text-uppercase fw-bold small">
                      {isAr ? 'الموقع الإلكتروني' : 'Website'}
                    </span>
                    <a href={`https://${authorUser?.website}`} target="_blank" rel="noreferrer" className="text-decoration-none text-danger fw-bold">
                      {authorUser?.website}
                    </a>
                  </div>

                  <div className="detail-item mb-3">
                    <span className="label d-block text-muted text-uppercase fw-bold small">
                      {isAr ? 'العنوان' : 'Address'}
                    </span>
                    <span className="theme-text-detail">
                      {authorUser?.address?.suite}, {authorUser?.address?.street}<br/>
                      {authorUser?.address?.city}, {authorUser?.address?.zipcode}
                    </span>
                  </div>

                  <div className={`detail-item mt-4 p-3 rounded border-start border-danger border-4 shadow-sm mission-box ${theme}`}>
                    <span className="label d-block text-muted text-uppercase fw-bold small">
                      {isAr ? 'مهمة الشركة' : 'Company Mission'}
                    </span>
                    <p className="small fst-italic mb-0 mt-1">"{authorUser?.company?.bs}"</p>
                  </div>
                </div>
              </section>
            </aside>
          </div>

          {/* Right side */}
          <div className="col-lg-8 order-1 order-lg-2">
            <header className="post-header mb-5">
              <div className="cat-badge mb-3">
                {isAr ? 'مقال إخباري' : 'NEWS ARTICLE'}
              </div>
              <h1 className="display-4 fw-bold mb-4">{post.title}</h1>
              
              <div className="post-meta-details d-flex align-items-center small text-muted text-uppercase fw-bold">
                <span className="me-3">{isAr ? '٢٣ ديسمبر ٢٠٢٥' : 'December 23, 2025'}</span>
                <span>•</span>
                <span className="ms-3">{authorName}</span>
              </div>
            </header>

            <div className="post-featured-image mb-5">
              <img
                src={`https://picsum.photos/1200/600?random=${post.id}`}
                alt={post.title}
                className="img-fluid rounded shadow-sm"
                onError={handleImageError}
              />
            </div>

            <article className="post-content fs-5 lh-lg">
              <p className="first-letter">{post.body}</p>
              <p>{post.body}. {post.body}. {post.body}.</p>
              
              <blockquote className="magazine-quote my-5 py-4 px-4">
                "{authorUser?.company?.catchPhrase}"
              </blockquote>
              
              <p>{post.body}</p>
            </article>
          </div>

        </div>
      </div>
    </div>
  );
}