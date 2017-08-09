/**
 * Created by timeless on 17-4-7.
 * @author 赵兴壮<834916321@qq.com>
 * 公共操作 获取基本操作的
 */

const commonMethods = {
  methods: {
    //获取文章分类的 id => name 属性
    getArticleType(func) {
      this.apiGet('articletype/gettype').then((res) => {
        this.handelResponse(res, (data, msg) => {
          func(data);
        }, (data, msg) => {
          this.$Message.error(msg);
        })
      }, (res) => {
        //处理错误信息
        this.$Message.error('网络异常，请稍后重试。');
      });
    },
    //获取文章分类的 id => name 属性
    getScaType(func) {
      this.apiGet('sca/getType').then((res) => {
        this.handelResponse(res, (data, msg) => {
          func(data);
        }, (data, msg) => {
          this.$Message.error(msg);
        })
      }, (res) => {
        //处理错误信息
        this.$Message.error('网络异常，请稍后重试。');
      });
    },
    getQuestionType(func) {
      this.apiGet('questionType/list').then((res) => {
        this.handelResponse(res, (data, msg) => {
          func(data)
        }, (data, msg) => {
          this.$Message.error(msg);
        })
      }, (res) => {
        //处理错误信息
        this.$Message.error('网络异常，请稍后重试。');
      });
    },
  }
}
export default commonMethods
