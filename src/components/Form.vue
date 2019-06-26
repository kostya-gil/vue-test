<template>
  <div>
    <form class="form" @submit.prevent="createItem" :class="{ error: error.length }">
       <h1>Add some data</h1>
      <input type="text" placeholder="Enter name" class="form__input form__field" v-model.trim="name">
      <input type="text" placeholder="Enter surname" class="form__input form__field" v-model.trim="surname">
      <button type="submit" class="form__btn form__field">Add</button>
      <transition name="fade">
        <div v-show="error.length" class="error-msg">
          {{ error }}
        </div>
      </transition>
    </form>
  </div>

</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'Form',
  data() {
    return {
      name: '',
      surname: '',
      error: '',
    };
  },
  methods: {
    ...mapMutations([
      'addItem',
    ]),
    createItem() {
      const newItem = {
        name: this.name,
        surname: this.surname,
      };
      if (this.checkForm()) {
        this.addItem(newItem);
        this.name = '';
        this.surname = '';
      }
    },
    checkForm() {
      if (!this.name || !this.surname) {
        this.error = 'Заполните все поля!';
        return false;
      }
      this.error = '';
      return true;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  h1 {
    font-size: 32px;
    font-weight: 700;
    margin-bottom: 20px;
  }

  .form {
    margin: 0 auto;
    margin-top: 25px;
    padding: 50px 0;
    max-width: 800px;
    border-radius: 5px;
    background: white;
    text-align: center;

    &__field {
      display: block;
      max-width: 250px;
      margin: 5px auto;
      width: 100%;
    }

    &__input {
      height: calc(1.5em + .75rem + 2px);
      padding: .375rem .75rem;
      font-size: 1rem;
      font-weight: 400;
      line-height: 1.5;
      color: #495057;
      background-color: #fff;
      border: 1px solid #ced4da;
      border-radius: .25rem;
      transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    }

    &__btn {
      background: #8fc27a;
      font-weight: 400;
      text-align: center;
      user-select: none;
      padding: .375rem .75rem;
      font-size: 1rem;
      border-radius: .25rem;
      color: white;
      transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    }
  }

  form.error input {
    border: 1px solid red;
  }

  .error-msg {
    margin-top: 20px;
    color: red;
  }
</style>
