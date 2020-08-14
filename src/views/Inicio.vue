<template>
  <div>
    <h1>Lista de tareas</h1>
    <router-link to="/agregar">
      <button class="btn btn-success btn-block mb-2">Agregar</button>
    </router-link>

    <form @submit.prevent="buscador(texto)">
      <input
        type="text"
        placeholder="Buscar..."
        class="form-control my-4"
        v-model="texto"
        @keyup="buscador(texto)"
      />
    </form>

    <div v-if="carga" class="text-center mt-5">
      <h3>Cargando...</h3>
      <pulse-loader :loading="carga"></pulse-loader>
    </div>

    <ul class="list-group" v-if="!carga">
      <li v-for="(item, index) of arrayFiltrado" :key="index" class="list-group-item">
        <!-- {{item.id}} -  -->
        {{item.nombre}}
        <button
          @click="eliminarTarea(item.id)"
          class="btn btn-danger float-right"
        >Eliminar</button>
        <router-link :to="{name: 'Editar', params: {id: item.id}}" class="float-right">
          <button class="btn btn-warning mr-2">Editar</button>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
export default {
  name: "Inicio",
  data() {
    return {
      texto: "",
    };
  },
  components: {
    PulseLoader,
  },
  computed: {
    ...mapState(["usuario", "tareas", "carga"]),
    ...mapGetters(["arrayFiltrado"]),
  },
  methods: {
    ...mapActions(["getTareas", "eliminarTarea", "buscador"]),
  },
  created() {
    this.getTareas();
  },
};
</script>