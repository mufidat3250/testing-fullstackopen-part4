const dummy = (blogs) => {
  if (blogs.length >= 0) return 1;
};

const totalLikes = (blogList) => {
  return blogList.reduce((acc, cur) => acc + cur.likes, 0);
};
module.exports = { dummy, totalLikes };
