
<script setup lang="ts">
const {
  language,
  setLanguage
} = useLanguage()
</script>

<template>
  <div class="language-switcher">
    <button
      type="button"
      :class="{ active: language === 'en' }"
      @click="setLanguage('en')"
    >
      🇬🇧 EN
    </button>

    <button
      type="button"
      :class="{ active: language === 'pl' }"
      @click="setLanguage('pl')"
    >
      🇵🇱 PL
    </button>
  </div>
</template>
