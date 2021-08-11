<template>
  <div>
    <h1>Ooops!!!!!!!!!!!</h1>
    <h2>It looks like the page you're looking for doesn't exits</h2>
    <p>
      Let take you back to
      <b><router-link :to="{ name: 'Register' }">Home</router-link></b>
    </p>
  </div>
</template>

<script>
export default {
  name: "NotFound",
};
</script>