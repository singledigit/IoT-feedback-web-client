<template>
  <div id="app">
    <section class="hero is-primary is-bold">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title">
            Session Feedback
          </h1>
          <h2 class="subtitle" v-if="isFetched">
            {{info.id}}
          </h2>
        </div>
      </div>
      <div class="container is-hidden-mobile" v-if="isFetched">
        <nav class="level">
          <div class="level-item has-text-centered">
            <div>
              <p class="heading">Total</p>
              <p class="title">{{max}}</p>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div>
              <p class="heading">Cool</p>
              <p class="title">{{info.Cool}}</p>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div>
              <p class="heading">Uncool</p>
              <p class="title">{{info.Uncool}}</p>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div>
              <p class="heading">Undecided</p>
              <p class="title">{{info.Undecided}}</p>
            </div>
          </div>
        </nav>
      </div>
    </section>
    <section class="section" v-if="isFetched">
      <div class="container">
        <div class="columns is-mobile">
          <div class="column has-text-centered">
            <span class="icon has-text-success">
              <font-awesome-icon class="fa-4x" icon="grin" />
            </span>
          </div>
          <div class="column is-four-fifths">
            <progress class="progress is-success is-large" v-bind:value="info.Cool || 0" v-bind:max="max">{{info.Cool}}
              of {{max}}</progress>
          </div>
        </div>
        <div class="columns is-mobile">
          <div class="column has-text-centered">
            <span class="icon has-text-danger">
              <font-awesome-icon class="fa-4x" icon="frown" />
            </span>
          </div>
          <div class="column is-four-fifths">
            <progress class="progress is-danger is-large" v-bind:value="info.Uncool || 0" v-bind:max="max">{{info.Uncool}}
              of {{max}}</progress>
          </div>
        </div>
        <div class="columns is-mobile">
          <div class="column has-text-centered">
            <span class="icon has-text-warning">
              <font-awesome-icon class="fa-4x" icon="meh" />
            </span>
          </div>
          <div class="column is-four-fifths">
            <progress class="progress is-warning is-large" v-bind:value="info.Undecided || 0" v-bind:max="max">{{info.Undecided}}
              of {{max}}</progress>
          </div>
        </div>
        <div class="columns">
          <div class="column is-four-fifths is-offset-one-fifth">
            <div class="columns">
              <div class="column">
                <button class="button is-success is-large is-fullwidth" v-on:click="submitFeedback('SINGLE')">
                  <span class="icon is-small">
                    <font-awesome-icon icon="grin" />
                  </span>
                  <span>Cool</span>
                </button>
              </div>
              <div class="column">
                <button class="button is-danger is-large is-fullwidth" v-on:click="submitFeedback('DOUBLE')">
                  <span class="icon is-small">
                    <font-awesome-icon icon="frown" />
                  </span>
                  <span>Uncool</span>
                </button>
              </div>
              <div class="column">
                <button class="button is-warning is-large is-fullwidth has-text-white" v-on:click="submitFeedback('LONG')">
                  <span class="icon is-small">
                    <font-awesome-icon icon="meh" />
                  </span>
                  <span>Undecided</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="columns">
          <div class="column has-text-centered">
              <img src="./assets/button-small.png">
          </div>
          <div class="column is-four-fifths">
              <div class="level">
                <div class="level-item has-text-centered">
                  <div>
                    <div class="heading">
                      <div class="icon is-medium">
                      <font-awesome-icon class="fa-3x" icon="grin" />
                      </div>
                    </div>
                    <div class="title">Single Click</div>
                  </div>
                </div>
                <div class="level-item has-text-centered">
                  <div>
                    <div class="heading">
                      <div class="icon is-medium">
                      <font-awesome-icon class="fa-3x" icon="frown" />
                      </div>
                    </div>
                    <div class="title">Double Click</div>
                  </div>
                </div>
                <div class="level-item has-text-centered">
                  <div>
                    <div class="heading">
                      <div class="icon is-medium">
                      <font-awesome-icon class="fa-3x" icon="meh" />
                      </div>
                    </div>
                    <div class="title">Long Click</div>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  const axios = require('axios');
  const url = 'https://it2s7ol3k7.execute-api.us-east-1.amazonaws.com/Prod/'
  import { setInterval } from 'timers';
  export default {
    name: 'app',
    data() {
      return {
        model: {Uncool:0, Cool:0, Undecided:0},
        info: {},
        max: 0,
        isFetched: false,
        posting: false
      }
    },
    methods: {
      fetchData: function () {
        axios
          .get(url)
          .then(response => {
            this.info = response.data ? response.data : this.model;
            this.max = (this.info.Uncool || 0) + (this.info.Cool || 0) + (this.info.Undecided || 0);
            this.isFetched = true;
          })
      },
      submitFeedback: function(clickType){
        this.posting = true;
        axios
          .post(url, {clickType: clickType})
          .then(response => {
            this.posting = false;
            if(response.statusCode != 200) console.log(response.body)
          })
      }
    },
    mounted() {
      this.fetchData();
      setInterval(this.fetchData, 1000);
    }
  }
</script>

<style lang="scss"></style>