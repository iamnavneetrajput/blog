import React from 'react';

const articles = [
  {
    id: 1,
    title: 'Articles Title 1',
    date: 'Date 4/2/2044',
    description: 'Articles Description and use white space on second line',
    image: 'https://via.placeholder.com/150',
    alt: 'Dog Image',
  },
  {
    id: 2,
    title: 'Articles Title 2',
    date: 'Date 4/2/2044',
    description: 'Articles Description and use white space on second line',
    image: 'https://via.placeholder.com/150',
    alt: 'Wolf Image',
  },
  {
    id: 3,
    title: 'Articles Title 3',
    date: 'Date 4/2/2044',
    description: 'Articles Description and use white space on second line',
    image: 'https://via.placeholder.com/150',
    alt: 'Cat Image',
  },
];

const RecentArticles = () => {
  return (
    <div className="recent-articles">
      <h2>Recent Articles</h2>
      {articles.map((article) => (
        <div key={article.id} className="article">
          <div className="image">
            <img src={article.image} alt={article.alt} />
          </div>
          <div className="content">
            <div className="article-header">
              <h3>{article.title}</h3>
              <small className="date">{article.date}</small>
            </div>
            <p className="description">{article.description}</p>
            <a href="#" className="read-more">Read more</a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentArticles;
