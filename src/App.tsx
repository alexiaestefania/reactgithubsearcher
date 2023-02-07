import axios from 'axios';
import { useState } from 'react';
import styles from './App.module.scss';
import searchsvg from "./assets/search.svg"
import chevron from "./assets/chevron-right.svg";
import cardstyles from './cards.module.scss';

type githubresponse = {
  avatar_url: string;
  bio: string;
  name: string;
  username: string;
  followers: string;
  following: string;
  repos_url: string;
}

function App() {
  const [username, setUsername] = useState("");
  const [handle, setHandle] = useState("Aguardando...");
  const [name, setName] = useState("Aguardando");
  const [avatar_url, setAvatarUrl] = useState("Aguardando");
  const [bio, setBio] = useState("Aguardando");
  const [followers, setFollowers] = useState("Aguardando");
  const [following, setFollowing] = useState("Aguardando");
  const [reposurl, setReposurl] = useState("Aguardando");
  const [showResults, setShowResults] = useState(false);
  const [showDetail, setShowDetail] = useState(false);

  const usernamesearch = () => {
    setShowDetail(false);
    axios
    .get<githubresponse>(`http://api.github.com/users/${username}`)
    .then((res) => {
      setName(res.data.name);
      setHandle(username);
      setBio(res.data.bio);
      setAvatarUrl(res.data.avatar_url);
      setFollowers(res.data.followers);
      setFollowing(res.data.following);
      setReposurl(res.data.repos_url);
      setShowResults(true)
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
  };

  const Results = () => (
    <div id="results" className={styles.usernamelist}>
        <div onClick={() => { setShowDetail(true) } } className={cardstyles.Indexcard}>
          <img className={cardstyles.in_avi} src={avatar_url} alt="user avatar" />
          <div className={cardstyles.namelist}>
            <span className={cardstyles.in_name}>{name} <br></br>
            <a 
            className={cardstyles.in_username}>@{handle}</a> </span>
          </div>
          <img className={cardstyles.chevron} src={chevron} />
      </div> 
    </div>
  );

  const Loading = () => (
    <div id="detailresult" className={styles.Loading}> 
      this is the loading part
    </div>
  );

  const UserDetail = () => (
    <div id="detailresult"> 
      <div className={cardstyles.UserDetail}>
        <img className={cardstyles.Avatar} src={avatar_url} alt="" />
        <span>{name}</span>
        <span>{bio}</span>
      </div>
      
    </div>
  );


  return (
    <div className="App">
      <div className={styles.sidebar}>
        <h1>Encontrar Dev</h1>  
        <div className={styles.searchbox}>
          <img src={searchsvg} alt="icone de busca"/>
          <div className={styles.searchtext}>
            <input 
              type="text" 
              onChange={(e) => setUsername(e.target.value)} 
              placeholder="GitHub username..."/>
            </div> 
          <button 
            id="srcbtn" 
            onClick={usernamesearch}
            className={styles.searchbutton}>
              Buscar
            </button>
        </div>

        { showResults ? <Results /> : null }


      </div>

      <div className={styles.container}>
        { showDetail ? <UserDetail /> : <Loading /> }
      </div>
    </div>
  );
}

export default App;