import React, {useContext, useState, useEffect} from 'react'
import {auth} from '../base' //Gives us access to the auth object which initializes authentication
//Below are firebase objects we need to use in our logic below (in the component portion of the code)
import { GithubAuthProvider, signInWithPopup, signOut } from 'firebase/auth'

//Below we create a context (storage object) for all of our auth info
const AuthContext = React.createContext()

//Below we create a function that will allow us to use the context in components. We will import this function
//anytime we want the currentUser, login, or logout functionality.
export function useAuth(){
    return useContext(AuthContext)
}

//This component will provide the AuthContext info to the children components nested inside of it. See App.js
//where we call to an instance of this component and nest all other components inside of it.
export default function AuthProvider({children}){
    //Create React Hooks for currentUser and another custom hook to determine if the context has info to share
    //with child components before rendering those children to screen
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)
    
    //Login functionality
    //First we instantiate a GitHub AuthProvider object
    const githubAuthProvider = new GithubAuthProvider()

    async function login(){
        return (signInWithPopup(auth, githubAuthProvider).then(authData => {
            console.log(authData)
            setCurrentUser(authData.user)
            //Here we could add addition functionality we want to fire off upon a user logging in.
            //For example, I could give a role or save their info to a local DB.
        }))
    }

    //Logout functionality
    async function logout(){
        signOut(auth).then(setCurrentUser(null))
    }

    //The object below will hold currentUser info and login/logout functions so we can use them in
    //the child components. We will pass this as a prop in the return below.
    const value = {currentUser, login, logout}

    useEffect(() => {
        //authChange will use firebase functionality to get user info, set currentUser hook to value retrieved,
        //and allow components to load in usering our custom hook
        const authChange = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })

        return authChange
    }, []);

    return (
        <AuthContext.Provider value={value}>
            {/* Below we are waiting for the AuthContext info to populate before loading the children in the UI */}
            {!loading && children}
        </AuthContext.Provider>
    )
}