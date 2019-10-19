<template>
  <div class="hero is-dark is-fullheight wrapper">
    <header class="hero-head">
      <MainNav />
    </header>
    <div class="hero-body">
      <form
        action=""
        class="form"
        @submit.prevent="onSubmit"
      >
        <div class="field">
          <label
            label-for="departure"
          >
            <span class="input-label">Departure</span>
            <input
              id="departure"
              type="text"
              class="input"
              name="departure"
              placeholder="e.g. Milan Malpensa or MXP"
            >
          </label>
        </div>
      </form>
    </div>
    <div class="hero-foot">
      <MainFoot />
    </div>
  </div>
</template>

<script>
import MainNav from '@/components/organisms/MainNav'
import MainFoot from '@/components/organisms/MainFoot'

export default {
  components: {
    MainNav,
    MainFoot
  }
}
</script>

<style lang="scss" scoped>
.wrapper {

}

.form {
  width: 100%;
}

.input {
  background: none;
  color: $text-invert;
  border-top: 0;
  border-left: 0;
  border-right: 0;
  border-radius: 0;
  width: 100%;

  &:focus {
    box-shadow: none;
  }

  &::placeholder {
    color: $grey-light;
  }
}

.input-label {
  @extend %sr-only;
}
</style>
