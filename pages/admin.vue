<template>
  <div v-if="getStatus == 'admin'">
    <h1>Page d'admin</h1>
    <button>Definir le nombre d'utilisateurs</button>
    <button>Définir le nombre de groupes</button>
    <NuxtLink to="/">Accueil</NuxtLink>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["getStatus"]),
  },
  mounted() {
    if (this.getStatus != "admin") {
      this.$router.push("/");
    }
  },
};
</script>
