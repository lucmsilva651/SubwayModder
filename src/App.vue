<template>
  <header>
    <img src="/logo.avif" alt="Logo">
  </header>
  <a href="https://github.com/lucmsilva651/SubwayModder" target="_blank" rel="noopener noreferrer">
    {{ $t('message.sourceCode') }}
  </a>
  <main>
    <RouterView />
  </main>

  <footer>
    <p>&copy; {{ new Date().getFullYear() }} Lucas Gabriel (lucmsilva) & Daniel Oliveira (Drexx).</p>
  </footer>
</template>

<style scoped>
footer {
  margin-bottom: 1%;
}

a, footer {
  font-size: 1em;
  margin-top: .5em;
  color: black;
  /*
  Source - https://stackoverflow.com/a/13427256
  Posted by bookcasey, modified by community. See post 'Timeline' for change history
  Retrieved 2026-03-18, License - CC BY-SA 4.0
  */

  text-shadow: 2px 0 #fff, -2px 0 #fff, 0 2px #fff, 0 -2px #fff,
              1px 1px #fff, -1px -1px #fff, 1px -1px #fff, -1px 1px #fff;

  text-decoration: none;
}

header img {
  height: 150px;
}

main {
  margin: 1em 0;
  background: #0e0e0e;
  border: 1px solid #2a2a2a;
  border-radius: 6px;
  padding: 1.4rem 1.6rem;
  min-width: 220px;
  color: #d0d0d0;
}

@media screen and (max-width: 600px) {
  header img {
    height: 120px;
  }

  a, footer {
    font-size: 1em;
  }
}
</style>