import React, { Component } from 'react'


export default class Comments extends Component {
    commentBox: React.RefObject<any>
    constructor(props:any) {
        super(props);
        this.commentBox = React.createRef();
    }

    componentDidMount() {
        let scriptEl = document.createElement("script");
        scriptEl.async= true;
        scriptEl.crossOrigin = 'anonymous';
        scriptEl.setAttribute("src", "https://utteranc.es/client.js")
        scriptEl.setAttribute("repo", "madinkum/next.js-sanity-blog",)
        scriptEl.setAttribute("issue-term", "pathname")
        scriptEl.setAttribute("theme", "github-light")
        this.commentBox.current.appendChild(scriptEl)
        
    }

    render() {
        
        return (
            <div style={{ width: '100%' }} id="comments">
                <div ref={this.commentBox}></div>
            </div>
        )
    }
}