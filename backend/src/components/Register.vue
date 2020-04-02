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
						Register
					</span>

					<div class="wrap-input100 validate-input" data-validate = "Enter pseudo">
						<input class="input100" v-model="pseudo" type="text" placeholder="Pseudo">
					</div>

                    <div class="wrap-input100 validate-input" data-validate="Enter email">
						<input class="input100" type="text" v-model="email" placeholder="Email">
					</div>

					<div class="wrap-input100 validate-input" data-validate="Enter password">
						<input class="input100" type="password" v-model="password" placeholder="Password">
					</div>

                    <div class="wrap-input100 validate-input" data-validate="Enter password">
						<input class="input100" type="password" v-model="password2" placeholder="Confirm Password">
					</div>

					<div class="container-login100-form-btn">
						<button class="login100-form-btn" @click="register">
							S'inscrire
						</button>
					</div>

                    <div class="text-center p-t-90">
						<a class="txt1" href="/#auth">
							Déjà inscrit ?
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

			// axios.get("http://docketu.iutnc.univ-lorraine.fr:17280/users")
            //     .then(res => {
			// 		console.log("eedf" + res);
			// 	  	// this.$router.push('/auth');
			// 	})		
			// 	.catch( err => console.error(this.pseudo + " " + this.email + " " + this.password +" " + err));

				 axios
					.post('http://docketu.iutnc.univ-lorraine.fr:17280/utilisateurs', 
						this.pseudo,
						this.email,
						this.password)
					.then(function (response) {
						return otpSent("ok " + response)
					})
					.catch(function (error) {
						console.log("pas ok " + JSON.stringify(error));
					});  

		},

		retour() {
        	this.$router.push("/");
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