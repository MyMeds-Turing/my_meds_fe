import { useQuery } from "@apollo/client";
import { clear } from "console";
import React, { useEffect, useState } from "react"
import { GET_USER } from "../../GraphQL/Queries";
import { AllUsersObj, LoginErrorMessage } from '../../interfaces'
import './Login.css'


type LoginProps = {
    setUser: any
    setMeds: any
    setIsLoggedIn: any
    allUsers: AllUsersObj[]
}

const Login: React.FC<LoginProps> = ({ setUser, setMeds, setIsLoggedIn, allUsers }) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [userIDToLogin, setUserIDToLogin] = useState('')
    const [errorMessages, setErrorMessages] = useState<LoginErrorMessage>({ name: '', message: '' });
    // const [isSubmitted, setIsSubmitted] = useState(false);


    const { loading, error, data } = useQuery(GET_USER, {
        variables: {
            userId: userIDToLogin
        }
    })

    useEffect(() => {
        /// change this to be based on what credentials were inputed (if correct)
        //also make sure timing works with sending user to APP 
        if (data) {
            setUser(data.fetchUser);
            setMeds(data.fetchUserRxs)
        }
        console.log(data)
    }, [userIDToLogin]);

    // if (loading) {
    //     return <h1>LOADING...</h1>
    // }

    // if (error) {
    //     console.log(error)
    //     return <h1>SOMETHING WENT WRONG...</h1>
    // }


    const handleSubmit = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        e.preventDefault()
        const userToLogin = allUsers.find((user) => user.email.toLowerCase() === username.toLowerCase());

        if (userToLogin && password === 'password') {
            console.log('userid', userToLogin.id)
            //then fetch the user data based on id and set user and user meds, sending data back up to app 
            setUserIDToLogin(userToLogin.id)


        } else if (password !== 'password') {
            console.log('incorrect password')
            setErrorMessages({ name: "pass", message: errors.pass });
        } else {
            console.log('Username not found')

            setErrorMessages({ name: "uname", message: errors.uname });
        }

    };

    const handleUsernameChange = (userInput: string) => {
        setUsername(userInput)
    }

    const handlePasswordChange = (userInput: string) => {
        setPassword(userInput)
    }

    const renderErrorMessage = (name: string) =>
        name === errorMessages.name && (
            <div className="error">{errorMessages.message}</div>
        );

    const errors = {
        uname: "invalid username",
        pass: "invalid password"
    };

    const clearForm = () => {
        setErrorMessages({ name: '', message: '' })
        setUsername('')
        setPassword('')
    }

    return (
        <div className="login-container">
            <h1 className="page-title">MyMeds</h1>
            <form className="login-form">
                <div className="input-container">
                    <label>Username </label>
                    <input
                        onChange={(e) => handleUsernameChange(e.target.value)}
                        type="text"
                        name="uname"
                        placeholder="email"
                        value={username}
                        required
                    />
                    {renderErrorMessage("uname")}

                </div>
                <div className="input-container">
                    <label>Password </label>
                    <input
                        onChange={(e) => handlePasswordChange(e.target.value)}
                        type="password"
                        name="pass"
                        value={password}
                        placeholder="password"
                        required
                    />
                    {renderErrorMessage("pass")}

                </div>
                <div className="button-container">
                    <input
                        className="submit"
                        type="submit"
                        onClick={(e) => handleSubmit(e)}
                    />

                </div>
            </form>
        </div>
    )
}
export default Login;