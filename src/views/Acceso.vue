<template>
  <div>
    <h1>Acceso de usuarios</h1>
    <form @submit.prevent="ingresoUsuario({email: $v.email.$model, password: $v.pass.$model})">
      <input
        type="email"
        placeholder="Ingrese su correo"
        v-model="$v.email.$model"
        class="form-control"
      />
      <small class="text-danger" v-if="!$v.email.required">Campo requerido</small>
      <small class="text-danger" v-if="!$v.email.email">Email no valido</small>
      <input
        type="password"
        placeholder="Ingrese su contraseña"
        v-model="$v.pass.$model"
        class="form-control mt-3"
      />
      <small class="text-danger d-block" v-if="!$v.pass.required">Campo requerido</small>
      <small class="text-danger d-block" v-if="!$v.pass.minLength">Minimo 6 carácteres</small>
      <button type="submit" class="btn btn-primary mt-3" :disabled="$v.$invalid">Acceder</button>
    </form>
    <p v-if="error">Usuario o contraseña incorrecta</p>
    <!-- {{$v.email}} -->
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { required, minLength, email } from "vuelidate/lib/validators";
export default {
  name: "Acceso",
  data() {
    return {
      email: "",
      pass: "",
    };
  },
  methods: {
    ...mapActions(["ingresoUsuario"]),
  },
  computed: {
    ...mapState(["error"]),
  },
  validations: {
    email: { required, email },
    pass: { required, minLength: minLength(6) },
  },
};
</script>