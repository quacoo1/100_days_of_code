Vue.component('product',{

    template:
    `
    <div class="product">
            <div class="product-image">
                <img :src="image">
            </div>

            <div class="product-info">
                <h1> {{ title }}</h1>
                <div class="product-content">
                    <div v-if="inStock" style="background:#00FFFF;opacity:.5" class="stock">in stock</div>
                    <div v-else style="background:#ffdfbf;opacity:.5" class="stock" >out of stock</div>
                    <p style="font-size:0.8em"> shipping: <b>{{ shipping }}</b> </p>

                    <ul class="colors throw">
                        <li v-for="(variant,index) in variants" @mouseover="updateImage(index)" :key="variant.variantId" style="opacity: .3"> {{ variant.variantColor }} </li>
                    </ul>

                    <ul>
                        <li v-for="detail in details"> {{ detail }}</li>
                    </ul>
                </div>
                 
                <button :disabled="!inStock" :class="{ disableButton: !inStock }"  @click="addToCart()"> add to cart 🛒 </button>
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
            this.$emit('add-to-cart',this.variants[this.index].variantId);
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
        },

        shipping(){
            if (this.premium){
                return 'free'
            }else{
                return '$2.99'
            }
        }

    },


});

const app = new Vue ({
    el: "#app",

    data: {

        premium: false,
        cart: [],

    },

    methods: {
        updateCart(id){
             this.cart.push(id);
        }
    }
})