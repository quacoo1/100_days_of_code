Vue.component('product',{

    template:
    `
    <div class="product">
            <div class="product-image">
                <img :src="image">
            </div>

            <div class="product-info">
                <h1> {{ title }}</h1>
                <p v-if="inStock" class="stock">in stock</p>
                <p v-else class="stock" >out of stock</p>
                <p> premium: {{ premium }} </p>

                <ul class="colors throw">
                    <li v-for="(variant,index) in variants" @mouseover="updateImage(index)" :key="variant.variantId" :style="{ backgroundColor: variant.variantColor }"> {{ variant.variantColor[0] }} </li>
                </ul>

                <ul>
                    <li v-for="detail in details"> {{ detail }}</li>
                </ul>
                 
                <button :disabled="!inStock" :class="{ disableButton: !inStock } " @click="addToCart()"> add to cart </button>

                <div class="cart">
                    <p> Cart ({{ cart }})</p>
                </div> 
            </div>
        </div>
    `,
    props:{
        premium: {
            type: Boolean,
            required: true,
        }
    }
    ,

    data(){
        return {
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
        }
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


});

const app = new Vue ({
    el: "#app",

    data: {

        premium: false,

    },
})