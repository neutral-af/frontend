<template>
  <Layout>
    <h1 class="title">
      Health
    </h1>
    <div v-if="$page !== null && $page.fromBackend.health">
      <i class="fas fa-check" /> Connected to GraphQL backend
    </div>
    <div v-else>
      <i class="fas fa-times" /> Unable to connect to GraphQL backend
    </div>
  </Layout>
</template>

<page-query>
query {
  fromBackend { health }
}
</page-query>
