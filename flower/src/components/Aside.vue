<template>
  <!-- 原有模板代码不变 -->
  <el-menu
      style="height: 100%; overflow-x: hidden"
      background-color="rgb(48,65,86)"
      text-color="#fff"
      active-text-color="#ffd04b"
      :collapse-transition="true"
      :collapse="isCollapse"
      router
      @select="handleSelect"
  >
    <div style="height: 60px; line-height: 60px; text-align: center">
      <img
          src="../assets/后台管理-后台管理.png"
          alt=""
          style="width: 20px; position: relative; top: 5px; margin-right: 5px"
      />
      <b style="color: white" v-show="logoTextShow">后台管理系统</b>
    </div>

    <!-- 遍历过滤后的menus -->
    <div v-for="item in filterMenus" :key="item.id">
      <div v-if="item.path">
      </div>
      <div v-else>
        <el-submenu :index="item.id + ''">
          <template slot="title">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.name }}</span>
          </template>
          <div v-for="subItem in item.children" :key="subItem.id">
            <el-menu-item :index="subItem.path">
              <i :class="subItem.icon"></i>
              <span slot="title">{{ subItem.name }}</span>
            </el-menu-item>
          </div>
        </el-submenu>
      </div>
    </div>
  </el-menu>
</template>

<script>
export default {
  name: "Aside",
  props: {
    isCollapse: Boolean,
    logoTextShow: Boolean,
  },
  data() {
    return {
      menus: localStorage.getItem("menus")
          ? JSON.parse(localStorage.getItem("menus"))
          : [],
      opens: localStorage.getItem("menus")
          ? JSON.parse(localStorage.getItem("menus")).map((v) => v.id + "")
          : [],
    };
  },
  // 计算属性：过滤掉指定名称的菜单
  computed: {
    filterMenus() {
      // 1. 定义要删除的菜单名称（精准匹配）
      const deleteMenuNames = [
        '单位管理',
        '入库统计',
        '出库统计',
        '寄养服务管理',
        '菜单管理'
      ];

      // 2. 递归过滤函数（支持多级子菜单）
      const filter = (menuList) => {
        return menuList.filter(menu => {
          // 过滤当前层级要删除的菜单
          if (deleteMenuNames.includes(menu.name)) return false;
          // 递归过滤子菜单（父菜单下的子选项）
          if (menu.children && menu.children.length) {
            menu.children = filter(menu.children);
          }
          return true;
        });
      };

      // 3. 执行过滤并返回结果
      return filter([...this.menus]); // 拷贝原数组，避免修改源数据
    }
  },
  methods: {
    handleSelect() {},
  },
};
</script>

<style>
</style>