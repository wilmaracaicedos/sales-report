<script setup lang="ts">
import { ref } from "vue";

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

const emit = defineEmits(["startDate-change", "endDate-change"]);
const handleStartDateChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("startDate-change", target.value);
};
const handleEndDateChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("endDate-change", target.value);
};
</script>

<template>
  <div class="field is-horizontal">
    <div class="field-label is-small">
      <label class="label">Fechas</label>
    </div>
    <div class="field-body">
      <div class="field">
        <p class="control is-expanded has-icons-left">
          <input
            class="input is-small is-rounded"
            type="date"
            placeholder="startDate"
            @input="handleStartDateChange"
            v-model="startDate"
          />
          <span class="icon is-small is-left">
            <i class="fa-solid fa-calendar-week"></i>
          </span>
        </p>
      </div>
      <div class="field">
        <p class="control is-expanded has-icons-left">
          <input
            class="input is-small is-rounded"
            type="date"
            placeholder="endDate"
            @input="handleEndDateChange"
            v-model="endDate"
          />
          <span class="icon is-small is-left">
            <i class="fa-solid fa-calendar-week"></i>
          </span>
        </p>
      </div>
    </div>
  </div>
</template>
