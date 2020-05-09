 console.log(axios)
let app = new Vue({
    el:'#app',

    mounted() {
        axios.get('https://jsonplaceholder.typicode.com/todos')
             .then(response => console.log(response));
    },
});