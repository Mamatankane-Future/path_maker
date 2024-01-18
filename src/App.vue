<script setup>
import SelectForm from './components/SelectForm.vue';
import { CFooter} from '@coreui/vue';
</script>

<template>
  <div class="min-vh-100">
    <BNavbar>
      <BNavbarBrand href="">PathMaker</BNavbarBrand>
      <a href="https://github.com/Mamatankane-Future/IIG" class="text-reset"><IRaphaelgithub class="h1 mt-2 mr-2"/></a>
    </BNavbar>
    <div class="container">
      <h2>How does it work?</h2>
      <p>Welcome Path maker! Easily create custom paths using our user-friendly interface. Simply design choose a pictute from your computer and then draw your paths visually, and the application will automatically generate TypeScript/JavaScript code for the corresponding graph structure. Enjoy!😉</p>
    </div>
    <div class="container">
      <SelectForm />
    </div>

    <div class="container mt-5">
      <h2>Final remarks</h2>
      <p>We hope you find our Path maker helpful for your projects! If you appreciate the tool and the effort put into its development, please consider showing your support by giving a star⭐ to the project on GitHub. Your feedback and encouragement are invaluable to us. Thank you for using our SVG generator!🚀</p>
    </div>
    
  </div>

  <CFooter class="mt-5 d-flex justify-content-center">
    <span>Copyright © InteractiveImageGenerator 2024</span>
  </CFooter>
</template>

<style scoped>
  .nav{
    display: flex;
    justify-content: space-between;
    color: #000;
  }


</style>