<template>
  <div id="tabBar">
    <Menu
        name="New App"
        default-icon-text="NA"
        size="40"
    />
    <Menu
        name="New App"
        default-icon-text="NA"
        size="40"
    />
    <Menu
        name="New App"
        default-icon-text="NA"
        size="40"
    />
    <Menu
        name="New App"
        default-icon-text="NA"
        size="40"
    />
    <Menu
        name="New App"
        default-icon-text="NA"
        size="40"
    />
    <Menu
        name="New App"
        default-icon-text="NA"
        size="40"
    />
    <Menu
        name="New App"
        default-icon-text="NA"
        size="40"
    />
    <Menu
        name="New App"
        default-icon-text="NA"
        size="40"
    />
  </div>
</template>

<script setup>
import Menu from "@/components/Menu.vue";
</script>

<style scoped>
#tabBar {
  position: fixed;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  height: 65px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  display: inline-flex;
  padding: 0 15px;
  gap: 10px;
  align-items: center;
}
</style>