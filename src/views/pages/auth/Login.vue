<script setup>
import { useLayout } from '@/layout/composables/layout';
import { ref, computed } from 'vue';
import AppConfig from '@/layout/AppConfig.vue';
import { auth, googleProvider, facebookProvider, appleProvider } from '@/firebase';
import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'vue-router';
import store from '@/store';

const { layoutConfig } = useLayout();
const email = ref('');
const password = ref('');
const router = useRouter();
const showValidation = ref(false);

const logoUrl = computed(() => {
    return `/layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.svg`;
});

const isValidEmail = computed(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.value);
});

const validatePassword = () => {
    return password.value.length >= 6; // Adjust as per your requirements
};

const handleSignInWithEmailAndPassword = async () => {
    showValidation.value = true;
    try {
        if (!isValidEmail.value || !validatePassword()) {
            return;
        }

        const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
        const user = userCredential.user;
        
        store.dispatch('login', true);
        router.push({ name: 'dashboard' });
    } catch (error) {
        console.error("Error signing in with email and password:", error);
    }
};

const handleGoogleSignIn = async () => {
    try {
        await signInWithPopup(auth, googleProvider);
        store.dispatch('login', true); // Update the store
        router.push({ name: 'dashboard' }); // Redirect to dashboard after successful sign-in
    } catch (error) {
        console.error("Error signing in with Google: ", error);
    }
};

const handleFacebookSignIn = async () => {
    try {
        await signInWithPopup(auth, facebookProvider);
        store.dispatch('login', false); // Update the store
        router.push({ name: 'dashboard' }); // Redirect to dashboard after successful sign-in
    } catch (error) {
        console.error("Error signing in with Facebook:", error);
    }
};

const handleAppleSignIn = async () => {
    try {
        await signInWithPopup(auth, appleProvider);
        store.dispatch('login', false); // Update the store
        router.push({ name: 'dashboard' }); // Redirect to dashboard after successful sign-in
    } catch (error) {
        console.error("Error signing in with Apple:", error);
    }
};
</script>

<template>
    <div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="flex flex-column align-items-center justify-content-center">
            <img :src="logoUrl" alt="Sakai logo" class="mb-5 w-6rem flex-shrink-0" />
            <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
                    <div class="text-center mb-5">
                        <img src="/demo/images/login/avatar.png" alt="Image" height="50" class="mb-3" />
                        <div class="text-900 text-3xl font-medium mb-3">Welcome, Isabel!</div>
                        <span class="text-600 font-medium">Sign in to continue</span>
                    </div>

                    <div>
                        <label for="email1" class="block text-900 text-xl font-medium mb-2">Email
                            <span v-if="showValidation && !isValidEmail" class="text-red-500">Please enter a valid email address.</span>
                        </label>
                        <InputText id="email1" type="text" placeholder="Email address" class="w-full md:w-30rem mb-5" style="padding: 1rem" v-model="email" />
                        
                        <label for="password1" class="block text-900 font-medium text-xl mb-2">Password
                            <span v-if="showValidation && !validatePassword()" class="text-red-500">Password must be at least 6 characters.</span>
                        </label>
                        <Password id="password1" v-model="password" placeholder="Password" :toggleMask="true" class="w-full mb-3" inputClass="w-full" :inputStyle="{ padding: '1rem' }"></Password>

                        <Button label="Sign In" class="w-full p-3 text-xl mb-5" @click="handleSignInWithEmailAndPassword"></Button>

                        <div class="text-center mb-5">
                            Or sign in with
                        </div>

                        <div class="flex justify-content-center gap-3">
                            <Button label="Google" icon="pi pi-google" class="p-button-outlined" @click="handleGoogleSignIn"></Button>
                            <Button label="Facebook" icon="pi pi-facebook" class="p-button-outlined" @click="handleFacebookSignIn"></Button>
                            <Button label="Apple" icon="pi pi-apple" class="p-button-outlined" @click="handleAppleSignIn"></Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <AppConfig simple />
</template>

<style scoped>
.pi-eye {
    transform: scale(1.6);
    margin-right: 1rem;
}

.pi-eye-slash {
    transform: scale(1.6);
    margin-right: 1rem;
}
</style>
