const Article = require("../models/Article.model");
const createError = require("../middlewares/error");

exports.createArticle = async (req, res, next) => {
  try {
    const newArticle = await Article.create(req.body);
    res.status(201).json({
      message: "Article created successfully",
      article: newArticle,
    });
  } catch (error) {
    next(createError(500, `Internal Server Error ${error.message}`));
  }
};

exports.getAllArticles = async (req, res, next) => {
  try {
    const arcticles = await Article.findAll();
    res.status(200).json({
      message: "Articles found",
      articles: arcticles,
    });
  } catch (error) {
    console.error("Error in createArticle:", error);
    next(createError(500, `Internal Server Error ${error.message}`));
  }
};

exports.getArticle = async (req, res, next) => {
  try {
    const article = await Article.findByPk(req.params.id);
    if (!article) {
      return next(createError(404, "Article not found"));
    }
    res.status(200).json({
      message: "Article found",
      article: article,
    });
  } catch (error) {
    next(createError(500, `Internal Server Error ${error.message}`));
  }
};

exports.updateArticle = async (req, res, next) => {
  try {
    // update article
    const [updateRows] = await Article.update(req.body, {
      where: { id: req.params.id },
    });

    // check if article exists
    if (updateRows === 0) {
      return next(createError(404, "Article not found"));
    }

    // get updated article
    const updatedArticle = await Article.findOne({
      where: { id: req.params.id },
    });
    res.status(200).json({
      message: "Article updated successfully",
      article: updatedArticle,
    });
  } catch (error) {
    next(createError(500, `Internal Server Error ${error.message}`));
  }
};

exports.deleteArticle = async (req, res, next) => {
  try {
    // delete article
    const deleteRows = await Article.destroy({
      where: { id: req.params.id },
    });

    // check if article exists
    if (deleteRows === 0) {
      return next(createError(404, "Article not found"));
    }

    // send response
    res.status(200).json({
      message: "Article deleted successfully",
      articleId: req.params.id,
    });
  } catch (error) {
    next(createError(500, `Internal Server Error ${error.message}`));
  }
};
