<template>
<el-form-item label="民族：" class="demo-autocomplete">
    <el-autocomplete class="inline-input" v-model="national" :fetch-suggestions="querySearch"
      placeholder="请输入内容"
      @select="handleSelect"
    ></el-autocomplete>

</el-form-item >
</template>
<script>
  export default {
    data() {
      return {
        restaurants: [],
        national: '',
      };
    },
    methods: {
      querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.indexOf(queryString.toLowerCase()) === 0);
        };
      },
      loadAll() {
        return [
          { "value": "阿昌族", },
          { "value": "傈僳族",  },
          { "value": "水族", },
          { "value": "白族", },
          { "value": "高山族",  },
          { "value": "珞巴族", },
          { "value": "塔吉克族", },
          { "value": "保安族",  },
          { "value": "仡佬族",  },
          { "value": "满族", },
          { "value": "塔塔尔族",  },
          { "value": "布朗族",  },
          { "value": "哈尼族", },
          { "value": "毛南族", },
          { "value": "土家族",  },
          { "value": "布依族",  },
          { "value": "哈萨克族", },
          { "value": "门巴族", },
          { "value": "土族",  },
          { "value": "朝鲜族",  },
          { "value": "汉族", },
          { "value": "蒙古族",  },
          { "value": "佤族", },
          { "value": "达斡尔族",  },
          { "value": "赫哲族", },
          { "value": "苗族", },
          { "value": "维吾尔族", },
          { "value": "傣族", },
          { "value": "回族",  },
          { "value": "仫佬族",  },
          { "value": "乌孜别克族",  },
          { "value": "基诺族",  },
          { "value": "纳西族",  },
          { "value": "锡伯族", },
          { "value": "东乡族",  },
          { "value": "京族",  },
          { "value": "怒族",  },
          { "value": "瑶族",  },
          { "value": "侗族",  },
          { "value": "景颇族", },
          { "value": "普米族",  },
          { "value": "彝族", },
          { "value": "独龙族", },
          { "value": "柯尔克孜族",  },
          { "value": "羌族",  },
          { "value": "裕固族",  },
          { "value": "俄罗斯族", },
          { "value": "撒拉族",  },
          { "value": "藏族",  },
          { "value": "鄂伦春族", },
          { "value": "黎族",  },
          { "value": "畲族", },
          { "value": "壮族",  },
          { "value": "拉祜族", }
        ];
      },
      handleSelect(item) {
        console.log(item);
      }
    },
    mounted() {
      this.restaurants = this.loadAll();
    }
  }
</script>
