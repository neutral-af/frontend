import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faArrowDown,
  faArrowRight,
  faInfoCircle,
  faMapMarkerAlt,
  faTicketAlt,
  faPlus,
  faCheck,
  faCreditCard,
  faHandsHelping,
  faPlaneDeparture,
  faPlaneArrival,
  faUser,
  faCircleNotch,
  faCloud,
  faAngleDown
} from '@fortawesome/free-solid-svg-icons'

export default () => {
  library.add(faAngleDown)
  library.add(faArrowDown)
  library.add(faArrowRight)
  library.add(faCloud)
  library.add(faCheck)
  library.add(faCircleNotch)
  library.add(faCreditCard)
  library.add(faHandsHelping)
  library.add(faInfoCircle)
  library.add(faMapMarkerAlt)
  library.add(faPlaneDeparture)
  library.add(faPlaneArrival)
  library.add(faPlus)
  library.add(faTicketAlt)
  library.add(faUser)
}
