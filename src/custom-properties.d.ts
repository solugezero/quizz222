// import Vue from 'vue'

import { Dayjs } from 'dayjs';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $dayjs(date?: dayjs.ConfigType, option?: dayjs.OptionType, locale?: string): dayjs.Dayjs;
  }
}