<template>
  <div class="home">
    <div class="header-1">
      <h2>校园超市</h2>
    </div>
    <div class="conter">
      <div class="header-2">
        <div class="header-2-left">
          <i class="iconfont icon-dizhi-01"></i>
          <input type="text" placeholder="送至：北京八维研修学院>" />
        </div>
        <div class="header-2-right">
          <input type="text" />
          <i class="iconfont icon-fangdajing"></i>
        </div>
      </div>
      <div class="banner">
        <div class="block">
          <el-carousel trigger="click" height="200px">
            <el-carousel-item v-for="(item,index) in list" :key="index">
              <div class="small">
                <img :src="item.picurl" alt />
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
      <div class="nav">
        <dl v-for="(item,index) in navs" :key="index">
          <dt>
            <img :src="item.picurl" alt />
          </dt>
          <dd>
            <span>{{item.name}}</span>
          </dd>
        </dl>
      </div>
      <div class="nav-img">
        <img src="dzm.png" alt />
      </div>
      <div class="banner-img">
        <img src="1.png" alt />
        <img src="2.png" alt />
        <img src="3.png" alt />
      </div>
      
      <div class="main">
        <div class="main-top">
          <li
            v-for="(item,index) in types"
            :key="index"
            :class="ind==index ?'active':''"
            @click="gotoclick(item.typeid,index)"
          >{{item.types}}</li>
        </div>
        <!-- 添加 -->
        <el-button type="text" @click="dialogFormVisible = true" class="tj">添加商品</el-button>
        <el-dialog title="超市" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form-item label="商品名称" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="价格" :label-width="formLabelWidth">
              <el-input v-model="form.price" autocomplete="off"></el-input>
            </el-form-item>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt />
            </el-dialog>

            <el-form-item label="请选择" :label-width="formLabelWidth">
              <el-select v-model="form.region" @change="changList" placeholder="请选择添加商品">
                <el-option label="衣服" value="1"></el-option>
                <el-option label="水果" value="2"></el-option>
                <el-option label="化妆品" value="3"></el-option>
                <el-option label="零食" value="4"></el-option>
              </el-select>
            </el-form-item>

            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="clickyes">确 定</el-button>
          </div>
        </el-dialog>
        <!-- 添加 -->

        <div class="main-bottom">
          <dl v-for="(item,index) in jsons" :key="index">
            <dt>
              <img :src="item.imgurl" alt />
            </dt>
            <div class="dd">
              <dd>{{item.name}}</dd>
              <dd class="price">￥{{item.price}}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>

    <div class="footer">
      <div class="footer-top">
        <i class="iconfont icon-shouye"></i>
        <i class="iconfont icon-fenlei-xuanzhong"></i>
        <i class="iconfont icon-gouwuche-xuanzhong"></i>
        <i class="iconfont icon-wode"></i>
      </div>
      <div class="footer-bottom">
        <span
          v-for="(item,index) in footers"
          :key="index"
          @click="gotobottom(index)"
          :class="inds==index ? 'hover' : ''"
        >{{item.name}}</span>
      </div>
    </div>
    <div class="page">
      <button @click="clickPages()">上一页</button>

      <p v-for="(item,index) in page" :key="index">{{item.name}}</p>
      <button @click="clickPage()">下一页</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      list: [],
      navs: [],
      footers: [],
      jsons: [],
      types: [],
      ind: 0,
      inds: 0,
      edits: 0,
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        // 添加的参数
        name: "",
        desc: "",
        price: ""
      },
      formLabelWidth: "120px",
      price: 0,
      statu: 0,
      dialogImageUrl: "", // 上传图片
      dialogVisible: false,
      tableData: [
        {
          name: "衣服"
          // address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          name: "水果"
          // address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          name: "化妆品"
          // address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          name: "零食"
          // address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      page:[]
    };
  },
  name: "home",
  components: {},
  methods: {
    gotoclick(index, ind) {
      // tab切换
      this.ind = ind;
      axios
        .get(`/api/getJson?statu=${index}`)
        .then(res => {
          // console.log(res, "json");
          this.jsons = res.data.result || [];
        })
        .catch(err => {
          console.log(err);
        });
    },
    gotobottom(inds) {
      // 底部tab
      this.inds = inds;
    },
    changList() {
      // console.log(this.form.region);
      this.statu = this.form.region;
    },
    // 确定按钮添加
    clickyes() {
      let data = {
        name: this.form.name,
        price: this.form.price,
        statu: this.statu
        // imgurl:this.from.imgurl
      };
      this.dialogFormVisible = false;
      // getAdd
      axios
        .post(`/api/getAdd`, { data })
        .then(res => {
          // console.log(res,'李江');
          this.list = res.data.result || [];
        })
        .catch(err => {
          console.log(err);
        });
    },

    // 图片上传
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    //表格
    handleEdit(index, row) {
      // console.log(row,'row');
      //编辑接口
      let data = {
        name: this.form.name,
        price: this.form.price,
        statu: this.statu,
        id: this.form.id
        // imgurl:this.from.imgurl
      };
      console.log(data, "data");
      // getDeit
      axios
        .post(`/api/getDeit`, { data })
        .then(res => {
          console.log(res, "res");
          this.edits = res.data.result || [];
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleDelete(index, row) {
      // console.log(index, row);
    },
    clickPage(){
      axios.get(`/api/getProductList?pageSize=2&pageCount=2`).then(res=>{
        console.log(res.data.result)
        this.page=res.data.result
      })
    },
     clickPages(){
      axios.get(`/api/getProductList?pageSize=0&pageCount=2`).then(res=>{
        console.log(res.data.result)
        this.page=res.data.result
      })
    }
  },
  created() {
    // getFindBanner
    axios
      .post("/api/getFindBanner")
      .then(res => {
        // console.log(res,'banner');
        // console.log(res, "res");
        this.list = res.data.result || [];
      })
      .catch(err => {
        console.log(err);
      });
    // getFindNav
    axios
      .post("/api/getFindNav")
      .then(res => {
        // console.log(res,'nav')
        this.navs = res.data.result || [];
      })
      .catch(err => {
        console.log(err);
      });
    // FindFooter
    axios
      .post("/api/getFindFooter")
      .then(res => {
        // console.log(res,'footer')
        this.footers = res.data.result || [];
      })
      .catch(err => {
        console.log(err);
      });

    // Json
    axios
      .get("/api/getJson?statu=1")
      .then(res => {
        // console.log(res, "json");
        this.jsons = res.data.result || [];
      })
      .catch(err => {
        console.log(err);
      });
    // getTypess
    axios
      .post("/api/getType")
      .then(res => {
        // console.log(res, "types");
        this.types = res.data.result || [];
      })
      .catch(err => {
        console.log(err);
      });
      axios.get('/api/getProductList').then(res=>{
        console.log(res.data.result)
        this.page=res.data.result
      })
  }
};
</script>
<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .conter {
    flex: 1;
    overflow-y: scroll;
  }
  .header-1 {
    width: 100%;
    height: 50px;
    text-align: center;
    line-height: 50px;
  }
  .header-2 {
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .header-2-left {
      flex: 9;
      padding-left: 25px;
      i {
        padding: 10px;
      }
      input {
        width: 150px;
        height: 45px;
        border: 0;
      }
    }
    .header-2-right {
      flex: 1;
      right: 20px;
      position: relative;
      input {
        width: 120px;
        height: 45px;
        border: 0;
      }
      i {
        position: absolute;
        top: 15px;
        right: 10px;
      }
    }
  }
  .banner {
    width: 100%;
    height: 200px;
    text-align: center;
    img {
      width: 100%;
      height: 200px;
    }
  }
  .nav {
    width: 100%;
    height: 180px;
    display: flex;
    flex-wrap: wrap;
    dl {
      width: 20%;
      height: 50%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      dt {
        img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }
      }
      dd {
        font-size: 13px;
      }
    }
  }
  .nav-img {
    width: 100%;
    height: 50px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .banner-img {
    width: 100%;
    height: 100px;
    display: flex;
    img {
      width: 33.3%;
      height: 100%;
    }
  }
  .main {
    width: 100%;
    height: auto;
    .main-top {
      width: 100%;
      height: 60px;
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
    .main-bottom {
      width: 100%;
      height: auto;
      dl {
        width: 100%;
        height: 130px;
        border-bottom: 0.5px solid #ccc;
        display: flex;
        justify-content: space-around;
        align-items: center;
        dt {
          flex: 4;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: space-around;
          align-items: center;
          img {
            width: 90%;
            height: 90%;
          }
        }
        .dd {
          flex: 6;
          text-align: center;
          .price {
            color: red;
            font-weight: bold;
          }
          dd {
            margin-top: 10px;
          }
        }
      }
    }
  }
  .footer {
    width: 100%;
    height: 50px;
    display: flex;
    flex-direction: column;
    border-top: 0.5px solid #f3f3f3;
    .footer-top {
      display: flex;
      height: 50%;
      width: 100%;
      justify-content: space-around;
      align-items: center;
    }
    .footer-bottom {
      display: flex;
      height: 50%;
      width: 100%;
      padding-left: 5px;
      justify-content: space-around;
    }
  }
}
.active {
  color: #f90;
}
.hover {
  color: skyblue;
}
.el-button--text {
  width: 100%;
  height: 45px;
  text-align: center;
}
.tj {
  width: 100%;
  background: skyblue;
  color: #fff;
}
</style>
