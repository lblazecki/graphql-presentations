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

const createVideo = ({ title, duration, watched }) => {
  const video = {
    id: new Date().getTime(),
    title,
    duration,
    watched
  };

  videos.push(video);

  return video;
};

module.exports = {
  getVideos,
  getVideoById,
  createVideo
};