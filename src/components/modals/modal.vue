<template>
    <v-dialog
        v-model="props.dialog"
        width="auto"
        @click:outside="close()"
      >
        <v-card>
          <v-card-text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" block @click="close()">Close Dialog</v-btn>
          </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
    import { defineEmits, defineProps } from 'vue';

    const props = defineProps({
        dialog: Boolean
    })
    const emits = defineEmits(['toggle']);

    function close() {
        emits('toggle');
    }

</script>
