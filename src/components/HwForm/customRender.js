export default {
  name: 'customRender',
  props: {
    customRender: {
      type: Function,
      default: () => {
        return null
      }
    }
  },
  render() {
    console.log(4444)
    return this.props.customRender()
  }
}
