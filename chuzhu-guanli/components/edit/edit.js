// import "../../static/edit-font/iconfont"
import util from "../../common/util";
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    editorCtx: null,
    jiacu: false,
    ins: false,
    strike: false,
    italic: false,
    images: [],
    isShow: false
  },
  attached() {
    const that = this;
    var edit = this.createSelectorQuery().select('#editor').context(function (res) {
      that.editorCtx = res.context;
      that.loadData();
    }).exec();
  },
  /**
   * 组件的方法列表
   */
  methods: {
    loadData() {

    },
    generate() {    //生成html样式
    let that = this;
      this.editorCtx.getContents({
        success(res) {
          that.subHtml(res.html);
        }
      });
    },
    changeCss(e) {    //样式按钮功能
      let that =this;
      let obj = e.currentTarget.dataset;
      for(let key  in obj){
        if(obj[key]){
          this.editorCtx.format(key,obj[key]);
        }else {
          this.editorCtx.format(key);
        }
        switch (key) {
          case 'bold' :
          this.setData({
            jiacu: !that.data.jiacu
          });
          break;
          case 'strike' :
          this.setData({
            strike: !that.data.strike
          });
          break;
          case 'ins' :
          this.setData({
            ins: !that.data.ins
          });
          break;
          case 'italic' :
          this.setData({
            italic: !that.data.italic
          });
          break;
        }
      }
    },
    removeFormat(e) {
      this.editorCtx.removeFormat({
        success(res) {
          console.log(res.html)
        }
      });
      this.setData({
        jiacu: false,
        ins: false,
        strike: false,
        italic: false
      })
    },
    chooseImage() {   //插入图片
      let that = this;
      wx.chooseImage({
        sizeType: 'compressed',
        sourceType: 'album',
        success(res) {
          that.editorCtx.insertImage({
            src: res.tempFilePaths[0],
            width: '50%',
            height: '50%'
          })
        }
      })
    },
    subHtml(html) {   //处理并提交图片临时地址
      let newHTML=html.replace(/<img[^>]*>/gi,function (match, capture) {
        let catchSrc = match.match(/src="[^"]+"/gi)[0];
        catchSrc = catchSrc.split("=")[1];
        catchSrc = catchSrc.substring(1,catchSrc.length-1);
        util.uploadFile({
          url: "http://localhost:3030/administrator/image",
          filePath: catchSrc,
          name: 'image',
          success(res){
            console.log(JSON.parse(res.data).path)
          }
        });
        match = match.replace(/src="[^"]+"/gi,"src=\""+"\"");

        console.log(match);
        return match
      });
      console.log(newHTML);
    },
    showUnit() {    //显示/隐藏功能区
      let that = this;
      this.setData({
        isShow: !that.data.isShow
      })
    }
  },
});
