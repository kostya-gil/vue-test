import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// стартовый набор
const data = [
  { id: 1, name: 'Chuck', surname: 'Norris' },
  { id: 2, name: 'Leanne', surname: 'Graham' },
  { id: 3, name: 'Ervin', surname: 'Howell' },
  { id: 4, name: 'Clementine', surname: 'Bauch' },
];

export default new Vuex.Store({
  state: {
    items: data,
  },
  getters: {
    getItems(state) {
      return state.items;
    },
  },
  mutations: {
    addItem(state, { name, surname }) {
      // знаю, что генерация id должна быть непосредственно в компоненте, но тут для упрощения. (раз это порядковый номер);
      const newIdItem = state.items[state.items.length - 1].id + 1;
      const item = {
        id: newIdItem,
        name,
        surname,
      };
      state.items.push(item);
    },
  },
});
