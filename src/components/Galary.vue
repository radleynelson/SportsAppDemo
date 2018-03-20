<template lang="html">
  <section>
    <div class="title">
      NBA Galary
    </div>
    <h1 class="galary-intro">
      Welcome to the community NBA Galary! This galary of images is open to the public,
      please fill free to enter a new URL to add and image to the galary, or if you don't like
      an image then fill free to enter the URL of a new image in the input box just above the image
      you wish to replace. We ask that you please use this responsibly and only post appropriate images.
      If you chose to post something inapropriate we will band you from every using RSPN again. Also plese make
      sure that the URL you paste in the input boxes are actual image URLs or it won't add the image. Thanks and enjoy.
    </h1>
    <form v-on:submit.prevent="addImage">
      <label style="font-size: 20px;">Add an image: </label><input type="text" v-model="changeURL">
      <button style="font-size: 15px" type="submit" name="button">Add Image</button>
    </form>
    <br>
    <div id="parent">
      <div v-for="(image, index) in images">
        <label>Change Image URL:</label>
        <template style="width: 25%"><input type="text" v-model="url[index]" value=""></template>
        <button v-on:click="updateImage(image,index)" type="button" name="button">Change Image</button>
        <a v-on:click="deleteImage(index)"><i class="fa fa-trash fa-2x"></i></a>
        <img :src="image.url" style="margin-top: 10px">
      </div>
    </div>
  </section>

</template>

<script>
import axios from 'axios';
export default {
  name: 'Galary',
  data() {
    return {
      images: [],
      url: [],
      changeURL: "",

    }
  },
  created: function() {
    this.getImages();
  },
  computed: {

  },

  methods: {
    getImages: function(){
      axios.get("/api/images").then(response =>{
        this.images = response.data;
        return true;
      }).catch(err =>{
        console.log(err);
      })
    },
    addImage: function(){
      axios.post("/api/images",{
        url: this.changeURL
      }).then(response =>{
        this.url = "";
        this.getImages();
        return true;
      }).catch(err =>{
        console.log(err);
      })
    },
    updateImage: function(image, index){
      axios.put('/api/image/' + image.id, {
        url: this.url[index],
        id: this.id,

      }).then(response => {
        this.getImages()
        this.url[index] = "";
        return true;
      }).catch(err => {
        console.log(err);
      })
    },
    deleteImage: function(index){
      axios.delete("/api/images/" + this.images[index].id).then(response => {
        this.getImages();
        return true;
      }).catch(err =>{
        console.log(err);
      })
    },

  }

}
</script>

<style>


</style>

<style scoped>
.title{
  font-size: 50px;
}

#parent{
  display: grid;
  grid-template: auto auto auto/1fr 1fr 1fr;
  grid-column-gap: 10px;
  grid-row-gap: 15px;
}
img{
  width: 100%;
}
.galary-intro{
  font-size: 18px;
  width: 75%;
  text-align: left;
  margin: auto;
  margin-bottom: 35px;
}
input, select {
    padding: .75em .5em;
    font-size: 100%;
    border: 1px solid #ccc;
    width: 25%;
    height: 20px;
}

</style>
