import { useMutation, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import './App.css';
import { CREATE_USER } from './mutation/user';
import { GET_ALL_USERS, GET_ONE_USER } from './query/user';

const App = () => {
    const { data, loading, error, refetch } = useQuery(GET_ALL_USERS, {
        pollInterval: 10000,
    });
    const {
        data: oneUser,
        loading: loadingOneUser,
        error: errorOneUser,
    } = useQuery(GET_ONE_USER, { variables: { id: 1 } });
    const [newUser] = useMutation(CREATE_USER);
    const [users, setUsers] = useState([]);
    const [username, setUsername] = useState('');
    const [age, setAge] = useState(0);

    console.log(oneUser, loadingOneUser, errorOneUser);

    const addUser = (e) => {
        e.preventDefault();

        newUser({
            variables: {
                input: {
                    username,
                    age,
                },
            },
        }).then(({ data }) => {
            console.log(data);
            setUsers((prev) => [
                ...prev,
                {
                    username: data.createUser.username,
                    age: data.createUser.age,
                },
            ]);
            setUsername('');
            setAge(0);
        });
    };

    const getAll = (e) => {
        e.preventDefault();
        refetch();
    };

    useEffect(() => {
        if (!loading) {
            setUsers(data.getAllUsers);
        }
    }, [data, loading]);

    if (loading) return <h1>loading...</h1>;
    if (error) return <h1>error...</h1>;

    return (
        <div>
            <form>
                <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    type="text"
                />
                <input
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    type="number"
                />
                <div className="buttons">
                    <button onClick={(e) => addUser(e)}>Создать</button>
                    <button onClick={(e) => getAll()}>Получить</button>
                </div>
            </form>
            <div>
                {users.map((user) => (
                    <div>
                        {user.username} {user.age}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default App;
