const app = new Vue ({
    el: "#app",

    data: {

        image: './light_blue.png',
        product: "LightSaber",
        description: "May the force help you slice every Sith Head",
        inStock: true,
        details:['10GW ion energy cell','4D emitter matrix','f/2 Flux aperture '],
        cart: 0,

        variants: [
            {
                variantId :1123,
                variantColor: 'Blue',
                variantImage: './light_blue.png'
            },
            {
                variantId: 1124,
                variantColor: 'Red',
                variantImage: './light_red.png'

            },
        ],

    },

    methods: {

        addToCart: function(){
            this.cart++;
        },

        updateImage: function(variantImage){
            this.image = variantImage;
        },



    },
})