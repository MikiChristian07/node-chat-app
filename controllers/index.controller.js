/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import IndexService from 'services/index.services.js';

class IndexController {
  async createMsg(req, res) {
    const data = { name: req.body.name, msg: req.body.msg };

    const message = await IndexService.create(data);

    return res.send({
      success: true,
      message: 'message successfully sent!',
      body: data
    });
  }

  async findMsg(){
    const message = await IndexService.fetchAll();
    return res.send({
        success: true,
        message: 'message successfully sent!',
        body: message
      });
  }
}

export default IndexController;
