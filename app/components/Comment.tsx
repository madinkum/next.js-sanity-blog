import {DiscussionEmbed} from "disqus-react"
  
const Comments = () => { 
  const disqusShortname = "madinku-dev-1"
  
  const disqusConfig = { 
    url: "http://madinku.dev", 
    identifier:'123',  
    title: "Demo Post" 
  } 
  
  return ( 
    <div> 
      <DiscussionEmbed 
        shortname={disqusShortname} 
        config={disqusConfig} 
      /> 
    </div> 
  ) 
} 
  
export default Comments;