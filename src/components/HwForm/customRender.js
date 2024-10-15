export default {
    name: 'customRender',
    props: {
        customRender: {
            type: Function,
            default: () => {
                return null
            }
        },
        value: {
            default: ""
        },
    },
    render() {
        return this.customRender(this.value)
    }
}
