<template>
    <div class="box has-text-weight-bold" :style="estilos">
        <!-- Slot é o conteúdo que vai estar dentro deste componente Ex: <Box> conteúdo <Box/> -->
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'Box',
    data() {
        return {
            estilos: {
                // usamos camelCase aqui não seria background-color
                backgroundColor: '#faf0ca'
            }
        }
    }

})
</script>
