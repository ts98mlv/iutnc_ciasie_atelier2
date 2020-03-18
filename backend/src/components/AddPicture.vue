<template>
    <div class="AddPhoto">
        <h1>Saluuuuuuuuuuuut</h1>

        <div class="placeTab">
            <h3 class="titreTab">Series</h3>

            <table class="tableau">
                <thead>
                    <tr>
                        <th>Ville</th>
                        <th>Map X</th>
                        <th>Map Y</th>
                        <th>Map zoom</th>
                        <th>Distance</th>
                    </tr>
                </thead>
                    <tr v-for="serie in listOfDatas">
                        <td>{{serie.ville}}</td>
                        <td>{{serie.map_x}}</td>
                        <td>{{serie.map_y}}</td>
                    </tr>

                <tbody>

                </tbody>
            </table>
        </div>
    </div>
    
</template>


<script>
import datas from '../../local-data.json';

export default {
    name: 'addpho',
    data() {
        return {
            series: [
                {
                    ville: 'Mondorff', map_x: "45", map_y: "78"
                }
            ]
        }
    },

    methods: {

    },

    computed: {

        listOfDatas() {
            return datas.series.map(item => {
                return item;
            });
        }
    }
}

</script>

<style>
.tableau {
    border: 1px solid black;
}

</style>