<template>
<div id="app">
    <v-container fluid class="myGrid">
      <v-card class="orange" color="orange lighten-2" tile flat>
        <v-card-text>Card 1</v-card-text>
      </v-card>
      <v-card class="red" color="black lighten-2" dark tile flat style="width:30%;">
        <v-card-text class="black--text">
          <div>
              sdfdsfdsfdsfdsfdsafsdfdsfdsfdsfdsfdsfsdfdsfdsfsdfdsfdsf
          </div>
        </v-card-text>
      </v-card>
      <v-card class="purple" color="purple lighten-1" tile flat>
        <v-card-text>{{lorem}} {{lorem}}</v-card-text>
      </v-card>
    </v-container>
</div>
</template>
<style>
    .myGrid {
    display: grid;
    grid-template-columns: auto auto auto;         
    grid-template-rows: repeat(3, 1fr) auto auto;
    grid-template-areas: 
        "orange orange red"
        "orange orange red"
        "orange orange red"
        "purple purple red"
        "purple purple red"
        ;
    grid-gap: 0.5rem;
    }
    .orange { grid-area: orange }
    .indigo1 { grid-area: indigo1 }
    .indigo2 { grid-area: indigo2 }
    .indigo3 { grid-area: indigo3 }
    .red { grid-area: red }
    .green { grid-area: green }
    .purple { grid-area: purple }
    .blue { grid-area: blue }
</style>