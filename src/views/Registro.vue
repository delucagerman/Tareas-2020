<template>
  <div>
    <h1>Registro de usuarios</h1>
    <form @submit.prevent="crearUsuario({email: email, password: pass1})">
      <input
        type="email"
        placeholder="Ingrese su correo"
        v-model="$v.email.$model"
        class="form-control mb-2"
      />
      <small class="text-danger d-block" v-if="!$v.email.required">Campo requerido</small>
      <small class="text-danger d-block" v-if="!$v.email.email">Email no valido</small>
      <input
        type="password"
        placeholder="Ingrese su contraseña"
        v-model="pass1"
        class="form-control mb-2"
      />
      <small class="text-danger d-block" v-if="!$v.pass1.minLength">Minimo 6 carácteres</small>
      <input
        type="password"
        placeholder="Repita su contraseña"
        v-model="pass2"
        class="form-control mb-2"
      />
      <small class="text-danger d-block" v-if="!$v.pass2.sameAs">La contraseña debe ser igual</small>
      <button type="submit" :disabled="!desactivar" class="btn btn-primary">Registrar usuario</button>
    </form>
    <p v-if="error ==='auth/email-already-in-use'">Usuario ya registrado!!</p>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { required, minLength, email, sameAs } from "vuelidate/lib/validators";
export default {
  name: "Registro",
  data() {
    return {
      email: "",
      pass1: "",
      pass2: "",
    };
  },
  created() {},
  methods: {
    ...mapActions(["crearUsuario"]),
  },
  computed: {
    ...mapState(["error"]),
    desactivar() {
      return (
        this.pass1 === this.pass2 &&
        this.pass1.trim() !== "" &&
        this.pass1.length > 5
      );
    },
  },
  validations: {
    email: { email, required },
    pass1: { minLength: minLength(6) },
    pass2: { sameAs: sameAs("pass1") },
  },
};
</script>