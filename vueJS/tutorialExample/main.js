const eventBus = new Vue()

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
                    variantStock: 0,
                },
                {
                    variantId: 1124,
                    variantColor: 'Red',
                    variantImage: './light_red.png',
                    variantStock: 12,
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

Vue.component('product-review',{
    template: `
         <form class="review-form" @submit.prevent="onSubmit">
            <p>
                <label for="name">Name:</label>
                <input id="name" v-model="name" placeholder="name">
            </p>
            
            <p>
                <label for="review">Review:</label>      
                <textarea id="review" v-model="review"></textarea>
            </p>
            
            <p>
                <label for="rating">Rating:</label>
                <select id="rating" v-model.number="rating">
                <option>5</option>
                <option>4</option>
                <option>3</option>
                <option>2</option>
                <option>1</option>
                </select>
            </p>
                
            <p>
                <label></label>
                <input type="submit" value="Submit">  
            </p>    
            
            <p class="error" v-if="errors.length">
                Please fill in the whole form
            </p>
        </form>


    `,

    data(){
        
        return {
            name: null,
            review: null,
            rating: null,
            errors: []
        }
    },

    methods:{
        onSubmit() {
            if(this.name && this.review && this.rating) {
                let productReview = {
                  name: this.name,
                  review: this.review,
                  rating: this.rating
                }
                eventBus.$emit('review-submitted', productReview)
                this.name = null;
                this.review = null;
                this.rating = null;
                this.errors = [];
              } else {
                if(!this.name) this.errors.push("Name required.");
                if(!this.review) this.errors.push("Review required.");
                if(!this.rating) this.errors.push("Rating required.");
              }
          }
    }
});

Vue.component('product-tabs',{
    props:{
        reviews:{
            type: Array,
            required: false
        }
    },

    template:  
    ` <div class="tabs">
    
         <div class="review">
            <span class="tab" v-for="(tab,index) in tabs" :key="index" @click="selectedTab = tab" :class=" { activeTab: selectedTab === tab }">{{ tab }} </span>
            <div v-show="selectedTab === tabs[0]">
                <p v-if="!reviews.length" style="margin-top:3em;color:#888">There are no reviews yet.</p>
                
                <div class="reviews" v-for="review in reviews">
                    <div class="review-info">
                        <div class="review-name">{{ review.name }}</div>
                        <div class="review-rating">Rating: {{ review.rating }}</div>
                    </div>
                     <p class="review-review">{{ review.review }}</p>
                </div>
            </div>

             <product-review v-show="selectedTab === tabs[1] "></product-review>
        </div>



    </div>`,
    data(){
        return{
            tabs: ['Reviews','Make a Review'],
            selectedTab: 'Reviews'
            
        }
    }
})

const app = new Vue ({
    el: "#app",

    data: {

        premium: false,
        cart: [],
        reviews: []

    },

    methods:{
        
        updateCart(id){
             this.cart.push(id);
        }
    },

    mounted(){
        eventBus.$on('review-submitted', productReview => {
            this.reviews.push(productReview)
          });
    }
})