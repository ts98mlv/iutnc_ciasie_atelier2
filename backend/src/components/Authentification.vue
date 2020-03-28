<template>
    <div class="limiter">
		<div class="container-login100">
			<div class="wrap-login100">
				<div class="login100-form validate-form">
				<div class="btn-back row">
					<div class="back ml-4" @click="retour"><i class="fas fa-chevron-left"></i> Retour</div>
				</div>
					<span class="login100-form-logo">
						<i class="zmdi zmdi-landscape"></i>
					</span>

					<span class="login100-form-title p-b-34 p-t-27">
						Log in
					</span>

					<div class="wrap-input100 validate-input" data-validate = "Enter email">
						<input class="input100" type="text" placeholder="Email" v-model="email">
                        
					</div>

					<div class="wrap-input100 validate-input" data-validate="Enter password">
						<input class="input100" type="password" placeholder="Password" v-model="password">
					</div>

					<div class="container-login100-form-btn">
						<button class="login100-form-btn" v-on:click="cnxUser">
							Login
						</button>
					</div>
										
                    <div class="text-center p-t-90">
						<a class="txt1" href="/inscription">
							Pas encore inscrit ?
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>


</template>

<script>
import axios from "axios"

const urlAPI = "http://docketu.iutnc.univ-lorraine.fr:17280/"

export default {

	data () {
		return {
		password: '',
		email: '',
		isLogged: false
		}
	},

	methods: {
		cnxUser() {
			let mailPass = this.email + ':' + this.password;
			let mailPass64 = Buffer.from(mailPass,'utf8').toString('base64');
			let mailPassBasic = 'Basic ' + mailPass64; 

			axios({
                method: "post",
                url: urlAPI + "utilisateurs/" + this.email + "/auth",
                headers: {
                    "Authorization": mailPassBasic
                }
            })
			.then(res => {
				JSON.parse(res.data).tokenJWT;
				  localStorage.token = JSON.parse(res.data).tokenJWT;
				  localStorage.email = this.email;

				  this.$router.push('/');
			})		
			.catch( err => console.error(err));
		},

		retour() {
        this.$router.push("/");
    }
	},

	watch:{
		token(newToken) {
			localStorage.token = newToken;
		}
  }
}
</script>

<style scoped>
@import '../../vendor/bootstrap/css/bootstrap.min.css';
@import '../assets/fonts/font-awesome-4.7.0/css/font-awesome.min.css';
@import '../assets/fonts/iconic/css/material-design-iconic-font.min.css';
@import '../../vendor/animate/animate.css';
@import '../../vendor/css-hamburgers/hamburgers.min.css';
@import '../../vendor/select2/select2.min.css';
@import '../../vendor/daterangepicker/daterangepicker.css';
@import '../assets/css/util.css';
@import '../assets/css/main.css';

.limiter {
    background-image: url('https://1-background.com/images/black-dreams/black-dreams-in-purple-website-background.jpg');
    background-size: 800px;
}

.container-login100::before {
    position: relative !important;
}

.container-login100 {
	padding: 50px;
}

a {
    cursor: pointer;
}

.back {
  font-size: 1.3em;
  padding: 4px;
  padding-left: 7px;
  padding-right: 7px;
  border-radius: 8px;
  cursor: pointer;
}
</style>