const mentors = [
  {
    id: '12',
    name: 'Tim',
    stars: 5,
    articles: [
      { id: 1, title: 'New' },
      { id: 2, title: 'New 2' }
    ]
  }, {
    id: '13',
    name: 'Luke',
    stars: 4
  }
];

const getMentors = (filters) => {
  let returningMentors = mentors;

  if (filters.stars) {
    returningMentors = returningMentors.filter(m => filters.stars.includes(m.stars));
  }

  if (filters.has_article) {
    returningMentors = returningMentors.filter(m => m.articles && m.articles.length > 0);
  }

  return Promise.resolve(returningMentors);
};

const getMentorById = (id) => {
  const mentor = mentors.find(m => m.id === id);

  return Promise.resolve(mentor);
};

module.exports = {
  getMentors,
  getMentorById
};