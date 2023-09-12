import dayjs from 'dayjs'
import isYesterday from 'dayjs/plugin/isYesterday'
import isToday from 'dayjs/plugin/isToday'
import { type UserModule } from '~/types'

dayjs.extend(isYesterday)
dayjs.extend(isToday)

export const install: UserModule = ({ app }) => {
   app.config.globalProperties.$dayjs = dayjs
}
