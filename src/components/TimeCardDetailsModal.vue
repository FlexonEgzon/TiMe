<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import type { TimeCard } from '../stores/types/TimeCard'
import type { SaveDetailsPayload } from '../types/TimeCardDetailsPayload'

const props = defineProps<{ card: TimeCard }>() //Interface of Timecard that makes possible to use it in the template

const emit = defineEmits<{
    (e: 'close-modal', id: number): void
    (e: 'save-modal', payload: SaveDetailsPayload): void
}>()

const closeModal = () => {
    emit('close-modal', props.card.id)
}
const saveModal = () => {
    const payload = {
        id: props.card.id,
        title: draftTitle.value,
        description: draftDescription.value
    }
    emit('save-modal', payload)
}

//Global Event so the whole Modal can be tracked of Keypresses instead of only areas like Textarea or Titel 
function onKeydown(e: KeyboardEvent) {
    console.log("key: ", e)
    if (e.key === 'Escape') {
        e.preventDefault()
        closeModal()
        return
    }

    const isSaveCombo = (e.ctrlKey || e.metaKey) && e.key === 'Enter'
    if (isSaveCombo) {
        e.preventDefault()
        saveModal()
    }

}

onMounted(async () => {
    await nextTick()
    modalRootEl.value?.focus()
})

const draftTitle = ref<string>(props.card.title)
const draftDescription = ref<string>(props.card.description ?? '')
const modalRootEl = ref<HTMLDivElement | null>(null)


</script>

<template>

    <Teleport to="body">

        <div @keydown.capture="onKeydown" tabindex="0" ref="modalRootEl"
            class="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 p-4 sm:p-8">
            <div class="w- max-w-3xl rounded-xl bg-gray-50 shadow-2xl ring-1 ring-black/5">
                <!-- HEADER -->
                <div class="flex items-start gap-3 border-b border-gray-200 px-5 py-4">
                    <!-- left icon -->
                    <div class="flex-1">


                        <input v-model="draftTitle" class="mt-1 w-full truncate rounded-md bg-transparent px-2 py-1 text-xl font-extrabold text-gray-900
                     outline-none ring-0 focus:bg-white focus:ring-2 focus:ring-blue-500" placeholder="Title" />
                    </div>

                    <button @click="closeModal" type="button"
                        class="rounded-full p-2 text-gray-500 transition hover:bg-gray-200 hover:text-gray-700"
                        aria-label="Close">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                            stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>

                    </button>
                </div>

                <!-- BODY -->
                <div class="px-5 py-5">
                    <div class="flex items-start gap-3">
                        <!-- description -->
                        <div
                            class="mt-1 flex h-9 w-9 items-center justify-center rounded-lg bg-white ring-1 ring-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                            </svg>

                        </div>

                        <div class="flex-1">
                            <div class="flex items-center justify-between">

                            </div>

                            <textarea v-model="draftDescription" rows="6" class="mt-2 w-full resize-none rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900
                       outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Add a more detailed description..." />
                        </div>
                    </div>
                </div>
                <!-- FOOTER -->
                <div class="flex items-center justify-end gap-2 border-t border-gray-200 px-5 py-4">
                    <button @click="closeModal" type="button"
                        class="rounded-lg px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-200">
                        Cancel
                    </button>

                    <button @click="saveModal" type="button"
                        class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700">
                        Save
                    </button>
                </div>
            </div>
        </div>
    </Teleport>
</template>