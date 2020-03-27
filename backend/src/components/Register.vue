<template>
    <div class="limiter">
		<div class="container-login100">
			<div class="wrap-login100">
				<form class="login100-form validate-form">
					<span class="login100-form-logo">
						<i class="zmdi zmdi-landscape"></i>
					</span>

					<span class="login100-form-title p-b-34 p-t-27">
						Register
					</span>

					<div class="wrap-input100 validate-input" data-validate = "Enter pseudo">
						<input class="input100" v-model="pseudo" type="text" name="pseudo" placeholder="Pseudo">
					</div>

                    <div class="wrap-input100 validate-input" data-validate="Enter email">
						<input class="input100" type="text" v-model="email" name="email" placeholder="Email">
					</div>

					<div class="wrap-input100 validate-input" data-validate="Enter password">
						<input class="input100" type="password" v-model="password" name="pass" placeholder="Password">
					</div>

                    <div class="wrap-input100 validate-input" data-validate="Enter password">
						<input class="input100" type="password" v-model="password2" name="pass2" placeholder="Confirm Password">
					</div>

					<div class="container-login100-form-btn">
						<button class="login100-form-btn" @click="register">
							S'inscrire
						</button>
					</div>

                    <div class="text-center p-t-90">
						<a class="txt1" href="/auth">
							Déjà inscrit ?
						</a>
					</div>
				</form>
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
		pseudo: '',
		email: '',
		password: '',
		password2: ''
		}
	},

	methods: {
		register() {
			
			if(this.password != this.password2) {
				alert("Les mots de passe ne correspondent pas.")
				return;
			}

			let mailPass = this.email + ':' + this.password;
			let mailPass64 = Buffer.from(mailPass,'utf8').toString('base64');
			let mailPassBasic = 'Basic ' + mailPass64; 

			axios({
                method: "post",
                url: urlAPI + "utilisateurs/",
                headers: {
                    "Authorization": mailPassBasic
				},
				data: {
                "login": this.pseudo,
				"mail": this.mail,
				"mdp": this.password
				}
            
            })
			.then(res => {
				console.log(JSON.parse(res.data).tokenJWT);
				  localStorage.token = JSON.parse(res.data).tokenJWT;
				  localStorage.email = this.email;

				  this.$route.push('/');
			})		
			.catch( err => console.error(err));

			// localStorage.token = this.email + ':' + this.password;
			// localStorage.email = this.email;
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
</style>