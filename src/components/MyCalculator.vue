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
import MyButton from './ui/MyButton.vue'

export default {
  name: 'MyCalculator',
  
  components: {
    MyButton
  },

  data() {
    return {
      calculatorColors: {
        primary: '#2E2F38',
        secondary: '#4E505F',
        tertiary: '#4B5EFC'
      },
      countPreview: '',
      countResult: '',
      operationSymbols: ['+', '-', 'x', '*', '/', '÷', '%'],
      othersSymbols: ['.', '=']
    }
  },

  computed: {
    dataButtons() {
      return [
        { text: 'C', color: this.calculatorColors.secondary},
        { text: '%', color: this.calculatorColors.secondary},
        { text: '÷', color: this.calculatorColors.tertiary},
        { text: '7', color: this.calculatorColors.primary},
        { text: '8', color: this.calculatorColors.primary},
        { text: '9', color: this.calculatorColors.primary},
        { text: 'x', color: this.calculatorColors.tertiary},
        { text: '4', color: this.calculatorColors.primary},
        { text: '5', color: this.calculatorColors.primary},
        { text: '6', color: this.calculatorColors.primary},
        { text: '-', color: this.calculatorColors.tertiary},
        { text: '1', color: this.calculatorColors.primary},
        { text: '2', color: this.calculatorColors.primary},
        { text: '3', color: this.calculatorColors.primary},
        { text: '+', color: this.calculatorColors.tertiary},
        { text: '.', color: this.calculatorColors.primary},
        { text: '0', color: this.calculatorColors.primary},
        { image: 'delete.png', color: this.calculatorColors.primary},
        { text: '=', color: this.calculatorColors.tertiary}
      ]
    }
  },

  watch: {
    countPreview(expression) {
      if (expression.at(-1) === '=') {
        console.log('fim do calculo');
      }

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
      const key = $event.target.innerText
      const allSymbols = this.operationSymbols.concat(this.othersSymbols)
      
      if (allSymbols.includes(key) && this.countPreview.length < 1) {
        return
      }
      
      if (key === 'C') {
        this.countPreview = ''
        return
      }

      if (this.countPreview.at(-1) === '=') {
        return
      }

      const buttonClicked = $event.target.innerText
      this.countPreview += buttonClicked

      this.calculate()
    },

    calculate() {
      // console.log('countPreview', this.countPreview)
    }
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
