import Vue from "nativescript-vue";

import LoginPage from "~/components/LoginPage";

new Vue({

    template: `
        <Frame>
            <LoginPage />
        </Frame>`,

    components: {
        LoginPage
    }
}).$start();
