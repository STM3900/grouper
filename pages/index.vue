<template>
  <div>
    <h1>Grouper - un site de groupes</h1>
    <p v-if="!getUser">Bonjour, veuillez vous identifier</p>
    <div v-else>
      <p>Bonjour {{ getUser }}</p>
      <section v-if="getIfAdminConfig && getIsAdmin">
        <p>
          La configuration du profil admin à déjà été effectuée, vous pouvez
          vous déconnecter
        </p>
        <button @click="logOut">Se déconnecter</button>
      </section>
      <section v-else-if="getIsAdmin">
        <p>
          La configuration du site n'est pas achevée, vous pouvez la régler en
          cliquant sur le bouton
        </p>
      </section>
      <section v-else>
        <button @click="logOut">Se déconnecter</button>
      </section>
    </div>

    <button v-if="!getIfAdminConfig" @click="loginAsAdmin">Admin</button>

    <article v-if="getIsLogged && !getIsAdmin" class="groups">
      <button @click="createGroupUser">Créer un groupe</button>
      <p v-if="getInviteLink">
        Voici le lien de ton groupe : {{ getInviteLink }}
      </p>
      <section v-if="getCreatedGroups.length > 0">
        <label for="groupname">Nom du groupe</label>
        <input id="groupname" type="text" v-model="groupName" /><br />
        <button @click="joinGroup">Rejoindre le groupe</button>
      </section>
    </article>

    <article class="infos" v-if="getIfAdminConfig">
      <section v-if="!getIsLogged" class="login">
        <label for="user">Nom</label>
        <input id="user" type="text" v-model="name" /><br />
        <button @click="loginAsUser">Se connecter</button>
      </section>

      <section v-if="getAdminConfig.nbUsers && getAdminConfig.nbGroups">
        <p>Nombre de personnes max : {{ getAdminConfig.nbUsers }}</p>
        <p>Nombres de personnes par groupe : {{ getAdminConfig.nbGroups }}</p>
      </section>
      <section v-if="getAvailableGroups.length > 0">
        <div v-for="(item, i) in getAvailableGroups" :key="i">
          <h3>{{ item.name }}</h3>
          <p>Nombres de personnes max : {{ item.nbMax }}</p>
          <p>
            Membres du groupe :
            <ul><li v-for="user in item.usersInGroup" :key="user">{{ user }}</li></ul>
          </p>
          <button @click="quitGroup(item.name)">Quitter le groupe</button>
        </div>
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
      "getUser",
      "getIsLogged",
      "getAllUsersFront",
      "getAvailableGroups",
      "getInviteLink",
      "getCreatedGroups",
    ]),
  },
  data() {
    return {
      name: "",
      groupName: "",
    };
  },
  mounted() {
    if (!this.getIfAdminConfig) {
      try {
        this.getAdminConfigApi();
        this.getGroupListApi();
        this.getUserApi();
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
      "getUserApi",
      "logOut",
      "register",
      "authUser",
      "createGroup",
      "joinGroupLink",
      "quitMyGroup"
    ]),
    loginAsAdmin() {
      if (!this.getIsAdmin) {
        this.login("admin");
      } else {
        this.$router.push("/admin");
      }
    },
    loginAsUser() {
      this.authUser(this.name);
    },
    createGroupUser() {
      this.createGroup(this.getUser);
    },
    joinGroup() {
      this.joinGroupLink({ url: this.groupName, username: this.getUser });
    },
    quitGroup(name){
      this.quitMyGroup({name: name, username: this.getUser})
    }
  },
};
</script>
