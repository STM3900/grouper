<template>
  <div v-if="getIsAdmin">
    <h1>Page de configuration</h1>
    <article v-if="!getIfAdminConfig">
      <div class="form-container">
        <label for="text">Nombre d'utilisateurs max</label>
        <input id="text" type="text" v-model="adminData.nbUsers" />
      </div>
      <div class="form-container">
        <label for="users">Nombre de groupes max</label>
        <input id="users" type="text" v-model="adminData.nbGroups" />
      </div>

      <button
        :disabled="!adminData.nbUsers || !adminData.nbGroups"
        @click="submitData"
      >
        Valider
      </button>

      <NuxtLink to="/">Accueil</NuxtLink>
    </article>
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

<style scoped>
article {
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: center;

  gap: 20px;
}

article a {
  font-family: "Open Sans", sans-serif;

  background: none;
  transition: 0.3s;
  padding: 8px 15px;

  border-radius: 5px;
  border: none;
  border: solid 1px;

  margin-bottom: 10px;
  font-size: 13px;

  color: rgb(50, 50, 50);
  text-decoration: none;
}

article a:hover {
  cursor: pointer;
  transform: scale(0.99);
}

article a:active {
  transform: scale(0.93);
}
</style>
