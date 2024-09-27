<template>
  <a-form-model ref="aForm" :model="value" v-bind="$attrs" :rules="rules">
    <a-row>
      <a-col v-for="item in columns" :key="`${item.name}Col`" :span="item.span || 24">
        <a-form-model-item :key="`${item.name}FormModel`" :ref="`${item.name}FormModel`" v-bind="item"
                           :label="item.label"
                           :prop="item.name"
        >
          <div v-if="item.type === 'custom'">
            <!--v-once-这部分有问题-->
            <component :is="customRenderFun(item,value[item.name])" v-once :key="`${item.name}Custom`" />
          </div>
          <component
            :is="getComponentName(item.type)"
            v-else
            :key="`${item.name}Type`"
            :ref="`${item.name}Type`"
            v-model="value[item.name]"
            :value="value[item.name]"
            v-bind="item.attrs"
            @input="onInput(item)"
          />
        </a-form-model-item>
      </a-col>
    </a-row>
  </a-form-model>
</template>

<script>
export default {
  name: 'HwForm',
  props: {
    value: {
      type: Object,
      default: () => {
        return {}
      }
    },
    rules: {
      type: Object,
      default: () => {
        return {}
      }
    },
    columns: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      comEnum: {
        input: 'a-input',
        textarea: 'a-textarea',
        inputPassword: 'a-input-password',
        inputNumber: 'a-input-number',
        radio: 'a-radio-group',
        checkbox: 'a-checkbox-group',
        rate: 'a-rate',
        select: 'a-select',
        cascader: 'a-cascader',
        treeSelect: 'a-tree-select',
        slider: 'a-slider',
        switch: 'a-switch',
        timePicker: 'a-time-picker',
        timeRangePicker: 'a-time-range-picker',
        datePicker: 'a-date-picker',
        rangePicker: 'a-range-picker'
      },
      staticNode: {}
    }
  },
  watch: {
    columns: {
      handler() {
        for (let i of this.columns) {
          // 如果有service,执行service生成options
          this.setService(i)
        }
      },
      deep: true
    }
  },
  created() {
    this.init()
  },
  mounted() {
    this.$nextTick(() => {
      this.extendMethod()
    })
  },
  methods: {
    // 解决因component重绘引发的失去焦点问题，需要手动更新获取焦点
    onInput(item) {
      if (item.attrs && item.attrs.onInput) {
        item.attrs.onInput()
      }
      // console.log(this.$refs[item.name])
      this.$nextTick(() => {
        setTimeout(() => {
          let refEl = this.$refs[`${item.name}Type`]
          refEl && refEl.length > 0 && refEl[0].focus ? refEl[0].focus() : ''
        }, 0)
      })
    },
    getComponentName(type) {
      // console.log(789)
      return type ? this.comEnum[type] : ''
    },
    init() {
      // 根据columns生成formData
      let formData = {}
      for (let i of this.columns) {
        formData[i.name] = this.value[i.name] !== null || this.value[i.name] !== undefined
          ? this.value[i.name]
          : null
        // 如果有service,执行service生成options
        this.setService(i)
      }
      // this.value = {
      //   ...this.value,
      //   ...formData
      // }
    },
    setService(i) {
      if (i.attrs && i.attrs.service) {
        (async () => {
          let options = await i.attrs.service()
          i.attrs.options = options
        })()
      }
    },
    customRenderFun(i, val) {
      // console.log('customRenderFun')
      if (i.type === 'custom' && i.customRender) {
        return {
          render() {
            return i.customRender(val)
          }
        }
      } else {
        return {
          render() {
            return null
          }
        }
      }
    },
    // 继承a-form的Method
    extendMethod() {
      const refMethod = Object.entries(this.$refs.aForm)
      for (const [key, value] of refMethod) {
        if (!(key.includes('$') || key.includes('_'))) {
          this[key] = value
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
</style>
