import { PostModel } from '../models'

async function createPost({
  author,
  textContent,
}) {
  return new Promise(async (resolve, reject) => {

    return resolve(
      await PostModel.create({
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

export { createPost };