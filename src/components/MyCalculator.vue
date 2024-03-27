<template>
  <main>
    <div
      class="container"
      tabindex="0"
      @keydown="captureKeyOnKeyBoard"
    >
      <div class="box-result">
        <span class="hint">{{ countPreview }}</span>
        <div class="number-calc">{{ countResult }}</div>
      </div>
      
      <div class="box-buttons">
        <MyButton
          v-for="(chars, index) in dataButtons"
          :key="index + chars.color"
          :color="chars.color"
          :text="chars.text"
          :image="chars.image"
          :class="{ 'button-1': chars.text === 'C' }"
          @click="captureClickOnScreen($event)"
        >
        </MyButton>        
      </div>
    </div>
  </main>
</template>

<script>
/* eslint-disable */
import MyButton from './ui/MyButton.vue'

export default {
  name: 'MyCalculator',
  
  components: {
    MyButton
  },

  data() {
    return {
      countPreview: '',
      countResult: '',
      operationSymbols: ['+', '-', 'x', '*', '/', '÷', '%'],
      othersSymbols: ['.', '='],
      expressionPartOne: null,
      symbolOperation: null,
      expressionPartTwo: null,
      readyToCalculate: false
    }
  },

  computed: {
    dataButtons() {
      return [
        { text: 'C', color: this.$calcSecondaryColor},
        { text: '%', color: this.$calcSecondaryColor},
        { text: '÷', color: this.$calcTertiaryColor},
        { text: '7', color: this.$calcPrimaryColor},
        { text: '8', color: this.$calcPrimaryColor},
        { text: '9', color: this.$calcPrimaryColor},
        { text: 'x', color: this.$calcTertiaryColor},
        { text: '4', color: this.$calcPrimaryColor},
        { text: '5', color: this.$calcPrimaryColor},
        { text: '6', color: this.$calcPrimaryColor},
        { text: '-', color: this.$calcTertiaryColor},
        { text: '1', color: this.$calcPrimaryColor},
        { text: '2', color: this.$calcPrimaryColor},
        { text: '3', color: this.$calcPrimaryColor},
        { text: '+', color: this.$calcTertiaryColor},
        { text: '.', color: this.$calcPrimaryColor},
        { text: '0', color: this.$calcPrimaryColor},
        { image: 'delete.png', color: this.$calcPrimaryColor},
        { text: '=', color: this.$calcTertiaryColor}
      ]
    },

    allSymbols() {
      return this.operationSymbols.concat(this.othersSymbols)
    },

    calculator() {
      return this.countResult = eval(this.expressionPartOne + this.symbolOperation + this.expressionPartTwo)
    }
  },

  methods: {
    // Todo: make Capture keyboard numbers and symbols
    // captureKeyOnKeyBoard($event) {
    //   if($event.key >= 0 && $event.key <= 9 || ['/','*','-','+','Enter','Backspace'].includes($event.key)) {
    //     console.log('teclado: ', $event.key)
    //   }

    //   this.calculate()
    // },
    captureClickOnScreen($event) {
      const keyClicked = $event.target.innerText
      if (this.cleanCalculator(keyClicked)) return

      if (this.breakFirstSymbol(keyClicked)) return
      
      if (this.breakLastSymbol(this.countResult?.at(-1))) return

      this.countResult += keyClicked

      if (this.operationSymbols.includes(keyClicked)) {
        const symbol = keyClicked
        // const symbolPosition = this.countResult.indexOf(keyClicked)

        this.expressionPartOne = Number(this.countResult.slice(0, -1))
        this.symbolOperation = symbol

        this.countPreview = this.countResult
        this.countResult = ''
      }

      if (this.othersSymbols[1] === keyClicked) {
        this.expressionPartTwo = Number(this.countResult.slice(0, -1))
        this.countPreview += this.countResult
        this.countResult = ''
        this.calculator
      }

    },

    cleanCalculator(key) {
      if (key === 'C') {
        this.countResult = ''
        this.countPreview = ''
        this.expressionPartOne = null
        this.symbolOperation = null
        this.expressionPartTwo = null
        return true
      }
    },

    breakFirstSymbol(key) {
      return this.allSymbols.includes(key) && this.countResult.length < 1
    },

    breakLastSymbol(lastKey) {
      return lastKey === this.othersSymbols[1]
    },
  }
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap');

  main {
    padding-top: 3em;
    font-family: 'Work Sans', sans-serif;
    
    .container {
      width: 404px;
      height: 731px;
      background: #17171C;
      margin: 0 auto;
      padding: 0 20px;
      border-radius: 10px;

      .box-result {
        display: flex;
        flex-direction: column;
        padding: calc(1em + 50px) 1em 1em;
        text-align: end;
        gap: 16px 0;

        .hint {
          color: #9C9C9C;
          height: 47px;
          font-size: 40px;
          font-weight: 300;
        }

        .number-calc {
          color: $primary-white;
          height: 96px;
          font-weight: 300;
          font-size: 96px;
        }
      }
      
      .box-buttons {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        justify-items: center;
        gap: 16px 0;

        .button-1 {
          grid-column: span 2;
          width: 180px;
        }
      }
    }
  }
</style>
