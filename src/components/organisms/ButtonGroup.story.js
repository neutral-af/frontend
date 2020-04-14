import '../../assets/css/main.css'
import ButtonGroup from './ButtonGroup.vue'

export default {
  component: ButtonGroup,
  title: 'ButtonGroup'
}

export const all = () => ({
  components: { ButtonGroup },
  template: `
    <ButtonGroup>
      <Button>Test 1</Button>
      <Button>Test 2</Button>
      <Button>Test 3</Button>
    </ButtonGroup>
  `
})
