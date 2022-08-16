import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react"
import { GET_ALL_USERS } from "../../GraphQL/Queries";
import { AllUsersObj, LoginErrorMessage } from '../../interfaces'
import './Login.css'


type LoginProps = {
    setUser: any
    setIsLoggedIn: any
}

const Login: React.FC<LoginProps> = ({ setUser }) => {


    const [allUsers, setAllUsers] = useState<AllUsersObj[]>([]);
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessages, setErrorMessages] = useState<LoginErrorMessage>({ name: '', message: '' });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { loading, error, data } = useQuery(GET_ALL_USERS)
    useEffect(() => {
        if (data) {
            setAllUsers(data);
        }
        console.log(data)
    }, [data]);

    if (loading) {
        return <h1>LOADING...</h1>
    }

    if (error) {
        console.log(error)
        return <h1>SOMETHING WENT WRONG...</h1>
    }


    const handleSubmit = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        console.log(e)
        console.log(allUsers.find((user) => user.email.toLowerCase() === username.toLowerCase()))
        // Find user login info
        // const userData = allUsers.find((user) => user.email.toLowerCase() === username.toLowerCase());

        // // Compare user info
        // if (userData) {
        //     if (password !== 'password') {
        //         // Invalid password
        //         setErrorMessages({ name: "pass", message: errors.pass });
        //     } else {
        //         setIsSubmitted(true);
        //     }
        // } else {
        //     // Username not found
        //     setErrorMessages({ name: "uname", message: errors.uname });
        // }
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