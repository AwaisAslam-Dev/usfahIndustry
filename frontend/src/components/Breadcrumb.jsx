import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const Breadcrumb = ({ items }) => {
  // items is an array of objects: [{ name: 'Home', url: '/' }, { name: 'Products', url: '/products' }, { name: 'Mayo Scissors' }]
  const DOMAIN = 'https://usfahindustry.com';

  const schemaItems = items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url ? `${DOMAIN}${item.url}` : undefined
  }));

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": schemaItems
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>

      <nav aria-label="Breadcrumb" className="py-3 px-4 rounded-xl bg-white/5 border border-white/10 mb-6 inline-flex flex-wrap items-center gap-2 text-sm text-gray-400">
        <Link to="/" className="flex items-center gap-1 hover:text-[#D4AF37] transition-colors">
          <Home size={15} />
          <span>Home</span>
        </Link>

        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <React.Fragment key={idx}>
              <ChevronRight size={14} className="text-gray-600" />
              {isLast || !item.url ? (
                <span className="text-[#D4AF37] font-semibold truncate max-w-[200px] sm:max-w-xs">{item.name}</span>
              ) : (
                <Link to={item.url} className="hover:text-[#D4AF37] transition-colors truncate max-w-[150px]">
                  {item.name}
                </Link>
              )}
            </React.Fragment>
          );
        })}
      </nav>
    </>
  );
};

export default Breadcrumb;
