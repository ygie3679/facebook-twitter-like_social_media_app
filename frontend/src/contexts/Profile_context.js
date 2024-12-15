import React, {useContext, useState} from "react";
import * as service from "../users/hooks/Auth";

const Profile_context = React.createContext();

export const ProfileProvider = ({children}) => {
    const [user, setUser] = useState(null);

    const userSignin = async (email, password) => {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!email || !password) {
            alert("Please enter your EMAIL and PASSWORD");
            return;
        }
        if (!re.test(email)) {
            alert("Please enter a valid email");
            return;
        }
        try {
            const response = await service.signin(email, password);
            if (response.status) {
                setUser(response);
            }
            console.log("Signed in!");
            return true;
        } catch (error) {
            console.error("Error during signin:", error);
        }
    };

    const checkLoggedIn = async () => {
        try {
            const data = await service.account();
            setUser(data);
            return data
        } catch (e) {
            throw e
        }
    }
    const userSignup = async (email, username, password) => {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!email || !password || !username) {
            alert("Please enter your EMAIL and PASSWORD and USERNAME");
            return;
        }
        if (!re.test(email)) {
            alert("Please enter a valid email");
            return;
        }
        if (password.length < 6) {
            alert("Please enter a valid password which has at least 6 characters");
            return;
        }
        try {
            const data = await service.signup(email, username, password);
            setUser(data);
            return true;
        } catch (error) {
            console.error("Error during signup:", error);
        }
    };

    const logout = async () => {
        try {
            await service.logout();
            setUser(null);
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    const value = {user, userSignin, checkLoggedIn, userSignup, logout}
    return (
        <Profile_context.Provider value={value}>
            {children}
        </Profile_context.Provider>
    )
}

export const useProfile = () => {
    return useContext(Profile_context)
}