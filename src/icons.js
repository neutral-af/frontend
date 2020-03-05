import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faArrowDown,
  faArrowRight,
  faInfoCircle,
  faMapMarkerAlt,
  faTicketAlt,
  faPlus,
  faCreditCard,
  faHandsHelping
} from '@fortawesome/free-solid-svg-icons'

export default () => {
  library.add(faArrowDown)
  library.add(faArrowRight)
  library.add(faCreditCard)
  library.add(faHandsHelping)
  library.add(faInfoCircle)
  library.add(faMapMarkerAlt)
  library.add(faPlus)
  library.add(faTicketAlt)
}