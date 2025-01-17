import { InjectionKey, Ref, inject, provide, reactive, ref } from '@vue/composition-api'

import { isNotSupportedIOS } from './browserCheck'
import { useGA } from './useGA'

export const useModal = (defaultOpen = false): [Ref<boolean>, { open: () => void, dismiss: () => void }] => {
  const state = ref(defaultOpen)

  const open = () => {
    state.value = true
  }

  const dismiss = () => {
    state.value = false
  }

  return [
    state,
    {
      open,
      dismiss
    }
  ]
}

const ModalStateSymbol: InjectionKey<ModalState> = Symbol('ModalStateSymbol')

export const provideModalState = () => {
  const modalState = reactive({
    updateFactorySuccessModal: false,
    updateFactoryImageSuccessModal: false,
    createFactorySuccessModal: false,
    aboutModalOpen: false,
    contactModalOpen: false,
    safetyModalOpen: false,
    gettingStartedModalOpen: localStorage.getItem('use-app') !== 'true',
    tutorialModalOpen: false,
    distinctionModalOpen: false,
    supportIOSVersionModalOpen: isNotSupportedIOS(),

    sidebarOpen: false,
    filterModalOpen: false
  })

  provide(ModalStateSymbol, modalState)

  return modalState
}

type ModalState = ReturnType<typeof provideModalState>

type ModalActions = {
  openUpdateFactorySuccessModal: Function,
  openUpdateFactoryImagesSuccessModal: Function,

  openCreateFactorySuccessModal: Function,
  closeCreateFactorySuccessModal: Function,

  openAboutModal: Function,
  closeAboutModal: Function,

  openContactModal: Function,
  closeContactModal: Function,

  openSafetyModal: Function,
  closeSafetyModal: Function,

  openGettingStartedModal: Function,
  closeGettingStartedModal: Function,

  toggleSidebar: Function,

  closeFilterModal: Function,
  openFilterModal: Function,

  closeTutorialModal: Function,
  openTutorialModal: Function,
  openDistinctionModal: Function,
  closeDistinctionModal: Function,

  closesupportIOSVersionModal: Function
}

export const useModalState: () => [ModalState, ModalActions] = () => {
  const modalState = inject(ModalStateSymbol)

  if (!modalState) {
    throw new Error('Use useModalState before provideModalState')
  }
  const { event } = useGA()

  const openUpdateFactoryImagesSuccessModal = () => {
    modalState.updateFactoryImageSuccessModal = true

    window.setTimeout(() => {
      modalState.updateFactoryImageSuccessModal = false
    }, 3000)
  }

  const openUpdateFactorySuccessModal = () => {
    modalState.updateFactorySuccessModal = true

    window.setTimeout(() => {
      modalState.updateFactorySuccessModal = false
    }, 3000)
  }

  const openCreateFactorySuccessModal = () => {
    modalState.createFactorySuccessModal = true
    window.setTimeout(() => {
      modalState.createFactorySuccessModal = false
    }, 3000)
  }
  const closeCreateFactorySuccessModal = () => { modalState.createFactorySuccessModal = false }

  const openAboutModal = () => { modalState.aboutModalOpen = true }
  const closeAboutModal = () => { modalState.aboutModalOpen = false }

  const openContactModal = () => { modalState.contactModalOpen = true }
  const closeContactModal = () => { modalState.contactModalOpen = false }

  const openSafetyModal = () => { modalState.safetyModalOpen = true }
  const closeSafetyModal = () => { modalState.safetyModalOpen = false }

  const openGettingStartedModal = () => { modalState.gettingStartedModalOpen = true }
  const closeGettingStartedModal = () => { modalState.gettingStartedModalOpen = false }

  const openTutorialModal = () => { modalState.tutorialModalOpen = true }
  const closeTutorialModal = () => { modalState.tutorialModalOpen = false }
  const openDistinctionModal = ()=>{
    modalState.distinctionModalOpen = true
  }
  const closeDistinctionModal = ()=>{
    modalState.distinctionModalOpen = false
  }

  const closesupportIOSVersionModal = () => { modalState.supportIOSVersionModalOpen = false }

  const toggleSidebar = () => {
    const open = !modalState.sidebarOpen
    event('toggleSidebar', { target: open })
    modalState.sidebarOpen = open
  }

  const closeFilterModal = () => {
    event('closeFilterModal')
    modalState.filterModalOpen = false
  }
  const openFilterModal = () => {
    event('openFilterModal')
    modalState.filterModalOpen = true
  }

  const modalActions = {
    openUpdateFactorySuccessModal,
    openUpdateFactoryImagesSuccessModal,

    openCreateFactorySuccessModal,
    closeCreateFactorySuccessModal,

    openAboutModal,
    closeAboutModal,

    openContactModal,
    closeContactModal,

    openSafetyModal,
    closeSafetyModal,

    openGettingStartedModal,
    closeGettingStartedModal,

    openTutorialModal,
    closeTutorialModal,

    openDistinctionModal,
    closeDistinctionModal,

    toggleSidebar,
    openFilterModal,
    closeFilterModal,

    closesupportIOSVersionModal
  }

  return [modalState, modalActions]
}
