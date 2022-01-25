<template>
  <div>
    <article class="header-page">
      <aside>
        <h1>
          <span v-if="!getUser">Bonjour, veuillez vous identifier</span>
          <span v-else>Bonjour {{ getUser }}</span>
        </h1>
        <section
          class="info-box"
          v-if="getAdminConfig.nbUsers && getAdminConfig.nbGroups"
        >
          <p>Nombre de personnes max : {{ getAdminConfig.nbUsers }}</p>
          <p>Nombres de personnes par groupe : {{ getAdminConfig.nbGroups }}</p>
        </section>
      </aside>
      <div v-if="getUser">
        <section v-if="getIfAdminConfig && getIsAdmin">
          <p>
            La configuration du profil admin a déjà été effectuée, vous pouvez
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
    </article>

    <button v-if="!getIfAdminConfig" @click="loginAsAdmin">
      Connection en tant qu'Admin
    </button>

    <article v-if="getIsLogged && !getIsAdmin" class="groups">
      <button @click="createGroupUser" :disabled="getInviteLink.length > 0">
        Créer un groupe
      </button>
      <p v-if="getInviteLink">
        Voici le lien de ton groupe : {{ getInviteLink }}
      </p>
      <section class="group-form" v-if="getCreatedGroups.length > 0">
        <div class="form-container">
          <label for="groupname">Lien du groupe</label>
          <input id="groupname" type="text" v-model="groupName" />
        </div>

        <button @click="joinGroup" :disabled="!groupName">
          Rejoindre le groupe
        </button>
      </section>
    </article>

    <article class="user-login-section" v-if="getIfAdminConfig">
      <section v-if="!getIsLogged" class="login">
        <div class="form-container">
          <label for="user">Nom</label>
          <input id="user" type="text" v-model="name" />
        </div>

        <button @click="loginAsUser">Se connecter</button>
      </section>

      <section class="group" v-if="getAvailableGroups.length > 0">
        <div v-for="(item, i) in getAvailableGroups" :key="i">
          <h3>{{ item.name }}</h3>
          <p>Nombres de personnes max : {{ item.nbMax }}</p>
          <p>Membres du groupe :</p>
          <ul>
            <li v-for="user in item.usersInGroup" :key="user">{{ user }}</li>
          </ul>
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
      "quitMyGroup",
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
    quitGroup(name) {
      this.quitMyGroup({ name: name, username: this.getUser });
    },
  },
};
</script>

<style scoped>
h1 {
  font-size: 30px;
  margin-top: 0;
}

aside {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  align-content: center;
  flex-wrap: wrap;

  width: 100%;
}

.info-box {
  border: solid 1px #e1e1e1;
  border-radius: 5px;
  width: 350px;

  padding: 15px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  align-content: center;
}

.info-box p {
  margin: 0;
}

.login div {
  margin-bottom: 20px;
}

.user-login-section div input {
  width: 30%;
}

.group-form div {
  margin-top: 40px;
  margin-bottom: 15px;
}

.group-form input {
  width: 50%;
}

.group {
  margin-top: 25px;
}

.group div {
  padding: 15px;
  border: solid 1px #e1e1e1;
  border-radius: 5px;
  margin-bottom: 25px;
}

.group p {
  margin: 0;
}

.group ul {
  margin-top: 5px;
}
</style>
