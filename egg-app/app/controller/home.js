"use strict";

const Controller = require("egg").Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = "hi, egg";
  }
  async add() {
    // 增
    const { statu,name,price } = this.ctx.request.body.data;
    const $sql = `insert into json ( statu,name,price ) values (?,?,?)`;
    const $params = [ statu,name,price];
    const result = await this.app.mysql.query($sql, $params);
    if (result.affectedRows > 0) {
      this.ctx.status = 200;
      this.ctx.body = {
        code: 1,
        msg: "添加成功"
      };
    } else {
      this.ctx.status = 500;
      this.ctx.body = {
        code: 0,
        msg: "添加失败"
      };
    }
  }
  async del() {
    // 删
    const { id } = this.ctx.request.body;
    const $sql = `delete from banner where id=?`;
    const $params = [id];
    const result = await this.app.mysql.query($sql, $params);
    if (result.affectedRows > 0) {
      this.ctx.status = 200;
      this.ctx.body = {
        code: 1,
        msg: "删除成功"
      };
    } else {
      this.ctx.status = 500;
      this.ctx.body = {
        code: 0,
        msg: "删除失败"
      };
    }
  }
  async deit() {
    // 改
    const { name, price,statu, id } = this.ctx.request.body;
    const $sql = `update json set name=?,price=?,statu=? where id=?`;
    const $params = [name, price,statu, id];
    const result = await this.app.mysql.query($sql, $params);
    if (result.affectedRows > 0) {
      console.log(result.affectedRows)
      this.ctx.status = 200;
      this.ctx.body = {
        code: 1,
        msg: "修改成功"
      };
    } else {
      this.ctx.status = 500;
      this.ctx.body = {
        code: 0,
        msg: "修改失败"
      };
    }
  }
  async findbanner() {
    // 查banner
    const result = await this.app.mysql.query("select * from banner");
    if (result.length) {
      this.ctx.status = 200;
      this.ctx.body = {
        code: 1,
        result
      };
    } else {
      this.ctx.status = 500;
      this.ctx.body = {
        code: 0,
        msg: "暂无数据"
      };
    }
  }
  async findnav() {
    // 查nav
    const result = await this.app.mysql.query("select * from nav");
    if (result.length) {
      this.ctx.status = 200;
      this.ctx.body = {
        code: 1,
        result
      };
    } else {
      this.ctx.status = 500;
      this.ctx.body = {
        code: 0,
        msg: "暂无数据"
      };
    }
  }
  async findfooter() {
    // 查footer
    const result = await this.app.mysql.query("select * from footer");
    if (result.length) {
      this.ctx.status = 200;
      this.ctx.body = {
        code: 1,
        result
      };
    } else {
      this.ctx.status = 500;
      this.ctx.body = {
        code: 0,
        msg: "暂无数据"
      };
    }
  }

  async findjson() {
    // 查json
    const { statu } = this.ctx.request.query;
    const $sql = `select * from json,type where typeid=statu and statu=?`;
    const $params = [statu];
    const result = await this.app.mysql.query($sql, $params);
    // console.log(statu, result);
    if (result.length) {
      this.ctx.status = 200;
      this.ctx.body = {
        code: 1,
        result
      };
    } else {
      this.ctx.status = 500;
      this.ctx.body = {
        code: 0,
        msg: "暂无数据"
      };
    }
  }
  async findtype() {
    // 查type
    const result = await this.app.mysql.query("select * from type");
    if (result.length) {
      this.ctx.status = 200;
      this.ctx.body = {
        code: 1,
        result
      };
    } else {
      this.ctx.status = 500;
      this.ctx.body = {
        code: 0,
        msg: "暂无数据"
      };
    }
  }
  async getProductList() {
    const { pageSize = 0, pageCount = 2 } = this.ctx.request.query;
    const $sql = `select * from tab limit ${pageSize},${pageCount}`;
    const result = await this.app.mysql.query($sql);
    if (result.length) {
      this.ctx.body = {
        code: 1,
        msg: '分页成功',
        result
      };
    } else {
      this.ctx.body = {
        code: 0,
        msg: '分页失败'
      };
    }
  }
  async search() {
    const { search, filed = 'title' } = this.ctx.request.query;
    const $sql = `select * from tab where ${filed} like '%${search}%'`;
    const result = await this.app.mysql.query($sql);
    if (result) {
      this.ctx.body = {
        code: 1,
        msg: '模糊搜索成功',
        result
      };
    } else {
      this.ctx.body = {
        code: 0,
        msg: '模糊搜索失败'
      };
    }
  }
}

module.exports = HomeController;
