<template>
    <Page>
        <ActionBar>
            <Label text="GeoQuiZz"></Label>
        </ActionBar>

        <StackLayout>
            <Label v-if="images.length !== 0" class="h5 text-center" text="Cliquer sur l'image pour l'upload"></Label>
            <WrapLayout class="test">
                <Image class="test" v-for="(img,index) in images" :src="img.src" width="120" height="120"
                       @tap="gererUpload(index)"/>
            </WrapLayout>
            <StackLayout>
                <Progress v-if="upload" v-bind:value="progress" maxValue="100" color="green"></Progress>
                <Button class="btn-primary" text="Prendre une photo" @tap="takePicture"/>
                <Button class="btn-primary" text="Choisir une photo" @tap="selectPicture"/>
            </StackLayout>
            <Button class="btn-primary" text="Créer une série" @tap="creerSerie"/>
        </StackLayout>
    </Page>
</template>
<script>
    import * as camera from "nativescript-camera";
    import * as imagepicker from "nativescript-imagepicker";
    import axios from "axios";

    const bghttp = require("nativescript-background-http");
    const connectivityModule = require("tns-core-modules/connectivity");
    const session = bghttp.session("image-upload");
    import {Image} from "tns-core-modules/ui/image";
    import * as geolocation from "nativescript-geolocation";
    import {Accuracy} from "tns-core-modules/ui/enums"; // used to describe at what accuracy the location should be get
    import localStorage from "nativescript-localstorage";
    import NewSerie from "./NewSerie";

    export default {
        computed: {
            afficherCo() {
                console.log(this.connection);
                return this.connection;
            }
        },
        data() {
            return {
                images: [],
                erreurLocation: false,
                upload: false,
                progress: 0,
                location: {},
                connection: "",
                urlAPI: "http://docketu.iutnc.univ-lorraine.fr:17080/",
            }
        },
        methods: {
            creerSerie() {
                //Récupération position
                geolocation.getCurrentLocation({
                    desiredAccuracy: Accuracy.high,
                    maximumAge: 5000,
                    timeout: 20000
                })
                    .then(result => {
                        console.log(result)
                        this.location = result;
                        this.$showModal(NewSerie, {props: {location: this.location}}).then((res) => {
                            if (res.response.status !== 200) {
                                console.log(res);
                            }
                        });
                    })
                    .catch(err => {
                        alert("J'arrive pas à choper la position " + err.message);
                    });


            },
            //Choix de l'image dans la galerie
            selectPicture() {

                let context = imagepicker.create({
                    mode: 'multiple'
                });

                context.authorize()
                    .then(function () {
                        return context.present();
                    })
                    .then(selection => {
                        selection.forEach(selected => {
                            let img = new Image();
                            img.src = selected;
                            this.images.push(img);

                        });
                    }).catch(function (e) {
                    console.log('error in selectPicture : ', e);
                });

            },
            //Upload l'image sur imgBB et ensuite, envoie les données à l'API
            gererUpload(args) {
                const key = "6bd91e436b3a802783b6bdea2bd530da";
                let urlApi = "https://api.imgbb.com/1/upload?key=" + key;
                let path = this.images[args].src._android;

                const request = {
                    url: urlApi,
                    method: "POST",
                    headers: {
                        "Content-type": "application/octet-stream"
                    },
                    description: "Uploading"
                };

                const params = [
                    {
                        name: "image",
                        filename: path,
                        mimeType: "img/jpeg",
                        localisation: "Nancy"
                    }
                ];

                const task = session.multipartUpload(params, request);
                this.upload = true;
                task.on("progress", (e) => {
                    this.progress = Math.floor(((e.currentBytes / e.totalBytes) * 100));
                });
                task.on("responded", (res) => {
                    this.upload = false;
                    let result = JSON.parse(res.data);
                    let jsonEnvoi = {
                        "position": {
                            "positionX": this.location.longitude,
                            "positionY": this.location.latitude,
                        },
                        "urlImage": result.data.url,
                    };
                    axios({
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("tokenJWT")}`,
                            mail: localStorage.getItem("mail"),
                        },
                        url: this.urlAPI + "photos",
                        data: jsonEnvoi
                    }).then((res) => {
                        console.log(res);
                    }).catch(err => {
                        console.log(err)
                    });
                    console.log(jsonEnvoi);
                });
            },
            //Fonction permettant de prendre une photo, et, qui prend la position ensuite
            takePicture() {
                camera.requestPermissions()
                    .then(() => {
                        camera.takePicture({width: 300, height: 300, keepAspectRatio: true, saveToGallery: false})
                            .then(imageAsset => {
                                let img = new Image();
                                img.src = imageAsset;
                                this.images.push(img);

                                //Récupération position
                                geolocation.getCurrentLocation({
                                    desiredAccuracy: Accuracy.high,
                                    maximumAge: 5000,
                                    timeout: 20000
                                })
                                    .then(result => {
                                        console.log(result)
                                        this.location = result;
                                    })
                                    .catch(err => {
                                        alert("J'arrive pas à choper la position " + err.message);
                                    });

                            })
                            .catch(e => {
                                console.log('error: ', e);
                            });
                    })
                    .catch(e => {
                        console.log('Error requesting permission');
                    });
            },
        },
        created() {


            geolocation.enableLocationRequest(true)
                .then(() => {
                    geolocation.isEnabled().then(locActive => {
                        if (!locActive) {
                            alert("Erreur permission localisation.");
                        }
                    })
                })
                .catch((err) => {
                    alert("Vous devez autoriser l'utilisation de votre localisation !")
                });

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

<style scoped lang="scss">
    @import '~@nativescript/theme/scss/variables/blue';

    .btn-primary {
        height: 50;
        margin: 10 5 15 5;
        background-color: #D51A1A;
        border-radius: 5;
        font-size: 20;
        font-weight: 600;
        width: 100%;
    }


    ActionBar {
        horizontal-align: center;
        font-size: 25;
        font-weight: 600;
        margin-bottom: 70;
        text-align: center;
        background-color: #D51A1A;
    }


    // Custom styles
    .fas {
        @include colorize($color: accent);
    }

    Progress {
        margin-top: 10;
    }

    .info {
        font-size: 20;
        horizontal-align: center;
        vertical-align: center;
    }
</style>
