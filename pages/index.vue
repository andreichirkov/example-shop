<template>
  <div class="container">
    <section class="main">
      <header class="header">
        <div class="header__logo"><img src="@/assets/image/logo.png" alt="main-logo"></div>
        <basket />
      </header>
      <div class="filters">
        <label class="filters__label">
          <input v-model.trim="search" type="text" placeholder="Type something">
          <button><searchIcon /></button>
        </label>
        <div class="filters__right flex-between">
          <productFilter :selectedStrOrNum="selectedCategory"
                         :selectName="'categorySelect'"
                         :filterOptions="categories"
                         @setFilterAndCloseAll="setFilterAndClose" />
          <productFilter :selectedStrOrNum="selectedPrice"
                         :selectName="'priceSelect'"
                         :filterOptions="prices"
                         @setFilterAndCloseAll="setFilterAndClose" />
          <productFilter :selectedStrOrNum="selectedSale"
                         :selectName="'saleSelect'"
                         :filterOptions="sales"
                         @setFilterAndCloseAll="setFilterAndClose" />
        </div>
      </div>
      <div class="products">
        <ul v-if="filteredProducts.length" class="products__list">
          <productCard v-for="(card, i) in filteredProducts" :key="i" :productCard="card" />
        </ul>
        <p v-else>Позаданным параметрам товаров нет, успростите поиск</p>
      </div>
    </section>
  </div>
</template>

<script>
import {mapGetters, mapMutations, mapState} from "vuex";

export default {
  name: 'indexPage',
  components: {
    productCard: () => import("~/components/productCard"),
    basket: () => import("~/components/basket"),
    productFilter: () => import("~/components/productFilter"),
    caretDownIcon: () => import("~/components/svg/caretDownIcon"),
    searchIcon: () => import("~/components/svg/searchIcon"),
  },
  data() {
    return {
      products: [],

      search: '',

      selectedCategory: '',// 1 -> Одежда
      selectedPrice: '',// 1 -> Сначала дорогие
      selectedSale: '',// 1 -> Со скидкой

      categories: [
        { id: 0, text: 'Все категории' },
        { id: 1, text: 'Одежда' },
        { id: 2, text: 'Аксесуары' }
      ],
      prices: [
        { id: 0, text: 'По умолчанию' },
        { id: 1, text: 'Сначала дорогие' },
        { id: 2, text: 'Сначала дешевые' }
      ],
      sales: [
        { id: 0, text: 'По умолчанию' },
        { id: 1, text: 'Со скидкой' },
        { id: 2, text: 'Без скидки' }
      ],
    }
  },
  computed: {
    ...mapState([
      'productsState',
      'basketState'
    ]),
    ...mapGetters([
      'basketGet',
      'basketLengthGet',
      'basketTotalPriceGet'
    ]),
    filteredProducts() {
      let filtered = this.products
        // фильтр по категории
        .filter(product => +this.selectedCategory === 0 || product.rootCategoryId === +this.selectedCategory)
        // фильр инпуту поиска (вырезаны пробелы)
        .filter(product => {
          if (this.search === '') return product
          if (this.clearString(product.name).indexOf(this.clearString(this.search)) !== -1) return product
          if (this.clearString(product.subCategory).indexOf(this.clearString(this.search)) !== -1) return product
        })
        // вычисление цены товаров со скидками
        .map(product => {
          if (product.price instanceof Object) product.price = product.price.newPrice
          return product
        })

      let sorted = [...filtered]

      // сортировка по цене
      if (+this.selectedPrice === 0) sorted = filtered
      else if (+this.selectedPrice === 1) sorted = filtered.sort((a, b) => b.price - a.price)
      else if (+this.selectedPrice === 2) sorted = filtered.sort((a, b) => a.price - b.price)

      this.SET_PRODUCTS_TO_STATE(sorted)

      // сортировка по наличию скидки
      if (+this.selectedSale === 0) return sorted
      else if (+this.selectedSale === 1) return sorted.filter(product => product.isSale)
      else if (+this.selectedSale === 2) return sorted.filter(product => !product.isSale)
    }
  },
  methods: {
    ...mapMutations([
      'SET_PRODUCTS_TO_STATE',
      'DELETE_PRODUCT_FROM_BASKET_STATE',
      'CLEAR_BASKET_STATE',
      'SET_BASKET_STATE_FROM_LOCALSTORAGE'
    ]),
    clearString(str) {
      return str.toLowerCase().replace(/\s/g, '')
    },
    setFilterAndClose(e) {
      if (e.name === 'categorySelect') this.selectedCategory = e.value
      if (e.name === 'priceSelect') this.selectedPrice = e.value
      if (e.name === 'saleSelect') this.selectedSale = e.value
    },
  },
  async beforeMount() {
    const arr = JSON.parse(localStorage.getItem("localBasket"))
    if (arr) this.SET_BASKET_STATE_FROM_LOCALSTORAGE(arr)

    try {
      let apiResClo = await this.$axios.get(`${process.env.baseUrl}/clothing`)
      let apiResAcs = await this.$axios.get(`${process.env.baseUrl}/accessories`)
      this.products = [ ...apiResClo.data, ...apiResAcs.data ]
    } catch (e) {
      console.warn(e)
      throw new Error('bad response')
    }
  }
}
</script>

<style lang="scss">
.container {
  margin: 0 auto;
  width: calc(100% - 100px);
  max-width: 1440px;
}

.main {
  padding: 25px 0;
}

.header {
  padding: 25px 0;
  display: flex;
  justify-content: space-between;
}

.header__logo {
  max-width: 661px;
}

.filters {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.filters__label {
  width: calc(50% - 10px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 35px 0 20px;
  background: #F2F2F2;
  border-radius: 20px;

  input {
    height: 60px;
    width: calc(100% - 35px);
    background: #F2F2F2;
    font-size: 24px;
    line-height: 28px;
    color: #9E9E9E;
    outline: none;
    border: none;
  }
}

.filters__right__wrap {
  position: relative;
  margin-right: 20px;
  width: calc(50% - 10px);

  &:last-child {
    margin-right: 0;
  }

  .filters__right__btn {
    height: 60px;
    width: 207px;
    padding-left: 22px;
    padding-right: 15px;
    border: 1px solid #202020;
    border-radius: 20px;

    span {
      font-size: 24px;
      line-height: 28px;
      width: 100%;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      text-align: left;
    }
  }
}

.products {
  margin-top: 50px;
}

.products__list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
}

.filters__right__wrap-sale__menu {
  width: 100%;
  background-color: #FFFFFF;
  position: absolute;
  left: 0;
  top: calc(60px + 10px);
  border-radius: 8px;
  padding: 6px 0 !important;
  z-index: 3;
  box-shadow: 0 4px 12px rgba(0, 82, 127, 0.2);
}

.filters__right__wrap-menu-single {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  border: none;
  background: transparent;
  text-decoration: none;
  cursor: pointer;
  font-size: 18px;
  line-height: 22px;

  &:hover {
    background-color: lightpink;
  }

  input {
    opacity: 0;
    position: absolute;
    top: -9999px;
  }
}
</style>
