F8.component("counter-app", {
    data: () => {
        return {
            count: 0,
            title: "Counter app"
        }
    },
    template: `
        <h1>{{ title }}</h1>
        <h2>Đã đếm: {{ count }} lần</h2>
        <button v-on:click="count--" class="">-</button>
        <button v-on:click="count++">+</button>
        <button v-on:dblclick="title='App counter'">Change title</button>
    `
})

F8.component("header-component", {
    template: `<h1>HEADER</h1>`
})