<template>
  <div>
    <h1>Agregar Tarea</h1>
    <form @submit.prevent="agregarTarea($v.nombre.$model)">
      <input
        type="text"
        v-model="$v.nombre.$model"
        class="form-control mb-2"
        placeholder="Ingrese tarea"
      />
      <small class="text-danger d-block" v-if="!$v.nombre.required">Campo requerido</small>
      <small class="text-danger d-block" v-if="!$v.nombre.minLength">Minimo 5 carácteres</small>

      <button type="submit" class="btn btn-primary mt-2" :disabled="$v.$invalid ||carga">Agregar</button>
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { required, minLength } from "vuelidate/lib/validators";
export default {
  name: "Agregar",
  data() {
    return {
      nombre: "",
    };
  },
  methods: {
    ...mapActions(["agregarTarea"]),
  },
  validations: {
    nombre: {
      required,
      minLength: minLength(5),
    },
  },
  computed: {
    ...mapState(["carga"]),
  },
};
</script>