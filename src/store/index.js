import Vue from 'vue';
import Vuex from 'vuex';

import { auth, db } from '../firebase';
import router from '../router';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		usuario: null,
		error: null,
		tareas: [],
		tarea: { nombre: '', id: '' },
		carga: false,
		texto: '',
	},
	mutations: {
		setUsuario(state, payload) {
			state.usuario = payload;
		},
		setError(state, payload) {
			state.error = payload;
		},
		setTareas(state, payload) {
			state.tareas = payload;
		},
		setTarea(state, payload) {
			state.tarea = payload;
		},
		setEliminarTarea(state, payload) {
			state.tareas = state.tareas.filter((item) => item.id !== payload);
		},
		cargarFirebase(state, payload) {
			state.carga = payload;
		},
	},
	actions: {
		buscador({ commit, state }, payload) {
			// console.log(payload);
			state.texto = payload.toLowerCase();
		},

		eliminarTarea({ commit, state }, id) {
			db.collection(state.usuario.email)
				.doc(id)
				.delete()
				.then(() => {
					commit('setEliminarTarea', id);
				})
				.catch((error) => console.log(error));
		},

		agregarTarea({ commit, state }, nombreTarea) {
			commit('cargarFirebase', true);
			db.collection(state.usuario.email)
				.add({
					nombre: nombreTarea,
				})
				.then((doc) => {
					router.push({ name: 'Inicio' });
					commit('cargarFirebase', false);
				})
				.catch((error) => console.log(error));
		},

		getTarea({ commit, state }, id) {
			db.collection(state.usuario.email)
				.doc(id)
				.get()
				.then((doc) => {
					// console.log(doc.data())
					// console.log(doc.id)
					let tarea = doc.data();
					tarea.id = doc.id;
					commit('setTarea', tarea);
				})
				.catch((error) => console.log(error));
		},
		editarTarea({ commit, state }, tarea) {
			db.collection(state.usuario.email)
				.doc(tarea.id)
				.update({
					nombre: tarea.nombre,
				})
				.then(() => {
					router.push({ name: 'Inicio' });
				})
				.catch((error) => console.log(error));
		},

		getTareas({ commit, state }) {
			commit('cargarFirebase', true);

			const tareas = [];
			db.collection(state.usuario.email)
				.get()
				.then((res) => {
					res.forEach((doc) => {
						console.log(doc.id);
						console.log(doc.data());
						let tarea = doc.data();
						tarea.id = doc.id;
						tareas.push(tarea);
					});
					commit('cargarFirebase', false);
				});
			commit('setTareas', tareas);
		},
		crearUsuario({ commit }, usuario) {
			auth.createUserWithEmailAndPassword(usuario.email, usuario.password)
				.then((res) => {
					console.log(res);
					const usuarioCreado = {
						email: res.user.email,
						uid: res.user.uid,
					};
					db.collection(res.user.email)
						.add({
							nombre: 'tarea de ejemplo',
						})
						.then((doc) => {
							commit('setUsuario', usuarioCreado);
							router.push('/');
						})
						.catch((error) => console.log(error));
				})
				.catch((error) => {
					console.log(error);
					commit('setError', error.code);
				});
		},
		ingresoUsuario({ commit }, usuario) {
			auth.signInWithEmailAndPassword(usuario.email, usuario.password)
				.then((res) => {
					console.log(res);
					const usuarioLogueado = {
						email: res.user.email,
						uid: res.user.uid,
					};
					commit('setUsuario', usuarioLogueado);
					router.push('/');
				})
				.catch((error) => {
					console.log(error);
					commit('setError', error);
				});
		},
		cerrarSesion({ commit }) {
			auth.signOut().then(() => {
				router.push('/acceso');
			});
		},
		detectarUsuario({ commit }, usuario) {
			commit('setUsuario', usuario);
		},
	},
	getters: {
		existeUsuario(state) {
			if (state.usuario === null) {
				return false;
			} else {
				return true;
			}
		},
		arrayFiltrado(state) {
			let arregloFiltrado = [];
			for (let tarea of state.tareas) {
				let nombre = tarea.nombre.toLowerCase();
				if (nombre.indexOf(state.texto) >= 0) {
					arregloFiltrado.push(tarea);
				}
			}
			return arregloFiltrado;
		},
	},
	modules: {},
});
