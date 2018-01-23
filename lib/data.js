const videos = [
  {
    id: '12',
    title: 'video a',
    duration: 123,
    watched: true
  }, {
    id: '13',
    title: 'video b',
    duration: 333,
    watched: true
  }
];

const getVideos = () => Promise.resolve(videos);

const getVideoById = (id) => {
  const video = videos.find(v => v.id === id);

  return Promise.resolve(video);
};

module.exports = {
  getVideos,
  getVideoById
};