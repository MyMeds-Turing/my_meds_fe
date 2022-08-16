import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react"
import { GET_ALL_USERS } from "../../GraphQL/Queries";


type LoginProps = {
    setUser: any
    setIsLoggedIn: any
}

const Login: React.FC<LoginProps> = ({ setUser }) => {


    const [allUsers, setAllUsers] = useState([]);
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { loading, error, data } = useQuery(GET_ALL_USERS)
    useEffect(() => {
        /// change this to be based on what credentials were inputed (if correct)
        if (data) {
            setAllUsers(data);
        }
        console.log(data)
    }, [data]);



    // const handleSubmit = (event) => {
    //     //Prevent page reload
    //     event.preventDefault();

    //     var { uname, pass } = document.forms[0];

    //     // Find user login info
    //     const userData = allUsers.find((user) => user.email === uname.value);

    //     // Compare user info
    //     if (userData) {
    //         if (userData.password !== pass.value) {
    //             // Invalid password
    //             setErrorMessages({ name: "pass", message: errors.pass });
    //         } else {
    //             setIsSubmitted(true);
    //         }
    //     } else {
    //         // Username not found
    //         setErrorMessages({ name: "uname", message: errors.uname });
    //     }
    // };

    const handleUsernameChange = (userInput: string) => {
        setUsername(userInput)
    }

    const handlePasswordChange = (userInput: string) => {
        setPassword(userInput)
    }

    return (
        <div className="form">
            <form>
                <div className="input-container">
                    <label>Username </label>
                    <input
                        onChange={(e) => handleUsernameChange(e.target.value)}
                        type="text"
                        name="uname"
                        placeholder="email"
                        required />
                </div>
                <div className="input-container">
                    <label>Password </label>
                    <input
                        onChange={(e) => handlePasswordChange(e.target.value)}
                        type="password"
                        name="pass"
                        placeholder="password"
                        required
                    />
                </div>
                <div className="button-container">
                    <input type="submit" />
                </div>
            </form>
        </div>
    )
}
export default Login;