const requestUrl = "http://localhost:3030/goods";

// 数据对象 null => ''
const null2str = function(res) {
  for (let x in res) {
    if (res[x] === null) { // 如果是null 把直接内容转为 ''
      res[x] = ''
    } else {
      if (Array.isArray(res[x])) { // 是数组遍历数组 递归继续处理
        res[x] = res[x].map(z => {
          return this.null2str(z)
        })
      }
      if (typeof(res[x]) === 'object') { // 是json 递归继续处理
        res[x] = this.null2str(res[x])
      }
    }
  }
  return res
};

/**
 * 处理富文本里的图片宽度自适应
 * 1.去掉img标签里的style、width、height属性
 * 2.img标签添加style属性：max-width:100%;height:auto
 * 3.修改所有style里的width属性为max-width:100%
 * 4.去掉<br/>标签
 * @param html
 * @returns {void|string|*}
 */
function formatRichText(html){
  let newContent= html.replace(/<img[^>]*>/gi,function(match,capture){
    match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '');
    match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '');
    match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '');
    return match;
  });
  newContent = newContent.replace(/style="[^"]+"/gi,function(match,capture){
    match = match.replace(/width:[^;]+;/gi, 'max-width:100%;').replace(/width:[^;]+;/gi, 'max-width:100%;');
    return match;
  });
  newContent = newContent.replace(/<br[^>]*\/>/gi, '');
  newContent = newContent.replace(/\<img/gi, '<img style="max-width:100%;height:auto;display:block;margin-top:0;margin-bottom:0;"');
  return newContent;
}
export default {
  requestUrl,
  null2str,
  formatRichText
}

