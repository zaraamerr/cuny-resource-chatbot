import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "./../components/SideBar.css";

// only add a new chat if they entered at least one prompt 
// when adding one prompt it should change the name of new chat
function addNewChat(){

};
class SideBar extends Component {

    constructor(props) {
	super(props);
	this.state ={
	    chats: [], // store chat history here
	};
    }

    addNewChat = () => {
	// add new chat if theres >= 1 prompt
	const { chats } = this.state;
	if (chats.length > 0) {
	    this.setState({
		chats: [...chats, `Chat ${chats.length + 1}`],
	    });
	} else {
	    this.setState({
		chats: [...chats, "New Chat"],
	    });
	}
    };

    
    render() {
	const { chats } = this.state;
	return (
	    <div className="side-bar">
		<p style={{ textTransform: "uppercase" }}>
		    <Link to="/" className="new-chat-link-header">
			<span style={{ fontWeight: "bold" }}>Hunter </span>Essentials
		    </Link>
		</p>
		
		<div className="new-chat-content">
		    <div className= "new-chat-button">
			<Link to="/">
			    <button className="new-chat" onClick={addNewChat()}>+</button>
			</Link>
			<Link to="/" className="new-chat-link">
			<span className="new-chat-text">New Chat</span>
			</Link>
		    </div>

		    <div className= "new-chat-button">
			<Link to="/">
			<button className="new-chat"> </button> </Link>
			<Link to="/" className="new-chat-link">
			<span className="new-chat-text">Food</span>
			</Link>
		     </div>

		    <div className= "new-chat-button">
			<Link to="/">
			<button className="new-chat"></button> </Link>
			<Link to="/" className="new-chat-link">
			<span className="new-chat-text">Housing</span>
			</Link>
		     </div>

		    <div className= "new-chat-button">
			<Link to="/">
			<button className="new-chat"></button> </Link>
			<Link to="/" className="new-chat-link">
			<span className="new-chat-text">Counseling</span>
			</Link>
		    </div>

		    <div className="new-chat-button">
			<Link to="/events-calendar">
			<button className="new-chat"></button> </Link>
			<Link to="/events-calendar" className="new-chat-link">
			    <span className="new-chat-text">Events</span>
			</Link>
		    </div>

		</div>

		<div className="chat-history">
		    <h3>Previous Chats</h3>
		    <ul>
			{chats.map((chat, index) => (
			    <li key={index} className="chat-item">
				{chat}
			    </li>
			))}
		    </ul>
		</div>
		
		
	    </div>
	);
    }
};

export default SideBar;
