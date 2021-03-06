<template>
    <Page actionBarHidden="true">
        <FlexboxLayout class="page">
            <StackLayout class="form">
                <Label class="header" text="GeoQuiZz"/>

                <StackLayout v-show="!isLoggingIn" class="input-field">
                    <TextField ref="pseudo" class="input" hint="Nickname" autocorrect="false"
                               v-model="user.nickname" returnKeyType="next"
                               fontSize="18"/>
                    <StackLayout class="hr-light"/>
                </StackLayout>
                <StackLayout class="input-field" marginBottom="25">
                    <TextField class="input" hint="Email" keyboardType="email" autocorrect="false"
                               autocapitalizationType="none" v-model="user.email"
                               returnKeyType="next" @returnPress="focusPassword" fontSize="18"/>
                    <StackLayout class="hr-light"/>
                </StackLayout>

                <StackLayout class="input-field" marginBottom="25">
                    <TextField ref="password" class="input" hint="Password" secure="true" v-model="user.password"
                               :returnKeyType="isLoggingIn ? 'done' : 'next'"
                               @returnPress="focusConfirmPassword" fontSize="18"/>
                    <StackLayout class="hr-light"/>
                </StackLayout>

                <StackLayout v-show="!isLoggingIn" class="input-field">
                    <TextField ref="confirmPassword" class="input" hint="Confirm password" secure="true"
                               v-model="user.confirmPassword" returnKeyType="done"
                               fontSize="18"/>
                    <StackLayout class="hr-light"/>
                </StackLayout>


                <Button :text="isLoggingIn ? 'Log In' : 'Sign Up'" @tap="submit" class="btn btn-primary m-t-20"/>
<!--                <Label v-show="isLoggingIn" text="Forgot your password?" class="login-label" @tap="forgotPassword"/>-->
            </StackLayout>

            <Label class="login-label sign-up-label" @tap="toggleForm">
                <FormattedString>
                    <Span :text="isLoggingIn ? 'Don’t have an account? ' : 'Back to Login'"/>
                    <Span :text="isLoggingIn ? 'Sign up' : ''" class="bold"/>
                </FormattedString>
            </Label>
        </FlexboxLayout>
    </Page>
</template>

<script>
    import Home from "./Home";
    import axios from "axios";
    import * as btoa from 'btoa';
    import localStorage from "nativescript-localstorage";
    import {encode, decode} from "base-64";
    import * as utf8 from "utf8";

    const connectivityModule = require("tns-core-modules/connectivity");

    const Buffer = require('buffer/').Buffer;

    const urlAPI = "http://docketu.iutnc.univ-lorraine.fr:17080/";

    //Gère connexion/Inscription
    const userService = {
        register(user) {
            if (user.nickname !== "" && user.password === user.confirmPassword && user.password !== "" && user.email !== "") {
                // alert("Premier test !");
                return axios({
                    method: "POST",
                    url: urlAPI + "utilisateurs",
                    data: {
                        "login": user.nickname,
                        "mail": user.email,
                        "mdp": user.password,
                    }
                });
            } else {
                return Promise.reject("Remplir tous les champs.");
            }
        },
        login(user) {
            let token = Buffer.from(`${user.email}:${user.password}`, 'utf8').toString('base64');
            return axios({
                method: "post",
                url: urlAPI + "utilisateurs/" + user.email + "/auth",
                headers: {
                    "Authorization": `Basic ${token}`
                }
            })
        },
    };

    export default {
        data() {
            return {
                isLoggingIn: true,
                user: {
                    nickname: "michel",
                    email: "michel@test.fr",
                    password: "michel",
                    confirmPassword: "",
                    connection: "",
                }
            };
        },
        mounted() {
            if (!global.btoa) {
                global.btoa = encode;
            }
        },
        methods: {
            toggleForm() {
                this.isLoggingIn = !this.isLoggingIn;
            },

            submit() {
                if (!this.user.email || !this.user.password) {
                    this.alert(
                        "Please provide both an email address and password."
                    );
                    return;
                }
                if (this.isLoggingIn) {
                    this.login();
                } else {
                    this.register();
                }
            },

            login() {
                userService
                    .login(this.user)
                    .then((res) => {
                        localStorage.setItem("tokenJWT", res.data.tokenJWT);
                        localStorage.setItem("mail", this.user.email);
                        this.$navigateTo(Home);
                    })
                    .catch((err) => {
                        this.alert("Unfortunately we could not find your account.");
                    });
            },

            register() {
                if (this.user.password !== this.user.confirmPassword) {
                    this.alert("Your passwords do not match.");
                    return;
                }

                userService
                    .register(this.user)
                    .then((res) => {
                        this.alert("Your account was successfully created.");
                        this.isLoggingIn = true;
                    })
                    .catch((err) => {
                        if (err.response.status === 500) {
                            alert("Un compte avec cet email existe déjà.");
                        } else {
                            this.alert(
                                "Unfortunately we were unable to create your account. "
                            );
                        }

                    });
            },
            focusPassword() {
                this.$refs.password.nativeView.focus();
            },
            focusConfirmPassword() {
                if (!this.isLoggingIn) {
                    this.$refs.confirmPassword.nativeView.focus();
                }
            },

            alert(message) {
                return alert({
                    title: "GeoQuiZz",
                    okButtonText: "OK",
                    message: message
                });
            }
        },
        created() {
            connectivityModule.startMonitoring(newConnectionType => {
                switch (newConnectionType) {
                    case connectivityModule.connectionType.none:
                        this.connection = "none";
                        alert("Vous n'avez pas internet !");
                        break;
                    case connectivityModule.connectionType.wifi:
                        if (this.connection === "none") {
                            alert("Vous avez de nouveau internet");
                        }
                        this.connection = "wifi";
                        break;
                    case connectivityModule.connectionType.mobile:
                        if (this.connection === "none") {
                            alert("Vous avez de nouveau internet");
                        }
                        this.connection = "mobile";
                        break;
                }
            });
        }
    };
</script>

<style scoped>
    .page {
        align-items: center;
        flex-direction: column;
    }

    .form {
        margin-left: 30;
        margin-right: 30;
        flex-grow: 2;
        vertical-align: middle;
    }

    .logo {
        margin-bottom: 12;
        height: 90;
        font-weight: bold;
    }

    .header {
        horizontal-align: center;
        font-size: 25;
        font-weight: 600;
        margin-bottom: 70;
        text-align: center;
        color: #D51A1A;
    }

    .input-field {
        margin-bottom: 25;
    }

    .input {
        font-size: 18;
        placeholder-color: #A8A8A8;
    }

    .input-field .input {
        font-size: 54;
    }

    .btn-primary {
        height: 50;
        margin: 30 5 15 5;
        background-color: #D51A1A;
        border-radius: 5;
        font-size: 20;
        font-weight: 600;
    }

    .login-label {
        horizontal-align: center;
        color: #A8A8A8;
        font-size: 16;
    }

    .sign-up-label {
        margin-bottom: 20;
    }

    .bold {
        color: #000000;
    }
</style>
