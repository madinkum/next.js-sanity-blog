'use client'
import { Post } from "@/library/typings"
import {DiscussionEmbed} from "disqus-react"

const DisqusComments = (slug:string, post:Post) => { 
const disqusShortname = 'madinku-dev-3'

const disqusConfig = { 
	url: "http://madinku.dev" +'/blog' +slug , 
	identifier: slug, 
	title: post.title,
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

export default DisqusComments;
