<template>
  <div class="header__basket flex-center">
    <button class="header__basket__btn flex-center" @click="isShowBasket = !isShowBasket">
      <img src="@/assets/image/basket.svg" alt="basket-logo">
    </button>
    <div v-if="basketLengthGet > 0" class="header__basket__marker flex-center">
      <span>{{ basketLengthGet }}</span>
    </div>
    <div v-if="isShowBasket" class="header__basket__inner">
      <p class="header__basket__inner-title">Basket</p>
      <p class="header__basket__inner-desc">Your goods</p>
      <ul class="header__basket__inner-product__list">
        <li v-for="product in basketGet" class="header__basket__inner-product__item">
          <p class="header__basket__inner-product__item-up">{{ product.name }}</p>
          <div class="header__basket__inner-product__item-bottom flex-between">
            <p class="header__basket__inner-product__item-bottom-price">€{{ product.price }}</p>
            <button @click="deleteFromBasket(product)" class="header__basket__inner-product__item-bottom-btn">Delete</button>
          </div>
        </li>
      </ul>
      <div v-if="basketLengthGet > 0" class="header__basket__inner-total flex-between">
        <p class="header__basket__inner-total__number">Total: {{ basketLengthGet }}</p>
        <button @click="clearBasket" class="header__basket__inner-total__btn">Delete</button>
      </div>
      <p v-else style="padding-left: 10px">Корзнина пуста</p>
      <div class="header__basket__inner-footer">
        <p class="header__basket__inner-footer-title">Price:</p>
        <div class="header__basket__inner-footer-title-bottom flex-between">
          <p class="header__basket__inner-footer-title-bottom-price">€{{ basketTotalPriceGet }}</p>
          <button class="header__basket__inner-footer-title-bottom-btn">
            <span>Buy</span>
            <arrowRight />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";

export default {
  name: "basket",
  components: {
    arrowRight: () => import("~/components/svg/arrowRight")
  },
  data() {
    return {
      isShowBasket: false,
    }
  },
  computed: {
    ...mapGetters([
      'basketGet',
      'basketLengthGet',
      'basketTotalPriceGet'
    ]),
  },
  methods: {
    ...mapMutations([
      'DELETE_PRODUCT_FROM_BASKET_STATE',
      'CLEAR_BASKET_STATE',
    ]),
    deleteFromBasket(product) {
      this.DELETE_PRODUCT_FROM_BASKET_STATE(product)
    },
    clearBasket() {
      this.CLEAR_BASKET_STATE()
    }
  }
}
</script>

<style lang="scss" scoped>
.header__basket {
  position: relative;
  z-index: 1;

  .header__basket__marker {
    position: absolute;
    right: 3px;
    top: 6px;
    width: 20px;
    height: 20px;
    background: #F55757;
    border-radius: 50%;
    z-index: 3;

    span {
      color: white;
      font-size: 14px;
      line-height: 16px;
    }
  }

  .header__basket__btn {
    width: 82px;
    height: 82px;
    border: 1px solid #9A9A9A;
    border-radius: 50%;
    cursor: pointer;
    z-index: 2;
  }

  img {
    transform: translateX(-3px);
  }
}

.header__basket__inner {
  position: absolute;
  right: -16px;
  top: -16px;
  width: 267px;
  background-color: white;
  border: 1px solid #9A9A9A;
  border-radius: 20px 50px 20px 20px;
  padding: 20px 10px;
}

.header__basket__inner-title  {
  margin-top: 16px;
  padding-left: 10px;
  font-size: 32px;
  line-height: 37px;
}
.header__basket__inner-desc  {
  padding-left: 10px;
  font-size: 18px;
  line-height: 21px;
  color: #9A9A9A;
  margin-top: 2px;
}

.header__basket__inner-product__list {
  margin-top: 20px !important;
  //background-color: lightcoral;
  z-index: 10000;
}

.header__basket__inner-product__item {
  margin-top: 10px;
  padding: 12px 10px;
  background: #F2F2F2;
  border-radius: 9px;

  .header__basket__inner-product__item-up {
    font-size: 32px;
    line-height: 37px;
    width: 100%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    text-align: left;
  }

  .header__basket__inner-product__item-bottom {
    margin-top: 2px;
  }

  .header__basket__inner-product__item-bottom-price {
    font-size: 18px;
    line-height: 21px;
  }

  .header__basket__inner-product__item-bottom-btn {
    font-size: 18px;
    line-height: 21px;
    color: #757575;
  }
}

.header__basket__inner-footer {
  padding: 12px 10px;

  .header__basket__inner-footer-title {
    font-size: 18px;
    line-height: 21px;
    color: #757575;
  }

  .header__basket__inner-footer-title-bottom-price {
    font-size: 32px;
    line-height: 37px;
  }

  .header__basket__inner-footer-title-bottom-btn {
    font-size: 32px;
    line-height: 37px;
  }
}

.header__basket__inner-total {
  padding: 20px 10px;
  border-bottom: 1px solid #9A9A9A;
}
</style>
