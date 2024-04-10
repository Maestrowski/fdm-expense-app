import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook;

const AuthDetails = () => {
    const { t } = useTranslation(); // Destructure t function from useTranslation

    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
        if (user) {
        setAuthUser(user);
        } else {
        setAuthUser(null);
        }
    });

    return () => {
        listen();
    };
    }, []);

    const userSignOut = () => {
    signOut(auth)
        .then(() => {
        console.log(t("authDetails.signOutConsole"));
        })
        .catch((error) => console.log(error));
    };

    return (
    <div>
        {authUser ? (
        <>
            <p>{t("authDetails.signInStatus")} {authUser.email}</p>
            <button onClick={userSignOut}>{t("authDetails.signOutClick")}</button>
        </>
        ) : (
        <p>{t("authDetails.signOutMessage")}</p>
        )}
    </div>
    );
};

export default AuthDetails;