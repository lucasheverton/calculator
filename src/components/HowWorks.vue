<template>
  <section class="container">
    <h1>COMO FUNCIONA?</h1>
    <p class="paragraph">
      As operações matemáticas básicas de uma calculadora são realizadas por
      algoritmos implementados no software. Ao pressionar os botões de adição,
      subtração, multiplicação ou divisão, a calculadora processa os números
      inseridos pelo usuário e executa a operação correspondente, exibindo o
      resultado no visor. Essas operações são simplificadas pela automação
      eletrônica, facilitando cálculos rápidos e precisos.
    </p>

    <MyCalculator></MyCalculator>
  </section>
</template>

<script>
import MyCalculator from './MyCalculator.vue'

export default {
  name: 'HowWorks',

  components: {
    MyCalculator
  }
}
</script>

<style lang="scss" scoped>
  .container {
    background: $background;
    padding-bottom: 3em;

    h1 {
      margin: 0;
      text-align: center;
      padding: 24px 0;
    }

    .paragraph {
      margin: 0 auto;
      width: 1024px;
      text-align: center;
    }
  }
</style>
