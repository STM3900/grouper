<template>
  <div class="wrapper">
    <Navbar />
    <Nuxt />
    <Footer />
  </div>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: 0.3s;
  opacity: 1;
}
.page-enter,
.page-leave-to {
  opacity: 0;
}
</style>
