<script setup lang="ts">
import { computed } from 'vue';
import { VBtn, VCard, VCardActions, VCardText, VCardTitle, VIcon } from 'vuetify/lib/components/index.mjs';

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: false
  },
  buttons: {
    type: Array as () => any[],
  },
  icon: {
    type: String,
    default: ''
  },
  level: {
    type: String as () => 'info' | 'warning' | 'error' | 'success',
    default: 'info'
  },
  cardOptions: {
    type: Object,
    default: () => ({})
  },
  textHTML: {
    type: String,
    default: ''
  },
})

// ------- EVENTS -------
const emit = defineEmits(['buttonClicked'])

// ------- COMPUTED -------
const _buttons = computed(() => {
  if(props.buttons && props.buttons.length > 0) return props.buttons
  else return [
    { key: 'cancel', title: 'Annuler', value: 'cancel', color: 'grey', variant: 'text' },
    { key: 'ok', title: 'OK', value: 'ok', color: props.level, variant: 'tonal' }
  ]
})

const _icon = computed(() => {
  if (props.icon) return props.icon;
  switch (props.level) {
    case 'info':
      return 'mdi-information'
    case 'warning':
      return 'mdi-alert'
    case 'error':
      return 'mdi-alert-circle'
    case 'success':
      return 'mdi-check-circle'
    default:
      return 'mdi-information'
  }
})

const _color = computed(() => {
  return props.level === 'info' ? 'primary' : props.level
})

// ------- METHODS -------
function close(buttonKey: string | boolean){
  emit('buttonClicked', buttonKey)
}
</script>

<template>
  <VCard class="vuetify3-dialog-card" v-bind="cardOptions">
    <VCardTitle class="d-flex align-center"><VIcon :color="_color" class="mr-2">{{_icon}}</VIcon>{{title}}</VCardTitle>
    <VCardText v-html="textHTML" v-if="textHTML"></VCardText>
    <VCardText v-else>{{text}}</VCardText>
    <VCardActions>
      <VBtn
        v-for="button in _buttons"
        :key="button.key"
        v-bind="button"
        :color="button.color || _color"
        @click="close(button.key)"
      >
        {{button.title}}
      </VBtn>
    </VCardActions>
  </VCard>
</template>
