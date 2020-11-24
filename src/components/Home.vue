<template>
  <div class="jumbotron">
    <!-- ------------------ -->
    <!-- Temas de discusión -->
    <!-- ------------------ -->
    <div id="encabezado">
    <h2>Lista de tareas</h2>
    <div class= "text" align="right">
      <button id="crearTarea" class="btn btn-primary" @click="crearTarea()">Crear tarea <b>+</b></button>
     </div>
      
    </div>
    <hr />
    <br>
    <div v-if="tareas.length">
      <table class="table">
        <thead class="thead-dark">
          <tr :style="{color:'NAVY'}">
            <th scope="col">Nombre</th>
            <th scope="col">Descripcion</th>
            <th scope="col">Email</th>
            <th scope="col">Fecha de creación</th>
          </tr>
        </thead>
        <tr v-for="(tarea, index) in tareas" :key="index">
          <td scope="col"> <p>{{ pasarAMayuscula(tarea.nombre) }}</p> </td>
          <td scope="col"> <p>{{ tarea.descripcion }}</p> </td>
          <td scope="col"> <a><b>{{ tarea.email }}</b></a> </td>
          <td scope="col"> <p>{{ formatearFechaHora(tarea.createdAt) }}</p> </td>                   
          <td scope="col"> <button id="verTema" class="btn btn-dark" @click="eliminarTarea(tarea.id)">Eliminar</button> </td>
        </tr>
      </table>
    </div>
    <div v-if ="!tareas.length" class="alert alert-warning"> <h5>No hay tareas creadas</h5> </div>
    <div class="footer-copyright text-center py-3">© Diego Chiaradia TP7 </div>
    
  </div>
</template>

<script>
  import filters from '../filters'

  export default  {
    name: 'src-components-home',
    components: {
    },
    props: [],
    mixins: [filters],
    mounted () {
      this.getTareaFormAxios()
    },
    data () {
      return {
        tareas: [],
        url: 'https://5fb95bc62f145f0016c3ce0b.mockapi.io/tareas'
      }
    },
    methods: {
      crearTarea() {
        this.$router.push({ name: 'Form' })
        console.log("Entro al fomulario")
      },
      
      /* Pedido de datos almacenados en MockAPI */
      async getTareaFormAxios() {
        try {
          let res = await this.axios(this.url)
          this.tareas = res.data
          console.log(res.data)
        } 
        catch(error) {
          console.log('HTTP GET ERROR', error)
        }
      },
      eliminarTarea(id) {
          console.log('delete',id)

          this.axios.delete(this.url+id)
            .then(res => {
              let tarea = res.data
              console.log(tarea)
              let offset = this.tareas.findIndex(tarea => tarea.id == id)
              this.tareas.splice(offset,1)
            })
            .catch(error => console.log('HTTP DELETE ERROR', error))
      }
    },
    computed: {
      }
    
  }
</script>

<style scoped lang="css">
  #encabezado {
    display: inline;
  }
  .h2 {
    text-align: left;
  }
  #crearTema {
    float: right;
  }
</style>
