<template>
    <Page>
        <ActionBar>
            <Label text="GeoQuiZz"></Label>
        </ActionBar>

        <GridLayout columns="*,*">
            <Button col="0" class="button" text="Prendre une photo" @tap="takePicture"/>
            <Button col="1" class="button" text="Choisir une photo" @tap="selectPicture"/>
            <WrapLayout class="test" col="1" row="2">
                <Image class="test" v-for="(img,index) in images" :src="img.src" width="75" height="75"
                       @tap="gererUpload(index)"/>
            </WrapLayout>
        </GridLayout>
    </Page>
</template>

<script>
    import * as camera from "nativescript-camera";
    import * as imagepicker from "nativescript-imagepicker";

    const bghttp = require("nativescript-background-http");
    const session = bghttp.session("image-upload");
    import {Image} from "tns-core-modules/ui/image";
    import * as geolocation from "nativescript-geolocation";
    import {Accuracy} from "tns-core-modules/ui/enums"; // used to describe at what accuracy the location should be get

    export default {
        computed: {},
        data() {
            return {
                images: [],
                erreurLocation: false,
                location: {},
            }
        },
        methods: {
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
                task.on("responded", (res) => {
                    let result = JSON.parse(res.data);
                    let jsonEnvoi = {
                        "position": {
                            "positionX": this.location.latitude,
                            "positionY": this.location.longitude,
                        },
                        "urlImage": result.data.url,
                    };
                    console.log(jsonEnvoi);
                });
            },
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
                                        alert("J'arrive pas à choper la position "+err.message);
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
                            alert("Erreur permission loc");
                        }
                        else {
                            alert("Pas d'erreur");
                        }
                    })
                });
        }
    };
</script>

<style scoped lang="scss">
    @import '~@nativescript/theme/scss/variables/blue';

    // Custom styles
    .fas {
        @include colorize($color: accent);
    }

    .info {
        font-size: 20;
        horizontal-align: center;
        vertical-align: center;
    }
</style>
