import Comment from "../models/comment.js";

export const postComment = async (req, res, next) => {
    
  const comment = new Comment({
    ...req.body,
    image: `http://localhost:3001/images/${req.file.filename}`,
  });

  await comment.save();

  res.send({ success: true, data: comment });
};
