<template>
  <div v-if="getIsAdmin">
    <h1>Page d'admin</h1>
    <article v-if="!getIfAdminConfig">
      <label for="text">Nombre d'utilisateurs max</label>
      <input id="text" type="text" v-model="adminData.nbUsers" /> <br />
      <label for="users">Nombre de groupes max</label>
      <input id="users" type="text" v-model="adminData.nbGroups" /> <br />
      <button
        :disabled="!adminData.nbUsers || !adminData.nbGroups"
        @click="submitData"
      >
        Submit
      </button>
    </article>

    <NuxtLink to="/">Accueil</NuxtLink>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters(["getIsAdmin", "getIfAdminConfig"]),
  },
  data() {
    return {
      adminData: {
        nbUsers: "",
        nbGroups: "",
      },
    };
  },
  mounted() {
    if (!this.getIsAdmin) {
      this.$router.push("/");
    }
  },
  methods: {
    ...mapActions(["createConfig"]),
    submitData() {
      this.createConfig(this.adminData);
    },
  },
};
</script>
