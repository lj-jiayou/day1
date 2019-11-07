"use strict";

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get("/", controller.home.index);
  router.post("/getAdd", controller.home.add);
  router.post("/getDel", controller.home.del);
  router.post("/getDeit", controller.home.deit);
  router.post("/getFindBanner", controller.home.findbanner);//banner
  router.post("/getFindNav", controller.home.findnav);//nav
  router.post("/getFindFooter", controller.home.findfooter);//footer
  router.get('/getJson', controller.home.findjson)//json
  router.post('/getType', controller.home.findtype)//type
  router.get('/getProductList',controller.home.getProductList)//分页
  // router.get('/search',controller.home.controller.search)//模糊搜索
};
