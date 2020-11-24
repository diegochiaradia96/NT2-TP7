<template>
<div class="jumbotron">
  
    <div class="text-center ml-3"><h3>Nueva tarea</h3></div>

    <form novalidate autocomplete="off" class="p-3 mt-3 text-left" @submit.prevent="send()">
      <div class="form-group col-4">
          <label for="nombre"><h4>Nombre</h4></label>
          <input 
            type="text"
            id="nombre"
            class="form-control"
            v-model="v.f.nombre.$model"
          >
          <div v-if="v.f.nombre.$error && v.f.nombre.$dirty" class="alert alert-danger mt-1">
            <div v-if="v.f.nombre.required.$invalid">Este campo es requerido</div>
          </div>
      </div>
          <div class="form-group col-4">
                <label for="email"><h4>Email</h4></label>
                <input 
                    type="email"
                    id="email"
                    class="form-control"
                    v-model="v.f.email.$model"
                >
                <div v-if="v.f.email.$error && v.f.email.$dirty" class="alert alert-danger mt-1">
                    <div v-if="v.f.email.required.$invalid">Este campo es requerido</div>
                    <div v-if="v.f.email.email.$invalid">Debe proveer un email válido</div>
                </div>
          </div>
          <div class="form-group  col-4">
                <label for="descripcion"><h4>Descripción</h4></label>
                <input 
                    type="text-area"
                    id="descripcion"
                    class="form-control"
                    v-model="v.f.descripcion.$model"
                 >
                <div v-if="v.f.descripcion.$error && v.f.descripcion.$dirty" class="alert alert-danger mt-1">
                    <div v-if="v.f.descripcion.required.$invalid">Este campo es requerido</div>
                    <div v-if="v.f.descripcion.minLength.$invalid">Este campo debe tener al menos {{v.f.descripcion.minLength.$params.min}} caracteres</div>
                    <div v-if="v.f.descripcion.maxLength.$invalid">Este campo debe tener máximo {{v.f.descripcion.maxLength.$params.max}} caracteres</div>
                </div>
          </div>
          
     <div id="botones" class="form-group">
        <div class="text" align="right">   
          
          <input
            id="publicar"
            type="submit"
            :disabled="v.$invalid"
            class="btn btn-dark"
            value="Publicar"
          >
          &nbsp;
          &nbsp;
          
          <input
            id="cancelar"
            type="button"
            @click="cancel()"
            class="btn btn-light"
            value="Cancelar"
          >
        </div>
        </div>
    </form>
 
</div>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength,  maxLength } from '@vuelidate/validators'  
import { reactive } from 'vue'
 
  export default  {
    name: 'src-components-form',
    props: [],
    mounted () {

    },
    data () {
      return {
         
          url : 'https://5fb95bc62f145f0016c3ce0b.mockapi.io/tareas/'
      }
    },
     setup () {
      const f = reactive({
        nombre: '',
        descripcion: '',
        email: '',
      })
      const rules = {
        f: {
          nombre: { 
            required
          },
          descripcion: { 
            required,
            maxLength: maxLength(50),
            minLength: minLength(10)
          },
          email: {
            required,
            email
          }
        }
      }
      const v = useVuelidate(rules, { f })
      return { f,v }
    },
   
    methods: {
      async sendDatosFormAxios(datos) {
            try {
                let res = await this.axios.post(this.url, datos, {'content-type': 'application/json'})
                console.log(res.data)
            }
            catch(error) {
              console.log('HTTP POST ERROR', error)
            }
        },
        async getDatosFormAxios() {
            try {
              let res = await this.axios(this.url)
              console.log(res.data)
            }
            catch(error) {
              console.log('HTTP GET ERROR', error)
            }
        },
        async send() {
            this.v.$touch()
            if(!this.v.$invalid) {
              let form = this.f
              console.log(form)
              await this.sendDatosFormAxios(form)
              this.$router.push({ name: 'Home' })
              this.f = this.resetForm()
              this.v.$reset()
              
            }
        },
        cancel() {
        this.resetForm()
        this.v.$reset()
        this.$router.push({ name: 'Home' })
        },
        resetForm() {
            return {
               nombre: '',
               descripcion : '',
               email : ''
            }
        }
    },
    computed: {

    }
}


</script>

<style scoped lang="css">
  .src-components-form {

  }
</style>
