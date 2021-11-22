<template>
  <li class="card" :class="{ 'card--dark': productCard.isDarkBackground }">
    <img :src="require(`@/assets/image/products/${productCard.image}`)" alt="product-image">
    <span class="card__title">{{ productCard.name }}</span>
    <span v-if="productCard.isSale" class="card__sale">Sale 10%</span>
    <div class="card__data">
      <span class="card__data__category">
        {{ capitalizeFirstLetter(productCard.rootCategory) }}/{{ capitalizeFirstLetter(productCard.subCategory) }}
      </span>
      <span class="card__data__price">€{{ productCard.price }}</span>
    </div>

    <button v-if="!basketIdArr.includes(productCard.article)"
            @click="addToBasket(productCard)"
            class="card__btn">
      <plusIcon />
    </button>
    <button v-else class="card__btn" style="cursor: not-allowed">
      <inBasketIcon />
    </button>
  </li>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";

export default {
  name: "productCard",
  components: {
    plusIcon: () => import("~/components/svg/plusIcon"),
    inBasketIcon: () => import("~/components/svg/inBasketIcon"),
  },
  props: {
    productCard: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    ...mapGetters([
      'basketGet',
      'basketLengthGet',
    ]),
    //достать артикулы товаров в корзине
    basketIdArr: ({ basketGet }) => basketGet.map(item => item.article),
  },
  methods: {
    ...mapMutations([
      'SET_PRODUCTS_TO_STATE',
      'ADD_PRODUCT_TO_BASKET_STATE'
    ]),
    capitalizeFirstLetter(str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    },
    addToBasket(product) {
      this.ADD_PRODUCT_TO_BASKET_STATE(product)
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  border-radius: 15px;
  overflow: hidden;
  position: relative;

  img {
    width: 100%;
    height: 100%;
  }

  .card__title {
    position: absolute;
    top: 18px;
    left: 18px;
    font-size: 32px;
    line-height: 37px
  }

  .card__sale {
    position: absolute;
    top: 28px;
    right: 18px;
    background: #F55757;
    border-radius: 15px;
    color: white;
    padding: 4px 8px;
    font-weight: 500;
    font-size: 12px;
    line-height: 14px;
  }

  .card__data {
    position: absolute;
    display: flex;
    flex-direction: column;
    bottom: 20px;
    left: 18px;

    .card__data__category {
      font-size: 12px;
      line-height: 14px;
    }

    .card__data__price {
      margin-top: 8px;
      font-size: 32px;
      line-height: 37px;
    }
  }

  .card__btn {
    position: absolute;
    right: 14px;
    bottom: 14px;
  }
}
</style>
`
