<template>
  <div>
    <article v-if="!getStatus" class="auth">
      <h1>Bonjour, qui êtes-vous ?</h1>
      <button @click="changeStatus('user')">Utilisateur</button>
      <button
        @click="
          changeStatus('admin');
          $router.push('/admin');
        "
      >
        Admin
      </button>
    </article>
    <article v-else-if="getStatus == 'user'" class="main">
      <h1>Grouper</h1>
      <h2>Liste des groupes</h2>
      <ul>
        <li v-for="i in 3" :key="i">
          <NuxtLink :to="`/groupes/${i}`">Groupe {{ i }}</NuxtLink>
        </li>
      </ul>
      <button>Créer un groupe</button>
      <button>Rejoindre aléatoirement un groupe</button>
      <button @click="changeStatus(null)">Se déconnecter</button>
    </article>
    <article v-else-if="getStatus == 'admin'" class="admin">
      <p>Vous êtes actuellement connecté en tant qu'administrateur</p>
      <button @click="changeStatus('user')">Passer en mode utilisateur</button>
      <button @click="changeStatus(null)">Se déconnecter</button>
    </article>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters(["getStatus"]),
  },
  methods: {
    ...mapActions(["changeStatus"]),
  },
  data() {
    return {};
  },
};
</script>
