<template>
  <div class="filters__right__wrap">
    <button class="filters__right__btn flex-between" @click="isShow = !isShow">
      <span>{{ getFilterData }}</span>
      <caretDownIcon />
    </button>
    <div class="filters__right__wrap-sale__menu"
         v-if="isShow"
         @mouseleave="isShow = false">
      <label class="filters__right__wrap-menu-single"
             v-for="option in filterOptions"
             :key="option.id"
             @click="setFilterAndClose()">
        {{ option.text }}
        <input v-model="value" type="radio" :value="option.id" />
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: "productFilter",
  components: {
    caretDownIcon: () => import("~/components/svg/caretDownIcon"),
  },
  props: {
    selectName: {
      type: String,
      default: ''
    },
    selectedStrOrNum: {
      type: [ String, Number ],
      default: ''
    },
    filterOptions: {
      type: Array,
      default: () => {}
    }
  },
  data() {
    return {
      isShow: false,
      name: '',
      value: ''
    }
  },
  computed: {
    getFilterData() {
      if (typeof this.selectedStrOrNum === 'string') return this.filterOptions[0].text
      else return this.filterOptions[this.value].text
    }
  },
  methods: {
    setFilterAndClose() {
      setTimeout(() => {
        this.isShow = false
        this.$emit('setFilterAndCloseAll', {
          value: this.value,
          name: this.selectName
        })
      }, 0)
    }
  }
}
</script>

<style scoped>

</style>
