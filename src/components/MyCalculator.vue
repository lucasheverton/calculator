<template>
  <main>
    <div
      class="container"
      tabindex="0"
      @keydown="captureKeyOnKeyBoard"
    >
      <div class="box-result">
        <span class="preview">{{ countPreview }}</span>
        <div 
          class="number-calc"
          :class="{ 'decrease-size-numbers': countResultLength }"
        >
          {{ countResult || '0' }}
        </div>
      </div>
      
      <div class="box-buttons">
        <MyButton
          v-for="(chars, index) in dataButtons"
          :key="index + chars.color"
          :color="chars.color"
          :text="chars.text"
          :image="chars.image"
          :class="{ 'bigger-button': chars.bigger }"
          @click="captureClickOnScreen(chars.action)"
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
      operationSymbols: ['+', '-', '*', '/'],
      othersSymbols: ['.', '='],
      expressionPartOne: null,
      symbolOperation: null,
      expressionPartTwo: null,
      readyToCalculate: false,
      maxNumberLimit: 10
    }
  },

  computed: {
    dataButtons() {
      return [
        { text: 'C', color: this.$calcSecondaryColor, action: 'deleteAll', bigger: true, },
        { image: 'delete.png', color: this.$calcPrimaryColor, action: 'deleteLast' },
        { text: '÷', color: this.$calcTertiaryColor, action: '/' },
        { text: '7', color: this.$calcPrimaryColor, action: '7' },
        { text: '8', color: this.$calcPrimaryColor, action: '8' },
        { text: '9', color: this.$calcPrimaryColor, action: '9' },
        { text: 'x', color: this.$calcTertiaryColor, action: '*' },
        { text: '4', color: this.$calcPrimaryColor, action: '4' },
        { text: '5', color: this.$calcPrimaryColor, action: '5' },
        { text: '6', color: this.$calcPrimaryColor, action: '6' },
        { text: '-', color: this.$calcTertiaryColor, action: '-' },
        { text: '1', color: this.$calcPrimaryColor, action: '1' },
        { text: '2', color: this.$calcPrimaryColor, action: '2' },
        { text: '3', color: this.$calcPrimaryColor, action: '3' },
        { text: '+', color: this.$calcTertiaryColor, action: '+' },
        { text: '.', color: this.$calcPrimaryColor, action: '.' },
        { text: '0', color: this.$calcPrimaryColor, action: '0', bigger: true },
        { text: '=', color: this.$calcTertiaryColor, action: '=' }
      ]
    },

    allSymbols() {
      return this.operationSymbols.concat(this.othersSymbols)
    },

    calculator() {
      return this.countResult = eval(this.expressionPartOne + this.symbolOperation + this.expressionPartTwo)
    },

    deleteLastNumber() {
      this.countResult = this.countResult.slice(0, -1)
    },

    countResultLength() {
      return this.countResult.length > 6
    },

    maximumNumberLimit() {
      console.log(this.countResult.length)
      return this.countResult.length > this.maxNumberLimit
    },

    countPreviewLength() {
      return this.countPreview.length
    }
  },

  methods: {
    // Todo: make Capture keyboard numbers and symbols
    // captureKeyOnKeyBoard($event) {
    //   if($event.key >= 0 && $event.key <= 9 || ['/','*','-','+','Enter','Backspace'].includes($event.key)) {
    //     console.log('teclado: ', $event.key)
    //   }
    // },

    captureClickOnScreen(keyClicked) {
      if (this.cleanAllCalculator(keyClicked)) {
        return
      }

      if (this.breakFirstSymbol(keyClicked)) {
        return
      }

      if (this.breakMoreThanOneZero(keyClicked)) {
        return
      }
      
      if (this.countResult?.length && this.breakLastSymbol(this.countResult.at(-1))) {
        return
      }

      if (keyClicked === 'deleteLast') {
        this.deleteLastNumber
        keyClicked = ''
      }

      if (this.maximumNumberLimit) {
        return
      }

      this.countResult += keyClicked

      if (this.operationSymbols.includes(keyClicked)) {
        this.calculateExpressionPartOne(keyClicked)
      }

      if (this.othersSymbols[1] === keyClicked) {
        this.calculateExpressionPartTwo()
      }

    },

    cleanAllCalculator(key) {
      if (key === 'deleteAll') {
        this.countResult = ''
        this.countPreview = ''
        this.expressionPartOne = null
        this.symbolOperation = null
        this.expressionPartTwo = null
        return true
      }
    },

    calculateExpressionPartOne(keyClicked) {
      const symbol = keyClicked

      this.expressionPartOne = Number(this.countResult.slice(0, -1))
      this.symbolOperation = symbol

      this.countPreview = this.countResult
      this.countResult = ''
    },

    calculateExpressionPartTwo() {
      this.expressionPartTwo = Number(this.countResult.slice(0, -1))
      this.countPreview += this.countResult
      this.countResult = ''
      this.calculator
    },

    breakMoreThanOneZero(key) {
      return this.countResult.length < 1 && Number(key) === 0
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

        .preview {
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

        .number-calc.decrease-size-numbers {
          display: flex;
          align-items: center;
          flex-direction: row-reverse;
          font-size: 58px;
        }
      }
      
      .box-buttons {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        justify-items: center;
        gap: 16px 0;

        .bigger-button {
          grid-column: span 2;
          width: 180px;
        }
      }
    }
  }
</style>
