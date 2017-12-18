<template>
  <div>
    <div class="top">
      栏目:
      <Input v-model="name" placeholder="栏目" style="width:200px;"></Input>

      <Select v-model="flag" style="width:200px;" placeholder="根据栏目类型查询" label-in-value filterable clearable>
        <Option v-for="item in flag_type" :value="item.value" :key="item">{{ item.label }}</Option>
      </Select>
      <Select v-model="tag_id" style="width:200px;" placeholder="根据栏目分类查询" label-in-value filterable clearable
              @on-change="changeNavtype">
        <Option v-for="item in navtype" :value="item.id" :key="item">{{ item.text }}</Option>
      </Select>
      <Button type="primary" @click="queryData">查询</Button>
    </div>
    <div class="menutree">
      <Collapse accordion>
        <Panel :name="item.name" v-for="item in data" :key="item.id">
          {{item.name}}
          <Icon v-if="item.child" title="包含子菜单" type="arrow-down-c" style="color: rgba(7,208,211,0.76)"></Icon>

          <div slot="content">
            史蒂夫·乔布斯（Steve Jobs），1955年2月24日生于美国加利福尼亚州旧金山，美国发明家、企业家、美国苹果公司联合创办人。
            <Collapse v-if="item.child" accordion>

              <Panel :name="childitem.name" v-for="childitem in item.child" :key="childitem.id">
                {{childitem.name}}
                <Icon v-if="childitem.child" title="包含子菜单" type="arrow-down-c" style="color: rgba(7,208,211,0.76)"></Icon>

                <div slot="content">
                  {{childitem.name}}
                  iPhone，是美国苹果公司研发的智能手机，它搭载iOS操作系统。第一代iPhone于2007年1月9日由苹果公司前首席执行官史蒂夫·乔布斯发布，并在2007年6月29日正式发售。
                  <Collapse v-if="childitem.child" accordion>
                    <Panel :name="child1item.name" v-for="child1item in childitem.child" :key="child1item.id">
                      {{child1item.name}}
                      <div slot="content">
                        iPhone，是美国苹果公司研发的智能手机，它搭载iOS操作系统。第一代iPhone于2007年1月9日由苹果公司前首席执行官史蒂夫·乔布斯发布，并在2007年6月29日正式发售。
                      </div>
                    </Panel>
                  </Collapse>
                </div>

              </Panel>

            </Collapse>
          </div>

        </Panel>
      </Collapse>
    </div>
  </div>
</template>
<script>
  import http from '../../../assets/js/http.js';

  export default {
    data() {
      return {
        value3: '1-1',
        value4: '1-1',
        navtype: [],
        name: '',
        tag_id: 0,
        data: [],
        flag: [],
        flag_type: [
          {
            value: '1',
            label: '详情型'
          },
          {
            value: '2',
            label: '问答型'
          },
          {
            value: '3',
            label: '文章型'
          },
          // {
          //   value: '4',
          //   label: '文章段落型'
          // },
          {
            value: '5',
            label: '产品型'
          },
        ],
      }
    },
    created() {
      this.getData()
      this.getmenutype()
    },
    methods: {
      changeNavtype(value) {
        this.tag_id = value.value
      },
      getData() {
        let data = {
          params: {
            name: this.name,
            flag: this.flag,
            tag_id: this.tag_id
          }
        }
        this.apiGet('menu', data).then((data) => {
          this.handelResponse(data, (data, msg) => {
            this.data = data
          }, (data, msg) => {
            this.$Message.error(msg);
          })
        }, (data) => {
          this.$Message.error('网络异常，请稍后重试');
        })
      },
      getmenutype() {
        this.apiGet('admin/menutag/list').then((res) => {
          this.handelResponse(res, (data, msg) => {
            this.navtype = data
            console.log(data);
          }, (data, msg) => {
            this.$Message.error(msg);
          })
        }, (res) => {
          //处理错误信息
          this.$Message.error('网络异常，请稍后重试。');
        });
      }, queryData() {
        this.getData()
      }
    },
    mixins: [http]
  }
</script>
<style>
  .menutree {
    margin-top: 10px;
  }
</style>
