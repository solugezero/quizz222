import VueLazyLoad from 'vue3-lazyload';
import { type UserModule } from '~/types'


export const install: UserModule = ({ app }) => {
   app.use(VueLazyLoad);
}
