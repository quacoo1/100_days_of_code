const app = new Vue ({
    el: "#app",

    data: {
        product: "LightSaber",
        description: "May the force help you slice every Sith Head",
        details:['10GW ion energy cell','4D emitter matrix','f/2 Flux aperture '],
        cart: 0,
        brand: 'Republic',
        index: 0,

        variants: [
            {
                variantId :1123,
                variantColor: 'Blue',
                variantImage: './light_blue.png',
                variantStock: 40,
            },
            {
                variantId: 1124,
                variantColor: 'Red',
                variantImage: './light_red.png',
                variantStock: 0,
            },
        ],

    },

    methods: {

        addToCart(){
            this.cart++;
        },

        updateImage(index){
            this.index = index;
        },

    },

    computed:{

        title(){
            return `${this.brand} ${this.product}`
        },
        image(){
            return this.variants[this.index].variantImage;
        },

        inStock(){
            return this.variants[this.index].variantStock;
        }

    },
})