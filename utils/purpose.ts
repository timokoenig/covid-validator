import { TFunction } from 'react-i18next'
import { Purpose } from './models'

const purpose = (t: TFunction): Purpose[] => {
  return [
    { title: '3G', info: t('3G') },
    { title: '2G+', info: t('2G+') },
    { title: '2G', info: t('2G') },
    { title: '1G+', info: t('1G+') },
    { title: '1G', info: t('1G') },
  ]
}

export default purpose
