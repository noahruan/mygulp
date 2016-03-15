/**
 * Created by noah.r on 16/3/14.
 */
var CommentBox = React.createClass({displayName:'CommentBox',
    render: function(){
        return (
            React.createElement('div',{className: "commentBox"},
                'Hello!'
            )
        );
    }
});
ReactDOM.render(
    React.createElement(CommentBox,null),
    document.getElementById('content')
);


var BindInput = React.createClass({displayName:'bindInput',
    getInitialState: function(){
        return {message: 'Hello!'};
    },
    handleChange: function(event){
        let message = event.target.value;
        this.setState({message});
    },
    render: function(){
        var message = this.state.message;
        return (
            <div>
                <input type = "text" value={message} onChange={this.handleChange}/>
                <p>{message}</p>
            </div>
        );
    }
});

ReactDOM.render(
    React.createElement(BindInput,null),
    document.getElementById('bindTest')
);

