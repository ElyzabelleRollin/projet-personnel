import React from 'react'
import { createStoryAction } from '@/app/_actions/stories';

const CreateNewStoryPage = () => {
  return (
    <form action={createStoryAction}>
        <label htmlFor="title">Nommer votre histoire</label>
        <input type="text" id="title" name="title" placeholder="Give me a title..." />
        <button type='submit'>Créer</button>
    </form>
  )
}

export default CreateNewStoryPage