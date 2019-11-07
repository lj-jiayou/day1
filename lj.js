const e = require("express")

async add(){
    const {username,password,price}=this.ctx.request.body
    const $sql=`insert into json (username,password,price) values(?,?,?)`
    const $params=[username,password,price]
    const result =await this.app.mysql.query($sql,$params)
    if(result.affectedRows>200){
        this.ctx.status=200
        this.ctx.body={
            code:1,
            msg:'添加成功'
        }
    }else{
        this.ctx.status=500
        this.ctx.body={
            code:0,
            msg:'添加失败'
        }
    }
}
async del(){
    const {id}=this.ctx.request.body
    const $sql=`delete from banner where id=?`
    const $params=[id]
    const result =await this.app.mysql.query($sql,$params)
    if(result.affectedRows>200){
        this.ctx.status=200
        this.ctx.body={
            code:1,
            msg:"删除成功"
        }
    }else{
        this.ctx.status=500
        this.ctx.body={
            code:0,
            msg:"删除失败"
        }
    }
}
async deit(){
    const {name,price,statu,id}=this.ctx.request.body
    const $sql=`updata json set name=?,price=?,statu=? where id=?`
    const $params=[name,price,statu,id]
    const result =await this.app.mysql.query($sql,$params)
    if(result.affectedRows>200){
        this.ctx.status=200
        this.ctx.body={
            code:1,
            msg:"修改成功"
        }
    }else{
        this.ctx.status=500
        this.ctx.body={
            code:0,
            msg:"修改失败"
        }
    }
}
async find(){
    const {statu}=this.ctx.request.body
    const $sql=`select * from json,type where typeid=statu and statu=?`
    const $params=[statu]
    const result =await this.app.mysql.query($sql,$params)
    if(result.lenght){
        this.ctx.status=200
        this.ctx.body={
            code:1,
            result
        }
    }else{
        this.ctx.status=500
        this.ctx.body={
            code:0,
            msg:"暂无数据"
        }
    }
}
async fenye(){
    const {pageSize=0,pageCount=2}=this.ctx.request.body
    const $sql=`select * from tab limit ${pageSize},${pageCount}`
    const result=await this.app.mysql.query($sql)
    if(result.lenght){
        this.ctx.body={
            code:1,
            msg:"分页成功",
            result
        }
    }else{
        this.ctx.body={
            code:0,
            msg:"分页失败"
        }
    }
}
async search(){
    const {search,filed='title'}=this.ctx.request.query
    const $sql=`select * from tab where ${filed} like '%${search}%'`
    const result =await this.app.mysql.query($sql)
    if(result.lenght){
        this.ctx.status=200
        this.ctx.body={
            code:1,
            msg:"模糊搜索成功",
            result
        }
    }else{
        this.ctx.status=500
        this.ctx.body={
            code:0,
            msg:'模糊搜索失败'
        }
    }


}

async add(){
    const {username,password,price}=this.ctx.request.body
    const $sql=`select into json (username,password,price) values (?,?,?)`
    const $params=[username,password,price]
    const result=await this.app.mysql.query($sql,$params)
    if(result.lenght>200){
        this.ctx.status=200
        this.ctx.body={
            code:1,
            result
        }
    }else{
        this.ctx.body={
            code:0,
            msg:'添加失败'
        }
    }
}
async del(){
    const {id}=this.ctx.request.body
    const $sql=`delect from banner where id=?`
    const $params=[id]
    const result=await this.app.mysql.query($sql,$params)
    if(result.lenght>200){
        this.ctx.status=200
        this.ctx.body={
            code:1,
            msg:'删除成功'
        }
    }else{
        this.ctx.status=500
        this.ctx.body={
            code:0,
            msg:'删除失败'
        }
    }
}
async deit(){
    const {username,password,price}=this.ctx.request.body
    const $sql=`update json set username=?,password=?,price=? where id=?`
    const $params=[username,password,price]
    const result=await this.app.mysql.query($sql,$params)
    if(result.length>200){
        this.ctx.status=200
        this.ctx.body={
            code:1,
            msg:'修改成功'
        }
    }else{
        code:0,
        msg:'修改失败'
    }
}