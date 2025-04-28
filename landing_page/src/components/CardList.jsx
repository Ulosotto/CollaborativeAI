import { useState } from "react";
import Card from "./Card";

const CardList = () => {
  const [cards, setCards] = useState([
    {
      name: "Tangram task",
      description: ["Compose an object with AI"],
      link: "./tg.png",
      image_credit:
        "Image credit: Image by anonymous; CC BY-ND 4.0; https://emojis.sh/emoji/tangram-8F7UHXt",
      task_link: "https://tangram-mar1-tangram-pl-mar.node01.ki-lab.nrw/",
      code_link:
        "https://github.com/AaltoRSE/CollaborativeAI/tree/main/task_template/frontend_tangram",
    },
    {
      name: "Poetry task",
      description: ["Write a short poem with AI"],
      link: "./pt.png",
      image_credit:
        "Image credit: Image by e_s ekaterina_s; CC BY-ND 4.0; https://emoiis.sh/emoji/a-feather-quill-and-an-open-scroll-IZrNcJ6eFQ",
      task_link: "https://poetry-mar1-poetry-pl-mar.node01.ki-lab.nrw/",
      code_link:
        "https://github.com/AaltoRSE/CollaborativeAI/tree/main/task_template/frontend_poetry",
    },
    {
      name: "Meal plan task",
      description: ["Plan your meals with AI"],
      link: "./mp.png",
      image_credit:
        "Image credit: Image by carladanielewic; CC BY-ND 4.0; https://www.emojis.com/emoji/meal-plan-paper-d99RHsRlOSD",
      task_link: "https://mealplan-mar1-mealplan-pl-mar.node01.ki-lab.nrw/",
      code_link:
        "https://github.com/AaltoRSE/CollaborativeAI/tree/main/task_template/frontend_mealplan",
    },
    {
      name: "Recipe task",
      description: ["Plan a recipe for a dish with AI"],
      link: "./rp.png",
      image_credit:
        "Image credit: Image by richardbeaurega; CC BY-ND 4.0; https://www.emojis.com/emoji/recipe-book-GsQnkLyZfJ",
      task_link: "https://recipe-mar1-recipe-pl-mar.node01.ki-lab.nrw/",
      code_link:
        "https://github.com/AaltoRSE/CollaborativeAI/tree/main/task_template/frontend_recipe",
    }
  ]);

  return (
    <div className="card-list">
      <div className="card-list-inner-border">
        {cards.map((card, index) => (
          <Card key={index} card={card} />
        ))}
      </div>
    </div>
  );
};

export default CardList;
