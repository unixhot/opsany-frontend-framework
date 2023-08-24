<template>
    <div>
        <content-header></content-header>
        <a-card>

        </a-card>
    </div>
</template>

<script>
import { updateDirector } from "@/api/update-director"
export default {
    data() {
        return {

        }
    },
    mounted() {
        this.updateDirectorData()
    },
    methods: {
        updateDirectorData() {
            updateDirector({ data_type: "all" }).then(res => {

            }).catch(()=>{

            }).finally(()=>{
                
            })
        }
    }
}
</script>

<style>
</style>