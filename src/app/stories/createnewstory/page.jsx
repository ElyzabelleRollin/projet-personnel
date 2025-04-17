import React from "react";
import { createStoryAction } from "@/app/_actions/stories";

const CreateNewStoryPage = () => {
  return (
    <div>
      <h1>Créer une nouvelle histoire</h1>
      <form action={createStoryAction}>
        <label htmlFor="title">Nommer votre histoire</label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Nommer votre histoire..."
        />
        <label htmlFor="firstSentence">Commencer votre histoire</label>
        <input
          type="text"
          id="firstSentence"
          name="firstSentence"
          placeholder="Commencer votre histoire..."
        />
        <button type="submit">Créer</button>
      </form>
    </div>
  );
};

export default CreateNewStoryPage;
