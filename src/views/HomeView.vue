<script setup>
import { Icon } from "@iconify/vue";
</script>

<template>
  <div class="container">
    <RouterLink to="/hacks" class="cards">
      <Icon icon="mdi:guy-fawkes-mask"></Icon>
      {{ $t('message.hacks') }}
    </RouterLink>
    <RouterLink to="/textures" class="cards">
      <Icon icon="mdi:format-paint"></Icon>
      {{ $t('message.textures') }}
    </RouterLink>
    <RouterLink to="/about" class="cards">
      <Icon icon="mdi:information-circle"></Icon>
      {{ $t('message.about') }}
    </RouterLink>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  gap: 20px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.cards {
  background-color: #1f1f1f;
  border: 1px solid white;
  padding: 20px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  font-size: 2em;
  gap: 7px;
  border-radius: 5px;
  text-decoration: none;
  color: white;
}

.cards svg {
  font-size: 1.6em;
}

@media screen and (max-width: 600px) {
  .container {
    flex-direction: column;
  }

  .cards {
    padding: 20px 10px;
    flex-direction: row;
    justify-content: center;
    width: 100%;
  }
}
</style>