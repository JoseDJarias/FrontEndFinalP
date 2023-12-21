import React, { useEffect, useState } from "react";
import AuthService from "./services/Auth.service";
import LocalStorageService from "./services/LocalStorage.service";

function Home() {
    const localStorage = new LocalStorageService;

    const token = localStorage.getToken();

    const [data, setData] = useState([])

    useEffect(() => {
        try {
            const service = new AuthService;
            async function fetchTodos() {
                const response = await service.getTodos(token)
                setData(response);
            }
            fetchTodos()
        } catch (error) {
            console.error('Error fetching data', error);
        }
    }, [])

    return (

        <>
            <h1>Home</h1>

            <ul
                style={{ listStyle: 'none' }}
            >
                {
                    data.map((user) => (
                        <React.Fragment key={user.id}>
                            <li>
                                id: {user.id}
                            </li>
                            <li
                                style={{ listStyle: 'none' }}>
                                email: {user.email}
                            </li>

                        </React.Fragment>


                    ))}
            </ul>

        </>
    );

}

export default Home;