<template>
    <v-dialog
        v-model="dialog"
        width="80%"
        @click:outside="close()"
      >
        <v-card class="pt-4">

            <v-card-text class="mt-2">{{props.title}}</v-card-text>

                <slot></slot>

          <v-card-actions>
            <v-btn color="primary" block @click="close()">Close</v-btn>
          </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
    
    import { defineEmits, defineProps } from 'vue';

    const dialog = ref(true);

    const props = defineProps({
        title: String
    })
    const emits = defineEmits(['toggle']);

    function close() {
        emits('toggle');
    }

</script>
