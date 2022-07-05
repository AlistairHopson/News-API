const format = require("pg-format");
const db = require("../db/connection");

exports.selectTopics = () => {
  return db.query("SELECT * FROM topics;").then(({ rows }) => {
    return rows;
  });
};

exports.selectArticleByID = (article_id) => {
  return db
    .query("SELECT * FROM articles WHERE article_id = $1", [article_id])
    .then(({ rows, rowCount }) => {
      if (rowCount === 0) {
        return Promise.reject({
          status: 400,
          message: `${article_id} is not a valid article ID.`,
        });
      }
      return rows[0];
    });
};

exports.updateArticleVotes = (article_id, inc_votes) => {
  return db
    .query(
      "UPDATE articles SET votes = votes + $2 WHERE article_id = $1 RETURNING *",
      [article_id, inc_votes]
    )
    .then(({ rows, rowCount }) => {
      if (rowCount === 0) {
        return Promise.reject({
          status: 400,
          message: `${article_id} is not a valid article ID.`,
        });
      }
      return rows[0];
    });
};
