<template>
  <a-form-model ref="aForm" :model="value" v-bind="$attrs" :rules="rules">
    <a-row>
      <a-col v-for="item in columns" :key="`${item.name}Col`" :span="item.span || 24">
        <a-form-model-item :key="`${item.name}FormModel`" v-bind="item" :label="item.label" :prop="item.name">
          <div v-if="item.customHeaderRender" slot="label">
            <component :is="getCustomName()" :custom-render="item.customHeaderRender" :value="formData[item.name]" />
          </div>
          <div v-if="item.type === 'custom'">
            <component :is="getCustomName()" :custom-render="item.customRender" :value="formData[item.name]" />
          </div>
          <component
            :is="getComponentName(item.type)"
            v-else
            :value="formData[item.name]"
            v-bind="item.attrs"
            @input="onInput($event,item)"
            @change="onChange($event,item)"
          />
        </a-form-model-item>
      </a-col>
    </a-row>
  </a-form-model>
</template>

<script>
import customRender from './customRender'

export default {
  name: 'HwForm',
  components: { customRender },
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
      formData: {},
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
    value: {
      handler() {
        this.init()
      },
      deep: true
    },
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
    onChange(e, item) {
      this.onFunctionn('onChange', e, item)
    },
    // 解决因component重绘引发的失去焦点问题，需要手动更新获取焦点
    onInput(e, item) {
      this.onFunctionn('onInput', e, item)
    },
    onFunctionn(type = 'onInput', e, item) {
      // console.log('222', e)
      // console.log(typeof e, typeof e.target.value)
      let val = ''
      if (e && ['string', 'number'].includes(typeof e)) {
        val = e
      } else {
        val = e.target.value
      }
      this.formData[item.name] = val
      this.$emit('input', this.formData)
      // console.log("item.name", item.name, val, this.formData)
      if (item.attrs && item.attrs[type]) {
        item.attrs[type](val)
      }
      this.$nextTick(() => {
        this.$refs.aForm.validateField(item.name)
      })
    },
    getCustomName() {
      return 'customRender'
    },
    getComponentName(type) {
      return type ? this.comEnum[type] : ''
    },
    init() {
      // 根据columns生成formData
      // let formData = {}
      for (let i of this.columns) {
        this.value[i.name] !== null || this.value[i.name] !== undefined
          ? this.$set(this.formData, i.name, this.value[i.name])
          : null
        // 如果有service,执行service生成options
        this.setService(i)
      }
      // console.log(formData)
      this.formData = {
        ...this.formData,
        ...this.value
      }
      console.log(111, this.value, this.formData)
    },
    setService(i) {
      if (i.attrs && i.attrs.service) {
        (async () => {
          let options = await i.attrs.service()
          i.attrs.options = options
        })()
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
