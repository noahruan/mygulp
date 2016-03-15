'use strict';

/**
 * Created by noah.r on 16/3/14.
 */
var CommentBox = React.createClass({ displayName: 'CommentBox',
    render: function render() {
        return React.createElement('div', { className: "commentBox" }, 'Hello!');
    }
});
ReactDOM.render(React.createElement(CommentBox, null), document.getElementById('content'));

var BindInput = React.createClass({ displayName: 'bindInput',
    getInitialState: function getInitialState() {
        return { message: 'Hello!' };
    },
    handleChange: function handleChange(event) {
        var message = event.target.value;
        this.setState({ message: message });
    },
    render: function render() {
        var message = this.state.message;
        return React.createElement("div", null, React.createElement("input", { type: "text", value: message, onChange: this.handleChange }), React.createElement("p", null, message));
    }
});

ReactDOM.render(React.createElement(BindInput, null), document.getElementById('bindTest'));
"use strict";

ReactDOM.render(React.createElement("h1", null, "Hello World!!"), document.getElementById('example'));
ReactDOM.render(React.createElement("h1", null, "Hello!!"), document.getElementById('example2'));
//var CommentBox = React.createClass({
//    render: function(){
//        return (
//            <div>
//                Hello World! I am a CommentBox.
//            </div>
//        );
//    }
//});
//React.render(
//    <CommentBox/>,
//    document.getElementById('content')
//);

//tutorial1-raw
//var CommentBox = React.createClass({displayName:'CommentBox',
//    render: function(){
//        return (
//            React.createElement('div',{className: "commentBox"},
//                "Hello, world! I am a CommentBox."
//            )
//        );
//    }
//});
//ReactDOM.render(
//    React.createElement(CommentBox,null),
//    document.getElementById('content')
//);
"use strict";