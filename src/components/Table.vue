<template>
  <div class="wrapper-table">
    <table class="table">
      <thead>
        <tr class="table__row-th">
         <th class="table__th no-sorted">Index number</th>
          <th class="table__th" v-for="(key, index) in columns"
            @click="sortBy(key)"
            :key="index">
            {{ key | capitalize }}
            <span class="arrow" v-if="sortOrders[key]" :class="sortOrders[key] > 0 ? 'asc' : 'dsc'">
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(entry, index) in filteredData" :key="index" class="table__row">
          <td class="table__td">
            {{ entry.id }}
          </td>
          <td class="table__td" v-for="(key, index) in columns" :key="index">
            {{ entry[key] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>

</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Table',
  data() {
    const columns = ['name', 'surname'];
    const sortOrders = {};
    columns.forEach((key) => {
      sortOrders[key] = 0;
    });
    return {
      columns,
      sortKey: '',
      sortOrders,
    };
  },
  computed: {
    ...mapGetters([
      'getItems',
    ]),
    filteredData() {
      const { sortKey } = this;
      let list = this.getItems;
      const order = this.sortOrders[sortKey];
      if (sortKey) {
        list = list.slice().sort((a, b) => {
          a = a[sortKey];
          b = b[sortKey];
          return (a === b ? 0 : a > b ? 1 : -1) * order;
        });
      }
      return list;
    },
  },
  methods: {
    sortBy(key) {
      this.sortKey = key;
      if (this.sortOrders[key] === 1) {
        this.sortOrders[key] = -1;
      } else if (this.sortOrders[key] === -1) {
        this.sortOrders[key] = 0;
      } else if (this.sortOrders[key] === 0) {
        this.sortOrders[key] = 1;
      }
    },
  },
  filters: {
    capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

  .wrapper-table {
    margin: 0 auto;
    margin-top: 25px;
    padding: 30px 0;
    max-width: 800px;
    border-radius: 5px;
    box-shadow: 0px 11px 21px 0px rgba(40, 40, 40, 0.09);
    text-align: left;
    background: white;
    overflow-x: auto;
  }

  .table {
    width: 100%;

    &__row {
      cursor: pointer;
      position: relative;
      &:hover .table__td {
        color: white;
        background: #8fc27a;
      }
    }

    &__th,
    &__td {
      padding: 15px 30px;
      font-size: 16px;
      font-weight: 500;
    }

    &__th {
      color: #343434;
      cursor: pointer;
      user-select: none;
      font-weight: 700;
      &:hover {
        color: #978977;
      }
    }

    &__th.active .arrow {
      opacity: 1;
    }

    &__td {
      color: #6e6e6e;
    }

    &__th.no-sorted {
      cursor: default;
      color: #767474;
    }
  }

  .remove {
    position: relative;
    padding: 15px 30px;
    width: 35px;
    height: 35px;
    color: #bcabab;
    background: transparent;

    &:before {
      content: '';
      font-family: Arial,"Helvetica CY","Nimbus Sans L",sans-serif;
      font-size: 37px;
      line-height: 35px;
      top: 0;
      left: 0;
      content: "\00d7";
      text-align: center;
    }

    &:hover {
      color: black;
    }
  }

  .arrow {
    display: inline-block;
    vertical-align: middle;
    position: relative;
    bottom: 2px;
    width: 0;
    height: 0;
    margin-left: 5px;

    &.asc {
      border-left: 4px solid transparent;
      border-right: 4px solid transparent;
      border-bottom: 4px solid #000;
    }

    &.dsc {
      border-left: 4px solid transparent;
      border-right: 4px solid transparent;
      border-top: 4px solid #000;
    }
  }
</style>
