<template>
  <div class="tense">
    <vue-typer
      :text="tense"
      eraseStyle="backspace"
      :repeat="0"
      :eraseDelay="eraseDelay"
      :preEraseDelay="0"
      ref="typer"
    ></vue-typer>
    <div class="tense-info">
      <div class="description">{{ description }}</div>
      <section class="verb-tabs">
        <div
          v-for="(verb, index) of verbs"
          :key="verb[1]"
          :class="['verb-tab', { active: conjugation === index }]"
          @click="changeConj(index);"
        >
          <span>{{ verb[2] }}</span>
        </div>
      </section>
      <info
        :tense="tenseData"
        :conjugation="conjugation"
        :style="infoStyle"
      ></info>
    </div>
  </div>
</template>

<script>
import debounce from 'debounce';
import Info from './Info';

export default {
  name: 'tense',
  data() {
    return {
      tense: this.$route.params.tense,
      eraseDelay: 100,
      conjugation: 0,
      infoStyle: {
        opacity: 1,
      },
    };
  },
  components: { Info },
  computed: {
    tenseData() {
      return this.tenses.find(({ name }) => name === this.tense);
    },
    description() {
      return this.tenseData.descriptions[this.conjugation];
    },
  },
  created() {
    this.debounced = debounce((to) => {
      this.$refs.typer.startErasing();
      setTimeout(() => {
        this.updateInfoStyle(() => {
          this.tense = to.params.tense;
        });
      }, this.tense.length * this.eraseDelay);
    }, 500);
  },
  beforeRouteUpdate(to, from, next) {
    this.debounced(to);
    next();
  },
  methods: {
    changeConj(index) {
      this.updateInfoStyle(() => {
        this.conjugation = index;
      });
    },
    updateInfoStyle(callback = () => {}, delay = 500) {
      this.infoStyle = {
        opacity: 0,
        transform: 'translateY(50%)',
      };
      setTimeout(() => {
        callback();
        this.infoStyle = {
          opacity: 1,
          transform: '',
        };
      }, delay);
    },
  },
};
</script>

<style lang="stylus">
.tense
  overflow-y: scroll
  position: relative
  background-color: #0900FF
  font-family: 'Roboto', Helvetica, Arial, sans-serif
  flex: 7
  padding: 150px 200px
  clip-path: polygon(
    0 0,
    100% 0,
    100% 150%,
    10vh 150%
  )
  min-width: 750px

.tense-info
  top: 300px
  left: 200px
  right: 200px
  bottom: 150px
  position: absolute

.description
  font-weight: 700
  font-size: 30px
  color: #D4D4D4

.verb
  &-tabs
    display: flex
    margin: 50px 0

  &-tab
    flex: 1
    font-size: 25px

    & span
      color: #D4D4D4
      transition: color 0.5s
      -webkit-user-select: none
      -moz-user-select: none
      -ms-user-select: none
      user-select: none

    &.active span
      color: white
      font-weight: 700
      border-bottom: 5px solid white

.vue-typer
  font-size: 120px
  font-weight: 700
  display: inline-block

  .custom
    &.caret
      &.typing, &.erasing
        background-color: white
        width: 5px

    &.char.typed
      color: white

  &-caret-blink
    animation: vue-typer-caret-blink 0.75s step-start 0s infinite !important

.info
  transition: all 0.5s
</style>
