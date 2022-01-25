<template>
  <div>
    <h1>Grouper - un site de groupes</h1>
    <p>Bonjour, veuillez vous identifier</p>
    <p>{{ getIsAdmin }}</p>
    <button @click="loginAsAdmin" v-if="!getIfAdminConfig">Admin</button>
    <button v-else>User</button>
    <article class="infos">
      <section v-if="getAdminConfig.nbUsers && getAdminConfig.nbGroups">
        <p>Nombre de personnes max : {{ getAdminConfig.nbUsers }}</p>
        <p>Nombres de personnes par groupe : {{ getAdminConfig.nbGroups }}</p>
      </section>
      <section v-if="getGroupList.length > 0">
        <ul v-for="(item, i) in getGroupList" :key="i">
          <li>{{ item.name }}</li>
          <li>{{ item.nbMax }}</li>
          <li>{{ item.nbUserCurrent }}</li>
          <li>{{ item.usersInGroup }}</li>
        </ul>
      </section>
    </article>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters([
      "getStatus",
      "getAdminConfig",
      "getIfAdminConfig",
      "getIsAdmin",
      "getGroupList",
    ]),
  },
  data() {
    return {};
  },
  mounted() {
    if (!this.getIfAdminConfig) {
      try {
        this.getAdminConfigApi();
        this.getGroupListApi();
      } catch (error) {
        console.error(error);
      }
    }
  },
  methods: {
    ...mapActions([
      "changeStatus",
      "login",
      "getAdminConfigApi",
      "getGroupListApi",
    ]),
    loginAsAdmin() {
      if (!this.getIsAdmin) {
        this.login();
      } else {
        this.$router.push("/admin");
      }
    },
  },
};
</script>
