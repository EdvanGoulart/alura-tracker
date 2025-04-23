<template>
  <main class="columns is-gapless is-multiline" :class="{ 'modo-escuro': modoEscuroAtivo }">
    <div class="column is-one-quarter">
      <!-- escutando o evento e recebenndo o parâmetro que é retornado: modoEscuroAtivo -->
      <barra-lateral @aoTemaAlterado="trocarTema" />
    </div>
    <div class="column is-three-quarter conteudo">
      <Notificacoes></Notificacoes>
      <!-- AQUI VAI A VIEW CORRESPONDENTE -->
      <router-view></router-view>

    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BarraLateral from './components/BarraLateral.vue';
import Notificacoes from './components/Notificacoes.vue';



export default defineComponent({
  name: 'App',
  components: {
    BarraLateral,
    Notificacoes,
  },
  data() {
    return {
      modoEscuroAtivo: false
    }
  },
  computed: {
  },
  methods: {
    // Obs: poderia receber dois parâmetros aqui sem problemas, mas dependeria do que foi enviado no evento -> aoTemaAlterado
    trocarTema(modoEscuroAtivo: boolean) {
      this.modoEscuroAtivo = modoEscuroAtivo
    }
  }
});
</script>

<style>
.lista {
  padding: 1.25rem;
}

main {
  --bg-primario: #fff;
  --texto-primario: #000;
}

main.modo-escuro {
  --bg-primario: #2b2d42;
  --texto-primario: #ddd;
}

.conteudo {
  background-color: var(--bg-primario);
}
</style>
