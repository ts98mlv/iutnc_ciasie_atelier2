<template>
    <StackLayout>
        <Label text="Créer une nouvelle série" class="text-center h2"></Label>
        <TextField v-model="ville" hint="Ville"></TextField>
        <Button @tap="nouvelleSerie" text="Créer"></Button>
    </StackLayout>
</template>

<script>
    import axios from "axios";
    import localStorage from "nativescript-localstorage";

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
            nouvelleSerie() {

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
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("tokenJWT")}`,
                        mail: localStorage.getItem("mail"),
                    },
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

            },
        },
        created() {
        }
    }
</script>

<style>

</style>
