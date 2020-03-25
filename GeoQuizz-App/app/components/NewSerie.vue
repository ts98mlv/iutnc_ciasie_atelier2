<template>
    <StackLayout>
        <Label text="Créer une nouvelle série" class="text-center h2"></Label>
        <TextField v-model="ville" hint="Ville"></TextField>
        <Button @tap="creerSerie" text="Créer"></Button>
    </StackLayout>
</template>

<script>
    import axios from "axios";

    export default {
        props: ["location"],
        data() {
            return {
                ville: "",
                urlAPI: "http://docketu.iutnc.univ-lorraine.fr:17080/",
                connection: "",
            }
        },
        methods: {
            creerSerie() {
                if (this.ville !== "") {
                    let jsonEnvoi = {
                        "ville": this.ville,
                        "map_refs": {
                            "map_x": this.location.longitude,
                            "map_y": this.location.latitude,
                            "map_zoom": 0,
                        }
                    };
                    console.log(jsonEnvoi)
                    axios({
                        method: "POST",
                        url: this.urlAPI + "series",
                        data: jsonEnvoi,
                    })
                        .then((res) => {
                            alert("Série crée !");
                            this.$modal.close(res);
                        })
                        .catch((err) => {
                            alert("Impossible de créer la série !");
                            this.$modal.close(err);
                        })
                } else {
                    this.$modal.close();
                }
            },
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
    }
</script>

<style>

</style>
