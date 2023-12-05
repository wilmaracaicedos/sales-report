<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import DateRangeInput from "../DateRangeInput.vue";
import saleService from "../../services/saleService";

const currentDate = new Date();
const year = currentDate.getFullYear();
const month = currentDate.getMonth() + 1;
const day =
  currentDate.getDate().toLocaleString().length == 1
    ? `0${currentDate.getDate()}`
    : currentDate.getDate();
const date = `${year}-${month}-${day}`;
const startDate = ref(date);
const endDate = ref(date);
const params = reactive({
  startDate,
  endDate
});
const search = ref('');

params.startDate = startDate.value;
params.endDate = endDate.value;

function handleStartDateChange(value: string) {
  startDate.value = value;
}

function handleEndDateChange(value: string) {
  endDate.value = value;
}

const sales = reactive([]);
async function getData() {
  sales.splice(0, sales.length);
  const data = await saleService.getData(params);
  data.forEach((item) => {
    sales.push(item);
  });
}

const filteredSales = computed(() => {
  return sales.filter((sale) =>
    sale.country.toLowerCase().includes(search.value.toLowerCase()) ||
    sale.category.toLowerCase().includes(search.value.toLowerCase()) ||
    sale.variety.toLowerCase().includes(search.value.toLowerCase()) ||
    sale.color.toLowerCase().includes(search.value.toLowerCase()) ||
    sale.provider.toLowerCase().includes(search.value.toLowerCase()) ||
    sale.customer.toLowerCase().includes(search.value.toLowerCase())
  );
});

const totalSales = computed(() => {
  return filteredSales.value.reduce((acum, current) => acum + current.stems, 0);
});
</script>

<template>
  <DateRangeInput
    @startDate-change="handleStartDateChange"
    @endDate-change="handleEndDateChange"
  ></DateRangeInput>

  <div class="field is-horizontal">
    <div class="field-label is-small">
      <label class="label">Buscar</label>
    </div>
    <div class="field-body">
      <div class="field is-narrow">
        <div class="control">
          <input class="input is-small is-rounded" type="text" v-model="search">
        </div>
      </div>
    </div>
  </div>

  <div class="field is-horizontal">
    <div class="field-label"></div>
    <div class="field-body">
      <div class="field is-grouped">
        <div class="control">
          <button
            class="button is-small is-primary is-rounded"
            @click.prevent="getData"
          >
            Consultar
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="table-container content is-small">
    <table class="table is-hoverable">
      <thead>
        <tr>
          <td>Pais</td>
          <td>Categoria</td>
          <td>Variedad</td>
          <td>Color</td>
          <td>Proveedor</td>
          <td>Cliente</td>
          <td>Fecha</td>
          <td>Total</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(sale, index) in filteredSales" :key="index">
          <td>{{ sale.country }}</td>
          <td>{{ sale.category }}</td>
          <td>{{ sale.variety }}</td>
          <td>{{ sale.color }}</td>
          <td>{{ sale.provider }}</td>
          <td>{{ sale.customer }}</td>
          <td>{{ sale.date }}</td>
          <td>{{ sale.stems }}</td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td><b>TOTAL</b></td>
          <td>{{ totalSales }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss" scoped></style>
