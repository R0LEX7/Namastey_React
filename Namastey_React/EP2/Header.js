import React , {useContext} from   'react'
import userContext from "./utils/userContext";


const Header = () => {
  const {user , setUser } = useContext(userContext);
  console.log(user);
  return (
    <>
    <div className="navbar">
      <div className="search">
        <input
          type="text"
          placeholder={"set name ..."}
          value={user.name}
          onChange={(e) => setUser({...user , "name" : e.target.value})}
        />
        </div>
        <ul>
        <li>Home</li>
        <li>About</li>
        <li>Contact</li>
        <li>Log out</li>
        <li>{user?.name}</li>
        </ul>
    </div>
    </>
  )
}

export default Header