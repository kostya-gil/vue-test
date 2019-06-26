<template>
  <div id="app">
    <Form />
    <Table />
  </div>
</template>

<script>
import Table from './components/Table.vue';
import Form from './components/Form.vue';

export default {
  name: 'app',
  components: {
    Table,
    Form,
  },
};
</script>

<style src="./main.css"></style>
<style>
  #app {
    padding: 50px 0 100px 0;
    font-family: 'Roboto', sans-serif;
    background: #f8faff;
  }

  button {
    outline: none;
    border: none;
  }
</style>
