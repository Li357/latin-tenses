<template>
  <div class="info">
    <span class="dictionary-form" v-html="dictionaryForm"></span>
    <div class="conjugations">
      <div class="singular">
        <div
          v-for="(example, index) of examples[0].slice(0, 3)"
          :key="example"
          class="example"
        >
          <div v-html="ending(example)"></div>
          <div class="translation">{{ examples[1][index] }}</div>
        </div>
      </div>
      <div class="plural">
        <div
          v-for="(example, index) of examples[0].slice(3)"
          :key="example"
          class="example"
        >
          <div v-html="ending(example)"></div>
          <div class="translation">{{ examples[1][index + 3] }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'info',
  props: ['conjugation', 'tense'],
  computed: {
    dictionaryForm() {
      const [trans, ...forms] = this.verbs[this.conjugation];
      const html = forms
        .map((form, index) => (
          this.tense.pp === index ? `<span class="pp">${form}</span>` : form
        ))
        .join(', ');
      return `${html}: ${trans}`;
    },
    examples() {
      return this.tense.examples[this.conjugation];
    },
  },
  methods: {
    ending(str) {
      const index = str.indexOf('|');
      return `${str.substring(0, index)}<span class="ending">${str.substring(
        index + 1,
      )}</span>`;
    },
  },
};
</script>

<style lang="stylus">
.dictionary-form
  color: #D4D4D4
  font-size: 30px

  & .pp
    font-weight: 700
    color: white

.conjugations
  display: flex
  font-size: 30px
  color: #D4D4D4
  margin: 20px 0
  line-height: 40px
  flex-flow: row wrap

  & > *
    flex: 1
    min-width: 350px
    padding: 10px 0
    & .example
      display: flex
      & *
        flex: 1
        & .ending
          font-weight: 700
          color: white
      & .translation
        flex: 2

@media (max-width: 1850px)
  .conjugations > *
    min-width: 100%

  .translation
    flex: 1 !important
</style>
