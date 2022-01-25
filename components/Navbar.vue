<template>
  <header>
    <h2>Grouper - un site de groupes</h2>
  </header>
</template>

<script>
export default {
  name: "Navbar",
};
</script>

<style scoped>
header {
  margin-bottom: 25px;
  border-bottom: solid 1px #e1e1e1;
  transition: 0.3s;
}

header h2 {
  font-family: "Asap", sans-serif;
  font-size: 18px;
  font-weight: 500;
}

@media screen and (max-width: 460px) {
  header h2 {
    font-size: 16px;
  }

  header h1 span .icon-logo {
    margin-left: -4px;
    margin-bottom: 2px;
  }
}

@media screen and (max-width: 400px) {
  header h2 {
    font-size: 14px;
  }

  header h2 span .icon-logo {
    font-size: 8px;
    margin-left: -3px;
    margin-bottom: 2px;
  }
}
</style>
