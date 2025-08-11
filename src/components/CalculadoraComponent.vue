<script setup lang="ts">
import { ref } from 'vue'

const inputValue = ref('')
const expression = ref('')
const result = ref('')
const errorMessage = ref('')

const handleKeydownEnter = () => {
  calculate()
}

const addToInput = (val: string) => {
  if (result.value) {
    expression.value = ''
    result.value = ''
    inputValue.value = val
  } else {
    inputValue.value += val
  }
}

const handleOperator = (op: string) => {
  if (!inputValue.value && !result.value) return

  if (result.value) {
    expression.value = result.value + op
    result.value = ''
    inputValue.value = ''
  } else {
    expression.value += inputValue.value + op
    inputValue.value = ''
  }
}

const backspace = () => {
  if (inputValue.value.length > 0) {
    inputValue.value = inputValue.value.slice(0, -1)
  }
}

const clearEntry = () => {
  inputValue.value = ''
}

const clearAll = () => {
  inputValue.value = ''
  expression.value = ''
  result.value = ''
  errorMessage.value = ''
}

const calculate = () => {
  if (!inputValue.value && !expression.value) {
    return
  }

  const finalExpression = expression.value + inputValue.value

  try {
    if (/\/0(?!\d)/.test(finalExpression)) {
      throw new Error('Cannot be divided by zero')
    }

    const res = eval(finalExpression)
    result.value = String(res)
    expression.value = ''
    inputValue.value = ''
    errorMessage.value = ''
  } catch (error: unknown) {
    if (error instanceof Error) {
      errorMessage.value = error.message
    } else {
      errorMessage.value = 'Unknown error'
    }
    result.value = ''
    expression.value = ''
    inputValue.value = ''
  }
}

const handleKeydown = (event: KeyboardEvent) => {
  const key = event.key

  if ('0123456789.'.includes(key)) {
    if (result.value) {
      expression.value = ''
      result.value = ''
      inputValue.value = key
      event.preventDefault()
    }
    return
  }

  if ('+-/*'.includes(key)) {
    event.preventDefault()

    if (!inputValue.value && !result.value) return

    if (result.value) {
      expression.value = result.value + key
      result.value = ''
      inputValue.value = ''
    } else {
      expression.value += inputValue.value + key
      inputValue.value = ''
    }
    return
  }

  if (key === 'Backspace') {
    event.preventDefault()
    backspace()
    return
  }

  if (key === 'Enter') {
    event.preventDefault()
    calculate()
    return
  }
}
</script>

<template>
  <div>
    <div class="max-w-4xl mx-auto p-4">
      <h1 class="text-2xl font-bold text-center text-gray-800">Calculator</h1>
    </div>
    <div class="max-w-xl mx-auto flex justify-center items-center">
      <div class="bg-gray-200 text-center container_calculator">
        <div class="with_container">
          <input
            type="text"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-2xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="0"
            v-model="inputValue"
            autocomplete="off"
            @keydown.enter="handleKeydownEnter"
            @keydown="handleKeydown"
          />
        </div>

        <div class="with_container">
          <div class="mb-2 result_calc text-2xl">
            <span v-if="result">= {{ result }}</span>
            <span v-else>{{ expression }}</span>
          </div>
        </div>

        <div v-if="errorMessage" class="text-red-600 font-semibold mb-2 px-2">
          {{ errorMessage }}
        </div>

        <div class="with_container">
          <button @click="clearEntry" class="btn-func">
            <font-awesome-icon icon="eraser" />
          </button>
          <button @click="clearAll" class="btn-func">
            <font-awesome-icon icon="trash" />
          </button>
          <button @click="backspace" class="btn-func">
            <font-awesome-icon icon="delete-left" />
          </button>
        </div>

        <div
          class="with_container"
          v-for="(fila, filaIndex) in [
            ['7', '8', '9'],
            ['4', '5', '6'],
            ['1', '2', '3'],
          ]"
          :key="'fila-' + filaIndex"
        >
          <button
            v-for="(num, numIndex) in fila"
            :key="'num-' + filaIndex + '-' + numIndex"
            @click="addToInput(num)"
            class="btn-num"
          >
            {{ num }}
          </button>
        </div>

        <div class="with_container">
          <button @click="handleOperator('/')" class="btn-op">
            <font-awesome-icon icon="divide" />
          </button>
          <button @click="addToInput('0')" class="btn-num">0</button>
          <button @click="handleOperator('*')" class="btn-op">
            <font-awesome-icon icon="xmark" />
          </button>
        </div>

        <div class="with_container">
          <button @click="handleOperator('+')" class="btn-op">
            <font-awesome-icon icon="plus" />
          </button>
          <button @click="handleOperator('-')" class="btn-op">
            <font-awesome-icon icon="minus" />
          </button>
          <button @click="calculate" class="btn-eq">
            <font-awesome-icon icon="equals" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container_calculator {
  width: 18rem !important;
  padding: 12px 0px;
}
.with_container {
  width: 18rem !important;
  padding: 0px 12px;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
}
button {
  width: 81.24px !important;
  padding: 10px 0px !important;
  margin: 3px;
  height: 60px;
}
.result_calc {
  color: blue;
}

.btn-func {
  @apply text-white bg-gray-800 hover:bg-gray-900 rounded-lg text-lg px-5 py-2.5;
}
.btn-num {
  @apply text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 rounded-lg text-2xl px-5 py-2.5;
}
.btn-op {
  @apply text-white bg-blue-700 hover:bg-blue-800 rounded-lg text-lg px-5 py-2.5;
}
.btn-eq {
  @apply text-white bg-red-700 hover:bg-red-800 rounded-lg text-lg px-5 py-2.5;
}
</style>
