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
        console.log(4444,this.value)
        return this.customRender(this.value)
    }
}
