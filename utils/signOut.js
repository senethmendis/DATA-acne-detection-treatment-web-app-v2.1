// utils/auth.js

// utils/auth.js
import { getAuth, signOut } from "firebase/auth";

export const signOutUser = async () => {
    const auth = getAuth();
    try {
        await signOut(auth);

        // Clear cookies
        document.cookie.split(";").forEach((cookie) => {
            document.cookie = cookie
                .replace(/^ +/, "")
                .replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`);
        });

        // Clear cache
        if ("caches" in window) {
            caches.keys().then((names) => {
                names.forEach((name) => caches.delete(name));
            });
        }

        // Reload the page
        window.location.reload();

        return { success: true, message: "Sign-out successful" };
    } catch (error) {
        console.error("Error signing out:", error);
        return { success: false, message: error.message };
    }
};


// import { getAuth, signOut } from "firebase/auth";

// export const signOutUser = async () => {
//     const auth = getAuth();
//     try {
//         await signOut(auth);

//         return { success: true, message: "Sign-out successful" };
//     } catch (error) {
//         console.error("Error signing out:", error);
//         return { success: false, message: error.message };
//     }
// };
