let app = new Vue({
    el:'#app',
    data:{
        load: false,
        number: 1,
        images: [],
    },
    methods: {
        generate(){
            this.load = true;
            axios.get(`https://jsonplaceholder.typicode.com/photos/${this.number}`)
                 .then(
                    (response) => {
                        this.images = response.data;
                        console.log(this.images);
                        this.load = false;
                    });
        }
        
    },

    computed: {
        discription(){
            if (this.images.id) return ` ${this.images.id}: "${this.images.title}" `; else return "";
        }
    },
});