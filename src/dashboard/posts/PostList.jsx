import React from 'react'
import Register from '../../components/ui/Register'

function PostList() {
  return (
    <div>
      <Register formName={'posts'} formPath='postform' title="Posts"/>
    </div>
  )
}

export default PostList