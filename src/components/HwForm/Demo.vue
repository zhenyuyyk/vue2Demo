<template>
  <hw-form v-model="formData" v-bind="formBind" :rules="formRules" :columns="columns" />
</template>

<script>
import HwForm from '@/components/HwForm/Index.vue'

export default {
  name: 'HwFormDemo',
  components: { HwForm },
  data() {
    return {
      formBind: {
        labelCol: {
          span: 6
        },
        wrapperCol: {
          span: 16
        }
      },
      formData: {
        name: '',
        age: undefined,
        ziding: 'AAA'
      },
      formRules: {
        name: [
          { required: true, message: 'Please input Activity name', trigger: 'blur' }
        ]
      },
      columns: [
        {
          type: 'custom',
          label: '自定义',
          name: 'zidingyi',
          customRender: (val) => {
            console.log('customRender', val)
            let value = ''
            let onInput = (val) => {
              console.log('onInput')
              value = val
            }
            return (
              <div>
                <p>自定义组件123</p>
                <p>自定义组件123</p>
                <p>自定义组件123</p>
                <h-input
                  defaultValue={value}
                  placeholder="自定义组件中的输入框"
                  onInput={onInput}
                />
              </div>
            )
          }
        },
        {
          type: 'input',
          label: '输入框',
          name: 'inputValue',
          attrs: {
            placeholder: '自定义placeholder',
            showCount: true
          }
        },
        {
          type: 'textarea',
          label: 'textarea输入框',
          name: 'textareaValue',
          attrs: {
            placeholder: '自定义placeholder',
            onPressEnter: () => {
              console.log('回车事件')
            }
          }
        },
        {
          type: 'inputPassword',
          label: '密码输入框',
          name: 'inputPasswordValue',
          attrs: {}
        },
        {
          type: 'radio',
          label: '单选框组',
          name: 'radioValue',
          attrs: {
            options: [
              { label: 'AppleLABEL', value: 'Apple' },
              { label: 'PearLABE', value: 'Pear' },
              { label: 'OrangeLABE', value: 'Orange', disabled: true }
            ]
          }
        },
        {
          type: 'checkbox',
          label: '多选框',
          name: 'checkboxValue',
          attrs: {
            options: [
              { label: 'AppleLABEL', value: 'Apple' },
              { label: 'PearLABE', value: 'Pear' },
              { label: 'OrangeLABE', value: 'Orange', disabled: true }
            ]
          }
        },
        {
          type: 'rate',
          label: '评分',
          name: 'rateValue',
          attrs: {
            allowHalf: true
          }
        },
        {
          type: 'select',
          label: '选择器',
          name: 'selectValue',
          attrs: {
            // options: optionsRef.value,
            service: () => {
              let serviceOptions = () => {
                return new Promise((resolve, reject) => {
                  setTimeout(() => {
                    resolve([
                      {
                        value: 'Apple',
                        label: 'Apple'
                      },
                      {
                        value: 'Pear',
                        label: 'Pear'
                      },
                      {
                        value: 'Orange',
                        label: 'Orange'
                      }
                    ])
                  }, 2000)
                })
              }
              // 如果有service,优先使用service,忽略options
              return serviceOptions({})
            }
          }
        },
        {
          type: 'cascader',
          label: '级联选泽',
          name: 'cascaderValue',
          attrs: {
            options: [
              {
                value: 'zhejiang',
                label: 'Zhejiang',
                children: [
                  {
                    value: 'hangzhou',
                    label: 'Hangzhou',
                    children: [
                      {
                        value: 'xihu',
                        label: 'West Lake'
                      }
                    ]
                  }
                ]
              },
              {
                value: 'jiangsu',
                label: 'Jiangsu',
                children: [
                  {
                    value: 'nanjing',
                    label: 'Nanjing',
                    children: [
                      {
                        value: 'zhonghuamen',
                        label: 'Zhong Hua Men'
                      }
                    ]
                  }
                ]
              }
            ]
          }
        },
        {
          type: 'treeSelect',
          label: '树选择',
          name: 'treeSelectValue',
          attrs: {
            treeData: [
              {
                title: 'parent 1',
                value: 'parent 1',
                children: [
                  {
                    title: 'parent 1-0',
                    value: 'parent 1-0',
                    children: [
                      {
                        title: 'my leaf',
                        value: 'leaf1'
                      },
                      {
                        title: 'your leaf',
                        value: 'leaf2'
                      }
                    ]
                  },
                  {
                    title: 'parent 1-1',
                    value: 'parent 1-1'
                  }
                ]
              }
            ]
          }
        },
        {
          type: 'slider',
          label: '滑块',
          name: 'sliderValue',
          attrs: {}
        },
        {
          type: 'switch',
          label: '开关',
          name: 'switchValue',
          attrs: {}
        },
        {
          type: 'timePicker',
          label: '时间选择',
          name: 'timePickerValue',
          attrs: {}
        },
        {
          type: 'timeRangePicker',
          label: '时间范围选择',
          name: 'timeRangePickerValue',
          attrs: {}
        },
        {
          type: 'datePicker',
          label: '日期选择',
          name: 'datePickerValue',
          attrs: {}
        },
        {
          type: 'rangePicker',
          label: '日期范围选择',
          name: 'rangePickerValue',
          attrs: {}
        }
      ]
    }
  }
}
</script>

<style scoped lang="less">

</style>
