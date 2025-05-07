const { Notice } = require("../models");
const createError = require("../middlewares/error");

exports.postNotice = async (req, res, next) => {
  try {
    const notice = await Notice.create(req.body);
    res.status(201).json({
      message: "Notice created successfully",
      notice: notice,
    });
  } catch (error) {
    next(createError(500, `Internal Server Error ${error.message}`));
  }
};

exports.deleteNotice = async (req, res, next) => {
  try {
    //find the notice by id
    const notice = await Notice.findByPk(req.params.noticeId);

    // if notice not found, return 404 error
    if (!notice) return next(createError(404, "Notice not found"));

    // check if user is the owner of the notice
    if (notice.userId !== req.user.id)
      return next(
        createError(403, "You are not authorized to delete this notice")
      );

    await notice.destroy(); // delete the notice
    res.status(200).json({
      message: "Notice deleted successfully",
    });
  } catch (error) {
    next(createError(500, `Internal Server Error ${error.message}`));
  }
};
