import { CommentModel } from '../schema'

async function createComment({
  post,
  author,
  textContent,
}) {
  return new Promise(async (resolve, reject) => {

    return resolve(
      await CommentModel.create({
        post,
        author,
        textContent,
        creationTimestamp: new Date().getTime(),
        updateTimestamp: new Date().getTime(),
        comments: [],
        likes: [],
      })
    );
  });
};

export { createComment };