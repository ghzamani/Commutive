import { SettingsOverscanTwoTone } from "@material-ui/icons";
import React from "react";
import { useState, useEffect } from "react";
import './adminVotingSystem.css'
function Vote(props) {
    // const [choices, setChoices] = useState([{ name: "shootingStar" }, { name: "silvDayo" }, { name: "VOTE_ME_PLZ" }, { name: "immortal" }, {name: "Doggo"}]);
    const [voted, setVoted] = useState(true);
    const [voteExists, setVoteExists] = useState(false);
    //const [selectedNames, setSelectedNames] =useState([]);
    const [allowedNumberOfSelect, setAllowedNumber] = useState(3);
    const selectedNames = [];
    const [choices, setChoices] = useState([]);
    const [data, setData] = useState([{}]);

    useEffect(async () => {
        setVoted(true);

        console.log('im heree');
        fetch("http://localhost:8000/communities/" + props.communityID + "/poll/latest", {
          method: 'GET',
          headers: {
            "Authorization": "Token " + localStorage.getItem('loginToken')
          }
        })
          .then((res) => {
            if (res.status === 200) {
              setVoteExists(true);
              props.setCanHaveNewPoll(false);
              return res.json()
            }
            return null;
          }
          )
          .then((data) => {
              if(!data)
                return;
              setChoices(data.candidates);
              let username = localStorage.getItem("username")
              let didVote = false;
              data.candidates.map(x=> {
                  if(x.voted_by.map(y => y.username).includes(username))
                    {
                        didVote = true;
                    }
                })
                console.log(didVote);
                console.log(username)
            if(!didVote){
                setVoted(false);
            }
               console.log(data);});
        //    setChoices(data.map(d =>{return {candidates:d.candidates}}))
          console.log(choices+"sa")
      }, []);
      
    
      const selectChoice = (id, number) => {
        let checkbox = document.getElementById(id);
        if (!checkbox.checked) {
            let idx = selectedNames.indexOf(id);
            if (idx > -1) {
                selectedNames.splice(idx, 1);
            }
        }
        else if (selectedNames.length < allowedNumberOfSelect) {
            selectedNames.push(id);
        }
        else {
            checkbox.checked = !checkbox.checked;
        }
        console.log(selectedNames);
    }

    const SubmitVote = () => {
        if(selectedNames === 0){
            return;
        }
        let fd = new FormData();
        let id;
        for (id in selectedNames){
            fd.append('candidates', selectedNames[id]);
        }
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Token " + localStorage.getItem('loginToken'));
        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: fd,
            redirect: 'follow'
          };
           fetch("http://localhost:8000/communities/"+ props.communityID + "/poll/latest", requestOptions)
          .then(response => 
            {
              if(response.status === 200){
                setVoted(true);
                return response.json()
              }
              //it wasn't successfull!
              return null
            })
          .then(result => 
            {
                if(result === null) return;
              console.log(result)
            //   setVoterCount(result.map((d)=> d.voters.length).reduce((a, b) => a + b, 0))
              setChoices(result.candidates);
            })
          .catch(error => console.log('error', error));
    } 

    return (
          voteExists &&
          <div className="piece">
          <div className="piece-title btn" style={{ width: "100%", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
              <p style={{ margin: "2px 0 0 0", color: "#576777", fontWeight: "bold", fontSize: "20px", display: "inline-block" }}>Choose Your New Admins!</p>
             </div>
          <div className="fade_rule" ></div>
          <div className="piece-inside" >
            <div className="justify-content-center" style={{ width: "100%", display: "flex" }}></div>
            <div className="vote">
                <div className="vote-header">
                    {/* <div style={{textAlign:"center"}}>
                        <p style={{ margin: "2px 0 0 0", color: "#576777", fontWeight: "bold", fontSize: "20px" }}>Choose Your New Admins!</p>
                    </div> */}
                    <p style={{fontSize:"17px", paddingTop:"15px",margin:"0"}}>It's time! who should be the next admin?</p>
                    {voted? null : <p>You can choose at most {allowedNumberOfSelect} people.</p>}
                </div>
              
       
                      {
                        choices?.map((ch, i) => { console.log(ch.condid_username +"iiii")
                            if (ch)
                                return (
                                    <div key={ch.id} style={{marginTop:"5px"}}>
                                        {voted?
                                        <div>
                                        {ch.candid_username}
                                        <div  style={{width:ch.rate*0.99 + 1 + "%", height:"15px", margin:"2px 0 5px 0", backgroundColor:"#33aba3", transition: "width 1s",borderRadius:"5px"}}/>
                                        </div>
                                        :
                                        <>
                                        <input type="checkbox" id={ch.id} name={ch.candid_username} onChange={() => selectChoice(ch.id, i)} />
                                        <label for={ch.candid_username} style={{marginLeft:"10px"}}>
                                            {ch.candid_username}
                                        </label>
                                        </>}
                                    </div>
                                )
                        })
                    }
                {voted? null :<div className="justify-content-center" style={{display:"flex"}} >
                <div className="btn vote-button" onClick={()=> SubmitVote()}>Vote</div>
            </div>}
            </div>
            </div>
            </div>
        
    )
}



export default Vote;
