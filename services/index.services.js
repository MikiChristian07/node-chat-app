/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import Messages from 'models/index.model.js';

class IndexService {
  async create(data) {
    const message = await Messages.create(data);
    return message;
  }

  async fetchAll() {
    const allArticles = await Messages.find().sort({
      createdAt: 'desc'
    });
    return allArticles;
  }
}

export default IndexService;
