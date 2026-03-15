import type { App } from 'vue';
import { createToastflow, ToastContainer } from 'vue-toastflow';
export function registerToast(app: App) {
  app.use(
    createToastflow({
      position: 'bottom-left',
      order: 'newest',
      duration: 3000,
      maxVisible: 3,
      progressBar: true,
      pauseOnHover: false,
      closeButton: false,
      closeOnClick: true,
    }),
  );
  app.component('ToastContainer', ToastContainer);
}
